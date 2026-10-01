import React, { useState, useRef } from 'react';
import {
  BookMarked,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Camera,
  Search,
  Tag,
  Calendar,
  X,
  Check,
  Eye,
  Maximize2,
} from 'lucide-react';
import { CharacterNote, CharacterNoteImage } from '../../types/character';

interface NotebookSectionProps {
  notes?: CharacterNote[];
  onUpdateNotes: (notes: CharacterNote[]) => void;
}

export const NotebookSection: React.FC<NotebookSectionProps> = ({
  notes = [],
  onUpdateNotes,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [editingNote, setEditingNote] = useState<CharacterNote | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Estados do formulário de criação/edição
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState<CharacterNote['category']>('geral');
  const [formImages, setFormImages] = useState<CharacterNoteImage[]>([]);

  // Câmera ao vivo
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormTitle('');
    setFormContent('');
    setFormCategory('geral');
    setFormImages([]);
    setEditingNote(null);
    setIsCreating(false);
    stopCamera();
  };

  const startCreateNote = () => {
    resetForm();
    setIsCreating(true);
  };

  const startEditNote = (note: CharacterNote) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormCategory(note.category);
    setFormImages(note.images || []);
    setIsCreating(true);
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      const updated = notes.filter((n) => n.id !== noteId);
      onUpdateNotes(updated);
    }
  };

  const handleSaveNote = () => {
    if (!formTitle.trim()) {
      alert('Por favor, informe um título para a anotação.');
      return;
    }

    const now = new Date().toISOString();
    let updatedNotes: CharacterNote[];

    if (editingNote) {
      updatedNotes = notes.map((n) =>
        n.id === editingNote.id
          ? {
              ...n,
              title: formTitle.trim(),
              content: formContent.trim(),
              category: formCategory,
              images: formImages,
              updatedAt: now,
            }
          : n
      );
    } else {
      const newNote: CharacterNote = {
        id: `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title: formTitle.trim(),
        content: formContent.trim(),
        category: formCategory,
        images: formImages,
        createdAt: now,
        updatedAt: now,
      };
      updatedNotes = [newNote, ...notes];
    }

    onUpdateNotes(updatedNotes);
    resetForm();
  };

  // Processa e redimensiona imagem para base64 seguro (máx 800px)
  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          const newImg: CharacterNoteImage = {
            id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            dataUrl: compressedDataUrl,
            caption: file.name.replace(/\.[^/.]+$/, ''),
            createdAt: new Date().toISOString(),
          };
          setFormImages((prev) => [...prev, newImg]);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((f) => processImageFile(f));
    }
  };

  // Câmera ao vivo usando WebRTC
  const startLiveCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      mediaStreamRef.current = stream;
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      console.warn('Câmera via WebRTC indisponível, abrindo seletor nativo:', err);
      // Fallback para input nativo com capture
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    }
  };

  const capturePhotoFromVideo = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        const newImg: CharacterNoteImage = {
          id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          dataUrl,
          caption: `Foto capturada em ${new Date().toLocaleDateString()}`,
          createdAt: new Date().toISOString(),
        };
        setFormImages((prev) => [...prev, newImg]);
      }
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const filteredNotes = notes.filter((n) => {
    if (categoryFilter !== 'todas' && n.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      if (!matchTitle && !matchContent) return false;
    }
    return true;
  });

  const getCategoryColor = (cat: CharacterNote['category']) => {
    switch (cat) {
      case 'missao':
        return { label: 'Missão', color: 'var(--t20-gold)', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'npc':
        return { label: 'NPC', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.15)' };
      case 'local':
        return { label: 'Local', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' };
      case 'loot':
        return { label: 'Tesouro / Loot', color: '#34d399', bg: 'rgba(16, 185, 129, 0.15)' };
      case 'lore':
        return { label: 'História / Lore', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.15)' };
      default:
        return { label: 'Geral', color: '#cbd5e1', bg: 'rgba(255, 255, 255, 0.08)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header & Barra de Ações */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--t20-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BookMarked size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>Caderno de Aventuras & Anotações</h3>
            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Guarde missões, pistas de NPCs, mapas e fotos da mesa de RPG
            </p>
          </div>
        </div>

        {!isCreating && (
          <button
            type="button"
            onClick={startCreateNote}
            className="btn btn-primary"
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <Plus size={16} />
            Nova Anotação
          </button>
        )}
      </div>

      {/* Formulário de Criação/Edição */}
      {isCreating && (
        <div
          className="t20-card"
          style={{
            border: '1px solid var(--border-gold)',
            background: 'rgba(15, 23, 42, 0.85)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, color: 'var(--t20-gold-light)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Edit3 size={16} />
              {editingNote ? 'Editar Anotação' : 'Criar Nova Anotação'}
            </h4>
            <button type="button" onClick={resetForm} className="btn btn-ghost" style={{ padding: '0.25rem' }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                Título da Anotação *
              </label>
              <input
                type="text"
                placeholder="Ex: Pista sobre o Culto de Aharadak, Diário de Kurt..."
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                Categoria / Tag
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="geral">Geral</option>
                <option value="missao">Missão & Objetivos</option>
                <option value="npc">NPCs & Aliados</option>
                <option value="local">Locais & Mapas</option>
                <option value="loot">Tesouros & Loot</option>
                <option value="lore">História & Lore</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
              Conteúdo da Anotação
            </label>
            <textarea
              placeholder="Descreva detalhes, diálogos, descobertas, senhas de masmorras..."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              rows={5}
              style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', lineHeight: 1.5 }}
            />
          </div>

          {/* Anexos de Imagens */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                Imagens Anexadas ({formImages.length})
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
                >
                  <ImageIcon size={14} />
                  Anexar Arquivo
                </button>
                <button
                  type="button"
                  onClick={startLiveCamera}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem', color: 'var(--t20-gold)' }}
                >
                  <Camera size={14} />
                  Tirar Foto / Câmera
                </button>
              </div>
            </div>

            {/* Modal de Câmera ao Vivo */}
            {isCameraActive && (
              <div
                style={{
                  background: '#000',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-gold)',
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{ width: '100%', maxWidth: '480px', borderRadius: 'var(--radius-sm)', background: '#111' }}
                />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={capturePhotoFromVideo}
                    className="btn btn-primary"
                    style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}
                  >
                    <Camera size={16} />
                    Capturar Foto
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Grade de Pré-visualização de Imagens */}
            {formImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.65rem' }}>
                {formImages.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.1)',
                      height: '90px',
                      background: '#000',
                    }}
                  >
                    <img
                      src={img.dataUrl}
                      alt={img.caption || 'Anexo'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setPreviewImage(img.dataUrl)}
                    />
                    <button
                      type="button"
                      onClick={() => setFormImages(formImages.filter((_, i) => i !== idx))}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(0,0,0,0.7)',
                        border: 'none',
                        color: '#f87171',
                        borderRadius: '50%',
                        width: '22px',
                        height: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      title="Remover imagem"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
            <button type="button" onClick={resetForm} className="btn btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveNote}
              className="btn btn-primary"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem', gap: '0.4rem' }}
            >
              <Check size={16} />
              {editingNote ? 'Salvar Alterações' : 'Salvar Anotação'}
            </button>
          </div>
        </div>
      )}

      {/* Barra de Filtros e Busca */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div className="btn-group">
          {(['todas', 'missao', 'npc', 'local', 'loot', 'lore', 'geral'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`btn ${categoryFilter === cat ? 'active' : ''}`}
              style={{ textTransform: 'capitalize', fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
            >
              {cat === 'todas' ? 'Todas' : cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '220px', flex: 1, maxWidth: '360px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Buscar por título ou conteúdo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.4rem 0.65rem 0.4rem 2rem', fontSize: '0.825rem' }}
          />
        </div>
      </div>

      {/* Lista de Anotações */}
      {filteredNotes.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-dim)',
          }}
        >
          <BookMarked size={40} style={{ opacity: 0.35, marginBottom: '0.75rem' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#ffffff' }}>Nenhuma anotação encontrada.</p>
          <p style={{ margin: '0.35rem 0 1rem 0', fontSize: '0.825rem', color: 'var(--text-dim)' }}>
            Clique em "Nova Anotação" para registrar missões, pistas de NPCs ou fotos da mesa de jogo.
          </p>
          {!isCreating && (
            <button
              type="button"
              onClick={startCreateNote}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}
            >
              <Plus size={15} />
              Criar Primeira Anotação
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {filteredNotes.map((note) => {
            const catInfo = getCategoryColor(note.category);
            return (
              <div
                key={note.id}
                className="t20-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.15rem',
                  gap: '0.85rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  {/* Top Bar da Nota */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#ffffff', fontWeight: 700 }}>
                      {note.title}
                    </h4>
                    <span
                      style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: catInfo.color,
                        background: catInfo.bg,
                        border: `1px solid ${catInfo.color}33`,
                        flexShrink: 0,
                      }}
                    >
                      {catInfo.label}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      lineHeight: 1.55,
                      whiteSpace: 'pre-line',
                      maxHeight: '140px',
                      overflowY: 'auto',
                    }}
                  >
                    {note.content}
                  </p>

                  {/* Miniaturas de Imagens */}
                  {note.images && note.images.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      {note.images.map((img) => (
                        <div
                          key={img.id}
                          onClick={() => setPreviewImage(img.dataUrl)}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-xs)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.15)',
                            position: 'relative',
                          }}
                          title={img.caption || 'Ver imagem em tela cheia'}
                        >
                          <img src={img.dataUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rodapé da Nota */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
                  </span>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={() => startEditNote(note)}
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                      title="Editar anotação"
                    >
                      <Edit3 size={13} />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', color: '#f87171' }}
                      title="Excluir anotação"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Pré-visualização de Imagem em Tela Cheia */}
      {previewImage && (
        <div
          className="modal-overlay"
          onClick={() => setPreviewImage(null)}
          style={{ zIndex: 11000, background: 'rgba(0,0,0,0.85)' }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: '-36px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>
            <img
              src={previewImage}
              alt="Visualização"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
