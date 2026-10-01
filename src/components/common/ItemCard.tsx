import React from 'react';
import { EquipmentItem } from '../../types/rules';
import {
  Coins,
  Hand,
  Shield,
  ArrowDown,
  Sword,
  Target,
  Info,
  Sparkles,
  Package,
  Wrench,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';

interface ItemCardProps {
  item: EquipmentItem;
  appliedModifiers?: string[];
  specialMaterial?: string;
  sourceBadge?: string;
  isFree?: boolean;
  onOpenDetail?: (item: EquipmentItem) => void;
  onCustomize?: (item: EquipmentItem) => void;
  onAdd?: (item: EquipmentItem) => void;
  onRemove?: () => void;
  onToggleEquipped?: () => void;
  isEquipped?: boolean;
  actionType?: 'add' | 'inventory' | 'compendium';
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  appliedModifiers = [],
  specialMaterial,
  sourceBadge,
  isFree = false,
  onOpenDetail,
  onCustomize,
  onAdd,
  onRemove,
  onToggleEquipped,
  isEquipped = false,
  actionType = 'compendium',
}) => {
  const isArmorOrShield = item.category.startsWith('armadura') || item.category === 'escudo';
  const isWeapon = item.category.startsWith('arma_');

  // Subtitle / Type Tag
  const getSubheader = () => {
    if (item.damageType) {
      return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {isWeapon ? <Sword size={14} /> : <Shield size={14} />}
          <span>Tipo de Dano: {item.damageType}</span>
        </div>
      );
    }
    if (isArmorOrShield) {
      return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <Shield size={14} />
          <span>Categoria: {item.category.replace('_', ' ')}</span>
        </div>
      );
    }
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        <Package size={14} />
        <span>Categoria: {item.category.replace('_', ' ')}</span>
      </div>
    );
  };

  return (
    <div
      className="t20-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'radial-gradient(ellipse at top, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: isEquipped ? '1px solid var(--t20-gold)' : '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: isEquipped ? '0 0 15px rgba(245, 158, 11, 0.25)' : '0 4px 16px rgba(0, 0, 0, 0.35)',
        transition: 'var(--transition)',
        position: 'relative',
      }}
    >
      <div>
        {/* Source / Free / Equipped Badges */}
        {(sourceBadge || isFree || isEquipped || appliedModifiers.length > 0 || specialMaterial) && (
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem', justifyContent: 'center' }}>
            {sourceBadge && (
              <span className="badge badge-ruby" style={{ fontSize: '0.7rem', textTransform: 'none' }}>
                {sourceBadge}
              </span>
            )}
            {isFree && (
              <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                Grátis (T$ 0)
              </span>
            )}
            {isEquipped && (
              <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                ✓ Equipado
              </span>
            )}
            {appliedModifiers.length > 0 && (
              <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={11} /> {appliedModifiers.length} Melhoria{appliedModifiers.length > 1 ? 's' : ''}
              </span>
            )}
            {specialMaterial && (
              <span className="badge badge-ruby" style={{ fontSize: '0.7rem' }}>
                {specialMaterial}
              </span>
            )}
          </div>
        )}

        {/* Título Centralizado em Caixa Alta */}
        <h3
          style={{
            fontFamily: 'var(--font-fantasy)',
            fontSize: '1.35rem',
            textAlign: 'center',
            color: '#ffffff',
            margin: '0 0 0.4rem 0',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {item.name}
        </h3>

        {/* Subheader / Tag com Ícone */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {getSubheader()}
        </div>

        {/* Linha Divisória */}
        <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.15)', margin: '0 0 1rem 0' }} />

        {/* Grid de Estatísticas Linha 1: T$ e Espaços */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            marginBottom: '0.85rem',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
            <Coins size={18} style={{ color: '#f59e0b' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: isFree ? '#34d399' : '#f59e0b',
              }}
            >
              {isFree ? 'T$ 0' : item.price}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
            <Hand size={18} style={{ color: '#cbd5e1' }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 800,
                color: '#cbd5e1',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {item.spaces} {item.spaces === 1 ? 'ESPAÇO' : 'ESPAÇOS'}
            </span>
          </div>
        </div>

        {/* Grid de Estatísticas Linha 2 (Armaduras / Escudos ou Armas) */}
        {isArmorOrShield && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '1rem',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              <Shield size={18} style={{ color: '#10b981' }} />
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#10b981',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                DEFESA: {item.defenseBonus && item.defenseBonus > 0 ? `+${item.defenseBonus}` : item.defenseBonus || '+0'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              <ArrowDown size={18} style={{ color: '#f87171' }} />
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#f87171',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                PENALIDADE: {item.armorPenalty !== undefined ? item.armorPenalty : 0}
              </span>
            </div>
          </div>
        )}

        {isWeapon && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: item.attackBonus && item.attackBonus > 0 ? 'auto 1fr 1fr' : '1fr 1fr',
              gap: '0.6rem',
              marginBottom: '1rem',
              alignItems: 'center',
            }}
          >
            {item.attackBonus && item.attackBonus > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <Sparkles size={16} style={{ color: '#38bdf8' }} />
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: '#38bdf8',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  ATQ: +{item.attackBonus}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              <Sword size={18} style={{ color: '#ff6b7b' }} />
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#ff6b7b',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                DANO: {item.damage || '1d4'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
              <Target size={18} style={{ color: '#fbbf24' }} />
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#fbbf24',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                CRÍTICO: {item.critical || 'x2'}
              </span>
            </div>
          </div>
        )}

        {/* Descrição do Item */}
        {item.description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: '#cbd5e1',
              lineHeight: 1.55,
              margin: '0 0 1rem 0',
              textAlign: 'center',
            }}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* Rodapé: Link "Ver Detalhes do Item" e Ações Contextuais */}
      <div
        style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          paddingTop: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          {onCustomize && actionType === 'compendium' && (
            <button
              type="button"
              onClick={() => onCustomize(item)}
              className="btn btn-secondary"
              style={{
                color: 'var(--t20-gold)',
                padding: '0.25rem 0.65rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
              title="Personalizar com melhorias mecânicas, materiais especiais e encantos"
            >
              <Wrench size={14} />
              <span>Oficina & Melhorias</span>
            </button>
          )}

          {onOpenDetail && (
            <button
              type="button"
              onClick={() => onOpenDetail(item)}
              className="btn btn-ghost"
              style={{
                color: '#f59e0b',
                padding: '0.2rem 0.4rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginLeft: 'auto',
              }}
            >
              <Info size={15} />
              <span>Ver Detalhes do Item</span>
            </button>
          )}
        </div>

        {/* Botões de Ação para o Wizard ou Inventário */}
        {actionType === 'add' && onAdd && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.85rem', gap: '0.4rem' }}
            >
              <Plus size={15} />
              Adicionar
            </button>
            {onCustomize && (
              <button
                type="button"
                onClick={() => onCustomize(item)}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                title="Customizar com melhorias e materiais especiais"
              >
                <Wrench size={15} />
              </button>
            )}
          </div>
        )}

        {actionType === 'inventory' && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {onToggleEquipped && (
              <button
                type="button"
                onClick={onToggleEquipped}
                className={`btn ${isEquipped ? 'btn-gold' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.35rem 0.65rem', fontSize: '0.8rem', gap: '0.3rem' }}
              >
                <Check size={14} />
                {isEquipped ? 'Desequipar' : 'Equipar'}
              </button>
            )}

            {onCustomize && (
              <button
                type="button"
                onClick={() => onCustomize(item)}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', gap: '0.3rem' }}
                title="Modificar / Adicionar Melhorias"
              >
                <Wrench size={14} />
                Modificar
              </button>
            )}

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="btn btn-danger"
                style={{ padding: '0.35rem 0.55rem' }}
                title="Remover do Inventário"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
