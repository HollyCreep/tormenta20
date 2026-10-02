import React, { useState } from 'react';
import { ArrowLeftRight, Dices, Info, RotateCcw } from 'lucide-react';
import { ATTRIBUTES_LIST, POINT_BUY_COSTS, STANDARD_ARRAY } from '../../data/attributes';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { CharacterAttributes } from '../../types/character';
import type { AttributeKey } from '../../types/rules';
import type { DetailModalData } from '../common/DetailModal';
import { NumberStepper, Segmented } from '../ui/controls';
import { StepIntro } from './wizardUi';
import { formatSigned, percent } from '../../utils/displayNames';

type Method = 'point_buy' | 'standard' | 'roll' | 'free';

interface StepAttributesProps {
  method: Method;
  baseAttributes: CharacterAttributes;
  racialModifiers: CharacterAttributes;
  onSelectMethod: (method: Method) => void;
  onChangeBaseAttributes: (attrs: CharacterAttributes) => void;
  onOpenDetail?: (data: DetailModalData) => void;
}

const KEYS: AttributeKey[] = ['for', 'des', 'con', 'int', 'sab', 'car'];
const ZERO: CharacterAttributes = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };

/** Tabela 1-1: Atributos (T20 JdA, Cap. 1, pág. 17). */
const ATTRIBUTE_TABLE: { value: number; cost: string; roll: string }[] = [
  { value: -2, cost: '—', roll: '7 ou menos' },
  { value: -1, cost: '−1 ponto', roll: '8–9' },
  { value: 0, cost: '0 ponto', roll: '10–11' },
  { value: 1, cost: '1 ponto', roll: '12–13' },
  { value: 2, cost: '2 pontos', roll: '14–15' },
  { value: 3, cost: '4 pontos', roll: '16–17' },
  { value: 4, cost: '7 pontos', roll: '18' },
];

const AttributeTable: React.FC<{ highlight: 'cost' | 'roll'; values: number[] }> = ({ highlight, values }) => (
  <div className="stack-xs">
    <span className="attr-table-title">Tabela 1-1: Atributos</span>
    <table className="attr-table">
      <thead>
        <tr>
          <th scope="col">Atributo</th>
          <th scope="col" className={highlight === 'cost' ? 'is-focus' : ''}>
            Custo
          </th>
          <th scope="col" className={highlight === 'roll' ? 'is-focus' : ''}>
            Rolagem
          </th>
        </tr>
      </thead>
      <tbody>
        {ATTRIBUTE_TABLE.map((row) => {
          const inUse = values.filter((v) => v === row.value).length;
          return (
            <tr key={row.value} className={inUse ? 'is-used' : ''}>
              <td className="t-num">
                {formatSigned(row.value)}
                {inUse > 1 && <span className="attr-table-count">×{inUse}</span>}
              </td>
              <td className={highlight === 'cost' ? 'is-focus' : ''}>{row.cost}</td>
              <td className={highlight === 'roll' ? 'is-focus' : ''}>{row.roll}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/** 4d6 descartando o menor → modificador (tabela de rolagem do livro). */
const sumToMod = (sum: number) => (sum <= 7 ? -2 : sum <= 9 ? -1 : sum <= 11 ? 0 : sum <= 13 ? 1 : sum <= 15 ? 2 : sum <= 17 ? 3 : 4);

export const StepAttributes: React.FC<StepAttributesProps> = ({
  method,
  baseAttributes,
  racialModifiers,
  onSelectMethod,
  onChangeBaseAttributes,
  onOpenDetail,
}) => {
  const [rolled, setRolled] = useState<{ dice: number[]; sum: number; mod: number }[]>([]);
  const [swapFrom, setSwapFrom] = useState<AttributeKey | null>(null);

  const pointsSpent = Object.values(baseAttributes).reduce((acc, v) => acc + (POINT_BUY_COSTS[v] ?? 0), 0);
  const pointsRemaining = 10 - pointsSpent;
  const negativeCount = Object.values(baseAttributes).filter((v) => v < 0).length;

  const roll = () => {
    const results = KEYS.map(() => {
      const dice = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 6) + 1).sort((a, b) => a - b);
      const sum = dice[1] + dice[2] + dice[3];
      return { dice, sum, mod: sumToMod(sum) };
    });
    setRolled(results);
    onChangeBaseAttributes(KEYS.reduce((acc, k, i) => ({ ...acc, [k]: results[i].mod }), { ...ZERO }));
  };

  const changeMethod = (m: Method) => {
    setSwapFrom(null);
    onSelectMethod(m);
    if (m === 'point_buy') onChangeBaseAttributes({ ...ZERO });
    if (m === 'standard') onChangeBaseAttributes(KEYS.reduce((acc, k, i) => ({ ...acc, [k]: STANDARD_ARRAY[i] }), { ...ZERO }));
    if (m === 'roll') roll();
  };

  const pointBuyChange = (key: AttributeKey, next: number) => {
    const current = baseAttributes[key];
    if (next < -1 || next > 4) return;
    const diff = (POINT_BUY_COSTS[next] ?? 0) - (POINT_BUY_COSTS[current] ?? 0);
    if (pointsRemaining - diff < 0) return;
    onChangeBaseAttributes({ ...baseAttributes, [key]: next });
  };

  // Troca de valores entre atributos (conjunto padrão e rolagem)
  const tapSwap = (key: AttributeKey) => {
    if (!swapFrom) return setSwapFrom(key);
    if (swapFrom === key) return setSwapFrom(null);
    onChangeBaseAttributes({ ...baseAttributes, [swapFrom]: baseAttributes[key], [key]: baseAttributes[swapFrom] });
    setSwapFrom(null);
  };

  const openRule = () =>
    onOpenDetail?.({
      title: 'Definindo seus atributos',
      category: 'Regra oficial',
      subtitle: 'Capítulo 1 — Atributos (pág. 17)',
      description: [
        'Há duas maneiras de definir seus atributos: com pontos ou com rolagens.',
        'PONTOS. Todos os atributos começam em 0 e você recebe 10 pontos para aumentá-los. Custo de cada valor (Tabela 1-1): 1 → 1 ponto · 2 → 2 pontos · 3 → 4 pontos · 4 → 7 pontos. O valor máximo comprado é 4.',
        'UM ÚNICO −1. Você pode reduzir UM atributo para −1 para receber 1 ponto adicional (total de 11). Não dá para deixar dois atributos em −1, nem descer abaixo de −1 na compra de pontos.',
        'ROLAGENS. Role 4d6, descarte o menor e some os outros três; repita até ter seis números e converta-os pela Tabela 1-1 (7 ou menos: −2 · 8–9: −1 · 10–11: 0 · 12–13: 1 · 14–15: 2 · 16–17: 3 · 18: 4). Distribua os valores como quiser. Se a soma dos atributos for menor que 6, role novamente o menor valor; repita até a soma ser 6 ou mais.',
        'ATRIBUTOS MÍNIMOS. Um valor menor que −5 em um atributo gera um efeito: For ou Des (paralisado), Con (morre), Int ou Sab (inconsciente), Car (torna-se um NPC).',
        'Os modificadores de raça são somados depois, sobre o valor escolhido.',
      ].join('\n\n'),
      ruleCitation: RULES_CITATIONS.POINT_BUY_RULES,
    });

  return (
    <div className="stack-lg">
      <StepIntro
        title="Atributos"
        description="Em Tormenta 20 o valor do atributo já é o próprio modificador: Força 3 soma +3."
        action={
          onOpenDetail && (
            <button type="button" className="icon-btn" onClick={openRule} aria-label="Regras de atributos">
              <Info size={20} />
            </button>
          )
        }
      />

      <Segmented<Method>
        value={method}
        onChange={changeMethod}
        ariaLabel="Método de geração"
        options={[
          { value: 'point_buy', label: 'Pontos' },
          { value: 'standard', label: 'Padrão' },
          { value: 'roll', label: 'Rolagem' },
          { value: 'free', label: 'Livre' },
        ]}
      />

      {method === 'point_buy' && (
        <div className={`card budget-card${pointsRemaining < 0 ? ' is-over' : pointsRemaining === 0 ? ' is-done' : ''}`}>
          <div className="hstack between">
            <span className="stack-xs">
              <span className="hstack-xs">
                <span className="t-label">Pontos restantes</span>
                {onOpenDetail && (
                  <button type="button" className="info-btn" onClick={openRule} aria-label="Como funciona a compra de pontos">
                    <Info size={16} />
                  </button>
                )}
              </span>
              <span className="budget-value t-num">
                {pointsRemaining}
                <small>/10</small>
              </span>
            </span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChangeBaseAttributes({ ...ZERO })}>
              <RotateCcw size={16} />
              Zerar
            </button>
          </div>
          <span className="meter meter-gold" style={{ '--pct': percent(pointsSpent, 10) } as React.CSSProperties}>
            <span className="meter-fill" />
          </span>
          <AttributeTable highlight="cost" values={KEYS.map((k) => baseAttributes[k])} />
          <span className={`t-xs ${negativeCount > 0 ? 't-success' : 't-3'}`}>
            {negativeCount > 0 ? '−1 em uso: +1 ponto recebido (só um atributo pode ficar em −1).' : 'Deixe um único atributo em −1 para ganhar 1 ponto extra.'}
          </span>
        </div>
      )}

      {method === 'standard' && (
        <div className="callout">
          <ArrowLeftRight size={18} />
          <span>Conjunto {STANDARD_ARRAY.map(formatSigned).join(', ')}. Toque em dois atributos para trocar os valores.</span>
        </div>
      )}

      {method === 'roll' && (
        <div className="card stack-sm">
          <div className="hstack between">
            <span className="t-sm t-2">4d6, descartando o menor dado. Toque em dois atributos para trocar.</span>
            <button type="button" className="btn btn-secondary btn-sm shrink-0" onClick={roll}>
              <Dices size={16} />
              Rolar
            </button>
          </div>
          <AttributeTable highlight="roll" values={KEYS.map((k) => baseAttributes[k])} />
          {rolled.length > 0 && (
            <div className="chip-wrap">
              {rolled.map((r, i) => (
                <span key={i} className="badge t-mono">
                  [{r.dice.slice(1).join('+')}] = {r.sum} → {formatSigned(r.mod)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="list attr-list">
        {ATTRIBUTES_LIST.map((attr) => {
          const base = baseAttributes[attr.key] || 0;
          const racial = racialModifiers[attr.key] || 0;
          const total = base + racial;
          const nextCost = base < 4 ? (POINT_BUY_COSTS[base + 1] ?? 0) - (POINT_BUY_COSTS[base] ?? 0) : 0;
          const canDec = base > 0 || (base === 0 && negativeCount === 0);
          const isSwap = method === 'standard' || method === 'roll';
          return (
            <div key={attr.key} className={`attr-row${swapFrom === attr.key ? ' is-swapping' : ''}`}>
              <div className="attr-row-name">
                <span className="attr-row-key">{attr.shortName}</span>
                <span className="stack-xs" style={{ minWidth: 0 }}>
                  <span className="t-semibold truncate">{attr.name}</span>
                  <span className="t-xs t-3">
                    {racial !== 0 ? `Raça ${formatSigned(racial)}` : 'Sem bônus racial'}
                    {method === 'point_buy' && base < 4 ? ` · próximo +${nextCost} pt` : ''}
                  </span>
                </span>
                {onOpenDetail && (
                  <button
                    type="button"
                    className="info-btn"
                    aria-label={`Regras de ${attr.name}`}
                    onClick={() => {
                      const citation = RULES_CITATIONS['ATTR_' + attr.key.toUpperCase()];
                      onOpenDetail({
                        title: `${attr.name} (${attr.shortName})`,
                        category: 'Atributo básico',
                        description: `${attr.description}\n\nAfeta: ${attr.appliedTo.join(', ')}.`,
                        ruleCitation: citation,
                        stats: [
                          { label: 'Base', value: formatSigned(base) },
                          { label: 'Raça', value: formatSigned(racial) },
                          { label: 'Total', value: formatSigned(total) },
                        ],
                      });
                    }}
                  >
                    <Info size={16} />
                  </button>
                )}
              </div>
              <div className="attr-row-controls">
                {method === 'point_buy' && (
                  <NumberStepper
                    value={base}
                    onChange={(v) => pointBuyChange(attr.key, v)}
                    min={-1}
                    max={4}
                    format={formatSigned}
                    ariaLabel={attr.name}
                    decDisabled={!canDec || base <= -1}
                    incDisabled={base >= 4 || pointsRemaining < nextCost}
                    decTitle={!canDec ? 'Só um atributo pode ficar em −1' : undefined}
                  />
                )}
                {isSwap && (
                  <button
                    type="button"
                    className={`swap-chip t-num${swapFrom === attr.key ? ' is-active' : ''}`}
                    onClick={() => tapSwap(attr.key)}
                    aria-label={swapFrom ? `Trocar com ${attr.name}` : `Selecionar ${attr.name} para trocar`}
                  >
                    {formatSigned(base)}
                  </button>
                )}
                {method === 'free' && (
                  <NumberStepper value={base} onChange={(v) => onChangeBaseAttributes({ ...baseAttributes, [attr.key]: v })} min={-5} max={10} format={formatSigned} ariaLabel={attr.name} />
                )}
                <span className={`attr-total t-num${total > 0 ? ' is-positive' : total < 0 ? ' is-negative' : ''}`} aria-label={`Total ${formatSigned(total)}`}>
                  {formatSigned(total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
