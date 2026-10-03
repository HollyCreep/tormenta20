import React, { useMemo, useState } from 'react';
import { AlertTriangle, ChevronDown, Dices, Gauge, Sparkles, Wand2, Zap } from 'lucide-react';
import type { CharacterSheet, CharacterSpell } from '../../types/character';
import { calculateMaxSpellCost, calculateSpellSaveDc, getSpellcastingKeyAttribute } from '../../utils/rulesEngine';
import { cleanT20Text } from '../../utils/textUtils';
import { ExecutionBadge, RangeBadge, SchoolBadge, SpellTypeBadge } from '../common/T20Badge';
import { CalcSheet } from '../common/StatBreakdownBadge';
import { Sheet } from '../ui/Sheet';
import { NumberStepper, Switch } from '../ui/controls';
import { formatSigned } from '../../utils/displayNames';

interface SpellCastModalProps {
  spell: CharacterSpell;
  character: CharacterSheet;
  isOpen: boolean;
  onClose: () => void;
  onCastSpell: (
    spellName: string,
    pmCost: number,
    rollInfo?: { title: string; sides: number; count: number; modifier: number }
  ) => void;
}

// Custo base por círculo (T20 JDA, Cap. 4: Magia, pág. 178)
const BASE_COST_BY_CIRCLE: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };

/** Extrai o custo numérico de um aprimoramento ("+2 PM" → 2; "Truque" → 0). */
const parseUpgradeCost = (costStr?: string): number => {
  const match = (costStr || '').match(/\+(\d+)\s*PM/i);
  return match ? parseInt(match[1], 10) : 0;
};

/** Lançamento de magia com aprimoramentos, limite de PM por nível e CD (Cap. 4, pág. 178). */
export const SpellCastModal: React.FC<SpellCastModalProps> = ({ spell, character, isOpen, onClose, onCastSpell }) => {
  const baseCost = BASE_COST_BY_CIRCLE[spell?.circle || 1] || 1;
  // Magias raciais usam o atributo-chave da habilidade (ex.: Tatuagem Mística, Carisma — Cap. 1, pág. 26)
  const keyAttrKey = spell?.keyAttribute || getSpellcastingKeyAttribute(character.classId, character.classSubclass);
  // Limite de PM: nível na classe que fornece a magia; raça/origem/poderes: nível de personagem (Cap. 5, pág. 224)
  const levelLimit =
    spell?.learnedFrom === 'classe'
      ? character.classes?.find((c) => c.classId === character.classId)?.level ?? character.level
      : character.level;
  // Alquebrado: custo em PM das habilidades +1 (Apêndice, pág. 394)
  const alquebrado = (character.activeConditions || []).includes('alquebrado') ? 1 : 0;
  const keyAttrMod = character.totalAttributes[keyAttrKey] || 0;
  const keyAttrName = keyAttrKey.toUpperCase();
  const hasUnlimitedMagic = (character.powers || []).some((p) => p.name === 'Magia Ilimitada');

  const [selectedUpgrades, setSelectedUpgrades] = useState<Record<number, number>>({});
  const [customCostModifier, setCustomCostModifier] = useState(0);
  const [customDcModifier, setCustomDcModifier] = useState(0);
  const [showManual, setShowManual] = useState(false);
  const [calc, setCalc] = useState<'dc' | 'limit' | null>(null);

  const saveDc = useMemo(
    () => calculateSpellSaveDc(character.level, keyAttrMod, keyAttrName, customDcModifier, 'Modificador manual'),
    [character.level, keyAttrMod, keyAttrName, customDcModifier]
  );
  const maxPm = useMemo(
    () => calculateMaxSpellCost(levelLimit, hasUnlimitedMagic, keyAttrMod),
    [levelLimit, hasUnlimitedMagic, keyAttrMod]
  );

  const upgradesCost = (spell?.upgrades || []).reduce(
    (sum, upg, idx) => sum + parseUpgradeCost(upg.cost) * (selectedUpgrades[idx] || 0),
    0
  );
  // Truque: custo zero e não combina com outros aprimoramentos (Cap. 4, pág. 171)
  const truqueIdx = (spell?.upgrades || []).findIndex((u) => /truque/i.test(u.cost));
  const usingTruque = truqueIdx >= 0 && (selectedUpgrades[truqueIdx] || 0) > 0;
  const totalCost = usingTruque ? alquebrado : Math.max(1, baseCost + upgradesCost + customCostModifier + alquebrado);
  const exceedsMaxPm = totalCost > maxPm.maxCost;
  const exceedsCurrentPm = totalCost > character.stats.currentMp;
  const canCast = !exceedsMaxPm && !exceedsCurrentPm;

  // Detecta a rolagem de dano/cura no texto e soma dados extras de aprimoramentos
  const detectedRoll = useMemo(() => {
    const match = (spell?.description || '').match(/(\d+)d(\d+)(?:\s*\+\s*(\d+))?/i);
    if (!match) return null;
    let count = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const mod = match[3] ? parseInt(match[3], 10) : 0;
    (spell?.upgrades || []).forEach((upg, idx) => {
      const qty = selectedUpgrades[idx] || 0;
      if (qty > 0 && upg.description) {
        const extra = upg.description.match(/aumenta o dano em \+(\d+)d(\d+)/i) || upg.description.match(/\+(\d+)d(\d+)/i);
        if (extra && parseInt(extra[2], 10) === sides) count += parseInt(extra[1], 10) * qty;
      }
    });
    return { count, sides, mod, label: `${count}d${sides}${mod > 0 ? `+${mod}` : ''}` };
  }, [spell?.description, spell?.upgrades, selectedUpgrades]);

  const setUpgrade = (idx: number, qty: number) =>
    setSelectedUpgrades((prev) => {
      // Truque é exclusivo: ao ativá-lo, os demais aprimoramentos são desligados (e vice-versa)
      if (idx === truqueIdx && qty > 0) return { [idx]: 1 };
      const next = { ...prev, [idx]: Math.max(0, qty) };
      if (idx !== truqueIdx && qty > 0 && truqueIdx >= 0) delete next[truqueIdx];
      return next;
    });

  const handleCast = () => {
    if (!canCast || !spell) return;
    onCastSpell(
      spell.name,
      totalCost,
      detectedRoll
        ? {
            title: `Dano/Efeito de ${spell.name} (${detectedRoll.label})`,
            sides: detectedRoll.sides,
            count: detectedRoll.count,
            modifier: detectedRoll.mod,
          }
        : undefined
    );
    onClose();
  };

  if (!spell || !spell.name) return null;

  return (
    <>
      <Sheet
        open={isOpen}
        onClose={onClose}
        title={cleanT20Text(spell.name)}
        subtitle={`${spell.circle || 1}º círculo · ${spell.school}`}
        icon={<Wand2 size={22} />}
        size="lg"
        full
        footer={
          <>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCast} disabled={!canCast}>
              <Zap size={18} />
              Lançar · {totalCost} PM
            </button>
          </>
        }
      >
        <div className="stack-lg">
          <div className="chip-wrap">
            <SchoolBadge school={spell.school} />
            <SpellTypeBadge type={spell.type} />
            {spell.execution && <ExecutionBadge execution={spell.execution} />}
            {spell.range && <RangeBadge range={spell.range} />}
          </div>

          <div className="cast-summary">
            <div className="cast-cost">
              <span className="t-label">Custo total</span>
              <span className="cast-cost-value t-num">
                {totalCost}
                <small> PM</small>
              </span>
              <span className="t-xs t-3">
                Base {baseCost}
                {upgradesCost ? ` + aprimoramentos ${upgradesCost}` : ''}
                {customCostModifier ? ` ${formatSigned(customCostModifier)} manual` : ''}
              </span>
            </div>
            <div className="cast-side">
              <div className="stat">
                <span className="stat-label">
                  <Sparkles size={13} />
                  Disponível
                </span>
                <span className={`stat-value${exceedsCurrentPm ? ' t-danger' : ''}`}>{character.stats.currentMp} PM</span>
              </div>
              <button type="button" className="stat" onClick={() => setCalc('limit')}>
                <span className="stat-label">
                  <Gauge size={13} />
                  Limite
                </span>
                <span className={`stat-value${exceedsMaxPm ? ' t-danger' : ''}`}>{maxPm.maxCost} PM</span>
              </button>
              <button type="button" className="stat" onClick={() => setCalc('dc')}>
                <span className="stat-label">CD</span>
                <span className="stat-value">{saveDc.value}</span>
              </button>
            </div>
          </div>

          {exceedsMaxPm && (
            <div className="callout callout-danger">
              <AlertTriangle size={18} />
              <span>
                O custo ({totalCost} PM) passa do limite por magia ({maxPm.maxCost} PM), que é igual ao seu nível (Cap. 4, pág. 178).
              </span>
            </div>
          )}
          {!exceedsMaxPm && exceedsCurrentPm && (
            <div className="callout callout-warning">
              <AlertTriangle size={18} />
              <span>PM insuficientes: faltam {totalCost - character.stats.currentMp} PM.</span>
            </div>
          )}

          {detectedRoll && (
            <div className="damage-hero">
              <span className="damage-hero-icon">
                <Dices size={22} />
              </span>
              <span className="stack-xs grow">
                <span className="t-label">Rolagem ao lançar</span>
                <span className="damage-hero-dice t-mono">{detectedRoll.label}</span>
              </span>
            </div>
          )}

          <section className="stack-sm">
            <span className="eyebrow">Aprimoramentos</span>
            {!spell.upgrades || spell.upgrades.length === 0 ? (
              <p className="t-sm t-3">Esta magia não possui aprimoramentos.</p>
            ) : (
              <div className="list">
                {spell.upgrades.map((upg, idx) => {
                  const count = selectedUpgrades[idx] || 0;
                  const desc = (upg.description || '').toLowerCase();
                  const isScalable = desc.includes('para cada') || desc.includes('aumenta o dano');
                  return (
                    <div key={idx} className={`row upgrade-row${count > 0 ? ' is-selected' : ''}`}>
                      <div className="row-main">
                        <span className="badge badge-mp t-mono" style={{ alignSelf: 'flex-start' }}>
                          {upg.cost}
                        </span>
                        <span className="t-sm t-2" style={{ lineHeight: 1.5 }}>
                          {upg.description}
                        </span>
                      </div>
                      {isScalable ? (
                        <NumberStepper value={count} onChange={(v) => setUpgrade(idx, v)} min={0} max={20} ariaLabel={`aprimoramento ${idx + 1}`} />
                      ) : (
                        <Switch checked={count > 0} onChange={(on) => setUpgrade(idx, on ? 1 : 0)} ariaLabel={`Aplicar aprimoramento ${upg.cost}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="stack-sm">
            <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setShowManual((v) => !v)} aria-expanded={showManual}>
              <ChevronDown size={16} style={{ transform: showManual ? 'rotate(180deg)' : undefined, transition: 'transform 200ms' }} />
              Ajustes manuais (itens, poderes)
            </button>
            {showManual && (
              <div className="grid-2 animate-in">
                <div className="field">
                  <span className="field-label">Custo em PM</span>
                  <NumberStepper value={customCostModifier} onChange={setCustomCostModifier} min={-10} max={10} format={formatSigned} ariaLabel="modificador de custo" />
                </div>
                <div className="field">
                  <span className="field-label">CD</span>
                  <NumberStepper value={customDcModifier} onChange={setCustomDcModifier} min={-10} max={10} format={formatSigned} ariaLabel="modificador de CD" />
                </div>
              </div>
            )}
          </section>

          <details className="spell-text">
            <summary>Texto completo da magia</summary>
            <p className="t-sm t-2 pre-line" style={{ lineHeight: 1.6 }}>
              {cleanT20Text(spell.description)}
            </p>
          </details>
        </div>
      </Sheet>

      {calc && (
        <CalcSheet
          open={!!calc}
          onClose={() => setCalc(null)}
          label={calc === 'dc' ? 'CD de resistência' : 'Limite de PM por magia'}
          breakdown={calc === 'dc' ? saveDc : maxPm.breakdown}
          unit={calc === 'limit' ? 'PM' : ''}
        />
      )}
    </>
  );
};
