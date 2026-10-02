import React from 'react';
import { ChevronsUp } from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { ClassSigil, classColorVars } from '../common/ClassSigil';
import { classLine, deityName, originName, raceName } from '../../utils/displayNames';

interface CharacterHeaderProps {
  character: CharacterSheet;
  onOpenLevelUp: () => void;
  onOpenRaceDetail: () => void;
  onOpenClassDetail: () => void;
  onOpenOriginDetail: () => void;
  onOpenDeityDetail: () => void;
}

/** Cartão de identidade do herói (topo da ficha). */
export const CharacterHeader: React.FC<CharacterHeaderProps> = ({
  character,
  onOpenLevelUp,
  onOpenRaceDetail,
  onOpenClassDetail,
  onOpenOriginDetail,
  onOpenDeityDetail,
}) => {
  const hasDeity = character.deityId && character.deityId !== 'nenhum';
  const identity = [
    { key: 'raca', label: 'Raça', value: raceName(character.raceId), onClick: onOpenRaceDetail },
    { key: 'classe', label: 'Classe', value: classLine(character), onClick: onOpenClassDetail },
    { key: 'origem', label: 'Origem', value: originName(character.originId), onClick: onOpenOriginDetail },
    {
      key: 'divindade',
      label: 'Divindade',
      value: deityName(character.deityId),
      onClick: hasDeity ? onOpenDeityDetail : undefined,
    },
  ];

  return (
    <section className="card classed sheet-hero" style={classColorVars(character.classId)}>
      <div className="sheet-hero-top">
        <ClassSigil classId={character.classId} size="xl" />
        <div className="stack-xs grow">
          <span className="eyebrow t-class">Nível {character.level}</span>
          <h1 className="sheet-hero-name">{character.name}</h1>
          {character.playerName && <span className="t-xs t-3">Jogador: {character.playerName}</span>}
        </div>
      </div>

      {character.concept && <p className="sheet-hero-concept">“{character.concept}”</p>}

      <div className="identity-grid">
        {identity.map((item) =>
          item.onClick ? (
            <button key={item.key} type="button" className="id-chip" onClick={item.onClick}>
              <span className="id-chip-label">{item.label}</span>
              <span className="id-chip-value truncate">{item.value}</span>
            </button>
          ) : (
            <div key={item.key} className="id-chip is-static">
              <span className="id-chip-label">{item.label}</span>
              <span className="id-chip-value truncate">{item.value}</span>
            </div>
          )
        )}
      </div>

      {character.level < 20 && (
        <button type="button" className="btn btn-tonal btn-block levelup-btn no-print" onClick={onOpenLevelUp}>
          <ChevronsUp size={20} />
          Subir para o nível {character.level + 1}
        </button>
      )}
    </section>
  );
};
