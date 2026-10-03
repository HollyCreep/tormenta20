import React, { useState } from 'react';
import { AlertTriangle, Check, Info, Sun, UserX, Zap } from 'lucide-react';
import { DEITIES_LIST } from '../../data/deities';
import { canBeDevotee, grantedPowerCount } from '../../utils/rulesValidation';
import type { DetailModalData } from '../common/DetailModal';
import { Segmented } from '../ui/controls';
import { ChoiceCard, ChoiceSection, OptionPickerSheet, StepIntro, type PickerOption } from './wizardUi';
import type { CharacterSpell } from '../../types/character';
import { spellGrantFor, type PowerSpellGrant } from '../../data/powerSpellGrants';
import type { SpellGrantOwner } from '../../utils/powerSpells';
import { PowerSpellPicker } from '../sheet/PowerSpellPicker';

interface StepDeityProps {
  selectedDeityId: string;
  selectedDeityPowers: string[];
  characterClassId: string;
  characterRaceId?: string;
  onSelectDeity: (deityId: string) => void;
  onSelectDeityPowers: (powers: string[]) => void;
  /** Poderes já escolhidos em outros benefícios (nome → fonte). */
  takenPowers?: Map<string, string>;
  onOpenDetail: (data: DetailModalData) => void;
  /** Magias escolhidas para poderes concedidos que deixam escolher (Centelha Mágica). */
  powerSpells?: CharacterSpell[];
  onChangePowerSpells?: (spells: CharacterSpell[]) => void;
  spellOwner?: SpellGrantOwner;
}

export const StepDeity: React.FC<StepDeityProps> = ({
  selectedDeityId,
  selectedDeityPowers,
  characterClassId,
  characterRaceId,
  onSelectDeity,
  onSelectDeityPowers,
  onOpenDetail,
  takenPowers,
  powerSpells = [],
  onChangePowerSpells,
  spellOwner,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [grantPicker, setGrantPicker] = useState<PowerSpellGrant | null>(null);
  const deity = DEITIES_LIST.find((d) => d.id === selectedDeityId);
  const isDevout = !!deity;
  const isCleric = characterClassId === 'clerigo';
  // Devoto recebe 1 poder concedido; clérigos e druidas recebem 2 (Cap. 1, págs. 57, 61 e 96)
  const powerLimit = grantedPowerCount(characterClassId);

  const chooseDeity = (id: string) => {
    const d = DEITIES_LIST.find((x) => x.id === id);
    onSelectDeity(id);
    // Clérigos recebem todos os poderes concedidos; demais devotos começam com o primeiro
    onSelectDeityPowers([]);
    void d;
  };

  const togglePower = (name: string) => {
    const on = selectedDeityPowers.includes(name);
    if (powerLimit === 1) {
      onSelectDeityPowers(on ? [] : [name]);
      return;
    }
    if (on) onSelectDeityPowers(selectedDeityPowers.filter((p) => p !== name));
    else if (selectedDeityPowers.length < powerLimit) onSelectDeityPowers([...selectedDeityPowers, name]);
  };

  const options: PickerOption[] = DEITIES_LIST.map((d) => {
    const elig = canBeDevotee(d.id, characterRaceId || '', characterClassId || '');
    return {
      id: d.id,
      title: d.name,
      subtitle: d.title || d.allowedDevoteesText,
      meta: <span className="badge">Energia {d.energyChannel}</span>,
      searchText: `${d.description} ${d.allowedDevoteesText}`,
      disabled: !elig.ok,
      disabledReason: elig.reason,
    };
  });

  return (
    <div className="stack-lg">
      <StepIntro
        title="Divindade"
        description="Opcional. Devotos recebem poderes concedidos, mas devem seguir as obrigações do seu deus."
      />

      <Segmented<'devoto' | 'nenhum'>
        value={isDevout ? 'devoto' : 'nenhum'}
        onChange={(v) => {
          if (v === 'nenhum') {
            onSelectDeity('nenhum');
            onSelectDeityPowers([]);
          } else if (!isDevout) {
            setPickerOpen(true);
          }
        }}
        ariaLabel="Devoção"
        size="lg"
        options={[
          { value: 'devoto', label: 'Devoto', icon: <Sun size={16} /> },
          { value: 'nenhum', label: 'Sem divindade', icon: <UserX size={16} /> },
        ]}
      />

      {!deity ? (
        <div className="card stack-sm">
          <span className="eyebrow">Não devoto</span>
          <p className="t-sm t-2">
            Seu herói não segue nenhum deus do Panteão. Não recebe poderes concedidos, mas também não tem obrigações sagradas.
          </p>
          <button type="button" className="btn btn-secondary" onClick={() => setPickerOpen(true)}>
            Escolher uma divindade
          </button>
        </div>
      ) : (
        <>
          <ChoiceCard
            eyebrow="Seu deus"
            title={deity.name}
            subtitle={deity.title}
            description={deity.description}
            onChange={() => setPickerOpen(true)}
            badges={
              <>
                <span className="badge">Energia {deity.energyChannel}</span>
                <span className="badge">Arma: {deity.favoredWeapon}</span>
              </>
            }
          />

          <div className="kv card-inset" style={{ gridTemplateColumns: 'repeat(2, minmax(min(140px, 100%), 1fr))' }}>
            <div className="kv-item">
              <span className="kv-key">Símbolo</span>
              <span className="kv-value">{deity.symbol}</span>
            </div>
            <div className="kv-item">
              <span className="kv-key">Devotos</span>
              <span className="kv-value">{deity.allowedDevoteesText}</span>
            </div>
          </div>

          {deity.obligations && (
            <div className="callout callout-danger">
              <AlertTriangle size={18} />
              <div className="stack-xs">
                <span className="callout-title">Obrigações e restrições</span>
                <span>{deity.obligations}</span>
              </div>
            </div>
          )}

          <ChoiceSection
            title="Poderes concedidos"
            description={powerLimit > 1 ? `${isCleric ? 'Clérigos' : 'Druidas'} escolhem 2 poderes concedidos (em vez de 1).` : 'Escolha 1 poder concedido.'}
            count={{ value: selectedDeityPowers.length, total: powerLimit }}
          >
            <div className="list">
              {deity.grantedPowers.map((p) => {
                const on = selectedDeityPowers.includes(p.name);
                const takenBy = takenPowers?.get(p.name);
                return (
                  <div key={p.id} className={`row pick-row${on ? ' is-selected' : ''}${takenBy ? (on ? ' is-conflict' : ' is-disabled') : ''}`}>
                    <button
                      type="button"
                      role={powerLimit === 1 ? 'radio' : 'checkbox'}
                      aria-checked={on}
                      className="pick-main"
                      disabled={!!takenBy && !on}
                      onClick={() => togglePower(p.name)}
                    >
                      <span className={`mark${powerLimit === 1 ? ' mark-radio' : ''}${on ? ' is-on' : ''}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                      <span className="row-main">
                        <span className="row-title">{p.name}</span>
                        {takenBy ? (
                          <span className="t-xs t-warning">Já escolhido como benefício de {takenBy}</span>
                        ) : (
                          <span className="row-sub clamp-3">{p.description}</span>
                        )}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn-sm"
                      aria-label={`Detalhes de ${p.name}`}
                      onClick={() =>
                        onOpenDetail({
                          title: p.name,
                          category: `Poder concedido · ${deity.name}`,
                          prerequisites: p.prerequisites,
                          description: p.description,
                        })
                      }
                    >
                      <Info size={17} />
                    </button>
                  </div>
                );
              })}
            </div>
            {selectedDeityPowers.map((name) => {
              const g = spellGrantFor(name);
              if (!g) return null;
              const chosen = powerSpells.filter((sp) => sp.sourcePower === name);
              const needed = g.choose?.count || (g.options ? 1 : 0);
              return (
                <div key={name} className="card stack-xs">
                  <span className="t-label">
                    {name}: magia{(g.fixed?.length || needed) > 1 ? 's' : ''} (pág. {g.page})
                  </span>
                  {g.fixed ? (
                    <span className="t-sm t-2">
                      Você aprende e pode lançar {g.fixed.join(', ')} (atributo-chave {g.keyAttribute === 'car' ? 'Carisma' : 'Sabedoria'}).
                    </span>
                  ) : (
                    <>
                      {chosen.length > 0 && (
                        <div className="chip-wrap">
                          {chosen.map((sp) => (
                            <span key={sp.id} className="badge badge-mp">
                              <Zap size={12} />
                              {sp.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {onChangePowerSpells && spellOwner && (
                        <button type="button" className={`btn btn-sm ${chosen.length < needed ? 'btn-primary' : 'btn-tonal'}`} onClick={() => setGrantPicker(g)}>
                          <Zap size={16} />
                          {chosen.length ? 'Trocar magia' : 'Escolher magia'} ({chosen.length}/{needed})
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </ChoiceSection>
        </>
      )}

      {grantPicker && spellOwner && onChangePowerSpells && (
        <PowerSpellPicker
          open
          grant={grantPicker}
          owner={{ ...spellOwner, spells: [...(spellOwner.spells || []), ...powerSpells.filter((sp) => sp.sourcePower !== grantPicker.power)] }}
          remaining={grantPicker.choose?.count || 1}
          onClose={() => setGrantPicker(null)}
          onConfirm={(spells) => onChangePowerSpells([...powerSpells.filter((sp) => sp.sourcePower !== grantPicker.power), ...spells])}
        />
      )}

      <OptionPickerSheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Panteão de Arton"
        subtitle="20 divindades maiores"
        options={options}
        value={deity ? [deity.id] : []}
        onChange={([id]) => id && chooseDeity(id)}
        searchPlaceholder="Buscar deus ou domínio…"
      />
    </div>
  );
};
