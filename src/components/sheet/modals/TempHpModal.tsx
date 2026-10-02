import React from 'react';
import { ShieldAlert, X, Check, Plus } from 'lucide-react';

interface TempHpModalProps {
  isOpen: boolean;
  currentTempHp: number;
  tempHpAmount: number;
  tempHpReason: string;
  onSetAmount: (amount: number) => void;
  onSetReason: (reason: string) => void;
  onApply: (amount: number, operation: 'add' | 'set', reason?: string) => void;
  onClose: () => void;
}

/**
 * Modal de Gerenciamento de Pontos de Vida Temporários com Auditoria.
 * Extraído do CharacterSheetView para decompor o God Component.
 */
export const TempHpModal: React.FC<TempHpModalProps> = ({
  isOpen,
  currentTempHp,
  tempHpAmount,
  tempHpReason,
  onSetAmount,
  onSetReason,
  onApply,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          width: '95%',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontFamily: 'var(--font-fantasy)' }}>
                Pontos de Vida Temporários
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Atual: <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>+{currentTempHp} PV Temp</strong>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.35rem', borderRadius: '50%', color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem',
              fontSize: '0.8rem',
              color: '#e0f2fe',
              lineHeight: 1.5,
            }}
          >
            <strong>Regra Canônica T20 JDA (Apêndice: Condições, pág. 394):</strong>
            <br />
            PV temporários absorvem dano antes do seu PV normal. Não são recuperados por cura comum e não se acumulam de uma mesma fonte (aplica-se o maior).
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
              Quantidade de PV Temporários
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={tempHpAmount}
              onChange={(e) => onSetAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="input-field"
              style={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />

            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
              {[5, 10, 15, 20].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => onSetAmount(val)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.25rem', fontSize: '0.75rem' }}
                >
                  {val} PV
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
              Origem / Magia / Efeito (Auditável no Histórico)
            </label>
            <input
              type="text"
              value={tempHpReason}
              onChange={(e) => onSetReason(e.target.value)}
              placeholder="Ex: Magia Vitalidade das Fadas, Pele de Pedra, Poção..."
              className="input-field"
              style={{ width: '100%', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            {currentTempHp > 0 && (
              <button
                type="button"
                onClick={() => onApply(0, 'set', 'PV Temporários zerados/expirados.')}
                className="btn btn-secondary"
                style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
              >
                Zerar PV
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onApply(tempHpAmount, 'set', tempHpReason.trim() || undefined)}
              className="btn btn-primary"
              style={{ flex: 1.5, gap: '0.4rem', fontWeight: 700, background: '#0284c7', borderColor: '#38bdf8' }}
            >
              <Check size={16} />
              Definir ({tempHpAmount})
            </button>
            <button
              type="button"
              onClick={() => onApply(tempHpAmount, 'add', tempHpReason.trim() || undefined)}
              className="btn btn-primary"
              style={{ flex: 1.5, gap: '0.4rem', fontWeight: 700 }}
            >
              <Plus size={16} />
              Somar (+{tempHpAmount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
