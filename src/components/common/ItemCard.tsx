import React, { useState } from 'react';
import { EquipmentItem } from '../../types/rules';
import {
  Coins,
  Shield,
  ArrowDown,
  Sword,
  Swords,
  Gavel,
  BowArrow,
  Target,
  Crosshair,
  Sparkles,
  Info,
  Wrench,
  Check,
  Plus,
  Trash2,
  Weight,
  Flame,
  Zap,
} from 'lucide-react';
import { DetailModal } from './DetailModal';
import { getEquipmentDetailModalData } from '../../utils/equipmentDetail';

interface ItemCardProps {
  item: EquipmentItem;
  appliedModifiers?: string[];
  specialMaterial?: string;
  sourceBadge?: string;
  isFree?: boolean;
  onOpenDetail?: (item: EquipmentItem) => void;
  onCustomize?: (item: EquipmentItem) => void;
  onAdd?: (item: EquipmentItem) => void;
  onRemove?: () => void;
  onToggleEquipped?: () => void;
  isEquipped?: boolean;
  actionType?: 'add' | 'inventory' | 'compendium';
}

interface StatChipProps {
  icon: React.ReactNode;
  value?: React.ReactNode;
  tooltipTitle: string;
  tooltipDesc?: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
  ariaLabel: string;
  iconOnly?: boolean;
}

const StatChip: React.FC<StatChipProps> = ({
  icon,
  value,
  tooltipTitle,
  tooltipDesc,
  themeColor,
  ariaLabel,
  iconOnly = false,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setActive((prev) => !prev);
        }}
        aria-label={ariaLabel}
        title={`${tooltipTitle}${tooltipDesc ? ` - ${tooltipDesc}` : ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: iconOnly ? 0 : '0.35rem',
          padding: iconOnly ? '0.35rem 0.55rem' : '0.28rem 0.65rem',
          borderRadius: '9999px',
          background: themeColor.bg,
          border: `1px solid ${active ? themeColor.text : themeColor.border}`,
          color: themeColor.text,
          fontSize: '0.825rem',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: active ? `0 0 12px ${themeColor.glow}` : '0 2px 4px rgba(0, 0, 0, 0.25)',
          transform: active ? 'translateY(-1px)' : 'none',
          outline: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        {icon}
        {value !== undefined && !iconOnly && (
          <span style={{ letterSpacing: '0.02em', fontSize: '0.825rem' }}>{value}</span>
        )}
      </button>

      {/* Floating Micro-Tooltip */}
      {active && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#090d16',
            border: `1px solid ${themeColor.border}`,
            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.85), 0 0 12px ${themeColor.glow}`,
            borderRadius: '8px',
            padding: '0.5rem 0.75rem',
            minWidth: '160px',
            maxWidth: '240px',
            zIndex: 999,
            pointerEvents: 'none',
            textAlign: 'center',
            animation: 'popoverFadeIn 0.15s ease-out',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: themeColor.text, lineHeight: 1.25 }}>
            {tooltipTitle}
          </div>
          {tooltipDesc && (
            <div style={{ fontSize: '0.725rem', color: '#cbd5e1', marginTop: '0.25rem', lineHeight: 1.35 }}>
              {tooltipDesc}
            </div>
          )}
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `5px solid ${themeColor.border}`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  appliedModifiers = [],
  specialMaterial,
  sourceBadge,
  isFree = false,
  onOpenDetail,
  onCustomize,
  onAdd,
  onRemove,
  onToggleEquipped,
  isEquipped = false,
  actionType = 'compendium',
}) => {
  const [internalDetailOpen, setInternalDetailOpen] = useState(false);

  const isArmorOrShield = item.category.startsWith('armadura') || item.category === 'escudo';
  const isWeapon = item.category.startsWith('arma');

  // Mapeamento dinâmico de ícones para tipos de dano
  const getDamageTypeIcon = (damageType?: string, size = 14) => {
    if (!damageType) return <Sparkles size={size} />;
    const dt = damageType.toLowerCase();
    if (dt.includes('perfuração') && dt.includes('corte')) return <Swords size={size} />;
    if (dt.includes('perfuração') || dt.includes('perfuracao')) return <BowArrow size={size} />;
    if (dt.includes('corte')) return <Sword size={size} />;
    if (dt.includes('impacto')) return <Gavel size={size} />;
    if (dt.includes('fogo')) return <Flame size={size} />;
    if (dt.includes('eletricidade')) return <Zap size={size} />;
    return <Sparkles size={size} />;
  };

  const getDamageTypeInfo = (damageType?: string) => {
    if (!damageType) return { title: 'Tipo de Dano', desc: 'Dano físico padrão de Tormenta 20.' };
    const dt = damageType.toLowerCase();
    if (dt.includes('perfuração') && dt.includes('corte')) {
      return {
        title: 'Tipo de Dano: Corte ou Perfuração',
        desc: 'O atacante escolhe se causa corte ou perfuração a cada ataque realizado.',
      };
    }
    if (dt.includes('perfuração') || dt.includes('perfuracao')) {
      return {
        title: 'Tipo de Dano: Perfuração',
        desc: 'Dano perfurante causado por pontas agudas e estocadas penetrantes.',
      };
    }
    if (dt.includes('corte')) {
      return {
        title: 'Tipo de Dano: Corte',
        desc: 'Dano cortante causado por lâminas afiadas e golpes de corte.',
      };
    }
    if (dt.includes('impacto')) {
      return {
        title: 'Tipo de Dano: Impacto',
        desc: 'Dano contundente causado por concussão, maças, martelos ou esmagamento.',
      };
    }
    if (dt.includes('fogo')) {
      return {
        title: 'Tipo de Dano: Fogo',
        desc: 'Dano ígneo por chamas ardentes ou calor extremo.',
      };
    }
    if (dt.includes('eletricidade')) {
      return {
        title: 'Tipo de Dano: Eletricidade',
        desc: 'Dano elétrico transmitido por descargas ou arcos de energia.',
      };
    }
    return {
      title: `Tipo de Dano: ${damageType}`,
      desc: 'Tipo de dano especializado conforme o livro de regras Tormenta 20.',
    };
  };

  const getCategoryBadge = () => {
    let label = item.category.replace('_', ' ').toUpperCase();
    let icon = <Weight size={13} />;
    let style = {
      color: '#cbd5e1',
      borderColor: 'rgba(148, 163, 184, 0.25)',
      bg: 'rgba(148, 163, 184, 0.1)',
    };

    if (isArmorOrShield) {
      icon = <Shield size={13} />;
      if (item.category === 'armadura_leve') {
        label = 'ARMADURA LEVE';
        style = { color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.35)', bg: 'rgba(56, 189, 248, 0.12)' };
      } else if (item.category === 'armadura_pesada') {
        label = 'ARMADURA PESADA';
        style = { color: '#60a5fa', borderColor: 'rgba(96, 165, 250, 0.35)', bg: 'rgba(96, 165, 250, 0.12)' };
      } else {
        label = 'ESCUDO';
        style = { color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.35)', bg: 'rgba(52, 211, 153, 0.12)' };
      }
    } else if (isWeapon) {
      icon = <Sword size={13} />;
      if (item.category === 'arma_simples') {
        label = 'ARMA SIMPLES';
        style = { color: '#fb7185', borderColor: 'rgba(251, 113, 133, 0.35)', bg: 'rgba(251, 113, 133, 0.12)' };
      } else if (item.category === 'arma_marcial') {
        label = 'ARMA MARCIAL';
        style = { color: '#ff6b7b', borderColor: 'rgba(255, 107, 123, 0.35)', bg: 'rgba(255, 107, 123, 0.12)' };
      } else if (item.category === 'arma_exotica') {
        label = 'ARMA EXÓTICA';
        style = { color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.35)', bg: 'rgba(192, 132, 252, 0.12)' };
      } else if (item.category === 'arma_fogo') {
        label = 'ARMA DE FOGO';
        style = { color: '#fb923c', borderColor: 'rgba(251, 146, 60, 0.35)', bg: 'rgba(251, 146, 60, 0.12)' };
      }
    } else {
      if (item.category === 'alquimia') label = 'ALQUIMIA';
      else if (item.category === 'esoterico') label = 'ESOTÉRICO';
      else if (item.category === 'ferramenta') label = 'FERRAMENTA';
      else if (item.category === 'vestuario') label = 'VESTUÁRIO';
      else label = 'ITEM GERAL';

      style = { color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.35)', bg: 'rgba(251, 191, 36, 0.12)' };
    }

    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.22rem 0.6rem',
          borderRadius: '9999px',
          background: style.bg,
          border: `1px solid ${style.borderColor}`,
          color: style.color,
          fontSize: '0.725rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {icon}
        <span>{label}</span>
      </div>
    );
  };

  const handleOpenDetailClick = () => {
    if (onOpenDetail) {
      onOpenDetail(item);
    } else {
      setInternalDetailOpen(true);
    }
  };

  // Cores Temáticas para os Chips
  const goldTheme = {
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
    text: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.25)',
  };

  const slateTheme = {
    bg: 'rgba(148, 163, 184, 0.1)',
    border: 'rgba(148, 163, 184, 0.25)',
    text: '#cbd5e1',
    glow: 'rgba(148, 163, 184, 0.2)',
  };

  const emeraldTheme = {
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.35)',
    text: '#34d399',
    glow: 'rgba(16, 185, 129, 0.25)',
  };

  const rubyTheme = {
    bg: 'rgba(230, 57, 70, 0.12)',
    border: 'rgba(230, 57, 70, 0.35)',
    text: '#ff6b7b',
    glow: 'rgba(230, 57, 70, 0.25)',
  };

  const amberTheme = {
    bg: 'rgba(251, 191, 36, 0.12)',
    border: 'rgba(251, 191, 36, 0.35)',
    text: '#f59e0b',
    glow: 'rgba(251, 191, 36, 0.25)',
  };

  const purpleTheme = {
    bg: 'rgba(167, 139, 250, 0.12)',
    border: 'rgba(167, 139, 250, 0.35)',
    text: '#c4b5fd',
    glow: 'rgba(167, 139, 250, 0.25)',
  };

  const skyTheme = {
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
    text: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.25)',
  };

  return (
    <>
      <div
        className="t20-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem 1.35rem',
          borderRadius: '16px',
          background: 'radial-gradient(ellipse at top, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: isEquipped ? '1px solid var(--t20-gold)' : '1px solid rgba(148, 163, 184, 0.18)',
          boxShadow: isEquipped ? '0 0 15px rgba(245, 158, 11, 0.25)' : '0 4px 16px rgba(0, 0, 0, 0.35)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'visible', // Permite que tooltips flutuem sem corte
        }}
      >
        <div>
          {/* Cabeçalho: Título à Esquerda e Categoria à Direita (Idêntico à Imagem de Referência) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Badges de Estado (Equipado, Grátis, Melhorias, etc) */}
              {(sourceBadge || isFree || isEquipped || appliedModifiers.length > 0 || specialMaterial) && (
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                  {isEquipped && (
                    <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}>
                      ✓ Equipado
                    </span>
                  )}
                  {isFree && (
                    <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}>
                      Grátis
                    </span>
                  )}
                  {sourceBadge && (
                    <span className="badge badge-ruby" style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}>
                      {sourceBadge}
                    </span>
                  )}
                  {appliedModifiers.length > 0 && (
                    <span className="badge badge-blue" style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}>
                      <Sparkles size={10} /> {appliedModifiers.length} {appliedModifiers.length > 1 ? 'Melhorias' : 'Melhoria'}
                    </span>
                  )}
                  {specialMaterial && (
                    <span className="badge badge-ruby" style={{ fontSize: '0.68rem', padding: '0.12rem 0.5rem' }}>
                      {specialMaterial}
                    </span>
                  )}
                </div>
              )}

              {/* Título do Item em Caixa Alta e Fonte Fantasia */}
              <h3
                style={{
                  fontFamily: 'var(--font-fantasy)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1.25,
                  wordBreak: 'break-word',
                }}
              >
                {item.name}
              </h3>
            </div>

            {/* Tag / Badge de Categoria Alinhada no Topo Direito */}
            <div style={{ flexShrink: 0 }}>
              {getCategoryBadge()}
            </div>
          </div>

          {/* Linha Compacta de Chips com Ícones e Tooltips Interativos (Sem Textos Longos) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.45rem',
              marginBottom: '0.85rem',
            }}
          >
            {/* Preço (Moeda T$) */}
            <StatChip
              icon={<Coins size={14} />}
              value={isFree ? 'T$ 0' : item.price}
              tooltipTitle={`Preço: ${isFree ? 'Grátis (T$ 0)' : item.price}`}
              tooltipDesc="Valor de mercado em Tibares de Arton."
              themeColor={goldTheme}
              ariaLabel={`Preço do item: ${item.price}`}
            />

            {/* Espaços de Carga no Inventário */}
            <StatChip
              icon={<Weight size={14} />}
              value={item.spaces || 1}
              tooltipTitle={`Espaço: ${item.spaces || 1} ${(item.spaces || 1) === 1 ? 'espaço' : 'espaços'}`}
              tooltipDesc="Slots de capacidade de carga ocupados no inventário."
              themeColor={slateTheme}
              ariaLabel={`Espaço ocupado: ${item.spaces || 1} espaços`}
            />

            {/* Estatísticas de Armaduras e Escudos: Bônus de Defesa e Penalidade */}
            {isArmorOrShield && (
              <>
                <StatChip
                  icon={<Shield size={14} />}
                  value={item.defenseBonus && item.defenseBonus > 0 ? `+${item.defenseBonus}` : item.defenseBonus || '+0'}
                  tooltipTitle={`Bônus de Defesa: +${item.defenseBonus || 0}`}
                  tooltipDesc="Bônus numérico somado à Defesa total quando equipado."
                  themeColor={emeraldTheme}
                  ariaLabel={`Bônus de defesa: +${item.defenseBonus || 0}`}
                />

                <StatChip
                  icon={<ArrowDown size={14} />}
                  value={item.armorPenalty !== undefined ? item.armorPenalty : 0}
                  tooltipTitle={`Penalidade de Armadura: ${item.armorPenalty !== undefined ? item.armorPenalty : 0}`}
                  tooltipDesc={
                    item.armorPenalty && item.armorPenalty < 0
                      ? 'Penalidade aplicada em testes de perícias de Força e Destreza.'
                      : 'Esta proteção não impõe penalidades em perícias físicas.'
                  }
                  themeColor={rubyTheme}
                  ariaLabel={`Penalidade de armadura: ${item.armorPenalty || 0}`}
                />
              </>
            )}

            {/* Estatísticas de Armas: Ataque, Dano, Tipo de Dano (Somente Ícone), Crítico e Alcance */}
            {isWeapon && (
              <>
                {item.attackBonus && item.attackBonus > 0 && (
                  <StatChip
                    icon={<Sparkles size={13} />}
                    value={`+${item.attackBonus}`}
                    tooltipTitle={`Bônus de Ataque: +${item.attackBonus}`}
                    tooltipDesc="Bônus adicional somado a todas as rolagens no teste de ataque."
                    themeColor={skyTheme}
                    ariaLabel={`Bônus de ataque: +${item.attackBonus}`}
                  />
                )}

                {/* Dano Base */}
                <StatChip
                  icon={<Sparkles size={13} />}
                  value={item.damage || '1d4'}
                  tooltipTitle={`Dano Base: ${item.damage || '1d4'}`}
                  tooltipDesc="Rolagem de dano aplicada aos pontos de vida do alvo atingido."
                  themeColor={rubyTheme}
                  ariaLabel={`Dano: ${item.damage || '1d4'}`}
                />

                {/* Tipo de Dano: EXIBE SOMENTE O ÍCONE (Conforme solicitado) */}
                {item.damageType && (
                  <StatChip
                    icon={getDamageTypeIcon(item.damageType, 14)}
                    iconOnly={true}
                    tooltipTitle={getDamageTypeInfo(item.damageType).title}
                    tooltipDesc={getDamageTypeInfo(item.damageType).desc}
                    themeColor={rubyTheme}
                    ariaLabel={getDamageTypeInfo(item.damageType).title}
                  />
                )}

                {/* Crítico */}
                <StatChip
                  icon={<Target size={14} />}
                  value={item.critical || 'x2'}
                  tooltipTitle={`Crítico: ${item.critical || 'x2'}`}
                  tooltipDesc={
                    item.critical?.includes('/')
                      ? `Margem de ameaça ${item.critical.split('/')[0]} e dano multiplicado por ${item.critical.split('/')[1]}.`
                      : item.critical?.startsWith('x')
                        ? `Margem 20 no d20 e dano multiplicado por ${item.critical}.`
                        : `Acerto crítico a partir de ${item.critical} no d20 (multiplicador x2).`
                  }
                  themeColor={amberTheme}
                  ariaLabel={`Crítico: ${item.critical || 'x2'}`}
                />

                {/* Alcance (se houver) */}
                {item.range && (
                  <StatChip
                    icon={<Crosshair size={14} />}
                    value={item.range}
                    tooltipTitle={`Alcance: ${item.range}`}
                    tooltipDesc={
                      item.range === 'Curto'
                        ? 'Até 9 metros (6 quadrados no mapa tático).'
                        : item.range === 'Médio'
                          ? 'Até 30 metros (20 quadrados no mapa tático).'
                          : item.range === 'Longo'
                            ? 'Até 90 metros (60 quadrados no mapa tático).'
                            : 'Alcance de disparo ou arremesso da arma.'
                    }
                    themeColor={purpleTheme}
                    ariaLabel={`Alcance: ${item.range}`}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Rodapé: Link "Ver Detalhes do Item" e Ações Contextuais */}
        <div
          style={{
            borderTop: '1px solid rgba(148, 163, 184, 0.12)',
            paddingTop: '0.75rem',
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {onCustomize && actionType === 'compendium' && (
              <button
                type="button"
                onClick={() => onCustomize(item)}
                className="btn btn-secondary"
                style={{
                  color: 'var(--t20-gold)',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
                title="Personalizar na Oficina (melhorias, materiais especiais e encantos)"
              >
                <Wrench size={13} />
                <span>Oficina</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenDetailClick}
              className="btn btn-ghost"
              style={{
                color: '#f59e0b',
                padding: '0.25rem 0.45rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginLeft: 'auto',
                transition: 'all 0.15s ease',
              }}
              title="Abrir modal com todas as informações completas e sem abreviações"
            >
              <Info size={14} />
              <span>Ver Detalhes do Item</span>
            </button>
          </div>

          {/* Botões de Ação para o Wizard ou Inventário */}
          {actionType === 'add' && onAdd && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.85rem', gap: '0.4rem' }}
              >
                <Plus size={15} />
                Adicionar
              </button>
              {onCustomize && (
                <button
                  type="button"
                  onClick={() => onCustomize(item)}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.65rem', fontSize: '0.85rem' }}
                  title="Customizar na Oficina com melhorias e materiais especiais"
                >
                  <Wrench size={15} />
                </button>
              )}
            </div>
          )}

          {actionType === 'inventory' && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {onToggleEquipped && (
                <button
                  type="button"
                  onClick={onToggleEquipped}
                  className={`btn ${isEquipped ? 'btn-gold' : 'btn-secondary'}`}
                  style={{ flex: 1, padding: '0.35rem 0.65rem', fontSize: '0.8rem', gap: '0.3rem' }}
                >
                  <Check size={14} />
                  {isEquipped ? 'Desequipar' : 'Equipar'}
                </button>
              )}

              {onCustomize && (
                <button
                  type="button"
                  onClick={() => onCustomize(item)}
                  className="btn btn-secondary"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', gap: '0.3rem' }}
                  title="Modificar / Adicionar Melhorias na Oficina"
                >
                  <Wrench size={14} />
                  Modificar
                </button>
              )}

              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="btn btn-danger"
                  style={{ padding: '0.35rem 0.55rem' }}
                  title="Remover do Inventário"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes Completo Integrado (Fallback quando o pai não gerencia) */}
      {internalDetailOpen && (
        <DetailModal
          data={getEquipmentDetailModalData(item, sourceBadge, appliedModifiers, specialMaterial)}
          onClose={() => setInternalDetailOpen(false)}
        />
      )}
    </>
  );
};
