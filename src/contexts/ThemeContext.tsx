import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

/** Ids persistidos em localStorage — não renomear (compatibilidade). */
export type AppTheme = 't20-classic' | 'modern-dark' | 'light';

export interface ThemeMeta {
  id: AppTheme;
  name: string;
  tagline: string;
  description: string;
  /** Cor da barra de status / theme-color do navegador. */
  meta: string;
  dark: boolean;
}

export const THEMES: ThemeMeta[] = [
  {
    id: 't20-classic',
    name: 'Clássico',
    tagline: 'Tomo de Arton',
    description: 'Couro envelhecido, folha de ouro e o carmesim da Tormenta.',
    meta: '#110d0a',
    dark: true,
  },
  {
    id: 'modern-dark',
    name: 'Escuro',
    tagline: 'Obsidiana',
    description: 'Grafite profundo, plano e minimalista. Perfeito para telas OLED.',
    meta: '#09090b',
    dark: true,
  },
  {
    id: 'light',
    name: 'Claro',
    tagline: 'Pergaminho',
    description: 'Papel quente e tinta escura para jogar à luz do dia.',
    meta: '#f3ede1',
    dark: false,
  },
];

const STORAGE_KEY = 't20_app_theme';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  themeName: string;
  meta: ThemeMeta;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 't20-classic',
  setTheme: () => {},
  themeName: THEMES[0].name,
  meta: THEMES[0],
});

function readStoredTheme(): AppTheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 't20-classic' || saved === 'modern-dark' || saved === 'light') return saved;
  } catch {
    // localStorage indisponível (modo privado etc.)
  }
  return 't20-classic';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(readStoredTheme);

  const setTheme = useCallback((newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignora falhas de persistência
    }
  }, []);

  const meta = THEMES.find((t) => t.id === theme) || THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) metaTag.setAttribute('content', meta.meta);

    if (Capacitor.isNativePlatform()) {
      StatusBar.setBackgroundColor({ color: meta.meta }).catch(() => {});
      // Style.Dark = ícones claros (fundo escuro) · Style.Light = ícones escuros (fundo claro)
      StatusBar.setStyle({ style: meta.dark ? Style.Dark : Style.Light }).catch(() => {});
    }
  }, [theme, meta]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeName: meta.name, meta }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
