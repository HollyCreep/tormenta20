import React, { useMemo, useState } from 'react';
import type { CharacterSpell } from '../../types/character';
import type { PowerSpellGrant } from '../../data/powerSpellGrants';
import { spellByName, spellOptionsForGrant, spellsFromGrant, type SpellGrantOwner } from '../../utils/powerSpells';
import { OptionPickerSheet, type PickerOption } from '../wizard/wizardUi';
import { cleanT20Text } from '../../utils/textUtils';

interface PowerSpellPickerProps {
  open: boolean;
  grant: PowerSpellGrant;
  owner: SpellGrantOwner;
  /** Quantas magias ainda faltam escolher para este poder. */
  remaining: number;
  onClose: () => void;
  onConfirm: (spells: CharacterSpell[]) => void;
}

const COST: Record<number, number> = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };

/**
 * Escolha das magias concedidas por um poder (Conhecimento Mágico, Centelha Mágica, Orar, Totem
 * Espiritual...). "Caso a habilidade não diga qual magia você aprende, você pode escolher qualquer
 * magia de um tipo e círculo que possa lançar com aquela classe" (Cap. 4, pág. 170).
 */
export const PowerSpellPicker: React.FC<PowerSpellPickerProps> = ({ open, grant, owner, remaining, onClose, onConfirm }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const options: PickerOption[] = useMemo(() => {
    if (grant.options) {
      return grant.options.map((o) => {
        const sp = spellByName(o.spell);
        return { id: o.label, title: o.label, subtitle: `Você pode lançar ${o.spell}${sp ? ` (${sp.circle}º círculo)` : ''}` };
      });
    }
    return spellOptionsForGrant(grant, owner).map((s) => ({
      id: s.id,
      title: cleanT20Text(s.name),
      subtitle: `${s.circle}º círculo · ${COST[s.circle] || 1} PM · ${s.school} · ${s.type}`,
      searchText: `${s.school} ${s.type} ${s.description}`,
    }));
  }, [grant, owner]);

  const max = grant.options ? 1 : remaining;
  const multiple = max > 1;
  const confirm = (ids: string[]) => {
    if (!ids.length) return;
    const spells = grant.options
      ? ids.map((id) => spellByName(grant.options!.find((o) => o.label === id)?.spell || '')).filter((s) => !!s)
      : spellOptionsForGrant(grant, owner).filter((s) => ids.includes(s.id));
    onConfirm(spellsFromGrant(grant, spells as NonNullable<(typeof spells)[number]>[]));
  };
  // Escolha única: o seletor chama onChange e fecha em seguida; múltipla: confirma ao concluir
  const change = (ids: string[]) => (multiple ? setSelected(ids) : confirm(ids));
  const close = () => {
    if (multiple) confirm(selected);
    setSelected([]);
    onClose();
  };

  const circleText =
    grant.choose?.circle === 'castable' ? 'de círculos que você pode lançar' : grant.choose ? `de ${grant.choose.circle}º círculo` : '';

  return (
    <OptionPickerSheet
      open={open}
      onClose={close}
      title={grant.options ? `${grant.power}: escolha o animal` : `${grant.power}: escolha ${max} magia${max > 1 ? 's' : ''}`}
      subtitle={grant.options ? `Cap. 1, pág. ${grant.page}` : `Magias ${circleText} — pág. ${grant.page}`}
      options={options}
      value={selected}
      onChange={change}
      multiple={multiple}
      max={max}
      searchPlaceholder="Buscar magia ou escola…"
      emptyText="Nenhuma magia disponível para este poder."
    />
  );
};
