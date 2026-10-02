import React, { lazy, Suspense, useMemo, useState } from 'react';
import { Backpack, Check, ChevronRight, Coins, Dices, Gift, Info, MoreVertical, Plus, ShoppingBag, Trash2, Wrench } from 'lucide-react';
import { EQUIPMENT_LIST } from '../../data/equipment';
import type { EquipmentItem } from '../../types/rules';
import type { CharacterInventoryItem } from '../../types/character';
import type { KitGroup, KitMoney, KitSlot } from '../../data/startingKit';
import { budgetUsed, kitItemFromOption, priceValue, rollMoney } from '../../utils/startingKitUtils';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { DetailModalData } from '../common/DetailModal';
import { getEquipmentDetailModalData } from '../../utils/equipmentDetail';
import { EmptyState, SearchField, Segmented, SelectField } from '../ui/controls';
import { MenuSheet } from '../ui/MenuSheet';
import { Sheet } from '../ui/Sheet';
import { useFeedback } from '../ui/Feedback';
import { categoryIcon } from '../sheet/tabs/InventoryTab';
import { parsePrice } from '../sheet/AddItemModal';
import { OptionPickerSheet, StepIntro, type PickerOption } from './wizardUi';
import { percent } from '../../utils/displayNames';

const ItemModifierModal = lazy(() => import('../compendium/ItemModifierModal').then((m) => ({ default: m.ItemModifierModal })));

interface StepEquipmentProps {
  inventory: CharacterInventoryItem[];
  /** Tibares restantes (dinheiro inicial − compras). */
  tibares: number;
  startingMoney: number;
  moneySources: (KitMoney & { value: number })[];
  kitGroups: KitGroup[];
  maxSpaces: number;
  currentSpaces: number;
  onUpdateInventory: (items: CharacterInventoryItem[]) => void;
  onSetMoney: (label: string, value: number) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

const CATEGORIES = [
  { value: 'todas', label: 'Todas' },
  { value: 'armas', label: 'Armas' },
  { value: 'armaduras', label: 'Armaduras' },
  { value: 'escudos', label: 'Escudos' },
  { value: 'esotericos', label: 'Esotéricos' },
  { value: 'alquimia', label: 'Alquimia' },
  { value: 'itens', label: 'Itens gerais' },
  { value: 'outros', label: 'Ferramentas e outros' },
];

const isModifiable = (cat: string) => cat.startsWith('arma') || cat === 'escudo' || cat === 'esoterico';
const toInventoryItem = (eq: EquipmentItem, extra: Partial<CharacterInventoryItem> = {}): CharacterInventoryItem => ({
  id: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
  equipmentId: eq.id,
  name: eq.name,
  category: eq.category,
  subcategory: eq.subcategory,
  spaces: eq.spaces,
  quantity: 1,
  isEquipped: eq.category.startsWith('arma') || eq.category === 'escudo',
  damage: eq.damage,
  attackBonus: eq.attackBonus,
  critical: eq.critical,
  damageType: eq.damageType,
  range: eq.range,
  defenseBonus: eq.defenseBonus,
  armorPenalty: eq.armorPenalty,
  description: eq.description,
  price: eq.price,
  isFree: false,
  source: 'compra',
  ...extra,
});

export const StepEquipment: React.FC<StepEquipmentProps> = ({
  inventory,
  tibares,
  startingMoney,
  moneySources,
  kitGroups,
  maxSpaces,
  currentSpaces,
  onUpdateInventory,
  onSetMoney,
  onOpenDetail,
}) => {
  const { toast } = useFeedback();
  const [tab, setTab] = useState<'kit' | 'loja' | 'mochila'>('kit');
  const [category, setCategory] = useState('todas');
  const [search, setSearch] = useState('');
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<CharacterInventoryItem | null>(null);
  const [forging, setForging] = useState<{ item: EquipmentItem; target?: CharacterInventoryItem } | null>(null);
  const [kitPicker, setKitPicker] = useState<{ group: KitGroup; slot: KitSlot } | null>(null);

  const remaining = tibares;
  const spent = startingMoney - tibares;

  const kitItems = (slotId: string) => inventory.filter((it) => it.kitSlot === slotId);
  const kitPending = kitGroups.flatMap((g) => g.slots).filter((sl) => !sl.fixed && kitItems(sl.id).length === 0).length;

  const roll = (m: KitMoney) => {
    const r = rollMoney(m);
    onSetMoney(m.label, r.total);
    toast(`${m.label}: ${m.count}d${m.sides} = ${r.dice.join(' + ')} = T$ ${r.total}`, { tone: 'info', duration: 3500 });
  };

  /** Opções do seletor do espaço atual (orçamento: itens do catálogo até o valor restante). */
  const kitPickerOptions: PickerOption[] = useMemo(() => {
    if (!kitPicker) return [];
    const { slot } = kitPicker;
    const budget = slot.budget;
    if (budget) {
      const used = budget.multiple ? budgetUsed(inventory, slot.id) : 0;
      return EQUIPMENT_LIST.filter((e) => priceValue(e.price) <= budget.max)
        .sort((a, b) => priceValue(b.price) - priceValue(a.price))
        .map((e) => {
        const chosen = inventory.some((it) => it.kitSlot === slot.id && it.kitOption === e.id);
        return {
          id: e.id,
          title: e.name,
          subtitle: `${e.price} · ${e.spaces} esp.`,
          leading: <span className="inv-icon">{categoryIcon(e.category)}</span>,
          disabled: !chosen && used + priceValue(e.price) > budget.max,
          disabledReason: `Passa do limite de T$ ${budget.max}`,
        };
      });
    }
    return slot.options.map((o) => {
      const base = EQUIPMENT_LIST.find((e) => e.id === (o.equipmentId || o.statsFrom));
      const stats = [
        base?.damage && base.damage !== '-' ? `${base.damage}${base.critical ? ` · ${base.critical}` : ''}` : '',
        base?.defenseBonus ? `Defesa +${base.defenseBonus}` : '',
        o.note || '',
      ];
      return {
        id: o.key,
        title: o.name,
        subtitle: stats.filter(Boolean).join(' · '),
        leading: <span className="inv-icon">{categoryIcon(o.category || base?.category || 'item_geral')}</span>,
      };
    });
  }, [kitPicker, inventory]);

  const chooseKit = (keys: string[]) => {
    if (!kitPicker) return;
    const { group, slot } = kitPicker;
    const others = inventory.filter((it) => it.kitSlot !== slot.id);
    const options = slot.budget
      ? keys.map((k) => ({ key: k, name: EQUIPMENT_LIST.find((e) => e.id === k)?.name || k, equipmentId: k }))
      : slot.options.filter((o) => keys.includes(o.key));
    onUpdateInventory([...others, ...options.map((o) => kitItemFromOption(group, slot, o))]);
  };

  const shop = EQUIPMENT_LIST.filter((eq) => {
    const c = eq.category;
    const okCat =
      category === 'todas' ||
      (category === 'armas' && c.startsWith('arma')) ||
      (category === 'armaduras' && c.startsWith('armadura')) ||
      (category === 'escudos' && c === 'escudo') ||
      (category === 'esotericos' && c === 'esoterico') ||
      (category === 'alquimia' && c === 'alquimia') ||
      (category === 'itens' && c === 'item_geral') ||
      (category === 'outros' && ['ferramenta', 'vestuario', 'alimentacao', 'animal', 'veiculo', 'servico'].includes(c));
    const q = search.trim().toLowerCase();
    return okCat && (!q || eq.name.toLowerCase().includes(q) || (eq.description || '').toLowerCase().includes(q));
  });

  const buy = (eq: EquipmentItem) => {
    const cost = parsePrice(eq.price);
    if (remaining < cost) {
      toast(`Faltam T$ ${cost - remaining} para ${eq.name}.`, { tone: 'warning' });
      return;
    }
    onUpdateInventory([...inventory, toInventoryItem(eq)]);
    toast(`${eq.name} na mochila · T$ ${remaining - cost} restantes`, { tone: 'success', duration: 2200 });
  };

  const toggleEquip = (id: string) => {
    const target = inventory.find((t) => t.id === id);
    onUpdateInventory(
      inventory.map((it) => {
        if (it.id === id) return { ...it, isEquipped: !it.isEquipped };
        // Apenas uma armadura vestida por vez
        if (target?.category.startsWith('armadura') && it.category.startsWith('armadura')) return { ...it, isEquipped: false };
        return it;
      })
    );
  };

  const saveForge = (customized: EquipmentItem, modIds: string[], totalCost: number) => {
    if (!forging) return;
    if (!forging.target) {
      if (remaining < totalCost) {
        toast('Tibares insuficientes para este item superior.', { tone: 'warning' });
        return;
      }
      onUpdateInventory([
        ...inventory,
        toInventoryItem(customized, { appliedModifiers: modIds, isEquipped: true, price: customized.price, equipmentId: forging.item.id }),
      ]);
    } else {
      onUpdateInventory(
        inventory.map((it) =>
          it.id === forging.target!.id
            ? {
                ...it,
                name: customized.name,
                price: customized.price,
                spaces: customized.spaces,
                defenseBonus: customized.defenseBonus,
                armorPenalty: customized.armorPenalty,
                damage: customized.damage,
                attackBonus: customized.attackBonus,
                critical: customized.critical,
                appliedModifiers: modIds,
                isFree: false,
              }
            : it
        )
      );
    }
    setForging(null);
  };

  const overloaded = currentSpaces > maxSpaces;

  return (
    <div className="stack-lg">
      <StepIntro
        title="Equipamento"
        description="Escolha seu kit inicial e os itens da origem (gratuitos) e gaste seus T$ 4d6 no mercado."
      />

      <div className="grid-2">
        <button type="button" className="wallet-card" onClick={() => setMoneyOpen(true)}>
          <span className="stat-label">
            <Coins size={14} />
            Tibares
          </span>
          <span className="wallet-value t-num">
            <small>T$</small> {remaining.toLocaleString('pt-BR')}
          </span>
          <span className="t-xs t-3">de T$ {startingMoney} iniciais</span>
        </button>
        <div className={`load-card${overloaded ? ' is-danger' : ''}`}>
          <span className="stat-label">
            <Backpack size={14} />
            Carga
          </span>
          <span className="wallet-value t-num">
            {currentSpaces}
            <small> / {maxSpaces}</small>
          </span>
          <span className={`meter meter-sm ${overloaded ? 'meter-danger' : 'meter-gold'}`} style={{ '--pct': percent(currentSpaces, maxSpaces) } as React.CSSProperties}>
            <span className="meter-fill" />
          </span>
        </div>
      </div>

      <Segmented<'kit' | 'loja' | 'mochila'>
        value={tab}
        onChange={setTab}
        ariaLabel="Kit inicial, mercado ou mochila"
        size="lg"
        options={[
          { value: 'kit', label: 'Inicial', icon: <Gift size={16} />, count: kitPending || undefined },
          { value: 'loja', label: 'Mercado', icon: <ShoppingBag size={16} /> },
          { value: 'mochila', label: 'Mochila', icon: <Backpack size={16} />, count: inventory.length },
        ]}
      />

      {tab === 'kit' ? (
        <div className="stack-lg">
          {kitGroups.map((group) => (
            <section key={group.id} className="stack">
              <div className="section-head">
                <h4 className="choice-section-title grow">{group.title}</h4>
                <span className="t-xs t-3">{group.citation}</span>
              </div>
              <div className="list">
                {group.slots.map((slot) => {
                  const items = kitItems(slot.id);
                  const filled = items.length > 0;
                  const used = slot.budget ? budgetUsed(inventory, slot.id) : 0;
                  if (slot.fixed) {
                    return (
                      <div key={slot.id} className={`row pick-row${filled ? ' is-selected' : ''}`}>
                        <span className="pick-main">
                          <span className={`mark${filled ? ' is-on' : ''}`}>{filled && <Check size={14} strokeWidth={3} />}</span>
                          <span className="row-main">
                            <span className="row-title">{slot.label}</span>
                            <span className="row-sub">{slot.options[0].note || (filled ? 'Na mochila' : 'Fora da mochila')}</span>
                          </span>
                        </span>
                        {!filled && (
                          <button
                            type="button"
                            className="btn btn-tonal btn-xs"
                            onClick={() => onUpdateInventory([...inventory, kitItemFromOption(group, slot, slot.options[0])])}
                          >
                            Adicionar
                          </button>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={slot.id} className={`row pick-row${filled ? ' is-selected' : ''}`}>
                      <button type="button" className="pick-main" onClick={() => setKitPicker({ group, slot })}>
                        <span className={`mark${filled ? ' is-on' : ''}`}>{filled && <Check size={14} strokeWidth={3} />}</span>
                        <span className="row-main">
                          <span className="row-title">{slot.label}</span>
                          <span className={`row-sub${filled ? '' : ' t-warning'}`}>
                            {filled ? items.map((it) => it.name).join(', ') : 'Toque para escolher'}
                            {slot.budget && filled ? ` · T$ ${used} de ${slot.budget.max}` : ''}
                          </span>
                        </span>
                        <ChevronRight size={18} className="t-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : tab === 'loja' ? (
        <>
          <div className="filter-row">
            <SearchField value={search} onChange={setSearch} placeholder="Buscar item…" />
            <SelectField value={category} onChange={setCategory} ariaLabel="Categoria" options={CATEGORIES} />
          </div>
          {shop.length === 0 ? (
            <EmptyState title="Nenhum item encontrado" />
          ) : (
            <div className="list">
              {shop.map((eq) => {
                const affordable = parsePrice(eq.price) <= remaining;
                return (
                  <div key={eq.id} className="row pick-row">
                    <button type="button" className="pick-main has-detail" onClick={() => onOpenDetail(getEquipmentDetailModalData(eq))}>
                      <span className="inv-icon">{categoryIcon(eq.category)}</span>
                      <span className="row-main">
                        <span className="row-title">{eq.name}</span>
                        <span className="row-sub truncate">
                          {eq.damage && eq.damage !== '-' ? `${eq.damage} · ` : ''}
                          {eq.defenseBonus ? `Def +${eq.defenseBonus} · ` : ''}
                          {eq.spaces} esp. · <span className={affordable ? 't-gold' : 't-danger'}>{eq.price}</span>
                        </span>
                      </span>
                    </button>
                    {isModifiable(eq.category) && (
                      <button type="button" className="icon-btn icon-btn-sm" onClick={() => setForging({ item: eq })} aria-label={`Comprar ${eq.name} com melhorias`}>
                        <Wrench size={17} />
                      </button>
                    )}
                    <button type="button" className="icon-btn icon-btn-sm icon-btn-tonal" onClick={() => buy(eq)} aria-label={`Comprar ${eq.name}`} disabled={!affordable}>
                      <Plus size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : inventory.length === 0 ? (
        <EmptyState
          icon={<Backpack size={24} />}
          title="Mochila vazia"
          action={
            <button type="button" className="btn btn-secondary" onClick={() => setTab('loja')}>
              Ir ao mercado
            </button>
          }
        />
      ) : (
        <div className="list">
          {inventory.map((it) => (
            <div key={it.id} className={`row inv-row${it.isEquipped ? ' is-equipped' : ''}`}>
              <button type="button" className="inv-main" onClick={() => onOpenDetail(getEquipmentDetailModalData(it as unknown as EquipmentItem, it.isFree ? 'Gratuito' : undefined, it.appliedModifiers))}>
                <span className="inv-icon">{categoryIcon(it.category)}</span>
                <span className="row-main">
                  <span className="row-title">{it.name}</span>
                  <span className="row-sub">
                    {it.spaces} esp. · {it.isFree ? 'gratuito' : it.price}
                    {it.appliedModifiers?.length ? ` · ${it.appliedModifiers.length} melhoria(s)` : ''}
                  </span>
                </span>
              </button>
              {(it.category.startsWith('arma') || it.category.startsWith('armadura') || it.category === 'escudo') && (
                <button type="button" className={`chip chip-sm${it.isEquipped ? ' is-active' : ''}`} aria-pressed={it.isEquipped} onClick={() => toggleEquip(it.id)}>
                  {it.isEquipped ? 'Equipado' : 'Equipar'}
                </button>
              )}
              <button type="button" className="icon-btn icon-btn-sm" onClick={() => setMenuFor(it)} aria-label={`Ações de ${it.name}`}>
                <MoreVertical size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <MenuSheet
        open={!!menuFor}
        onClose={() => setMenuFor(null)}
        title={menuFor?.name}
        items={
          menuFor
            ? [
                {
                  id: 'detail',
                  label: 'Detalhes',
                  icon: <Info size={20} />,
                  onSelect: () => onOpenDetail(getEquipmentDetailModalData(menuFor as unknown as EquipmentItem, undefined, menuFor.appliedModifiers)),
                },
                {
                  id: 'forge',
                  label: 'Oficina',
                  icon: <Wrench size={20} />,
                  hidden: !isModifiable(menuFor.category),
                  onSelect: () => {
                    const base = EQUIPMENT_LIST.find((e) => e.id === menuFor.equipmentId);
                    if (base) setForging({ item: base, target: menuFor });
                  },
                },
                {
                  id: 'remove',
                  label: menuFor.isFree ? 'Remover' : 'Devolver (reembolsa)',
                  icon: <Trash2 size={20} />,
                  danger: true,
                  onSelect: () => onUpdateInventory(inventory.filter((x) => x.id !== menuFor.id)),
                },
              ]
            : []
        }
      />

      <Sheet open={moneyOpen} onClose={() => setMoneyOpen(false)} title="Dinheiro inicial" icon={<Coins size={22} />} size="sm">
        <div className="stack">
          <div className="forge-breakdown">
            {moneySources.map((m) => (
              <React.Fragment key={m.label}>
                <span>
                  {m.label} ({m.count}d{m.sides})
                </span>
                <span>T$ {m.value}</span>
              </React.Fragment>
            ))}
            <span className="t-bold t-1">Total inicial</span>
            <span className="t-bold">T$ {startingMoney}</span>
            <span>Gasto em compras</span>
            <span>−T$ {spent.toLocaleString('pt-BR')}</span>
            <span className="t-bold t-1">Restante</span>
            <span className="t-bold t-gold">T$ {remaining.toLocaleString('pt-BR')}</span>
          </div>
          <div className="stack-xs">
            {moneySources.map((m) => (
              <button key={m.label} type="button" className="btn btn-secondary" onClick={() => roll(m)}>
                <Dices size={18} />
                Rolar {m.count}d{m.sides} · {m.label}
              </button>
            ))}
            <span className="t-xs t-3">Começa com a média; role se a mesa preferir o sorteio (Cap. 3, pág. 140).</span>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() =>
              onOpenDetail({
                title: RULES_CITATIONS.EQUIPMENT_RULES.title,
                category: 'Regra oficial',
                description: RULES_CITATIONS.EQUIPMENT_RULES.explanation,
                ruleCitation: RULES_CITATIONS.EQUIPMENT_RULES,
                initialTab: 'rules',
              })
            }
          >
            <Info size={14} />
            Regras de equipamento
          </button>
        </div>
      </Sheet>

      <OptionPickerSheet
        open={!!kitPicker}
        onClose={() => setKitPicker(null)}
        title={kitPicker?.slot.label || ''}
        subtitle={kitPicker ? `${kitPicker.group.title} · gratuito` : undefined}
        options={kitPickerOptions}
        value={kitPicker ? kitItems(kitPicker.slot.id).map((it) => it.kitOption || '') : []}
        onChange={chooseKit}
        multiple={!!kitPicker?.slot.budget?.multiple}
        searchPlaceholder="Buscar item…"
      />

      <Suspense fallback={null}>
        {forging && (
          <ItemModifierModal
            key={forging.target?.id || forging.item.id}
            item={forging.item}
            initialModifiers={forging.target?.appliedModifiers || []}
            characterTibares={remaining + (forging.target && !forging.target.isFree ? parsePrice(forging.target.price) : 0)}
            isOpen={!!forging}
            chargeMode="full"
            onClose={() => setForging(null)}
            onApply={saveForge}
          />
        )}
      </Suspense>
    </div>
  );
};
