import React, { useMemo, useState } from 'react';
import { Check, Info, Sparkles } from 'lucide-react';
import { SPELLS_LIST } from '../../data/spells';
import type { DetailModalData } from '../common/DetailModal';
import { SchoolBadge } from '../common/T20Badge';
import { cleanT20Text, getSpellRuleCitation } from '../../utils/textUtils';
import { Counter, EmptyState, SearchField, SelectField } from '../ui/controls';
import { StepIntro } from './wizardUi';

interface StepSpellsProps {
  isSpellcaster: boolean;
  spellcasterType?: 'arcana' | 'divina';
  allowedCount: number;
  /** Bardo e Druida: escolhem três escolas e só lançam magias delas (Cap. 1, págs. 44 e 61). */
  schoolsCount?: number;
  selectedSchools?: string[];
  onSelectSchools?: (schools: string[]) => void;
  selectedSpells: string[];
  onSelectSpells: (spells: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

const SCHOOLS = ['Abjuração', 'Adivinhação', 'Convocação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];

/** Magias iniciais: no 1º nível o conjurador só conhece magias de 1º círculo (Cap. 4). */
export const StepSpells: React.FC<StepSpellsProps> = ({
  isSpellcaster,
  spellcasterType = 'arcana',
  allowedCount,
  schoolsCount = 0,
  selectedSchools = [],
  onSelectSchools,
  selectedSpells,
  onSelectSpells,
  onOpenDetail,
}) => {
  const [school, setSchool] = useState('todas');
  const [search, setSearch] = useState('');

  const available = useMemo(
    () =>
      SPELLS_LIST.filter(
        (s) =>
          s.circle === 1 &&
          (s.type === 'universal' || s.type === spellcasterType) &&
          (!schoolsCount || selectedSchools.includes(s.school))
      ).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [spellcasterType, schoolsCount, selectedSchools]
  );

  const visible = available.filter((s) => {
    if (school !== 'todas' && s.school !== school) return false;
    const q = search.trim().toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
  });

  if (!isSpellcaster || allowedCount <= 0) {
    return (
      <EmptyState
        icon={<Sparkles size={24} />}
        title="Sem magias no 1º nível"
        description="Sua classe não conjura magias no início da carreira. Pode seguir para o próximo passo."
      />
    );
  }

  const toggleSchool = (sc: string) => {
    if (!onSelectSchools) return;
    if (selectedSchools.includes(sc)) {
      onSelectSchools(selectedSchools.filter((x) => x !== sc));
      // magias de uma escola desmarcada deixam de ser válidas
      onSelectSpells(selectedSpells.filter((id) => SPELLS_LIST.find((x) => x.id === id)?.school !== sc));
    } else if (selectedSchools.length < schoolsCount) onSelectSchools([...selectedSchools, sc]);
  };

  const toggle = (id: string) => {
    if (selectedSpells.includes(id)) onSelectSpells(selectedSpells.filter((x) => x !== id));
    else if (selectedSpells.length < allowedCount) onSelectSpells([...selectedSpells, id]);
  };

  const chosen = selectedSpells.map((id) => SPELLS_LIST.find((s) => s.id === id)).filter(Boolean);

  return (
    <div className="stack-lg">
      <StepIntro
        title="Magias"
        description={`Escolha ${allowedCount} magias ${spellcasterType === 'divina' ? 'divinas' : 'arcanas'} (ou universais) de 1º círculo. Cada uma custa 1 PM.`}
      />

      {schoolsCount > 0 && (
        <div className="card stack-sm">
          <div className="hstack between">
            <span className="t-semibold">Escolas de magia (definitivas)</span>
            <Counter value={selectedSchools.length} total={schoolsCount} />
          </div>
          <span className="t-xs t-3">Escolha {schoolsCount} escolas; você só pode lançar magias delas (Cap. 1, págs. 44 e 61).</span>
          <div className="chip-wrap">
            {SCHOOLS.map((sc) => (
              <button
                key={sc}
                type="button"
                className={`chip chip-sm${selectedSchools.includes(sc) ? ' is-active' : ''}`}
                aria-pressed={selectedSchools.includes(sc)}
                onClick={() => toggleSchool(sc)}
              >
                {sc}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card stack-sm spell-tray">
        <div className="hstack between">
          <span className="t-semibold">Seu grimório</span>
          <Counter value={selectedSpells.length} total={allowedCount} />
        </div>
        {chosen.length === 0 ? (
          <span className="t-sm t-3">Nenhuma magia escolhida ainda.</span>
        ) : (
          <div className="chip-wrap">
            {chosen.map((s) => (
              <button key={s!.id} type="button" className="chip chip-sm is-active" onClick={() => toggle(s!.id)} aria-label={`Remover ${s!.name}`}>
                {cleanT20Text(s!.name)} ×
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="filter-row">
        <SearchField value={search} onChange={setSearch} placeholder="Buscar magia…" />
        <SelectField
          value={school}
          onChange={setSchool}
          ariaLabel="Escola"
          options={[{ value: 'todas', label: 'Escolas' }, ...SCHOOLS.map((s) => ({ value: s, label: s }))]}
        />
      </div>

      <span className="t-sm t-3">{visible.length} magias de 1º círculo</span>

      <div className="list">
        {visible.map((sp) => {
          const on = selectedSpells.includes(sp.id);
          const blocked = !on && selectedSpells.length >= allowedCount;
          return (
            <div key={sp.id} className={`row pick-row${on ? ' is-selected' : ''}`}>
              <button type="button" role="checkbox" aria-checked={on} className="pick-main" disabled={blocked} onClick={() => toggle(sp.id)}>
                <span className={`mark${on ? ' is-on' : ''}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                <span className="row-main">
                  <span className="row-title">{cleanT20Text(sp.name)}</span>
                  <span className="row-sub clamp-2">{cleanT20Text(sp.description)}</span>
                  <span className="hstack-xs wrap">
                    <SchoolBadge school={sp.school} />
                    <span className="badge">{cleanT20Text(sp.execution)}</span>
                    <span className="badge">{cleanT20Text(sp.range)}</span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="icon-btn icon-btn-sm"
                aria-label={`Detalhes de ${sp.name}`}
                onClick={() =>
                  onOpenDetail({
                    title: cleanT20Text(sp.name),
                    category: `Magia ${sp.type} · 1º círculo`,
                    subtitle: sp.school,
                    cost: '1 PM',
                    execution: cleanT20Text(sp.execution),
                    range: cleanT20Text(sp.range),
                    targetArea: cleanT20Text(sp.targetArea),
                    duration: cleanT20Text(sp.duration),
                    resistance: sp.resistance,
                    description: cleanT20Text(sp.description),
                    upgrades: sp.upgrades,
                    ruleCitation: getSpellRuleCitation(sp),
                  })
                }
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
