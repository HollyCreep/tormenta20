import React from 'react';
import { Coins, X, Check } from 'lucide-react';

interface MoneyModalProps {
  isOpen: boolean;
  currentTibares: number;
  moneyOperation: 'add' | 'remove' | 'set';
  moneyAmount: number;
  moneyReason: string;
  onSetOperation: (op: 'add' | 'remove' | 'set') => void;
  onSetAmount: (amount: number) => void;
  onSetReason: (reason: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Modal de Gerenciamento e Edição de Dinheiro (Tibares T$) com Auditoria.
 * Extraído do CharacterSheetView para reduzir o tamanho do God Component.
 */
export const MoneyModal: React.FC<MoneyModalProps> = ({
  isOpen,
  currentTibares,
  moneyOperation,
  moneyAmount,
  moneyReason,
  onSetOperation,
  onSetAmount,
  onSetReason,
  onConfirm,
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
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.15)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t20-gold)' }}>
              <Coins size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontFamily: 'var(--font-fantasy)' }}>
                Gerenciar Tibares (T$)
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Saldo Atual: <strong style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>T$ {currentTibares}</strong>
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
          {/* Seleção do Tipo de Operação */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
              Tipo de Operação
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => onSetOperation('add')}
                className="btn"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                  background: moneyOperation === 'add' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: moneyOperation === 'add' ? '1px solid #34d399' : '1px solid var(--border-color)',
                  color: moneyOperation === 'add' ? '#34d399' : 'var(--text-muted)',
                  fontWeight: moneyOperation === 'add' ? 700 : 500,
                }}
              >
                + Receber
              </button>
              <button
                type="button"
                onClick={() => onSetOperation('remove')}
                className="btn"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                  background: moneyOperation === 'remove' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: moneyOperation === 'remove' ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: moneyOperation === 'remove' ? '#ef4444' : 'var(--text-muted)',
                  fontWeight: moneyOperation === 'remove' ? 700 : 500,
                }}
              >
                - Gastar
              </button>
              <button
                type="button"
                onClick={() => onSetOperation('set')}
                className="btn"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                  background: moneyOperation === 'set' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: moneyOperation === 'set' ? '1px solid var(--t20-gold)' : '1px solid var(--border-color)',
                  color: moneyOperation === 'set' ? 'var(--t20-gold-light)' : 'var(--text-muted)',
                  fontWeight: moneyOperation === 'set' ? 700 : 500,
                }}
              >
                = Definir
              </button>
            </div>
          </div>

          {/* Valor / Quantidade */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
              {moneyOperation === 'set' ? 'Novo Saldo Total (T$)' : 'Quantidade de Tibares (T$)'}
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={moneyAmount}
              onChange={(e) => onSetAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="input-field"
              style={{ width: '100%', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
            />

            {/* Botões de Incremento Rápido */}
            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem' }}>
              {[1, 5, 10, 50, 100].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => onSetAmount(moneyAmount + inc)}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.25rem', fontSize: '0.75rem' }}
                >
                  +{inc}
                </button>
              ))}
            </div>
          </div>

          {/* Justificativa / Motivo da Transação */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.35rem', display: 'block' }}>
              Motivo / Justificativa (Auditável no Histórico)
            </label>
            <input
              type="text"
              value={moneyReason}
              onChange={(e) => onSetReason(e.target.value)}
              placeholder="Ex: Recompensa de missão, compra de suprimentos, forja..."
              className="input-field"
              style={{ width: '100%', fontSize: '0.85rem' }}
            />
          </div>

          {/* Pré-visualização do Novo Saldo */}
          <div
            style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Novo Saldo Estimado:</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
              T${' '}
              {moneyOperation === 'add'
                ? currentTibares + moneyAmount
                : moneyOperation === 'remove'
                  ? Math.max(0, currentTibares - moneyAmount)
                  : moneyAmount}
            </span>
          </div>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
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
              onClick={onConfirm}
              className="btn btn-gold"
              style={{ flex: 1.5, gap: '0.4rem', fontWeight: 700 }}
            >
              <Check size={16} />
              Confirmar Transação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
