import React, { useState } from 'react';
import { ATTRIBUTES_LIST, POINT_BUY_COSTS, STANDARD_ARRAY } from '../../data/attributes';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { CharacterAttributes } from '../../types/character';
import { AttributeKey } from '../../types/rules';
import { Dices, RotateCcw, AlertTriangle, Check, Calculator, Sparkles, Info } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepAttributesProps {
  method: 'point_buy' | 'standard' | 'roll' | 'free';
  baseAttributes: CharacterAttributes;
  racialModifiers: CharacterAttributes;
  onSelectMethod: (method: 'point_buy' | 'standard' | 'roll' | 'free') => void;
  onChangeBaseAttributes: (attrs: CharacterAttributes) => void;
  onOpenDetail?: (data: DetailModalData) => void;
}

export const StepAttributes: React.FC<StepAttributesProps> = ({
  method,
  baseAttributes,
  racialModifiers,
  onSelectMethod,
  onChangeBaseAttributes,
  onOpenDetail,
}) => {
  // Estado para o método de Rolagem (4d6 drop lowest)
  const [rolledValues, setRolledValues] = useState<{ raw: number[]; sum: number; mod: number }[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  // Calcula o total de pontos gastos na Compra de Pontos
  const calculatePointsSpent = (attrs: CharacterAttributes): number => {
    let spent = 0;
    Object.values(attrs).forEach((val) => {
      spent += POINT_BUY_COSTS[val] ?? 0;
    });
    return spent;
  };

  const pointsSpent = calculatePointsSpent(baseAttributes);
  const pointsRemaining = 10 - pointsSpent;

  // Ajusta atributo na Compra de Pontos
  const handlePointBuyChange = (attrKey: AttributeKey, delta: number) => {
    const currentVal = baseAttributes[attrKey] || 0;
    const newVal = currentVal + delta;

    if (newVal < -1 || newVal > 4) return;

    const currentCost = POINT_BUY_COSTS[currentVal] ?? 0;
    const newCost = POINT_BUY_COSTS[newVal] ?? 0;
    const costDiff = newCost - currentCost;

    if (pointsRemaining - costDiff < 0) return;

    onChangeBaseAttributes({
      ...baseAttributes,
      [attrKey]: newVal,
    });
  };

  // Reseta para 0
  const handleResetAttributes = () => {
    onChangeBaseAttributes({ for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 });
  };

  // Simulador de Rolagem 4d6 drop lowest (Tabela 1-1, p. 23)
  const roll4d6DropLowest = () => {
    setIsRolling(true);
    setTimeout(() => {
      const rollsList: { raw: number[]; sum: number; mod: number }[] = [];
      for (let i = 0; i < 6; i++) {
        const dice = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ].sort((a, b) => a - b);
        const sum = dice[1] + dice[2] + dice[3];

        let mod = 0;
        if (sum <= 7) mod = -2;
        else if (sum <= 9) mod = -1;
        else if (sum <= 11) mod = 0;
        else if (sum <= 13) mod = 1;
        else if (sum <= 15) mod = 2;
        else if (sum <= 17) mod = 3;
        else mod = 4;

        rollsList.push({ raw: dice, sum, mod });
      }

      setRolledValues(rollsList);
      setIsRolling(false);

      // Aplica automaticamente na ordem aos 6 atributos
      const keys: AttributeKey[] = ['for', 'des', 'con', 'int', 'sab', 'car'];
      const newAttrs = { ...baseAttributes };
      keys.forEach((k, idx) => {
        newAttrs[k] = rollsList[idx].mod;
      });
      onChangeBaseAttributes(newAttrs);
    }, 400);
  };

  // Conjunto Padrão
  const handleApplyStandardArray = () => {
    onChangeBaseAttributes({
      for: 3,
      des: 2,
      con: 1,
      int: 1,
      sab: 0,
      car: -1,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 5: Defina seus Atributos</h2>
        <p>
          Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma medem as capacidades biológicas e mentais do seu aventureiro. No Tormenta 20 Edição Jogo do Ano, o valor do atributo já é o próprio modificador!
        </p>
      </div>

      {/* Seletor de Método de Geração */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => {
            onSelectMethod('point_buy');
            handleResetAttributes();
          }}
          className={`btn ${method === 'point_buy' ? 'btn-gold' : 'btn-secondary'}`}
          style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}
        >
          Compra de Pontos (10 pts - Padrão)
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectMethod('standard');
            handleApplyStandardArray();
          }}
          className={`btn ${method === 'standard' ? 'btn-gold' : 'btn-secondary'}`}
          style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}
        >
          Conjunto Padrão (3, 2, 1, 1, 0, -1)
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectMethod('roll');
            if (rolledValues.length === 0) roll4d6DropLowest();
          }}
          className={`btn ${method === 'roll' ? 'btn-gold' : 'btn-secondary'}`}
          style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}
        >
          <Dices size={16} />
          Rolagens (4d6 descarta menor)
        </button>
        <button
          type="button"
          onClick={() => onSelectMethod('free')}
          className={`btn ${method === 'free' ? 'btn-gold' : 'btn-secondary'}`}
          style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}
        >
          Livre / Personalizado
        </button>
      </div>

      {/* Painel do Método de Compra de Pontos */}
      {method === 'point_buy' && (
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calculator size={18} style={{ color: 'var(--t20-gold)' }} />
                <strong style={{ color: '#ffffff', fontSize: '1rem' }}>Orçamento de Compra de Pontos:</strong>
              </div>
              {onOpenDetail && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenDetail({
                      title: 'Regras de Compra de Pontos (Atributos)',
                      category: 'Regra Oficial • Tormenta 20 JDA',
                      subtitle: 'Capítulo 1: Construção de Personagem — Definindo seus Atributos (pág. 17)',
                      description:
                        'Você começa com todos os atributos em 0 e recebe 10 pontos para aumentá-los. O custo de cada valor é cumulativo: 0 (0 pt), 1 (1 pt), 2 (2 pts), 3 (4 pts), 4 (7 pts). Você também pode reduzir no máximo um atributo para -1 para receber 1 ponto adicional.',
                      ruleCitation: RULES_CITATIONS.POINT_BUY_RULES,
                    })
                  }
                  className="btn btn-ghost"
                  style={{
                    padding: '0.15rem 0.4rem',
                    fontSize: '0.75rem',
                    color: 'var(--t20-gold)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                  title="Ver citação completa da regra de atributos no manual oficial"
                >
                  <Info size={13} />
                  <span>Ver Regra no Manual (pág. 17)</span>
                </button>
              )}
            </div>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Custos: -1 (+1 pt) • 0 (0 pt) • 1 (1 pt) • 2 (2 pts) • 3 (4 pts) • 4 (7 pts). Apenas um atributo pode ser reduzido para -1.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: pointsRemaining === 0 ? '#34d399' : pointsRemaining < 0 ? '#f87171' : 'var(--t20-gold-light)',
              }}
            >
              {pointsRemaining} / 10 pts restantes
            </div>
            <button
              type="button"
              onClick={handleResetAttributes}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', gap: '0.3rem' }}
              title="Resetar todos para 0"
            >
              <RotateCcw size={14} />
              Resetar
            </button>
          </div>
        </div>
      )}

      {/* Painel do Método de Rolagem */}
      {method === 'roll' && (
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)' }}>
              Rolagens de 4d6 (descartando o menor dado):
            </span>
            <button
              type="button"
              disabled={isRolling}
              onClick={roll4d6DropLowest}
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Dices size={16} />
              {isRolling ? 'Rolando dados...' : 'Rolar Novamente'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
            {rolledValues.map((r, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Soma: {r.sum}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
                  {r.mod >= 0 ? `+${r.mod}` : r.mod}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grade dos 6 Atributos Interativos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}
      >
        {ATTRIBUTES_LIST.map((attr) => {
          const baseVal = baseAttributes[attr.key] || 0;
          const racialMod = racialModifiers[attr.key] || 0;
          const totalVal = baseVal + racialMod;

          return (
            <div
              key={attr.key}
              className="t20-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.1rem',
                border: totalVal >= 3 ? '1px solid var(--border-gold)' : '1px solid var(--border-color)',
                background: totalVal >= 3 ? 'rgba(245, 158, 11, 0.05)' : 'var(--bg-card)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-fantasy)', color: '#ffffff' }}>
                      {attr.shortName}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{attr.name}</span>
                  </div>
                  {onOpenDetail && (
                    <button
                      type="button"
                      onClick={() => {
                        const citationKey = 'ATTR_' + attr.key.toUpperCase();
                        const citation = RULES_CITATIONS[citationKey];
                        onOpenDetail({
                          title: `${attr.name} (${attr.shortName})`,
                          category: 'Atributo Básico • Tormenta 20 JDA',
                          subtitle: `Cálculo: Base (${baseVal >= 0 ? '+' + baseVal : baseVal}) + Raça (${racialMod >= 0 ? '+' + racialMod : racialMod}) = Total (${totalVal >= 0 ? '+' + totalVal : totalVal})`,
                          description:
                            attr.description +
                            '\n\n' +
                            (citation ? citation.explanation : '') +
                            `\n\nTestes e regras associadas: ${attr.appliedTo.join(', ')}.`,
                          ruleCitation: citation,
                          stats: [
                            { label: 'Valor Base', value: baseVal >= 0 ? `+${baseVal}` : baseVal },
                            { label: 'Modificador Racial', value: racialMod >= 0 ? `+${racialMod}` : racialMod },
                            { label: 'Valor Total', value: totalVal >= 0 ? `+${totalVal}` : totalVal },
                          ],
                        });
                      }}
                      className="btn btn-ghost"
                      style={{ padding: '0.2rem', color: 'var(--t20-gold)', cursor: 'pointer' }}
                      title={`Ver regras completas, cálculos e aplicações de ${attr.name}`}
                    >
                      <Info size={15} />
                    </button>
                  )}
                </div>

                {/* Valor Total Destacado */}
                <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: totalVal > 0 ? 'var(--t20-gold-light)' : totalVal < 0 ? '#f87171' : '#cbd5e1',
                      lineHeight: 1,
                    }}
                  >
                    {totalVal > 0 ? `+${totalVal}` : totalVal}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                    Valor Total (Modificador)
                  </div>
                </div>

                {/* Decomposição Base + Raça */}
                <div
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '0.45rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span>Base: <strong>{baseVal > 0 ? `+${baseVal}` : baseVal}</strong></span>
                  <span>Raça: <strong style={{ color: racialMod > 0 ? '#34d399' : racialMod < 0 ? '#f87171' : 'inherit' }}>{racialMod > 0 ? `+${racialMod}` : racialMod}</strong></span>
                </div>
              </div>

              {/* Controles de Ajuste */}
              {method === 'point_buy' && (() => {
                const nextVal = baseVal + 1;
                const nextCost = nextVal <= 4 ? (POINT_BUY_COSTS[nextVal] ?? 0) - (POINT_BUY_COSTS[baseVal] ?? 0) : 999;
                const hasNegativeOther = Object.entries(baseAttributes).some(([k, v]) => v < 0 && k !== attr.key);
                const disabledPlus = baseVal >= 4 || pointsRemaining < nextCost;
                const disabledMinus = baseVal <= -1 || (baseVal === 0 && hasNegativeOther);

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                      <button
                        type="button"
                        disabled={disabledMinus}
                        onClick={() => handlePointBuyChange(attr.key, -1)}
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '0.35rem', fontSize: '1.1rem', fontWeight: 800 }}
                        title={baseVal === 0 && hasNegativeOther ? 'Apenas um atributo pode ser reduzido para -1' : 'Diminuir atributo'}
                      >
                        -
                      </button>
                      <div style={{ textAlign: 'center', minWidth: '75px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--t20-gold-light)' }}>
                          Base: {baseVal >= 0 ? `+${baseVal}` : baseVal}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                          {POINT_BUY_COSTS[baseVal]} pt gasto
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={disabledPlus}
                        onClick={() => handlePointBuyChange(attr.key, 1)}
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '0.35rem', fontSize: '1.1rem', fontWeight: 800 }}
                        title={
                          baseVal >= 4
                            ? 'Valor máximo permitido na compra de pontos (4)'
                            : pointsRemaining < nextCost
                            ? `Pontos insuficientes (necessário ${nextCost} pt, você tem ${pointsRemaining})`
                            : `Aumentar para ${baseVal + 1} (custo: ${nextCost} pt)`
                        }
                      >
                        +
                      </button>
                    </div>
                    {baseVal < 4 && (
                      <div style={{ fontSize: '0.65rem', textAlign: 'center', color: pointsRemaining >= nextCost ? 'var(--text-dim)' : '#f87171' }}>
                        Próximo nível: <strong>+{nextCost} pt</strong>
                      </div>
                    )}
                  </div>
                );
              })()}

              {method === 'free' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    min="-5"
                    max="10"
                    value={baseVal}
                    onChange={(e) =>
                      onChangeBaseAttributes({
                        ...baseAttributes,
                        [attr.key]: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0.35rem' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
