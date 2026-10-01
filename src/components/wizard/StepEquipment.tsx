import React, { useState, useMemo } from 'react';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { EquipmentItem } from '../../types/rules';
import { CharacterInventoryItem } from '../../types/character';
import { CLASSES_LIST } from '../../data/classes';
import { ORIGINS_LIST } from '../../data/origins';
import { DetailModalData } from '../common/DetailModal';
import { ItemCard } from '../common/ItemCard';
import { ItemModifierModal } from '../compendium/ItemModifierModal';
import {
  Coins,
  Package,
  Info,
  Search,
  ShoppingBag,
} from 'lucide-react';

interface StepEquipmentProps {
  inventory: CharacterInventoryItem[];
  tibares: number;
  maxSpaces: number;
  currentSpaces: number;
  classId?: string;
  originId?: string;
  onUpdateInventory: (items: CharacterInventoryItem[]) => void;
  onUpdateTibares: (t: number) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepEquipment: React.FC<StepEquipmentProps> = ({
  inventory,
  tibares,
  maxSpaces,
  currentSpaces,
  classId,
  originId,
  onUpdateInventory,
  onUpdateTibares,
  onOpenDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'inventario' | 'loja'>('loja');
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [search, setSearch] = useState('');
  const [customizingItem, setCustomizingItem] = useState<{ item: CharacterInventoryItem; isNew?: boolean } | null>(null);
  const [showMoneyModal, setShowMoneyModal] = useState(false);

  // Informações de Classe e Origem
  const currentClass = CLASSES_LIST.find((c) => c.id === classId);
  const currentOrigin = ORIGINS_LIST.find((o) => o.id === originId);

  // Cálculo Reativo do Dinheiro Inicial
  const moneyBreakdown = useMemo(() => {
    let base = 14; // Média de 4d6 (T$ 4d6)
    let classBonus = 0;
    let originBonus = 0;
    const originsNotes: string[] = [];
    const classNotes: string[] = [];

    // Bônus de Classe
    if (classId === 'nobre') {
      classBonus += 100;
      classNotes.push('Nobre: Herança abastada e riqueza da corte (+T$ 100)');
    } else if (classId === 'inventor') {
      classBonus += 50;
      classNotes.push('Inventor: Orçamento inicial para protótipos e matérias-primas (+T$ 50)');
    }

    // Bônus de Origem
    if (originId === 'aristocrata') {
      originBonus += 300;
      originsNotes.push('Aristocrata: Joia de família e dote nobre (+T$ 300)');
    } else if (originId === 'membro_guilda' || originId === 'mercador') {
      originBonus += 100;
      originsNotes.push('Comerciante/Membro de Guilda: Capital inicial e gemas valiosas (+T$ 100)');
    } else if (originId === 'marujo') {
      originBonus += 7; // Média de 2d6
      originsNotes.push('Marujo: Último soldo e pagamento da tripulação (+T$ 7 [2d6])');
    } else if (originId === 'amnesico') {
      originBonus += 50;
      originsNotes.push('Amnésico: Moedas misteriosas encontradas em seus pertences (+T$ 50)');
    } else if (originId === 'forasteiro' || originId === 'artesao') {
      originBonus += 50;
      originsNotes.push('Bens de ofício e mercadorias estrangeiras (+T$ 50)');
    }

    const totalInitial = base + classBonus + originBonus;
    return {
      base,
      classBonus,
      classNotes,
      originBonus,
      originsNotes,
      totalInitial,
    };
  }, [classId, originId]);

  // Converte string de preço (ex: "T$ 25") para número
  const parsePrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const cleanStr = priceStr.replace(/[^\d.,]/g, '').replace(',', '.');
    return parseFloat(cleanStr) || 0;
  };

  // Cálculo de gastos com itens comprados
  const totalSpent = useMemo(() => {
    return inventory.reduce((sum, it) => {
      if (it.isFree) return sum;
      return sum + parsePrice(it.price) * (it.quantity || 1);
    }, 0);
  }, [inventory]);

  const remainingMoney = Math.max(0, moneyBreakdown.totalInitial - totalSpent);

  // Atualiza o saldo de dinheiro sempre que as compras/saldo mudarem
  React.useEffect(() => {
    onUpdateTibares(remainingMoney);
  }, [remainingMoney, onUpdateTibares]);

  // Filtros da Loja de Equipamentos
  const filteredEquipment = EQUIPMENT_LIST.filter((eq) => {
    const matchesCategory =
      activeCategory === 'todas' ||
      (activeCategory === 'armas' && eq.category.startsWith('arma')) ||
      (activeCategory === 'armaduras' && eq.category.startsWith('armadura')) ||
      (activeCategory === 'escudos' && eq.category === 'escudo') ||
      (activeCategory === 'esotericos' && eq.category === 'esoterico') ||
      (activeCategory === 'alquimia' && eq.category === 'alquimia') ||
      (activeCategory === 'itens' && eq.category === 'item_geral');
    const matchesSearch =
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      (eq.description && eq.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Adicionar item da loja ao inventário
  const handleAddItem = (eq: EquipmentItem) => {
    const cost = parsePrice(eq.price);
    if (remainingMoney < cost) {
      alert(`Você não possui Tibares suficientes para comprar ${eq.name} (Custa: ${eq.price}, Saldo Restante: T$ ${remainingMoney}).`);
      return;
    }

    const newItem: CharacterInventoryItem = {
      id: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      equipmentId: eq.id,
      name: eq.name,
      category: eq.category,
      subcategory: eq.subcategory,
      spaces: eq.spaces,
      quantity: 1,
      isEquipped: eq.category.startsWith('armadura') || eq.category === 'escudo' || eq.category.startsWith('arma'),
      damage: eq.damage,
      critical: eq.critical,
      damageType: eq.damageType,
      range: eq.range,
      defenseBonus: eq.defenseBonus,
      armorPenalty: eq.armorPenalty,
      description: eq.description,
      price: eq.price,
      isFree: false,
      source: 'compra',
    };

    onUpdateInventory([...inventory, newItem]);
  };

  // Remover item do inventário
  const handleRemoveItem = (id: string) => {
    onUpdateInventory(inventory.filter((it) => it.id !== id));
  };

  // Equipar / Desequipar
  const handleToggleEquipped = (id: string) => {
    onUpdateInventory(
      inventory.map((it) => {
        if (it.id === id) {
          return { ...it, isEquipped: !it.isEquipped };
        }
        if (
          (it.category === 'armadura_leve' || it.category === 'armadura_pesada') &&
          inventory.find((target) => target.id === id)?.category.startsWith('armadura')
        ) {
          return { ...it, isEquipped: false };
        }
        return it;
      })
    );
  };

  // Abrir Modal de Customização
  const handleOpenCustomize = (it: CharacterInventoryItem) => {
    setCustomizingItem({ item: it, isNew: false });
  };

  const handleOpenCustomizeFromShop = (eq: EquipmentItem) => {
    const dummyItem: CharacterInventoryItem = {
      id: 'new_' + Date.now(),
      equipmentId: eq.id,
      name: eq.name,
      category: eq.category,
      subcategory: eq.subcategory,
      spaces: eq.spaces,
      quantity: 1,
      isEquipped: true,
      damage: eq.damage,
      critical: eq.critical,
      damageType: eq.damageType,
      defenseBonus: eq.defenseBonus,
      armorPenalty: eq.armorPenalty,
      description: eq.description,
      price: eq.price,
    };
    setCustomizingItem({ item: dummyItem, isNew: true });
  };

  // Salvar Customização
  const handleSaveCustomization = (customized: EquipmentItem, appliedModifierIds: string[], totalCost: number) => {
    if (!customizingItem) return;

    if (customizingItem.isNew) {
      if (remainingMoney < totalCost) {
        alert('Você não tem Tibares suficientes para pagar por este item superior.');
        return;
      }
      const newItem: CharacterInventoryItem = {
        id: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        equipmentId: customized.id,
        name: customized.name,
        category: customized.category,
        subcategory: customized.subcategory,
        spaces: customized.spaces,
        quantity: 1,
        isEquipped: true,
        damage: customized.damage,
        attackBonus: customized.attackBonus,
        critical: customized.critical,
        damageType: customized.damageType,
        defenseBonus: customized.defenseBonus,
        armorPenalty: customized.armorPenalty,
        description: customized.description,
        price: customized.price,
        appliedModifiers: appliedModifierIds,
        source: 'compra',
        isFree: false,
      };
      onUpdateInventory([...inventory, newItem]);
    } else {
      // Atualiza item existente
      const updated = inventory.map((it) => {
        if (it.id === customizingItem.item.id) {
          return {
            ...it,
            name: customized.name,
            price: customized.price,
            spaces: customized.spaces,
            defenseBonus: customized.defenseBonus,
            armorPenalty: customized.armorPenalty,
            damage: customized.damage,
            attackBonus: customized.attackBonus,
            critical: customized.critical,
            appliedModifiers: appliedModifierIds,
          };
        }
        return it;
      });
      onUpdateInventory(updated);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho da Etapa com Painel de Dinheiro e Carga */}
      <div
        className="t20-card t20-card-gold"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          padding: '1.5rem',
          background: 'radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.15) 0%, rgba(20, 23, 38, 0.95) 75%)',
        }}
      >
        <div>
          <h2>Passo 8: Equipamento & Dinheiro</h2>
          <p style={{ margin: '0.25rem 0 0 0', maxWidth: '650px' }}>
            Adquira armas, armaduras e suprimentos para sobreviver aos perigos de Arton. Seus itens concedidos pela origem e classe são gratuitos, e os demais são custeados por seus Tibares iniciais.
          </p>
        </div>

        {/* Dashboard de Tibares e Espaços */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Caixa de Dinheiro */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Coins size={28} style={{ color: '#f59e0b' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Dinheiro Restante
                </span>
                <button
                  type="button"
                  onClick={() => setShowMoneyModal(true)}
                  className="btn btn-ghost"
                  style={{ padding: '0.1rem', color: 'var(--t20-gold)' }}
                  title="Ver origem e cálculo do dinheiro inicial"
                >
                  <Info size={14} />
                </button>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--t20-gold-light)' }}>
                T$ {remainingMoney.toLocaleString('pt-BR')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
                Inicial: T$ {moneyBreakdown.totalInitial} • Gasto: T$ {totalSpent}
              </div>
            </div>
          </div>

          {/* Caixa de Carga / Espaços */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: currentSpaces > maxSpaces ? '1px solid #ef4444' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Package size={28} style={{ color: currentSpaces > maxSpaces ? '#f87171' : '#60a5fa' }} />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Capacidade de Carga
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: currentSpaces > maxSpaces ? '#f87171' : '#ffffff',
                }}
              >
                {currentSpaces} / {maxSpaces} espaços
              </div>
              {currentSpaces > maxSpaces && (
                <div style={{ fontSize: '0.7rem', color: '#f87171', fontWeight: 700 }}>
                  Sobrecarga! (-2 em perícias)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navegação entre Loja e Inventário */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="btn-group">
          <button
            type="button"
            onClick={() => setActiveTab('loja')}
            className={`btn ${activeTab === 'loja' ? 'active' : ''}`}
            style={{ gap: '0.4rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            <ShoppingBag size={16} />
            Mercado de Arton (Comprar Itens)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inventario')}
            className={`btn ${activeTab === 'inventario' ? 'active' : ''}`}
            style={{ gap: '0.4rem', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
          >
            <Package size={16} />
            Meu Inventário ({inventory.length} itens)
          </button>
        </div>

        {activeTab === 'loja' && (
          <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '350px' }}>
            <input
              type="text"
              placeholder="Buscar item no mercado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.45rem 0.85rem 0.45rem 2.2rem', fontSize: '0.85rem' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          </div>
        )}
      </div>

      {/* ABA 1: MERCADO DE ARTON (COMPRAR ITENS) */}
      {activeTab === 'loja' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Filtros de Categoria da Loja */}
          <div className="btn-group" style={{ flexWrap: 'wrap' }}>
            {[
              { id: 'todas', label: 'Todos os Itens' },
              { id: 'armas', label: 'Armas' },
              { id: 'armaduras', label: 'Armaduras' },
              { id: 'escudos', label: 'Escudos' },
              { id: 'esotericos', label: 'Esotéricos' },
              { id: 'alquimia', label: 'Alquimia & Poções' },
              { id: 'itens', label: 'Itens Gerais' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grade com ItemCard idêntico à imagem de referência */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.25rem' }}>
            {filteredEquipment.map((eq) => (
              <ItemCard
                key={eq.id}
                item={eq}
                onAdd={() => handleAddItem(eq)}
                onCustomize={() => handleOpenCustomizeFromShop(eq)}
                onOpenDetail={() =>
                  onOpenDetail({
                    title: eq.name,
                    category: eq.category.replace('_', ' ').toUpperCase(),
                    subtitle: `Preço: ${eq.price} • Espaços: ${eq.spaces || 1}`,
                    description: eq.description || 'Equipamento de Tormenta 20.',
                  })
                }
                actionType="add"
              />
            ))}
          </div>
        </div>
      )}

      {/* ABA 2: MEU INVENTÁRIO (ITENS ATUAIS & CUSTOMIZAÇÃO) */}
      {activeTab === 'inventario' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {inventory.length === 0 ? (
            <div className="t20-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <Package size={48} style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Seu inventário está vazio</h3>
              <p style={{ margin: '0.35rem 0 1rem 0' }}>
                Acesse a aba <strong>Mercado de Arton</strong> para adquirir suas armas, armaduras e suprimentos.
              </p>
              <button type="button" onClick={() => setActiveTab('loja')} className="btn btn-primary">
                Ir às Compras
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.25rem' }}>
              {inventory.map((it) => {
                const asEquipItem: EquipmentItem = {
                  id: it.equipmentId || it.id,
                  name: it.name,
                  category: it.category,
                  subcategory: it.subcategory,
                  spaces: it.spaces,
                  price: it.price || 'T$ 0',
                  damage: it.damage,
                  critical: it.critical,
                  damageType: it.damageType,
                  range: it.range,
                  defenseBonus: it.defenseBonus,
                  armorPenalty: it.armorPenalty,
                  description: it.description,
                };

                return (
                  <ItemCard
                    key={it.id}
                    item={asEquipItem}
                    appliedModifiers={it.appliedModifiers}
                    isEquipped={it.isEquipped}
                    isFree={it.isFree}
                    sourceBadge={it.source === 'origem' ? `Origem: ${currentOrigin?.name || 'Origem'}` : it.source === 'inicial' ? 'Kit Inicial' : undefined}
                    onToggleEquipped={() => handleToggleEquipped(it.id)}
                    onCustomize={() => handleOpenCustomize(it)}
                    onRemove={() => handleRemoveItem(it.id)}
                    onOpenDetail={() =>
                      onOpenDetail({
                        title: it.name,
                        category: it.category.replace('_', ' ').toUpperCase(),
                        subtitle: `Preço: ${it.price || 'T$ 0'} • Espaços: ${it.spaces || 1}`,
                        description: it.description || 'Item no inventário.',
                      })
                    }
                    actionType="inventory"
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal de Detalhamento e Somatória do Dinheiro Inicial */}
      {showMoneyModal && (
        <div className="modal-overlay" onClick={() => setShowMoneyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <Coins size={22} style={{ color: 'var(--t20-gold)' }} />
              <div>
                <h3 style={{ fontSize: '1.3rem', margin: 0, color: '#ffffff' }}>
                  Cálculo do Dinheiro Inicial (T$)
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Tormenta 20: Edição Jogo do Ano (v1.3) • pág. 146
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed var(--border-color)', fontSize: '0.9rem' }}>
                <span>Base Padrão (4d6):</span>
                <strong style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>T$ {moneyBreakdown.base}</strong>
              </div>

              {moneyBreakdown.classBonus > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed var(--border-color)', fontSize: '0.9rem' }}>
                  <span>Bônus da Classe ({currentClass?.name}):</span>
                  <strong style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>+T$ {moneyBreakdown.classBonus}</strong>
                </div>
              )}

              {moneyBreakdown.originBonus > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed var(--border-color)', fontSize: '0.9rem' }}>
                  <span>Bônus da Origem ({currentOrigin?.name}):</span>
                  <strong style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>+T$ {moneyBreakdown.originBonus}</strong>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>
                <span>Total Inicial Disponível:</span>
                <span style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>T$ {moneyBreakdown.totalInitial}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', color: '#f87171', fontSize: '0.9rem' }}>
                <span>Total Gasto em Compras:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>-T$ {totalSpent}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderTop: '2px solid var(--border-gold)', fontWeight: 800, fontSize: '1.15rem', color: '#ffffff' }}>
                <span>Saldo Restante:</span>
                <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>T$ {remainingMoney}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, fontStyle: 'italic', background: 'rgba(0,0,0,0.25)', padding: '0.65rem', borderRadius: 'var(--radius-sm)' }}>
              “Personagens de 1º nível começam com T$ 4d6, além dos itens fornecidos por sua origem e classe. O dinheiro pode ser usado para adquirir equipamentos adicionais ou guardado para a aventura.” — Manual pág. 146.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" onClick={() => setShowMoneyModal(false)} className="btn btn-secondary">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Interativo de Modificadores (The Bazaar) */}
      {customizingItem && (
        <ItemModifierModal
          key={customizingItem.item.id}
          item={{
            id: customizingItem.item.equipmentId || customizingItem.item.id,
            name: customizingItem.item.name,
            category: customizingItem.item.category,
            subcategory: customizingItem.item.subcategory,
            spaces: customizingItem.item.spaces,
            price: customizingItem.item.price || 'T$ 0',
            damage: customizingItem.item.damage,
            critical: customizingItem.item.critical,
            damageType: customizingItem.item.damageType,
            defenseBonus: customizingItem.item.defenseBonus,
            armorPenalty: customizingItem.item.armorPenalty,
            attackBonus: customizingItem.item.attackBonus,
            description: customizingItem.item.description,
          }}
          initialModifiers={customizingItem.item.appliedModifiers || []}
          characterTibares={remainingMoney}
          isOpen={Boolean(customizingItem)}
          onClose={() => setCustomizingItem(null)}
          onApply={handleSaveCustomization}
        />
      )}
    </div>
  );
};
