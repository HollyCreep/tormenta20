/**
 * ⚔️ Identidade Visual e Tokens Temáticos por Classe — Tormenta 20: Jogo do Ano (v1.3)
 *
 * Cada uma das 14 classes oficiais possui uma paleta de tokens dedicada:
 * - primary: Cor principal da classe (bordas, ícones principais, badges, acentos ativos)
 * - secondary: Destaques, ícones e elementos secundários
 * - background: Fundo de telas e cards grandes
 * - surface: Cards, painéis e containers temáticos
 * - border: Bordas e divisores
 * - text: Texto principal sobre o tema
 * - textMuted: Texto secundário
 * - glow: Sombras, brilho e efeitos visuais
 * - hover: Estado :hover
 * - active: Estado selecionado/pressionado
 */

export interface ClassThemeTokens {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  glow: string;
  hover: string;
  active: string;
}

export type ClassId =
  | 'arcanista'
  | 'barbaro'
  | 'bardo'
  | 'bucaneiro'
  | 'cacador'
  | 'cavaleiro'
  | 'clerigo'
  | 'druida'
  | 'guerreiro'
  | 'inventor'
  | 'ladino'
  | 'lutador'
  | 'nobre'
  | 'paladino';

export const classTheme: Record<ClassId, ClassThemeTokens> = {
  arcanista: {
    primary: '#8B5CF6',
    secondary: '#C4B5FD',
    background: '#1E1238',
    surface: '#2E1B52',
    border: '#6D28D9',
    text: '#F5F3FF',
    textMuted: '#C4B5FD',
    glow: 'rgba(139, 92, 246, 0.45)',
    hover: '#A78BFA',
    active: '#7C3AED',
  },

  barbaro: {
    primary: '#DC2626',
    secondary: '#FCA5A5',
    background: '#3B0A0A',
    surface: '#571111',
    border: '#B91C1C',
    text: '#FEF2F2',
    textMuted: '#FCA5A5',
    glow: 'rgba(220, 38, 38, 0.45)',
    hover: '#EF4444',
    active: '#B91C1C',
  },

  bardo: {
    primary: '#DB2777',
    secondary: '#F9A8D4',
    background: '#3B0A25',
    surface: '#521337',
    border: '#BE185D',
    text: '#FDF2F8',
    textMuted: '#F9A8D4',
    glow: 'rgba(219, 39, 119, 0.45)',
    hover: '#EC4899',
    active: '#BE185D',
  },

  bucaneiro: {
    primary: '#0891B2',
    secondary: '#67E8F9',
    background: '#062B35',
    surface: '#0B3F4D',
    border: '#0E7490',
    text: '#ECFEFF',
    textMuted: '#67E8F9',
    glow: 'rgba(8, 145, 178, 0.45)',
    hover: '#06B6D4',
    active: '#0E7490',
  },

  cacador: {
    primary: '#15803D',
    secondary: '#86EFAC',
    background: '#062B16',
    surface: '#0B3B20',
    border: '#166534',
    text: '#F0FDF4',
    textMuted: '#86EFAC',
    glow: 'rgba(21, 128, 61, 0.45)',
    hover: '#22C55E',
    active: '#166534',
  },

  cavaleiro: {
    primary: '#1D4ED8',
    secondary: '#93C5FD',
    background: '#0A1B3D',
    surface: '#102957',
    border: '#1E40AF',
    text: '#EFF6FF',
    textMuted: '#93C5FD',
    glow: 'rgba(29, 78, 216, 0.45)',
    hover: '#3B82F6',
    active: '#1E40AF',
  },

  clerigo: {
    primary: '#D4A017',
    secondary: '#FDE68A',
    background: '#332604',
    surface: '#4A3708',
    border: '#A16207',
    text: '#FFFBEB',
    textMuted: '#FDE68A',
    glow: 'rgba(212, 160, 23, 0.45)',
    hover: '#EAB308',
    active: '#A16207',
  },

  druida: {
    primary: '#059669',
    secondary: '#6EE7B7',
    background: '#022C22',
    surface: '#064E3B',
    border: '#047857',
    text: '#ECFDF5',
    textMuted: '#6EE7B7',
    glow: 'rgba(5, 150, 105, 0.45)',
    hover: '#10B981',
    active: '#047857',
  },

  guerreiro: {
    primary: '#EA580C',
    secondary: '#FDBA74',
    background: '#3B1608',
    surface: '#54200C',
    border: '#C2410C',
    text: '#FFF7ED',
    textMuted: '#FDBA74',
    glow: 'rgba(234, 88, 12, 0.45)',
    hover: '#F97316',
    active: '#C2410C',
  },

  inventor: {
    primary: '#65A30D',
    secondary: '#BEF264',
    background: '#1A2E05',
    surface: '#2B4508',
    border: '#4D7C0F',
    text: '#F7FEE7',
    textMuted: '#BEF264',
    glow: 'rgba(101, 163, 13, 0.45)',
    hover: '#84CC16',
    active: '#4D7C0F',
  },

  ladino: {
    primary: '#64748B',
    secondary: '#CBD5E1',
    background: '#0F172A',
    surface: '#1E293B',
    border: '#475569',
    text: '#F8FAFC',
    textMuted: '#CBD5E1',
    glow: 'rgba(100, 116, 139, 0.45)',
    hover: '#94A3B8',
    active: '#475569',
  },

  lutador: {
    primary: '#B45309',
    secondary: '#FCD9A8',
    background: '#2E1503',
    surface: '#45220A',
    border: '#92400E',
    text: '#FFF7ED',
    textMuted: '#FCD9A8',
    glow: 'rgba(180, 83, 9, 0.45)',
    hover: '#D97706',
    active: '#92400E',
  },

  nobre: {
    primary: '#C026D3',
    secondary: '#F0ABFC',
    background: '#3B0A40',
    surface: '#4A1053',
    border: '#A21CAF',
    text: '#FDF4FF',
    textMuted: '#F0ABFC',
    glow: 'rgba(192, 38, 211, 0.45)',
    hover: '#D946EF',
    active: '#A21CAF',
  },

  paladino: {
    primary: '#EAB308',
    secondary: '#FEF08A',
    background: '#332900',
    surface: '#4A3C05',
    border: '#CA8A04',
    text: '#FEFCE8',
    textMuted: '#FEF08A',
    glow: 'rgba(234, 179, 8, 0.50)',
    hover: '#FACC15',
    active: '#CA8A04',
  },
};

/**
 * Tema padrão neutro de Tormenta 20 (Ouro de Valkaria & Slate)
 */
export const defaultClassTheme: ClassThemeTokens = {
  primary: '#F59E0B',
  secondary: '#FCD34D',
  background: '#111827',
  surface: '#1F2937',
  border: '#B45309',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  glow: 'rgba(245, 158, 11, 0.4)',
  hover: '#FBBF24',
  active: '#D97706',
};

/**
 * Normaliza o ID ou Nome da classe para a chave canônica em classTheme
 */
export function normalizeClassId(raw?: string): ClassId | undefined {
  if (!raw) return undefined;
  const clean = raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (clean in classTheme) {
    return clean as ClassId;
  }
  return undefined;
}

/**
 * Obtém os tokens visuais completos para a classe especificada
 */
export function getClassTheme(classIdOrName?: string): ClassThemeTokens {
  const normalized = normalizeClassId(classIdOrName);
  if (normalized && classTheme[normalized]) {
    return classTheme[normalized];
  }
  return defaultClassTheme;
}

/**
 * Gera as variáveis CSS correspondentes ao tema da classe
 */
export function getClassCssVariables(classIdOrName?: string): React.CSSProperties {
  const theme = getClassTheme(classIdOrName);
  return {
    ['--class-primary' as any]: theme.primary,
    ['--class-secondary' as any]: theme.secondary,
    ['--class-background' as any]: theme.background,
    ['--class-surface' as any]: theme.surface,
    ['--class-border' as any]: theme.border,
    ['--class-text' as any]: theme.text,
    ['--class-text-muted' as any]: theme.textMuted,
    ['--class-glow' as any]: theme.glow,
    ['--class-hover' as any]: theme.hover,
    ['--class-active' as any]: theme.active,
  };
}

/**
 * Gera um estilo de card temático equilibrado (background + surface para profundidade, primary na borda e glow)
 */
export function getClassCardStyle(classIdOrName?: string, isSelected?: boolean): React.CSSProperties {
  const theme = getClassTheme(classIdOrName);
  return {
    background: `linear-gradient(145deg, ${theme.surface} 0%, ${theme.background} 100%)`,
    borderColor: isSelected ? theme.primary : theme.border,
    boxShadow: isSelected
      ? `0 0 18px ${theme.glow}, 0 4px 12px rgba(0, 0, 0, 0.5)`
      : `0 2px 8px rgba(0, 0, 0, 0.4)`,
    color: theme.text,
  };
}

/**
 * Gera o estilo de badge da classe (surface de fundo, primary na borda, secondary no texto)
 */
export function getClassBadgeStyle(classIdOrName?: string, isSelected?: boolean): React.CSSProperties {
  const theme = getClassTheme(classIdOrName);
  return {
    backgroundColor: isSelected ? theme.primary : theme.surface,
    color: isSelected ? theme.background : theme.secondary,
    borderColor: theme.primary,
    boxShadow: isSelected ? `0 0 10px ${theme.glow}` : `0 0 4px ${theme.glow}`,
  };
}
