import React, { useMemo, useState } from 'react';
import { Gauge, Sparkles, Wand2, Zap } from 'lucide-react';
import type { CharacterSheet, CharacterSpell } from '../../../types/character';
import { cleanT20Text } from '../../../utils/textUtils';
import { ExecutionBadge, SchoolBadge } from '../../common/T20Badge';
import type { DetailModalData } from '../../common/DetailModal';
import { CalcSheet } from '../../common/StatBreakdownBadge';
import { EmptyState, SearchField } from '../../ui/controls';
import {
  calculateMaxSpellCost,
  calculateSpellSaveDc,
  getSpellcastingKeyAttribute,
} from '../../../utils/rulesEngine';
import { ATTRIBUTES_LIST } from '../../../data/attributes';

// Custo canônico base por círculo (T20 JDA, Cap. 4: Magia, pág. 178)
export const BASE_SPELL_COST_BY_CIRCLE: Record<number, number> = {
  1: 1,
  2: 3,
  3: 6,
  4: 10,
  5: 15,
};

interface SpellsTabProps {
  character: CharacterSheet;
  onCastStandardSpell: (spell: CharacterSpell) => void;
  onSelectCastSpell: (spell: CharacterSpell) => void;
  onSetModalDetail: (data: DetailModalData) => void;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const SpellsTab: React.FC<SpellsTabProps> = ({ character, onCastStandardSpell, onSelectCastSpell, onSetModalDetail }) => {
  const [search, setSearch] = useState('');
  const [calc, setCalc] = useState<'dc' | 'limit' | null>(null);

  const keyAttr = getSpellcastingKeyAttribute(character.classId, character.classSubclass);
  const keyAttrName = ATTRIBUTES_LIST.find((a) => a.key === keyAttr)?.name || keyAttr.toUpperCase();
  const dc = calculateSpellSaveDc(character.level, character.totalAttributes[keyAttr] || 0, keyAttrName);
  const limit = calculateMaxSpellCost(character.level);

  const q = normalize(search.trim());
  const grouped = useMemo(() => {
    const spells = (character.spells || []).filter(
      (sp) => !q || normalize(`${sp.name} ${sp.school} ${sp.description}`).includes(q)
    );
    const byCircle = new Map<number, CharacterSpell[]>();
    spells.forEach((sp) => {
      const c = sp.circle || 1;
      byCircle.set(c, [...(byCircle.get(c) || []), sp]);
    });
    return [...byCircle.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([circle, list]) => [circle, list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))] as const);
  }, [character.spells, q]);

  const openDetail = (sp: CharacterSpell) => {
    const baseCost = BASE_SPELL_COST_BY_CIRCLE[sp.circle || 1] || 1;
    onSetModalDetail({
      title: cleanT20Text(sp.name),
      category: `Magia ${sp.type} · ${sp.circle || 1}º círculo`,
      subtitle: `${sp.school} · ${sp.execution}`,
      cost: `${baseCost} PM`,
      execution: sp.execution,
      range: sp.range,
      duration: sp.duration,
      resistance: sp.resistance,
      targetArea: sp.targetArea,
      description: cleanT20Text(sp.description),
      upgrades: sp.upgrades,
    });
  };

  return (
    <div className="stack">
      <div className="spell-summary">
        <div className="spell-summary-item">
          <span className="stat-label">
            <Sparkles size={13} />
            PM
          </span>
          <span className="spell-summary-value t-num t-mp">
            {character.stats.currentMp}
            <small>/{character.stats.maxMp.value}</small>
          </span>
        </div>
        <button type="button" className="spell-summary-item" onClick={() => setCalc('dc')}>
          <span className="stat-label">
            <Wand2 size={13} />
            CD
          </span>
          <span className="spell-summary-value t-num">{dc.value}</span>
        </button>
        <button type="button" className="spell-summary-item" onClick={() => setCalc('limit')}>
          <span className="stat-label">
            <Gauge size={13} />
            Limite
          </span>
          <span className="spell-summary-value t-num">
            {limit.maxCost}
            <small> PM</small>
          </span>
        </button>
      </div>

      {(character.spells || []).length > 6 && <SearchField value={search} onChange={setSearch} placeholder="Buscar magia…" />}

      {grouped.length === 0 ? (
        <EmptyState icon={<Zap size={24} />} title="Nenhuma magia encontrada" description="Ajuste a busca para ver o grimório." />
      ) : (
        grouped.map(([circle, spells]) => (
          <section key={circle} className="stack-sm">
            <div className="section-head">
              <h3 className="section-title t-md">{circle}º círculo</h3>
              <span className="badge badge-mp">{BASE_SPELL_COST_BY_CIRCLE[circle] || 1} PM base</span>
            </div>
            <div className="list">
              {spells.map((sp, idx) => {
                const baseCost = BASE_SPELL_COST_BY_CIRCLE[sp.circle || 1] || 1;
                const canCast = character.stats.currentMp >= baseCost;
                return (
                  <div key={sp.id || `${sp.name}-${idx}`} className="row spell-row">
                    <button type="button" className="spell-main has-detail" onClick={() => openDetail(sp)}>
                      <span className="row-title">{cleanT20Text(sp.name)}</span>
                      <span className="hstack-xs wrap">
                        <SchoolBadge school={sp.school} />
                        {sp.execution && <ExecutionBadge execution={sp.execution} />}
                      </span>
                    </button>
                    <div className="spell-actions">
                      <button
                        type="button"
                        className="btn btn-sm btn-tonal"
                        onClick={() => onCastStandardSpell(sp)}
                        disabled={!canCast}
                        aria-label={`Lançar ${sp.name} por ${baseCost} PM`}
                      >
                        <Zap size={15} />
                        {baseCost}
                      </button>
                      {sp.upgrades && sp.upgrades.length > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-ghost"
                          onClick={() => onSelectCastSpell(sp)}
                          aria-label={`Lançar ${sp.name} com aprimoramentos`}
                        >
                          <Wand2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}

      {calc && (
        <CalcSheet
          open={!!calc}
          onClose={() => setCalc(null)}
          label={calc === 'dc' ? 'CD de resistência das magias' : 'Limite de PM por magia'}
          breakdown={calc === 'dc' ? dc : limit.breakdown}
          unit={calc === 'limit' ? 'PM' : ''}
        />
      )}
    </div>
  );
};
