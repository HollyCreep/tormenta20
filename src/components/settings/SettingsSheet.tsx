import React from 'react';
import { BookOpen, Check, Palette, ScrollText } from 'lucide-react';
import { Sheet } from '../ui/Sheet';
import { THEMES, useTheme, type AppTheme } from '../../contexts/ThemeContext';

interface SettingsSheetProps {
  open: boolean;
  onClose: () => void;
  heroCount: number;
}

/** Miniatura viva de um tema: usa data-theme local, então as cores são as reais. */
const ThemePreview: React.FC<{ id: AppTheme }> = ({ id }) => (
  <div className="theme-preview" data-theme={id} aria-hidden="true">
    <div className="tp-bar">
      <span className="tp-dot" />
      <span className="tp-line tp-line-title" />
    </div>
    <div className="tp-card">
      <span className="tp-sigil" />
      <span className="stack-xs grow">
        <span className="tp-line tp-line-strong" />
        <span className="tp-line tp-line-soft" />
      </span>
    </div>
    <div className="tp-meters">
      <span className="tp-meter tp-meter-hp" />
      <span className="tp-meter tp-meter-mp" />
    </div>
    <div className="tp-actions">
      <span className="tp-btn" />
      <span className="tp-chip" />
    </div>
  </div>
);

export const SettingsSheet: React.FC<SettingsSheetProps> = ({ open, onClose, heroCount }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={open} onClose={onClose} title="Ajustes" subtitle="Aparência e informações do app" icon={<Palette size={22} />} size="lg">
      <div className="stack-xl">
        <section className="stack">
          <div className="stack-xs">
            <span className="eyebrow">Tema</span>
            <p className="t-sm t-3">Escolha a atmosfera da sua mesa. A barra do sistema acompanha o tema.</p>
          </div>
          <div className="theme-grid" role="radiogroup" aria-label="Tema do aplicativo">
            {THEMES.map((t) => {
              const selected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className="theme-option"
                  onClick={() => setTheme(t.id)}
                >
                  <ThemePreview id={t.id} />
                  <span className="theme-option-info">
                    <span className="hstack between">
                      <span className="theme-option-name">{t.name}</span>
                      <span className={`mark mark-radio${selected ? ' is-on' : ''}`}>
                        {selected && <Check size={14} strokeWidth={3} />}
                      </span>
                    </span>
                    <span className="theme-option-tag">{t.tagline}</span>
                    <span className="t-xs t-3">{t.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="stack-sm">
          <span className="eyebrow">Sobre</span>
          <div className="list">
            <div className="row">
              <span className="sigil sigil-sm">
                <BookOpen size={18} />
              </span>
              <div className="row-main">
                <span className="row-title">Tormenta 20 — Edição Jogo do Ano</span>
                <span className="row-sub">Regras oficiais v1.3 · cálculos com citação de página</span>
              </div>
            </div>
            <div className="row">
              <span className="sigil sigil-sm">
                <ScrollText size={18} />
              </span>
              <div className="row-main">
                <span className="row-title">Versão {__APP_VERSION__}</span>
                <span className="row-sub">
                  {heroCount} {heroCount === 1 ? 'herói salvo' : 'heróis salvos'} neste dispositivo
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Sheet>
  );
};
