import React, { useState, useMemo } from 'react';
import { X, Dices, Search, Filter, Trash2, Calendar, User, Clock, ChevronRight, Sparkles, AlertTriangle } from 'lucide-react';
import { RollHistoryEntry } from '../../types/character';
import { logService } from '../../services/logService';

interface RollHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterNames: { id: string; name: string }[];
  activeCharacterId?: string;
  onClearHistory?: () => void;
}

export const RollHistoryModal: React.FC<RollHistoryModalProps> = ({
  isOpen,
  onClose,
  characterNames,
  activeCharacterId,
  onClearHistory,
}) => {
  const [rolls, setRolls] = useState<RollHistoryEntry[]>(() => logService.getRolls());
  const [characterFilter, setCharacterFilter] = useState<string>(activeCharacterId || 'todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [diceFilter, setDiceFilter] = useState<string>('todos');
  const [dateFilter, setDateFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Atualiza ao abrir
  React.useEffect(() => {
    if (isOpen) {
      setRolls(logService.getRolls());
      if (activeCharacterId && characterFilter === 'todos') {
        setCharacterFilter(activeCharacterId);
      }
    }
  }, [isOpen, activeCharacterId]);

  const filteredRolls = useMemo(() => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    return rolls
      .filter((r) => {
        // Personagem
        if (characterFilter !== 'todos' && r.characterId !== characterFilter) {
          return false;
        }
        // Categoria
        if (categoryFilter !== 'todas' && r.category !== categoryFilter) {
          return false;
        }
        // Tipo de dado
        if (diceFilter !== 'todos') {
          if (diceFilter === 'd20' && r.rollType !== 'd20') return false;
          if (diceFilter === 'dano' && r.rollType === 'd20') return false;
        }
        // Data
        if (dateFilter === 'hoje' && r.dateFormatted !== today) return false;
        if (dateFilter === 'ontem' && r.dateFormatted !== yesterday) return false;

        // Busca
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchesTitle = r.title.toLowerCase().includes(q);
          const matchesFormula = r.formula.toLowerCase().includes(q);
          const matchesChar = (r.characterName || '').toLowerCase().includes(q);
          const matchesUser = (r.userName || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesFormula && !matchesChar && !matchesUser) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [rolls, characterFilter, categoryFilter, diceFilter, dateFilter, search, sortOrder]);

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar o histórico de rolagens?')) {
      if (characterFilter !== 'todos') {
        logService.clearRolls(characterFilter);
      } else {
        logService.clearRolls();
      }
      setRolls(logService.getRolls());
      if (onClearHistory) onClearHistory();
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
            background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--t20-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Dices size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', margin: 0, color: '#ffffff' }}>Histórico Geral de Rolagens</h2>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Auditoria de testes, ataques, danos e magias executadas
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem', color: '#f87171' }}
              title="Limpar rolagens"
            >
              <Trash2 size={13} />
              Limpar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '0.4rem', color: 'var(--text-dim)' }}
            >
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

            {/* Categoria */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', minWidth: '150px' }}>
              <Filter size={14} style={{ color: 'var(--t20-gold)' }} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
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
                <option value="todas">Todas Categorias</option>
                <option value="pericia">Perícias</option>
                <option value="ataque">Ataques</option>
                <option value="dano">Danos</option>
                <option value="magia">Magias</option>
                <option value="atributo">Atributos</option>
                <option value="livre">Rolagem Livre</option>
              </select>
            </div>

            {/* Tipo de Dado */}
            <select
              value={diceFilter}
              onChange={(e) => setDiceFilter(e.target.value)}
              style={{
                padding: '0.4rem 0.65rem',
                fontSize: '0.825rem',
                background: 'var(--bg-surface)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <option value="todos">Todos os Dados</option>
              <option value="d20">Apenas d20</option>
              <option value="dano">Dano & Outros (d6, d8...)</option>
            </select>

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

            {/* Ordenação por Hora */}
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
              placeholder="Buscar por teste, arma, magia ou fórmula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.4rem 0.75rem 0.4rem 2.2rem', fontSize: '0.825rem' }}
            />
          </div>
        </div>

        {/* Lista de Registros */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {filteredRolls.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>
              <Dices size={42} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
              <p style={{ margin: 0, fontSize: '0.95rem' }}>Nenhuma rolagem encontrada com os filtros selecionados.</p>
              <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Role testes de perícia, ataques ou magias na ficha para alimentar o histórico.
              </p>
            </div>
          ) : (
            filteredRolls.map((r) => {
              const isD20 = r.rollType === 'd20';
              return (
                <div
                  key={r.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: r.isCrit
                      ? 'rgba(245, 158, 11, 0.08)'
                      : r.isFumble
                      ? 'rgba(239, 68, 68, 0.08)'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: r.isCrit
                      ? '1px solid rgba(245, 158, 11, 0.4)'
                      : r.isFumble
                      ? '1px solid rgba(239, 68, 68, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* Total e Destaque */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: r.isCrit
                          ? 'rgba(245, 158, 11, 0.25)'
                          : r.isFumble
                          ? 'rgba(239, 68, 68, 0.25)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: r.isCrit
                          ? '2px solid var(--t20-gold)'
                          : r.isFumble
                          ? '2px solid #ef4444'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          fontSize: '1.25rem',
                          color: r.isCrit ? 'var(--t20-gold-light)' : r.isFumble ? '#f87171' : '#ffffff',
                          lineHeight: 1,
                        }}
                      >
                        {r.total}
                      </span>
                      {isD20 && (
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                          d20
                        </span>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '0.925rem', color: '#ffffff' }}>{r.title}</strong>
                        {r.isCrit && (
                          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                            <Sparkles size={10} /> Crítico Natural 20!
                          </span>
                        )}
                        {r.isFumble && (
                          <span className="badge badge-ruby" style={{ fontSize: '0.65rem' }}>
                            <AlertTriangle size={10} /> Falha Crítica 1!
                          </span>
                        )}
                        <span className="badge badge-slate" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>
                          {r.category}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--t20-mana-light)',
                          marginTop: '0.2rem',
                          wordBreak: 'break-word',
                        }}
                      >
                        {r.formula}
                      </div>

                      {r.components && (
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>
                          Origem: {r.components}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadados: Personagem, Usuário, Data e Hora */}
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
                    {r.characterName && (
                      <span style={{ color: 'var(--t20-gold)', fontWeight: 600 }}>{r.characterName}</span>
                    )}
                    <span>{r.dateFormatted} às {r.timeFormatted}</span>
                    <span style={{ opacity: 0.7 }}>Por {r.userName || 'Jogador'}</span>
                  </div>
                </div>
              );
            })
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
            Exibindo <strong>{filteredRolls.length}</strong> de {rolls.length} rolagens gravadas.
          </span>
          <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
