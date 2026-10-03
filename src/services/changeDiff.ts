import type { CharacterChangeLogEntry, CharacterSheet } from '../types/character';
import { ATTRIBUTES_LIST } from '../data/attributes';
import { SKILLS_LIST } from '../data/skills';
import { CLASSES_LIST } from '../data/classes';
import { RACES_LIST } from '../data/races';
import { ORIGINS_LIST } from '../data/origins';
import { DEITIES_LIST } from '../data/deities';
import { CONDITIONS_LIST } from '../data/conditions';

export interface ChangeLogOptions {
  spellCast?: {
    spellName: string;
    pmCost: number;
    upgrades?: string[];
    circle?: number;
  };
  actionReason?: string;
  customTitle?: string;
  customDescription?: string;
  /** Alteração feita pela edição livre da ficha. */
  freeEdit?: boolean;
  /** Origem da alteração para a auditoria (ex.: "Criador de personagem"). */
  origin?: string;
}

/** Entrada de auditoria ainda sem id/data (gerada pelo diff). */
export type ChangeDraft = Omit<CharacterChangeLogEntry, 'id' | 'timestamp' | 'timeFormatted' | 'dateFormatted' | 'characterId' | 'characterName' | 'userName'>;

const fmt = (v: unknown): string | number => {
  if (v === undefined || v === null || v === '') return '—';
  if (typeof v === 'number' || typeof v === 'string') return v;
  if (typeof v === 'boolean') return v ? 'sim' : 'não';
  return JSON.stringify(v);
};
const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);
const nameOf = <T extends { id: string; name: string }>(list: T[], id?: string) => list.find((x) => x.id === id)?.name || id || '—';

/** Contagem por chave (poderes repetíveis e itens podem aparecer mais de uma vez). */
const counts = (keys: string[]) => keys.reduce((m, k) => m.set(k, (m.get(k) || 0) + 1), new Map<string, number>());

/**
 * Compara duas versões da ficha e descreve cada alteração para a auditoria. É pura (não salva nada):
 * serve tanto para registrar quanto para mostrar a prévia na edição livre.
 */
export function computeChanges(oldSheet: CharacterSheet, newSheet: CharacterSheet, options?: ChangeLogOptions): ChangeDraft[] {
  if (!oldSheet || !newSheet || oldSheet.id !== newSheet.id) return [];
  const out: ChangeDraft[] = [];
  // Na edição livre o motivo vai em `reason` e a descrição mantém o detalhe da mudança;
  // nas ações do jogo (ex.: "Escriba Arcano: copiou...") o motivo é a própria descrição.
  const reason = options?.freeEdit ? undefined : options?.actionReason;
  const push = (e: ChangeDraft) => out.push(e);

  // 1. Identidade
  const identity: [string, unknown, unknown][] = [
    ['Nome', oldSheet.name, newSheet.name],
    ['Jogador', oldSheet.playerName, newSheet.playerName],
    ['Conceito', oldSheet.concept, newSheet.concept],
    ['XP', oldSheet.xp, newSheet.xp],
    ['Raça', nameOf(RACES_LIST, oldSheet.raceId), nameOf(RACES_LIST, newSheet.raceId)],
    ['Origem', nameOf(ORIGINS_LIST, oldSheet.originId), nameOf(ORIGINS_LIST, newSheet.originId)],
    ['Divindade', nameOf(DEITIES_LIST, oldSheet.deityId), nameOf(DEITIES_LIST, newSheet.deityId)],
    ['Caminho/subclasse', oldSheet.classSubclass, newSheet.classSubclass],
    ['Linhagem', oldSheet.bloodline?.id, newSheet.bloodline?.id],
  ];
  const idDiff = identity.filter(([, a, b]) => fmt(a) !== fmt(b)).map(([field, a, b]) => ({ field, from: fmt(a), to: fmt(b) }));
  if (idDiff.length) {
    push({
      changeType: 'geral',
      title: idDiff.length === 1 ? `${idDiff[0].field} alterado` : 'Dados do personagem alterados',
      description: reason || idDiff.map((d) => `${d.field}: ${d.from} → ${d.to}`).join('; '),
      diff: idDiff,
    });
  }

  // 2. Nível e classes
  const classLabel = (s: CharacterSheet) =>
    (s.classes?.length ? s.classes : [{ classId: s.classId, level: s.level }]).map((c) => `${nameOf(CLASSES_LIST, c.classId)} ${c.level}`).join(' / ');
  if (oldSheet.level !== newSheet.level) {
    push({
      changeType: 'nivel',
      title: `Nível ${oldSheet.level} ➔ ${newSheet.level}`,
      description: reason || `O personagem passou para o nível ${newSheet.level} (${classLabel(newSheet)}).`,
      diff: [
        { field: 'Nível', from: oldSheet.level, to: newSheet.level },
        ...(classLabel(oldSheet) !== classLabel(newSheet) ? [{ field: 'Classes', from: classLabel(oldSheet), to: classLabel(newSheet) }] : []),
      ],
    });
  } else if (classLabel(oldSheet) !== classLabel(newSheet)) {
    push({
      changeType: 'nivel',
      title: 'Classes alteradas',
      description: reason || `Classes: ${classLabel(newSheet)}.`,
      diff: [{ field: 'Classes', from: classLabel(oldSheet), to: classLabel(newSheet) }],
    });
  }

  // 3. Atributos
  const attrDiff = ATTRIBUTES_LIST.filter((a) => (oldSheet.totalAttributes?.[a.key] ?? 0) !== (newSheet.totalAttributes?.[a.key] ?? 0)).map((a) => ({
    field: a.name,
    from: signed(oldSheet.totalAttributes?.[a.key] ?? 0),
    to: signed(newSheet.totalAttributes?.[a.key] ?? 0),
  }));
  if (attrDiff.length) {
    push({
      changeType: 'atributos',
      title: attrDiff.length === 1 ? `${attrDiff[0].field}: ${attrDiff[0].from} ➔ ${attrDiff[0].to}` : 'Atributos alterados',
      description: reason || attrDiff.map((d) => `${d.field} ${d.from} → ${d.to}`).join('; '),
      diff: attrDiff,
    });
  }

  // 4. Perícias (treino e ajustes)
  const skillDiff: { field: string; from: string | number; to: string | number }[] = [];
  SKILLS_LIST.forEach((sk) => {
    const a = !!oldSheet.skills?.[sk.id]?.isTrained;
    const b = !!newSheet.skills?.[sk.id]?.isTrained;
    if (a !== b) skillDiff.push({ field: `${sk.name} (treino)`, from: a ? 'treinada' : 'não treinada', to: b ? 'treinada' : 'não treinada' });
    const ao = oldSheet.customAdjustments?.skills?.[sk.id] || 0;
    const bo = newSheet.customAdjustments?.skills?.[sk.id] || 0;
    if (ao !== bo) skillDiff.push({ field: `${sk.name} (ajuste)`, from: signed(ao), to: signed(bo) });
  });
  if (skillDiff.length) {
    push({
      changeType: 'pericias',
      title: skillDiff.length === 1 ? `Perícia alterada: ${skillDiff[0].field}` : 'Perícias alteradas',
      description: reason || skillDiff.map((d) => `${d.field}: ${d.from} → ${d.to}`).join('; '),
      diff: skillDiff,
    });
  }

  // 5. Ajustes manuais de estatísticas
  const STAT_ADJ: [keyof NonNullable<CharacterSheet['customAdjustments']>, string][] = [
    ['maxHp', 'PV máximos'],
    ['maxMp', 'PM máximos'],
    ['defense', 'Defesa'],
    ['speed', 'Deslocamento (m)'],
    ['spaces', 'Espaços de carga'],
    ['armorPenalty', 'Penalidade de armadura'],
  ];
  const statDiff = STAT_ADJ.filter(([k]) => (oldSheet.customAdjustments?.[k] || 0) !== (newSheet.customAdjustments?.[k] || 0)).map(([k, label]) => ({
    field: `${label} (ajuste)`,
    from: signed((oldSheet.customAdjustments?.[k] as number) || 0),
    to: signed((newSheet.customAdjustments?.[k] as number) || 0),
  }));
  if (statDiff.length) {
    push({
      changeType: 'estatisticas',
      title: 'Ajustes manuais de estatísticas',
      description: reason || statDiff.map((d) => `${d.field}: ${d.from} → ${d.to}`).join('; '),
      diff: statDiff,
    });
  }

  // 6. Recursos (PV / PV temporário / PM)
  if (oldSheet.stats.currentHp !== newSheet.stats.currentHp) {
    const d = newSheet.stats.currentHp - oldSheet.stats.currentHp;
    push({
      changeType: 'recursos',
      title: d < 0 ? `Dano Sofrido (${d} PV)` : `Cura Recebida (+${d} PV)`,
      description: reason || `Pontos de Vida alterados de ${oldSheet.stats.currentHp} para ${newSheet.stats.currentHp} (Máx: ${newSheet.stats.maxHp.value}).`,
      diff: [{ field: 'PV Atual', from: oldSheet.stats.currentHp, to: newSheet.stats.currentHp }],
    });
  }
  const oldTemp = oldSheet.stats?.tempHp || 0;
  const newTemp = newSheet.stats?.tempHp || 0;
  if (oldTemp !== newTemp) {
    const d = newTemp - oldTemp;
    push({
      changeType: 'recursos',
      title: d > 0 ? `PV Temporário Adicionado (+${d} PV Temp)` : `PV Temporário Consumido (${d} PV Temp)`,
      description:
        reason ||
        (d > 0
          ? `Adicionados ${d} pontos de vida temporários (Saldo: ${newTemp} PV Temp).`
          : `Consumidos ${Math.abs(d)} pontos de vida temporários (Saldo restante: ${newTemp} PV Temp).`),
      diff: [{ field: 'PV Temporário', from: oldTemp, to: newTemp }],
    });
  }
  if (oldSheet.stats.currentMp !== newSheet.stats.currentMp) {
    const d = newSheet.stats.currentMp - oldSheet.stats.currentMp;
    if (d < 0 && options?.spellCast) {
      const sp = options.spellCast;
      const upg = sp.upgrades && sp.upgrades.length > 0 ? ` (Aprimoramentos: ${sp.upgrades.join(', ')})` : '';
      push({
        changeType: 'magias',
        title: `Lançamento da magia ${sp.spellName}`,
        description: `Lançou a magia "${sp.spellName}"${upg} consumindo ${sp.pmCost} PM (Mana restante: ${newSheet.stats.currentMp}/${newSheet.stats.maxMp.value}).`,
        diff: [{ field: 'PM Atual', from: oldSheet.stats.currentMp, to: newSheet.stats.currentMp }],
      });
    } else {
      push({
        changeType: 'recursos',
        title: d < 0 ? `Gasto de Mana (${d} PM)` : `Recuperação de Mana (+${d} PM)`,
        description: reason || `Pontos de Mana alterados de ${oldSheet.stats.currentMp} para ${newSheet.stats.currentMp} (Máx: ${newSheet.stats.maxMp.value}).`,
        diff: [{ field: 'PM Atual', from: oldSheet.stats.currentMp, to: newSheet.stats.currentMp }],
      });
    }
  }

  // 7. Poderes (adicionados e removidos, contando repetições)
  const oldPowers = counts((oldSheet.powers || []).map((p) => p.name));
  const newPowers = counts((newSheet.powers || []).map((p) => p.name));
  newPowers.forEach((n, name) => {
    const added = n - (oldPowers.get(name) || 0);
    const p = (newSheet.powers || []).find((x) => x.name === name)!;
    for (let i = 0; i < added; i++)
      push({ changeType: 'poderes', title: `Novo Poder Adquirido: ${name}`, description: reason || `Aprendeu o poder "${name}" (${p.source || 'geral'}).` });
  });
  oldPowers.forEach((n, name) => {
    const removed = n - (newPowers.get(name) || 0);
    for (let i = 0; i < removed; i++) push({ changeType: 'poderes', title: `Poder Removido: ${name}`, description: reason || `O poder "${name}" foi removido da ficha.` });
  });
  // Texto de poder editado (ex.: herança da linhagem atualizada)
  (newSheet.powers || []).forEach((p) => {
    const before = (oldSheet.powers || []).find((x) => x.id === p.id && x.name === p.name);
    if (before && before.description !== p.description && newPowers.get(p.name) === oldPowers.get(p.name)) {
      push({ changeType: 'poderes', title: `Poder Atualizado: ${p.name}`, description: reason || `A descrição de "${p.name}" foi atualizada.` });
    }
  });

  // 8. Magias (aprendidas, removidas e custo alterado)
  const spellKey = (s: CharacterSheet['spells'][number]) => `${s.id}|${s.isFormula ? 'f' : 'm'}`;
  const oldSpells = new Map((oldSheet.spells || []).map((s) => [spellKey(s), s]));
  const newSpells = new Map((newSheet.spells || []).map((s) => [spellKey(s), s]));
  newSpells.forEach((s, k) => {
    const before = oldSpells.get(k);
    const kind = s.isFormula ? 'Fórmula' : 'Magia';
    if (!before) {
      push({
        changeType: 'magias',
        title: `Nova ${kind} Aprendida: ${s.name}`,
        description: reason || `Adicionou "${s.name}" (${s.circle}º Círculo, ${s.school})${s.sourcePower ? ` por ${s.sourcePower}` : ''}.`,
      });
    } else if ((before.costReducedBy || []).join(',') !== (s.costReducedBy || []).join(',')) {
      push({
        changeType: 'magias',
        title: `Custo de ${s.name} alterado`,
        description: reason || `Reduções de custo: ${(s.costReducedBy || []).join(', ') || 'nenhuma'}.`,
        diff: [{ field: `${s.name} (reduções)`, from: (before.costReducedBy || []).length, to: (s.costReducedBy || []).length }],
      });
    }
  });
  oldSpells.forEach((s, k) => {
    if (!newSpells.has(k))
      push({ changeType: 'magias', title: `${s.isFormula ? 'Fórmula' : 'Magia'} Removida: ${s.name}`, description: reason || `"${s.name}" foi removida da ficha.` });
  });
  if ((oldSheet.spellSchools || []).join(',') !== (newSheet.spellSchools || []).join(',')) {
    push({
      changeType: 'magias',
      title: 'Escolas de magia alteradas',
      description: reason || `Escolas: ${(newSheet.spellSchools || []).join(', ') || 'nenhuma'}.`,
      diff: [{ field: 'Escolas', from: fmt((oldSheet.spellSchools || []).join(', ')), to: fmt((newSheet.spellSchools || []).join(', ')) }],
    });
  }

  // 9. Inventário
  const oldItems = new Map((oldSheet.inventory || []).map((i) => [i.id, i]));
  const newItems = new Map((newSheet.inventory || []).map((i) => [i.id, i]));
  (newSheet.inventory || []).forEach((i) => {
    const before = oldItems.get(i.id);
    if (!before) {
      push({ changeType: 'inventario', title: `Item Adicionado: ${i.name}`, description: reason || `Adicionou ${i.quantity}x ${i.name} (${i.spaces} espaços) ao inventário.` });
      return;
    }
    if (before.isEquipped !== i.isEquipped) {
      push({
        changeType: 'inventario',
        title: i.isEquipped ? `Item Equipado: ${i.name}` : `Item Desequipado: ${i.name}`,
        description: reason || `${i.name} foi ${i.isEquipped ? 'equipado' : 'desequipado'}.`,
      });
    }
    if ((before.quantity || 1) !== (i.quantity || 1)) {
      push({
        changeType: 'inventario',
        title: `Quantidade de ${i.name}: ${before.quantity || 1} ➔ ${i.quantity || 1}`,
        description: reason || `Quantidade de ${i.name} alterada.`,
        diff: [{ field: i.name, from: before.quantity || 1, to: i.quantity || 1 }],
      });
    }
    const oldMods = (before.appliedModifiers || []).join(',');
    const newMods = (i.appliedModifiers || []).join(',');
    if (oldMods !== newMods || (before.specialMaterial || '') !== (i.specialMaterial || '') || before.name !== i.name) {
      push({
        changeType: 'inventario',
        title: `Equipamento Modificado: ${i.name}`,
        description:
          reason ||
          `Melhorias: ${i.appliedModifiers && i.appliedModifiers.length > 0 ? i.appliedModifiers.join(', ') : 'Nenhuma'}${i.specialMaterial ? ` • Material: ${i.specialMaterial}` : ''}.`,
        diff: [
          ...(before.name !== i.name ? [{ field: 'Nome', from: before.name, to: i.name }] : []),
          { field: `${i.name} (Melhorias)`, from: before.appliedModifiers?.join(', ') || 'Nenhuma', to: i.appliedModifiers?.join(', ') || 'Nenhuma' },
        ],
      });
    }
  });
  (oldSheet.inventory || []).forEach((i) => {
    if (!newItems.has(i.id)) push({ changeType: 'inventario', title: `Item Removido: ${i.name}`, description: reason || `${i.name} foi removido do inventário.` });
  });

  // 10. Dinheiro
  const oldT = oldSheet.tibares ?? 0;
  const newT = newSheet.tibares ?? 0;
  if (oldT !== newT) {
    const d = newT - oldT;
    push({
      changeType: 'inventario',
      title: d > 0 ? `Ganho de Dinheiro (+T$ ${d})` : `Gasto de Dinheiro (T$ ${d})`,
      description: reason || `Dinheiro alterado de T$ ${oldT} para T$ ${newT} (${d > 0 ? '+' : ''}T$ ${d}).`,
      diff: [{ field: 'Tibares (T$)', from: `T$ ${oldT}`, to: `T$ ${newT}` }],
    });
  }

  // 11. Condições
  const condName = (id: string) => CONDITIONS_LIST.find((c) => c.id === id)?.name || id;
  const oldConds = new Set(oldSheet.activeConditions || []);
  const newConds = new Set(newSheet.activeConditions || []);
  newConds.forEach((c) => {
    if (!oldConds.has(c))
      push({ changeType: 'condicoes', title: `Condição Ativada: ${condName(c)}`, description: reason || `O personagem agora está sob o efeito da condição "${condName(c)}".` });
  });
  oldConds.forEach((c) => {
    if (!newConds.has(c)) push({ changeType: 'condicoes', title: `Condição Encerrada: ${condName(c)}`, description: reason || `A condição "${condName(c)}" foi encerrada.` });
  });

  // 12. Biografia e anotações
  const bioKeys = Object.keys({ ...(oldSheet.bio || {}), ...(newSheet.bio || {}) }) as (keyof CharacterSheet['bio'])[];
  const bioChanged = bioKeys.filter((k) => (oldSheet.bio?.[k] || '') !== (newSheet.bio?.[k] || ''));
  const notesChanged = JSON.stringify(oldSheet.notes || []) !== JSON.stringify(newSheet.notes || []);
  if (bioChanged.length || notesChanged) {
    push({
      changeType: 'notas',
      title: 'Biografia e anotações editadas',
      description: reason || [bioChanged.length ? `Campos: ${bioChanged.join(', ')}` : '', notesChanged ? 'Caderno de anotações' : ''].filter(Boolean).join('; ') + '.',
    });
  }

  if (options?.customTitle && out.length === 0) {
    push({ changeType: 'geral', title: options.customTitle, description: options.customDescription || reason || '' });
  }
  return out.map((e) => ({
    ...e,
    ...(options?.freeEdit ? { freeEdit: true } : {}),
    ...(options?.origin ? { origin: options.origin } : options?.freeEdit ? { origin: 'Edição livre' } : {}),
    ...(options?.actionReason ? { reason: options.actionReason } : {}),
  }));
}
