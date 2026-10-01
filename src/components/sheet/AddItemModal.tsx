import React, { useState, useMemo } from 'react';
import { CharacterSheet, CharacterInventoryItem } from '../../types/character';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { EquipmentItem } from '../../types/rules';
import { recalculateFullCharacterSheet } from '../../utils/rulesEngine';
import { Package, Plus, Coins, Shield, Sword, X, Search, Check } from 'lucide-react';

interface AddItemModalProps {
  character: CharacterSheet;
  isOpen: boolean;
  onClose: () => void;
  onSaveCharacter: (updated: CharacterSheet) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  character,
  isOpen,
  onClose,
  onSaveCharacter,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isPurchase, setIsPurchase] = useState<boolean>(true);

  // Categorias de equipamentos
  const categories = [
    { id: 'todos', label: 'Todos os Itens' },
    { id: 'arma', label: 'Armas' },
    { id: 'armadura', label: 'Armaduras & Escudos' },
    { id: 'esoterico', label: 'Esotéricos (Magia)' },
    { id: 'alquimia', label: 'Alquimia & Poções' },
    { id: 'item_geral', label: 'Itens Gerais' },
    { id: 'vestuario', label: 'Vestuário' },
  ];

  // Itens filtrados
  const filteredItems = useMemo(() => {
    return EQUIPMENT_LIST.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || (item.description && item.description.toLowerCase().includes(q));

      let matchesCategory = true;
      if (selectedCategory === 'arma') {
        matchesCategory = item.category.startsWith('arma');
      } else if (selectedCategory === 'armadura') {
        matchesCategory = item.category.startsWith('armadura') || item.category === 'escudo';
      } else if (selectedCategory !== 'todos') {
        matchesCategory = item.category === selectedCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  // Extrai o preço numérico em Tibares (ex: "T$ 30" -> 30)
  const itemPrice = useMemo(() => {
    if (!selectedItem || !selectedItem.price) return 0;
    const match = selectedItem.price.replace(/\./g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }, [selectedItem]);

  const totalCost = itemPrice * quantity;
  const hasEnoughFunds = !isPurchase || character.tibares >= totalCost;

  const handleAddItem = () => {
    if (!selectedItem) return;
    if (!hasEnoughFunds) {
      alert(`Você não possui tibares suficientes para comprar este item! Custo: T$ ${totalCost}, Você possui: T$ ${character.tibares}`);
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

    const updatedTibares = isPurchase ? character.tibares - totalCost : character.tibares;
    const updatedInventory = [...character.inventory, newItem];

    const draft = {
      ...character,
      tibares: updatedTibares,
      inventory: updatedInventory,
    };

    const finalSheet = recalculateFullCharacterSheet(draft);
    onSaveCharacter(finalSheet);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="t20-card t20-card-gold"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
          background: 'linear-gradient(145deg, rgba(20, 24, 40, 0.98) 0%, rgba(28, 22, 38, 0.98) 100%)',
          border: '1px solid var(--border-gold)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(217, 119, 6, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                Inventário do Aventureiro
              </span>
              <span className="badge badge-slate" style={{ fontSize: '0.75rem' }}>
                Saldo Atual: T$ {character.tibares}
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#ffffff', margin: '0.4rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={22} color="var(--t20-gold-light)" />
              Adicionar Equipamento
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.4rem', color: 'var(--text-dim)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filtros e Busca */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Buscar por nome ou características..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem 0.45rem 2.2rem', fontSize: '0.85rem' }}
          />
        </div>

        {/* Lista de Itens do Catálogo */}
        <div
          style={{
            maxHeight: '260px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem',
            background: 'rgba(0,0,0,0.2)',
            marginBottom: '1.25rem',
          }}
        >
          {filteredItems.slice(0, 40).map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  padding: '0.6rem 0.8rem',
                  background: isSelected ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: isSelected ? '1px solid var(--border-gold)' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.9rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff' }}>
                      {item.name}
                    </strong>
                    <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                      {item.price || 'T$ 0'}
                    </span>
                    <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                      {item.spaces || 1} esp.
                    </span>
                  </div>
                  {item.description && (
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {item.description.substring(0, 110)}...
                    </p>
                  )}
                </div>

                {isSelected && <Check size={18} color="var(--t20-gold-light)" />}
              </div>
            );
          })}
        </div>

        {/* Detalhes da Aquisição (Comprar x Espólio e Quantidade) */}
        {selectedItem && (
          <div
            style={{
              padding: '1rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Tipo de Obtenção:</span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsPurchase(true)}
                    className={`btn ${isPurchase ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem', gap: '0.3rem' }}
                  >
                    <Coins size={14} />
                    Comprar (T$ {totalCost})
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPurchase(false)}
                    className={`btn ${!isPurchase ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                  >
                    Espólio / Grátis (T$ 0)
                  </button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Quantidade:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.6rem' }}
                  >
                    -
                  </button>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', minWidth: '20px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.6rem' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {!hasEnoughFunds && (
              <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.75rem' }}>
                ⚠️ Tibares insuficientes! O custo total é T$ {totalCost}, mas você possui apenas T$ {character.tibares}.
              </div>
            )}
          </div>
        )}

        {/* Rodapé e Confirmação */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.25rem' }}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleAddItem}
            disabled={!selectedItem || !hasEnoughFunds}
            className="btn btn-gold"
            style={{
              padding: '0.5rem 1.5rem',
              fontWeight: 800,
              gap: '0.5rem',
              opacity: selectedItem && hasEnoughFunds ? 1 : 0.5,
              cursor: selectedItem && hasEnoughFunds ? 'pointer' : 'not-allowed',
            }}
          >
            <Plus size={18} />
            Adicionar ao Inventário
          </button>
        </div>
      </div>
    </div>
  );
};
