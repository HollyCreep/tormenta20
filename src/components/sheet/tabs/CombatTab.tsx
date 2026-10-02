import React, { useState } from 'react';
import { Backpack, Crosshair, Dices, Flame, Info, Sword, Target, Zap } from 'lucide-react';
import type { CharacterInventoryItem, CharacterSheet } from '../../../types/character';
import { calculateWeaponAttack, calculateWeaponDamage } from '../../../utils/rulesEngine';
import { RULES_CITATIONS } from '../../../data/rulesCitations';
import { EmptyState, SectionHeader } from '../../ui/controls';
import { CalcSheet } from '../../common/StatBreakdownBadge';
import type { DetailModalData } from '../../common/DetailModal';
import { formatSigned } from '../../../utils/displayNames';

interface CombatTabProps {
  character: CharacterSheet;
  onRollAttack: (weapon: CharacterInventoryItem) => void;
  onRollDamage: (weapon: CharacterInventoryItem) => void;
  onRollSkill: (skillName: string, totalMod: number, formula: string) => void;
  onGoToInventory: () => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

/** Testes mais usados em combate (todos são perícias em T20 — Cap. 2, pág. 114). */
const QUICK_SKILLS: { id: string; short: string; icon: React.ReactNode }[] = [
  { id: 'iniciativa', short: 'Iniciativa', icon: <Zap size={15} /> },
  { id: 'percepcao', short: 'Percepção', icon: <Target size={15} /> },
  { id: 'fortitude', short: 'Fortitude', icon: <Flame size={15} /> },
  { id: 'reflexos', short: 'Reflexos', icon: <Crosshair size={15} /> },
  { id: 'vontade', short: 'Vontade', icon: <Dices size={15} /> },
];

export const CombatTab: React.FC<CombatTabProps> = ({
  character,
  onRollAttack,
  onRollDamage,
  onRollSkill,
  onGoToInventory,
  onSetModalDetail,
}) => {
  const [calcFor, setCalcFor] = useState<CharacterInventoryItem | null>(null);
  const equippedWeapons = character.inventory.filter((item) => item.isEquipped && item.category.startsWith('arma_'));
  const calcAttack = calcFor ? calculateWeaponAttack(character, calcFor) : null;

  return (
    <div className="stack-lg">
      {/* Testes rápidos */}
      <section className="stack-sm">
        <SectionHeader title="Testes rápidos" as="h3" />
        <div className="quick-rolls">
          {QUICK_SKILLS.map((qs) => {
            const sk = character.skills[qs.id];
            if (!sk) return null;
            return (
              <button
                key={qs.id}
                type="button"
                className="roll-tile"
                onClick={() => onRollSkill(sk.name, sk.total, sk.breakdown.formula)}
                aria-label={`Rolar ${sk.name}: 1d20 ${formatSigned(sk.total)}`}
              >
                <span className="roll-tile-label">
                  {qs.icon}
                  {qs.short}
                </span>
                <span className="roll-tile-value t-num">{formatSigned(sk.total)}</span>
                {sk.isTrained && <span className="roll-tile-dot" aria-label="Treinada" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Armas */}
      <section className="stack-sm">
        <SectionHeader
          title="Armas empunhadas"
          as="h3"
          action={
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() =>
                onSetModalDetail({
                  title: RULES_CITATIONS.WEAPON_ATTACK_DAMAGE.title,
                  category: 'Regra oficial',
                  description: RULES_CITATIONS.WEAPON_ATTACK_DAMAGE.explanation,
                  ruleCitation: RULES_CITATIONS.WEAPON_ATTACK_DAMAGE,
                  initialTab: 'rules',
                })
              }
            >
              <Info size={14} />
              Regras
            </button>
          }
        />

        {equippedWeapons.length === 0 ? (
          <EmptyState
            icon={<Sword size={24} />}
            title="Nenhuma arma equipada"
            description="Equipe uma arma na mochila para atacar e rolar dano direto daqui."
            action={
              <button type="button" className="btn btn-secondary" onClick={onGoToInventory}>
                <Backpack size={18} />
                Abrir mochila
              </button>
            }
          />
        ) : (
          <div className="grid-auto">
            {equippedWeapons.map((wp) => {
              const attack = calculateWeaponAttack(character, wp);
              const damage = calculateWeaponDamage(character, wp);
              return (
                <article key={wp.id} className="card weapon-card">
                  <div className="hstack between items-start">
                    <div className="stack-xs grow">
                      <span className="weapon-name">{wp.name}</span>
                      <span className="t-xs t-3">
                        {attack.isMelee ? 'Corpo a corpo' : 'À distância'}
                        {wp.damageType ? ` · ${wp.damageType}` : ''}
                        {wp.range ? ` · ${wp.range}` : ''}
                      </span>
                    </div>
                    {(wp.appliedModifiers?.length || wp.specialMaterial) && (
                      <span className="badge badge-gold">
                        {wp.specialMaterial || `${wp.appliedModifiers?.length} melhoria${(wp.appliedModifiers?.length || 0) > 1 ? 's' : ''}`}
                      </span>
                    )}
                  </div>

                  <div className="weapon-stats">
                    <button type="button" className="weapon-stat" onClick={() => setCalcFor(wp)} aria-label="Ver cálculo do ataque">
                      <span className="stat-label">Ataque</span>
                      <span className="weapon-stat-value t-num">{formatSigned(attack.value)}</span>
                    </button>
                    <div className="weapon-stat">
                      <span className="stat-label">Dano</span>
                      <span className="weapon-stat-value t-mono">{damage ? damage.formula : '—'}</span>
                    </div>
                    <div className="weapon-stat">
                      <span className="stat-label">Crítico</span>
                      <span className="weapon-stat-value t-mono">{wp.critical || 'x2'}</span>
                    </div>
                  </div>

                  {attack.conditionReasons.length > 0 && (
                    <p className="t-xs t-danger">Condições no ataque: {attack.conditionReasons.join(', ')}</p>
                  )}

                  <div className="hstack">
                    <button type="button" className="btn btn-primary grow" onClick={() => onRollAttack(wp)}>
                      <Dices size={18} />
                      Atacar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary grow"
                      onClick={() => onRollDamage(wp)}
                      disabled={!damage}
                    >
                      <Flame size={18} />
                      Dano
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {calcFor && calcAttack && (
        <CalcSheet open={!!calcFor} onClose={() => setCalcFor(null)} label={`Ataque — ${calcFor.name}`} breakdown={calcAttack} />
      )}
    </div>
  );
};
