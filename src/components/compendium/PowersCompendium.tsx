import React, { useState } from 'react';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { GeneralPower } from '../../types/rules';
import { CharacterSheet } from '../../types/character';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { PrerequisiteContext, checkPowerPrerequisites } from '../../utils/rulesValidation';
import {
  Search,
  Sparkles,
  Sword,
  Compass,
  Flame,
  ShieldAlert,
  Info,
  ArrowLeft,
  BookOpen,
  Check,
  Filter,
  User,
} from 'lucide-react';

interface PowersCompendiumProps {
  onBack: () => void;
  activeCharacter?: CharacterSheet | null;
  characters?: CharacterSheet[];
}

export const PowersCompendium: React.FC<PowersCompendiumProps> = ({
  onBack,
  activeCharacter,
  characters = [],
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'todas' | 'combate' | 'destino' | 'magia' | 'tormenta'>('todas');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState<string>(activeCharacter?.id || (characters.length > 0 ? characters[0].id : ''));
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);

  const selectedChar = characters.find((c) => c.id === selectedCharId) || activeCharacter || null;

  const prereqContext: PrerequisiteContext | null = selectedChar
    ? {
        attributes: selectedChar.totalAttributes,
        trainedSkillIds: Object.values(selectedChar.skills)
          .filter((s) => s.isTrained)
          .map((s) => s.id),
        proficiencies: {
          armor: ['arcanista', 'bardo'].includes(selectedChar.classId) ? [] : ['leves'],
          shields: ['guerreiro', 'paladino', 'clerigo'].includes(selectedChar.classId),
        },
        isSpellcaster: ['arcanista', 'bardo', 'clerigo', 'druida'].includes(selectedChar.classId),
      }
    : null;

  const filteredPowers = GENERAL_POWERS_LIST.filter((p) => {
    if (categoryFilter !== 'todas' && p.category !== categoryFilter) return false;
    const term = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      (p.prerequisites && p.prerequisites.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    if (onlyEligible) {
      if (prereqContext) {
        const res = checkPowerPrerequisites(p.id, prereqContext);
        if (!res.isMet) return false;
      } else {
        if (p.prerequisites && p.prerequisites.trim().length > 0) return false;
      }
    }

    return true;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'combate':
        return <span className="badge badge-ruby" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Sword size={11} /> Combate</span>;
      case 'destino':
        return <span className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Compass size={11} /> Destino</span>;
      case 'magia':
        return <span className="badge badge-blue" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Sparkles size={11} /> Magia</span>;
      case 'tormenta':
        return <span className="badge badge-slate" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', borderColor: '#a855f7', color: '#c084fc' }}><Flame size={11} /> Tormenta</span>;
      default:
        return <span className="badge badge-slate">{cat}</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.8rem', gap: '0.4rem', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
          <div>
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Catálogo de Poderes Gerais</h1>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Tormenta 20: Edição Jogo do Ano (v1.3) • Capítulo 2: Poderes Gerais (pág. 124)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setModalDetail({
              title: 'Regras de Poderes Gerais',
              category: 'Regra Oficial • Tormenta 20',
              subtitle: 'Capítulo 2: Perícias & Poderes (pág. 124)',
              description:
                'Poderes gerais representam habilidades adquiridas por treinamento marcial, façanhas heróicas, estudos mágicos ou a terrível corrupção da Tormenta. A cada novo nível, um personagem pode escolher um poder de sua classe ou um poder geral, desde que cumpra estritamente todos os seus pré-requisitos.',
              ruleCitation: RULES_CITATIONS.GENERAL_POWER_PREREQUISITES,
            })
          }
          className="btn btn-ghost"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: 'var(--t20-gold)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
        >
          <BookOpen size={14} />
          Ver Regras Gerais de Poderes
        </button>
      </div>

      {/* Barra de Filtros, Busca e Seletor de Personagem */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="btn-group">
          {(['todas', 'combate', 'destino', 'magia', 'tormenta'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`btn ${categoryFilter === cat ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {cat === 'todas' ? 'Todos os Poderes' : cat}
            </button>
          ))}
        </div>

        {/* Filtro: Somente os que posso aprender */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {characters.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.2rem 0.5rem' }}>
              <User size={14} style={{ color: 'var(--text-dim)' }} />
              <select
                value={selectedCharId}
                onChange={(e) => setSelectedCharId(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.8rem',
                  padding: '0.2rem 0.4rem',
                  cursor: 'pointer',
                  color: 'var(--text-main)',
                  width: 'auto',
                }}
              >
                <option value="" style={{ background: 'var(--bg-surface)' }}>Nenhum personagem (Regra Geral)</option>
                {characters.map((c) => (
                  <option key={c.id} value={c.id} style={{ background: 'var(--bg-surface)' }}>
                    {c.name} ({c.classId})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOnlyEligible(!onlyEligible)}
            className={`btn ${onlyEligible ? 'btn-gold' : 'btn-secondary'}`}
            style={{
              padding: '0.45rem 0.85rem',
              fontSize: '0.825rem',
              gap: '0.4rem',
            }}
            title={selectedChar ? `Filtrar apenas os poderes que ${selectedChar.name} cumpre os pré-requisitos` : 'Filtrar poderes sem pré-requisitos'}
          >
            <Filter size={14} />
            {onlyEligible ? '✓ Somente os que posso aprender' : 'Somente os que posso aprender'}
          </button>

          <div style={{ position: 'relative', minWidth: '240px', flex: '1' }}>
            <input
              type="text"
              placeholder="Buscar por nome, requisito ou efeito..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.45rem 0.85rem 0.45rem 2.2rem', fontSize: '0.85rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
        <span>
          Mostrando <strong>{filteredPowers.length}</strong> de {GENERAL_POWERS_LIST.length} poderes disponíveis
          {onlyEligible && selectedChar && ` (Apenas compatíveis com ${selectedChar.name})`}
          {onlyEligible && !selectedChar && ' (Apenas sem pré-requisitos)'}
        </span>
      </div>

      {/* Grade de Poderes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
        {filteredPowers.map((pow) => {
          const prereqRes = prereqContext ? checkPowerPrerequisites(pow.id, prereqContext) : null;
          const hasPrereqText = Boolean(pow.prerequisites && pow.prerequisites.trim().length > 0);

          return (
            <div
              key={pow.id}
              className="t20-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                gap: '0.75rem',
                transition: 'var(--transition)',
                borderColor: prereqRes?.isMet
                  ? 'rgba(16, 185, 129, 0.4)'
                  : prereqRes && !prereqRes.isMet
                  ? 'rgba(239, 68, 68, 0.25)'
                  : 'var(--border-color)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--t20-gold-light)', margin: 0 }}>{pow.name}</h3>
                  {getCategoryBadge(pow.category)}
                </div>

                {/* Status de Pré-requisito */}
                <div style={{ marginBottom: '0.6rem' }}>
                  {prereqRes ? (
                    prereqRes.isMet ? (
                      <span className="badge badge-green" style={{ fontSize: '0.725rem' }}>
                        <Check size={11} /> Pode aprender
                      </span>
                    ) : (
                      <span className="badge badge-ruby" style={{ fontSize: '0.725rem', whiteSpace: 'normal', lineHeight: 1.3 }}>
                        <ShieldAlert size={11} /> Requer: {prereqRes.unmetRequirements.join(', ')}
                      </span>
                    )
                  ) : hasPrereqText ? (
                    <span className="badge badge-slate" style={{ fontSize: '0.725rem', color: '#f87171' }}>
                      <ShieldAlert size={11} /> Pré-requisito: {pow.prerequisites}
                    </span>
                  ) : (
                    <span className="badge badge-green" style={{ fontSize: '0.725rem' }}>
                      <Check size={11} /> Sem pré-requisitos
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  {pow.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() =>
                    setModalDetail({
                      title: pow.name,
                      category: `Poder Geral (${pow.category})`,
                      subtitle: pow.prerequisites ? `Pré-requisitos: ${pow.prerequisites}` : 'Sem pré-requisitos',
                      description: pow.description,
                      prerequisites: pow.prerequisites,
                      ruleCitation: {
                        id: pow.id,
                        title: pow.name,
                        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
                        chapter: 'Capítulo 2: Perícias & Poderes',
                        section: `Poderes Gerais — ${pow.category.toUpperCase()}`,
                        page: 'Página 124-135',
                        quote: `“${pow.name}. ${pow.description}”`,
                        explanation: pow.prerequisites
                          ? `Para adquirir e utilizar este poder, o personagem deve cumprir: ${pow.prerequisites}.`
                          : 'Este poder não exige pré-requisitos e pode ser aprendido por qualquer personagem.',
                      },
                    })
                  }
                  className="btn btn-ghost"
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'var(--t20-gold)', gap: '0.3rem' }}
                >
                  <Info size={13} />
                  Ver Detalhes Oficiais
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
    </div>
  );
};
