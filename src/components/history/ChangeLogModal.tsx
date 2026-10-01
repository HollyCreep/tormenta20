import React, { useState, useMemo } from 'react';
import { X, FileText, Search, Filter, Trash2, Calendar, User, Clock, ChevronRight, Activity, Shield, Sparkles, Sword } from 'lucide-react';
import { CharacterChangeLogEntry } from '../../types/character';
import { logService } from '../../services/logService';

interface ChangeLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterNames: { id: string; name: string }[];
  activeCharacterId?: string;
  onClearLogs?: () => void;
}

export const ChangeLogModal: React.FC<ChangeLogModalProps> = ({
  isOpen,
  onClose,
  characterNames,
  activeCharacterId,
  onClearLogs,
}) => {
  const [logs, setLogs] = useState<CharacterChangeLogEntry[]>(() => logService.getChangeLogs());
  const [characterFilter, setCharacterFilter] = useState<string>(activeCharacterId || 'todos');
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [dateFilter, setDateFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  React.useEffect(() => {
    if (isOpen) {
      setLogs(logService.getChangeLogs());
      if (activeCharacterId && characterFilter === 'todos') {
        setCharacterFilter(activeCharacterId);
      }
    }
  }, [isOpen, activeCharacterId]);

  const filteredLogs = useMemo(() => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    return logs
      .filter((l) => {
        if (characterFilter !== 'todos' && l.characterId !== characterFilter) return false;
        if (typeFilter !== 'todos' && l.changeType !== typeFilter) return false;
        if (dateFilter === 'hoje' && l.dateFormatted !== today) return false;
        if (dateFilter === 'ontem' && l.dateFormatted !== yesterday) return false;

        if (search.trim()) {
          const q = search.toLowerCase();
          const matchesTitle = l.title.toLowerCase().includes(q);
          const matchesDesc = l.description.toLowerCase().includes(q);
          const matchesChar = (l.characterName || '').toLowerCase().includes(q);
          const matchesUser = (l.userName || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesChar && !matchesUser) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [logs, characterFilter, typeFilter, dateFilter, search, sortOrder]);

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar o log de alterações?')) {
      if (characterFilter !== 'todos') {
        logService.clearChangeLogs(characterFilter);
      } else {
        logService.clearChangeLogs();
      }
      setLogs(logService.getChangeLogs());
      if (onClearLogs) onClearLogs();
    }
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          width: '94%',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-gold)',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--t20-mana-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', margin: 0, color: '#ffffff' }}>Log de Alterações de Ficha</h2>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Auditoria e histórico de modificações, evolução e inventário
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem', color: '#f87171' }}
              title="Limpar logs"
            >
              <Trash2 size={13} />
              Limpar
            </button>
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ padding: '0.4rem', color: 'var(--text-dim)' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filtros em Barra */}
        <div
          style={{
            padding: '1rem 1.5rem',
            background: 'rgba(0, 0, 0, 0.25)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Personagem */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1, minWidth: '180px' }}>
              <User size={14} style={{ color: 'var(--t20-gold)' }} />
              <select
                value={characterFilter}
                onChange={(e) => setCharacterFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.825rem',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <option value="todos">Todos os Personagens</option>
                {characterNames.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Alteração */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: '160px' }}>
              <Filter size={14} style={{ color: 'var(--t20-gold)' }} />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.825rem',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <option value="todos">Todos os Tipos</option>
                <option value="recursos">Recursos (PV / PM)</option>
                <option value="nivel">Nível e Evolução</option>
                <option value="poderes">Poderes</option>
                <option value="magias">Magias</option>
                <option value="inventario">Inventário e Equipamento</option>
                <option value="condicoes">Condições</option>
                <option value="atributos">Atributos</option>
              </select>
            </div>

            {/* Data */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} style={{ color: 'var(--t20-gold)' }} />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.825rem',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <option value="todas">Qualquer Data</option>
                <option value="hoje">Hoje</option>
                <option value="ontem">Ontem</option>
              </select>
            </div>

            {/* Ordenação */}
            <button
              type="button"
              onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem', gap: '0.3rem' }}
              title="Inverter ordem cronológica"
            >
              <Clock size={13} />
              {sortOrder === 'desc' ? 'Mais recentes' : 'Mais antigas'}
            </button>
          </div>

          {/* Busca textual */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Buscar por descrição, item, poder ou alteração..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.4rem 0.75rem 0.4rem 2.2rem', fontSize: '0.825rem' }}
            />
          </div>
        </div>

        {/* Lista de Logs */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredLogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>
              <FileText size={42} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Nenhum registro de alteração encontrado.</p>
              <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Modifique atributos, PV/PM, inventário ou suba de nível para alimentar o changelog.
              </p>
            </div>
          ) : (
            filteredLogs.map((l) => (
              <div
                key={l.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flex: 1 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.1rem',
                      flexShrink: 0,
                    }}
                  >
                    {getTypeIcon(l.changeType)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.925rem', color: '#ffffff' }}>{l.title}</strong>
                      <span className="badge badge-slate" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>
                        {l.changeType}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.825rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: 1.45 }}>
                      {l.description}
                    </div>

                    {l.diff && l.diff.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                        {l.diff.map((d, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-mono)',
                              background: 'rgba(0, 0, 0, 0.3)',
                              padding: '0.15rem 0.45rem',
                              borderRadius: 'var(--radius-xs)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <span style={{ color: 'var(--text-dim)' }}>{d.field}: </span>
                            <span style={{ color: '#f87171' }}>{d.from}</span>
                            <span style={{ color: 'var(--text-dim)', margin: '0 0.3rem' }}>➔</span>
                            <span style={{ color: '#34d399' }}>{d.to}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.2rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: 'var(--t20-gold)', fontWeight: 600 }}>{l.characterName}</span>
                  <span>{l.dateFormatted} às {l.timeFormatted}</span>
                  <span style={{ opacity: 0.7 }}>Por {l.userName || 'Jogador'}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          <span>
            Exibindo <strong>{filteredLogs.length}</strong> de {logs.length} alterações registradas.
          </span>
          <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
