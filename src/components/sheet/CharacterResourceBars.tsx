import React, { useState } from 'react';
import { Footprints, Heart, Minus, Plus, Shield, ShieldAlert, Sparkles, Weight } from 'lucide-react';
import type { CharacterSheet, StatBreakdown } from '../../types/character';
import { CalcSheet, formatBreakdownValue } from '../common/StatBreakdownBadge';
import { percent } from '../../utils/displayNames';

interface CharacterResourceBarsProps {
  character: CharacterSheet;
  onModifyHp: (delta: number) => void;
  onModifyMp: (delta: number) => void;
  onOpenAdjust: (kind: 'hp' | 'mp') => void;
}

type CalcKey = 'defense' | 'speed' | 'spaces' | 'penalty' | 'maxHp' | 'maxMp';

/** Vitais da ficha: PV e PM ajustáveis + Defesa, Deslocamento, Carga e Penalidade. */
export const CharacterResourceBars: React.FC<CharacterResourceBarsProps> = ({
  character,
  onModifyHp,
  onModifyMp,
  onOpenAdjust,
}) => {
  const [calc, setCalc] = useState<CalcKey | null>(null);
  const { stats } = character;
  const tempHp = stats.tempHp || 0;
  const overloaded = stats.currentSpaces > stats.maxSpaces.value;

  const calcData: Record<CalcKey, { label: string; breakdown: StatBreakdown; unit?: string }> = {
    defense: { label: 'Defesa', breakdown: stats.defense },
    speed: { label: 'Deslocamento', breakdown: stats.speed, unit: 'm' },
    spaces: { label: 'Carga máxima (espaços)', breakdown: stats.maxSpaces },
    penalty: { label: 'Penalidade de armadura', breakdown: stats.armorPenalty },
    maxHp: { label: 'PV máximos', breakdown: stats.maxHp },
    maxMp: { label: 'PM máximos', breakdown: stats.maxMp },
  };

  const active = calc ? calcData[calc] : null;

  return (
    <section className="stack" aria-label="Vitais">
      <div className="vitals-grid">
        {/* Pontos de Vida */}
        <div className="vital-card vital-hp">
          <div className="vital-head">
            <span className="vital-label">
              <Heart size={15} />
              Vida
            </span>
            {tempHp > 0 && <span className="badge badge-temp">+{tempHp} temp</span>}
          </div>
          <button type="button" className="vital-value" onClick={() => onOpenAdjust('hp')} aria-label="Ajustar pontos de vida">
            <span className="t-num">{stats.currentHp}</span>
            <span className="vital-max t-num">/{stats.maxHp.value}</span>
          </button>
          <div className="meter meter-hp meter-lg" style={{ '--pct': percent(stats.currentHp, stats.maxHp.value) } as React.CSSProperties}>
            <span className="meter-fill" />
            {tempHp > 0 && <span className="meter-temp" style={{ '--temp-pct': percent(tempHp, stats.maxHp.value) } as React.CSSProperties} />}
          </div>
          <div className="vital-actions">
            <button type="button" className="vital-step" onClick={() => onModifyHp(-1)} aria-label="Sofrer 1 de dano">
              <Minus size={18} />
            </button>
            <button type="button" className="vital-step" onClick={() => onModifyHp(1)} aria-label="Curar 1 PV">
              <Plus size={18} />
            </button>
            <button type="button" className="vital-more" onClick={() => setCalc('maxHp')} aria-label="Ver cálculo dos PV máximos">
              máx.
            </button>
          </div>
        </div>

        {/* Pontos de Mana */}
        <div className="vital-card vital-mp">
          <div className="vital-head">
            <span className="vital-label">
              <Sparkles size={15} />
              Mana
            </span>
          </div>
          <button type="button" className="vital-value" onClick={() => onOpenAdjust('mp')} aria-label="Ajustar pontos de mana">
            <span className="t-num">{stats.currentMp}</span>
            <span className="vital-max t-num">/{stats.maxMp.value}</span>
          </button>
          <div className="meter meter-mp meter-lg" style={{ '--pct': percent(stats.currentMp, stats.maxMp.value) } as React.CSSProperties}>
            <span className="meter-fill" />
          </div>
          <div className="vital-actions">
            <button type="button" className="vital-step" onClick={() => onModifyMp(-1)} aria-label="Gastar 1 PM">
              <Minus size={18} />
            </button>
            <button type="button" className="vital-step" onClick={() => onModifyMp(1)} aria-label="Recuperar 1 PM">
              <Plus size={18} />
            </button>
            <button type="button" className="vital-more" onClick={() => setCalc('maxMp')} aria-label="Ver cálculo dos PM máximos">
              máx.
            </button>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        <button type="button" className="mini-stat mini-stat-def" onClick={() => setCalc('defense')}>
          <span className="mini-stat-label">
            <Shield size={13} />
            Defesa
          </span>
          <span className="mini-stat-value t-num">{stats.defense.value}</span>
        </button>
        <button type="button" className="mini-stat" onClick={() => setCalc('speed')}>
          <span className="mini-stat-label">
            <Footprints size={13} />
            Desloc.
          </span>
          <span className="mini-stat-value t-num">
            {stats.speed.value}
            <small>m</small>
          </span>
        </button>
        <button type="button" className={`mini-stat${overloaded ? ' is-danger' : ''}`} onClick={() => setCalc('spaces')}>
          <span className="mini-stat-label">
            <Weight size={13} />
            Carga
          </span>
          <span className="mini-stat-value t-num">
            {stats.currentSpaces}
            <small>/{stats.maxSpaces.value}</small>
          </span>
        </button>
        <button type="button" className="mini-stat" onClick={() => setCalc('penalty')}>
          <span className="mini-stat-label">
            <ShieldAlert size={13} />
            Penal.
          </span>
          <span className="mini-stat-value t-num">{stats.armorPenalty.value}</span>
        </button>
      </div>

      {active && (
        <CalcSheet
          open={!!calc}
          onClose={() => setCalc(null)}
          label={active.label}
          breakdown={active.breakdown}
          unit={active.unit}
          footer={
            calc === 'spaces' ? (
              <div className={`callout ${overloaded ? 'callout-danger' : 'callout-success'}`} style={{ flex: 1 }}>
                <Weight size={18} />
                <span>
                  Carregando {stats.currentSpaces} de {formatBreakdownValue('Carga', stats.maxSpaces.value)} espaços
                  {overloaded
                    ? ' — sobrecarregado: penalidade de armadura −5 e deslocamento −3m (T20 JDA, Cap. 3, pág. 141). Limite absoluto: o dobro da carga.'
                    : '.'}
                </span>
              </div>
            ) : undefined
          }
        />
      )}
    </section>
  );
};
