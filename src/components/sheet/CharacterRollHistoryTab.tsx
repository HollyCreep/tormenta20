import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDownUp, Check, Dices, MessageSquare, Trash2, X } from 'lucide-react';
import type { RollHistoryEntry } from '../../types/character';
import { logService } from '../../services/logService';
import { EmptyState, SearchField, SelectField } from '../ui/controls';
import { useFeedback } from '../ui/Feedback';
import { groupByDay } from './logUtils';

interface CharacterRollHistoryTabProps {
  characterId: string;
  characterName: string;
  revision?: string | number;
}

const CATEGORY_LABEL: Record<string, string> = {
  ataque: 'Ataque',
  dano: 'Dano',
  pericia: 'Perícia',
  atributo: 'Atributo',
  magia: 'Magia',
  livre: 'Livre',
};

export const CharacterRollHistoryTab: React.FC<CharacterRollHistoryTabProps> = ({ characterId, characterName, revision }) => {
  const { confirm } = useFeedback();
  const [rolls, setRolls] = useState<RollHistoryEntry[]>(() => logService.getRolls());
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [dateFilter, setDateFilter] = useState('todas');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [editingRollId, setEditingRollId] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState('');

  // Recarrega quando há novas rolagens/alterações
  useEffect(() => {
    setRolls(logService.getRolls());
  }, [revision]);

  const characterRolls = useMemo(() => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    const q = search.trim().toLowerCase();
    return rolls
      .filter((r) => {
        if (r.characterId !== characterId) return false;
        if (categoryFilter !== 'todas' && r.category !== categoryFilter) return false;
        if (dateFilter === 'hoje' && r.dateFormatted !== today) return false;
        if (dateFilter === 'ontem' && r.dateFormatted !== yesterday) return false;
        if (q && !`${r.title} ${r.formula} ${r.annotation || ''}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? -diff : diff;
      });
  }, [rolls, characterId, categoryFilter, dateFilter, search, sortOrder]);

  const total = rolls.filter((r) => r.characterId === characterId).length;

  const handleClear = async () => {
    const ok = await confirm({
      title: 'Limpar histórico de rolagens?',
      message: `Todas as rolagens de ${characterName} serão apagadas deste dispositivo.`,
      confirmLabel: 'Limpar',
      tone: 'danger',
    });
    if (!ok) return;
    logService.clearRolls(characterId);
    setRolls(logService.getRolls());
  };

  const saveAnnotation = (rollId: string) => {
    logService.updateRollAnnotation(rollId, annotationText);
    setRolls(logService.getRolls());
    setEditingRollId(null);
    setAnnotationText('');
  };

  if (total === 0) {
    return (
      <EmptyState
        icon={<Dices size={24} />}
        title="Nenhuma rolagem ainda"
        description="Rolagens de ataques, perícias, atributos e magias deste herói ficam registradas aqui."
      />
    );
  }

  return (
    <div className="stack">
      <div className="filter-row">
        <SearchField value={search} onChange={setSearch} placeholder="Buscar rolagem…" />
        <button
          type="button"
          className="icon-btn icon-btn-filled"
          onClick={() => setSortOrder((s) => (s === 'desc' ? 'asc' : 'desc'))}
          aria-label={sortOrder === 'desc' ? 'Mais antigas primeiro' : 'Mais recentes primeiro'}
          title={sortOrder === 'desc' ? 'Mais recentes primeiro' : 'Mais antigas primeiro'}
        >
          <ArrowDownUp size={18} />
        </button>
      </div>
      <div className="grid-2">
        <SelectField
          value={categoryFilter}
          onChange={setCategoryFilter}
          ariaLabel="Categoria"
          size="sm"
          options={[{ value: 'todas', label: 'Todas categorias' }, ...Object.entries(CATEGORY_LABEL).map(([value, label]) => ({ value, label }))]}
        />
        <SelectField
          value={dateFilter}
          onChange={setDateFilter}
          ariaLabel="Período"
          size="sm"
          options={[
            { value: 'todas', label: 'Qualquer data' },
            { value: 'hoje', label: 'Hoje' },
            { value: 'ontem', label: 'Ontem' },
          ]}
        />
      </div>

      {characterRolls.length === 0 ? (
        <EmptyState title="Nada com esses filtros" />
      ) : (
        groupByDay(characterRolls).map(([day, entries]) => (
          <section key={day} className="stack-sm">
            <span className="eyebrow">{day}</span>
            <div className="list">
              {entries.map((r) => (
                <div key={r.id} className="log-row">
                  <div className="hstack-lg items-start">
                    <span className="roll-chip t-num" data-tone={r.isCrit ? 'crit' : r.isFumble ? 'fumble' : 'normal'}>
                      {r.total}
                    </span>
                    <div className="row-main">
                      <span className="row-title">{r.title}</span>
                      <span className="row-sub t-mono">{r.formula}</span>
                      {r.components && <span className="t-xs t-3">{r.components}</span>}
                      <span className="hstack-xs t-xs t-3">
                        <span className="badge">{CATEGORY_LABEL[r.category] || r.category}</span>
                        {r.timeFormatted}
                        {r.isCrit && <span className="badge badge-gold">Crítico</span>}
                        {r.isFumble && <span className="badge badge-danger">Falha</span>}
                      </span>
                    </div>
                    {editingRollId !== r.id && (
                      <button
                        type="button"
                        className="icon-btn icon-btn-sm"
                        onClick={() => {
                          setEditingRollId(r.id);
                          setAnnotationText(r.annotation || '');
                        }}
                        aria-label="Anotar rolagem"
                      >
                        <MessageSquare size={16} />
                      </button>
                    )}
                  </div>
                  {editingRollId === r.id ? (
                    <div className="annotation-editor">
                      <input
                        autoFocus
                        value={annotationText}
                        onChange={(e) => setAnnotationText(e.target.value)}
                        placeholder="Ex.: acertou o ogro na ponte"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveAnnotation(r.id);
                          if (e.key === 'Escape') setEditingRollId(null);
                        }}
                      />
                      <button type="button" className="icon-btn icon-btn-tonal" onClick={() => saveAnnotation(r.id)} aria-label="Salvar anotação">
                        <Check size={18} />
                      </button>
                      <button type="button" className="icon-btn" onClick={() => setEditingRollId(null)} aria-label="Cancelar">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    r.annotation && <p className="log-annotation">“{r.annotation}”</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: 'center' }} onClick={handleClear}>
        <Trash2 size={16} />
        Limpar histórico de rolagens
      </button>
    </div>
  );
};
