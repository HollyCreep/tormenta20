import React from 'react';
import { Info } from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { DetailModalData } from '../common/DetailModal';
import { formatSigned } from '../../utils/displayNames';

interface CharacterAttributesProps {
  character: CharacterSheet;
  onRollDice: (title: string, diceSides: number, modifier: number, count?: number) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

/**
 * Atributos em grade 3×2. Tocar rola 1d20 + atributo; o "i" abre regras e decomposição.
 * Em T20 JDA o valor do atributo É o modificador (Cap. 1, pág. 17).
 */
export const CharacterAttributes: React.FC<CharacterAttributesProps> = ({ character, onRollDice, onSetModalDetail }) => (
  <section className="attr-grid" aria-label="Atributos">
    {ATTRIBUTES_LIST.map((attr) => {
      const mod = character.totalAttributes[attr.key] || 0;
      const base = character.baseAttributes[attr.key] || 0;
      const racial = character.racialModifiers[attr.key] || 0;
      const tone = mod > 0 ? 'is-positive' : mod < 0 ? 'is-negative' : '';

      const openDetail = () => {
        const citation = RULES_CITATIONS['ATTR_' + attr.key.toUpperCase()];
        onSetModalDetail({
          title: `${attr.name} (${attr.shortName})`,
          category: 'Atributo básico',
          subtitle: `Base ${formatSigned(base)} + Raça ${formatSigned(racial)} = ${formatSigned(mod)}`,
          description:
            attr.description +
            (citation ? `\n\n${citation.explanation}` : '') +
            `\n\nTestes e regras associadas: ${attr.appliedTo.join(', ')}.`,
          ruleCitation: citation,
          stats: [
            { label: 'Valor base', value: formatSigned(base) },
            { label: 'Modificador racial', value: formatSigned(racial) },
            { label: 'Valor total', value: formatSigned(mod) },
          ],
        });
      };

      return (
        <div key={attr.key} className={`attr-tile ${tone}`}>
          <button
            type="button"
            className="attr-roll"
            onClick={() => onRollDice(`Teste de ${attr.name}`, 20, mod)}
            aria-label={`Rolar teste de ${attr.name}: 1d20 ${formatSigned(mod)}`}
          >
            <span className="attr-key">{attr.shortName}</span>
            <span className="attr-value t-num">{formatSigned(mod)}</span>
            <span className="attr-name">{attr.name}</span>
          </button>
          <button type="button" className="attr-info" onClick={openDetail} aria-label={`Regras de ${attr.name}`}>
            <Info size={15} />
          </button>
        </div>
      );
    })}
  </section>
);
