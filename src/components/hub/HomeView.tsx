import React from 'react';
import {
  Users,
  BookOpen,
  Sparkles,
  Package,
  Plus,
  Shield,
  Heart,
  Zap,
  ArrowRight,
  Scroll,
  Dices,
} from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { ClassBadge } from '../common/T20Badge';
import { getClassTheme } from '../../styles/classTheme';

interface HomeViewProps {
  characters: CharacterSheet[];
  activeCharacter: CharacterSheet | null;
  onNavigateToCharacters: () => void;
  onOpenCharacterSheet: (char: CharacterSheet) => void;
  onCreateNewCharacter: () => void;
  onNavigateToCompendium: (tab: 'magias' | 'poderes' | 'itens', subTab?: 'gerais' | 'classe') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  characters,
  activeCharacter,
  onNavigateToCharacters,
  onOpenCharacterSheet,
  onCreateNewCharacter,
  onNavigateToCompendium,
}) => {
  const lastActiveOrFirst = activeCharacter || (characters.length > 0 ? characters[0] : null);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 6rem 1.5rem', maxWidth: '1280px' }}>
      {/* Hero Banner Épico */}
      <div
        className="t20-card t20-card-gold"
        style={{
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          background: 'radial-gradient(ellipse at top right, rgba(230, 57, 70, 0.28) 0%, rgba(20, 23, 38, 0.95) 75%)',
          border: '1px solid var(--border-gold)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
            <span className="badge badge-ruby" style={{ fontWeight: 800 }}>TORMENTA 20</span>
            <span className="badge badge-gold">Edição Jogo do Ano (v1.3)</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', lineHeight: 1.15, margin: '0.25rem 0 0.85rem 0' }}>
            Forje e Comande Heróis de Arton
          </h1>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
            Aplicativo oficial de criação, evolução e gerenciamento de fichas com cálculos canônicos em tempo real, compêndio completo e registro auditável de rolagens.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '220px' }}>
          <button
            type="button"
            onClick={onCreateNewCharacter}
            className="btn btn-primary"
            style={{
              padding: '0.9rem 1.5rem',
              fontSize: '1.05rem',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(230, 57, 70, 0.45)',
              fontWeight: 800,
            }}
          >
            <Plus size={20} />
            Novo Personagem
          </button>
          <button
            type="button"
            onClick={onNavigateToCharacters}
            className="btn btn-secondary"
            style={{ padding: '0.75rem 1.25rem', fontSize: '0.95rem', gap: '0.5rem' }}
          >
            <Users size={18} />
            Ver Fichas ({characters.length})
          </button>
        </div>
      </div>

      {/* Destaque do Personagem Ativo / Recente (se houver) */}
      {lastActiveOrFirst && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--t20-gold-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} />
              Personagem em Destaque
            </h2>
            <button
              type="button"
              onClick={onNavigateToCharacters}
              className="btn btn-ghost"
              style={{ fontSize: '0.85rem', gap: '0.35rem', color: 'var(--text-muted)' }}
            >
              Ver todos ({characters.length})
              <ArrowRight size={14} />
            </button>
          </div>

          {(() => {
            const heroTheme = getClassTheme(lastActiveOrFirst.classId);
            return (
              <div
                className="t20-card"
                style={{
                  padding: '1.5rem',
                  background: `linear-gradient(135deg, ${heroTheme.surface}35 0%, rgba(15, 18, 30, 0.95) 100%)`,
                  borderLeft: `4px solid ${heroTheme.primary}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                }}
              >
                <div style={{ flex: '1 1 280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{lastActiveOrFirst.name}</h3>
                    <ClassBadge classIdOrName={lastActiveOrFirst.classId} />
                    <span className="badge badge-gold">Nível {lastActiveOrFirst.level}</span>
                  </div>
                  <p style={{ margin: '0.15rem 0 0.75rem 0', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                    {lastActiveOrFirst.raceId.toUpperCase()} • {lastActiveOrFirst.originId.toUpperCase()}
                  </p>

                  <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f87171', fontWeight: 700 }}>
                      <Heart size={16} />
                      <span>{lastActiveOrFirst.stats.currentHp} / {lastActiveOrFirst.stats.maxHp.value} PV</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#60a5fa', fontWeight: 700 }}>
                      <Zap size={16} />
                      <span>{lastActiveOrFirst.stats.currentMp} / {lastActiveOrFirst.stats.maxMp.value} PM</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--t20-gold)', fontWeight: 700 }}>
                      <Shield size={16} />
                      <span>{lastActiveOrFirst.stats.defense.value} Defesa</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => onOpenCharacterSheet(lastActiveOrFirst)}
                    className="btn btn-gold"
                    style={{ padding: '0.75rem 1.4rem', fontWeight: 700, gap: '0.45rem' }}
                  >
                    Abrir Ficha
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Grid de Acesso Rápido / Compêndio */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} />
          Compêndio de Regras e Conteúdo
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Card Magias */}
          <div
            className="t20-card"
            onClick={() => onNavigateToCompendium('magias')}
            style={{
              padding: '1.35rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#60a5fa' }}>
                <BookOpen size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Grimório de Magias</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Catálogo canônico de magias arcanas e divinas do 1º ao 5º círculo com custos em PM, escolas e aprimoramentos.
              </p>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--t20-gold)', fontWeight: 600 }}>
              <span>Explorar Magias</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card Poderes Gerais */}
          <div
            className="t20-card"
            onClick={() => onNavigateToCompendium('poderes', 'gerais')}
            style={{
              padding: '1.35rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--artonian-gold, #f59e0b)' }}>
                <Sparkles size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Poderes Gerais</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Poderes de Combate, Destino, Magia, Concedidos e Tormenta com validação automática de pré-requisitos canônicos.
              </p>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--t20-gold)', fontWeight: 600 }}>
              <span>Ver Poderes Gerais</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card Poderes por Classe */}
          <div
            className="t20-card"
            onClick={() => onNavigateToCompendium('poderes', 'classe')}
            style={{
              padding: '1.35rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--t20-gold)' }}>
                <Shield size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Poderes por Classe</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Habilidades e poderes específicos para as 14 classes de Arton com filtros por classe e pré-requisitos oficiais.
              </p>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--t20-gold)', fontWeight: 600 }}>
              <span>Ver Poderes de Classe</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card Itens e Equipamento */}
          <div
            className="t20-card"
            onClick={() => onNavigateToCompendium('itens')}
            style={{
              padding: '1.35rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'var(--transition)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--t20-life-light, #34d399)' }}>
                <Package size={22} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>Itens & Oficina</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Armas, armaduras, escudos e itens gerais com regras de espaços de carga, melhorias mecânicas e materiais especiais.
              </p>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--t20-gold)', fontWeight: 600 }}>
              <span>Consultar Itens</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Regras Oficiais T20 JDA em Destaque */}
      <div
        className="t20-card"
        style={{
          padding: '1.5rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
          <Scroll size={18} style={{ color: 'var(--t20-gold)' }} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>
            Diretrizes Canônicas do Sistema (T20 JDA v1.3)
          </h3>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#cbd5e1',
          }}
        >
          <div>
            <strong style={{ color: 'var(--t20-gold-light)' }}>• Atributo é Modificador:</strong>
            <p style={{ margin: '0.25rem 0 0 0', lineHeight: 1.5 }}>
              Não há valores como 10-20. O valor do atributo (ex: Força +3) é o modificador aplicado diretamente.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--t20-gold-light)' }}>• Resistências são Perícias:</strong>
            <p style={{ margin: '0.25rem 0 0 0', lineHeight: 1.5 }}>
              Fortitude (CON), Reflexos (DES) e Vontade (SAB) são perícias normais e rolam com metade do nível + treino.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--t20-gold-light)' }}>• Limite de Gasto de PM:</strong>
            <p style={{ margin: '0.25rem 0 0 0', lineHeight: 1.5 }}>
              O total de Pontos de Mana gasto por magia ou efeito nunca pode ultrapassar o nível do personagem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
