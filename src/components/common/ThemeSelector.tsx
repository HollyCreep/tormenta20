import React from 'react';
import { useTheme, AppTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Shield, Palette } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { id: AppTheme; label: string; icon: React.ReactNode }[] = [
    { id: 't20-classic', label: 'T20 Clássico', icon: <Shield size={14} /> },
    { id: 'modern-dark', label: 'Escuro Moderno', icon: <Moon size={14} /> },
    { id: 'light', label: 'Claro', icon: <Sun size={14} /> },
  ];

  return (
    <div
      className="theme-selector-container"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.25)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.2rem',
        gap: '0.2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.35rem', color: 'var(--text-dim)' }} title="Alterar Tema Visual">
        <Palette size={14} />
      </div>
      {themes.map((t) => {
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            className={`btn ${isActive ? 'btn-gold' : 'btn-ghost'}`}
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.75rem',
              gap: '0.3rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? undefined : 'var(--text-muted)',
            }}
            title={`Ativar tema ${t.label}`}
          >
            {t.icon}
            <span className="theme-btn-label">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};
