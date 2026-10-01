import React from 'react';
import { X, Sparkles, Shield, Sword, BookOpen, Compass, Zap } from 'lucide-react';
import { RuleCitation } from '../../data/rulesCitations';

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
  stats?: { label: string; value: string | number }[];
}

interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  if (!data) return null;

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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(230, 57, 70, 0.08) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
              }}
            >
              {getCategoryIcon()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff' }}>{data.title}</h3>
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
              </div>
              {data.subtitle && <p style={{ fontSize: '0.85rem', margin: '0.2rem 0 0 0', color: 'var(--text-muted)' }}>{data.subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Parâmetros rápidos (se houver) */}
          {(data.prerequisites || data.execution || data.range || data.duration || data.resistance) && (
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
          )}

          {/* Estatísticas Numéricas (como armas e armaduras) */}
          {data.stats && data.stats.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {data.stats.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{s.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Citação Oficial do Livro de Regras (quando presente) */}
          {data.ruleCitation && (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(20, 20, 28, 0.95) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
                  paddingBottom: '0.65rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={18} style={{ color: 'var(--t20-gold)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--t20-gold-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {data.ruleCitation.book || 'Manual Tormenta 20: Edição Jogo do Ano (v1.3)'}
                  </span>
                </div>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.55rem' }}>
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
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderLeft: '4px solid var(--t20-gold)',
                  padding: '0.9rem 1.1rem',
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
                    padding: '0.75rem 0.95rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <strong style={{ color: 'var(--t20-gold-light)', display: 'block', marginBottom: '0.25rem' }}>
                    Aplicação no Aplicativo:
                  </strong>
                  {data.ruleCitation.explanation}
                </div>
              )}
            </div>
          )}

          {/* Descrição oficial */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--t20-gold-light)', marginBottom: '0.5rem' }}>
              Descrição & Regras
            </h4>
            <div style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
              {data.description}
            </div>
          </div>

          {/* Aprimoramentos (se magia) */}
          {data.upgrades && data.upgrades.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--t20-mana-light)', marginBottom: '0.5rem' }}>
                Aprimoramentos de Magia
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.upgrades.map((upg, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(59, 130, 246, 0.06)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '3px solid var(--t20-mana)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: 'var(--t20-mana-light)', marginRight: '0.5rem' }}>{upg.cost}:</span>
                    <span style={{ color: '#e2e8f0' }}>{upg.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Livro de Regras: Tormenta 20 (Jogo do Ano v1.3)
          </span>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
