import React, { useState } from 'react';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { EquipmentItem } from '../../types/rules';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { DetailModal, DetailModalData } from '../common/DetailModal';
import { ItemCard } from '../common/ItemCard';
import { ItemModifierModal } from './ItemModifierModal';
import { Search, ArrowLeft, BookOpen, Wrench } from 'lucide-react';

interface ItemsCompendiumProps {
  onBack: () => void;
}

export const ItemsCompendium: React.FC<ItemsCompendiumProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState<'todas' | 'armas' | 'armaduras' | 'geral'>('todas');
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);
  const [customizingItem, setCustomizingItem] = useState<EquipmentItem | null>(null);

  const filteredItems = EQUIPMENT_LIST.filter((it) => {
    if (filterGroup === 'armas' && !it.category.startsWith('arma')) return false;
    if (filterGroup === 'armaduras' && !it.category.startsWith('armadura') && it.category !== 'escudo') return false;
    if (filterGroup === 'geral' && (it.category.startsWith('arma') || it.category.startsWith('armadura') || it.category === 'escudo')) return false;

    const term = search.toLowerCase();
    return (
      it.name.toLowerCase().includes(term) ||
      (it.description && it.description.toLowerCase().includes(term)) ||
      it.category.toLowerCase().includes(term) ||
      (it.damageType && it.damageType.toLowerCase().includes(term))
    );
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'arma_simples':
        return 'Arma Simples';
      case 'arma_marcial':
        return 'Arma Marcial';
      case 'arma_exotica':
        return 'Arma Exótica';
      case 'arma_fogo':
        return 'Arma de Fogo';
      case 'armadura_leve':
        return 'Armadura Leve';
      case 'armadura_pesada':
        return 'Armadura Pesada';
      case 'escudo':
        return 'Escudo';
      case 'item_geral':
        return 'Item Geral';
      case 'alquimia':
        return 'Item Alquímico';
      case 'ferramenta':
        return 'Ferramenta / Ofício';
      case 'vestuario':
        return 'Vestuário';
      case 'esoterico':
        return 'Item Esotérico';
      case 'alimentacao':
        return 'Alimentação';
      case 'animal':
        return 'Animal / Montaria';
      case 'veiculo':
        return 'Veículo';
      case 'servico':
        return 'Serviço';
      default:
        return cat.replace('_', ' ');
    }
  };

  const handleOpenDetailModal = (it: EquipmentItem) => {
    setModalDetail({
      title: it.name,
      category: getCategoryLabel(it.category),
      subtitle: `Preço: ${it.price} • Espaços: ${it.spaces || 1}`,
      description: it.description || 'Item de equipamento de Tormenta 20.',
      stats: [
        { label: 'Preço', value: it.price },
        { label: 'Espaços', value: it.spaces || 1 },
        ...(it.damage ? [{ label: 'Dano', value: it.damage }] : []),
        ...(it.critical ? [{ label: 'Crítico', value: it.critical }] : []),
        ...(it.range ? [{ label: 'Alcance', value: it.range }] : []),
        ...(it.damageType ? [{ label: 'Tipo de Dano', value: it.damageType }] : []),
        ...(it.defenseBonus ? [{ label: 'Bônus Defesa', value: `+${it.defenseBonus}` }] : []),
        ...(it.armorPenalty !== undefined ? [{ label: 'Penalidade Armadura', value: it.armorPenalty }] : []),
      ],
      ruleCitation: {
        id: it.id,
        title: it.name,
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 3: Equipamento',
        section: getCategoryLabel(it.category),
        page: 'Página 142-177',
        quote: `“${it.name}. Preço: ${it.price}; Espaços: ${it.spaces || 1}.${it.description ? ` ${it.description}` : ''}”`,
        explanation:
          'Itens normais podem ser comprados com Tibares (T$) durante a criação de personagem ou no decorrer de suas aventuras.',
      },
    });
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.8rem', gap: '0.4rem', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
          <div>
            <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Catálogo de Itens & Equipamentos</h1>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Tormenta 20: Edição Jogo do Ano (v1.3) • Capítulo 3: Equipamento (pág. 142-173)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setModalDetail({
              title: 'Regras de Equipamento e Capacidade de Carga',
              category: 'Regra Oficial • Tormenta 20',
              subtitle: 'Capítulo 3: Equipamento (pág. 142)',
              description:
                'Personagens podem carregar até 10 + 2×Força espaços de itens sem penalidade. Armaduras pesadas e escudos aplicam penalidade de armadura em perícias de Destreza e Força. A moeda oficial em Arton é o Tibar (T$).',
              ruleCitation: RULES_CITATIONS.EQUIPMENT_RULES,
            })
          }
          className="btn btn-ghost"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: 'var(--t20-gold)', border: '1px solid rgba(245, 158, 11, 0.3)' }}
        >
          <BookOpen size={14} />
          Ver Regras de Carga & Itens
        </button>
      </div>

      {/* Filtros e Busca */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="btn-group">
          <button
            type="button"
            onClick={() => setFilterGroup('todas')}
            className={`btn ${filterGroup === 'todas' ? 'active' : ''}`}
          >
            Todos os Itens
          </button>
          <button
            type="button"
            onClick={() => setFilterGroup('armas')}
            className={`btn ${filterGroup === 'armas' ? 'active' : ''}`}
          >
            Armas
          </button>
          <button
            type="button"
            onClick={() => setFilterGroup('armaduras')}
            className={`btn ${filterGroup === 'armaduras' ? 'active' : ''}`}
          >
            Armaduras & Escudos
          </button>
          <button
            type="button"
            onClick={() => setFilterGroup('geral')}
            className={`btn ${filterGroup === 'geral' ? 'active' : ''}`}
          >
            Itens Gerais & Alquimia
          </button>
        </div>

        <div style={{ position: 'relative', minWidth: '280px', flex: '1', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Buscar item por nome ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.85rem 0.5rem 2.2rem', fontSize: '0.875rem' }}
          />
          <Search size={15} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
        Mostrando <strong>{filteredItems.length}</strong> de {EQUIPMENT_LIST.length} itens cadastrados no compêndio:
      </div>

      {/* Grade de Itens com Novo ItemCard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filteredItems.map((it) => (
          <ItemCard
            key={it.id}
            item={it}
            onOpenDetail={handleOpenDetailModal}
            onCustomize={() => setCustomizingItem(it)}
            actionType="compendium"
          />
        ))}
      </div>

      {/* Modal de Detalhes Padrão */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />

      {/* Modal Interativo de Modificadores (The Bazaar) */}
      {customizingItem && (
        <ItemModifierModal
          key={customizingItem.id}
          item={customizingItem}
          isOpen={Boolean(customizingItem)}
          onClose={() => setCustomizingItem(null)}
          onApply={() => {
            setCustomizingItem(null);
          }}
        />
      )}
    </div>
  );
};
