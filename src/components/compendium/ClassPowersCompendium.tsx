import React, { useState, useMemo } from 'react';
import { CLASS_POWERS_LIST } from '../../data/classPowers';
import { CLASSES_LIST } from '../../data/classes';
import type { ClassPower } from '../../types/rules';
import type { CharacterSheet } from '../../types/character';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { cleanT20Text } from '../../utils/textUtils';
import { Search, Sword, Info, Sparkles, Filter, User } from 'lucide-react';
import { ClassBadge } from '../common/T20Badge';
import { getClassTheme } from '../../styles/classTheme';

interface ClassPowersCompendiumProps {
  onBack?: () => void;
  activeCharacter?: CharacterSheet | null;
  characters?: CharacterSheet[];
}

export const ClassPowersCompendium: React.FC<ClassPowersCompendiumProps> = ({
  activeCharacter,
  characters = [],
}) => {
  const [search, setSearch] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string>('todas');
  const [modalDetail, setModalDetail] = useState<DetailModalData | null>(null);

  // Lista de classes disponíveis para o filtro
  const classOptions = useMemo(() => {
    return [
      { id: 'todas', name: 'Todas as Classes' },
      ...CLASSES_LIST.map((c) => ({ id: c.id, name: c.name })),
    ];
  }, []);

  const filteredPowers = useMemo(() => {
    return CLASS_POWERS_LIST.filter((p) => {
      if (selectedClassId !== 'todas' && p.classId !== selectedClassId) {
        return false;
      }

      if (search.trim()) {
        const term = search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        const matchesPrereq = p.prerequisites?.toLowerCase().includes(term);
        const matchesClass = p.className.toLowerCase().includes(term);
        if (!matchesName && !matchesDesc && !matchesPrereq && !matchesClass) {
          return false;
        }
      }

      return true;
    });
  }, [selectedClassId, search]);

  const handleOpenDetail = (power: ClassPower) => {
    setModalDetail({
      title: cleanT20Text(power.name),
      category: `Poder de Classe • ${power.className}`,
      subtitle: power.cost ? `Custo: ${power.cost}` : undefined,
      cost: power.cost,
      prerequisites: power.prerequisites,
      description: cleanT20Text(power.description),
      ruleCitation: {
        id: `CLASS_POWER_${power.id.toUpperCase()}`,
        title: `Poder de Classe: ${power.name}`,
        book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
        chapter: 'Capítulo 1: Construção de Personagem',
        section: `Classes de Arton — ${power.className}`,
        page: 'Página 34 a 93',
        quote: cleanT20Text(power.description),
        explanation: `Poderes de classe são escolhidos ao subir de nível a partir do 2º nível na respectiva classe. Pré-requisitos: ${power.prerequisites || 'Nenhum'}.`,
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Barra de Filtros e Busca */}
      <div
        className="t20-card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'rgba(17, 24, 39, 0.75)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sword size={20} style={{ color: 'var(--t20-gold)' }} />
              Poderes de Classe
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tormenta 20: Edição Jogo do Ano (v1.3) • Capítulo 1: Classes de Arton (págs. 34 a 93)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {activeCharacter && (
              <button
                type="button"
                onClick={() => setSelectedClassId(activeCharacter.classId)}
                className={`btn ${selectedClassId === activeCharacter.classId ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.35rem' }}
                title={`Filtrar para a classe do personagem ativo (${activeCharacter.name})`}
              >
                <User size={14} />
                Minha Classe ({activeCharacter.classId.toUpperCase()})
              </button>
            )}

            <span className="badge badge-gold" style={{ fontSize: '0.8rem' }}>
              {filteredPowers.length} {filteredPowers.length === 1 ? 'poder encontrado' : 'poderes encontrados'}
            </span>
          </div>
        </div>

        {/* Campo de Busca e Seletor de Classe */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Buscar por nome, efeito ou pré-requisito..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
              style={{ width: '100%', paddingLeft: '2.5rem' }}
            />
          </div>

          <div style={{ flex: '0 1 240px', minWidth: '180px' }}>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="input-field"
              style={{ width: '100%', cursor: 'pointer' }}
            >
              {classOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pílulas de Classes Rápidas (Scroll Horizontal no Mobile) */}
        <div
          style={{
            display: 'flex',
            gap: '0.45rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'center',
          }}
        >
          {classOptions.map((opt) => {
            const isSelected = selectedClassId === opt.id;
            return (
              <ClassBadge
                key={opt.id}
                classIdOrName={opt.id}
                label={opt.name}
                isSelected={isSelected}
                onClick={() => setSelectedClassId(opt.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Grid de Cards de Poderes de Classe */}
      {filteredPowers.length === 0 ? (
        <div className="t20-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-dim)' }}>
          <Sparkles size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
          <p style={{ margin: 0, fontSize: '1rem' }}>
            Nenhum poder de classe encontrado para os filtros selecionados.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredPowers.map((pow) => {
            const theme = getClassTheme(pow.classId);
            return (
              <div
                key={pow.id}
                className="t20-card"
                style={{
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  transition: 'var(--transition)',
                  borderLeft: `3px solid ${theme.primary}`,
                  background: `linear-gradient(155deg, ${theme.surface}2e 0%, rgba(17, 24, 39, 0.95) 100%)`,
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>
                        {cleanT20Text(pow.name)}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <ClassBadge classIdOrName={pow.classId} label={pow.className} />
                        {pow.cost && (
                          <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                            {pow.cost}
                          </span>
                        )}
                      </div>
                    </div>

                  <button
                    type="button"
                    onClick={() => handleOpenDetail(pow)}
                    className="btn btn-ghost"
                    style={{ padding: '0.25rem', color: 'var(--t20-gold)' }}
                    title="Ver detalhes e citação oficial da regra"
                  >
                    <Info size={16} />
                  </button>
                </div>

                {pow.prerequisites && (
                  <div
                    style={{
                      marginTop: '0.6rem',
                      padding: '0.35rem 0.55rem',
                      background: 'rgba(0, 0, 0, 0.35)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      color: 'var(--t20-gold-light)',
                      borderLeft: '2px solid var(--t20-gold)',
                    }}
                  >
                    <strong>Pré-requisito:</strong> {pow.prerequisites}
                  </div>
                )}

                <p
                  style={{
                    margin: '0.65rem 0 0 0',
                    fontSize: '0.85rem',
                    color: '#cbd5e1',
                    lineHeight: 1.5,
                  }}
                >
                  {cleanT20Text(pow.description)}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '0.65rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleOpenDetail(pow)}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', gap: '0.3rem' }}
                >
                  <Info size={13} />
                  Ver Regra Canônica
                </button>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Modal de Detalhes Canônicos */}
      <DetailModal data={modalDetail} onClose={() => setModalDetail(null)} />
    </div>
  );
};
