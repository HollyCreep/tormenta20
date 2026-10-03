import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownUp,
  ArrowRight,
  Backpack,
  Check,
  ChevronsUp,
  FileText,
  Heart,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Swords,
  Dumbbell,
  ListChecks,
  NotebookPen,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import type { CharacterChangeLogEntry } from '../../types/character';
import { logService } from '../../services/logService';
import { EmptyState, SearchField, SelectField } from '../ui/controls';
import { useFeedback } from '../ui/Feedback';
import { groupByDay } from './logUtils';

interface CharacterAuditTabProps {
  characterId: string;
  characterName: string;
  revision?: string | number;
}

const TYPE_META: Record<string, { label: string; icon: React.ReactNode }> = {
  recursos: { label: 'PV / PM', icon: <Heart size={16} /> },
  inventario: { label: 'Inventário', icon: <Backpack size={16} /> },
  magias: { label: 'Magias', icon: <Sparkles size={16} /> },
  poderes: { label: 'Poderes', icon: <Swords size={16} /> },
  nivel: { label: 'Nível', icon: <ChevronsUp size={16} /> },
  condicoes: { label: 'Condições', icon: <ShieldAlert size={16} /> },
  atributos: { label: 'Atributos', icon: <Dumbbell size={16} /> },
  pericias: { label: 'Perícias', icon: <ListChecks size={16} /> },
  estatisticas: { label: 'Ajustes manuais', icon: <SlidersHorizontal size={16} /> },
  notas: { label: 'Notas', icon: <NotebookPen size={16} /> },
  geral: { label: 'Geral', icon: <FileText size={16} /> },
};

export const CharacterAuditTab: React.FC<CharacterAuditTabProps> = ({ characterId, characterName, revision }) => {
  const { confirm } = useFeedback();
  const [logs, setLogs] = useState<CharacterChangeLogEntry[]>(() => logService.getChangeLogs());
  const [typeFilter, setTypeFilter] = useState('todos');
  const [originFilter, setOriginFilter] = useState('todas');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState('');

  useEffect(() => {
    setLogs(logService.getChangeLogs());
  }, [revision]);

  const characterLogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs
      .filter((l) => {
        if (l.characterId !== characterId) return false;
        if (typeFilter !== 'todos' && l.changeType !== typeFilter) return false;
        if (originFilter === 'livre' && !l.freeEdit) return false;
        if (originFilter === 'jogo' && (l.freeEdit || l.origin)) return false;
        if (originFilter === 'criador' && l.origin !== 'Criador de personagem') return false;
        if (q && !`${l.title} ${l.description} ${l.annotation || ''} ${l.reason || ''}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? -diff : diff;
      });
  }, [logs, characterId, typeFilter, originFilter, search, sortOrder]);

  const total = logs.filter((l) => l.characterId === characterId).length;

  const handleClear = async () => {
    const ok = await confirm({
      title: 'Limpar auditoria?',
      message: `Todo o registro de alterações de ${characterName} será apagado deste dispositivo.`,
      confirmLabel: 'Limpar',
      tone: 'danger',
    });
    if (!ok) return;
    logService.clearChangeLogs(characterId);
    setLogs(logService.getChangeLogs());
  };

  const saveAnnotation = (logId: string) => {
    logService.updateChangeLogAnnotation(logId, annotationText);
    setLogs(logService.getChangeLogs());
    setEditingLogId(null);
    setAnnotationText('');
  };

  if (total === 0) {
    return (
      <EmptyState
        icon={<FileText size={24} />}
        title="Nada registrado ainda"
        description="Cada alteração da ficha (PV, PM, atributos, perícias, poderes, magias, itens, condições e edições livres) fica registrada aqui."
      />
    );
  }

  return (
    <div className="stack">
      <div className="filter-row">
        <SearchField value={search} onChange={setSearch} placeholder="Buscar alteração…" />
        <button
          type="button"
          className="icon-btn icon-btn-filled"
          onClick={() => setSortOrder((s) => (s === 'desc' ? 'asc' : 'desc'))}
          aria-label="Inverter ordem"
          title={sortOrder === 'desc' ? 'Mais recentes primeiro' : 'Mais antigas primeiro'}
        >
          <ArrowDownUp size={18} />
        </button>
      </div>
      <SelectField
        value={typeFilter}
        onChange={setTypeFilter}
        ariaLabel="Tipo de alteração"
        size="sm"
        options={[{ value: 'todos', label: 'Todos os tipos' }, ...Object.entries(TYPE_META).map(([value, m]) => ({ value, label: m.label }))]}
      />
      <SelectField
        value={originFilter}
        onChange={setOriginFilter}
        ariaLabel="Origem da alteração"
        size="sm"
        options={[
          { value: 'todas', label: 'Todas as origens' },
          { value: 'jogo', label: 'Ações de jogo' },
          { value: 'livre', label: 'Edição livre' },
          { value: 'criador', label: 'Criador de personagem' },
        ]}
      />

      {characterLogs.length === 0 ? (
        <EmptyState title="Nada com esses filtros" />
      ) : (
        groupByDay(characterLogs).map(([day, entries]) => (
          <section key={day} className="stack-sm">
            <span className="eyebrow">{day}</span>
            <div className="list">
              {entries.map((log) => {
                const meta = TYPE_META[log.changeType] || TYPE_META.geral;
                return (
                  <div key={log.id} className="log-row">
                    <div className="hstack-lg items-start">
                      <span className="log-icon">{meta.icon}</span>
                      <div className="row-main">
                        <span className="row-title hstack-xs wrap">
                          {log.title}
                          {log.freeEdit ? (
                            <span className="badge badge-warning">Edição livre</span>
                          ) : log.origin ? (
                            <span className="badge">{log.origin}</span>
                          ) : null}
                        </span>
                        <span className="row-sub">{log.description}</span>
                        {log.reason && log.freeEdit && <span className="t-xs t-2">Motivo: {log.reason}</span>}
                        {log.diff && log.diff.length > 0 && (
                          <div className="diff-list">
                            {log.diff.map((d, i) => (
                              <span key={i} className="diff-chip">
                                <span className="t-3">{d.field}</span>
                                <span className="t-mono diff-from">{String(d.from)}</span>
                                <ArrowRight size={12} />
                                <span className="t-mono diff-to">{String(d.to)}</span>
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="t-xs t-3">
                          {meta.label} · {log.timeFormatted}
                          {log.userName ? ` · ${log.userName}` : ''}
                        </span>
                      </div>
                      {editingLogId !== log.id && (
                        <button
                          type="button"
                          className="icon-btn icon-btn-sm"
                          onClick={() => {
                            setEditingLogId(log.id);
                            setAnnotationText(log.annotation || '');
                          }}
                          aria-label="Anotar alteração"
                        >
                          <MessageSquare size={16} />
                        </button>
                      )}
                    </div>
                    {editingLogId === log.id ? (
                      <div className="annotation-editor">
                        <input
                          autoFocus
                          value={annotationText}
                          onChange={(e) => setAnnotationText(e.target.value)}
                          placeholder="Motivo ou contexto"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveAnnotation(log.id);
                            if (e.key === 'Escape') setEditingLogId(null);
                          }}
                        />
                        <button type="button" className="icon-btn icon-btn-tonal" onClick={() => saveAnnotation(log.id)} aria-label="Salvar anotação">
                          <Check size={18} />
                        </button>
                        <button type="button" className="icon-btn" onClick={() => setEditingLogId(null)} aria-label="Cancelar">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      log.annotation && <p className="log-annotation">“{log.annotation}”</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}

      <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: 'center' }} onClick={handleClear}>
        <Trash2 size={16} />
        Limpar auditoria
      </button>
    </div>
  );
};
