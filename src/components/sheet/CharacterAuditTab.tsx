import React, { useState, useMemo } from 'react';
import { FileText, Search, Filter, Trash2, Calendar, Clock, ChevronRight, Activity, Shield, Sparkles, Sword, MessageSquare, Plus, Check, X, Edit3 } from 'lucide-react';
import { CharacterChangeLogEntry } from '../../types/character';
import { logService } from '../../services/logService';

interface CharacterAuditTabProps {
  characterId: string;
  characterName: string;
}

export const CharacterAuditTab: React.FC<CharacterAuditTabProps> = ({
  characterId,
  characterName,
}) => {
  const [logs, setLogs] = useState<CharacterChangeLogEntry[]>(() => logService.getChangeLogs());
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [dateFilter, setDateFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Estado para edição de anotação
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState<string>('');

  const characterLogs = useMemo(() => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    return logs
      .filter((l) => {
        // Escopo estrito do personagem atual
        if (l.characterId !== characterId) return false;
        // Tipo de alteração
        if (typeFilter !== 'todos' && l.changeType !== typeFilter) return false;
        // Data
        if (dateFilter === 'hoje' && l.dateFormatted !== today) return false;
        if (dateFilter === 'ontem' && l.dateFormatted !== yesterday) return false;

        // Busca
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchesTitle = l.title.toLowerCase().includes(q);
          const matchesDesc = l.description.toLowerCase().includes(q);
          const matchesAnnotation = (l.annotation || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesAnnotation) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [logs, characterId, typeFilter, dateFilter, search, sortOrder]);

  const handleClearLogs = () => {
    if (window.confirm(`Tem certeza que deseja limpar todo o registro de auditoria de ${characterName}?`)) {
      logService.clearChangeLogs(characterId);
      setLogs(logService.getChangeLogs());
    }
  };

  const handleStartEditingAnnotation = (log: CharacterChangeLogEntry) => {
    setEditingLogId(log.id);
    setAnnotationText(log.annotation || '');
  };

  const handleSaveAnnotation = (logId: string) => {
    logService.updateChangeLogAnnotation(logId, annotationText);
    setLogs(logService.getChangeLogs());
    setEditingLogId(null);
    setAnnotationText('');
  };

  const handleCancelAnnotation = () => {
    setEditingLogId(null);
    setAnnotationText('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recursos':
        return <Activity size={15} style={{ color: '#f87171' }} />;
      case 'nivel':
        return <Sparkles size={15} style={{ color: 'var(--t20-gold)' }} />;
      case 'poderes':
        return <Shield size={15} style={{ color: 'var(--t20-gold-light)' }} />;
      case 'magias':
        return <Sparkles size={15} style={{ color: 'var(--t20-mana-light)' }} />;
      case 'inventario':
        return <Sword size={15} style={{ color: 'var(--t20-life-light)' }} />;
      default:
        return <FileText size={15} style={{ color: 'var(--text-dim)' }} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header do Escopo do Personagem */}
      <div className="t20-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <FileText size={20} style={{ color: 'var(--t20-mana-light)' }} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--t20-gold-light)', fontFamily: 'var(--font-fantasy)' }}>
              Auditoria da Ficha
            </h3>
            <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
              {characterName}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Registro canônico e imutável de todas as modificações, gastos de mana, alterações de vida e itens.
          </p>
        </div>

        {characterLogs.length > 0 && (
          <button
            type="button"
            onClick={handleClearLogs}
            className="btn btn-secondary btn-sm"
            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)', gap: '0.35rem' }}
            title="Limpar logs deste personagem"
          >
            <Trash2 size={14} />
            <span>Limpar Auditoria</span>
          </button>
        )}
      </div>

      {/* Barra de Filtros e Busca */}
      <div
        className="t20-card"
        style={{
          padding: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Busca por Texto */}
        <div style={{ flex: '1 1 220px', minWidth: '180px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Buscar por ação, descrição ou anotação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.1rem', fontSize: '0.85rem' }}
          />
        </div>

        {/* Filtro por Tipo de Alteração */}
        <div style={{ flex: '1 1 150px' }}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.45rem' }}
          >
            <option value="todos">Todos os Tipos</option>
            <option value="recursos">❤️ PV / PM / Sobrevida</option>
            <option value="inventario">🎒 Inventário & Moedas</option>
            <option value="magias">✨ Magias & Grimório</option>
            <option value="poderes">🛡️ Poderes & Habilidades</option>
            <option value="nivel">⭐ Nível & Experiência</option>
            <option value="condicoes">⚡ Condições</option>
            <option value="geral">📝 Geral</option>
          </select>
        </div>

        {/* Filtro por Data */}
        <div style={{ flex: '1 1 110px' }}>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.45rem' }}
          >
            <option value="todas">Todas Datas</option>
            <option value="hoje">Hoje</option>
            <option value="ontem">Ontem</option>
          </select>
        </div>

        {/* Ordenação */}
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
          title="Alternar ordem de exibição"
        >
          {sortOrder === 'desc' ? 'Mais Recentes ↓' : 'Mais Antigas ↑'}
        </button>
      </div>

      {/* Contagem */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span>
          Exibindo <strong>{characterLogs.length}</strong> {characterLogs.length === 1 ? 'registro de auditoria' : 'registros de auditoria'}
        </span>
      </div>

      {/* Lista de Registros */}
      {characterLogs.length === 0 ? (
        <div
          className="t20-card"
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <FileText size={42} style={{ opacity: 0.3 }} />
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-dim)', fontSize: '1.1rem' }}>Nenhum registro de auditoria</h4>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem' }}>
              Alterações de vida, mana, itens, modificações de forja e subidas de nível serão auditadas automaticamente aqui.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {characterLogs.map((log) => {
            const isEditing = editingLogId === log.id;

            return (
              <div
                key={log.id}
                className="t20-card"
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                {/* Linha Principal: Ícone, Título e Categoria */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <div style={{ marginTop: '0.2rem' }}>
                      {getTypeIcon(log.changeType)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                          {log.title}
                        </span>
                        <span className="badge badge-slate" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>
                          {log.changeType}
                        </span>
                      </div>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                        {log.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Diff detalhado se existir */}
                {log.diff && log.diff.length > 0 && (
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.4rem 0.65rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {log.diff.map((d, dIdx) => (
                      <span key={dIdx} style={{ color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--text-main)' }}>{d.field}:</strong>{' '}
                        <span style={{ textDecoration: 'line-through', color: '#f87171' }}>{d.from}</span>
                        {' → '}
                        <span style={{ color: '#34d399', fontWeight: 700 }}>{d.to}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Linha de Data e Hora */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} /> {log.dateFormatted}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {log.timeFormatted}
                    </span>
                  </div>

                  {/* Botão de Anotação */}
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => handleStartEditingAnnotation(log)}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '0.15rem 0.45rem',
                        fontSize: '0.75rem',
                        color: log.annotation ? 'var(--t20-mana-light)' : 'var(--text-muted)',
                        gap: '0.25rem',
                      }}
                      title="Adicionar ou editar anotação personalizada neste log"
                    >
                      <MessageSquare size={12} />
                      <span>{log.annotation ? 'Editar Anotação' : '+ Anotação'}</span>
                    </button>
                  )}
                </div>

                {/* Exibição da Anotação Existente (se não estiver editando) */}
                {!isEditing && log.annotation && (
                  <div
                    style={{
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.8rem',
                      color: '#7dd3fc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <MessageSquare size={13} style={{ flexShrink: 0, color: '#38bdf8' }} />
                    <span style={{ flex: 1 }}>{log.annotation}</span>
                  </div>
                )}

                {/* Formulário Inline de Edição de Anotação */}
                {isEditing && (
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid var(--border-blue, rgba(56, 189, 248, 0.4))',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                    }}
                  >
                    <label style={{ fontSize: '0.75rem', color: '#7dd3fc', fontWeight: 600 }}>
                      Anotação de Auditoria:
                    </label>
                    <input
                      type="text"
                      value={annotationText}
                      onChange={(e) => setAnnotationText(e.target.value)}
                      placeholder="Ex: Efeito ao entrar em Fúria com o poder Alma de Bronze"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveAnnotation(log.id);
                        if (e.key === 'Escape') handleCancelAnnotation();
                      }}
                      style={{ fontSize: '0.85rem', padding: '0.4rem 0.6rem', width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      <button
                        type="button"
                        onClick={handleCancelAnnotation}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveAnnotation(log.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', gap: '0.25rem' }}
                      >
                        <Check size={12} />
                        Salvar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
