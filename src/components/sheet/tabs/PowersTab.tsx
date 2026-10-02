import React, { useMemo, useState } from 'react';
import { BookOpen, ChevronDown, Info, Sparkles, Sword } from 'lucide-react';
import type { CharacterPower, CharacterSheet } from '../../../types/character';
import { cleanT20Text, getClassPowerRuleCitation, getGeneralPowerRuleCitation } from '../../../utils/textUtils';
import { POWER_CATEGORY_META, PowerCategoryBadge } from '../../common/T20Badge';
import type { DetailModalData } from '../../common/DetailModal';
import { GENERAL_POWERS_LIST } from '../../../data/generalPowers';
import { CLASS_POWERS_LIST } from '../../../data/classPowers';
import { CLASSES_LIST } from '../../../data/classes';
import { EmptyState, SearchField, Segmented, SelectField } from '../../ui/controls';
import { classColorVars } from '../../common/ClassSigil';

export type SheetPowersSubTab = 'gerais' | 'classe';

interface PowersTabProps {
  character: CharacterSheet;
  onSetModalDetail: (data: DetailModalData) => void;
  onNavigateToCompendium?: (tab: 'poderes', subTab?: 'gerais' | 'classe') => void;
}

const CATEGORY_ORDER = ['combate', 'destino', 'magia', 'concedido', 'tormenta', 'raca', 'origem', 'geral'];

export const PowersTab: React.FC<PowersTabProps> = ({ character, onSetModalDetail, onNavigateToCompendium }) => {
  const [subTab, setSubTab] = useState<SheetPowersSubTab>('gerais');
  const [search, setSearch] = useState('');
  const [generalCategory, setGeneralCategory] = useState<string>('todas');
  const [classFilter, setClassFilter] = useState<string>('todas');
  const [expanded, setExpanded] = useState<string | null>(null);

  // Classe vs. gerais (gerais inclui geral, divindade, tormenta, origem e raça)
  const classPowers = useMemo(() => (character.powers || []).filter((p) => p.source === 'classe'), [character.powers]);
  const generalPowers = useMemo(() => (character.powers || []).filter((p) => p.source !== 'classe'), [character.powers]);

  /** Categoria canônica de um poder geral. */
  const resolvePowerCategory = (pow: CharacterPower): string => {
    if (pow.source === 'divindade') return 'concedido';
    if ((pow.source as string) === 'tormenta' || pow.type === 'tormenta') return 'tormenta';
    if (pow.source === 'raca') return 'raca';
    if (pow.source === 'origem') return 'origem';
    if (pow.type && ['combate', 'destino', 'magia', 'concedido', 'tormenta'].includes(pow.type.toLowerCase())) {
      return pow.type.toLowerCase();
    }
    const matched = GENERAL_POWERS_LIST.find((gp) => gp.id === pow.id || gp.name.toLowerCase() === pow.name.toLowerCase());
    return matched ? matched.category : 'geral';
  };

  const availableGeneralCategories = useMemo(() => {
    const cats = new Set<string>();
    generalPowers.forEach((p) => cats.add(resolvePowerCategory(p)));
    return CATEGORY_ORDER.filter((c) => cats.has(c));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalPowers]);

  const characterClasses = useMemo(() => {
    if (character.classes && character.classes.length > 0) return character.classes;
    const clsDef = CLASSES_LIST.find((c) => c.id === character.classId);
    return [{ classId: character.classId, className: clsDef?.name || 'Classe', level: character.level }];
  }, [character]);

  const term = search.toLowerCase().trim();

  const filteredGeneralPowers = generalPowers.filter((p) => {
    if (generalCategory !== 'todas' && resolvePowerCategory(p) !== generalCategory) return false;
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      !!p.type?.toLowerCase().includes(term)
    );
  });

  const filteredClassPowers = classPowers.filter((p) => {
    if (classFilter !== 'todas') {
      const def = CLASS_POWERS_LIST.find((cp) => cp.name.toLowerCase() === p.name.toLowerCase());
      if (def && def.classId !== classFilter) return false;
    }
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      !!p.cost?.toLowerCase().includes(term)
    );
  });

  // Detalhes com citação canônica
  const handleOpenDetail = (pow: CharacterPower, isClass: boolean) => {
    if (isClass) {
      const clsDef = CLASSES_LIST.find((c) => c.id === character.classId);
      const classPowerDef = CLASS_POWERS_LIST.find((cp) => cp.name.toLowerCase() === pow.name.toLowerCase());
      const citation = getClassPowerRuleCitation(
        classPowerDef?.classId || character.classId,
        classPowerDef?.className || clsDef?.name || 'Classe',
        pow.name,
        pow.description,
        classPowerDef?.prerequisites
      );
      onSetModalDetail({
        title: cleanT20Text(pow.name),
        category: `Poder de classe · ${classPowerDef?.className || clsDef?.name || 'Classe'}`,
        cost: pow.cost,
        prerequisites: classPowerDef?.prerequisites,
        description: cleanT20Text(pow.description),
        ruleCitation: citation,
      });
      return;
    }

    const cat = resolvePowerCategory(pow);
    const matchedGeneral = GENERAL_POWERS_LIST.find((gp) => gp.name.toLowerCase() === pow.name.toLowerCase() || gp.id === pow.id);
    const citation = matchedGeneral
      ? getGeneralPowerRuleCitation(matchedGeneral)
      : {
          id: `POW_${pow.id.toUpperCase()}`,
          title: cleanT20Text(pow.name),
          book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
          chapter:
            pow.source === 'raca' ? 'Capítulo 1: Raças' : pow.source === 'origem' ? 'Capítulo 1: Origens' : 'Capítulo 2: Perícias & Poderes',
          section: pow.source === 'raca' ? 'Habilidades Raciais' : pow.source === 'origem' ? 'Benefícios de Origem' : 'Poderes Gerais',
          page: 'Livro Básico',
          quote: `“${pow.name}. ${cleanT20Text(pow.description)}”`,
          explanation: `Poder ativo de ${character.name}.`,
        };

    onSetModalDetail({
      title: cleanT20Text(pow.name),
      category: `Poder · ${POWER_CATEGORY_META[cat]?.label || cat}`,
      cost: pow.cost,
      prerequisites: matchedGeneral?.prerequisites,
      description: cleanT20Text(pow.description),
      ruleCitation: citation,
    });
  };

  const renderPower = (pow: CharacterPower, isClass: boolean, idx: number) => {
    const key = `${pow.id}-${idx}`;
    const isOpen = expanded === key;
    const classDef = isClass ? CLASS_POWERS_LIST.find((cp) => cp.name.toLowerCase() === pow.name.toLowerCase()) : undefined;
    return (
      <article
        key={key}
        className={`power-item${isOpen ? ' is-open' : ''}${isClass ? ' classed' : ''}`}
        style={isClass ? classColorVars(classDef?.classId || character.classId) : undefined}
      >
        <button type="button" className="power-head" onClick={() => setExpanded(isOpen ? null : key)} aria-expanded={isOpen}>
          <span className="row-main">
            <span className="row-title">{cleanT20Text(pow.name)}</span>
            <span className="hstack-xs wrap">
              {isClass ? (
                <span className="badge badge-class">{classDef?.className || 'Classe'}</span>
              ) : (
                <PowerCategoryBadge category={resolvePowerCategory(pow)} />
              )}
              {pow.cost && <span className="badge badge-mp">{pow.cost}</span>}
            </span>
          </span>
          <ChevronDown size={20} className="power-chevron" />
        </button>
        {isOpen && (
          <div className="power-body animate-in">
            <p className="t-sm t-2 pre-line" style={{ lineHeight: 1.6 }}>
              {cleanT20Text(pow.description)}
            </p>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleOpenDetail(pow, isClass)}>
              <Info size={16} />
              Detalhes e regra
            </button>
          </div>
        )}
      </article>
    );
  };

  const list = subTab === 'gerais' ? filteredGeneralPowers : filteredClassPowers;
  const totalInTab = subTab === 'gerais' ? generalPowers.length : classPowers.length;

  return (
    <div className="stack">
      <Segmented<SheetPowersSubTab>
        value={subTab}
        onChange={(v) => {
          setSubTab(v);
          setSearch('');
          setExpanded(null);
        }}
        ariaLabel="Tipo de poder"
        options={[
          { value: 'gerais', label: 'Gerais', icon: <Sparkles size={16} />, count: generalPowers.length },
          { value: 'classe', label: 'De classe', icon: <Sword size={16} />, count: classPowers.length },
        ]}
      />

      <div className="filter-row">
        <SearchField value={search} onChange={setSearch} placeholder="Buscar poder…" />
        {subTab === 'gerais' && availableGeneralCategories.length > 1 && (
          <SelectField
            value={generalCategory}
            onChange={setGeneralCategory}
            ariaLabel="Categoria"
            options={[
              { value: 'todas', label: 'Todas' },
              ...availableGeneralCategories.map((c) => ({ value: c, label: POWER_CATEGORY_META[c]?.label || c })),
            ]}
          />
        )}
        {subTab === 'classe' && characterClasses.length > 1 && (
          <SelectField
            value={classFilter}
            onChange={setClassFilter}
            ariaLabel="Classe"
            options={[
              { value: 'todas', label: 'Todas' },
              ...characterClasses.map((c) => ({ value: c.classId, label: `${c.className} ${c.level}` })),
            ]}
          />
        )}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={subTab === 'gerais' ? <Sparkles size={24} /> : <Sword size={24} />}
          title={totalInTab === 0 ? 'Nenhum poder aqui ainda' : 'Nada encontrado'}
          description={
            totalInTab === 0
              ? subTab === 'gerais'
                ? 'Poderes gerais vêm da raça, origem, divindade ou podem substituir poderes de classe ao subir de nível.'
                : 'Habilidades e poderes de classe aparecem aqui conforme o herói avança de nível.'
              : 'Tente outro termo ou categoria.'
          }
          action={
            onNavigateToCompendium && (
              <button type="button" className="btn btn-secondary" onClick={() => onNavigateToCompendium('poderes', subTab)}>
                <BookOpen size={18} />
                Explorar no compêndio
              </button>
            )
          }
        />
      ) : (
        <div className="stack-sm">{list.map((pow, idx) => renderPower(pow, subTab === 'classe', idx))}</div>
      )}
    </div>
  );
};
