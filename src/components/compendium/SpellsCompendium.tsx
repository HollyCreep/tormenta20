import React, { useMemo, useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { SPELLS_LIST } from '../../data/spells';
import type { Spell } from '../../types/rules';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { SchoolBadge, getSchoolInfo } from '../common/T20Badge';
import { cleanT20Text, getSpellRuleCitation } from '../../utils/textUtils';
import { EmptyState, SearchField, Segmented, SelectField } from '../ui/controls';
import { ActiveFilters, FilterButton, FilterSheet, normalizeSearch } from './FilterSheet';

interface SpellsCompendiumProps {
  switcher?: React.ReactNode;
  onBack?: () => void;
}

const COST: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };
const SCHOOLS = ['Abjuração', 'Adivinhação', 'Convocação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];
type SpellType = 'todos' | 'arcana' | 'divina' | 'universal';
const TYPE_LABEL: Record<SpellType, string> = { todos: 'Todas', arcana: 'Arcana', divina: 'Divina', universal: 'Universal' };

const CASTING_RULES: DetailModalData = {
  title: 'Lançando magias',
  category: 'Regra oficial',
  subtitle: 'Capítulo 4: Magia (pág. 176)',
  description:
    'Magias gastam Pontos de Mana (PM). O custo básico depende do círculo: 1 PM (1º), 3 PM (2º), 6 PM (3º), 10 PM (4º) e 15 PM (5º). O limite de PM que um conjurador pode gastar em uma mesma magia é igual ao seu nível de personagem.',
  ruleCitation: {
    id: 'regras_magia',
    title: 'Lançando Magias',
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 4: Magia',
    section: 'Regras de Conjuração',
    page: 'Página 176',
    quote:
      '“Para lançar uma magia, você precisa gastar Pontos de Mana (PM). O limite máximo de PM que você pode gastar em cada magia lançada é igual ao seu nível.”',
    explanation: 'Aprimoramentos aumentam o efeito da magia pagando PM adicionais, sempre respeitando o teto do seu nível.',
  },
  initialTab: 'rules',
};

export const SpellsCompendium: React.FC<SpellsCompendiumProps> = ({ switcher }) => {
  const [search, setSearch] = useState('');
  const [circle, setCircle] = useState<number>(0);
  const [school, setSchool] = useState('todas');
  const [type, setType] = useState<SpellType>('todos');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detail, setDetail] = useState<DetailModalData | null>(null);

  const results = useMemo(() => {
    const q = normalizeSearch(search.trim());
    return SPELLS_LIST.filter((sp) => {
      if (circle && sp.circle !== circle) return false;
      if (school !== 'todas' && sp.school !== school) return false;
      if (type !== 'todos' && sp.type !== type) return false;
      if (!q) return true;
      return normalizeSearch(`${sp.name} ${sp.description} ${sp.targetArea || ''}`).includes(q);
    }).sort((a, b) => a.circle - b.circle || a.name.localeCompare(b.name, 'pt-BR'));
  }, [search, circle, school, type]);

  const chips = [
    ...(circle ? [{ key: 'c', label: `${circle}º círculo`, onRemove: () => setCircle(0) }] : []),
    ...(type !== 'todos' ? [{ key: 't', label: TYPE_LABEL[type], onRemove: () => setType('todos') }] : []),
    ...(school !== 'todas' ? [{ key: 's', label: school, onRemove: () => setSchool('todas') }] : []),
  ];

  const openDetail = (sp: Spell) => {
    setDetail({
      title: cleanT20Text(sp.name),
      category: `Magia ${sp.type} · ${sp.circle}º círculo`,
      subtitle: `${sp.school} · ${cleanT20Text(sp.execution)}`,
      cost: `${COST[sp.circle]} PM`,
      execution: cleanT20Text(sp.execution),
      range: cleanT20Text(sp.range),
      targetArea: cleanT20Text(sp.targetArea),
      duration: cleanT20Text(sp.duration),
      resistance: sp.resistance ? cleanT20Text(sp.resistance) : undefined,
      description: cleanT20Text(sp.description),
      upgrades: sp.upgrades,
      ruleCitation: getSpellRuleCitation(sp),
    });
  };

  return (
    <>
      <div className="subbar compendium-bar">
        {switcher}
        <div className="filter-row">
          <SearchField value={search} onChange={setSearch} placeholder="Buscar magia ou efeito…" />
          <FilterButton activeCount={chips.length} onClick={() => setFiltersOpen(true)} />
        </div>
        <ActiveFilters chips={chips} />
      </div>

      <div className="hstack between">
        <span className="t-sm t-3">
          {results.length} {results.length === 1 ? 'magia' : 'magias'}
        </span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDetail(CASTING_RULES)}>
          <BookOpen size={16} />
          Regras de conjuração
        </button>
      </div>

      {results.length === 0 ? (
        <EmptyState icon={<Sparkles size={24} />} title="Nenhuma magia encontrada" description="Ajuste a busca ou os filtros." />
      ) : (
        <div className="list compendium-list">
          {results.map((sp) => (
            <button key={sp.id} type="button" className="row has-detail" onClick={() => openDetail(sp)}>
              <span className={`circle-medal circle-${sp.type}`} aria-label={`${sp.circle}º círculo`}>
                {sp.circle}º
              </span>
              <span className="row-main">
                <span className="row-title">{cleanT20Text(sp.name)}</span>
                <span className="row-sub truncate">
                  {getSchoolInfo(sp.school).name} · {cleanT20Text(sp.execution)} · {cleanT20Text(sp.range)}
                </span>
              </span>
              <span className="badge badge-mp shrink-0">{COST[sp.circle]} PM</span>
            </button>
          ))}
        </div>
      )}

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        resultCount={results.length}
        onClear={() => {
          setCircle(0);
          setType('todos');
          setSchool('todas');
        }}
      >
        <div className="field">
          <span className="field-label">Círculo</span>
          <Segmented<number>
            value={circle}
            onChange={setCircle}
            ariaLabel="Círculo"
            options={[0, 1, 2, 3, 4, 5].map((c) => ({ value: c, label: c === 0 ? 'Todos' : `${c}º` }))}
          />
        </div>
        <div className="field">
          <span className="field-label">Tradição</span>
          <Segmented<SpellType>
            value={type}
            onChange={setType}
            ariaLabel="Tradição"
            options={(Object.keys(TYPE_LABEL) as SpellType[]).map((t) => ({ value: t, label: TYPE_LABEL[t] }))}
          />
        </div>
        <SelectField
          label="Escola"
          value={school}
          onChange={setSchool}
          options={[{ value: 'todas', label: 'Todas as escolas' }, ...SCHOOLS.map((s) => ({ value: s, label: s }))]}
        />
        {school !== 'todas' && <SchoolBadge school={school} />}
      </FilterSheet>

      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </>
  );
};
