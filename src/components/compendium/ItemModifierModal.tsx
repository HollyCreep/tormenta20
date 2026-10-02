import React, { useMemo, useState } from 'react';
import { AlertTriangle, Check, Coins, Flame, Gem, Lock, Shield, Sliders, Sparkles, Wrench } from 'lucide-react';
import type { EquipmentItem, ItemModifier } from '../../types/rules';
import {
  ENCHANTMENT_TIER_COSTS,
  IMPROVEMENT_TIER_COSTS,
  ITEM_MODIFIERS_LIST,
  calculateModifiedItem,
  canApplyModifier,
  getDependentModifierIds,
  removeModifierWithDependents,
  sanitizeModifiers,
} from '../../data/itemModifiers';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { Sheet } from '../ui/Sheet';
import { Segmented } from '../ui/controls';
import { useFeedback } from '../ui/Feedback';

interface ItemModifierModalProps {
  item: EquipmentItem;
  initialModifiers?: string[];
  initialMaterial?: string;
  characterTibares?: number;
  isOpen: boolean;
  onClose: () => void;
  onApply: (customizedItem: EquipmentItem, appliedModifierIds: string[], totalCost: number) => void;
  /**
   * Como cobrar:
   * • 'full'       — compra de um item novo já melhorado (preço total);
   * • 'difference' — melhorar item que o herói já possui: paga só a diferença (Cap. 3, pág. 167);
   * • 'none'       — simulação (compêndio), sem custo.
   */
  chargeMode?: 'full' | 'difference' | 'none';
}

type ForgeTab = 'melhorias' | 'materiais' | 'encantos' | 'valores';

const money = (n: number) => `T$ ${Math.round(n).toLocaleString('pt-BR')}`;

const priceOf = (price?: string) => parseFloat((price || '').replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.')) || 0;

/** Oficina: melhorias (Tab. 3-8), materiais especiais (Tab. 3-9) e encantos (Cap. 8). */
export const ItemModifierModal: React.FC<ItemModifierModalProps> = ({
  item,
  initialModifiers = [],
  characterTibares,
  isOpen,
  onClose,
  onApply,
  chargeMode = 'full',
}) => {
  const { toast } = useFeedback();
  const originalEquipment = EQUIPMENT_LIST.find((eq) => eq.id === item.id);
  const baseName = originalEquipment?.name || item.name;
  const basePrice = originalEquipment?.price || item.price;
  const baseSpaces = originalEquipment?.spaces !== undefined ? originalEquipment.spaces : item.spaces;
  const baseDamage = originalEquipment?.damage || item.damage || '';
  const baseCritical = originalEquipment?.critical || item.critical || '';
  const baseDefense = originalEquipment?.defenseBonus !== undefined ? originalEquipment.defenseBonus : item.defenseBonus || 0;
  const basePenalty = originalEquipment?.armorPenalty !== undefined ? originalEquipment.armorPenalty : item.armorPenalty || 0;
  const isArmorLike = item.category.startsWith('armadura') || item.category === 'escudo';
  const isWeapon = item.category.startsWith('arma');

  const [selectedModifiers, setSelectedModifiers] = useState<string[]>(sanitizeModifiers(initialModifiers));
  const [activeTab, setActiveTab] = useState<ForgeTab>('melhorias');
  const [customName, setCustomName] = useState(baseName);
  const [customPriceStr, setCustomPriceStr] = useState(basePrice);
  const [customSpaces, setCustomSpaces] = useState(baseSpaces);
  const [customDamage, setCustomDamage] = useState(baseDamage);
  const [customCritical, setCustomCritical] = useState(baseCritical);
  const [customDefense, setCustomDefense] = useState(baseDefense);
  const [customPenalty, setCustomPenalty] = useState(basePenalty);
  const [customDescription, setCustomDescription] = useState(item.description || originalEquipment?.description || '');

  const baseItemWithEdits: EquipmentItem = {
    ...item,
    name: customName,
    price: customPriceStr,
    spaces: customSpaces,
    damage: customDamage || undefined,
    critical: customCritical || undefined,
    defenseBonus: isArmorLike ? customDefense : undefined,
    armorPenalty: isArmorLike ? customPenalty : undefined,
    description: customDescription,
  };

  const calculated = calculateModifiedItem(baseItemWithEdits, selectedModifiers);

  // Preço já pago pelas modificações atuais (para cobrar só a diferença)
  const previousTotal = useMemo(
    () => calculateModifiedItem({ ...item, price: basePrice }, sanitizeModifiers(initialModifiers)).totalPrice,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const costToPay =
    chargeMode === 'none' ? 0 : chargeMode === 'difference' ? Math.max(0, calculated.totalPrice - previousTotal) : calculated.totalPrice;
  const canAfford = chargeMode === 'none' || characterTibares === undefined || characterTibares >= costToPay;

  const previewItem: EquipmentItem = {
    ...baseItemWithEdits,
    name: calculated.name,
    price: calculated.totalPriceStr,
    defenseBonus: calculated.defenseBonus,
    armorPenalty: calculated.armorPenalty,
    spaces: calculated.spaces,
    damage: calculated.damage || baseItemWithEdits.damage,
    attackBonus: calculated.attackBonus > 0 ? calculated.attackBonus : undefined,
    critical: calculated.criticalStr || baseItemWithEdits.critical,
    description: baseItemWithEdits.description,
  };

  const byType = (type: ItemModifier['type']) => ITEM_MODIFIERS_LIST.filter((m) => m.type === type);
  const countOf = (pred: (m: ItemModifier) => boolean) =>
    selectedModifiers.filter((id) => {
      const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
      return m ? pred(m) : false;
    }).length;

  const improvementsCount = countOf((m) => m.type === 'melhoria' || m.type === 'material_especial');
  const enchantmentsCount = countOf((m) => m.type === 'encanto');
  const hasSpecialMaterial = countOf((m) => m.type === 'material_especial') > 0;

  const handleToggle = (modId: string) => {
    if (selectedModifiers.includes(modId)) {
      // Cascata: remover um modificador remove os que dependem dele (ex.: Cruel → Atroz)
      setSelectedModifiers(removeModifierWithDependents(modId, selectedModifiers));
      return;
    }
    const mod = ITEM_MODIFIERS_LIST.find((m) => m.id === modId);
    if (!mod) return;
    const check = canApplyModifier(baseItemWithEdits, mod, selectedModifiers);
    if (check.allowed) setSelectedModifiers([...selectedModifiers, modId]);
    else toast(check.reason || 'Este modificador não pode ser aplicado.', { tone: 'warning' });
  };

  const renderModifierList = (list: ItemModifier[]) => (
    <div className="list">
      {list.map((mod) => {
        const isSelected = selectedModifiers.includes(mod.id);
        const check = canApplyModifier(baseItemWithEdits, mod, selectedModifiers);
        const isAllowed = isSelected || check.allowed;
        const dependents = getDependentModifierIds(mod.id).filter((d) => selectedModifiers.includes(d));
        const extraPrice =
          mod.priceByItemType && isWeapon
            ? mod.priceByItemType.arma
            : mod.priceByItemType && item.category === 'escudo'
              ? mod.priceByItemType.escudo
              : mod.priceByItemType && item.category === 'armadura_leve'
                ? mod.priceByItemType.armadura_leve
                : mod.priceByItemType && item.category === 'armadura_pesada'
                  ? mod.priceByItemType.armadura_pesada
                  : mod.additionalPrice;
        return (
          <button
            key={mod.id}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            className={`row forge-row${isSelected ? ' is-selected' : ''}${!isAllowed ? ' is-disabled' : ''}`}
            onClick={() => (isAllowed ? handleToggle(mod.id) : toast(check.reason || 'Indisponível para este item.', { tone: 'warning' }))}
          >
            <span className={`mark${isSelected ? ' is-on' : ''}${!isAllowed ? ' mark-locked' : ''}`}>
              {isSelected ? <Check size={14} strokeWidth={3} /> : !isAllowed ? <Lock size={12} /> : null}
            </span>
            <span className="row-main">
              <span className="row-title hstack-xs wrap">
                {mod.name}
                {!!extraPrice && <span className="badge badge-gold">+{money(extraPrice)}</span>}
              </span>
              <span className="row-sub">{mod.description}</span>
              {mod.requirementText && !isSelected && (
                <span className={`t-xs ${check.allowed ? 't-success' : 't-warning'}`}>
                  {mod.requirementText}
                  {check.allowed ? ' ✓' : ''}
                </span>
              )}
              {!isAllowed && check.reason && <span className="t-xs t-danger">{check.reason}</span>}
              {isSelected && dependents.length > 0 && (
                <span className="t-xs t-warning">Remover também tira: {dependents.join(', ')}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );

  const primaryLabel =
    chargeMode === 'none'
      ? 'Concluir simulação'
      : costToPay > 0
        ? `Forjar · ${money(costToPay)}`
        : 'Salvar alterações';

  return (
    <Sheet
      open={isOpen}
      onClose={onClose}
      title="Oficina"
      subtitle={baseName}
      icon={<Wrench size={22} />}
      size="xl"
      full
      toolbar={
        <Segmented<ForgeTab>
          value={activeTab}
          onChange={setActiveTab}
          ariaLabel="Seção da oficina"
          options={[
            { value: 'melhorias', label: `Melhorias ${improvementsCount}/4`, icon: <Sparkles size={15} /> },
            { value: 'materiais', label: hasSpecialMaterial ? 'Material ✓' : 'Material', icon: <Gem size={15} /> },
            { value: 'encantos', label: `Encantos ${enchantmentsCount}/3`, icon: <Flame size={15} /> },
            { value: 'valores', label: 'Ajustes', icon: <Sliders size={15} /> },
          ]}
        />
      }
      footer={
        <div className="forge-footer">
          <div className="forge-cost">
            <span className="stack-xs">
              <span className="t-label">{chargeMode === 'difference' ? 'Custo da forja' : chargeMode === 'none' ? 'Preço final' : 'Preço total'}</span>
              <span className="forge-cost-value t-num">{money(chargeMode === 'none' ? calculated.totalPrice : costToPay)}</span>
            </span>
            {characterTibares !== undefined && chargeMode !== 'none' && (
              <span className={`t-xs ${canAfford ? 't-success' : 't-danger'} hstack-xs`}>
                <Coins size={13} />
                Você tem {money(characterTibares)}
              </span>
            )}
          </div>
          <div className="hstack">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary grow"
              disabled={!canAfford}
              onClick={() => {
                onApply(previewItem, selectedModifiers, costToPay);
                onClose();
              }}
            >
              <Check size={18} />
              {canAfford ? primaryLabel : 'Tibares insuficientes'}
            </button>
          </div>
        </div>
      }
    >
      <div className="forge-layout">
        {/* Prévia ao vivo */}
        <aside className="card card-accent forge-preview">
          <span className="eyebrow">Resultado</span>
          <span className="forge-preview-name">{calculated.name}</span>
          <div className="forge-stats">
            {isWeapon && (
              <>
                <span className="forge-stat">
                  <span className="kv-key">Ataque</span>
                  <span className="kv-value">{calculated.attackBonus > 0 ? `+${calculated.attackBonus}` : '—'}</span>
                </span>
                <span className="forge-stat">
                  <span className="kv-key">Dano</span>
                  <span className="kv-value t-mono">{previewItem.damage || '—'}</span>
                </span>
                <span className="forge-stat">
                  <span className="kv-key">Crítico</span>
                  <span className="kv-value t-mono">{previewItem.critical || 'x2'}</span>
                </span>
              </>
            )}
            {isArmorLike && (
              <>
                <span className="forge-stat">
                  <span className="kv-key">Defesa</span>
                  <span className="kv-value">+{calculated.defenseBonus}</span>
                </span>
                <span className="forge-stat">
                  <span className="kv-key">Penalidade</span>
                  <span className="kv-value">{calculated.armorPenalty}</span>
                </span>
              </>
            )}
            <span className="forge-stat">
              <span className="kv-key">Espaços</span>
              <span className="kv-value">{calculated.spaces}</span>
            </span>
          </div>
          {calculated.additionalEffects.length > 0 && (
            <ul className="forge-effects">
              {calculated.additionalEffects.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
          <div className="divider" />
          <div className="forge-breakdown">
            <span>Item base</span>
            <span>{money(priceOf(baseItemWithEdits.price))}</span>
            {improvementsCount > 0 && (
              <>
                <span>Melhorias ({improvementsCount}) · Tab. 3-7</span>
                <span>+{money(IMPROVEMENT_TIER_COSTS[improvementsCount] || 0)}</span>
              </>
            )}
            {enchantmentsCount > 0 && (
              <>
                <span>Encantos ({enchantmentsCount}) · Tab. 8-7</span>
                <span>+{money(ENCHANTMENT_TIER_COSTS[enchantmentsCount] || 0)}</span>
              </>
            )}
            <span className="t-bold t-1">Preço final</span>
            <span className="t-bold t-gold">{calculated.totalPriceStr}</span>
            {chargeMode === 'difference' && (
              <>
                <span>Já pago (modificações atuais)</span>
                <span>−{money(previousTotal)}</span>
              </>
            )}
          </div>
          {chargeMode === 'difference' && (
            <p className="t-xs t-3">Para melhorar um item que você já tem, paga-se a diferença (Cap. 3, pág. 167).</p>
          )}
        </aside>

        <div className="stack">
          {activeTab === 'melhorias' && (
            <>
              <div className="callout">
                <Shield size={18} />
                <span>Até 4 melhorias por item, cada uma uma única vez. Pré-requisitos são removidos em cascata (Tab. 3-8, pág. 165).</span>
              </div>
              {renderModifierList(byType('melhoria'))}
            </>
          )}
          {activeTab === 'materiais' && (
            <>
              <div className="callout callout-gold">
                <Gem size={18} />
                <span>Material especial ocupa uma das 4 melhorias e soma preço próprio (Tab. 3-9, pág. 166).</span>
              </div>
              {renderModifierList(byType('material_especial'))}
            </>
          )}
          {activeTab === 'encantos' && (
            <>
              <div className="callout callout-accent">
                <Flame size={18} />
                <span>Até 3 encantos mágicos, com custo por patamar (Cap. 8, págs. 340–344).</span>
              </div>
              {renderModifierList(byType('encanto'))}
            </>
          )}
          {activeTab === 'valores' && (
            <div className="stack">
              <div className="callout callout-warning">
                <AlertTriangle size={18} />
                <span>Ajustes manuais saem das regras do livro — use para itens da campanha combinados com o mestre.</span>
              </div>
              <label className="field">
                <span className="field-label">Nome</span>
                <input value={customName} onChange={(e) => setCustomName(e.target.value)} />
              </label>
              <div className="grid-2">
                <label className="field">
                  <span className="field-label">Preço base</span>
                  <input value={customPriceStr} onChange={(e) => setCustomPriceStr(e.target.value)} />
                </label>
                <label className="field">
                  <span className="field-label">Espaços</span>
                  <input type="number" inputMode="numeric" min={0} value={customSpaces} onChange={(e) => setCustomSpaces(parseInt(e.target.value, 10) || 0)} />
                </label>
              </div>
              {isWeapon && (
                <div className="grid-2">
                  <label className="field">
                    <span className="field-label">Dano</span>
                    <input value={customDamage} onChange={(e) => setCustomDamage(e.target.value)} placeholder="1d8" />
                  </label>
                  <label className="field">
                    <span className="field-label">Crítico</span>
                    <input value={customCritical} onChange={(e) => setCustomCritical(e.target.value)} placeholder="19/x2" />
                  </label>
                </div>
              )}
              {isArmorLike && (
                <div className="grid-2">
                  <label className="field">
                    <span className="field-label">Bônus na Defesa</span>
                    <input type="number" inputMode="numeric" value={customDefense} onChange={(e) => setCustomDefense(parseInt(e.target.value, 10) || 0)} />
                  </label>
                  <label className="field">
                    <span className="field-label">Penalidade</span>
                    <input type="number" inputMode="numeric" value={customPenalty} onChange={(e) => setCustomPenalty(parseInt(e.target.value, 10) || 0)} />
                  </label>
                </div>
              )}
              <label className="field">
                <span className="field-label">Descrição</span>
                <textarea rows={4} value={customDescription} onChange={(e) => setCustomDescription(e.target.value)} />
              </label>
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
};
