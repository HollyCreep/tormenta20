import React, { useState, useMemo } from 'react';
import { Dices, Search, Filter, Trash2, Calendar, Clock, ChevronRight, Sparkles, AlertTriangle, MessageSquare, Plus, Check, X, Edit3 } from 'lucide-react';
import { RollHistoryEntry } from '../../types/character';
import { logService } from '../../services/logService';

interface CharacterRollHistoryTabProps {
  characterId: string;
  characterName: string;
}

export const CharacterRollHistoryTab: React.FC<CharacterRollHistoryTabProps> = ({
  characterId,
  characterName,
}) => {
  const [rolls, setRolls] = useState<RollHistoryEntry[]>(() => logService.getRolls());
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [diceFilter, setDiceFilter] = useState<string>('todos');
  const [dateFilter, setDateFilter] = useState<string>('todas');
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Estado para edição de anotação
  const [editingRollId, setEditingRollId] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState<string>('');

  const characterRolls = useMemo(() => {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

    return rolls
      .filter((r) => {
        // Escopo estrito do personagem atual
        if (r.characterId !== characterId) {
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
          const matchesAnnotation = (r.annotation || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesFormula && !matchesAnnotation) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [rolls, characterId, categoryFilter, diceFilter, dateFilter, search, sortOrder]);

  const handleClearHistory = () => {
    if (window.confirm(`Tem certeza que deseja limpar todo o histórico de rolagens de ${characterName}?`)) {
      logService.clearRolls(characterId);
      setRolls(logService.getRolls());
    }
  };

  const handleStartEditingAnnotation = (roll: RollHistoryEntry) => {
    setEditingRollId(roll.id);
    setAnnotationText(roll.annotation || '');
  };

  const handleSaveAnnotation = (rollId: string) => {
    logService.updateRollAnnotation(rollId, annotationText);
    setRolls(logService.getRolls());
    setEditingRollId(null);
    setAnnotationText('');
  };

  const handleCancelAnnotation = () => {
    setEditingRollId(null);
    setAnnotationText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header do Escopo do Personagem */}
      <div className="t20-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Dices size={20} style={{ color: 'var(--t20-gold)' }} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--t20-gold-light)', fontFamily: 'var(--font-fantasy)' }}>
              Histórico de Rolagens
            </h3>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
              {characterName}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Exibindo apenas as rolagens efetuadas por este personagem. Todas as anotações são salvas localmente.
          </p>
        </div>

        {characterRolls.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="btn btn-secondary btn-sm"
            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)', gap: '0.35rem' }}
            title="Limpar histórico deste personagem"
          >
            <Trash2 size={14} />
            <span>Limpar Histórico</span>
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
            placeholder="Buscar por rolagem, fórmula ou anotação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.1rem', fontSize: '0.85rem' }}
          />
        </div>

        {/* Filtro por Categoria */}
        <div style={{ flex: '1 1 150px' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.45rem' }}
          >
            <option value="todas">Todas Categorias</option>
            <option value="ataque">⚔️ Ataque</option>
            <option value="dano">💥 Dano</option>
            <option value="pericia">🎯 Perícia</option>
            <option value="atributo">💪 Atributo</option>
            <option value="magia">✨ Magia</option>
            <option value="livre">🎲 Livre</option>
          </select>
        </div>

        {/* Filtro por Tipo de Dado */}
        <div style={{ flex: '1 1 120px' }}>
          <select
            value={diceFilter}
            onChange={(e) => setDiceFilter(e.target.value)}
            style={{ width: '100%', fontSize: '0.85rem', padding: '0.45rem' }}
          >
            <option value="todos">Todos Dados</option>
            <option value="d20">Apenas d20</option>
            <option value="dano">Dados de Dano</option>
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
          Exibindo <strong>{characterRolls.length}</strong> {characterRolls.length === 1 ? 'rolagem registrada' : 'rolagens registradas'}
        </span>
      </div>

      {/* Lista de Rolagens */}
      {characterRolls.length === 0 ? (
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
          <Dices size={42} style={{ opacity: 0.3 }} />
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-dim)', fontSize: '1.1rem' }}>Nenhuma rolagem encontrada</h4>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.85rem' }}>
              Faça testes de perícias, ataques ou rolagens de dano na ficha para visualizar o histórico aqui.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {characterRolls.map((roll) => {
            const isEditing = editingRollId === roll.id;

            return (
              <div
                key={roll.id}
                className="t20-card"
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  borderLeft: roll.isCrit
                    ? '4px solid var(--t20-gold)'
                    : roll.isFumble
                    ? '4px solid var(--t20-ruby)'
                    : '1px solid var(--border-color)',
                  background: roll.isCrit
                    ? 'rgba(245, 158, 11, 0.05)'
                    : roll.isFumble
                    ? 'rgba(239, 68, 68, 0.05)'
                    : 'rgba(255, 255, 255, 0.02)',
                }}
              >
                {/* Linha Principal: Título, Fórmula e Resultado */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
                        {roll.title}
                      </span>
                      <span className="badge badge-slate" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>
                        {roll.category}
                      </span>
                      {roll.isCrit && (
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem', gap: '0.2rem' }}>
                          <Sparkles size={10} /> CRÍTICO!
                        </span>
                      )}
                      {roll.isFumble && (
                        <span className="badge badge-ruby" style={{ fontSize: '0.65rem', gap: '0.2rem' }}>
                          <AlertTriangle size={10} /> FALHA NATURAL
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Fórmula: {roll.formula} {roll.components ? `(${roll.components})` : ''}
                    </div>
                  </div>

                  {/* Valor Total */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Resultado:</span>
                    <span
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-mono)',
                        color: roll.isCrit ? 'var(--t20-gold)' : roll.isFumble ? 'var(--t20-ruby)' : '#ffffff',
                      }}
                    >
                      {roll.total}
                    </span>
                  </div>
                </div>

                {/* Linha de Data e Hora */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} /> {roll.dateFormatted}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {roll.timeFormatted}
                    </span>
                  </div>

                  {/* Botão de Anotação */}
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => handleStartEditingAnnotation(roll)}
                      className="btn btn-ghost btn-sm"
                      style={{
                        padding: '0.15rem 0.45rem',
                        fontSize: '0.75rem',
                        color: roll.annotation ? 'var(--t20-gold-light)' : 'var(--text-muted)',
                        gap: '0.25rem',
                      }}
                      title="Adicionar ou editar anotação nesta rolagem"
                    >
                      <MessageSquare size={12} />
                      <span>{roll.annotation ? 'Editar Anotação' : '+ Anotação'}</span>
                    </button>
                  )}
                </div>

                {/* Exibição da Anotação Existente (se não estiver editando) */}
                {!isEditing && roll.annotation && (
                  <div
                    style={{
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.8rem',
                      color: 'var(--t20-gold-light)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <MessageSquare size={13} style={{ flexShrink: 0, color: 'var(--t20-gold)' }} />
                    <span style={{ flex: 1 }}>{roll.annotation}</span>
                  </div>
                )}

                {/* Formulário Inline de Edição de Anotação */}
                {isEditing && (
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.6rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                    }}
                  >
                    <label style={{ fontSize: '0.75rem', color: 'var(--t20-gold-light)', fontWeight: 600 }}>
                      Anotação da Rolagem:
                    </label>
                    <input
                      type="text"
                      value={annotationText}
                      onChange={(e) => setAnnotationText(e.target.value)}
                      placeholder="Ex: Teste feito com bônus de Inspiração do Bardo"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveAnnotation(roll.id);
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
                        onClick={() => handleSaveAnnotation(roll.id)}
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
