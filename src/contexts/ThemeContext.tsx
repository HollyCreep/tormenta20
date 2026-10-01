import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 't20-classic' | 'modern-dark' | 'light';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 't20-classic',
  setTheme: () => {},
  themeName: 'Tormenta 20 (Clássico)',
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('t20_app_theme') as AppTheme;
    return saved === 'modern-dark' || saved === 'light' || saved === 't20-classic' ? saved : 't20-classic';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('t20_app_theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themeName =
    theme === 'modern-dark'
      ? 'Escuro Moderno'
      : theme === 'light'
      ? 'Claro (Solar)'
      : 'Tormenta 20 (Padrão)';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
