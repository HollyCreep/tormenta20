import React from 'react';
import type { CharacterSheet } from '../../../types/character';
import { NotebookSection } from '../NotebookSection';

interface BioTabProps {
  character: CharacterSheet;
  onUpdateCharacter: (character: CharacterSheet) => void;
}

export const BioTab: React.FC<BioTabProps> = ({ character, onUpdateCharacter }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        <div className="t20-card">
          <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
            Histórico & Personalidade
          </h3>
          <p style={{ color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>
            {character.bio.history || 'Nenhum histórico anotado ainda.'}
          </p>
        </div>

        <div className="t20-card">
          <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
            Aparência Física & Detalhes
          </h3>
          <p style={{ color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>
            {character.bio.appearance || 'Nenhuma aparência física descrita ainda.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>
              Idade: <strong>{character.bio.age || '—'}</strong>
            </span>
            <span>
              Gênero: <strong>{character.bio.gender || '—'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Caderno de Anotações Rico com Imagens e Câmera */}
      <NotebookSection
        notes={character.notes || []}
        onUpdateNotes={(updatedNotes) => {
          onUpdateCharacter({
            ...character,
            notes: updatedNotes,
          });
        }}
      />
    </div>
  );
};
