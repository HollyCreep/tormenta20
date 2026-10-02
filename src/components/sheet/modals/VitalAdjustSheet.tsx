import React, { useEffect, useState } from 'react';
import { ArrowRight, Delete, Heart, ShieldPlus, Sparkles } from 'lucide-react';
import { Sheet } from '../../ui/Sheet';
import { Segmented } from '../../ui/controls';

export type VitalKind = 'hp' | 'mp';
export type HpMode = 'dano' | 'cura' | 'temp';
export type MpMode = 'gastar' | 'recuperar';

interface VitalAdjustSheetProps {
  open: boolean;
  kind: VitalKind;
  current: number;
  max: number;
  temp: number;
  onClose: () => void;
  onApplyHp: (mode: HpMode, amount: number, reason: string, tempOp: 'add' | 'set') => void;
  onApplyMp: (mode: MpMode, amount: number, reason: string) => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

/** Ajuste de PV/PM com teclado numérico — rápido no meio do combate. */
export const VitalAdjustSheet: React.FC<VitalAdjustSheetProps> = ({
  open,
  kind,
  current,
  max,
  temp,
  onClose,
  onApplyHp,
  onApplyMp,
}) => {
  const [hpMode, setHpMode] = useState<HpMode>('dano');
  const [mpMode, setMpMode] = useState<MpMode>('gastar');
  const [tempOp, setTempOp] = useState<'add' | 'set'>('add');
  const [value, setValue] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) {
      setValue('');
      setReason('');
      setTempOp('add');
    }
  }, [open, kind]);

  const amount = Math.min(999, parseInt(value || '0', 10));

  const press = (key: string) => {
    if (key === 'C') return setValue('');
    if (key === '⌫') return setValue((v) => v.slice(0, -1));
    setValue((v) => (v.length >= 3 ? v : (v + key).replace(/^0+(?=\d)/, '')));
  };
  const bump = (n: number) => setValue(String(Math.min(999, amount + n)));

  // Prévia do resultado
  let preview: { from: string; to: string } | null = null;
  if (amount > 0) {
    if (kind === 'mp') {
      const next = mpMode === 'gastar' ? Math.max(0, current - amount) : Math.min(max, current + amount);
      preview = { from: `${current}`, to: `${next}` };
    } else if (hpMode === 'temp') {
      const next = tempOp === 'add' ? temp + amount : amount;
      preview = { from: `${temp} temp`, to: `${next} temp` };
    } else if (hpMode === 'dano') {
      const absorbed = Math.min(temp, amount);
      const next = Math.max(0, current - (amount - absorbed));
      preview = { from: `${current}${temp ? ` +${temp}` : ''}`, to: `${next}${temp - absorbed ? ` +${temp - absorbed}` : ''}` };
    } else {
      preview = { from: `${current}`, to: `${Math.min(max, current + amount)}` };
    }
  }

  const tone =
    kind === 'mp'
      ? mpMode === 'gastar'
        ? 'mp'
        : 'success'
      : hpMode === 'dano'
        ? 'danger'
        : hpMode === 'temp'
          ? 'temp'
          : 'success';

  const actionLabel =
    kind === 'mp'
      ? mpMode === 'gastar'
        ? `Gastar ${amount || ''} PM`
        : `Recuperar ${amount || ''} PM`
      : hpMode === 'dano'
        ? `Sofrer ${amount || ''} de dano`
        : hpMode === 'cura'
          ? `Curar ${amount || ''} PV`
          : tempOp === 'add'
            ? `Somar ${amount || ''} PV temp.`
            : `Definir ${amount} PV temp.`;

  const apply = () => {
    if (kind === 'mp') {
      if (amount <= 0) return;
      onApplyMp(mpMode, amount, reason.trim());
    } else {
      if (amount <= 0 && !(hpMode === 'temp' && tempOp === 'set')) return;
      onApplyHp(hpMode, amount, reason.trim(), tempOp);
    }
    onClose();
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={kind === 'hp' ? 'Pontos de Vida' : 'Pontos de Mana'}
      subtitle={kind === 'hp' ? `${current}/${max} PV${temp ? ` · ${temp} temporários` : ''}` : `${current}/${max} PM`}
      icon={kind === 'hp' ? <Heart size={22} /> : <Sparkles size={22} />}
      size="sm"
      footer={
        <button
          type="button"
          className={`btn btn-lg vital-apply vital-apply-${tone}`}
          onClick={apply}
          disabled={amount <= 0 && !(kind === 'hp' && hpMode === 'temp' && tempOp === 'set')}
        >
          {actionLabel.replace('  ', ' ')}
        </button>
      }
    >
      <div className="stack">
        {kind === 'hp' ? (
          <Segmented<HpMode>
            value={hpMode}
            onChange={setHpMode}
            ariaLabel="Tipo de ajuste"
            accent
            options={[
              { value: 'dano', label: 'Dano' },
              { value: 'cura', label: 'Cura' },
              { value: 'temp', label: 'Temporários', icon: <ShieldPlus size={15} /> },
            ]}
          />
        ) : (
          <Segmented<MpMode>
            value={mpMode}
            onChange={setMpMode}
            ariaLabel="Tipo de ajuste"
            accent
            options={[
              { value: 'gastar', label: 'Gastar' },
              { value: 'recuperar', label: 'Recuperar' },
            ]}
          />
        )}

        {kind === 'hp' && hpMode === 'temp' && (
          <Segmented<'add' | 'set'>
            value={tempOp}
            onChange={setTempOp}
            ariaLabel="Operação de PV temporários"
            options={[
              { value: 'add', label: 'Somar aos atuais' },
              { value: 'set', label: 'Definir valor' },
            ]}
          />
        )}

        <div className={`keypad-display tone-${tone}`} aria-live="polite">
          <span className="keypad-amount t-num">{amount}</span>
          {preview && (
            <span className="keypad-preview t-num">
              {preview.from}
              <ArrowRight size={14} />
              <strong>{preview.to}</strong>
            </span>
          )}
          {kind === 'hp' && hpMode === 'dano' && temp > 0 && amount > 0 && (
            <span className="t-xs t-temp">PV temporários absorvem o dano primeiro.</span>
          )}
        </div>

        <div className="chip-wrap keypad-quick">
          {[1, 2, 5, 10].map((n) => (
            <button key={n} type="button" className="chip chip-sm" onClick={() => bump(n)}>
              +{n}
            </button>
          ))}
        </div>

        <div className="keypad" role="group" aria-label="Teclado numérico">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              className={`keypad-key${k === 'C' || k === '⌫' ? ' is-aux' : ''}`}
              onClick={() => press(k)}
              aria-label={k === '⌫' ? 'Apagar' : k === 'C' ? 'Limpar' : k}
            >
              {k === '⌫' ? <Delete size={20} /> : k}
            </button>
          ))}
        </div>

        <label className="field">
          <span className="field-label">Motivo (opcional, vai para a auditoria)</span>
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ex.: mordida do lobo das cavernas" />
        </label>
      </div>
    </Sheet>
  );
};
