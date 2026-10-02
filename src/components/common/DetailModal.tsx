import React, { useEffect, useState } from 'react';
import {
  Anvil,
  ArrowDown,
  BookOpen,
  Coins,
  Compass,
  Crosshair,
  FileText,
  Flame,
  Hand,
  Shield,
  Sliders,
  Sparkles,
  Sword,
  Target,
  Weight,
  Wrench,
  Zap,
} from 'lucide-react';
import { RuleCitation } from '../../data/rulesCitations';
import { extractSpellDamage } from '../../utils/spellUtils';
import { Sheet } from '../ui/Sheet';
import { Segmented } from '../ui/controls';

export const getFallbackStatIcon = (label: string): React.ReactNode => {
  const l = label.toLowerCase();
  if (l.includes('preço') || l.includes('t$') || l.includes('custo') || l.includes('moeda')) return <Coins size={14} />;
  if (l.includes('espaço') || l.includes('peso') || l.includes('carga')) return <Weight size={14} />;
  if (l.includes('defesa') || l.includes('proteção')) return <Shield size={14} />;
  if (l.includes('penalidade')) return <ArrowDown size={14} />;
  if (l.includes('ataque') || l.includes('dano')) return <Sparkles size={14} />;
  if (l.includes('crítico') || l.includes('margem')) return <Target size={14} />;
  if (l.includes('alcance')) return <Crosshair size={14} />;
  if (l.includes('empunhadura') || l.includes('uso')) return <Hand size={14} />;
  if (l.includes('material')) return <Anvil size={14} />;
  if (l.includes('melhoria')) return <Wrench size={14} />;
  if (l.includes('origem')) return <Compass size={14} />;
  return null;
};

export interface DetailStat {
  label: string;
  value: string | number;
  subtext?: string;
  /** Cor de destaque opcional (aceita var(--token)). */
  color?: string;
  icon?: React.ReactNode;
}

export interface DetailModalData {
  title: string;
  subtitle?: string;
  category?: string;
  cost?: string;
  prerequisites?: string;
  execution?: string;
  range?: string;
  duration?: string;
  targetArea?: string;
  resistance?: string;
  description: string;
  ruleCitation?: RuleCitation;
  upgrades?: { cost: string; description: string }[];
  stats?: DetailStat[];
  /** Aba inicial (ex.: 'rules' para botões "Ver regra no manual"). */
  initialTab?: 'stats' | 'bio' | 'rules';
}

interface DetailModalProps {
  data: DetailModalData | null;
  onClose: () => void;
}

type DetailTab = 'stats' | 'bio' | 'rules';

const hasParameters = (d: DetailModalData) =>
  !!(d.prerequisites || d.execution || d.range || d.duration || d.targetArea || d.resistance);

const categoryIcon = (category?: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('magia') || cat.includes('arcana') || cat.includes('divina')) return <Sparkles size={22} />;
  if (cat.includes('combate') || cat.includes('arma')) return <Sword size={22} />;
  if (cat.includes('armadura') || cat.includes('defesa') || cat.includes('escudo')) return <Shield size={22} />;
  if (cat.includes('origem') || cat.includes('destino')) return <Compass size={22} />;
  return <BookOpen size={22} />;
};

/** Cartão com a citação literal do livro (capítulo, seção e página). */
export const RuleCitationCard: React.FC<{ citation?: RuleCitation }> = ({ citation }) => {
  if (!citation) {
    return (
      <div className="citation stack-sm">
        <div className="hstack t-gold t-semibold">
          <BookOpen size={18} />
          Tormenta 20: Edição Jogo do Ano (v1.3)
        </div>
        <p className="t-body">
          Este elemento segue as regras oficiais do manual básico (Edição Jogo do Ano v1.3, Jambô). Bônus de mesma
          fonte, ou que somem o mesmo atributo, não se acumulam (Capítulo 5: Jogando, pág. 226).
        </p>
      </div>
    );
  }

  return (
    <div className="citation stack">
      <div className="hstack between wrap">
        <span className="hstack t-gold t-semibold t-sm">
          <BookOpen size={18} />
          {citation.book || 'Tormenta 20: Edição Jogo do Ano (v1.3)'}
        </span>
        <span className="badge badge-gold badge-lg">{citation.page}</span>
      </div>
      <div className="kv">
        <div className="kv-item">
          <span className="kv-key">Capítulo</span>
          <span className="kv-value">{citation.chapter}</span>
        </div>
        <div className="kv-item">
          <span className="kv-key">Seção</span>
          <span className="kv-value">{citation.section}</span>
        </div>
      </div>
      <blockquote className="citation-quote">{citation.quote}</blockquote>
      {citation.explanation && (
        <div className="callout callout-gold">
          <Shield size={18} />
          <div className="stack-xs">
            <span className="callout-title">Como o app aplica esta regra</span>
            <span>{citation.explanation}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  // Mantém o último conteúdo durante a animação de saída
  const [shown, setShown] = useState<DetailModalData | null>(data);
  const [tab, setTab] = useState<DetailTab>('stats');

  useEffect(() => {
    if (!data) return;
    setShown(data);
    const withStats = (data.stats && data.stats.length > 0) || hasParameters(data);
    setTab(data.initialTab || (withStats ? 'stats' : 'bio'));
  }, [data]);

  if (!shown) return null;

  const damageInfo = extractSpellDamage(shown.description);
  const withStats = !!((shown.stats && shown.stats.length > 0) || hasParameters(shown) || damageInfo);

  const tabs = [
    ...(withStats ? [{ value: 'stats' as DetailTab, label: 'Detalhes', icon: <Sliders size={16} /> }] : []),
    { value: 'bio' as DetailTab, label: 'Descrição', icon: <FileText size={16} /> },
    { value: 'rules' as DetailTab, label: 'Regras', icon: <BookOpen size={16} /> },
  ];
  const activeTab = !withStats && tab === 'stats' ? 'bio' : tab;

  const hasBadges = shown.category || shown.cost || damageInfo;

  return (
    <Sheet
      open={!!data}
      onClose={onClose}
      title={shown.title}
      subtitle={shown.subtitle}
      icon={categoryIcon(shown.category)}
      size="lg"
      toolbar={
        <>
          {hasBadges && (
            <div className="chip-wrap">
              {shown.category && <span className="badge badge-gold badge-lg">{shown.category}</span>}
              {shown.cost && (
                <span className="badge badge-mp badge-lg">
                  <Zap size={12} />
                  {shown.cost}
                </span>
              )}
              {damageInfo && (
                <span className="badge badge-danger badge-lg t-mono">
                  <Flame size={12} />
                  {damageInfo.dice}
                  {damageInfo.type ? ` ${damageInfo.type}` : ''}
                </span>
              )}
            </div>
          )}
          <Segmented<DetailTab> value={activeTab} onChange={setTab} options={tabs} ariaLabel="Seções do detalhe" />
        </>
      }
    >
      {activeTab === 'stats' && (
        <div className="stack-lg animate-in" key="stats">
          {damageInfo && (
            <div className="damage-hero">
              <span className="damage-hero-icon">
                <Flame size={24} />
              </span>
              <span className="stack-xs grow">
                <span className="t-label">Dano base</span>
                <span className="damage-hero-dice t-mono">{damageInfo.dice}</span>
              </span>
              {damageInfo.type && <span className="badge badge-danger badge-lg badge-upper">{damageInfo.type}</span>}
            </div>
          )}

          {hasParameters(shown) && (
            <section className="stack-sm">
              <span className="eyebrow">Parâmetros de uso</span>
              <div className="card-inset kv">
                {shown.prerequisites && (
                  <div className="kv-item">
                    <span className="kv-key">Pré-requisitos</span>
                    <span className="kv-value t-danger">{shown.prerequisites}</span>
                  </div>
                )}
                {shown.execution && (
                  <div className="kv-item">
                    <span className="kv-key">Execução</span>
                    <span className="kv-value">{shown.execution}</span>
                  </div>
                )}
                {shown.range && (
                  <div className="kv-item">
                    <span className="kv-key">Alcance</span>
                    <span className="kv-value">{shown.range}</span>
                  </div>
                )}
                {shown.targetArea && (
                  <div className="kv-item">
                    <span className="kv-key">Alvo / Área</span>
                    <span className="kv-value">{shown.targetArea}</span>
                  </div>
                )}
                {shown.duration && (
                  <div className="kv-item">
                    <span className="kv-key">Duração</span>
                    <span className="kv-value">{shown.duration}</span>
                  </div>
                )}
                {shown.resistance && (
                  <div className="kv-item">
                    <span className="kv-key">Resistência</span>
                    <span className="kv-value t-warning">{shown.resistance}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {shown.stats && shown.stats.length > 0 && (
            <section className="stack-sm">
              <span className="eyebrow">Propriedades</span>
              <div className="grid-2">
                {shown.stats.map((s, i) => {
                  const statIcon = s.icon || getFallbackStatIcon(s.label);
                  return (
                    <div key={i} className="stat">
                      <span className="stat-label">
                        {statIcon && (
                          <span className="t-gold" style={s.color ? { color: s.color } : undefined}>
                            {statIcon}
                          </span>
                        )}
                        {s.label}
                      </span>
                      <span className="stat-value" style={s.color ? { color: s.color } : undefined}>
                        {s.value}
                      </span>
                      {s.subtext && <span className="stat-sub">{s.subtext}</span>}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}

      {activeTab === 'bio' && (
        <div className="stack-lg animate-in" key="bio">
          <p className="t-body pre-line t-1">{shown.description || 'Sem descrição disponível.'}</p>

          {shown.upgrades && shown.upgrades.length > 0 && (
            <section className="stack-sm">
              <span className="eyebrow">Aprimoramentos</span>
              <div className="list">
                {shown.upgrades.map((upg, idx) => (
                  <div key={idx} className="row items-start">
                    <span className="badge badge-mp badge-lg t-mono shrink-0">{upg.cost}</span>
                    <span className="t-sm t-2" style={{ lineHeight: 1.55 }}>
                      {upg.description}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="animate-in" key="rules">
          <RuleCitationCard citation={shown.ruleCitation} />
        </div>
      )}
    </Sheet>
  );
};
