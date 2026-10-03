import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { BLOODLINES, BLOODLINE_PAGE, DRACONIC_DAMAGE, TIER_LABEL, type BloodlineTier } from '../../data/bloodlines';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { SPELLS_LIST } from '../../data/spells';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import type { CharacterBloodline } from '../../types/character';
import type { AttributeKey } from '../../types/rules';
import { FEERICA_SPELL_GRANT } from '../../utils/bloodline';
import { checkPowerPrerequisites, type PrerequisiteContext } from '../../utils/rulesValidation';
import type { SpellGrantOwner } from '../../utils/powerSpells';
import { PowerSpellPicker } from '../sheet/PowerSpellPicker';
import { ChoiceSection, OptionPickerSheet, SelectedChips, type PickerOption } from './wizardUi';

interface BloodlinePickerProps {
  value?: CharacterBloodline;
  onChange: (b: CharacterBloodline | undefined) => void;
  /** Ficha para a escolha da magia feérica (não repetir magias conhecidas). */
  spellOwner: SpellGrantOwner;
  /** Pré-requisitos do poder da Tormenta da Linhagem Rubra. */
  prerequisiteContext?: PrerequisiteContext;
  /** Poderes que o personagem já tem (não pode receber o mesmo poder da Tormenta duas vezes). */
  ownedPowers?: string[];
}

const TIERS: BloodlineTier[] = ['basica', 'aprimorada', 'superior'];

/**
 * Escolha da linhagem sobrenatural do feiticeiro (Cap. 1, pág. 39) e das opções da herança básica:
 * tipo de dano (Dracônica), magia de encantamento/ilusão (Feérica) ou poder da Tormenta e atributo
 * perdido (Rubra).
 */
export const BloodlinePicker: React.FC<BloodlinePickerProps> = ({ value, onChange, spellOwner, prerequisiteContext, ownedPowers = [] }) => {
  const [spellOpen, setSpellOpen] = useState(false);
  const [powerOpen, setPowerOpen] = useState(false);

  const choose = (id: CharacterBloodline['id']) => {
    if (value?.id === id) return;
    onChange({ id, ...(id === 'rubra' ? { tormentaAttribute: 'car' as AttributeKey } : {}) });
  };

  const tormentaOptions: PickerOption[] = GENERAL_POWERS_LIST.filter((p) => p.category === 'tormenta').map((p) => {
    const owned = ownedPowers.includes(p.name);
    const prereq = prerequisiteContext ? checkPowerPrerequisites(p.id, prerequisiteContext) : { isMet: true, unmetRequirements: [] };
    return {
      id: p.name,
      title: p.name,
      subtitle: p.description,
      disabled: owned || !prereq.isMet,
      disabledReason: owned ? 'Você já tem este poder.' : `Falta: ${prereq.unmetRequirements.join(', ')}`,
      searchText: p.prerequisites,
    };
  });

  const spell = SPELLS_LIST.find((s) => s.id === value?.spellId);

  return (
    <div className="stack-lg">
      <ChoiceSection
        title="Linhagem sobrenatural"
        description={`"Ao escolher o caminho do feiticeiro, escolha uma linhagem. Você recebe a herança básica de sua linhagem e pode desenvolver as demais através de poderes de arcanista" (Herança Aprimorada e Herança Superior) — Cap. 1, pág. ${BLOODLINE_PAGE}.`}
        count={{ value: value ? 1 : 0, total: 1 }}
      >
        <div className="list">
          {BLOODLINES.map((b) => {
            const on = value?.id === b.id;
            return (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={on}
                className={`row pick-row items-start${on ? ' is-selected' : ''}`}
                onClick={() => choose(b.id)}
              >
                <span className="pick-main">
                  <span className={`mark mark-radio${on ? ' is-on' : ''}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                  <span className="row-main">
                    <span className="row-title">{b.name}</span>
                    <span className="row-sub">{b.intro}</span>
                    {TIERS.map((t) => (
                      <span key={t} className={`t-xs ${t === 'basica' ? 't-2' : 't-3'}`}>
                        <strong>{TIER_LABEL[t]}.</strong> {b.tiers[t]}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </ChoiceSection>

      {value?.id === 'draconica' && (
        <ChoiceSection title="Tipo de dano" description="Redução de dano 5 a este tipo (imunidade na herança superior)." count={{ value: value.damageType ? 1 : 0, total: 1 }}>
          <div className="chip-wrap">
            {DRACONIC_DAMAGE.map((d) => (
              <button
                key={d.id}
                type="button"
                className="chip"
                aria-pressed={value.damageType === d.id}
                onClick={() => onChange({ ...value, damageType: d.id })}
              >
                {d.label}
              </button>
            ))}
          </div>
        </ChoiceSection>
      )}

      {value?.id === 'feerica' && (
        <ChoiceSection
          title="Herança básica feérica"
          description="Você se torna treinado em Enganação e aprende uma magia de 1º círculo de encantamento ou ilusão, arcana ou divina."
          count={{ value: value.spellId ? 1 : 0, total: 1 }}
        >
          <SelectedChips
            labels={spell ? [{ id: spell.id, label: spell.name }] : []}
            placeholder="Escolher magia"
            onOpen={() => setSpellOpen(true)}
            onRemove={() => onChange({ ...value, spellId: undefined })}
          />
        </ChoiceSection>
      )}

      {value?.id === 'rubra' && (
        <ChoiceSection
          title="Herança básica rubra"
          description="Você recebe um poder da Tormenta (cumprindo os pré-requisitos) e pode perder outro atributo em vez de Carisma por poderes da Tormenta."
          count={{ value: value.tormentaPower ? 1 : 0, total: 1 }}
        >
          <SelectedChips
            labels={value.tormentaPower ? [{ id: value.tormentaPower, label: value.tormentaPower }] : []}
            placeholder="Escolher poder da Tormenta"
            onOpen={() => setPowerOpen(true)}
            onRemove={() => onChange({ ...value, tormentaPower: undefined })}
          />
          <div className="stack-xs">
            <span className="t-sm t-semibold">Atributo perdido pelos poderes da Tormenta</span>
            <div className="chip-wrap">
              {ATTRIBUTES_LIST.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  className="chip"
                  aria-pressed={(value.tormentaAttribute || 'car') === a.key}
                  onClick={() => onChange({ ...value, tormentaAttribute: a.key })}
                >
                  {a.shortName}
                </button>
              ))}
            </div>
          </div>
        </ChoiceSection>
      )}

      {spellOpen && value?.id === 'feerica' && (
        <PowerSpellPicker
          open
          grant={FEERICA_SPELL_GRANT}
          owner={spellOwner}
          remaining={1}
          onClose={() => setSpellOpen(false)}
          onConfirm={([sp]) => sp && onChange({ ...value, spellId: sp.id })}
        />
      )}

      <OptionPickerSheet
        open={powerOpen}
        onClose={() => setPowerOpen(false)}
        title="Linhagem Rubra: poder da Tormenta"
        subtitle="Cap. 2, págs. 136–137"
        options={tormentaOptions}
        value={value?.tormentaPower ? [value.tormentaPower] : []}
        onChange={([name]) => name && value && onChange({ ...value, tormentaPower: name })}
        searchPlaceholder="Buscar poder…"
      />
    </div>
  );
};
