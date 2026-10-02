import React from 'react';
import {
  Anchor,
  Award,
  Axe,
  Cog,
  Crosshair,
  Crown,
  HandFist,
  Leaf,
  Music,
  ShieldCheck,
  ShieldHalf,
  Sun,
  Swords,
  VenetianMask,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';
import { getClassTheme, normalizeClassId, type ClassId } from '../../styles/classTheme';

export const CLASS_ICONS: Record<ClassId, LucideIcon> = {
  arcanista: WandSparkles,
  barbaro: Axe,
  bardo: Music,
  bucaneiro: Anchor,
  cacador: Crosshair,
  cavaleiro: ShieldHalf,
  clerigo: Sun,
  druida: Leaf,
  guerreiro: Swords,
  inventor: Cog,
  ladino: VenetianMask,
  lutador: HandFist,
  nobre: Crown,
  paladino: ShieldCheck,
};

export const getClassIcon = (classIdOrName?: string): LucideIcon => {
  const id = normalizeClassId(classIdOrName);
  return id ? CLASS_ICONS[id] : Award;
};

/** Variáveis CSS de identidade da classe (use junto da classe utilitária `classed`). */
export const classColorVars = (classIdOrName?: string): React.CSSProperties =>
  ({ '--class-color': getClassTheme(classIdOrName).primary }) as React.CSSProperties;

interface ClassIconProps {
  classId?: string;
  size?: number;
  className?: string;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ classId, size = 20, className }) => {
  const Icon = getClassIcon(classId);
  return <Icon size={size} className={className} aria-hidden="true" />;
};

interface ClassSigilProps {
  classId?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const ICON_SIZE = { sm: 18, md: 24, lg: 30, xl: 36 } as const;

/** Medalhão com o ícone e a cor da classe — funciona nos três temas. */
export const ClassSigil: React.FC<ClassSigilProps> = ({ classId, size = 'md', className = '' }) => (
  <span
    className={`sigil classed${size !== 'md' ? ` sigil-${size}` : ''} ${className}`}
    style={classColorVars(classId)}
    aria-hidden="true"
  >
    <ClassIcon classId={classId} size={ICON_SIZE[size]} />
  </span>
);
