import React, { useState } from 'react';
import { CharacterSheet } from '../../types/character';
import { StatBreakdownBadge } from '../common/StatBreakdownBadge';
import { ClassBadge } from '../common/T20Badge';
import { getClassTheme } from '../../styles/classTheme';
import {
  Plus,
  Upload,
  Download,
  Trash2,
  Copy,
  Edit,
  ExternalLink,
  Shield,
  Heart,
  Zap,
  Sparkles,
  BookOpen,
  Search,
} from 'lucide-react';

interface CharacterListProps {
  characters: CharacterSheet[];
  onOpenCharacter: (character: CharacterSheet) => void;
  onEditCharacter: (character: CharacterSheet) => void;
  onCreateNew: () => void;
  onDuplicateCharacter: (character: CharacterSheet) => void;
  onDeleteCharacter: (id: string) => void;
  onExportCharacter: (character: CharacterSheet) => void;
  onImportCharacter: (file: File) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onOpenCharacter,
  onEditCharacter,
  onCreateNew,
  onDuplicateCharacter,
  onDeleteCharacter,
  onExportCharacter,
  onImportCharacter,
}) => {
  const [search, setSearch] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<CharacterSheet | null>(null);

  const filteredCharacters = characters.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.raceId.toLowerCase().includes(search.toLowerCase()) ||
      c.classId.toLowerCase().includes(search.toLowerCase()) ||
      (c.concept && c.concept.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportCharacter(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 6rem 1.5rem', maxWidth: '1280px' }}>
      {/* Hero Banner Épico */}
      <div
        className="t20-card t20-card-gold"
        style={{
          padding: '2.5rem 2rem',
          marginBottom: '2.5rem',
          background: 'radial-gradient(ellipse at top right, rgba(230, 57, 70, 0.25) 0%, rgba(20, 23, 38, 0.95) 70%)',
          border: '1px solid var(--border-gold)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-ruby">Tormenta 20</span>
            <span className="badge badge-gold">Jogo do Ano v1.3</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', lineHeight: 1.2, margin: '0.25rem 0 0.75rem 0' }}>
            Criador & Gerenciador de Fichas
          </h1>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Crie seus heróis artonianos com automação estrita das regras oficiais: raças, classes, origens, deuses, perícias e cálculo de valores em tempo real com somatórias transparentes.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '220px' }}>
          <button
            type="button"
            onClick={onCreateNew}
            className="btn btn-primary"
            style={{ padding: '0.9rem 1.5rem', fontSize: '1.05rem', gap: '0.5rem', boxShadow: '0 8px 24px rgba(230, 57, 70, 0.45)' }}
          >
            <Plus size={20} />
            Novo Personagem
          </button>

          <label
            className="btn btn-secondary"
            style={{ cursor: 'pointer', padding: '0.65rem 1rem', fontSize: '0.875rem', gap: '0.4rem', justifyContent: 'center' }}
          >
            <Upload size={16} />
            Importar Ficha (JSON)
            <input type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Barra de Filtro e Busca */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Meus Personagens</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            {characters.length} personagem(ns) persistido(s) no navegador
          </span>
        </div>

        <div style={{ maxWidth: '300px', width: '100%' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Buscar por nome, classe, raça..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.25rem', fontSize: '0.9rem' }}
            />
          </div>
        </div>
      </div>

      {/* Grade de Personagens */}
      {filteredCharacters.length === 0 ? (
        <div
          className="t20-card"
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--border-color)',
          }}
        >
          <Sparkles size={48} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.5rem' }}>
            Nenhum personagem encontrado
          </h3>
          <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
            {search ? 'Nenhum aventureiro corresponde à sua pesquisa.' : 'Você ainda não possui fichas criadas. Inicie a jornada criando o seu primeiro herói!'}
          </p>
          <button type="button" onClick={onCreateNew} className="btn btn-primary">
            <Plus size={18} />
            Criar Meu Primeiro Herói
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredCharacters.map((char) => {
            const classTokens = getClassTheme(char.classId);
            return (
              <div
                key={char.id}
                className="t20-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  gap: '1rem',
                  transition: 'var(--transition)',
                  borderLeft: `4px solid ${classTokens.primary}`,
                  background: `linear-gradient(155deg, ${classTokens.surface}2e 0%, rgba(17, 24, 39, 0.95) 100%)`,
                }}
              >
                <div>
                  {/* Header do Card */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
                        {char.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                        <ClassBadge classIdOrName={char.classId} />
                        <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                          Nv. {char.level}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                          • {char.raceId.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <span className="badge badge-ruby" style={{ fontSize: '0.7rem' }}>
                      {char.originId.toUpperCase()}
                    </span>
                  </div>

                {char.concept && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '0.25rem 0 0.75rem 0' }}>
                    "{char.concept}"
                  </p>
                )}

                {/* Vitais Rápidos com Somatórias */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    margin: '0.75rem 0',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                      <Heart size={12} />
                      PV
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {char.stats.currentHp} / {char.stats.maxHp.value}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                      <Zap size={12} />
                      PM
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
                      {char.stats.currentMp} / {char.stats.maxMp.value}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--t20-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                      <Shield size={12} />
                      Defesa
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
                      {char.stats.defense.value}
                    </div>
                  </div>
                </div>

                {/* Resumo de Atributos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem', textAlign: 'center', fontSize: '0.75rem' }}>
                  {(['for', 'des', 'con', 'int', 'sab', 'car'] as const).map((k) => {
                    const val = char.totalAttributes[k] || 0;
                    return (
                      <div key={k} style={{ padding: '0.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'block' }}>{k.toUpperCase()}</span>
                        <strong style={{ color: val > 0 ? 'var(--t20-gold-light)' : val < 0 ? '#f87171' : '#cbd5e1' }}>
                          {val > 0 ? `+${val}` : val}
                        </strong>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botões de Ação do Card */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => onOpenCharacter(char)}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.85rem', gap: '0.35rem' }}
                >
                  <ExternalLink size={15} />
                  Abrir Ficha
                </button>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => onEditCharacter(char)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem' }}
                    title="Editar no criador passo a passo"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDuplicateCharacter(char)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem' }}
                    title="Duplicar personagem"
                  >
                    <Copy size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onExportCharacter(char)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem' }}
                    title="Exportar arquivo JSON"
                  >
                    <Download size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCandidate(char)}
                    className="btn btn-danger"
                    style={{ padding: '0.45rem' }}
                    title="Excluir personagem"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {deleteCandidate && (
        <div className="modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#f87171', marginBottom: '0.5rem' }}>
              Confirmar Exclusão
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Tem certeza que deseja excluir a ficha de <strong>{deleteCandidate.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteCharacter(deleteCandidate.id);
                  setDeleteCandidate(null);
                }}
                className="btn btn-danger"
              >
                Excluir Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
