import React, { useState } from 'react';
import { DEITIES_LIST } from '../../data/deities';
import { Deity } from '../../types/rules';
import { Check, Info, Shield, Sparkles, AlertCircle } from 'lucide-react';
import { DetailModalData } from '../common/DetailModal';

interface StepDeityProps {
  selectedDeityId: string;
  selectedDeityPowers: string[];
  characterClassId: string;
  characterRaceId: string;
  onSelectDeity: (deityId: string) => void;
  onSelectDeityPowers: (powers: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepDeity: React.FC<StepDeityProps> = ({
  selectedDeityId,
  selectedDeityPowers,
  characterClassId,
  characterRaceId,
  onSelectDeity,
  onSelectDeityPowers,
  onOpenDetail,
}) => {
  const [search, setSearch] = useState('');

  const currentDeity = DEITIES_LIST.find((d) => d.id === selectedDeityId);
  const isNoDeity = selectedDeityId === 'nenhum' || !selectedDeityId;

  // Clérigo recebe todos os poderes concedidos de sua divindade (ou 2), Paladino recebe poderes concedidos, etc.
  const powerLimit = characterClassId === 'clerigo' ? (currentDeity?.grantedPowers.length || 1) : 1;

  const filteredDeities = DEITIES_LIST.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleDeityPower = (powerName: string) => {
    if (selectedDeityPowers.includes(powerName)) {
      onSelectDeityPowers(selectedDeityPowers.filter((p) => p !== powerName));
    } else {
      if (selectedDeityPowers.length < powerLimit) {
        onSelectDeityPowers([...selectedDeityPowers, powerName]);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 4: Escolha sua Divindade (Opcional)</h2>
        <p>
          Em Arton, os vinte deuses do Panteão são forças reais que moldam o destino dos povos. Devotar-se a um deus concede poderes concedidos milagrosos, mas exige respeitar suas obrigações e crenças sagradas.
        </p>
      </div>

      {/* Busca */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => {
            onSelectDeity('nenhum');
            onSelectDeityPowers([]);
          }}
          className={`btn ${isNoDeity ? 'btn-gold' : 'btn-secondary'}`}
          style={{ padding: '0.45rem 1rem' }}
        >
          {isNoDeity ? '✓ ' : ''}Sem Divindade (Não Devoto)
        </button>

        <div style={{ maxWidth: '280px', width: '100%' }}>
          <input
            type="text"
            placeholder="Buscar deus do Panteão..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.45rem 0.8rem', fontSize: '0.9rem' }}
          />
        </div>
      </div>

      {/* Grade de Deuses */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '0.75rem',
          maxHeight: '260px',
          overflowY: 'auto',
          padding: '0.25rem',
        }}
      >
        {filteredDeities.map((deity) => {
          const isSelected = deity.id === selectedDeityId;
          return (
            <div
              key={deity.id}
              onClick={() => {
                onSelectDeity(deity.id);
                // Se for clérigo, seleciona todos os poderes concedidos por padrão
                if (characterClassId === 'clerigo') {
                  onSelectDeityPowers(deity.grantedPowers.map((p) => p.name));
                } else {
                  onSelectDeityPowers([deity.grantedPowers[0]?.name || '']);
                }
              }}
              className="t20-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--t20-ruby)' : 'var(--border-color)',
                background: isSelected ? 'rgba(230, 57, 70, 0.12)' : 'var(--bg-card)',
                boxShadow: isSelected ? '0 0 15px rgba(230, 57, 70, 0.35)' : 'none',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff' }}>
                  {deity.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{deity.title}</div>
              </div>
              {isSelected && <Check size={16} style={{ color: 'var(--t20-ruby)' }} />}
            </div>
          );
        })}
      </div>

      {/* Detalhes do Deus Selecionado */}
      {currentDeity && !isNoDeity && (
        <div className="t20-card t20-card-gold" style={{ marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--t20-gold-light)', margin: 0 }}>
                  {currentDeity.name}
                </h3>
                <span className="badge badge-ruby">{currentDeity.title}</span>
                <span className="badge badge-blue">Energia {currentDeity.energyChannel}</span>
              </div>
              <p style={{ marginTop: '0.35rem', fontSize: '0.925rem', color: '#cbd5e1' }}>
                {currentDeity.description}
              </p>
            </div>
          </div>

          {/* Símbolo Sagrado, Arma e Devotos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Símbolo Sagrado:</span>
              <strong style={{ color: 'var(--text-main)' }}>{currentDeity.symbol}</strong>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Arma Preferida:</span>
              <strong style={{ color: 'var(--t20-gold)' }}>{currentDeity.favoredWeapon}</strong>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)', display: 'block' }}>Devotos Típicos:</span>
              <span style={{ color: '#cbd5e1' }}>{currentDeity.allowedDevoteesText}</span>
            </div>
          </div>

          {/* Obrigações e Restrições */}
          <div style={{ marginBottom: '1.5rem', background: 'rgba(239, 68, 68, 0.08)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              <AlertCircle size={16} />
              <span>Obrigações & Restrições:</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#fca5a5' }}>
              {currentDeity.obligations}
            </p>
          </div>

          {/* Seleção de Poderes Concedidos */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--t20-gold-light)', fontSize: '1rem' }}>
                {characterClassId === 'clerigo'
                  ? 'Poderes Concedidos (Clérigos fiéis recebem todos os poderes):'
                  : 'Escolha 1 Poder Concedido por sua devoção:'}
              </span>
              <span className="badge badge-gold">
                {selectedDeityPowers.length} de {powerLimit} escolhido(s)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {currentDeity.grantedPowers.map((pow) => {
                const isChecked = selectedDeityPowers.includes(pow.name);
                return (
                  <div
                    key={pow.id}
                    onClick={() => handleToggleDeityPower(pow.name)}
                    className="t20-card"
                    style={{
                      cursor: 'pointer',
                      padding: '0.85rem 1rem',
                      borderColor: isChecked ? 'var(--t20-gold)' : 'var(--border-color)',
                      background: isChecked ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, color: isChecked ? 'var(--t20-gold-light)' : '#ffffff' }}>
                          {pow.name}
                        </span>
                        {isChecked && <Check size={16} style={{ color: 'var(--t20-gold)' }} />}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetail({
                            title: pow.name,
                            category: `Poder Concedido (${currentDeity.name})`,
                            prerequisites: pow.prerequisites,
                            description: pow.description,
                          });
                        }}
                        className="btn btn-ghost"
                        style={{ padding: '0.2rem 0.4rem', fontSize: '0.75rem', gap: '0.25rem' }}
                      >
                        <Info size={14} />
                        Ver Detalhes
                      </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {pow.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isNoDeity && (
        <div className="t20-card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Sparkles size={32} style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }} />
          <h3>Personagem Sem Divindade</h3>
          <p style={{ maxWidth: '500px', margin: '0.5rem auto 0 auto' }}>
            Seu herói não é devoto fervoroso de nenhuma divindade específica do Panteão. Ele não recebe poderes concedidos, mas também não precisa obedecer a obrigações e restrições religiosas estritas.
          </p>
        </div>
      )}
    </div>
  );
};
