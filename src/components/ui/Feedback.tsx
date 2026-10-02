import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { Sheet } from './Sheet';

/**
 * Feedback do app: toasts e confirmações em sheet.
 * Substitui window.alert / window.confirm (bloqueantes e fora do tema).
 */

type Tone = 'info' | 'success' | 'warning' | 'danger';

interface ToastOptions {
  tone?: Tone;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastItem extends ToastOptions {
  id: number;
  message: string;
}

export interface ConfirmOptions {
  title: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
}

interface FeedbackValue {
  toast: (message: string, options?: ToastOptions) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const FeedbackContext = createContext<FeedbackValue | null>(null);

const TONE_ICON: Record<Tone, React.ReactNode> = {
  info: <Info size={20} />,
  success: <CheckCircle2 size={20} />,
  warning: <AlertTriangle size={20} />,
  danger: <XCircle size={20} />,
};

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<(ConfirmOptions & { open: boolean }) | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);
  const seqRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = ++seqRef.current;
      setToasts((prev) => [...prev.slice(-2), { id, message, ...options }]);
      window.setTimeout(() => dismiss(id), options.duration ?? 3800);
    },
    [dismiss]
  );

  const settle = useCallback((value: boolean) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setConfirmState((prev) => (prev ? { ...prev, open: false } : prev));
  }, []);

  const confirm = useCallback((options: ConfirmOptions) => {
    resolverRef.current?.(false);
    setConfirmState({ ...options, open: true });
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  return (
    <FeedbackContext.Provider value={{ toast, confirm }}>
      {children}

      {createPortal(
        <div className="toast-stack" aria-live="polite" aria-atomic="false">
          {toasts.map((t) => (
            <div key={t.id} className={`toast toast-${t.tone || 'info'}`} role="status">
              {TONE_ICON[t.tone || 'info']}
              <span className="grow">{t.message}</span>
              {t.action && (
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  style={{ color: 'inherit' }}
                  onClick={() => {
                    t.action?.onClick();
                    dismiss(t.id);
                  }}
                >
                  {t.action.label}
                </button>
              )}
            </div>
          ))}
        </div>,
        document.body
      )}

      <Sheet
        open={!!confirmState?.open}
        onClose={() => settle(false)}
        title={confirmState?.title}
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={() => settle(false)}>
              {confirmState?.cancelLabel || 'Cancelar'}
            </button>
            <button
              type="button"
              className={`btn ${confirmState?.tone === 'danger' ? 'btn-danger-solid' : 'btn-primary'}`}
              onClick={() => settle(true)}
            >
              {confirmState?.confirmLabel || 'Confirmar'}
            </button>
          </>
        }
      >
        {confirmState?.message && <div className="t-body">{confirmState.message}</div>}
      </Sheet>
    </FeedbackContext.Provider>
  );
};

export function useFeedback(): FeedbackValue {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error('useFeedback deve ser usado dentro de FeedbackProvider');
  return ctx;
}
