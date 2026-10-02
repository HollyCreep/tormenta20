import React from 'react';
import { Coins, Plus, Info, Wrench } from 'lucide-react';
import type { CharacterSheet, CharacterInventoryItem } from '../../../types/character';
import { getEquipmentDetailModalData } from '../../../utils/equipmentDetail';
import type { EquipmentItem } from '../../../types/rules';
import type { DetailModalData } from '../../common/DetailModal';

interface InventoryTabProps {
  character: CharacterSheet;
  onOpenAddItemModal: () => void;
  onOpenMoneyModal: () => void;
  onCustomizeItem: (item: CharacterInventoryItem) => void;
  onToggleEquip: (itemId: string) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  character,
  onOpenAddItemModal,
  onOpenMoneyModal,
  onCustomizeItem,
  onToggleEquip,
  onSetModalDetail,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.3)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Riqueza Total:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--t20-gold-light)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                T$ {character.tibares ?? 0}
              </div>
              <button
                type="button"
                onClick={onOpenMoneyModal}
                className="btn btn-secondary"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', gap: '0.3rem', color: 'var(--t20-gold)' }}
                title="Editar dinheiro (ganhos, gastos ou ajuste com auditoria)"
              >
                <Coins size={13} />
                Editar
              </button>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Carga de Espaços:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {character.stats.currentSpaces} / {character.stats.maxSpaces.value} espaços
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAddItemModal}
          className="btn btn-gold"
          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', gap: '0.35rem', fontWeight: 700 }}
        >
          <Plus size={16} />
          Adicionar Equipamento
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {character.inventory.map((item) => {
          const isModifiable =
            item.category.startsWith('arma') ||
            item.category.startsWith('armadura') ||
            item.category === 'escudo' ||
            item.category === 'esoterico';

          return (
            <div
              key={item.id}
              className="t20-card"
              style={{
                padding: '0.75rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: item.isEquipped ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255,255,255,0.02)',
                borderColor: item.isEquipped ? 'var(--border-gold)' : 'var(--border-color)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '0.95rem', color: item.isEquipped ? 'var(--t20-gold-light)' : '#ffffff' }}>
                    {item.name}
                  </strong>
                  {item.isEquipped && (
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                      Equipado
                    </span>
                  )}
                  <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                    {item.spaces} esp.
                  </span>
                  {item.quantity > 1 && (
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                      x{item.quantity}
                    </span>
                  )}
                  {item.specialMaterial && (
                    <span
                      className="badge"
                      style={{
                        background: 'rgba(230, 57, 70, 0.15)',
                        border: '1px solid #e63946',
                        color: '#ff6b7b',
                        fontSize: '0.65rem',
                      }}
                    >
                      {item.specialMaterial}
                    </span>
                  )}
                  {item.appliedModifiers && item.appliedModifiers.length > 0 && (
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                      {item.appliedModifiers.join(', ')}
                    </span>
                  )}
                </div>
                {item.description && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                    {item.description}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() =>
                    onSetModalDetail(
                      getEquipmentDetailModalData(
                        item as unknown as EquipmentItem,
                        undefined,
                        item.appliedModifiers,
                        item.specialMaterial
                      )
                    )
                  }
                  className="btn btn-ghost"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem', color: 'var(--text-muted)' }}
                  title="Ver Detalhes Canônicos do Item"
                >
                  <Info size={13} />
                  Detalhes
                </button>

                {isModifiable && (
                  <button
                    type="button"
                    onClick={() => onCustomizeItem(item)}
                    className="btn btn-secondary"
                    style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', gap: '0.25rem', color: 'var(--t20-gold)' }}
                    title="Modificar na Oficina / Forja (melhorias, materiais especiais e encantos)"
                  >
                    <Wrench size={13} />
                    Oficina
                  </button>
                )}

                {(item.category.startsWith('arma') || item.category.startsWith('armadura') || item.category === 'escudo') && (
                  <button
                    type="button"
                    onClick={() => onToggleEquip(item.id)}
                    className={`btn ${item.isEquipped ? 'btn-gold' : 'btn-secondary'}`}
                    style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                  >
                    {item.isEquipped ? 'Desequipar' : 'Equipar'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
