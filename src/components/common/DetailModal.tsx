import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Shield,
  Sword,
  BookOpen,
  Compass,
  Zap,
  Sliders,
  FileText,
  ChevronLeft,
  ChevronRight,
  Flame,
  Coins,
  Weight,
  ArrowDown,
  Target,
  Crosshair,
  Hand,
  Anvil,
  Wrench,
} from 'lucide-react';
import { RuleCitation } from '../../data/rulesCitations';
import { extractSpellDamage } from '../../utils/spellUtils';

export const getFallbackStatIcon = (label: string): React.ReactNode => {
  const l = label.toLowerCase();
  if (l.includes('preço') || l.includes('t$') || l.includes('custo') || l.includes('moeda')) return <Coins size={14} />;
  if (l.includes('espaço') || l.includes('peso') || l.includes('carga')) return <Weight size={14} />;
  if (l.includes('defesa') || l.includes('proteção')) return <Shield size={14} />;
  if (l.includes('penalidade')) return <ArrowDown size={14} />;
  if (l.includes('ataque') || l.includes('dano')) return <Sparkles size={14} />;
  if (l.includes('crítico') || l.includes('margem')) return <Target size={14} />;
  if (l.includes('alcance')) return <Crosshair size={14} />;
  if (l.includes('empunhadura') || l.includes('uso')) return <Hand size={14} />;
  if (l.includes('material')) return <Anvil size={14} />;
  if (l.includes('melhoria')) return <Wrench size={14} />;
  if (l.includes('origem')) return <Compass size={14} />;
  return null;
};

export interface DetailStat {
  label: string;
  value: string | number;
  subtext?: string;
  color?: string;
  icon?: React.ReactNode;
}

export interface DetailModalData {
  title: string;
  subtitle?: string;
  category?: string;
  cost?: string;
  prerequisites?: string;
  execution?: string;
  range?: string;
  duration?: string;
  targetArea?: string;
  resistance?: string;
  description: string;
  ruleCitation?: RuleCitation;
  upgrades?: { cost: string; description: string }[];
  stats?: DetailStat[];
}

interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'bio' | 'rules'>('stats');

  // Ajusta a aba padrão ao abrir um novo item
  useEffect(() => {
    if (data) {
      const hasStats =
        (data.stats && data.stats.length > 0) ||
        data.prerequisites ||
        data.execution ||
        data.range ||
        data.duration ||
        data.targetArea ||
        data.resistance;
      if (hasStats) {
        setActiveTab('stats');
      } else {
        setActiveTab('bio');
      }
    }
  }, [data?.title]);

  if (!data) return null;

  const tabs: ('stats' | 'bio' | 'rules')[] = ['stats', 'bio', 'rules'];
  const currentIndex = tabs.indexOf(activeTab);

  const handlePrevTab = () => {
    const nextIdx = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIdx]);
  };

  const handleNextTab = () => {
    const nextIdx = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIdx]);
  };

  const damageInfo = extractSpellDamage(data.description);

  const getCategoryIcon = () => {
    const cat = data.category?.toLowerCase() || '';
    if (cat.includes('magia') || cat.includes('arcana') || cat.includes('divina')) return <Sparkles size={20} style={{ color: 'var(--t20-mana-light)' }} />;
    if (cat.includes('combate') || cat.includes('arma')) return <Sword size={20} style={{ color: 'var(--t20-ruby)' }} />;
    if (cat.includes('armadura') || cat.includes('defesa') || cat.includes('escudo')) return <Shield size={20} style={{ color: 'var(--t20-gold)' }} />;
    if (cat.includes('origem') || cat.includes('destino')) return <Compass size={20} style={{ color: 'var(--t20-life-light)' }} />;
    return <BookOpen size={20} style={{ color: 'var(--t20-gold)' }} />;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.15)',
        }}
      >
        {/* ========================================================= */}
        {/* 1. HEADER (Conceito do Anexo 3)                           */}
        {/* ========================================================= */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                flexShrink: 0,
              }}
            >
              {getCategoryIcon()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#ffffff', fontFamily: 'var(--font-fantasy)' }}>
                  {data.title}
                </h3>
                {data.category && (
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {data.category}
                  </span>
                )}
                {data.cost && (
                  <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                    <Zap size={10} />
                    {data.cost}
                  </span>
                )}
                {damageInfo && (
                  <span
                    className="badge badge-ruby"
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'rgba(239, 68, 68, 0.22)',
                      border: '1px solid #ef4444',
                      color: '#fca5a5',
                    }}
                    title={`Dano: ${damageInfo.badgeText}`}
                  >
                    <Flame size={12} style={{ color: '#f87171' }} />
                    <span>{damageInfo.dice} {damageInfo.type ? `(${damageInfo.type})` : ''}</span>
                  </span>
                )}
              </div>
              {data.subtitle && (
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0 0 0', color: 'var(--text-muted)' }}>
                  {data.subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.4rem', borderRadius: '50%', flexShrink: 0, color: 'var(--text-muted)' }}
            aria-label="Fechar modal"
            title="Fechar (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. SUB-HEADER TABS: [ Stats ] [ Bio ] [ Rules ]           */}
        {/* ========================================================= */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(0, 0, 0, 0.35)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '0.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              gap: '0.35rem',
              width: '100%',
              maxWidth: '460px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('stats')}
              className="btn"
              style={{
                flex: 1,
                padding: '0.45rem 0.75rem',
                fontSize: '0.825rem',
                fontWeight: activeTab === 'stats' ? 800 : 600,
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'stats' ? 'linear-gradient(135deg, var(--t20-gold) 0%, var(--t20-gold-dark) 100%)' : 'transparent',
                color: activeTab === 'stats' ? '#0f172a' : 'var(--text-muted)',
                boxShadow: activeTab === 'stats' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                gap: '0.4rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Sliders size={14} />
              <span>Estatísticas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bio')}
              className="btn"
              style={{
                flex: 1,
                padding: '0.45rem 0.75rem',
                fontSize: '0.825rem',
                fontWeight: activeTab === 'bio' ? 800 : 600,
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'bio' ? 'linear-gradient(135deg, var(--t20-gold) 0%, var(--t20-gold-dark) 100%)' : 'transparent',
                color: activeTab === 'bio' ? '#0f172a' : 'var(--text-muted)',
                boxShadow: activeTab === 'bio' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                gap: '0.4rem',
                transition: 'all 0.15s ease',
              }}
            >
              <FileText size={14} />
              <span>Descrição</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className="btn"
              style={{
                flex: 1,
                padding: '0.45rem 0.75rem',
                fontSize: '0.825rem',
                fontWeight: activeTab === 'rules' ? 800 : 600,
                borderRadius: 'var(--radius-sm)',
                background: activeTab === 'rules' ? 'linear-gradient(135deg, var(--t20-gold) 0%, var(--t20-gold-dark) 100%)' : 'transparent',
                color: activeTab === 'rules' ? '#0f172a' : 'var(--text-muted)',
                boxShadow: activeTab === 'rules' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                gap: '0.4rem',
                transition: 'all 0.15s ease',
              }}
            >
              <BookOpen size={14} />
              <span>Regras</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. CONTENT AREA (Scrollable)                              */}
        {/* ========================================================= */}
        <div
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* TAB 1: STATS */}
          {activeTab === 'stats' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Se for magia de dano, exibe o Dano com Maior Ênfase */}
              {damageInfo && (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(153, 27, 27, 0.12) 100%)',
                    border: '1.5px solid rgba(239, 68, 68, 0.55)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1.15rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.3)',
                        border: '1px solid #ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f87171',
                        flexShrink: 0,
                      }}
                    >
                      <Flame size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800, display: 'block' }}>
                        ⚔️ Dano Base da Magia
                      </span>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#ffffff', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                        {damageInfo.dice}
                      </span>
                    </div>
                  </div>

                  {damageInfo.type && (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.2rem' }}>
                        Tipo de Dano
                      </span>
                      <span className="badge badge-ruby" style={{ fontSize: '0.825rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.25rem 0.75rem' }}>
                        {damageInfo.type}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Parâmetros rápidos (se houver) */}
              {(data.prerequisites || data.execution || data.range || data.duration || data.targetArea || data.resistance) && (
                <div>
                  <h4 style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--t20-gold-light)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sliders size={14} />
                    <span>Parâmetros de Lançamento & Uso</span>
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.825rem',
                    }}
                  >
                    {data.prerequisites && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', display: 'block' }}>Pré-requisitos</span>
                        <span style={{ fontWeight: 600, color: '#f87171' }}>{data.prerequisites}</span>
                      </div>
                    )}
                    {data.execution && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', display: 'block' }}>Execução</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{data.execution}</span>
                      </div>
                    )}
                    {data.range && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', display: 'block' }}>Alcance</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{data.range}</span>
                      </div>
                    )}
                    {data.targetArea && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', display: 'block' }}>Alvo / Área</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{data.targetArea}</span>
                      </div>
                    )}
                    {data.duration && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', display: 'block' }}>Duração</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{data.duration}</span>
                      </div>
                    )}
                    {data.resistance && (
                      <div>
                        <span style={{ color: 'var(--text-dim)', display: 'block' }}>Resistência</span>
                        <span style={{ fontWeight: 600, color: '#fbbf24' }}>{data.resistance}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Estatísticas Numéricas Detalhadas */}
              {data.stats && data.stats.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--t20-gold-light)', marginBottom: '0.65rem' }}>
                    Propriedades Mecânicas
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '0.75rem',
                    }}
                  >
                    {data.stats.map((s, i) => {
                      const statIcon = s.icon || getFallbackStatIcon(s.label);
                      return (
                        <div
                          key={i}
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '0.75rem 0.95rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              fontSize: '0.72rem',
                              color: 'var(--text-dim)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                              fontWeight: 600,
                            }}
                          >
                            {statIcon && (
                              <span
                                style={{
                                  color: s.color || 'var(--t20-gold-light)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                }}
                              >
                                {statIcon}
                              </span>
                            )}
                            <span>{s.label}</span>
                          </div>
                          <div
                            style={{
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              color: s.color || 'var(--t20-gold-light)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {s.value}
                          </div>
                          {s.subtext && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35, marginTop: '0.15rem' }}>
                              {s.subtext}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Se não houver estatísticas explícitas */}
              {!data.prerequisites && !data.execution && !data.range && !data.duration && !data.targetArea && !data.resistance && (!data.stats || data.stats.length === 0) && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-dim)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Nenhum parâmetro numérico adicional disponível para este registro.</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.825rem' }}>Consulte a aba <strong>Descrição</strong> para a descrição completa ou <strong>Regras</strong> para o manual.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BIO */}
          {activeTab === 'bio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--t20-gold-light)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <FileText size={14} />
                  <span>Descrição Completa & Efeitos</span>
                </h4>
                <div
                  style={{
                    color: '#e2e8f0',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {data.description}
                </div>
              </div>

              {/* Aprimoramentos (se magia) */}
              {data.upgrades && data.upgrades.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--t20-mana-light)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Zap size={14} />
                    <span>Aprimoramentos Canônicos de Magia</span>
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {data.upgrades.map((upg, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(59, 130, 246, 0.06)',
                          padding: '0.75rem 0.95rem',
                          borderRadius: 'var(--radius-sm)',
                          borderLeft: '3px solid var(--t20-mana)',
                          fontSize: '0.875rem',
                        }}
                      >
                        <span style={{ fontWeight: 800, color: 'var(--t20-mana-light)', marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                          {upg.cost}:
                        </span>
                        <span style={{ color: '#e2e8f0', lineHeight: 1.4 }}>{upg.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RULES */}
          {activeTab === 'rules' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {data.ruleCitation ? (
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(20, 20, 28, 0.95) 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
                      paddingBottom: '0.75rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <BookOpen size={18} style={{ color: 'var(--t20-gold)' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--t20-gold-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {data.ruleCitation.book || 'Manual Tormenta 20: Edição Jogo do Ano (v1.3)'}
                      </span>
                    </div>
                    <span className="badge badge-gold" style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.6rem' }}>
                      {data.ruleCitation.page}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.825rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Capítulo: </span>
                      <strong style={{ color: '#ffffff' }}>{data.ruleCitation.chapter}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Seção: </span>
                      <strong style={{ color: '#ffffff' }}>{data.ruleCitation.section}</strong>
                    </div>
                  </div>

                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.45)',
                      borderLeft: '4px solid var(--t20-gold)',
                      padding: '1rem 1.2rem',
                      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                      color: '#fef3c7',
                      fontSize: '0.925rem',
                      fontStyle: 'italic',
                      lineHeight: 1.65,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {data.ruleCitation.quote}
                  </div>

                  {data.ruleCitation.explanation && (
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#e2e8f0',
                        lineHeight: 1.55,
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <strong style={{ color: 'var(--t20-gold-light)', display: 'block', marginBottom: '0.35rem' }}>
                        🛡️ Aplicação Canônica no Sistema:
                      </strong>
                      {data.ruleCitation.explanation}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--t20-gold)' }}>
                    <BookOpen size={18} />
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Tormenta 20: Edição Jogo do Ano (v1.3)</span>
                  </div>
                  <p style={{ color: '#e2e8f0', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    Este elemento segue rigorosamente as regras oficiais do manual básico de Tormenta 20 (Edição Jogo do Ano v1.3, Editora Jambô).
                    Bônus de mesma fonte ou que somem o mesmo atributo não se acumulam (Capítulo 5: Jogando, pág. 226).
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 4. FOOTER: Navigation <-- --> and Close (Anexo 3)          */}
        {/* ========================================================= */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            gap: '1rem',
          }}
        >
          {/* Navegação <-- Anterior */}
          <button
            type="button"
            onClick={handlePrevTab}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            title="Ir para a aba anterior"
          >
            <ChevronLeft size={16} />
            <span>Anterior</span>
          </button>

          {/* Indicador de Abas Centralizado (Conceito <-- -->) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  width: activeTab === tab ? 22 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeTab === tab ? 'var(--t20-gold)' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                }}
                title={`Ir para aba ${tab}`}
              />
            ))}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '0.35rem', textTransform: 'uppercase', fontWeight: 600 }}>
              {activeTab} ({currentIndex + 1}/3)
            </span>
          </div>

          {/* Navegação Próximo --> e Fechar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleNextTab}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              title="Ir para a próxima aba"
            >
              <span>Próximo</span>
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary btn-sm"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
