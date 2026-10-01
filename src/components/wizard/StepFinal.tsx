import React from 'react';
import { CharacterSheet, StatBreakdown } from '../../types/character';
import { StatBreakdownBadge } from '../common/StatBreakdownBadge';
import { RACES_LIST } from '../../data/races';
import { CLASSES_LIST } from '../../data/classes';
import { ORIGINS_LIST } from '../../data/origins';
import { DEITIES_LIST } from '../../data/deities';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { Check, Sparkles, Shield, Heart, Zap, User, BookOpen, Feather } from 'lucide-react';

interface StepFinalProps {
  name: string;
  playerName: string;
  concept: string;
  bio: CharacterSheet['bio'];
  raceId: string;
  classId: string;
  originId: string;
  deityId: string;
  totalAttributes: CharacterSheet['totalAttributes'];
  stats: CharacterSheet['stats'];
  trainedSkillsCount: number;
  powersCount: number;
  spellsCount: number;
  onChangeName: (name: string) => void;
  onChangePlayerName: (playerName: string) => void;
  onChangeConcept: (concept: string) => void;
  onChangeBio: (bio: CharacterSheet['bio']) => void;
}

export const StepFinal: React.FC<StepFinalProps> = ({
  name,
  playerName,
  concept,
  bio,
  raceId,
  classId,
  originId,
  deityId,
  totalAttributes,
  stats,
  trainedSkillsCount,
  powersCount,
  spellsCount,
  onChangeName,
  onChangePlayerName,
  onChangeConcept,
  onChangeBio,
}) => {
  const race = RACES_LIST.find((r) => r.id === raceId);
  const cls = CLASSES_LIST.find((c) => c.id === classId);
  const origin = ORIGINS_LIST.find((o) => o.id === originId);
  const deity = DEITIES_LIST.find((d) => d.id === deityId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabeçalho */}
      <div>
        <h2>Passo 9: Toques Finais & Revisão</h2>
        <p>
          Dê um nome ao seu herói artoniano, defina sua personalidade e revise todas as características calculadas automaticamente pelas regras de Tormenta 20 (Jogo do Ano v1.3).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Formulário de Identidade */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="t20-card">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--t20-gold-light)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={18} />
              Identidade Básica
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Nome do Personagem: *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Thuran, Lyra, Kael..."
                  value={name}
                  onChange={(e) => onChangeName(e.target.value)}
                  style={{ fontSize: '1rem', fontWeight: 600 }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Nome do Jogador:
                </label>
                <input
                  type="text"
                  placeholder="Seu nome ou apelido"
                  value={playerName}
                  onChange={(e) => onChangePlayerName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  Conceito / Epíteto:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Guerreiro veterano de Doherimm em busca de glória"
                  value={concept}
                  onChange={(e) => onChangeConcept(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="t20-card">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--t20-gold-light)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Feather size={18} />
              Aparência & Biografia
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Gênero:</label>
                  <input
                    type="text"
                    placeholder="Ex: Masculino, Feminino..."
                    value={bio.gender || ''}
                    onChange={(e) => onChangeBio({ ...bio, gender: e.target.value })}
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Idade:</label>
                  <input
                    type="text"
                    placeholder="Ex: 24 anos"
                    value={bio.age || ''}
                    onChange={(e) => onChangeBio({ ...bio, age: e.target.value })}
                    style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Aparência Física:</label>
                <textarea
                  rows={2}
                  placeholder="Trajes, cicatrizes, cabelos, olhos, porte físico..."
                  value={bio.appearance || ''}
                  onChange={(e) => onChangeBio({ ...bio, appearance: e.target.value })}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.2rem' }}>Personalidade & Histórico:</label>
                <textarea
                  rows={3}
                  placeholder="Como o personagem se comporta, seus objetivos e sua origem antes da aventura..."
                  value={bio.history || ''}
                  onChange={(e) => onChangeBio({ ...bio, history: e.target.value })}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Prévia da Ficha Criada com Somatórias Interativas */}
        <div>
          <div className="t20-card t20-card-gold" style={{ position: 'sticky', top: '1.5rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: 0 }}>
                    {name || 'Personagem Sem Nome'}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--t20-gold-light)', marginTop: '0.2rem' }}>
                    {race?.name} {cls?.name} (Nível 1)
                  </div>
                </div>
                <span className="badge badge-ruby">Nível 1</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                Origem: <strong>{origin?.name}</strong> • Divindade: <strong>{deity ? deity.name : 'Nenhuma'}</strong>
              </div>
            </div>

            {/* Vitais com Badges de Cálculo Interativo */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <div style={{ fontSize: '0.75rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.25rem' }}>
                  <Heart size={14} />
                  <span>Pontos de Vida (PV)</span>
                </div>
                <StatBreakdownBadge label="PV Máximo" breakdown={stats.maxHp} variant="ruby" size="lg" />
              </div>

              <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                <div style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.25rem' }}>
                  <Zap size={14} />
                  <span>Pontos de Mana (PM)</span>
                </div>
                <StatBreakdownBadge label="PM Máximo" breakdown={stats.maxMp} variant="blue" size="lg" />
              </div>

              <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--t20-gold)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.25rem' }}>
                  <Shield size={14} />
                  <span>Defesa Total</span>
                </div>
                <StatBreakdownBadge label="Defesa" breakdown={stats.defense} variant="gold" size="lg" />
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                  <span>Deslocamento</span>
                </div>
                <StatBreakdownBadge label="Deslocamento" breakdown={stats.speed} variant="default" size="lg" />
              </div>
            </div>

            {/* Atributos Resumidos */}
            <div style={{ marginBottom: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>Atributos Finais:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.35rem', textAlign: 'center' }}>
                {ATTRIBUTES_LIST.map((a) => {
                  const val = totalAttributes[a.key];
                  return (
                    <div key={a.key} style={{ padding: '0.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{a.shortName}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: val > 0 ? 'var(--t20-gold-light)' : val < 0 ? '#f87171' : '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                        {val > 0 ? `+${val}` : val}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contadores de Recursos Escolhidos */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span className="badge badge-slate">{trainedSkillsCount} Perícias Treinadas</span>
              <span className="badge badge-slate">{powersCount} Poderes e Habilidades</span>
              {spellsCount > 0 && <span className="badge badge-blue">{spellsCount} Magias Aprendidas</span>}
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
              Passe o mouse ou clique sobre <strong>Defesa</strong>, <strong>PV</strong> ou <strong>PM</strong> para inspecionar os cálculos matemáticos em tempo real!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
