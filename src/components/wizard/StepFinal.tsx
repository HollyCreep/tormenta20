import React from 'react';
import type { CharacterSheet } from '../../types/character';
import { StatBreakdownBadge } from '../common/StatBreakdownBadge';
import { ATTRIBUTES_LIST } from '../../data/attributes';
import { ClassSigil, classColorVars } from '../common/ClassSigil';
import { classDisplayName, deityName, formatSigned, originName, raceName } from '../../utils/displayNames';
import { StepIntro } from './wizardUi';

interface StepFinalProps {
  name: string;
  playerName: string;
  concept: string;
  bio: CharacterSheet['bio'];
  raceId: string;
  classId: string;
  originId: string;
  deityId: string;
  totalAttributes: CharacterSheet['totalAttributes'];
  stats: CharacterSheet['stats'];
  trainedSkillsCount: number;
  powersCount: number;
  spellsCount: number;
  onChangeName: (name: string) => void;
  onChangePlayerName: (playerName: string) => void;
  onChangeConcept: (concept: string) => void;
  onChangeBio: (bio: CharacterSheet['bio']) => void;
}

export const StepFinal: React.FC<StepFinalProps> = ({
  name,
  playerName,
  concept,
  bio,
  raceId,
  classId,
  originId,
  deityId,
  totalAttributes,
  stats,
  trainedSkillsCount,
  powersCount,
  spellsCount,
  onChangeName,
  onChangePlayerName,
  onChangeConcept,
  onChangeBio,
}) => (
  <div className="stack-lg">
    <StepIntro title="Toques finais" description="Dê nome e voz ao seu herói e confira a ficha antes de salvar." />

    <div className="final-layout">
      <div className="stack-lg">
        <section className="card stack">
          <span className="eyebrow">Identidade</span>
          <label className="field">
            <span className="field-label">Nome do herói *</span>
            <input value={name} onChange={(e) => onChangeName(e.target.value)} placeholder="Ex.: Kaelen Martelo-Rubro" autoComplete="off" />
          </label>
          <div className="grid-2">
            <label className="field">
              <span className="field-label">Jogador</span>
              <input value={playerName} onChange={(e) => onChangePlayerName(e.target.value)} placeholder="Seu nome" />
            </label>
            <label className="field">
              <span className="field-label">Conceito</span>
              <input value={concept} onChange={(e) => onChangeConcept(e.target.value)} placeholder="Em uma frase" />
            </label>
          </div>
        </section>

        <section className="card stack">
          <span className="eyebrow">Aparência e história</span>
          <div className="grid-2">
            <label className="field">
              <span className="field-label">Gênero</span>
              <input value={bio.gender || ''} onChange={(e) => onChangeBio({ ...bio, gender: e.target.value })} />
            </label>
            <label className="field">
              <span className="field-label">Idade</span>
              <input value={bio.age || ''} onChange={(e) => onChangeBio({ ...bio, age: e.target.value })} />
            </label>
          </div>
          <label className="field">
            <span className="field-label">Aparência</span>
            <textarea rows={3} value={bio.appearance || ''} onChange={(e) => onChangeBio({ ...bio, appearance: e.target.value })} />
          </label>
          <label className="field">
            <span className="field-label">Personalidade e histórico</span>
            <textarea rows={4} value={bio.history || ''} onChange={(e) => onChangeBio({ ...bio, history: e.target.value })} />
          </label>
        </section>
      </div>

      <aside className="card classed preview-card" style={classColorVars(classId)}>
        <div className="hstack-lg">
          <ClassSigil classId={classId} size="lg" />
          <div className="stack-xs grow">
            <span className="eyebrow">Prévia da ficha</span>
            <span className="preview-name">{name.trim() || 'Herói sem nome'}</span>
            <span className="t-sm t-2">
              {raceName(raceId)} · {classDisplayName(classId)} 1
            </span>
            <span className="t-xs t-3">
              {originName(originId)} · {deityName(deityId)}
            </span>
          </div>
        </div>
        <div className="grid-2">
          <StatBreakdownBadge label="PV" breakdown={stats.maxHp} variant="ruby" size="lg" />
          <StatBreakdownBadge label="PM" breakdown={stats.maxMp} variant="blue" size="lg" />
          <StatBreakdownBadge label="Defesa" breakdown={stats.defense} variant="gold" size="lg" />
          <StatBreakdownBadge label="Deslocamento" breakdown={stats.speed} unit="m" size="lg" />
        </div>
        <div className="hero-attrs">
          {ATTRIBUTES_LIST.map((a) => (
            <span key={a.key} className="hero-attr">
              <span className="hero-attr-key">{a.shortName}</span>
              <span className="hero-attr-val">{formatSigned(totalAttributes[a.key])}</span>
            </span>
          ))}
        </div>
        <div className="chip-wrap">
          <span className="badge">{trainedSkillsCount} perícias treinadas</span>
          <span className="badge">{powersCount} poderes e habilidades</span>
          {spellsCount > 0 && <span className="badge badge-mp">{spellsCount} magias</span>}
        </div>
      </aside>
    </div>
  </div>
);
