import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Calculator, ChevronRight } from 'lucide-react';
import { StatBreakdown } from '../../types/character';

interface StatBreakdownBadgeProps {
  label: string;
  breakdown: StatBreakdown;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ruby' | 'gold' | 'blue' | 'green' | 'default';
  showLabel?: boolean;
}

export const StatBreakdownBadge: React.FC<StatBreakdownBadgeProps> = ({
  label,
  breakdown,
  unit = '',
  size = 'md',
  variant = 'default',
  showLabel = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o popover ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'ruby':
        return {
          badgeClass: 'badge-ruby',
          glowColor: 'var(--t20-ruby-glow)',
          accentColor: 'var(--t20-ruby)',
        };
      case 'gold':
        return {
          badgeClass: 'badge-gold',
          glowColor: 'var(--t20-gold-glow)',
          accentColor: 'var(--t20-gold-light)',
        };
      case 'blue':
        return {
          badgeClass: 'badge-blue',
          glowColor: 'var(--t20-mana-glow)',
          accentColor: 'var(--t20-mana-light)',
        };
      case 'green':
        return {
          badgeClass: 'badge-green',
          glowColor: 'var(--t20-life-glow)',
          accentColor: 'var(--t20-life-light)',
        };
      default:
        return {
          badgeClass: 'badge-slate',
          glowColor: 'rgba(255, 255, 255, 0.1)',
          accentColor: 'var(--text-main)',
        };
    }
  };

  const { badgeClass, accentColor } = getVariantStyles();

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`stat-breakdown-trigger ${badgeClass}`}
        style={{
          border: 'none',
          cursor: 'pointer',
          padding: size === 'sm' ? '0.2rem 0.5rem' : size === 'lg' ? '0.5rem 0.9rem' : '0.35rem 0.75rem',
          fontSize: size === 'sm' ? '0.8rem' : size === 'lg' ? '1.15rem' : '0.95rem',
          borderRadius: 'var(--radius-md)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontWeight: 700,
        }}
        title="Clique ou passe o mouse para ver o cálculo detalhado"
      >
        {showLabel && <span style={{ opacity: 0.85, fontWeight: 500 }}>{label}:</span>}
        <span style={{ color: accentColor, fontWeight: 800 }}>
          {breakdown.value >= 0 && !label.includes('Defesa') && !label.includes('Deslocamento') && !label.includes('PV') && !label.includes('PM') ? `+${breakdown.value}` : breakdown.value}
          {unit && ` ${unit}`}
        </span>
        <HelpCircle size={size === 'sm' ? 12 : 14} style={{ opacity: 0.6 }} />
      </button>

      {isOpen && (
        <div
          className="breakdown-popover"
          style={{
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', color: 'var(--t20-gold-light)', fontWeight: 700 }}>
            <Calculator size={16} />
            <span>Cálculo: {label}</span>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '0.75rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.825rem',
              color: '#38bdf8',
              wordBreak: 'break-word',
            }}
          >
            {breakdown.formula}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-main)' }}>Componentes da somatória:</div>
            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {breakdown.components.map((comp, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.15rem 0', borderBottom: '1px dashed rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ChevronRight size={12} style={{ color: 'var(--t20-ruby)' }} />
                    {comp.label}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                    {typeof comp.value === 'number' && comp.value > 0 ? `+${comp.value}` : comp.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.725rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
            Regra oficial de Tormenta 20 (Jogo do Ano v1.3)
          </div>
        </div>
      )}
    </div>
  );
};
