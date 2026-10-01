import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, Calculator, ChevronRight, X } from 'lucide-react';
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const popoverWidth = 340;
    const estimatedHeight = 260;

    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    // Previne overflow horizontal
    if (left < 16) left = 16;
    if (left + popoverWidth > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - popoverWidth - 16);
    }

    // Previne overflow vertical: se estiver perto do rodapé, abre para cima
    let top = rect.bottom + 8;
    if (top + estimatedHeight > window.innerHeight - 16 && rect.top > estimatedHeight + 16) {
      top = rect.top - estimatedHeight - 8;
    }

    setPopoverPos({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);

      const handleClickOutside = (event: MouseEvent) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
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
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => {
          updatePosition();
          setIsOpen(true);
        }}
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
        title="Clique para ver o cálculo detalhado"
      >
        {showLabel && <span style={{ opacity: 0.85, fontWeight: 500 }}>{label}:</span>}
        <span style={{ color: accentColor, fontWeight: 800 }}>
          {breakdown.value >= 0 &&
          !label.includes('Defesa') &&
          !label.includes('Deslocamento') &&
          !label.includes('PV') &&
          !label.includes('PM')
            ? `+${breakdown.value}`
            : breakdown.value}
          {unit && ` ${unit}`}
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size === 'sm' ? '14px' : '16px',
            height: size === 'sm' ? '14px' : '16px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            fontSize: '0.7rem',
            color: 'var(--t20-gold)',
            marginLeft: '0.15rem',
          }}
          title="Ver cálculo de regras"
        >
          <HelpCircle size={size === 'sm' ? 11 : 13} />
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className="breakdown-popover"
            style={{
              position: 'fixed',
              top: `${popoverPos.top}px`,
              left: `${popoverPos.left}px`,
              width: '340px',
              maxWidth: 'calc(100vw - 32px)',
              background: 'rgba(15, 23, 42, 0.96)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75), 0 0 20px rgba(245, 158, 11, 0.2)',
              padding: '1rem',
              zIndex: 999999,
              animation: 'fadeIn 0.15s ease-out',
            }}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.65rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '0.45rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--t20-gold-light)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                <Calculator size={16} />
                <span>Cálculo: {label}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost"
                style={{ padding: '0.15rem 0.35rem', color: 'var(--text-dim)' }}
                title="Fechar"
              >
                <X size={14} />
              </button>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.45)',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.825rem',
                color: '#38bdf8',
                lineHeight: 1.45,
                wordBreak: 'break-word',
              }}
            >
              {breakdown.formula}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)', fontSize: '0.8rem' }}>
                Componentes da somatória:
              </div>
              <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {breakdown.components.map((comp, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.2rem 0.35rem',
                      borderRadius: 'var(--radius-xs)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderBottom: '1px dashed rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1' }}>
                      <ChevronRight size={12} style={{ color: 'var(--t20-gold)' }} />
                      {comp.label}
                    </span>
                    <span style={{ fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                      {typeof comp.value === 'number' && comp.value > 0 ? `+${comp.value}` : comp.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                marginTop: '0.75rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                fontStyle: 'italic',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Regra oficial Tormenta 20 JDA (v1.3)</span>
              <span style={{ color: 'var(--t20-gold)', fontWeight: 600 }}>Total: {breakdown.value}</span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
