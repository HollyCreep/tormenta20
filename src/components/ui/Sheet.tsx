import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { isTopOverlay, useBackEntry } from './backStack';

/**
 * Sheet — o único contêiner modal do app.
 * • Mobile: bottom sheet com alça (arraste para baixo para fechar).
 * • Desktop (≥ 768px): diálogo centralizado.
 * • Fecha com Esc, toque no fundo e botão voltar do Android (somente o topo).
 * • Renderizado em portal com trava de rolagem do body.
 */

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  headerActions?: React.ReactNode;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Ocupa quase toda a altura no mobile (listas longas, formulários). */
  full?: boolean;
  /** Corpo sem padding (listas de borda a borda). */
  flush?: boolean;
  /** Toque no fundo fecha o sheet (padrão: true). */
  dismissible?: boolean;
  hideClose?: boolean;
  className?: string;
  bodyClassName?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

let scrollLocks = 0;
function lockScroll() {
  scrollLocks += 1;
  if (scrollLocks === 1) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}
function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
}

const EXIT_MS = 200;

export const Sheet: React.FC<SheetProps> = ({
  open,
  onClose,
  title,
  subtitle,
  icon,
  headerActions,
  toolbar,
  footer,
  size = 'md',
  full = false,
  flush = false,
  dismissible = true,
  hideClose = false,
  className = '',
  bodyClassName = '',
  ariaLabel,
  children,
}) => {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{ startY: number; dy: number; active: boolean }>({ startY: 0, dy: 0, active: false });

  // Montagem com animação de saída
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const t = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const visible = open && mounted;
  const entryId = useBackEntry(visible, onClose);

  // Trava de rolagem + foco
  useEffect(() => {
    if (!visible) return;
    lockScroll();
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => sheetRef.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(raf);
      unlockScroll();
      const prev = restoreFocusRef.current;
      if (prev && typeof prev.focus === 'function' && document.contains(prev)) {
        prev.focus({ preventScroll: true });
      }
    };
  }, [visible]);

  // Esc fecha apenas o sheet do topo
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTopOverlay(entryId.current)) {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, onClose, entryId]);

  if (!mounted) return null;

  // Arrastar a alça/cabeçalho para baixo fecha (mobile)
  const onPointerDown = (e: React.PointerEvent) => {
    if (window.matchMedia('(min-width: 768px)').matches) return;
    if ((e.target as HTMLElement).closest('button, a, input, select, textarea')) return;
    dragRef.current = { startY: e.clientY, dy: 0, active: true };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.active || !sheetRef.current) return;
    d.dy = Math.max(0, e.clientY - d.startY);
    sheetRef.current.style.transition = 'none';
    sheetRef.current.style.transform = `translateY(${d.dy}px)`;
  };
  const onPointerUp = () => {
    const d = dragRef.current;
    if (!d.active || !sheetRef.current) return;
    d.active = false;
    const el = sheetRef.current;
    el.style.transition = 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)';
    if (d.dy > 110) {
      el.style.transform = 'translateY(100%)';
      window.setTimeout(onClose, 160);
    } else {
      el.style.transform = '';
    }
  };

  const dragProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };

  const hasHeader = title || subtitle || icon || headerActions || !hideClose;

  return createPortal(
    <div className={`sheet-root${closing ? ' is-closing' : ''}`} role="presentation">
      <div className="sheet-backdrop" onClick={dismissible ? onClose : undefined} aria-hidden="true" />
      <div
        ref={sheetRef}
        className={`sheet sheet-${size}${full ? ' sheet-full' : ''} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || (typeof title === 'string' ? title : undefined)}
        tabIndex={-1}
      >
        <div className="sheet-grip" {...dragProps} aria-hidden="true" />
        {hasHeader && (
          <div className="sheet-header" {...dragProps}>
            {icon && <div className="sheet-icon">{icon}</div>}
            <div className="sheet-heading">
              {title && <div className="sheet-title">{title}</div>}
              {subtitle && <div className="sheet-subtitle">{subtitle}</div>}
            </div>
            {headerActions}
            {!hideClose && (
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar">
                <X size={22} />
              </button>
            )}
          </div>
        )}
        {toolbar && <div className="sheet-toolbar">{toolbar}</div>}
        <div className={`sheet-body${flush ? ' sheet-body-flush' : ''} ${bodyClassName}`}>{children}</div>
        {footer && <div className="sheet-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
