import React, { useState } from 'react';
import { SPELLS_LIST } from '../../data/spells';
import { Spell } from '../../types/rules';
import { Check, Info, Sparkles, Zap, BookOpen } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepSpellsProps {
  isSpellcaster: boolean;
  spellcasterType?: 'arcana' | 'divina';
  allowedCount: number;
  selectedSpells: string[];
  onSelectSpells: (spells: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepSpells: React.FC<StepSpellsProps> = ({
  isSpellcaster,
  spellcasterType = 'arcana',
  allowedCount,
  selectedSpells,
  onSelectSpells,
  onOpenDetail,
}) => {
  const [schoolFilter, setSchoolFilter] = useState<string>('todas');
  const [search, setSearch] = useState('');

  if (!isSpellcaster || allowedCount <= 0) {
    return (
      <div className="t20-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <Sparkles size={40} style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }} />
        <h3>Sem Conjuração de Magias no 1º Nível</h3>
        <p style={{ maxWidth: '500px', margin: '0.5rem auto 0 auto', color: 'var(--text-muted)' }}>
          Sua classe atual foca em perícias mundanas, técnicas marciais ou poderes de combate físicos. Você não precisa escolher magias neste passo!
        </p>
      </div>
    );
  }

  // Filtra magias disponíveis pelo tipo do conjurador (Arcana ou Divina ou Universal)
  const availableSpells = SPELLS_LIST.filter((s) => {
    const matchesType = s.type === 'universal' || s.type === spellcasterType;
    const matchesSchool = schoolFilter === 'todas' || s.school.toLowerCase() === schoolFilter.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSchool && matchesSearch;
  });

  const handleToggleSpell = (spellId: string) => {
    if (selectedSpells.includes(spellId)) {
      onSelectSpells(selectedSpells.filter((id) => id !== spellId));
    } else {
      if (selectedSpells.length < allowedCount) {
        onSelectSpells([...selectedSpells, spellId]);
      }
    }
  };

  const schools = ['todas', 'Abjuração', 'Adivinhação', 'Convocação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 7: Escolha suas Magias Iniciais</h2>
        <p>
          Como conjurador de magias {spellcasterType === 'arcana' ? 'arcanas' : 'divinas'}, você começa o jogo conhecendo <strong>{allowedCount} magias de 1º círculo</strong>. Em Tormenta 20, magias de 1º círculo têm custo base de 1 PM e podem ser enriquecidas com aprimoramentos.
        </p>
      </div>

      {/* Controles de Filtro e Progresso */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem', maxWidth: '700px' }}>
          {schools.map((sch) => (
            <button
              key={sch}
              type="button"
              onClick={() => setSchoolFilter(sch)}
              className={`btn ${schoolFilter === sch ? 'btn-gold' : 'btn-secondary'}`}
              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
            >
              {sch.charAt(0).toUpperCase() + sch.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className={`badge ${selectedSpells.length === allowedCount ? 'badge-green' : 'badge-gold'}`}>
            {selectedSpells.length} de {allowedCount} magias escolhidas
          </span>
          <input
            type="text"
            placeholder="Buscar magia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '180px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Grade de Magias */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.85rem',
        }}
      >
        {availableSpells.map((spell) => {
          const isSelected = selectedSpells.includes(spell.id);
          return (
            <div
              key={spell.id}
              onClick={() => handleToggleSpell(spell.id)}
              className="t20-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--t20-gold)' : 'var(--border-color)',
                background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-card)',
                boxShadow: isSelected ? '0 0 15px rgba(245, 158, 11, 0.25)' : 'none',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.05rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff', margin: 0 }}>
                      {spell.name}
                    </h3>
                  </div>
                  {isSelected && <Check size={18} style={{ color: 'var(--t20-gold)' }} />}
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', margin: '0.4rem 0' }}>
                  <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                    1 PM
                  </span>
                  <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                    {spell.school}
                  </span>
                  <span className="badge badge-slate" style={{ fontSize: '0.65rem' }}>
                    {spell.execution}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '0.825rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  {spell.description.length > 120 ? `${spell.description.substring(0, 120)}...` : spell.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Alcance: {spell.range} • {spell.duration}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail({
                      title: spell.name,
                      category: `Magia ${spell.type} (1º Círculo)`,
                      subtitle: `${spell.school} • Execução: ${spell.execution}`,
                      cost: '1 PM',
                      range: spell.range,
                      targetArea: spell.targetArea,
                      duration: spell.duration,
                      resistance: spell.resistance,
                      description: spell.description,
                      upgrades: spell.upgrades,
                    });
                  }}
                  className="btn btn-ghost"
                  style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.2rem' }}
                >
                  <Info size={14} /> Detalhes
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
