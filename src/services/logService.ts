import { CharacterSheet, RollHistoryEntry, CharacterChangeLogEntry } from '../types/character';

const ROLLS_STORAGE_KEY = 't20_roll_history';
const CHANGELOG_STORAGE_KEY = 't20_character_changelog';
const MAX_STORED_LOGS = 500;

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
}

export const logService = {
  // === HISTÓRICO DE ROLAGENS ===
  getRolls(): RollHistoryEntry[] {
    try {
      const data = localStorage.getItem(ROLLS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as RollHistoryEntry[];
    } catch {
      return [];
    }
  },

  addRoll(entry: Omit<RollHistoryEntry, 'id' | 'timestamp' | 'timeFormatted' | 'dateFormatted'> & { id?: string; timestamp?: string }): RollHistoryEntry {
    const now = new Date();
    const fullEntry: RollHistoryEntry = {
      ...entry,
      id: entry.id || `roll_${now.getTime()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: entry.timestamp || now.toISOString(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dateFormatted: now.toLocaleDateString(),
      userName: entry.userName || 'Jogador',
    };

    try {
      const existing = this.getRolls();
      const updated = [fullEntry, ...existing.slice(0, MAX_STORED_LOGS - 1)];
      localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar rolagem no histórico:', e);
    }

    return fullEntry;
  },

  clearRolls(characterId?: string): void {
    if (characterId) {
      const remaining = this.getRolls().filter((r) => r.characterId !== characterId);
      localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(ROLLS_STORAGE_KEY);
    }
  },

  updateRollAnnotation(rollId: string, annotation: string): void {
    try {
      const rolls = this.getRolls();
      const updated = rolls.map((r) => (r.id === rollId ? { ...r, annotation: annotation.trim() || undefined } : r));
      localStorage.setItem(ROLLS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao atualizar anotação da rolagem:', e);
    }
  },

  // === HISTÓRICO DE ALTERAÇÕES DA FICHA (AUDIT LOG) ===
  getChangeLogs(): CharacterChangeLogEntry[] {
    try {
      const data = localStorage.getItem(CHANGELOG_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as CharacterChangeLogEntry[];
    } catch {
      return [];
    }
  },

  addChangeLog(entry: Omit<CharacterChangeLogEntry, 'id' | 'timestamp' | 'timeFormatted' | 'dateFormatted'> & { id?: string; timestamp?: string }): CharacterChangeLogEntry {
    const now = new Date();
    const fullEntry: CharacterChangeLogEntry = {
      ...entry,
      id: entry.id || `chg_${now.getTime()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: entry.timestamp || now.toISOString(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dateFormatted: now.toLocaleDateString(),
      userName: entry.userName || 'Jogador',
    };

    try {
      const existing = this.getChangeLogs();
      const updated = [fullEntry, ...existing.slice(0, MAX_STORED_LOGS - 1)];
      localStorage.setItem(CHANGELOG_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar log de alteração da ficha:', e);
    }

    return fullEntry;
  },

  clearChangeLogs(characterId?: string): void {
    if (characterId) {
      const remaining = this.getChangeLogs().filter((c) => c.characterId !== characterId);
      localStorage.setItem(CHANGELOG_STORAGE_KEY, JSON.stringify(remaining));
    } else {
      localStorage.removeItem(CHANGELOG_STORAGE_KEY);
    }
  },

  updateChangeLogAnnotation(logId: string, annotation: string): void {
    try {
      const logs = this.getChangeLogs();
      const updated = logs.map((l) => (l.id === logId ? { ...l, annotation: annotation.trim() || undefined } : l));
      localStorage.setItem(CHANGELOG_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao atualizar anotação do log de auditoria:', e);
    }
  },

  // Analisador automático de diferenças entre duas versões da ficha
  diffAndLogChanges(
    oldSheet: CharacterSheet,
    newSheet: CharacterSheet,
    authorOrOptions?: string | ChangeLogOptions,
    maybeOptions?: ChangeLogOptions
  ): CharacterChangeLogEntry[] {
    if (!oldSheet || !newSheet || oldSheet.id !== newSheet.id) return [];
    const author = typeof authorOrOptions === 'string' ? authorOrOptions : 'Jogador';
    const options = typeof authorOrOptions === 'object' && authorOrOptions !== null ? authorOrOptions : maybeOptions;
    const entries: CharacterChangeLogEntry[] = [];

    // 1. Nível
    if (oldSheet.level !== newSheet.level) {
      entries.push(
        this.addChangeLog({
          characterId: newSheet.id,
          characterName: newSheet.name,
          userName: author,
          changeType: 'nivel',
          title: `Subida de Nível: Nível ${oldSheet.level} ➔ Nível ${newSheet.level}`,
          description: `O personagem avançou para o nível ${newSheet.level}.`,
          diff: [{ field: 'Nível', from: oldSheet.level, to: newSheet.level }],
        })
      );
    }

    // 2. Recursos (PV / PM / PV Temporário)
    if (oldSheet.stats.currentHp !== newSheet.stats.currentHp) {
      const diffHp = newSheet.stats.currentHp - oldSheet.stats.currentHp;
      entries.push(
        this.addChangeLog({
          characterId: newSheet.id,
          characterName: newSheet.name,
          userName: author,
          changeType: 'recursos',
          title: diffHp < 0 ? `Dano Sofrido (${diffHp} PV)` : `Cura Recebida (+${diffHp} PV)`,
          description: options?.actionReason || `Pontos de Vida alterados de ${oldSheet.stats.currentHp} para ${newSheet.stats.currentHp} (Máx: ${newSheet.stats.maxHp.value}).`,
          diff: [{ field: 'PV Atual', from: oldSheet.stats.currentHp, to: newSheet.stats.currentHp }],
        })
      );
    }

    // PV Temporários (auditável)
    const oldTempHp = oldSheet.stats?.tempHp || 0;
    const newTempHp = newSheet.stats?.tempHp || 0;
    if (oldTempHp !== newTempHp) {
      const diffTemp = newTempHp - oldTempHp;
      entries.push(
        this.addChangeLog({
          characterId: newSheet.id,
          characterName: newSheet.name,
          userName: author,
          changeType: 'recursos',
          title: diffTemp > 0 ? `PV Temporário Adicionado (+${diffTemp} PV Temp)` : `PV Temporário Consumido (${diffTemp} PV Temp)`,
          description:
            options?.actionReason ||
            (diffTemp > 0
              ? `Adicionados ${diffTemp} pontos de vida temporários (Saldo: ${newTempHp} PV Temp).`
              : `Consumidos ${Math.abs(diffTemp)} pontos de vida temporários (Saldo restante: ${newTempHp} PV Temp).`),
          diff: [{ field: 'PV Temporário', from: oldTempHp, to: newTempHp }],
        })
      );
    }

    // PM com suporte a Lançamento de Magias específico
    if (oldSheet.stats.currentMp !== newSheet.stats.currentMp) {
      const diffMp = newSheet.stats.currentMp - oldSheet.stats.currentMp;
      if (diffMp < 0 && options?.spellCast) {
        const sp = options.spellCast;
        const upgradesInfo = sp.upgrades && sp.upgrades.length > 0 ? ` (Aprimoramentos: ${sp.upgrades.join(', ')})` : '';
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'magias',
            title: `Lançamento da magia ${sp.spellName}`,
            description: `Lançou a magia "${sp.spellName}"${upgradesInfo} consumindo ${sp.pmCost} PM (Mana restante: ${newSheet.stats.currentMp}/${newSheet.stats.maxMp.value}).`,
            diff: [{ field: 'PM Atual', from: oldSheet.stats.currentMp, to: newSheet.stats.currentMp }],
          })
        );
      } else {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'recursos',
            title: diffMp < 0 ? `Gasto de Mana (${diffMp} PM)` : `Recuperação de Mana (+${diffMp} PM)`,
            description: options?.actionReason || `Pontos de Mana alterados de ${oldSheet.stats.currentMp} para ${newSheet.stats.currentMp} (Máx: ${newSheet.stats.maxMp.value}).`,
            diff: [{ field: 'PM Atual', from: oldSheet.stats.currentMp, to: newSheet.stats.currentMp }],
          })
        );
      }
    }

    // 3. Poderes
    const oldPowerNames = new Set((oldSheet.powers || []).map((p) => p.name));
    const newPowerNames = new Set((newSheet.powers || []).map((p) => p.name));

    (newSheet.powers || []).forEach((p) => {
      if (!oldPowerNames.has(p.name)) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'poderes',
            title: `Novo Poder Adquirido: ${p.name}`,
            description: `Aprendeu o poder "${p.name}" (${p.source || 'geral'}).`,
          })
        );
      }
    });

    // 4. Magias Aprendidas
    const oldSpellNames = new Set((oldSheet.spells || []).map((s) => s.name));
    (newSheet.spells || []).forEach((s) => {
      if (!oldSpellNames.has(s.name)) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'magias',
            title: `Nova Magia Aprendida: ${s.name}`,
            description: `Adicionou ao grimório "${s.name}" (${s.circle}º Círculo, ${s.school}).`,
          })
        );
      }
    });

    // 5. Inventário (Itens adicionados/removidos/equipados/modificados na Forja)
    const oldItemMap = new Map((oldSheet.inventory || []).map((i) => [i.id, i]));
    const newItemMap = new Map((newSheet.inventory || []).map((i) => [i.id, i]));

    (newSheet.inventory || []).forEach((i) => {
      const oldItem = oldItemMap.get(i.id);
      if (!oldItem) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'inventario',
            title: `Item Adicionado: ${i.name}`,
            description: `Adicionou ${i.quantity}x ${i.name} (${i.spaces} espaços) ao inventário.`,
          })
        );
      } else if (oldItem.isEquipped !== i.isEquipped) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'inventario',
            title: i.isEquipped ? `Item Equipado: ${i.name}` : `Item Desequipado: ${i.name}`,
            description: `${i.name} foi ${i.isEquipped ? 'equipado' : 'desequipado'}.`,
          })
        );
      } else {
        // Detecta modificação na Oficina / Forja (melhorias, materiais ou renomeação)
        const oldMods = (oldItem.appliedModifiers || []).join(',');
        const newMods = (i.appliedModifiers || []).join(',');
        const oldMat = oldItem.specialMaterial || '';
        const newMat = i.specialMaterial || '';
        if (oldMods !== newMods || oldMat !== newMat || oldItem.name !== i.name) {
          entries.push(
            this.addChangeLog({
              characterId: newSheet.id,
              characterName: newSheet.name,
              userName: author,
              changeType: 'inventario',
              title: `Equipamento Modificado na Forja: ${i.name}`,
              description:
                options?.actionReason ||
                `Item modificado na Oficina. Melhorias: ${i.appliedModifiers && i.appliedModifiers.length > 0 ? i.appliedModifiers.join(', ') : 'Nenhuma'}${i.specialMaterial ? ` • Material: ${i.specialMaterial}` : ''}.`,
              diff: [
                {
                  field: `${i.name} (Melhorias)`,
                  from: oldItem.appliedModifiers?.join(', ') || 'Nenhuma',
                  to: i.appliedModifiers?.join(', ') || 'Nenhuma',
                },
              ],
            })
          );
        }
      }
    });

    (oldSheet.inventory || []).forEach((i) => {
      if (!newItemMap.has(i.id)) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'inventario',
            title: `Item Removido: ${i.name}`,
            description: `${i.name} foi removido do inventário.`,
          })
        );
      }
    });

    // 6. Dinheiro / Tibares (T$)
    const oldTibares = oldSheet.tibares ?? 0;
    const newTibares = newSheet.tibares ?? 0;
    if (oldTibares !== newTibares) {
      const diffT$ = newTibares - oldTibares;
      entries.push(
        this.addChangeLog({
          characterId: newSheet.id,
          characterName: newSheet.name,
          userName: author,
          changeType: 'inventario',
          title: diffT$ > 0 ? `Ganho de Dinheiro (+T$ ${diffT$})` : `Gasto de Dinheiro (T$ ${diffT$})`,
          description:
            options?.actionReason ||
            `Dinheiro alterado de T$ ${oldTibares} para T$ ${newTibares} (${diffT$ > 0 ? '+' : ''}T$ ${diffT$}).`,
          diff: [{ field: 'Tibares (T$)', from: `T$ ${oldTibares}`, to: `T$ ${newTibares}` }],
        })
      );
    }

    // 7. Condições
    const oldConds = new Set(oldSheet.activeConditions || []);
    const newConds = new Set(newSheet.activeConditions || []);

    (newSheet.activeConditions || []).forEach((c) => {
      if (!oldConds.has(c)) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'condicoes',
            title: `Condição Ativada: ${c}`,
            description: `O personagem agora está sob o efeito da condição "${c}".`,
          })
        );
      }
    });

    (oldSheet.activeConditions || []).forEach((c) => {
      if (!newConds.has(c)) {
        entries.push(
          this.addChangeLog({
            characterId: newSheet.id,
            characterName: newSheet.name,
            userName: author,
            changeType: 'condicoes',
            title: `Condição Encerrada: ${c}`,
            description: `A condição "${c}" foi encerrada.`,
          })
        );
      }
    });

    return entries;
  },
};

