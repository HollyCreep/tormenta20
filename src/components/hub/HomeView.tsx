import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Package,
  Plus,
  ScrollText,
  Shield,
  Sparkles,
  Swords,
  UserPlus,
  Users,
} from 'lucide-react';
import type { CharacterSheet } from '../../types/character';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { AppBar } from '../ui/AppBar';
import { D20Icon } from '../ui/Icons';
import { SectionHeader } from '../ui/controls';
import { ClassSigil, classColorVars } from '../common/ClassSigil';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { heroLine, originName, percent } from '../../utils/displayNames';

interface HomeViewProps {
  characters: CharacterSheet[];
  activeCharacter: CharacterSheet | null;
  onNavigateToCharacters: () => void;
  onOpenCharacterSheet: (char: CharacterSheet) => void;
  onCreateNewCharacter: () => void;
  onNavigateToCompendium: (tab: 'magias' | 'poderes' | 'itens', subTab?: 'gerais' | 'classe') => void;
  onOpenDice: () => void;
  onOpenSettings: () => void;
}

const greeting = () => {
  const h = new Date().getHours();
  if (h < 5) return 'Vigília da madrugada';
  if (h < 12) return 'Bom dia, aventureiro';
  if (h < 18) return 'Boa tarde, aventureiro';
  return 'Boa noite, aventureiro';
};

/** Escolhe uma regra "do dia" de forma estável ao longo do dia. */
const pickDailyRule = () => {
  const list = Object.values(RULES_CITATIONS);
  const day = Math.floor(Date.now() / 86_400_000);
  return list[day % list.length];
};

const Vitals: React.FC<{ hero: CharacterSheet }> = ({ hero }) => {
  const { currentHp, maxHp, tempHp, currentMp, maxMp, defense } = hero.stats;
  return (
    <div className="home-vitals">
      <div className="home-vital">
        <div className="hstack between">
          <span className="t-label">Vida</span>
          <span className="t-sm t-bold t-num">
            {currentHp}
            <span className="t-3">/{maxHp.value}</span>
            {tempHp > 0 && <span className="t-temp"> +{tempHp}</span>}
          </span>
        </div>
        <div className="meter meter-hp" style={{ '--pct': percent(currentHp, maxHp.value) } as React.CSSProperties}>
          <span className="meter-fill" />
        </div>
      </div>
      <div className="home-vital">
        <div className="hstack between">
          <span className="t-label">Mana</span>
          <span className="t-sm t-bold t-num">
            {currentMp}
            <span className="t-3">/{maxMp.value}</span>
          </span>
        </div>
        <div className="meter meter-mp" style={{ '--pct': percent(currentMp, maxMp.value) } as React.CSSProperties}>
          <span className="meter-fill" />
        </div>
      </div>
      <div className="home-def" aria-label={`Defesa ${defense.value}`}>
        <Shield size={16} />
        <span className="t-num">{defense.value}</span>
      </div>
    </div>
  );
};

export const HomeView: React.FC<HomeViewProps> = ({
  characters,
  activeCharacter,
  onNavigateToCharacters,
  onOpenCharacterSheet,
  onCreateNewCharacter,
  onNavigateToCompendium,
  onOpenDice,
}) => {
  const featured = activeCharacter || characters[0] || null;
  const others = characters.filter((c) => c.id !== featured?.id);
  const dailyRule = useMemo(pickDailyRule, []);
  const [detail, setDetail] = useState<DetailModalData | null>(null);

  const playerName = featured?.playerName?.trim();

  return (
    <>
      <AppBar
        brand
        actions={
          <button type="button" className="icon-btn" onClick={onCreateNewCharacter} aria-label="Criar novo herói">
            <UserPlus size={22} />
          </button>
        }
      />

      <main className="page stack-xl">
        {/* Saudação */}
        <section className="home-hero animate-in">
          <D20Icon className="home-hero-watermark" size={180} strokeWidth={0.8} />
          <span className="eyebrow">{playerName ? `Salve, ${playerName}` : greeting()}</span>
          <h1 className="home-hero-title">Forje sua lenda em Arton</h1>
          <p className="t-2 t-sm" style={{ maxWidth: 460 }}>
            Crie heróis com as regras do Jogo do Ano, role dados e consulte o compêndio — tudo na palma da mão.
          </p>
        </section>

        {/* Continuar aventura */}
        {featured ? (
          <section className="stack">
            <SectionHeader
              title="Continuar aventura"
              action={
                characters.length > 1 ? (
                  <button type="button" className="btn btn-ghost btn-sm" onClick={onNavigateToCharacters}>
                    Todos ({characters.length})
                    <ChevronRight size={16} />
                  </button>
                ) : undefined
              }
            />
            <article
              className="card classed card-interactive home-featured"
              style={classColorVars(featured.classId)}
              onClick={() => onOpenCharacterSheet(featured)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenCharacterSheet(featured);
                }
              }}
              aria-label={`Abrir ficha de ${featured.name}`}
            >
              <div className="hstack-lg items-start">
                <ClassSigil classId={featured.classId} size="lg" />
                <div className="stack-xs grow">
                  <span className="home-featured-name">{featured.name}</span>
                  <span className="t-sm t-2 truncate">{heroLine(featured)}</span>
                  <span className="t-xs t-3 truncate">{originName(featured.originId)}</span>
                </div>
                <span className="badge badge-class badge-lg shrink-0">Nv. {featured.level}</span>
              </div>
              <Vitals hero={featured} />
              <div className="home-featured-cta">
                <span>Abrir ficha</span>
                <ArrowRight size={18} />
              </div>
            </article>
          </section>
        ) : (
          <section className="card card-accent card-loose stack animate-in">
            <span className="sigil sigil-lg">
              <Sparkles size={28} />
            </span>
            <h2>Sua primeira lenda começa aqui</h2>
            <p className="t-2 t-sm">
              O criador guiado conduz raça, classe, origem, divindade, atributos e equipamentos — com as regras
              conferidas a cada passo.
            </p>
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onCreateNewCharacter}>
              <Plus size={20} />
              Criar meu herói
            </button>
          </section>
        )}

        {/* Ações rápidas */}
        <section className="stack">
          <SectionHeader title="Ações rápidas" />
          <div className="quick-grid">
            <button type="button" className="quick-tile quick-tile-accent" onClick={onCreateNewCharacter}>
              <UserPlus size={24} />
              <span className="quick-title">Novo herói</span>
              <span className="quick-sub">Criador guiado</span>
            </button>
            <button type="button" className="quick-tile" onClick={onOpenDice}>
              <D20Icon size={24} />
              <span className="quick-title">Rolar dados</span>
              <span className="quick-sub">d4 ao d100</span>
            </button>
            <button type="button" className="quick-tile" onClick={() => onNavigateToCompendium('magias')}>
              <Sparkles size={24} />
              <span className="quick-title">Grimório</span>
              <span className="quick-sub">Magias do 1º ao 5º círculo</span>
            </button>
            <button type="button" className="quick-tile" onClick={() => onNavigateToCompendium('itens')}>
              <Package size={24} />
              <span className="quick-title">Arsenal</span>
              <span className="quick-sub">Itens e oficina</span>
            </button>
          </div>
        </section>

        {/* Outros heróis */}
        {others.length > 0 && (
          <section className="stack">
            <SectionHeader
              title="Sua guilda"
              icon={<Users size={20} />}
              action={
                <button type="button" className="btn btn-ghost btn-sm" onClick={onNavigateToCharacters}>
                  Gerenciar
                  <ChevronRight size={16} />
                </button>
              }
            />
            <div className="hero-strip" role="list">
              {others.map((hero) => (
                <button
                  key={hero.id}
                  type="button"
                  role="listitem"
                  className="hero-mini card classed"
                  style={classColorVars(hero.classId)}
                  onClick={() => onOpenCharacterSheet(hero)}
                >
                  <ClassSigil classId={hero.classId} size="sm" />
                  <span className="hero-mini-name truncate">{hero.name}</span>
                  <span className="t-xs t-3 truncate">{heroLine(hero)}</span>
                  <span className="meter meter-hp meter-sm" style={{ '--pct': percent(hero.stats.currentHp, hero.stats.maxHp.value) } as React.CSSProperties}>
                    <span className="meter-fill" />
                  </span>
                </button>
              ))}
              <button type="button" role="listitem" className="hero-mini hero-mini-new" onClick={onCreateNewCharacter}>
                <span className="sigil sigil-sm">
                  <Plus size={18} />
                </span>
                <span className="hero-mini-name">Novo herói</span>
                <span className="t-xs t-3">Começar do zero</span>
              </button>
            </div>
          </section>
        )}

        {/* Compêndio */}
        <section className="stack">
          <SectionHeader title="Compêndio" icon={<BookOpen size={20} />} />
          <div className="list">
            <button type="button" className="row" onClick={() => onNavigateToCompendium('magias')}>
              <span className="sigil sigil-sm"><Sparkles size={18} /></span>
              <span className="row-main">
                <span className="row-title">Grimório de magias</span>
                <span className="row-sub">Arcanas, divinas e universais, com aprimoramentos</span>
              </span>
              <ChevronRight size={18} className="t-3" />
            </button>
            <button type="button" className="row" onClick={() => onNavigateToCompendium('poderes', 'gerais')}>
              <span className="sigil sigil-sm"><Swords size={18} /></span>
              <span className="row-main">
                <span className="row-title">Poderes gerais</span>
                <span className="row-sub">Combate, destino, magia, concedidos e da Tormenta</span>
              </span>
              <ChevronRight size={18} className="t-3" />
            </button>
            <button type="button" className="row" onClick={() => onNavigateToCompendium('poderes', 'classe')}>
              <span className="sigil sigil-sm"><Shield size={18} /></span>
              <span className="row-main">
                <span className="row-title">Poderes de classe</span>
                <span className="row-sub">Os poderes das 14 classes oficiais</span>
              </span>
              <ChevronRight size={18} className="t-3" />
            </button>
            <button type="button" className="row" onClick={() => onNavigateToCompendium('itens')}>
              <span className="sigil sigil-sm"><Package size={18} /></span>
              <span className="row-main">
                <span className="row-title">Itens & oficina</span>
                <span className="row-sub">Armas, armaduras, melhorias, materiais e encantos</span>
              </span>
              <ChevronRight size={18} className="t-3" />
            </button>
          </div>
        </section>

        {/* Regra em destaque */}
        {dailyRule && (
          <section className="stack">
            <SectionHeader title="Regra em destaque" icon={<ScrollText size={20} />} />
            <button
              type="button"
              className="card card-interactive rule-card"
              onClick={() =>
                setDetail({
                  title: dailyRule.title,
                  subtitle: `${dailyRule.chapter} · ${dailyRule.page}`,
                  category: 'Regra oficial',
                  description: dailyRule.explanation,
                  ruleCitation: dailyRule,
                  initialTab: 'rules',
                })
              }
            >
              <span className="eyebrow">{dailyRule.page}</span>
              <span className="rule-card-title">{dailyRule.title}</span>
              <span className="rule-card-quote clamp-3">{dailyRule.quote}</span>
              <span className="hstack t-accent t-sm t-semibold">
                Ler a regra completa
                <ArrowRight size={16} />
              </span>
            </button>
          </section>
        )}
      </main>

      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </>
  );
};
