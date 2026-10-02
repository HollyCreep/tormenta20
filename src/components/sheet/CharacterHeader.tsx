import React from 'react';
import {
  ChevronLeft,
  FileText,
  Edit,
  Download,
  Printer,
  TrendingUp,
  Shield,
  Sword,
  Compass,
  Sparkles,
  User,
  Info,
} from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { ClassBadge } from '../common/T20Badge';
import { getClassTheme } from '../../styles/classTheme';

interface CharacterHeaderProps {
  character: CharacterSheet;
  activeTab: string;
  onBackToList: () => void;
  onSelectTab: (tab: any) => void;
  onEditInWizard: () => void;
  onExportJson: () => void;
  onOpenLevelUp: () => void;
  onOpenRaceDetail: () => void;
  onOpenClassDetail: () => void;
  onOpenOriginDetail: () => void;
  onOpenDeityDetail: () => void;
}

export const CharacterHeader: React.FC<CharacterHeaderProps> = ({
  character,
  activeTab,
  onBackToList,
  onSelectTab,
  onEditInWizard,
  onExportJson,
  onOpenLevelUp,
  onOpenRaceDetail,
  onOpenClassDetail,
  onOpenOriginDetail,
  onOpenDeityDetail,
}) => {
  const classTheme = getClassTheme(character.classId);

  return (
    <>
      {/* Barra de Ações Superior */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <button
          type="button"
          onClick={onBackToList}
          className="btn btn-secondary"
          style={{ gap: '0.4rem' }}
        >
          <ChevronLeft size={18} />
          Voltar às Fichas
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => onSelectTab('logs')}
            className={`btn ${activeTab === 'logs' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ gap: '0.4rem' }}
            title="Ver logs e auditoria da ficha deste personagem"
          >
            <FileText size={16} />
            <span>Logs</span>
          </button>
          <button
            type="button"
            onClick={onEditInWizard}
            className="btn btn-secondary"
            style={{ gap: '0.4rem' }}
          >
            <Edit size={16} />
            Editar no Criador
          </button>
          <button
            type="button"
            onClick={onExportJson}
            className="btn btn-secondary"
            style={{ gap: '0.4rem' }}
          >
            <Download size={16} />
            Exportar JSON
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-gold"
            style={{ gap: '0.4rem' }}
          >
            <Printer size={16} />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Cartão de Cabeçalho do Personagem (Hero Card Estruturado) */}
      <div
        className="t20-card"
        style={{
          marginBottom: '1.5rem',
          background: `linear-gradient(135deg, ${classTheme.surface}35 0%, rgba(17, 24, 39, 0.95) 100%)`,
          borderLeft: `4px solid ${classTheme.primary}`,
          borderTop: '1px solid var(--border-color)',
          borderRight: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <h1 style={{ fontSize: '2.1rem', margin: 0, lineHeight: 1.1 }}>{character.name}</h1>
              <ClassBadge classIdOrName={character.classId} />
              <span className="badge badge-gold" style={{ fontSize: '0.825rem', padding: '0.25rem 0.75rem' }}>
                Nível {character.level}
              </span>
              <button
                type="button"
                onClick={onOpenLevelUp}
                className="btn btn-gold no-print"
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  gap: '0.4rem',
                  boxShadow: '0 0 15px rgba(217, 119, 6, 0.4)',
                }}
              >
                <TrendingUp size={15} />
                Subir de Nível
              </button>
            </div>
            {character.concept && (
              <p style={{ margin: '0.15rem 0 0.85rem 0', fontSize: '0.95rem', color: 'var(--t20-gold-light)', fontStyle: 'italic' }}>
                "{character.concept}"
              </p>
            )}

            {/* Grid Organizado de Identidade do Personagem */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.6rem',
                marginTop: '0.75rem',
              }}
            >
              {/* Raça */}
              <div className="char-info-pill">
                <Shield size={14} style={{ color: 'var(--t20-gold)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Raça</span>
                  <span className="char-info-value">{character.raceId.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenRaceDetail}
                  className="char-info-btn"
                  title="Ver regras e habilidades raciais completas"
                >
                  <Info size={13} />
                </button>
              </div>

              {/* Classe */}
              <div
                className="char-info-pill"
                style={{
                  borderLeft: `3px solid ${classTheme.primary}`,
                  background: `linear-gradient(90deg, ${classTheme.surface}44 0%, rgba(0,0,0,0.2) 100%)`,
                }}
              >
                <Sword size={14} style={{ color: classTheme.primary }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label" style={{ color: classTheme.secondary }}>Classe</span>
                  <span className="char-info-value" style={{ color: classTheme.text }}>
                    {character.classes && character.classes.length > 1
                      ? character.classes.map((c) => `${c.className} ${c.level}`).join(' / ')
                      : `${character.classId.toUpperCase()} ${character.level}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenClassDetail}
                  className="char-info-btn"
                  title="Ver características e progressão da classe"
                >
                  <Info size={13} style={{ color: classTheme.secondary }} />
                </button>
              </div>

              {/* Origem */}
              <div className="char-info-pill">
                <Compass size={14} style={{ color: 'var(--t20-life-light, #34d399)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Origem</span>
                  <span className="char-info-value">{character.originId.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenOriginDetail}
                  className="char-info-btn"
                  title="Ver benefícios e itens da origem"
                >
                  <Info size={13} />
                </button>
              </div>

              {/* Divindade */}
              <div className="char-info-pill">
                <Sparkles size={14} style={{ color: 'var(--t20-mana-light, #60a5fa)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Divindade</span>
                  <span className="char-info-value" style={{ color: character.deityId !== 'nenhum' ? 'var(--t20-gold)' : undefined }}>
                    {character.deityId !== 'nenhum' ? character.deityId.toUpperCase() : 'NENHUMA'}
                  </span>
                </div>
                {character.deityId !== 'nenhum' && (
                  <button
                    type="button"
                    onClick={onOpenDeityDetail}
                    className="char-info-btn"
                    title="Ver poderes concedidos e obrigações da divindade"
                  >
                    <Info size={13} />
                  </button>
                )}
              </div>

              {/* Jogador */}
              <div className="char-info-pill">
                <User size={14} style={{ color: 'var(--text-dim)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="char-info-label">Jogador</span>
                  <span className="char-info-value">{character.playerName || 'Lucas'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
