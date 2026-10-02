import React from 'react';
import { Sword, Dices } from 'lucide-react';
import type { CharacterSheet } from '../../../types/character';

interface CombatTabProps {
  character: CharacterSheet;
  onRollAttack: (weaponName: string, attackBonus: number, isMelee?: boolean) => void;
  onRollDamage: (weaponName: string, damageFormula?: string) => void;
}

export const CombatTab: React.FC<CombatTabProps> = ({
  character,
  onRollAttack,
  onRollDamage,
}) => {
  const equippedWeapons = character.inventory.filter(
    (item) => item.isEquipped && item.category.startsWith('arma_') && !item.category.startsWith('armadura')
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3
          style={{
            fontSize: '1.2rem',
            color: 'var(--t20-gold-light)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Sword size={18} />
          Armas & Ataques Equipados
        </h3>

        {equippedWeapons.length === 0 ? (
          <div className="t20-card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            Nenhuma arma equipada no momento. Vá até a aba <strong>Inventário</strong> e equipe uma arma!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {equippedWeapons.map((wp) => {
              // Ataque: Luta (se corpo a corpo) ou Pontaria (se distância)
              const isRanged = wp.subcategory === 'distancia';
              const skillKey = isRanged ? 'pontaria' : 'luta';
              const skillData = character.skills[skillKey];
              const attackBonus = skillData ? skillData.total : 0;

              return (
                <div
                  key={wp.id}
                  className="t20-card t20-card-gold"
                  style={{
                    padding: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>{wp.name}</h4>
                      <span className="badge badge-gold">{wp.subcategory || 'Corpo a corpo'}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                      {wp.description}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Ataque Total:</div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          color: 'var(--t20-gold-light)',
                          fontSize: '1.1rem',
                        }}
                      >
                        {attackBonus >= 0 ? `+${attackBonus}` : attackBonus}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Dano:</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#f87171', fontSize: '1.1rem' }}>
                        {wp.damage || '1d6'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Crítico:</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fbbf24', fontSize: '1.1rem' }}>
                        {wp.critical || 'x2'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => onRollAttack(wp.name, attackBonus, !isRanged)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem', gap: '0.35rem' }}
                    >
                      <Dices size={14} />
                      Rolar Ataque
                    </button>
                    <button
                      type="button"
                      onClick={() => onRollDamage(wp.name, wp.damage)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem', gap: '0.35rem' }}
                    >
                      Rolar Dano
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
