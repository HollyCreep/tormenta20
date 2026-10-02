import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Backpack, Coins, Info, MoreVertical, Plus, ShoppingBag, Trash2, Wrench } from 'lucide-react';
import { EQUIPMENT_LIST } from '../../data/equipment';
import type { EquipmentItem } from '../../types/rules';
import type { CharacterInventoryItem } from '../../types/character';
import { ORIGINS_LIST } from '../../data/origins';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { DetailModalData } from '../common/DetailModal';
import { getEquipmentDetailModalData } from '../../utils/equipmentDetail';
import { EmptyState, SearchField, Segmented, SelectField } from '../ui/controls';
import { MenuSheet } from '../ui/MenuSheet';
import { Sheet } from '../ui/Sheet';
import { useFeedback } from '../ui/Feedback';
import { categoryIcon } from '../sheet/tabs/InventoryTab';
import { parsePrice } from '../sheet/AddItemModal';
import { StepIntro } from './wizardUi';
import { percent } from '../../utils/displayNames';

const ItemModifierModal = lazy(() => import('../compendium/ItemModifierModal').then((m) => ({ default: m.ItemModifierModal })));

interface StepEquipmentProps {
  inventory: CharacterInventoryItem[];
  tibares?: number;
  maxSpaces: number;
  currentSpaces: number;
  classId?: string;
  originId?: string;
  onUpdateInventory: (items: CharacterInventoryItem[]) => void;
  onUpdateTibares: (t: number) => void;
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
  maxSpaces,
  currentSpaces,
  classId,
  originId,
  onUpdateInventory,
  onUpdateTibares,
  onOpenDetail,
}) => {
  const { toast } = useFeedback();
  const [tab, setTab] = useState<'loja' | 'mochila'>('loja');
  const [category, setCategory] = useState('todas');
  const [search, setSearch] = useState('');
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<CharacterInventoryItem | null>(null);
  const [forging, setForging] = useState<{ item: EquipmentItem; target?: CharacterInventoryItem } | null>(null);

  const origin = ORIGINS_LIST.find((o) => o.id === originId);

  // Dinheiro inicial (mantém a regra já usada pelo app)
  const money = useMemo(() => {
    const base = 14; // média de 4d6
    const notes: string[] = [];
    let bonus = 0;
    if (classId === 'nobre') {
      bonus += 100;
      notes.push('Nobre: herança abastada (+T$ 100)');
    } else if (classId === 'inventor') {
      bonus += 50;
      notes.push('Inventor: orçamento para protótipos (+T$ 50)');
    }
    if (originId === 'aristocrata') {
      bonus += 300;
      notes.push('Aristocrata: joia de família (+T$ 300)');
    } else if (originId === 'membro_guilda' || originId === 'mercador') {
      bonus += 100;
      notes.push('Capital de comércio (+T$ 100)');
    } else if (originId === 'marujo') {
      bonus += 7;
      notes.push('Marujo: último soldo, média de 2d6 (+T$ 7)');
    } else if (originId === 'amnesico') {
      bonus += 50;
      notes.push('Amnésico: moedas misteriosas (+T$ 50)');
    } else if (originId === 'forasteiro' || originId === 'artesao') {
      bonus += 50;
      notes.push('Bens de ofício (+T$ 50)');
    }
    return { base, notes, total: base + bonus };
  }, [classId, originId]);

  const spent = inventory.reduce((sum, it) => (it.isFree ? sum : sum + parsePrice(it.price) * (it.quantity || 1)), 0);
  const remaining = Math.max(0, money.total - spent);

  useEffect(() => {
    onUpdateTibares(remaining);
  }, [remaining, onUpdateTibares]);

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
      <StepIntro title="Equipamento" description="Compre armas, armaduras e suprimentos com seus Tibares iniciais. Itens da origem são gratuitos." />

      <div className="grid-2">
        <button type="button" className="wallet-card" onClick={() => setMoneyOpen(true)}>
          <span className="stat-label">
            <Coins size={14} />
            Tibares
          </span>
          <span className="wallet-value t-num">
            <small>T$</small> {remaining.toLocaleString('pt-BR')}
          </span>
          <span className="t-xs t-3">de T$ {money.total} iniciais</span>
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

      {origin && origin.items.length > 0 && (
        <div className="callout callout-gold">
          <Backpack size={18} />
          <span>
            <strong>Da origem {origin.name}:</strong> {origin.items.join(', ')}.
          </span>
        </div>
      )}

      <Segmented<'loja' | 'mochila'>
        value={tab}
        onChange={setTab}
        ariaLabel="Loja ou mochila"
        size="lg"
        options={[
          { value: 'loja', label: 'Mercado', icon: <ShoppingBag size={16} /> },
          { value: 'mochila', label: 'Mochila', icon: <Backpack size={16} />, count: inventory.length },
        ]}
      />

      {tab === 'loja' ? (
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
                    <button type="button" className="pick-main" onClick={() => onOpenDetail(getEquipmentDetailModalData(eq))}>
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
            <span>Base (média de 4d6)</span>
            <span>T$ {money.base}</span>
            {money.notes.map((n) => (
              <React.Fragment key={n}>
                <span>{n.replace(/\s*\(\+T\$.*\)$/, '')}</span>
                <span>{n.match(/\+T\$ \d+/)?.[0]}</span>
              </React.Fragment>
            ))}
            <span className="t-bold t-1">Total inicial</span>
            <span className="t-bold">T$ {money.total}</span>
            <span>Gasto em compras</span>
            <span>−T$ {spent.toLocaleString('pt-BR')}</span>
            <span className="t-bold t-1">Restante</span>
            <span className="t-bold t-gold">T$ {remaining.toLocaleString('pt-BR')}</span>
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
            Regras de equipamento
          </button>
        </div>
      </Sheet>

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
