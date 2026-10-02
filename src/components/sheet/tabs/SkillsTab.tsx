import React, { useMemo, useState } from 'react';
import { Calculator, Lock, ShieldAlert } from 'lucide-react';
import type { CharacterSheet, TrainedSkillData } from '../../../types/character';
import { SKILLS_LIST } from '../../../data/skills';
import { RULES_CITATIONS } from '../../../data/rulesCitations';
import type { DetailModalData } from '../../common/DetailModal';
import { EmptyState, SearchField, Segmented } from '../../ui/controls';
import { formatSigned } from '../../../utils/displayNames';

interface SkillsTabProps {
  character: CharacterSheet;
  onRollSkill: (skillName: string, totalMod: number, formula: string) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

type SkillFilter = 'treinadas' | 'todas';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Bônus de treino pelo nível (Cap. 2, pág. 114): +2 (1–6), +4 (7–14), +6 (15–20). */
const trainingBonus = (level: number) => (level >= 15 ? 6 : level >= 7 ? 4 : 2);

export const SkillsTab: React.FC<SkillsTabProps> = ({ character, onRollSkill, onSetModalDetail }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<SkillFilter>('treinadas');

  const all = useMemo(
    () => Object.values(character.skills).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [character.skills]
  );
  const trainedCount = all.filter((s) => s.isTrained).length;
  const q = normalize(search.trim());
  const visible = all.filter((sk) => (filter === 'todas' || sk.isTrained) && (!q || normalize(sk.name).includes(q)));

  const openDetail = (sk: TrainedSkillData) => {
    const def = SKILLS_LIST.find((s) => s.id === sk.id);
    onSetModalDetail({
      title: sk.name,
      category: `Perícia · ${sk.attribute.toUpperCase()}`,
      subtitle: sk.isTrained
        ? `Treinada (+${trainingBonus(character.level)} de treino no nível ${character.level})`
        : 'Destreinada',
      description: def?.description || 'Perícia de Tormenta 20.',
      ruleCitation: RULES_CITATIONS.SKILL_TRAINING_NO_STACK,
      stats: [
        { label: 'Bônus total', value: formatSigned(sk.total) },
        { label: 'Fórmula', value: sk.breakdown.formula || '—' },
        ...sk.breakdown.components.map((c) => ({
          label: c.label,
          value: typeof c.value === 'number' ? formatSigned(c.value) : c.value,
        })),
      ],
    });
  };

  return (
    <div className="stack">
      <div className="stack-sm">
        <Segmented<SkillFilter>
          value={filter}
          onChange={setFilter}
          ariaLabel="Filtrar perícias"
          options={[
            { value: 'treinadas', label: 'Treinadas', count: trainedCount },
            { value: 'todas', label: 'Todas', count: all.length },
          ]}
        />
        <SearchField value={search} onChange={setSearch} placeholder="Buscar perícia…" />
      </div>

      {visible.length === 0 ? (
        <EmptyState title="Nenhuma perícia encontrada" description="Ajuste a busca ou mostre todas as perícias." />
      ) : (
        <div className="list">
          {visible.map((sk) => {
            const def = SKILLS_LIST.find((s) => s.id === sk.id);
            const locked = !!def?.trainedOnly && !sk.isTrained;
            return (
              <div key={sk.id} className={`row skill-row${sk.isTrained ? ' is-trained' : ''}`}>
                <button
                  type="button"
                  className="skill-main"
                  onClick={() => onRollSkill(sk.name, sk.total, sk.breakdown.formula)}
                  disabled={locked}
                  aria-label={locked ? `${sk.name}: somente treinada` : `Rolar ${sk.name}: 1d20 ${formatSigned(sk.total)}`}
                >
                  <span className="skill-attr">{sk.attribute.toUpperCase()}</span>
                  <span className="row-main">
                    <span className="row-title">
                      {sk.name}
                      {sk.isTrained && <span className="skill-trained-dot" aria-label="Treinada" />}
                    </span>
                    <span className="row-sub hstack-xs">
                      {locked ? (
                        <>
                          <Lock size={12} /> Somente treinada
                        </>
                      ) : sk.isTrained ? (
                        'Treinada'
                      ) : (
                        'Destreinada'
                      )}
                      {def?.armorPenalty && (
                        <span className="hstack-xs" title="Sofre penalidade de armadura">
                          · <ShieldAlert size={12} /> armadura
                        </span>
                      )}
                    </span>
                  </span>
                  <span className={`skill-total t-num${locked ? ' is-locked' : ''}`}>{formatSigned(sk.total)}</span>
                </button>
                <button type="button" className="icon-btn icon-btn-sm" onClick={() => openDetail(sk)} aria-label={`Cálculo de ${sk.name}`}>
                  <Calculator size={17} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
