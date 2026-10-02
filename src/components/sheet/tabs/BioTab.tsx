import React from 'react';
import { Feather, UserRound } from 'lucide-react';
import type { CharacterSheet } from '../../../types/character';
import { NotebookSection } from '../NotebookSection';

interface BioTabProps {
  character: CharacterSheet;
  onUpdateCharacter: (character: CharacterSheet) => void;
  onEditInWizard?: () => void;
}

export const BioTab: React.FC<BioTabProps> = ({ character, onUpdateCharacter }) => {
  const { bio } = character;
  const details = [
    { label: 'Idade', value: bio.age },
    { label: 'Gênero', value: bio.gender },
    { label: 'Altura', value: bio.height },
    { label: 'Peso', value: bio.weight },
    { label: 'Olhos', value: bio.eyes },
    { label: 'Cabelos', value: bio.hair },
  ].filter((d) => d.value);

  return (
    <div className="stack-xl">
      <div className="grid-auto">
        <article className="card stack-sm">
          <h3 className="section-title t-md">
            <Feather size={18} />
            História & personalidade
          </h3>
          <p className="t-body pre-line">{bio.history || bio.personality || 'Nenhum histórico anotado ainda.'}</p>
        </article>

        <article className="card stack-sm">
          <h3 className="section-title t-md">
            <UserRound size={18} />
            Aparência
          </h3>
          <p className="t-body pre-line">{bio.appearance || 'Nenhuma aparência descrita ainda.'}</p>
          {details.length > 0 && (
            <div className="kv">
              {details.map((d) => (
                <div key={d.label} className="kv-item">
                  <span className="kv-key">{d.label}</span>
                  <span className="kv-value">{d.value}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>

      <NotebookSection
        notes={character.notes || []}
        onUpdateNotes={(updatedNotes) => onUpdateCharacter({ ...character, notes: updatedNotes })}
      />
    </div>
  );
};
