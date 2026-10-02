import { describe, it, expect } from 'vitest';
import {
  classTheme,
  getClassTheme,
  normalizeClassId,
  getClassBadgeStyle,
  getClassCardStyle,
  ClassId,
} from '../classTheme';

describe('Class Theme Tokens and Utilities', () => {
  const officialClasses: ClassId[] = [
    'arcanista',
    'barbaro',
    'bardo',
    'bucaneiro',
    'cacador',
    'cavaleiro',
    'clerigo',
    'druida',
    'guerreiro',
    'inventor',
    'ladino',
    'lutador',
    'nobre',
    'paladino',
  ];

  it('contains themes for all 14 official classes of Tormenta 20', () => {
    expect(Object.keys(classTheme)).toHaveLength(14);
    officialClasses.forEach((cls) => {
      expect(classTheme[cls]).toBeDefined();
    });
  });

  it('ensures each class defines all 10 required theme tokens', () => {
    const requiredTokens = [
      'primary',
      'secondary',
      'background',
      'surface',
      'border',
      'text',
      'textMuted',
      'glow',
      'hover',
      'active',
    ] as const;

    officialClasses.forEach((cls) => {
      const theme = classTheme[cls];
      requiredTokens.forEach((token) => {
        expect(theme[token], `Token ${token} missing in class ${cls}`).toBeDefined();
        expect(typeof theme[token]).toBe('string');
        expect(theme[token].length).toBeGreaterThan(0);
      });
    });
  });

  it('normalizes class names with accents, uppercase and spaces', () => {
    expect(normalizeClassId('Bárbaro')).toBe('barbaro');
    expect(normalizeClassId('Caçador')).toBe('cacador');
    expect(normalizeClassId('Clérigo')).toBe('clerigo');
    expect(normalizeClassId('ARCANISTA')).toBe('arcanista');
    expect(normalizeClassId('guerreiro')).toBe('guerreiro');
    expect(normalizeClassId(undefined)).toBeUndefined();
    expect(normalizeClassId('inexistente')).toBeUndefined();
  });

  it('retrieves class theme with fallback for unknown classes', () => {
    const arcanista = getClassTheme('Arcanista');
    expect(arcanista.primary).toBe('#8B5CF6');
    expect(arcanista.surface).toBe('#2E1B52');

    const barbaro = getClassTheme('Bárbaro');
    expect(barbaro.primary).toBe('#DC2626');

    const fallback = getClassTheme('classe_desconhecida');
    expect(fallback).toBeDefined();
    expect(fallback.primary).toBe('#F59E0B');
  });

  it('generates consistent badge and card styles', () => {
    const badgeStyle = getClassBadgeStyle('arcanista', false);
    expect(badgeStyle.backgroundColor).toBe('#2E1B52');
    expect(badgeStyle.borderColor).toBe('#8B5CF6');

    const cardStyle = getClassCardStyle('barbaro', true);
    expect(cardStyle.borderColor).toBe('#DC2626');
    expect(cardStyle.boxShadow).toContain('rgba(220, 38, 38, 0.45)');
  });
});
