import React, { useMemo, useState } from 'react';
import { BookOpen, Swords } from 'lucide-react';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { CLASSES_LIST } from '../../data/classes';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { GeneralPower } from '../../types/rules';
import type { CharacterSheet } from '../../types/character';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { POWER_CATEGORY_META, PowerCategoryBadge } from '../common/T20Badge';
import { checkPowerPrerequisites, type PrerequisiteContext } from '../../utils/rulesValidation';
import { cleanT20Text, getGeneralPowerRuleCitation } from '../../utils/textUtils';
import { EmptyState, SearchField, SelectField, ToggleRow } from '../ui/controls';
import { ActiveFilters, FilterButton, FilterSheet, normalizeSearch } from './FilterSheet';

interface PowersCompendiumProps {
  switcher?: React.ReactNode;
  onBack?: () => void;
  activeCharacter?: CharacterSheet | null;
  characters?: CharacterSheet[];
}

const CATEGORIES = ['combate', 'destino', 'magia', 'concedido', 'tormenta'] as const;

/** Contexto de pré-requisitos a partir da ficha (proficiências e conjuração vêm da definição da classe). */
const contextFor = (char: CharacterSheet): PrerequisiteContext => {
  const cls = CLASSES_LIST.find((c) => c.id === char.classId);
  return {
    attributes: char.totalAttributes,
    trainedSkillIds: Object.values(char.skills)
      .filter((s) => s.isTrained)
      .map((s) => s.id),
    proficiencies: cls
      ? { weapons: cls.proficiencies.weapons, armor: cls.proficiencies.armor, shields: cls.proficiencies.shields }
      : undefined,
    isSpellcaster: Boolean(cls?.spellcaster) || (char.spells || []).length > 0,
  };
};

export const PowersCompendium: React.FC<PowersCompendiumProps> = ({ switcher, activeCharacter, characters = [] }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todas');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [charId, setCharId] = useState<string>(activeCharacter?.id || '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detail, setDetail] = useState<DetailModalData | null>(null);

  const selectedChar = characters.find((c) => c.id === charId) || null;
  const ctx = useMemo(() => (selectedChar ? contextFor(selectedChar) : null), [selectedChar]);

  const results = useMemo(() => {
    const q = normalizeSearch(search.trim());
    return GENERAL_POWERS_LIST.filter((p) => {
      if (category !== 'todas' && p.category !== category) return false;
      if (q && !normalizeSearch(`${p.name} ${p.description} ${p.prerequisites || ''}`).includes(q)) return false;
      if (onlyEligible) {
        if (ctx) return checkPowerPrerequisites(p.id, ctx).isMet;
        return !p.prerequisites || !p.prerequisites.trim();
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [search, category, onlyEligible, ctx]);

  const chips = [
    ...(category !== 'todas'
      ? [{ key: 'cat', label: POWER_CATEGORY_META[category]?.label || category, onRemove: () => setCategory('todas') }]
      : []),
    ...(selectedChar ? [{ key: 'char', label: selectedChar.name, onRemove: () => setCharId('') }] : []),
    ...(onlyEligible ? [{ key: 'el', label: 'Posso aprender', onRemove: () => setOnlyEligible(false) }] : []),
  ];

  const openDetail = (pow: GeneralPower) => {
    const prereq = pow.prerequisites ? cleanT20Text(pow.prerequisites) : undefined;
    setDetail({
      title: cleanT20Text(pow.name),
      category: `Poder geral · ${POWER_CATEGORY_META[pow.category]?.label || pow.category}`,
      subtitle: prereq ? `Pré-requisitos: ${prereq}` : 'Sem pré-requisitos',
      prerequisites: prereq,
      description: cleanT20Text(pow.description),
      ruleCitation: getGeneralPowerRuleCitation(pow),
    });
  };

  return (
    <>
      <div className="subbar compendium-bar">
        {switcher}
        <div className="filter-row">
          <SearchField value={search} onChange={setSearch} placeholder="Buscar poder ou requisito…" />
          <FilterButton activeCount={chips.length} onClick={() => setFiltersOpen(true)} />
        </div>
        <ActiveFilters chips={chips} />
      </div>

      <div className="hstack between">
        <span className="t-sm t-3">
          {results.length} {results.length === 1 ? 'poder' : 'poderes'}
          {selectedChar ? ` · requisitos de ${selectedChar.name}` : ''}
        </span>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() =>
            setDetail({
              title: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES.title,
              category: 'Regra oficial',
              description: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES.explanation,
              ruleCitation: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES,
              initialTab: 'rules',
            })
          }
        >
          <BookOpen size={16} />
          Regras
        </button>
      </div>

      {results.length === 0 ? (
        <EmptyState icon={<Swords size={24} />} title="Nenhum poder encontrado" description="Ajuste a busca ou os filtros." />
      ) : (
        <div className="list compendium-list">
          {results.map((pow) => {
            const res = ctx ? checkPowerPrerequisites(pow.id, ctx) : null;
            return (
              <button key={pow.id} type="button" className="row items-start" onClick={() => openDetail(pow)}>
                <span className="row-main">
                  <span className="row-title">{cleanT20Text(pow.name)}</span>
                  <span className="row-sub clamp-2">{cleanT20Text(pow.description)}</span>
                  <span className="hstack-xs wrap">
                    <PowerCategoryBadge category={pow.category} />
                    {res ? (
                      <span className={`badge ${res.isMet ? 'badge-success' : 'badge-warning'}`}>
                        {res.isMet ? 'Pode aprender' : `Falta: ${res.unmetRequirements.join(', ')}`}
                      </span>
                    ) : pow.prerequisites ? (
                      <span className="badge">Req.: {cleanT20Text(pow.prerequisites)}</span>
                    ) : (
                      <span className="badge badge-success">Sem pré-requisitos</span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={results.length}
        onClear={() => {
          setCategory('todas');
          setOnlyEligible(false);
          setCharId('');
        }}
      >
        <SelectField
          label="Categoria"
          value={category}
          onChange={setCategory}
          options={[{ value: 'todas', label: 'Todas' }, ...CATEGORIES.map((c) => ({ value: c, label: POWER_CATEGORY_META[c].label }))]}
        />
        <SelectField
          label="Conferir requisitos de"
          value={charId}
          onChange={setCharId}
          options={[{ value: '', label: 'Nenhum herói (regra geral)' }, ...characters.map((c) => ({ value: c.id, label: c.name }))]}
        />
        <ToggleRow
          label="Só os que posso aprender"
          description={selectedChar ? `Conforme a ficha de ${selectedChar.name}` : 'Sem herói: mostra só poderes sem pré-requisito'}
          checked={onlyEligible}
          onChange={setOnlyEligible}
        />
      </FilterSheet>

      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </>
  );
};
