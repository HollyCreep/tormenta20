import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BrandMark } from './Icons';

interface BrandProps {
  onClick?: () => void;
  compact?: boolean;
}

export const Brand: React.FC<BrandProps> = ({ onClick, compact }) => (
  <button type="button" className="brand" onClick={onClick} aria-label="Tormenta 20 — Início">
    <BrandMark className="brand-mark" />
    {!compact && (
      <span className="brand-word">
        <span className="brand-name">
          TORMENTA <em>20</em>
        </span>
        <span className="brand-tag">Jogo do Ano</span>
      </span>
    )}
  </button>
);

interface AppBarProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  onBack?: () => void;
  backLabel?: string;
  /** Mostra a marca à esquerda (telas raiz no mobile). */
  brand?: boolean;
  onBrandClick?: () => void;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  /** Esconde título/subtítulo (ex.: enquanto o cabeçalho da página está visível). */
  headingHidden?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  subtitle,
  onBack,
  backLabel = 'Voltar',
  brand,
  onBrandClick,
  leading,
  actions,
  className = '',
  headingHidden = false,
}) => (
  <header className={`appbar no-print ${className}`}>
    <div className="appbar-inner">
      {onBack && (
        <button type="button" className="icon-btn" onClick={onBack} aria-label={backLabel}>
          <ArrowLeft size={22} />
        </button>
      )}
      {brand && <Brand onClick={onBrandClick} />}
      {leading}
      <div className={`appbar-heading${headingHidden ? ' is-hidden' : ''}`} aria-hidden={headingHidden || undefined}>
        {title && <div className="appbar-title">{title}</div>}
        {subtitle && <div className="appbar-subtitle">{subtitle}</div>}
      </div>
      {actions && <div className="appbar-actions">{actions}</div>}
    </div>
  </header>
);
