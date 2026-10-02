import { EQUIPMENT_LIST } from '../data/equipment';
import type { KitGroup, KitMoney, KitOption, KitSlot } from '../data/startingKit';
import type { CharacterInventoryItem } from '../types/character';

/** "T$ 1.500" → 1500 · "T$ 0,5" → 0 (mesmo critério da loja). */
export const priceValue = (price?: string): number => {
  const match = (price || '').replace(/\./g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const byId = (id?: string) => (id ? EQUIPMENT_LIST.find((e) => e.id === id) : undefined);

const isGear = (category: string) => category.startsWith('arma') || category.startsWith('armadura') || category === 'escudo';

/** Converte uma opção do kit em item da mochila (gratuito, marcado com o espaço de origem). */
export function kitItemFromOption(group: KitGroup, slot: KitSlot, option: KitOption): CharacterInventoryItem {
  const base = byId(option.equipmentId) || byId(option.statsFrom);
  const category = option.category && !option.statsFrom ? option.category : base?.category || option.category || 'item_geral';
  return {
    id: `kit_${slot.id}_${option.key}_${Math.random().toString(36).slice(2, 7)}`,
    kitSlot: slot.id,
    kitOption: option.key,
    equipmentId: base?.id,
    name: option.name || base?.name || option.key,
    category,
    subcategory: base?.subcategory,
    spaces: option.spaces ?? base?.spaces ?? 1,
    quantity: option.quantity ?? 1,
    isEquipped: isGear(category),
    damage: base?.damage,
    attackBonus: base?.attackBonus,
    critical: base?.critical,
    damageType: base?.damageType,
    range: base?.range,
    defenseBonus: base?.defenseBonus,
    armorPenalty: base?.armorPenalty,
    description: [option.note, base?.description].filter(Boolean).join(' '),
    // Itens próprios da origem que só "usam as estatísticas" de uma arma não têm o preço dela
    price: option.statsFrom ? undefined : base?.price,
    isFree: true,
    source: group.id === 'inicial' ? 'inicial' : 'origem',
  };
}

export const kitSlotsOf = (groups: KitGroup[]) => groups.flatMap((g) => g.slots.map((slot) => ({ group: g, slot })));

/** Valor já usado num espaço de orçamento (ex.: Amnésico, "somando até T$ 500"). */
export const budgetUsed = (inventory: CharacterInventoryItem[], slotId: string) =>
  inventory.filter((it) => it.kitSlot === slotId).reduce((sum, it) => sum + priceValue(it.price) * (it.quantity || 1), 0);

/**
 * Mantém a mochila coerente com o kit atual: remove itens de espaços que deixaram de
 * existir (troca de classe/origem) e, se `autoAddFixed`, adiciona os itens fixos que faltam.
 * Retorna `null` quando nada muda.
 */
export function reconcileKit(
  inventory: CharacterInventoryItem[],
  groups: KitGroup[],
  autoAddFixed: boolean
): CharacterInventoryItem[] | null {
  const slots = new Map(kitSlotsOf(groups).map((e) => [e.slot.id, e]));
  let changed = false;

  const kept = inventory.filter((it) => {
    if (!it.kitSlot) return true;
    const entry = slots.get(it.kitSlot);
    const ok = entry
      ? entry.slot.budget
        ? priceValue(it.price) <= entry.slot.budget.max
        : entry.slot.options.some((o) => o.key === it.kitOption)
      : false;
    if (!ok) changed = true;
    return ok;
  });

  if (autoAddFixed) {
    slots.forEach(({ group, slot }) => {
      if (slot.fixed && !kept.some((it) => it.kitSlot === slot.id)) {
        kept.push(kitItemFromOption(group, slot, slot.options[0]));
        changed = true;
      }
    });
  }
  return changed ? kept : null;
}

/** Espaços do kit que pedem uma escolha e ainda estão vazios. */
export const pendingKitSlots = (inventory: CharacterInventoryItem[], groups: KitGroup[]) =>
  kitSlotsOf(groups)
    .filter(({ slot }) => !slot.fixed && !inventory.some((it) => it.kitSlot === slot.id))
    .map(({ slot }) => slot.label);

export const averageRoll = (m: KitMoney) => Math.floor((m.count * (m.sides + 1)) / 2);

export function rollMoney(m: KitMoney): { total: number; dice: number[] } {
  const dice = Array.from({ length: m.count }, () => 1 + Math.floor(Math.random() * m.sides));
  return { total: dice.reduce((a, b) => a + b, 0), dice };
}
