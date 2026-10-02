import React, { useState } from 'react';
import { Brain, Check, Info, Lock, ShieldAlert } from 'lucide-react';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { CharacterAttributes } from '../../types/character';
import type { DetailModalData } from '../common/DetailModal';
import { Counter, Segmented } from '../ui/controls';
import { StepIntro } from './wizardUi';

interface StepSkillsProps {
  totalAttributes: CharacterAttributes;
  raceSkills?: string[];
  classSkills?: string[];
  originSkills?: string[];
  selectedIntSkills: string[];
  onSelectIntSkills: (skills: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

type View = 'todas' | 'livres' | 'treinadas';

export const StepSkills: React.FC<StepSkillsProps> = ({
  totalAttributes,
  raceSkills = [],
  classSkills = [],
  originSkills = [],
  selectedIntSkills,
  onSelectIntSkills,
  onOpenDetail,
}) => {
  const [view, setView] = useState<View>('todas');
  const intBonus = Math.max(0, totalAttributes.int);

  const sourceOf = (id: string) =>
    classSkills.includes(id) ? 'Classe' : originSkills.includes(id) ? 'Origem' : raceSkills.includes(id) ? 'Raça' : '';

  const toggle = (id: string) => {
    if (selectedIntSkills.includes(id)) onSelectIntSkills(selectedIntSkills.filter((s) => s !== id));
    else if (selectedIntSkills.length < intBonus) onSelectIntSkills([...selectedIntSkills, id]);
  };

  const visible = SKILLS_LIST.filter((s) => {
    const fixed = !!sourceOf(s.id);
    const trained = fixed || selectedIntSkills.includes(s.id);
    if (view === 'livres') return !fixed;
    if (view === 'treinadas') return trained;
    return true;
  });

  return (
    <div className="stack-lg">
      <StepIntro
        title="Perícias"
        description="Classe, raça e origem já treinaram algumas. Cada ponto positivo de Inteligência concede mais uma perícia à sua escolha."
      />

      <div className={`card int-card${intBonus > 0 && selectedIntSkills.length === intBonus ? ' is-done' : ''}`}>
        <span className="sigil sigil-sm">
          <Brain size={18} />
        </span>
        <div className="stack-xs grow">
          <span className="t-semibold">Inteligência {intBonus > 0 ? `+${intBonus}` : totalAttributes.int}</span>
          <span className="t-xs t-3">
            {intBonus > 0 ? `Escolha ${intBonus} perícia${intBonus > 1 ? 's' : ''} de qualquer área.` : 'Sem perícias extras por Inteligência.'}
          </span>
        </div>
        {intBonus > 0 && <Counter value={selectedIntSkills.length} total={intBonus} />}
        <button
          type="button"
          className="info-btn"
          aria-label="Regra de perícias por Inteligência"
          onClick={() =>
            onOpenDetail({
              title: RULES_CITATIONS.INTELLIGENCE_SKILLS?.title || 'Perícias por Inteligência',
              category: 'Regra oficial',
              description: RULES_CITATIONS.INTELLIGENCE_SKILLS?.explanation || '',
              ruleCitation: RULES_CITATIONS.INTELLIGENCE_SKILLS,
              initialTab: 'rules',
            })
          }
        >
          <Info size={16} />
        </button>
      </div>

      <Segmented<View>
        value={view}
        onChange={setView}
        ariaLabel="Filtrar perícias"
        options={[
          { value: 'todas', label: 'Todas', count: SKILLS_LIST.length },
          { value: 'livres', label: 'Disponíveis' },
          { value: 'treinadas', label: 'Treinadas' },
        ]}
      />

      <div className="list">
        {visible.map((s) => {
          const source = sourceOf(s.id);
          const byInt = selectedIntSkills.includes(s.id);
          const blocked = !source && !byInt && selectedIntSkills.length >= intBonus;
          return (
            <div key={s.id} className={`row pick-row${byInt ? ' is-selected' : ''}`}>
              <button
                type="button"
                role="checkbox"
                aria-checked={!!source || byInt}
                aria-disabled={!!source || blocked || undefined}
                className="pick-main"
                onClick={() => !source && toggle(s.id)}
                disabled={!!source || blocked}
              >
                <span className={`mark${byInt || source ? ' is-on' : ''}${source ? ' mark-fixed' : ''}`}>
                  {source ? <Lock size={11} /> : byInt ? <Check size={14} strokeWidth={3} /> : null}
                </span>
                <span className="row-main">
                  <span className="row-title">{s.name}</span>
                  <span className="hstack-xs wrap">
                    <span className="badge">{s.attribute.toUpperCase()}</span>
                    {source && <span className="badge badge-accent">{source}</span>}
                    {byInt && <span className="badge badge-info">Inteligência</span>}
                    {s.trainedOnly && <span className="badge badge-warning">Só treinada</span>}
                    {s.armorPenalty && (
                      <span className="badge">
                        <ShieldAlert size={11} />
                        Armadura
                      </span>
                    )}
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="icon-btn icon-btn-sm"
                aria-label={`Sobre ${s.name}`}
                onClick={() => onOpenDetail({ title: s.name, category: `Perícia · ${s.attribute.toUpperCase()}`, description: s.description })}
              >
                <Info size={17} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
