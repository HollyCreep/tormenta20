import React, { useMemo, useState } from 'react';
import { Check, Coins, PackagePlus } from 'lucide-react';
import type { CharacterInventoryItem, CharacterSheet } from '../../types/character';
import type { EquipmentItem } from '../../types/rules';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { recalculateFullCharacterSheet } from '../../utils/rulesEngine';
import { Sheet } from '../ui/Sheet';
import { EmptyState, NumberStepper, SearchField, Segmented, SelectField } from '../ui/controls';
import { useFeedback } from '../ui/Feedback';
import { categoryIcon } from './tabs/InventoryTab';

interface AddItemModalProps {
  character: CharacterSheet;
  isOpen: boolean;
  onClose: () => void;
  onSaveCharacter: (updated: CharacterSheet) => void;
}

const CATEGORIES = [
  { value: 'todos', label: 'Todos os itens' },
  { value: 'arma', label: 'Armas' },
  { value: 'armadura', label: 'Armaduras e escudos' },
  { value: 'esoterico', label: 'Esotéricos' },
  { value: 'alquimia', label: 'Alquimia e poções' },
  { value: 'item_geral', label: 'Itens gerais' },
  { value: 'ferramenta', label: 'Ferramentas' },
  { value: 'vestuario', label: 'Vestuário' },
  { value: 'alimentacao', label: 'Alimentação' },
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Preço numérico em Tibares (ex.: "T$ 1.500" → 1500). */
export const parsePrice = (price?: string): number => {
  const match = (price || '').replace(/\./g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export const AddItemModal: React.FC<AddItemModalProps> = ({ character, isOpen, onClose, onSaveCharacter }) => {
  const { toast } = useFeedback();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<'compra' | 'espolio'>('compra');

  const items = useMemo(() => {
    const q = normalize(search.trim());
    return EQUIPMENT_LIST.filter((item) => {
      if (q && !normalize(`${item.name} ${item.description || ''}`).includes(q)) return false;
      if (category === 'arma') return item.category.startsWith('arma');
      if (category === 'armadura') return item.category.startsWith('armadura') || item.category === 'escudo';
      if (category !== 'todos') return item.category === category;
      return true;
    });
  }, [search, category]);

  const unitPrice = parsePrice(selectedItem?.price);
  const totalCost = unitPrice * quantity;
  const isPurchase = mode === 'compra';
  const hasEnoughFunds = !isPurchase || character.tibares >= totalCost;

  const handleAdd = () => {
    if (!selectedItem) return;
    if (!hasEnoughFunds) {
      toast(`Faltam T$ ${totalCost - character.tibares} para comprar ${selectedItem.name}.`, { tone: 'warning' });
      return;
    }
    const newItem: CharacterInventoryItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      equipmentId: selectedItem.id,
      name: selectedItem.name,
      category: selectedItem.category,
      subcategory: selectedItem.subcategory,
      spaces: selectedItem.spaces || 1,
      quantity,
      isEquipped: false,
      damage: selectedItem.damage,
      attackBonus: selectedItem.attackBonus,
      critical: selectedItem.critical,
      damageType: selectedItem.damageType,
      range: selectedItem.range,
      defenseBonus: selectedItem.defenseBonus,
      armorPenalty: selectedItem.armorPenalty,
      description: selectedItem.description,
      price: selectedItem.price,
      source: isPurchase ? 'compra' : 'espolio',
    };
    onSaveCharacter(
      recalculateFullCharacterSheet({
        ...character,
        tibares: isPurchase ? character.tibares - totalCost : character.tibares,
        inventory: [...character.inventory, newItem],
      })
    );
    toast(`${quantity > 1 ? `${quantity}× ` : ''}${selectedItem.name} na mochila.`, { tone: 'success' });
    onClose();
  };

  return (
    <Sheet
      open={isOpen}
      onClose={onClose}
      title="Adicionar item"
      subtitle={`Saldo: T$ ${character.tibares.toLocaleString('pt-BR')}`}
      icon={<PackagePlus size={22} />}
      size="lg"
      full
      flush
      toolbar={
        <div className="filter-row">
          <SearchField value={search} onChange={setSearch} placeholder="Buscar item…" />
          <SelectField value={category} onChange={setCategory} ariaLabel="Categoria" options={CATEGORIES} />
        </div>
      }
      footer={
        selectedItem ? (
          <div className="add-item-footer">
            <div className="hstack between">
              <span className="stack-xs grow" style={{ minWidth: 0 }}>
                <span className="t-semibold truncate">{selectedItem.name}</span>
                <span className="t-xs t-3">
                  {selectedItem.price} · {selectedItem.spaces} esp. cada
                </span>
              </span>
              <NumberStepper value={quantity} onChange={setQuantity} min={1} max={99} ariaLabel="quantidade" />
            </div>
            <Segmented<'compra' | 'espolio'>
              value={mode}
              onChange={setMode}
              ariaLabel="Forma de aquisição"
              options={[
                { value: 'compra', label: `Comprar · T$ ${totalCost.toLocaleString('pt-BR')}`, icon: <Coins size={15} /> },
                { value: 'espolio', label: 'Espólio (grátis)' },
              ]}
            />
            <button type="button" className="btn btn-primary btn-block" onClick={handleAdd} disabled={!hasEnoughFunds}>
              <Check size={18} />
              {hasEnoughFunds ? 'Colocar na mochila' : 'Tibares insuficientes'}
            </button>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <div style={{ padding: 16 }}>
          <EmptyState title="Nenhum item encontrado" description="Tente outro nome ou categoria." />
        </div>
      ) : (
        <div className="list list-plain" role="listbox" aria-label="Itens disponíveis">
          {items.map((item) => {
            const selected = selectedItem?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                className="row"
                onClick={() => {
                  setSelectedItem(selected ? null : item);
                  setQuantity(1);
                }}
              >
                <span className="inv-icon">{categoryIcon(item.category)}</span>
                <span className="row-main">
                  <span className="row-title">{item.name}</span>
                  <span className="row-sub">
                    {item.damage ? `${item.damage} · ` : ''}
                    {item.defenseBonus ? `Def +${item.defenseBonus} · ` : ''}
                    {item.spaces} esp.
                  </span>
                </span>
                <span className="t-sm t-gold t-semibold t-num shrink-0">{item.price}</span>
              </button>
            );
          })}
        </div>
      )}
    </Sheet>
  );
};
