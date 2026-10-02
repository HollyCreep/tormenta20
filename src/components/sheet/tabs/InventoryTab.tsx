import React, { useState } from 'react';
import {
  Apple,
  Backpack,
  Coins,
  FlaskConical,
  Gem,
  Info,
  MoreVertical,
  Package,
  PawPrint,
  Plus,
  Shield,
  ShieldHalf,
  Shirt,
  Ship,
  Sword,
  Trash2,
  Wrench,
} from 'lucide-react';
import type { CharacterInventoryItem, CharacterSheet } from '../../../types/character';
import type { EquipmentItem } from '../../../types/rules';
import { getEquipmentDetailModalData } from '../../../utils/equipmentDetail';
import type { DetailModalData } from '../../common/DetailModal';
import { EmptyState } from '../../ui/controls';
import { MenuSheet } from '../../ui/MenuSheet';
import { percent } from '../../../utils/displayNames';

interface InventoryTabProps {
  character: CharacterSheet;
  onOpenAddItemModal: () => void;
  onOpenMoneyModal: () => void;
  onCustomizeItem: (item: CharacterInventoryItem) => void;
  onToggleEquip: (itemId: string) => void;
  onRemoveItem: (item: CharacterInventoryItem) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

export const categoryIcon = (category: string, size = 20) => {
  if (category.startsWith('arma')) return <Sword size={size} />;
  if (category.startsWith('armadura')) return <Shield size={size} />;
  if (category === 'escudo') return <ShieldHalf size={size} />;
  if (category === 'esoterico') return <Gem size={size} />;
  if (category === 'alquimia') return <FlaskConical size={size} />;
  if (category === 'ferramenta') return <Wrench size={size} />;
  if (category === 'vestuario') return <Shirt size={size} />;
  if (category === 'alimentacao') return <Apple size={size} />;
  if (category === 'animal') return <PawPrint size={size} />;
  if (category === 'veiculo') return <Ship size={size} />;
  return <Package size={size} />;
};

const isEquipable = (item: CharacterInventoryItem) =>
  item.category.startsWith('arma') || item.category.startsWith('armadura') || item.category === 'escudo';

const isModifiable = (item: CharacterInventoryItem) => isEquipable(item) || item.category === 'esoterico';

export const InventoryTab: React.FC<InventoryTabProps> = ({
  character,
  onOpenAddItemModal,
  onOpenMoneyModal,
  onCustomizeItem,
  onToggleEquip,
  onRemoveItem,
  onSetModalDetail,
}) => {
  const [menuFor, setMenuFor] = useState<CharacterInventoryItem | null>(null);
  const { currentSpaces, maxSpaces } = character.stats;
  const overloaded = currentSpaces > maxSpaces.value;
  const equipped = character.inventory.filter((i) => i.isEquipped);
  const carried = character.inventory.filter((i) => !i.isEquipped);

  const openDetail = (item: CharacterInventoryItem) =>
    onSetModalDetail(
      getEquipmentDetailModalData(item as unknown as EquipmentItem, undefined, item.appliedModifiers, item.specialMaterial)
    );

  const renderItem = (item: CharacterInventoryItem) => {
    const mods = item.appliedModifiers?.length || 0;
    return (
      <div key={item.id} className={`row inv-row${item.isEquipped ? ' is-equipped' : ''}`}>
        <button type="button" className="inv-main has-detail" onClick={() => openDetail(item)}>
          <span className="inv-icon">{categoryIcon(item.category)}</span>
          <span className="row-main">
            <span className="row-title">
              {item.name}
              {item.quantity > 1 && <span className="t-3"> ×{item.quantity}</span>}
            </span>
            <span className="row-sub">
              {item.spaces * (item.quantity || 1)} esp.
              {item.damage ? ` · ${item.damage}` : ''}
              {item.defenseBonus ? ` · Def +${item.defenseBonus}` : ''}
              {item.specialMaterial ? ` · ${item.specialMaterial}` : ''}
              {mods > 0 ? ` · ${mods} melhoria${mods > 1 ? 's' : ''}` : ''}
            </span>
          </span>
        </button>
        {isEquipable(item) && (
          <button
            type="button"
            className={`chip chip-sm equip-chip${item.isEquipped ? ' is-active' : ''}`}
            aria-pressed={item.isEquipped}
            onClick={() => onToggleEquip(item.id)}
          >
            {item.isEquipped ? 'Equipado' : 'Equipar'}
          </button>
        )}
        <button type="button" className="icon-btn icon-btn-sm" onClick={() => setMenuFor(item)} aria-label={`Ações de ${item.name}`}>
          <MoreVertical size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="stack-lg">
      <div className="grid-2">
        <button type="button" className="wallet-card" onClick={onOpenMoneyModal}>
          <span className="stat-label">
            <Coins size={14} />
            Tibares
          </span>
          <span className="wallet-value t-num">
            <small>T$</small> {(character.tibares ?? 0).toLocaleString('pt-BR')}
          </span>
          <span className="t-xs t-3">Toque para movimentar</span>
        </button>
        <div className={`load-card${overloaded ? ' is-danger' : ''}`}>
          <span className="stat-label">
            <Backpack size={14} />
            Carga
          </span>
          <span className="wallet-value t-num">
            {currentSpaces}
            <small> / {maxSpaces.value}</small>
          </span>
          <span className={`meter meter-sm ${overloaded ? 'meter-danger' : 'meter-gold'}`} style={{ '--pct': percent(currentSpaces, maxSpaces.value) } as React.CSSProperties}>
            <span className="meter-fill" />
          </span>
        </div>
      </div>

      <button type="button" className="btn btn-primary btn-block" onClick={onOpenAddItemModal}>
        <Plus size={20} />
        Adicionar item
      </button>

      {character.inventory.length === 0 ? (
        <EmptyState icon={<Backpack size={24} />} title="Mochila vazia" description="Compre ou registre itens encontrados na aventura." />
      ) : (
        <>
          {equipped.length > 0 && (
            <section className="stack-sm">
              <span className="eyebrow">Em uso · {equipped.length}</span>
              <div className="list">{equipped.map(renderItem)}</div>
            </section>
          )}
          {carried.length > 0 && (
            <section className="stack-sm">
              <span className="eyebrow">Na mochila · {carried.length}</span>
              <div className="list">{carried.map(renderItem)}</div>
            </section>
          )}
        </>
      )}

      <MenuSheet
        open={!!menuFor}
        onClose={() => setMenuFor(null)}
        title={menuFor?.name}
        subtitle={menuFor ? `${menuFor.spaces * (menuFor.quantity || 1)} espaço(s)` : undefined}
        items={
          menuFor
            ? [
                { id: 'detail', label: 'Detalhes do item', icon: <Info size={20} />, onSelect: () => openDetail(menuFor) },
                {
                  id: 'equip',
                  label: menuFor.isEquipped ? 'Desequipar' : 'Equipar',
                  icon: <Shield size={20} />,
                  hidden: !isEquipable(menuFor),
                  onSelect: () => onToggleEquip(menuFor.id),
                },
                {
                  id: 'forge',
                  label: 'Oficina',
                  description: 'Melhorias, materiais especiais e encantos',
                  icon: <Wrench size={20} />,
                  hidden: !isModifiable(menuFor),
                  onSelect: () => onCustomizeItem(menuFor),
                },
                {
                  id: 'remove',
                  label: 'Remover da mochila',
                  icon: <Trash2 size={20} />,
                  danger: true,
                  onSelect: () => onRemoveItem(menuFor),
                },
              ]
            : []
        }
      />
    </div>
  );
};
