import React, { useMemo, useRef, useState } from 'react';
import {
  Copy,
  Download,
  ExternalLink,
  MoreVertical,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { AppBar } from '../ui/AppBar';
import { EmptyState, SearchField, SelectField } from '../ui/controls';
import { MenuSheet } from '../ui/MenuSheet';
import { useFeedback } from '../ui/Feedback';
import { ClassSigil, classColorVars } from '../common/ClassSigil';
import { classLine, deityName, formatSigned, originName, percent, raceName } from '../../utils/displayNames';

interface CharacterListProps {
  characters: CharacterSheet[];
  activeCharacterId?: string | null;
  onOpenCharacter: (character: CharacterSheet) => void;
  onEditCharacter: (character: CharacterSheet) => void;
  onCreateNew: () => void;
  onDuplicateCharacter: (character: CharacterSheet) => void;
  onDeleteCharacter: (id: string) => void;
  onExportCharacter: (character: CharacterSheet) => void;
  onImportCharacter: (file: File) => void;
}

type SortKey = 'recent' | 'name' | 'level';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const ATTR_KEYS = ['for', 'des', 'con', 'int', 'sab', 'car'] as const;

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  activeCharacterId,
  onOpenCharacter,
  onEditCharacter,
  onCreateNew,
  onDuplicateCharacter,
  onDeleteCharacter,
  onExportCharacter,
  onImportCharacter,
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recent');
  const [menuFor, setMenuFor] = useState<CharacterSheet | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { confirm } = useFeedback();

  const visible = useMemo(() => {
    const q = normalize(search.trim());
    const filtered = q
      ? characters.filter((c) =>
          [c.name, raceName(c.raceId), classLine(c), originName(c.originId), c.concept || '', c.playerName || '']
            .map(normalize)
            .some((field) => field.includes(q))
        )
      : characters;

    const sorted = [...filtered];
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    if (sort === 'level') sorted.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name, 'pt-BR'));
    if (sort === 'recent') sorted.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    return sorted;
  }, [characters, search, sort]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImportCharacter(file);
    e.target.value = '';
  };

  const requestDelete = async (char: CharacterSheet) => {
    const ok = await confirm({
      title: `Excluir ${char.name}?`,
      message: 'A ficha, o inventário e as anotações deste herói serão apagados deste dispositivo. Esta ação não pode ser desfeita.',
      confirmLabel: 'Excluir herói',
      tone: 'danger',
    });
    if (ok) onDeleteCharacter(char.id);
  };

  return (
    <>
      <AppBar
        title="Heróis"
        subtitle={`${characters.length} ${characters.length === 1 ? 'herói na guilda' : 'heróis na guilda'}`}
        actions={
          <>
            <button type="button" className="icon-btn" onClick={() => fileRef.current?.click()} aria-label="Importar ficha (JSON)" title="Importar ficha (JSON)">
              <Upload size={21} />
            </button>
            <button type="button" className="btn btn-primary btn-sm btn-pill" onClick={onCreateNew}>
              <Plus size={18} />
              Novo
            </button>
          </>
        }
      />
      <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={handleFileChange} />

      <main className="page page-wide stack-lg">
        {characters.length > 0 && (
          <div className="subbar">
            <div className="heroes-toolbar">
              <SearchField value={search} onChange={setSearch} placeholder="Buscar herói…" />
              <SelectField
                value={sort}
                onChange={(v) => setSort(v as SortKey)}
                ariaLabel="Ordenar heróis"
                options={[
                  { value: 'recent', label: 'Recentes' },
                  { value: 'name', label: 'Nome' },
                  { value: 'level', label: 'Nível' },
                ]}
              />
            </div>
          </div>
        )}

        {characters.length === 0 ? (
          <EmptyState
            icon={<Users size={26} />}
            title="Sua guilda está vazia"
            description="Crie um herói com o criador guiado ou importe uma ficha em JSON exportada por este app."
            action={
              <div className="hstack wrap" style={{ justifyContent: 'center' }}>
                <button type="button" className="btn btn-primary" onClick={onCreateNew}>
                  <Plus size={18} />
                  Criar herói
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
                  <Upload size={18} />
                  Importar JSON
                </button>
              </div>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState
            title="Nenhum herói encontrado"
            description={`Nada corresponde a “${search}”.`}
            action={
              <button type="button" className="btn btn-secondary" onClick={() => setSearch('')}>
                Limpar busca
              </button>
            }
          />
        ) : (
          <div className="hero-list">
            {visible.map((char) => {
              const { currentHp, maxHp, tempHp, currentMp, maxMp, defense } = char.stats;
              const isActive = char.id === activeCharacterId;
              return (
                <article
                  key={char.id}
                  className="card classed card-interactive hero-card animate-in"
                  style={classColorVars(char.classId)}
                  onClick={() => onOpenCharacter(char)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir ficha de ${char.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenCharacter(char);
                    }
                  }}
                >
                  <div className="hero-card-head">
                    <ClassSigil classId={char.classId} />
                    <div className="stack-xs grow">
                      <div className="hstack wrap">
                        <span className="hero-card-name">{char.name}</span>
                        {isActive && <span className="badge badge-accent">Ativo</span>}
                      </div>
                      <span className="t-sm t-2">
                        {raceName(char.raceId)} · {classLine(char)}
                      </span>
                      <span className="t-xs t-3">
                        {originName(char.originId)} · {deityName(char.deityId)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="icon-btn shrink-0"
                      aria-label={`Mais ações para ${char.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuFor(char);
                      }}
                    >
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {char.concept && <p className="hero-card-concept clamp-2">“{char.concept}”</p>}

                  <div className="hero-card-stats">
                    <div className="hero-stat">
                      <span className="stat-label">PV</span>
                      <span className="t-bold t-num">
                        {currentHp}
                        <span className="t-3 t-sm">/{maxHp.value}</span>
                        {tempHp > 0 && <span className="t-temp t-sm"> +{tempHp}</span>}
                      </span>
                      <span className="meter meter-hp" style={{ '--pct': percent(currentHp, maxHp.value) } as React.CSSProperties}>
                        <span className="meter-fill" />
                      </span>
                    </div>
                    <div className="hero-stat">
                      <span className="stat-label">PM</span>
                      <span className="t-bold t-num">
                        {currentMp}
                        <span className="t-3 t-sm">/{maxMp.value}</span>
                      </span>
                      <span className="meter meter-mp" style={{ '--pct': percent(currentMp, maxMp.value) } as React.CSSProperties}>
                        <span className="meter-fill" />
                      </span>
                    </div>
                    <div className="hero-stat">
                      <span className="stat-label">
                        <Shield size={12} />
                        Defesa
                      </span>
                      <span className="t-bold t-num t-lg">{defense.value}</span>
                    </div>
                  </div>

                  <div className="hero-attrs" aria-label="Atributos">
                    {ATTR_KEYS.map((key) => (
                      <span key={key} className="hero-attr">
                        <span className="hero-attr-key">{key.toUpperCase()}</span>
                        <span className="hero-attr-val">{formatSigned(char.totalAttributes[key])}</span>
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <MenuSheet
        open={!!menuFor}
        onClose={() => setMenuFor(null)}
        title={menuFor?.name}
        subtitle={menuFor ? `${raceName(menuFor.raceId)} · ${classLine(menuFor)}` : undefined}
        items={
          menuFor
            ? [
                { id: 'open', label: 'Abrir ficha', icon: <ExternalLink size={20} />, onSelect: () => onOpenCharacter(menuFor) },
                {
                  id: 'edit',
                  label: 'Editar no criador',
                  description: 'Refaz as escolhas de 1º nível',
                  icon: <Pencil size={20} />,
                  onSelect: () => onEditCharacter(menuFor),
                },
                { id: 'dup', label: 'Duplicar', icon: <Copy size={20} />, onSelect: () => onDuplicateCharacter(menuFor) },
                {
                  id: 'export',
                  label: 'Exportar JSON',
                  description: 'Backup ou compartilhamento da ficha',
                  icon: <Download size={20} />,
                  onSelect: () => onExportCharacter(menuFor),
                },
                {
                  id: 'delete',
                  label: 'Excluir herói',
                  icon: <Trash2 size={20} />,
                  danger: true,
                  onSelect: () => requestDelete(menuFor),
                },
              ]
            : []
        }
      />
    </>
  );
};
