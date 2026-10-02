import React, { useEffect, useState } from 'react';
import { ArrowRight, Coins } from 'lucide-react';
import { Sheet } from '../../ui/Sheet';
import { Segmented } from '../../ui/controls';

export type MoneyOperation = 'add' | 'remove' | 'set';

interface MoneySheetProps {
  open: boolean;
  currentTibares: number;
  onClose: () => void;
  onConfirm: (operation: MoneyOperation, amount: number, reason: string) => void;
}

/** Movimentação de Tibares (T$) com motivo auditável. */
export const MoneySheet: React.FC<MoneySheetProps> = ({ open, currentTibares, onClose, onConfirm }) => {
  const [operation, setOperation] = useState<MoneyOperation>('add');
  const [amount, setAmount] = useState<string>('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) {
      setOperation('add');
      setAmount('');
      setReason('');
    }
  }, [open]);

  const value = Math.max(0, parseInt(amount || '0', 10) || 0);
  const next =
    operation === 'add' ? currentTibares + value : operation === 'remove' ? Math.max(0, currentTibares - value) : value;
  const insufficient = operation === 'remove' && value > currentTibares;

  const bump = (n: number) => setAmount(String(value + n));

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Tibares"
      subtitle={`Saldo atual: T$ ${currentTibares.toLocaleString('pt-BR')}`}
      icon={<Coins size={22} />}
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={value <= 0 && operation !== 'set'}
            onClick={() => {
              onConfirm(operation, value, reason.trim());
              onClose();
            }}
          >
            Confirmar
          </button>
        </>
      }
    >
      <div className="stack">
        <Segmented<MoneyOperation>
          value={operation}
          onChange={setOperation}
          ariaLabel="Operação"
          accent
          options={[
            { value: 'add', label: 'Receber' },
            { value: 'remove', label: 'Gastar' },
            { value: 'set', label: 'Definir' },
          ]}
        />

        <label className="field">
          <span className="field-label">Valor (T$)</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="0"
            className="money-input"
          />
        </label>

        <div className="chip-wrap">
          {[1, 10, 50, 100, 500].map((n) => (
            <button key={n} type="button" className="chip chip-sm" onClick={() => bump(n)}>
              +{n}
            </button>
          ))}
        </div>

        <div className={`callout ${insufficient ? 'callout-warning' : 'callout-gold'}`}>
          <Coins size={18} />
          <span className="hstack wrap">
            T$ {currentTibares.toLocaleString('pt-BR')}
            <ArrowRight size={14} />
            <strong>T$ {next.toLocaleString('pt-BR')}</strong>
            {insufficient && <span className="t-xs">· saldo insuficiente, ficará em 0</span>}
          </span>
        </div>

        <label className="field">
          <span className="field-label">Motivo (opcional)</span>
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex.: recompensa do conde" />
        </label>
      </div>
    </Sheet>
  );
};
