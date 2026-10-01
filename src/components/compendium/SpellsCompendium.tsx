import React, { useState, useMemo } from 'react';
import { SPELLS_LIST } from '../../data/spells';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { SchoolBadge, CircleBadge, SpellTypeBadge } from '../common/T20Badge';
import { cleanT20Text, getSpellRuleCitation } from '../../utils/textUtils';
import {
  Search,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Info,
  Flame,
  Shield,
  Eye,
  Hand,
  Skull,
  Zap,
  RefreshCw,
  Layers,
} from 'lucide-react';

interface SpellsCompendiumProps {
  onBack: () => void;
}

export const SpellsCompendium: React.FC<SpellsCompendiumProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [circleFilter, setCircleFilter] = useState<number | 'todos'>('todos');
  const [schoolFilter, setSchoolFilter] = useState<string>('todas');
  const [typeFilter, setTypeFilter] = useState<'todos' | 'arcana' | 'divina' | 'universal'>('todos');
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);

  const filteredSpells = useMemo(() => {
    return SPELLS_LIST.filter((sp) => {
      if (circleFilter !== 'todos' && sp.circle !== circleFilter) return false;
      if (schoolFilter !== 'todas' && sp.school.toLowerCase() !== schoolFilter.toLowerCase()) return false;
      if (typeFilter !== 'todos' && sp.type.toLowerCase() !== typeFilter.toLowerCase()) return false;

      if (!search.trim()) return true;
      const term = search.toLowerCase().trim();
      return (
        sp.name.toLowerCase().includes(term) ||
        sp.description.toLowerCase().includes(term) ||
        (sp.targetArea && sp.targetArea.toLowerCase().includes(term))
      );
    });
  }, [circleFilter, schoolFilter, typeFilter, search]);

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
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Catálogo de Magias (Grimório Artoniano)</h1>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Tormenta 20: Edição Jogo do Ano (v1.3) • Capítulo 4: Magia (pág. 176-217)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setModalDetail({
              title: 'Regras de Lançamento de Magias',
              category: 'Regra Oficial • Tormenta 20',
              subtitle: 'Capítulo 4: Magia (pág. 176)',
              description:
                'Magias são rituais arcanos e preces divinas que canalizam Pontos de Mana (PM). O custo básico de uma magia é igual ao seu círculo: 1 PM para 1º círculo, 3 PM para 2º círculo, 6 PM para 3º círculo, 10 PM para 4º círculo e 15 PM para 5º círculo. O limite de PM que um conjurador pode gastar por magia é igual ao seu nível de personagem.',
              ruleCitation: {
                id: 'regras_magia',
                title: 'Lançando Magias',
                book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
                chapter: 'Capítulo 4: Magia',
                section: 'Regras de Conjuração',
                page: 'Página 176',
                quote: '“Para lançar uma magia, você precisa gastar Pontos de Mana (PM). O limite máximo de PM que você pode gastar em cada magia lançada é igual ao seu nível.”',
                explanation: 'Aprimoramentos aumentam o efeito da magia pagando custos adicionais de PM, respeitando sempre o teto do seu nível.',
              },
            })
          }
          className="btn btn-ghost"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: 'var(--t20-gold)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
        >
          <BookOpen size={14} />
          Ver Regras de Conjuração
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Linha 1: Círculos e Tipo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Círculo:</span>
            <div className="btn-group">
              {(['todos', 1, 2, 3, 4, 5] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCircleFilter(c)}
                  className={`btn ${circleFilter === c ? 'active' : ''}`}
                >
                  {c === 'todos' ? 'Todos os Círculos' : `${c}º Círculo`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Tipo:</span>
            <div className="btn-group">
              {(['todos', 'arcana', 'divina', 'universal'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`btn ${typeFilter === t ? 'active' : ''}`}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t === 'todos' ? 'Todos' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Linha 2: Escolas de Magia e Busca */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Escola:</span>
            <div className="btn-group" style={{ flexWrap: 'wrap' }}>
              {[
                'todas',
                'Abjuração',
                'Adivinhação',
                'Convocação',
                'Encantamento',
                'Evocação',
                'Ilusão',
                'Necromancia',
                'Transmutação',
              ].map((sch) => (
                <button
                  key={sch}
                  type="button"
                  onClick={() => setSchoolFilter(sch)}
                  className={`btn ${schoolFilter.toLowerCase() === sch.toLowerCase() ? 'active' : ''}`}
                >
                  {sch === 'todas' ? 'Todas as Escolas' : sch}
                </button>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '380px' }}>
            <input
              type="text"
              placeholder="Buscar por nome, efeito, alvo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.45rem 0.85rem 0.45rem 2.2rem', fontSize: '0.85rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
        Mostrando <strong>{filteredSpells.length}</strong> de {SPELLS_LIST.length} magias catalogadas:
      </div>

      {/* Grade de Magias */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filteredSpells.map((sp) => {
          const cleanDesc = cleanT20Text(sp.description);
          return (
            <div
              key={`${sp.id}-${sp.circle}`}
              className="t20-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                gap: '0.85rem',
              }}
            >
              <div>
                {/* Header: Nome e Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>{cleanT20Text(sp.name)}</h3>
                  <SchoolBadge school={sp.school} />
                </div>

                {/* Sub-badges: Círculo, Tipo, PM base */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <CircleBadge circle={sp.circle} />
                  <SpellTypeBadge type={sp.type} />
                  <span className="badge badge-slate" style={{ fontSize: '0.7rem' }}>
                    {sp.circle === 1 ? '1 PM' : sp.circle === 2 ? '3 PM' : sp.circle === 3 ? '6 PM' : sp.circle === 4 ? '10 PM' : '15 PM'}
                  </span>
                </div>

                {/* Estatísticas Rápidas */}
                <div style={{ fontSize: '0.775rem', color: '#94a3b8', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }}>
                  <div><strong>Execução:</strong> {cleanT20Text(sp.execution)} • <strong>Alcance:</strong> {cleanT20Text(sp.range)}</div>
                  <div><strong>Alvo/Área:</strong> {cleanT20Text(sp.targetArea)} • <strong>Duração:</strong> {cleanT20Text(sp.duration)}</div>
                  {sp.resistance && <div><strong>Resistência:</strong> {cleanT20Text(sp.resistance)}</div>}
                </div>

                {/* Descrição Principal */}
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                  {cleanDesc}
                </p>

                {/* Aprimoramentos */}
                {sp.upgrades && sp.upgrades.length > 0 && (
                  <div style={{ marginTop: '0.75rem', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--t20-gold-light)', marginBottom: '0.35rem' }}>
                      Aprimoramentos ({sp.upgrades.length}):
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {sp.upgrades.slice(0, 2).map((up, idx) => (
                        <div key={idx} style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                          <strong style={{ color: 'var(--t20-mana)' }}>{cleanT20Text(up.cost)}:</strong> {cleanT20Text(up.description)}
                        </div>
                      ))}
                      {sp.upgrades.length > 2 && (
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                          + {sp.upgrades.length - 2} outros aprimoramentos disponíveis no modal de detalhes.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Botão Ver Detalhes */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    const citation = getSpellRuleCitation(sp);
                    setModalDetail({
                      title: sp.name,
                      category: `Magia ${sp.type.toUpperCase()} • ${sp.circle}º Círculo (${sp.school})`,
                      subtitle: `Execução: ${cleanT20Text(sp.execution)} • Alcance: ${cleanT20Text(sp.range)} • Duração: ${cleanT20Text(sp.duration)}`,
                      description: cleanDesc,
                      stats: [
                        { label: 'Círculo', value: `${sp.circle}º Círculo` },
                        { label: 'Custo Base', value: sp.circle === 1 ? '1 PM' : sp.circle === 2 ? '3 PM' : sp.circle === 3 ? '6 PM' : sp.circle === 4 ? '10 PM' : '15 PM' },
                        { label: 'Escola', value: sp.school },
                        { label: 'Tradição', value: sp.type },
                        { label: 'Execução', value: cleanT20Text(sp.execution) },
                        { label: 'Alcance', value: cleanT20Text(sp.range) },
                        { label: 'Alvo/Área', value: cleanT20Text(sp.targetArea) },
                        { label: 'Duração', value: cleanT20Text(sp.duration) },
                        ...(sp.resistance ? [{ label: 'Resistência', value: cleanT20Text(sp.resistance) }] : []),
                      ],
                      ruleCitation: citation,
                    });
                  }}
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
