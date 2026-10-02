import React, { useEffect, useRef, useState } from 'react';
import { BookMarked, Calendar, Camera, Check, Image as ImageIcon, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { CharacterNote, CharacterNoteImage } from '../../types/character';
import { Sheet } from '../ui/Sheet';
import { EmptyState, SearchField, SelectField } from '../ui/controls';
import { useFeedback } from '../ui/Feedback';

interface NotebookSectionProps {
  notes?: CharacterNote[];
  onUpdateNotes: (notes: CharacterNote[]) => void;
}

type NoteCategory = CharacterNote['category'];

const CATEGORIES: { value: NoteCategory; label: string; tone: string }[] = [
  { value: 'geral', label: 'Geral', tone: 'var(--text-3)' },
  { value: 'missao', label: 'Missão', tone: 'var(--gold)' },
  { value: 'npc', label: 'NPC', tone: '#9b7be8' },
  { value: 'local', label: 'Local', tone: 'var(--info)' },
  { value: 'loot', label: 'Tesouro', tone: 'var(--success)' },
  { value: 'lore', label: 'História', tone: '#e07b32' },
];

const categoryMeta = (cat: NoteCategory) => CATEGORIES.find((c) => c.value === cat) || CATEGORIES[0];

const newId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

/** Redimensiona para no máx. 800px e converte em JPEG base64 (cabe no localStorage). */
function processImageFile(file: File, onDone: (img: CharacterNoteImage) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let { width, height } = img;
      if (width > height && width > MAX) {
        height *= MAX / width;
        width = MAX;
      } else if (height >= width && height > MAX) {
        width *= MAX / height;
        height = MAX;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      onDone({
        id: newId('img'),
        dataUrl: canvas.toDataURL('image/jpeg', 0.8),
        caption: file.name.replace(/\.[^/.]+$/, ''),
        createdAt: new Date().toISOString(),
      });
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

export const NotebookSection: React.FC<NotebookSectionProps> = ({ notes = [], onUpdateNotes }) => {
  const { confirm, toast } = useFeedback();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<CharacterNote | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState<NoteCategory>('geral');
  const [formImages, setFormImages] = useState<CharacterNoteImage[]>([]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const stopCamera = () => {
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    setIsCameraActive(false);
  };

  useEffect(() => () => stopCamera(), []);

  const openEditor = (note?: CharacterNote) => {
    setEditingNote(note || null);
    setFormTitle(note?.title || '');
    setFormContent(note?.content || '');
    setFormCategory(note?.category || 'geral');
    setFormImages(note?.images || []);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    stopCamera();
    setEditorOpen(false);
  };

  const handleSaveNote = () => {
    if (!formTitle.trim()) {
      toast('Dê um título para a anotação.', { tone: 'warning' });
      return;
    }
    const now = new Date().toISOString();
    const updated: CharacterNote[] = editingNote
      ? notes.map((n) =>
          n.id === editingNote.id
            ? { ...n, title: formTitle.trim(), content: formContent.trim(), category: formCategory, images: formImages, updatedAt: now }
            : n
        )
      : [
          {
            id: newId('note'),
            title: formTitle.trim(),
            content: formContent.trim(),
            category: formCategory,
            images: formImages,
            createdAt: now,
            updatedAt: now,
          },
          ...notes,
        ];
    onUpdateNotes(updated);
    closeEditor();
    toast(editingNote ? 'Anotação atualizada.' : 'Anotação salva no caderno.', { tone: 'success' });
  };

  const handleDeleteNote = async (note: CharacterNote) => {
    const ok = await confirm({
      title: 'Excluir anotação?',
      message: `“${note.title}” e suas imagens serão removidas.`,
      confirmLabel: 'Excluir',
      tone: 'danger',
    });
    if (ok) onUpdateNotes(notes.filter((n) => n.id !== note.id));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach((f) => processImageFile(f, (img) => setFormImages((prev) => [...prev, img])));
    e.target.value = '';
  };

  // Câmera ao vivo (WebRTC) com fallback para o seletor nativo
  const startLiveCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      mediaStreamRef.current = stream;
      setIsCameraActive(true);
      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch {
      cameraInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setFormImages((prev) => [
        ...prev,
        {
          id: newId('img'),
          dataUrl: canvas.toDataURL('image/jpeg', 0.85),
          caption: `Foto de ${new Date().toLocaleDateString('pt-BR')}`,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    stopCamera();
  };

  const q = search.trim().toLowerCase();
  const filteredNotes = notes.filter((n) => {
    if (categoryFilter !== 'todas' && n.category !== categoryFilter) return false;
    return !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
  });

  return (
    <section className="stack">
      <div className="section-head">
        <h3 className="section-title">
          <BookMarked size={20} />
          Caderno de aventuras
        </h3>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => openEditor()}>
          <Plus size={18} />
          Nova
        </button>
      </div>

      {notes.length > 0 && (
        <div className="filter-row">
          <SearchField value={search} onChange={setSearch} placeholder="Buscar anotação…" />
          <SelectField
            value={categoryFilter}
            onChange={setCategoryFilter}
            ariaLabel="Categoria da anotação"
            options={[{ value: 'todas', label: 'Todas' }, ...CATEGORIES.map((c) => ({ value: c.value, label: c.label }))]}
          />
        </div>
      )}

      {notes.length === 0 ? (
        <EmptyState
          icon={<BookMarked size={24} />}
          title="Caderno em branco"
          description="Guarde missões, pistas de NPCs, mapas e fotos da mesa."
          action={
            <button type="button" className="btn btn-secondary" onClick={() => openEditor()}>
              <Plus size={18} />
              Primeira anotação
            </button>
          }
        />
      ) : filteredNotes.length === 0 ? (
        <EmptyState title="Nenhuma anotação encontrada" />
      ) : (
        <div className="grid-auto">
          {filteredNotes.map((note) => {
            const meta = categoryMeta(note.category);
            return (
              <article key={note.id} className="card note-card" style={{ '--note-tone': meta.tone } as React.CSSProperties}>
                <div className="hstack between">
                  <span className="badge note-badge">{meta.label}</span>
                  <span className="hstack-xs">
                    <button type="button" className="icon-btn icon-btn-sm" onClick={() => openEditor(note)} aria-label={`Editar ${note.title}`}>
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn-sm icon-btn-danger"
                      onClick={() => handleDeleteNote(note)}
                      aria-label={`Excluir ${note.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </span>
                </div>
                <h4 className="note-title">{note.title}</h4>
                {note.content && <p className="note-content clamp-3">{note.content}</p>}
                {note.images && note.images.length > 0 && (
                  <div className="note-thumbs">
                    {note.images.map((img) => (
                      <button key={img.id} type="button" className="note-thumb" onClick={() => setPreviewImage(img.dataUrl)} aria-label="Ampliar imagem">
                        <img src={img.dataUrl} alt={img.caption || 'Imagem da anotação'} />
                      </button>
                    ))}
                  </div>
                )}
                <span className="t-xs t-3 hstack-xs">
                  <Calendar size={12} />
                  {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              </article>
            );
          })}
        </div>
      )}

      {/* Editor */}
      <Sheet
        open={editorOpen}
        onClose={closeEditor}
        title={editingNote ? 'Editar anotação' : 'Nova anotação'}
        icon={<BookMarked size={22} />}
        size="md"
        full
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={closeEditor}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveNote}>
              <Check size={18} />
              Salvar
            </button>
          </>
        }
      >
        <div className="stack">
          <label className="field">
            <span className="field-label">Título</span>
            <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Ex.: O mapa do Barão" />
          </label>
          <SelectField
            label="Categoria"
            value={formCategory}
            onChange={(v) => setFormCategory(v as NoteCategory)}
            options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
          />
          <label className="field">
            <span className="field-label">Anotação</span>
            <textarea
              rows={7}
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder="Diálogos, descobertas, senhas de masmorras…"
            />
          </label>

          <div className="stack-sm">
            <span className="field-label">Imagens</span>
            {isCameraActive ? (
              <div className="camera-box">
                <video ref={videoRef} playsInline muted />
                <div className="hstack">
                  <button type="button" className="btn btn-primary grow" onClick={capturePhoto}>
                    <Camera size={18} />
                    Capturar
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={stopCamera}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid-2">
                <button type="button" className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
                  <ImageIcon size={18} />
                  Galeria
                </button>
                <button type="button" className="btn btn-secondary" onClick={startLiveCamera}>
                  <Camera size={18} />
                  Câmera
                </button>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" hidden onChange={handleFiles} />
            {formImages.length > 0 && (
              <div className="note-thumbs">
                {formImages.map((img) => (
                  <div key={img.id} className="note-thumb">
                    <img src={img.dataUrl} alt={img.caption || 'Imagem'} />
                    <button
                      type="button"
                      className="note-thumb-remove"
                      onClick={() => setFormImages((prev) => prev.filter((i) => i.id !== img.id))}
                      aria-label="Remover imagem"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Sheet>

      {/* Visualização da imagem */}
      <Sheet open={!!previewImage} onClose={() => setPreviewImage(null)} title="Imagem" size="xl" flush>
        {previewImage && <img src={previewImage} alt="Imagem ampliada" className="image-preview" />}
      </Sheet>
    </section>
  );
};
