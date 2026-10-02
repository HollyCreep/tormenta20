import React from 'react';
import {
  Activity,
  Award,
  Clock,
  Compass,
  Eye,
  Flame,
  Layers,
  RefreshCw,
  Shield,
  Skull,
  Sparkles,
  Sword,
  Target,
  UserRound,
  Zap,
  Map as MapIcon,
} from 'lucide-react';
import { normalizeClassId } from '../../styles/classTheme';
import { classDisplayName } from '../../utils/displayNames';
import { ClassIcon, classColorVars } from './ClassSigil';

/* ---------------------------------------------------------------------------
   Escolas de magia
   --------------------------------------------------------------------------- */
export interface SchoolBadgeProps {
  school?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const getSchoolInfo = (school?: string) => {
  const key = (school || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  switch (key) {
    case 'evocacao':
      return { name: 'Evocação', className: 'badge-school-evocacao', icon: <Flame size={12} /> };
    case 'abjuracao':
      return { name: 'Abjuração', className: 'badge-school-abjuracao', icon: <Shield size={12} /> };
    case 'adivinhacao':
      return { name: 'Adivinhação', className: 'badge-school-adivinhacao', icon: <Eye size={12} /> };
    case 'convocacao':
      return { name: 'Convocação', className: 'badge-school-convocacao', icon: <Layers size={12} /> };
    case 'encantamento':
      return { name: 'Encantamento', className: 'badge-school-encantamento', icon: <Sparkles size={12} /> };
    case 'ilusao':
      return { name: 'Ilusão', className: 'badge-school-ilusao', icon: <Eye size={12} /> };
    case 'necromancia':
      return { name: 'Necromancia', className: 'badge-school-necromancia', icon: <Skull size={12} /> };
    case 'transmutacao':
      return { name: 'Transmutação', className: 'badge-school-transmutacao', icon: <RefreshCw size={12} /> };
    default:
      return { name: school || 'Magia', className: 'badge-slate', icon: <Sparkles size={12} /> };
  }
};

export const SchoolBadge: React.FC<SchoolBadgeProps> = ({ school, className = '', style }) => {
  const info = getSchoolInfo(school);
  return (
    <span className={`badge ${info.className} ${className}`} style={style}>
      {info.icon}
      {info.name}
    </span>
  );
};

/* ---------------------------------------------------------------------------
   Tipo, círculo, execução, alcance
   --------------------------------------------------------------------------- */
export const SpellTypeBadge: React.FC<{ type?: string; className?: string; style?: React.CSSProperties }> = ({
  type = 'arcana',
  className = '',
  style,
}) => {
  const t = type.toLowerCase();
  const tone = t === 'divina' ? 'badge-gold' : t === 'universal' ? 'badge-accent' : 'badge-info';
  const label = t === 'divina' ? 'Divina' : t === 'universal' ? 'Universal' : 'Arcana';
  return (
    <span className={`badge ${tone} ${className}`} style={style}>
      {label}
    </span>
  );
};

export const CircleBadge: React.FC<{ circle?: number; className?: string; style?: React.CSSProperties }> = ({
  circle = 1,
  className = '',
  style,
}) => (
  <span className={`badge badge-mp ${className}`} style={style}>
    {circle}º círculo
  </span>
);

export const POWER_CATEGORY_META: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  combate: { label: 'Combate', className: 'badge-power-combate', icon: <Sword size={12} /> },
  destino: { label: 'Destino', className: 'badge-power-destino', icon: <Compass size={12} /> },
  magia: { label: 'Magia', className: 'badge-power-magia', icon: <Zap size={12} /> },
  tormenta: { label: 'Tormenta', className: 'badge-power-tormenta', icon: <Activity size={12} /> },
  concedido: { label: 'Concedido', className: 'badge-power-concedido', icon: <Sparkles size={12} /> },
  divindade: { label: 'Divindade', className: 'badge-power-concedido', icon: <Sparkles size={12} /> },
  classe: { label: 'Classe', className: 'badge-power-classe', icon: <Award size={12} /> },
  raca: { label: 'Raça', className: 'badge-power-raca', icon: <UserRound size={12} /> },
  origem: { label: 'Origem', className: 'badge-power-origem', icon: <MapIcon size={12} /> },
  geral: { label: 'Geral', className: 'badge-slate', icon: <Sparkles size={12} /> },
};

export const PowerCategoryBadge: React.FC<{ category?: string; className?: string; style?: React.CSSProperties }> = ({
  category = 'classe',
  className = '',
  style,
}) => {
  const meta = POWER_CATEGORY_META[category.toLowerCase()] || {
    label: category,
    className: 'badge-slate',
    icon: <Award size={12} />,
  };
  return (
    <span className={`badge ${meta.className} ${className}`} style={style}>
      {meta.icon}
      {meta.label}
    </span>
  );
};

export const ExecutionBadge: React.FC<{ execution?: string; className?: string; style?: React.CSSProperties }> = ({
  execution = 'padrão',
  className = '',
  style,
}) => {
  const exec = execution.toLowerCase();
  let tone = 'badge-exec-padrao';
  if (exec.includes('movimento')) tone = 'badge-exec-movimento';
  else if (exec.includes('completa')) tone = 'badge-exec-completa';
  else if (exec.includes('reação') || exec.includes('reacao')) tone = 'badge-exec-reacao';
  else if (exec.includes('livre')) tone = 'badge-exec-livre';

  return (
    <span className={`badge ${tone} ${className}`} style={style}>
      <Clock size={11} />
      {execution.charAt(0).toUpperCase() + execution.slice(1)}
    </span>
  );
};

export const RangeBadge: React.FC<{ range?: string; className?: string; style?: React.CSSProperties }> = ({
  range = 'curto',
  className = '',
  style,
}) => (
  <span className={`badge badge-slate ${className}`} style={style}>
    <Target size={11} />
    {range.charAt(0).toUpperCase() + range.slice(1)}
  </span>
);

/* ---------------------------------------------------------------------------
   Classe
   --------------------------------------------------------------------------- */
export interface ClassBadgeProps {
  classIdOrName?: string;
  className?: string;
  isSelected?: boolean;
  showIcon?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  label?: string;
}

export const ClassBadge: React.FC<ClassBadgeProps> = ({
  classIdOrName,
  className = '',
  isSelected = false,
  showIcon = true,
  style,
  onClick,
  label: customLabel,
}) => {
  const normId = normalizeClassId(classIdOrName);
  const displayLabel = customLabel || (normId ? classDisplayName(normId) : classIdOrName || 'Todas');
  const classes = `badge badge-class classed${isSelected ? ' badge-solid' : ''} ${className}`;
  const content = (
    <>
      {showIcon && <ClassIcon classId={normId} size={12} />}
      <span>{displayLabel}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        style={{ ...classColorVars(normId), cursor: 'pointer', ...style }}
        aria-pressed={isSelected}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={classes} style={{ ...classColorVars(normId), ...style }}>
      {content}
    </span>
  );
};
