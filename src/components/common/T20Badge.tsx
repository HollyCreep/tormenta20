import React from 'react';
import {
  Flame,
  Shield,
  Eye,
  Layers,
  Sparkles,
  Skull,
  RefreshCw,
  Sword,
  Compass,
  Zap,
  Activity,
  Award,
  Clock,
  Target,
} from 'lucide-react';

export interface SchoolBadgeProps {
  school?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const getSchoolInfo = (school?: string) => {
  if (!school) {
    return {
      name: 'Magia',
      className: 'badge-slate',
      icon: <Sparkles size={12} />,
      color: '#cbd5e1',
      bg: 'rgba(148, 163, 184, 0.15)',
      border: 'rgba(148, 163, 184, 0.3)',
    };
  }

  const s = school.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  switch (s) {
    case 'evocacao':
      return {
        name: 'Evocação',
        className: 'badge-school-evocacao',
        icon: <Flame size={12} />,
        color: '#f87171',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.35)',
      };
    case 'abjuracao':
      return {
        name: 'Abjuração',
        className: 'badge-school-abjuracao',
        icon: <Shield size={12} />,
        color: '#60a5fa',
        bg: 'rgba(59, 130, 246, 0.15)',
        border: 'rgba(59, 130, 246, 0.35)',
      };
    case 'adivinhacao':
      return {
        name: 'Adivinhação',
        className: 'badge-school-adivinhacao',
        icon: <Eye size={12} />,
        color: '#fbbf24',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.35)',
      };
    case 'convocacao':
      return {
        name: 'Convocação',
        className: 'badge-school-convocacao',
        icon: <Layers size={12} />,
        color: '#34d399',
        bg: 'rgba(16, 185, 129, 0.15)',
        border: 'rgba(16, 185, 129, 0.35)',
      };
    case 'encantamento':
      return {
        name: 'Encantamento',
        className: 'badge-school-encantamento',
        icon: <Sparkles size={12} />,
        color: '#c084fc',
        bg: 'rgba(192, 132, 252, 0.15)',
        border: 'rgba(192, 132, 252, 0.35)',
      };
    case 'ilusao':
      return {
        name: 'Ilusão',
        className: 'badge-school-ilusao',
        icon: <Eye size={12} />,
        color: '#38bdf8',
        bg: 'rgba(56, 189, 248, 0.15)',
        border: 'rgba(56, 189, 248, 0.35)',
      };
    case 'necromancia':
      return {
        name: 'Necromancia',
        className: 'badge-school-necromancia',
        icon: <Skull size={12} />,
        color: '#a3a3a3',
        bg: 'rgba(163, 163, 163, 0.15)',
        border: 'rgba(163, 163, 163, 0.35)',
      };
    case 'transmutacao':
      return {
        name: 'Transmutação',
        className: 'badge-school-transmutacao',
        icon: <RefreshCw size={12} />,
        color: '#fb923c',
        bg: 'rgba(251, 146, 60, 0.15)',
        border: 'rgba(251, 146, 60, 0.35)',
      };
    default:
      return {
        name: school,
        className: 'badge-slate',
        icon: <Sparkles size={12} />,
        color: '#cbd5e1',
        bg: 'rgba(148, 163, 184, 0.15)',
        border: 'rgba(148, 163, 184, 0.3)',
      };
  }
};

export const SchoolBadge: React.FC<SchoolBadgeProps> = ({ school, className = '', style }) => {
  const info = getSchoolInfo(school);
  return (
    <span
      className={`badge ${info.className} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {info.icon}
      {info.name}
    </span>
  );
};

export const SpellTypeBadge: React.FC<{ type?: string; className?: string; style?: React.CSSProperties }> = ({
  type = 'arcana',
  className = '',
  style,
}) => {
  const t = type.toLowerCase();
  let badgeClass = 'badge-blue';
  if (t === 'divina') badgeClass = 'badge-ruby';
  if (t === 'universal') badgeClass = 'badge-gold';

  return (
    <span
      className={`badge ${badgeClass} ${className}`}
      style={{
        fontSize: '0.68rem',
        textTransform: 'capitalize',
        ...style,
      }}
    >
      {type}
    </span>
  );
};

export const CircleBadge: React.FC<{ circle?: number; className?: string; style?: React.CSSProperties }> = ({
  circle = 1,
  className = '',
  style,
}) => {
  return (
    <span
      className={`badge badge-gold ${className}`}
      style={{
        fontSize: '0.68rem',
        ...style,
      }}
    >
      {circle}º Círculo
    </span>
  );
};

export const PowerCategoryBadge: React.FC<{ category?: string; className?: string; style?: React.CSSProperties }> = ({
  category = 'classe',
  className = '',
  style,
}) => {
  const cat = category.toLowerCase();
  let badgeClass = 'badge-power-classe';
  let label = 'Poder de Classe';
  let icon = <Award size={12} />;

  switch (cat) {
    case 'combate':
      badgeClass = 'badge-power-combate';
      label = 'Combate';
      icon = <Sword size={12} />;
      break;
    case 'destino':
      badgeClass = 'badge-power-destino';
      label = 'Destino';
      icon = <Compass size={12} />;
      break;
    case 'magia':
      badgeClass = 'badge-power-magia';
      label = 'Magia';
      icon = <Zap size={12} />;
      break;
    case 'tormenta':
      badgeClass = 'badge-power-tormenta';
      label = 'Tormenta';
      icon = <Activity size={12} />;
      break;
    case 'concedido':
      badgeClass = 'badge-power-concedido';
      label = 'Concedido';
      icon = <Sparkles size={12} />;
      break;
    case 'classe':
    default:
      badgeClass = 'badge-power-classe';
      label = 'Classe';
      icon = <Award size={12} />;
      break;
  }

  return (
    <span
      className={`badge ${badgeClass} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {icon}
      {label}
    </span>
  );
};

export const ExecutionBadge: React.FC<{ execution?: string; className?: string; style?: React.CSSProperties }> = ({
  execution = 'padrão',
  className = '',
  style,
}) => {
  const exec = execution.toLowerCase();
  let badgeClass = 'badge-exec-padrao';
  if (exec.includes('movimento')) badgeClass = 'badge-exec-movimento';
  else if (exec.includes('completa')) badgeClass = 'badge-exec-completa';
  else if (exec.includes('reação') || exec.includes('reacao')) badgeClass = 'badge-exec-reacao';
  else if (exec.includes('livre')) badgeClass = 'badge-exec-livre';

  return (
    <span
      className={`badge ${badgeClass} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      <Clock size={10} />
      {execution}
    </span>
  );
};

export const RangeBadge: React.FC<{ range?: string; className?: string; style?: React.CSSProperties }> = ({
  range = 'curto',
  className = '',
  style,
}) => {
  return (
    <span
      className={`badge badge-slate ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.65rem',
        textTransform: 'capitalize',
        ...style,
      }}
    >
      <Target size={10} />
      {range}
    </span>
  );
};
