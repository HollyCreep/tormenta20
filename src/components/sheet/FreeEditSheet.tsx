import React, { lazy, Suspense, useMemo, useState } from 'react';
import { History, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import type { CharacterPower, CharacterSheet, CharacterSpell, CustomAdjustments } from '../../types/character';
import type { AttributeKey } from '../../types/rules';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { SKILLS_LIST } from '../../data/skills';
import { CLASSES_LIST } from '../../data/classes';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';
import { CLASS_POWERS_LIST } from '../../data/classPowers';
import { SPELLS_LIST } from '../../data/spells';
import { recalculateFullCharacterSheet } from '../../utils/rulesEngine';
import { checkPowerPrerequisites } from '../../utils/rulesValidation';
import { prerequisiteContextFor } from '../../utils/characterContext';
import { computeChanges } from '../../services/changeDiff';
import { formatSigned } from '../../utils/displayNames';
import { cleanT20Text } from '../../utils/textUtils';
import { Sheet } from '../ui/Sheet';
import { NumberStepper, Segmented, SelectField, Switch } from '../ui/controls';
import { OptionPickerSheet, type PickerOption } from '../wizard/wizardUi';
import { POWER_CATEGORY_META } from '../common/T20Badge';

const AddItemModal = lazy(() => import('./AddItemModal').then((m) => ({ default: m.AddItemModal })));

interface FreeEditSheetProps {
  character: CharacterSheet;
  onClose: () => void;
  /** Salva a ficha editada; a auditoria registra cada alteração com o motivo. */
  onSave: (updated: CharacterSheet, reason: string) => void;
}

type Section = 'identidade' | 'atributos' | 'pericias' | 'estatisticas' | 'poderes' | 'magias' | 'itens';

const SECTIONS: { value: Section; label: string }[] = [
  { value: 'identidade', label: 'Dados' },
  { value: 'atributos', label: 'Atributos' },
  { value: 'pericias', label: 'Perícias' },
  { value: 'estatisticas', label: 'PV · PM · Defesa' },
  { value: 'poderes', label: 'Poderes' },
  { value: 'magias', label: 'Magias' },
  { value: 'itens', label: 'Itens' },
];

const STAT_ADJ: { key: keyof Omit<CustomAdjustments, 'skills'>; label: string; stat: keyof CharacterSheet['stats']; step?: number; unit?: string }[] = [
  { key: 'maxHp', label: 'PV máximos', stat: 'maxHp' },
  { key: 'maxMp', label: 'PM máximos', stat: 'maxMp' },
  { key: 'defense', label: 'Defesa', stat: 'defense' },
  { key: 'speed', label: 'Deslocamento', stat: 'speed', step: 1.5, unit: 'm' },
  { key: 'spaces', label: 'Espaços de carga', stat: 'maxSpaces' },
  { key: 'armorPenalty', label: 'Penalidade de armadura', stat: 'armorPenalty' },
];

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

/**
 * Edição livre da ficha: altera qualquer valor fora das regras automáticas (atributos, perícias,
 * ajustes de PV/PM/Defesa, poderes, magias, itens, nível e dados). As mudanças ficam num rascunho,
 * com prévia do que será registrado; ao salvar, cada uma entra na auditoria como "Edição livre".
 */
export const FreeEditSheet: React.FC<FreeEditSheetProps> = ({ character, onClose, onSave }) => {
  const [draft, setDraft] = useState<CharacterSheet>(() => recalculateFullCharacterSheet(clone(character)));
  const [section, setSection] = useState<Section>('identidade');
  const [reason, setReason] = useState('');
  const [showChanges, setShowChanges] = useState(false);
  const [powerPicker, setPowerPicker] = useState(false);
  const [spellPicker, setSpellPicker] = useState(false);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [customPower, setCustomPower] = useState({ name: '', description: '' });
  const [newClassId, setNewClassId] = useState('');

  const update = (fn: (d: CharacterSheet) => CharacterSheet) => setDraft((d) => recalculateFullCharacterSheet(fn(clone(d))));
  const changes = useMemo(() => computeChanges(character, draft, { freeEdit: true }), [character, draft]);

  /* ---------------- Classes e nível ---------------- */
  const classes = draft.classes?.length
    ? draft.classes
    : [{ classId: draft.classId, className: CLASSES_LIST.find((c) => c.id === draft.classId)?.name || draft.classId, level: draft.level, subclass: draft.classSubclass }];
  const setClasses = (next: typeof classes) =>
    update((d) => ({ ...d, classes: next, classId: next[0].classId, level: Math.min(20, next.reduce((a, c) => a + c.level, 0)) }));

  /* ---------------- Poderes ---------------- */
  const prereqCtx = useMemo(() => prerequisiteContextFor(draft), [draft]);
  const powerOptions: PickerOption[] = useMemo(
    () => [
      ...GENERAL_POWERS_LIST.map((p) => {
        const pre = checkPowerPrerequisites(p.id, prereqCtx);
        return {
          id: `g:${p.id}`,
          title: p.name,
          subtitle: `${pre.isMet ? '' : `⚠ Falta: ${pre.unmetRequirements.join(', ')} · `}${p.description}`,
          meta: <span className="badge">{POWER_CATEGORY_META[p.category]?.label || p.category}</span>,
          searchText: `${p.category} ${p.prerequisites || ''}`,
        };
      }),
      ...CLASS_POWERS_LIST.map((p) => {
        const pre = checkPowerPrerequisites(p.id, prereqCtx);
        return {
          id: `c:${p.id}`,
          title: p.name,
          subtitle: `${pre.isMet ? '' : `⚠ Falta: ${pre.unmetRequirements.join(', ')} · `}${p.description}`,
          meta: <span className="badge badge-class">{p.className}</span>,
          searchText: `${p.className} ${p.prerequisites || ''}`,
        };
      }),
    ],
    [prereqCtx]
  );
  const addPower = (optId: string) => {
    const [kind, id] = [optId.slice(0, 1), optId.slice(2)];
    const power: CharacterPower | undefined =
      kind === 'g'
        ? (() => {
            const p = GENERAL_POWERS_LIST.find((x) => x.id === id)!;
            return { id: p.id, name: p.name, source: p.category === 'concedido' ? 'divindade' : 'geral', description: p.description, type: p.category };
          })()
        : (() => {
            const p = CLASS_POWERS_LIST.find((x) => x.id === id)!;
            return { id: p.id, name: p.name, source: 'classe', description: p.description };
          })();
    if (power) update((d) => ({ ...d, powers: [...(d.powers || []), power] }));
  };

  /* ---------------- Magias ---------------- */
  const casterClass = classes.find((c) => CLASSES_LIST.find((x) => x.id === c.classId)?.spellcaster)?.classId;
  const spellOptions: PickerOption[] = SPELLS_LIST.filter((s) => !(draft.spells || []).some((x) => x.id === s.id && !x.isFormula)).map((s) => ({
    id: s.id,
    title: s.name,
    subtitle: `${s.circle}º círculo · ${s.school} · ${s.type}`,
    searchText: `${s.school} ${s.type}`,
  }));
  const addSpell = (id: string) => {
    const s = SPELLS_LIST.find((x) => x.id === id);
    if (!s) return;
    // Classe conjuradora define limite de PM e atributo-chave; sem classe, conta como outra fonte (Cap. 5, pág. 224)
    const sp: CharacterSpell = casterClass
      ? { ...s, learnedFrom: 'classe', sourceClassId: casterClass }
      : { ...s, learnedFrom: 'poder', sourcePower: 'Edição livre' };
    update((d) => ({ ...d, spells: [...(d.spells || []), sp] }));
  };

  const setAdj = (key: keyof Omit<CustomAdjustments, 'skills'>, v: number) =>
    update((d) => ({ ...d, customAdjustments: { ...(d.customAdjustments || {}), [key]: v || undefined } }));
  const setSkillAdj = (id: string, v: number) =>
    update((d) => ({ ...d, customAdjustments: { ...(d.customAdjustments || {}), skills: { ...(d.customAdjustments?.skills || {}), [id]: v } } }));

  const save = () => {
    onSave(draft, reason.trim());
  };

  return (
    <>
      <Sheet
        open
        onClose={onClose}
        title="Edição livre"
        subtitle={`${draft.name} · alterações fora das regras automáticas, todas auditadas`}
        icon={<Pencil size={22} />}
        size="lg"
        full
        dismissible={false}
        toolbar={<Segmented<Section> value={section} onChange={setSection} ariaLabel="Seção" options={SECTIONS} />}
        footer={
          <div className="stack-sm" style={{ width: '100%' }}>
            {showChanges && changes.length > 0 && (
              <ul className="free-edit-changes">
                {changes.map((c, i) => (
                  <li key={i}>
                    <strong>{c.title}</strong>
                    {c.diff?.length ? (
                      <span className="t-xs t-3">
                        {' '}
                        — {c.diff.map((d) => `${d.field}: ${d.from} → ${d.to}`).join('; ')}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <input
              className="free-edit-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Motivo da alteração (vai para a auditoria)"
              aria-label="Motivo da alteração"
            />
            <div className="hstack">
              <button type="button" className="btn btn-secondary" onClick={() => setShowChanges((v) => !v)} disabled={!changes.length}>
                <History size={18} />
                {changes.length} alteraç{changes.length === 1 ? 'ão' : 'ões'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                <X size={18} />
                Descartar
              </button>
              <button type="button" className="btn btn-primary grow" onClick={save} disabled={!changes.length}>
                <Save size={18} />
                Salvar
              </button>
            </div>
          </div>
        }
      >
        {section === 'identidade' && (
          <div className="stack-lg">
            <section className="card stack">
              <span className="eyebrow">Identidade</span>
              <label className="field">
                <span className="field-label">Nome</span>
                <input value={draft.name} onChange={(e) => update((d) => ({ ...d, name: e.target.value }))} />
              </label>
              <div className="grid-2">
                <label className="field">
                  <span className="field-label">Jogador</span>
                  <input value={draft.playerName} onChange={(e) => update((d) => ({ ...d, playerName: e.target.value }))} />
                </label>
                <label className="field">
                  <span className="field-label">Conceito</span>
                  <input value={draft.concept || ''} onChange={(e) => update((d) => ({ ...d, concept: e.target.value }))} />
                </label>
              </div>
              <div className="grid-2">
                <label className="field">
                  <span className="field-label">XP</span>
                  <input type="number" inputMode="numeric" value={draft.xp} onChange={(e) => update((d) => ({ ...d, xp: Math.max(0, parseInt(e.target.value, 10) || 0) }))} />
                </label>
                <label className="field">
                  <span className="field-label">Tibares (T$)</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={draft.tibares}
                    onChange={(e) => update((d) => ({ ...d, tibares: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                  />
                </label>
              </div>
            </section>

            <section className="card stack">
              <span className="eyebrow">Classes e nível · personagem de {draft.level}º nível</span>
              {classes.map((c, i) => (
                <div key={c.classId} className="hstack between">
                  <span className="t-semibold">{CLASSES_LIST.find((x) => x.id === c.classId)?.name || c.className}</span>
                  <div className="hstack-xs">
                    <NumberStepper
                      value={c.level}
                      min={1}
                      max={20}
                      ariaLabel={`Nível de ${c.className}`}
                      onChange={(v) => setClasses(classes.map((x, j) => (j === i ? { ...x, level: v } : x)))}
                    />
                    {i > 0 && (
                      <button type="button" className="icon-btn icon-btn-sm" aria-label={`Remover ${c.className}`} onClick={() => setClasses(classes.filter((_, j) => j !== i))}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="hstack">
                <SelectField
                  value={newClassId}
                  onChange={setNewClassId}
                  ariaLabel="Adicionar classe"
                  options={[
                    { value: '', label: 'Adicionar classe…' },
                    ...CLASSES_LIST.filter((x) => !classes.some((c) => c.classId === x.id)).map((x) => ({ value: x.id, label: x.name })),
                  ]}
                />
                <button
                  type="button"
                  className="btn btn-tonal btn-sm"
                  disabled={!newClassId}
                  onClick={() => {
                    const cls = CLASSES_LIST.find((x) => x.id === newClassId)!;
                    setClasses([...classes, { classId: cls.id, className: cls.name, level: 1, subclass: undefined }]);
                    setNewClassId('');
                  }}
                >
                  <Plus size={16} />
                  Adicionar
                </button>
              </div>
              <p className="t-xs t-3">
                A edição livre não aplica habilidades, poderes ou magias do nível. Para seguir as regras, use “Subir de nível”.
              </p>
            </section>

            <section className="card stack">
              <span className="eyebrow">Aparência e história</span>
              <label className="field">
                <span className="field-label">Aparência</span>
                <textarea rows={3} value={draft.bio?.appearance || ''} onChange={(e) => update((d) => ({ ...d, bio: { ...d.bio, appearance: e.target.value } }))} />
              </label>
              <label className="field">
                <span className="field-label">Personalidade e histórico</span>
                <textarea rows={4} value={draft.bio?.history || ''} onChange={(e) => update((d) => ({ ...d, bio: { ...d.bio, history: e.target.value } }))} />
              </label>
            </section>
          </div>
        )}

        {section === 'atributos' && (
          <section className="card stack">
            <span className="eyebrow">Atributos (o valor é o modificador — Cap. 1, pág. 17)</span>
            {ATTRIBUTES_LIST.map((a) => (
              <div key={a.key} className="hstack between">
                <span>
                  <span className="t-semibold">{a.name}</span>
                  {character.totalAttributes[a.key] !== draft.totalAttributes[a.key] && (
                    <span className="t-xs t-3"> (era {formatSigned(character.totalAttributes[a.key])})</span>
                  )}
                </span>
                <NumberStepper
                  value={draft.totalAttributes[a.key]}
                  min={-10}
                  max={20}
                  format={formatSigned}
                  ariaLabel={a.name}
                  onChange={(v) => update((d) => ({ ...d, totalAttributes: { ...d.totalAttributes, [a.key as AttributeKey]: v } }))}
                />
              </div>
            ))}
          </section>
        )}

        {section === 'pericias' && (
          <section className="card stack-sm">
            <span className="eyebrow">Treino e ajustes (o ajuste aparece como “Ajuste manual” no detalhamento)</span>
            {SKILLS_LIST.map((sk) => {
              const s = draft.skills?.[sk.id];
              return (
                <div key={sk.id} className="free-edit-skill">
                  <span className="grow">
                    <span className="t-semibold">{sk.name}</span>
                    <span className="t-xs t-3"> {sk.attribute.toUpperCase()} · total {formatSigned(s?.total ?? 0)}</span>
                  </span>
                  <Switch
                    checked={!!s?.isTrained}
                    ariaLabel={`${sk.name} treinada`}
                    onChange={(v) => update((d) => ({ ...d, skills: { ...d.skills, [sk.id]: { ...d.skills[sk.id], isTrained: v } } }))}
                  />
                  <NumberStepper
                    value={draft.customAdjustments?.skills?.[sk.id] || 0}
                    format={formatSigned}
                    ariaLabel={`Ajuste de ${sk.name}`}
                    onChange={(v) => setSkillAdj(sk.id, v)}
                  />
                </div>
              );
            })}
          </section>
        )}

        {section === 'estatisticas' && (
          <div className="stack-lg">
            <section className="card stack">
              <span className="eyebrow">Ajustes manuais (somados ao valor calculado)</span>
              {STAT_ADJ.map((st) => {
                const value = (draft.stats[st.stat] as { value: number })?.value ?? 0;
                return (
                  <div key={st.key} className="hstack between">
                    <span>
                      <span className="t-semibold">{st.label}</span>
                      <span className="t-xs t-3">
                        {' '}
                        = {value}
                        {st.unit || ''}
                      </span>
                    </span>
                    <NumberStepper
                      value={draft.customAdjustments?.[st.key] || 0}
                      step={st.step || 1}
                      format={(v) => `${formatSigned(v)}${st.unit || ''}`}
                      ariaLabel={`Ajuste de ${st.label}`}
                      onChange={(v) => setAdj(st.key, v)}
                    />
                  </div>
                );
              })}
            </section>
            <section className="card stack">
              <span className="eyebrow">Valores atuais</span>
              {(
                [
                  ['currentHp', 'PV atuais', draft.stats.maxHp.value],
                  ['tempHp', 'PV temporários', 999],
                  ['currentMp', 'PM atuais', draft.stats.maxMp.value],
                ] as const
              ).map(([k, label, max]) => (
                <div key={k} className="hstack between">
                  <span className="t-semibold">{label}</span>
                  <NumberStepper
                    value={draft.stats[k]}
                    min={k === 'currentHp' ? -99 : 0}
                    max={max}
                    ariaLabel={label}
                    onChange={(v) => update((d) => ({ ...d, stats: { ...d.stats, [k]: v } }))}
                  />
                </div>
              ))}
            </section>
          </div>
        )}

        {section === 'poderes' && (
          <div className="stack-lg">
            <div className="hstack">
              <button type="button" className="btn btn-tonal" onClick={() => setPowerPicker(true)}>
                <Plus size={18} />
                Adicionar poder do livro
              </button>
            </div>
            <section className="card stack-sm">
              <span className="eyebrow">Poder personalizado</span>
              <input value={customPower.name} onChange={(e) => setCustomPower({ ...customPower, name: e.target.value })} placeholder="Nome" aria-label="Nome do poder" />
              <textarea
                rows={2}
                value={customPower.description}
                onChange={(e) => setCustomPower({ ...customPower, description: e.target.value })}
                placeholder="Descrição"
                aria-label="Descrição do poder"
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={!customPower.name.trim()}
                onClick={() => {
                  const name = customPower.name.trim();
                  update((d) => ({
                    ...d,
                    powers: [...(d.powers || []), { id: `custom_${name.toLowerCase().replace(/\W+/g, '_')}_${(d.powers || []).length}`, name, source: 'geral', description: customPower.description.trim(), type: 'personalizado' }],
                  }));
                  setCustomPower({ name: '', description: '' });
                }}
              >
                <Plus size={16} />
                Adicionar personalizado
              </button>
            </section>
            <div className="list">
              {(draft.powers || []).map((p, i) => (
                <div key={`${p.id}-${i}`} className="row">
                  <span className="row-main">
                    <span className="row-title">{cleanT20Text(p.name)}</span>
                    <span className="row-sub clamp-2">{cleanT20Text(p.description)}</span>
                  </span>
                  <button
                    type="button"
                    className="icon-btn icon-btn-sm"
                    aria-label={`Remover ${p.name}`}
                    onClick={() => update((d) => ({ ...d, powers: d.powers.filter((_, j) => j !== i) }))}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'magias' && (
          <div className="stack-lg">
            <div className="hstack">
              <button type="button" className="btn btn-tonal" onClick={() => setSpellPicker(true)}>
                <Plus size={18} />
                Adicionar magia
              </button>
            </div>
            <p className="t-xs t-3">
              {casterClass
                ? `Magias adicionadas contam como de ${CLASSES_LIST.find((c) => c.id === casterClass)?.name} (limite de PM e atributo-chave da classe).`
                : 'Sem classe conjuradora: magias adicionadas contam como de outra fonte (limite de PM = nível de personagem).'}
            </p>
            <div className="list">
              {(draft.spells || []).map((s, i) => (
                <div key={`${s.id}-${i}`} className="row">
                  <span className="row-main">
                    <span className="row-title">
                      {s.name}
                      {s.isFormula ? ' (fórmula)' : ''}
                    </span>
                    <span className="row-sub">
                      {s.circle}º círculo · {s.school}
                      {s.sourcePower ? ` · ${s.sourcePower}` : ''}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="icon-btn icon-btn-sm"
                    aria-label={`Remover ${s.name}`}
                    onClick={() => update((d) => ({ ...d, spells: d.spells.filter((_, j) => j !== i) }))}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'itens' && (
          <div className="stack-lg">
            <div className="hstack">
              <button type="button" className="btn btn-tonal" onClick={() => setAddItemOpen(true)}>
                <Plus size={18} />
                Adicionar item
              </button>
            </div>
            <div className="list">
              {(draft.inventory || []).map((it) => (
                <div key={it.id} className="row">
                  <span className="row-main">
                    <span className="row-title">{it.name}</span>
                    <span className="row-sub">
                      {it.spaces} esp. {it.isEquipped ? '· equipado' : ''}
                    </span>
                  </span>
                  <NumberStepper
                    value={it.quantity || 1}
                    min={1}
                    ariaLabel={`Quantidade de ${it.name}`}
                    onChange={(v) => update((d) => ({ ...d, inventory: d.inventory.map((x) => (x.id === it.id ? { ...x, quantity: v } : x)) }))}
                  />
                  <button
                    type="button"
                    className="icon-btn icon-btn-sm"
                    aria-label={`Remover ${it.name}`}
                    onClick={() => update((d) => ({ ...d, inventory: d.inventory.filter((x) => x.id !== it.id) }))}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Sheet>

      <OptionPickerSheet
        open={powerPicker}
        onClose={() => setPowerPicker(false)}
        title="Adicionar poder"
        subtitle="Edição livre: pré-requisitos não são exigidos, mas aparecem como aviso"
        options={powerOptions}
        value={[]}
        onChange={([id]) => id && addPower(id)}
        searchPlaceholder="Buscar poder, classe ou categoria…"
      />
      <OptionPickerSheet
        open={spellPicker}
        onClose={() => setSpellPicker(false)}
        title="Adicionar magia"
        options={spellOptions}
        value={[]}
        onChange={([id]) => id && addSpell(id)}
        searchPlaceholder="Buscar magia ou escola…"
      />
      <Suspense fallback={null}>
        {addItemOpen && (
          <AddItemModal
            character={draft}
            isOpen
            onClose={() => setAddItemOpen(false)}
            onSaveCharacter={(u) => {
              setDraft(recalculateFullCharacterSheet(u));
              setAddItemOpen(false);
            }}
          />
        )}
      </Suspense>
    </>
  );
};
