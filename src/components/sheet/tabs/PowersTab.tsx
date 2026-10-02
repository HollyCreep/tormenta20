import React, { useState, useMemo } from 'react';
import {
  Info,
  Sparkles,
  Sword,
  Search,
  BookOpen,
  Compass,
  Flame,
  ShieldAlert,
  Award,
  Filter,
} from 'lucide-react';
import type { CharacterSheet, CharacterPower } from '../../../types/character';
import { cleanT20Text, getGeneralPowerRuleCitation, getClassPowerRuleCitation } from '../../../utils/textUtils';
import { PowerCategoryBadge, ClassBadge } from '../../common/T20Badge';
import type { DetailModalData } from '../../common/DetailModal';
import { GENERAL_POWERS_LIST } from '../../../data/generalPowers';
import { CLASS_POWERS_LIST } from '../../../data/classPowers';
import { CLASSES_LIST } from '../../../data/classes';
import { getClassTheme } from '../../../styles/classTheme';

export type SheetPowersSubTab = 'gerais' | 'classe';

interface PowersTabProps {
  character: CharacterSheet;
  onSetModalDetail: (data: DetailModalData) => void;
  onNavigateToCompendium?: (tab: 'poderes', subTab?: 'gerais' | 'classe') => void;
}

export const PowersTab: React.FC<PowersTabProps> = ({
  character,
  onSetModalDetail,
  onNavigateToCompendium,
}) => {
  const [subTab, setSubTab] = useState<SheetPowersSubTab>('gerais');
  const [search, setSearch] = useState('');
  const [generalCategory, setGeneralCategory] = useState<string>('todas');
  const [classFilter, setClassFilter] = useState<string>('todas');

  // Separação dos poderes do personagem: Classe vs Gerais (inclui geral, divindade, tormenta, origem, raça)
  const classPowers = useMemo(() => {
    return (character.powers || []).filter((p) => p.source === 'classe');
  }, [character.powers]);

  const generalPowers = useMemo(() => {
    return (character.powers || []).filter((p) => p.source !== 'classe');
  }, [character.powers]);

  // Função auxiliar para mapear a categoria canônica de um poder geral
  const resolvePowerCategory = (pow: CharacterPower): string => {
    if (pow.source === 'divindade') return 'concedido';
    if ((pow.source as string) === 'tormenta' || pow.type === 'tormenta') return 'tormenta';
    if (pow.source === 'raca') return 'raca';
    if (pow.source === 'origem') return 'origem';
    if (pow.type && ['combate', 'destino', 'magia', 'concedido', 'tormenta'].includes(pow.type.toLowerCase())) {
      return pow.type.toLowerCase();
    }
    const matched = GENERAL_POWERS_LIST.find(
      (gp) => gp.id === pow.id || gp.name.toLowerCase() === pow.name.toLowerCase()
    );
    if (matched) return matched.category;
    return 'geral';
  };

  // Categorias presentes nos poderes gerais do personagem para renderizar os chips de filtro
  const availableGeneralCategories = useMemo(() => {
    const cats = new Set<string>();
    generalPowers.forEach((p) => {
      cats.add(resolvePowerCategory(p));
    });
    return Array.from(cats);
  }, [generalPowers]);

  // Classes do personagem para filtro na sub-aba de classe
  const characterClasses = useMemo(() => {
    if (character.classes && character.classes.length > 0) {
      return character.classes;
    }
    const clsDef = CLASSES_LIST.find((c) => c.id === character.classId);
    return [{ classId: character.classId, className: clsDef?.name || 'Classe', level: character.level }];
  }, [character]);

  // Filtragem de poderes gerais
  const filteredGeneralPowers = useMemo(() => {
    return generalPowers.filter((p) => {
      if (generalCategory !== 'todas') {
        const cat = resolvePowerCategory(p);
        if (generalCategory === 'outros') {
          if (!['raca', 'origem', 'geral'].includes(cat)) return false;
        } else if (cat !== generalCategory) {
          return false;
        }
      }

      if (search.trim()) {
        const term = search.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        const matchesType = p.type?.toLowerCase().includes(term);
        if (!matchesName && !matchesDesc && !matchesType) return false;
      }

      return true;
    });
  }, [generalPowers, generalCategory, search]);

  // Filtragem de poderes de classe
  const filteredClassPowers = useMemo(() => {
    return classPowers.filter((p) => {
      if (classFilter !== 'todas') {
        // Se houver múltiplas classes, verifica se o poder pertence a ela
        const matchedClassDef = CLASS_POWERS_LIST.find(
          (cp) => cp.name.toLowerCase() === p.name.toLowerCase()
        );
        if (matchedClassDef && matchedClassDef.classId !== classFilter) {
          return false;
        }
      }

      if (search.trim()) {
        const term = search.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        const matchesCost = p.cost?.toLowerCase().includes(term);
        if (!matchesName && !matchesDesc && !matchesCost) return false;
      }

      return true;
    });
  }, [classPowers, classFilter, search]);

  // Abrir detalhes com citação canônica
  const handleOpenDetail = (pow: CharacterPower, isClass: boolean) => {
    if (isClass) {
      const clsDef = CLASSES_LIST.find((c) => c.id === character.classId);
      const classPowerDef = CLASS_POWERS_LIST.find(
        (cp) => cp.name.toLowerCase() === pow.name.toLowerCase()
      );
      const citation = getClassPowerRuleCitation(
        classPowerDef?.classId || character.classId,
        classPowerDef?.className || clsDef?.name || 'Classe',
        pow.name,
        pow.description,
        classPowerDef?.prerequisites
      );

      onSetModalDetail({
        title: cleanT20Text(pow.name),
        category: `Habilidade / Poder de Classe • ${classPowerDef?.className || clsDef?.name || 'Classe'}`,
        cost: pow.cost,
        description: cleanT20Text(pow.description),
        ruleCitation: citation,
      });
    } else {
      const cat = resolvePowerCategory(pow);
      const matchedGeneral = GENERAL_POWERS_LIST.find(
        (gp) => gp.name.toLowerCase() === pow.name.toLowerCase() || gp.id === pow.id
      );

      const citation = matchedGeneral
        ? getGeneralPowerRuleCitation(matchedGeneral)
        : {
            id: `POW_${pow.id.toUpperCase()}`,
            title: cleanT20Text(pow.name),
            book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
            chapter: pow.source === 'raca' ? 'Capítulo 1: Raças' : pow.source === 'origem' ? 'Capítulo 1: Origens' : 'Capítulo 2: Perícias & Poderes',
            section: pow.source === 'raca' ? 'Habilidades Raciais' : pow.source === 'origem' ? 'Benefícios de Origem' : 'Poderes Gerais',
            page: 'Livro Básico',
            quote: `“${pow.name}. ${cleanT20Text(pow.description)}”`,
            explanation: `Poder ativo de ${character.name}.`,
          };

      onSetModalDetail({
        title: cleanT20Text(pow.name),
        category: `Poder • ${cat.toUpperCase()} (${pow.source.toUpperCase()})`,
        cost: pow.cost,
        description: cleanT20Text(pow.description),
        ruleCitation: citation,
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-sub-abas de Poderes (Nível 3): Gerais | Por Classe */}
      <div className="sub-tabs sub-tabs-nested">
        <button
          type="button"
          className={subTab === 'gerais' ? 'active' : ''}
          onClick={() => {
            setSubTab('gerais');
            setSearch('');
          }}
        >
          <Sparkles size={15} />
          <span>Poderes Gerais ({generalPowers.length})</span>
        </button>
        <button
          type="button"
          className={subTab === 'classe' ? 'active' : ''}
          onClick={() => {
            setSubTab('classe');
            setSearch('');
          }}
        >
          <Sword size={15} />
          <span>Poderes Por Classe ({classPowers.length})</span>
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0.85rem',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
              }}
            />
            <input
              type="text"
              placeholder={
                subTab === 'gerais'
                  ? 'Buscar por poder geral, combate, magia...'
                  : 'Buscar por poder ou habilidade de classe...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ width: '100%', paddingLeft: '2.4rem' }}
            />
          </div>

          {onNavigateToCompendium && (
            <button
              type="button"
              onClick={() => onNavigateToCompendium('poderes', subTab)}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
              title="Abrir compêndio completo com catálogo oficial de regras"
            >
              <BookOpen size={14} />
              <span>Ver Compêndio</span>
            </button>
          )}
        </div>

        {/* Chips de Categoria para Poderes Gerais */}
        {subTab === 'gerais' && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginRight: '0.25rem' }}>
              <Filter size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Filtrar:
            </span>
            <button
              type="button"
              onClick={() => setGeneralCategory('todas')}
              className={`btn ${generalCategory === 'todas' ? 'btn-gold' : 'btn-ghost'}`}
              style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
            >
              Todos ({generalPowers.length})
            </button>
            {availableGeneralCategories.includes('combate') && (
              <button
                type="button"
                onClick={() => setGeneralCategory('combate')}
                className={`btn ${generalCategory === 'combate' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <Sword size={12} /> Combate
              </button>
            )}
            {availableGeneralCategories.includes('destino') && (
              <button
                type="button"
                onClick={() => setGeneralCategory('destino')}
                className={`btn ${generalCategory === 'destino' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <Compass size={12} /> Destino
              </button>
            )}
            {availableGeneralCategories.includes('magia') && (
              <button
                type="button"
                onClick={() => setGeneralCategory('magia')}
                className={`btn ${generalCategory === 'magia' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <Flame size={12} /> Magia
              </button>
            )}
            {availableGeneralCategories.includes('concedido') && (
              <button
                type="button"
                onClick={() => setGeneralCategory('concedido')}
                className={`btn ${generalCategory === 'concedido' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <Award size={12} /> Divindade
              </button>
            )}
            {availableGeneralCategories.includes('tormenta') && (
              <button
                type="button"
                onClick={() => setGeneralCategory('tormenta')}
                className={`btn ${generalCategory === 'tormenta' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem' }}
              >
                <ShieldAlert size={12} /> Tormenta
              </button>
            )}
            {(availableGeneralCategories.includes('raca') || availableGeneralCategories.includes('origem')) && (
              <button
                type="button"
                onClick={() => setGeneralCategory('outros')}
                className={`btn ${generalCategory === 'outros' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
              >
                Raça & Origem
              </button>
            )}
          </div>
        )}

        {/* Filtro de Classes para Personagens Multiclasse */}
        {subTab === 'classe' && characterClasses.length > 1 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginRight: '0.25rem' }}>
              Classe:
            </span>
            <button
              type="button"
              onClick={() => setClassFilter('todas')}
              className={`btn ${classFilter === 'todas' ? 'btn-gold' : 'btn-ghost'}`}
              style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
            >
              Todas ({classPowers.length})
            </button>
            {characterClasses.map((cls) => (
              <button
                key={cls.classId}
                type="button"
                onClick={() => setClassFilter(cls.classId)}
                className={`btn ${classFilter === cls.classId ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.75rem' }}
              >
                {cls.className} (Nv. {cls.level})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo da Sub-sub-aba: PODERES GERAIS */}
      {subTab === 'gerais' && (
        <>
          {filteredGeneralPowers.length === 0 ? (
            <div
              className="t20-card"
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                color: 'var(--text-dim)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <Sparkles size={36} style={{ color: 'var(--t20-gold-light)', opacity: 0.5 }} />
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>
                  Nenhum poder geral encontrado
                </strong>
                <span style={{ fontSize: '0.85rem' }}>
                  {search
                    ? 'Nenhum resultado corresponde à sua pesquisa.'
                    : 'O personagem ainda não possui poderes gerais registrados.'}
                </span>
              </div>
              {onNavigateToCompendium && (
                <button
                  type="button"
                  onClick={() => onNavigateToCompendium('poderes', 'gerais')}
                  className="btn btn-gold"
                  style={{ marginTop: '0.5rem', gap: '0.4rem', fontSize: '0.8rem' }}
                >
                  <BookOpen size={14} /> Explorar Poderes Gerais no Compêndio
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '0.85rem',
              }}
            >
              {filteredGeneralPowers.map((pow) => {
                const cat = resolvePowerCategory(pow);
                return (
                  <div
                    key={pow.id}
                    className="t20-card"
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      borderLeft: '3px solid var(--t20-gold-light)',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '1rem', color: 'var(--t20-gold-light)' }}>
                            {cleanT20Text(pow.name)}
                          </strong>
                          <PowerCategoryBadge category={cat} />
                          {pow.cost && (
                            <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                              {pow.cost}
                            </span>
                          )}
                          <span
                            className="badge"
                            style={{
                              fontSize: '0.65rem',
                              background: 'rgba(255, 255, 255, 0.08)',
                              color: 'var(--text-dim)',
                            }}
                          >
                            {pow.source.toUpperCase()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(pow, false)}
                          className="btn btn-ghost"
                          style={{ padding: '0.2rem', color: 'var(--text-dim)' }}
                          title="Ver descrição completa e citação de regras"
                        >
                          <Info size={14} />
                        </button>
                      </div>
                      <p
                        style={{
                          margin: '0.45rem 0 0 0',
                          fontSize: '0.85rem',
                          color: '#cbd5e1',
                          lineHeight: 1.45,
                        }}
                      >
                        {cleanT20Text(pow.description)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Conteúdo da Sub-sub-aba: PODERES POR CLASSE */}
      {subTab === 'classe' && (
        <>
          {filteredClassPowers.length === 0 ? (
            <div
              className="t20-card"
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                color: 'var(--text-dim)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <Sword size={36} style={{ color: 'var(--t20-gold-light)', opacity: 0.5 }} />
              <div>
                <strong style={{ display: 'block', fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>
                  Nenhum poder de classe encontrado
                </strong>
                <span style={{ fontSize: '0.85rem' }}>
                  {search
                    ? 'Nenhum resultado corresponde à sua pesquisa.'
                    : 'O personagem ainda não possui poderes de classe registrados.'}
                </span>
              </div>
              {onNavigateToCompendium && (
                <button
                  type="button"
                  onClick={() => onNavigateToCompendium('poderes', 'classe')}
                  className="btn btn-gold"
                  style={{ marginTop: '0.5rem', gap: '0.4rem', fontSize: '0.8rem' }}
                >
                  <BookOpen size={14} /> Explorar Poderes de Classe no Compêndio
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '0.85rem',
              }}
            >
              {filteredClassPowers.map((pow) => {
                const clsDef = CLASSES_LIST.find((c) => c.id === character.classId);
                const classPowerDef = CLASS_POWERS_LIST.find(
                  (cp) => cp.name.toLowerCase() === pow.name.toLowerCase()
                );
                const className = classPowerDef?.className || clsDef?.name || 'Classe';
                const theme = getClassTheme(classPowerDef?.classId || character.classId);

                return (
                  <div
                    key={pow.id}
                    className="t20-card"
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      borderLeft: `3px solid ${theme.primary}`,
                      background: `linear-gradient(155deg, ${theme.surface}2e 0%, rgba(17, 24, 39, 0.95) 100%)`,
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '1rem', color: '#ffffff' }}>
                            {cleanT20Text(pow.name)}
                          </strong>
                          <ClassBadge classIdOrName={classPowerDef?.classId || character.classId} label={className} />
                          {pow.cost && (
                            <span
                              className="badge"
                              style={{
                                fontSize: '0.65rem',
                                background: 'rgba(59, 130, 246, 0.25)',
                                color: '#93c5fd',
                                border: '1px solid rgba(59, 130, 246, 0.4)',
                              }}
                            >
                              {pow.cost}
                            </span>
                          )}
                          {pow.type && (
                            <span
                              className="badge"
                              style={{
                                fontSize: '0.65rem',
                                background: 'rgba(255, 255, 255, 0.08)',
                                color: 'var(--text-dim)',
                              }}
                            >
                              {pow.type}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(pow, true)}
                          className="btn btn-ghost"
                          style={{ padding: '0.2rem', color: 'var(--text-dim)' }}
                          title="Ver descrição completa e citação de regras"
                        >
                          <Info size={14} />
                        </button>
                      </div>
                      <p
                        style={{
                          margin: '0.45rem 0 0 0',
                          fontSize: '0.85rem',
                          color: '#cbd5e1',
                          lineHeight: 1.45,
                        }}
                      >
                        {cleanT20Text(pow.description)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
