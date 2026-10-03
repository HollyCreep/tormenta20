import React, { useState } from 'react';
import { Heart, Info, Shield, Sparkles } from 'lucide-react';
import { CLASSES_LIST } from '../../data/classes';
import { SKILLS_LIST } from '../../data/skills';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import type { DetailModalData } from '../common/DetailModal';
import { ClassSigil, classColorVars } from '../common/ClassSigil';
import { Segmented } from '../ui/controls';
import { ChoiceCard, ChoiceSection, OptionPickerSheet, SelectedChips, StepIntro, type PickerOption } from './wizardUi';
import { skillName } from '../../utils/displayNames';

interface StepClassProps {
  selectedClassId: string;
  selectedSubclass?: string;
  selectedClassSkills: string[];
  raceSkills?: string[];
  intSkills?: string[];
  alreadyTrainedSkills?: string[];
  onSelectClass: (classId: string) => void;
  onSelectSubclass: (subclassId: string) => void;
  onSelectClassSkills: (skills: string[]) => void;
  onOpenDetail: (data: DetailModalData) => void;
}

const WEAPON_LABEL: Record<string, string> = { simples: 'simples', marciais: 'marciais', exoticas: 'exóticas', fogo: 'de fogo' };

export const StepClass: React.FC<StepClassProps> = ({
  selectedClassId,
  selectedSubclass,
  selectedClassSkills,
  alreadyTrainedSkills = [],
  onSelectClass,
  onSelectSubclass,
  onSelectClassSkills,
  onOpenDetail,
}) => {
  const [picker, setPicker] = useState<'class' | 'skills' | null>(null);
  const cls = CLASSES_LIST.find((c) => c.id === selectedClassId) || CLASSES_LIST[0];

  const classOptions: PickerOption[] = CLASSES_LIST.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.role,
    leading: <ClassSigil classId={c.id} size="sm" />,
    meta: (
      <>
        <span className="badge badge-hp">{c.hpInitial} PV</span>
        <span className="badge badge-mp">{c.mpInitial} PM</span>
        {c.spellcaster && <span className="badge badge-accent">Conjurador</span>}
      </>
    ),
    searchText: c.description,
  }));

  // Total de escolhas: a lista da classe + a alternativa obrigatória ("Luta ou Pontaria")
  const totalChoices = cls.skillChoicesCount + (cls.skillAlternative ? 1 : 0);
  const skillOptions: PickerOption[] = [...new Set([...(cls.skillAlternative || []), ...cls.skillOptions])]
    .filter((id) => !cls.mandatorySkills.includes(id))
    .map((id) => ({
      id,
      title: skillName(id),
      subtitle: SKILLS_LIST.find((s) => s.id === id)?.attribute.toUpperCase(),
      disabled: alreadyTrainedSkills.includes(id),
      disabledReason: 'Já treinada pela raça ou Inteligência (treino não acumula).',
    }));

  const subclass = cls.subclasses;
  const subclassValue = selectedSubclass && subclass?.options.some((o) => o.id === selectedSubclass) ? selectedSubclass : subclass?.options[0]?.id;
  const weapons = cls.proficiencies.weapons.map((w) => WEAPON_LABEL[w] || w).join(', ');
  const armor = [...cls.proficiencies.armor.map((a) => (a === 'leves' ? 'leves' : 'pesadas')), ...(cls.proficiencies.shields ? ['escudos'] : [])];

  return (
    <div className="stack-lg">
      <StepIntro title="Classe" description="Sua vocação: pontos de vida e mana, proficiências, perícias e habilidades de 1º nível." />

      <ChoiceCard
        eyebrow="Sua classe"
        title={cls.name}
        subtitle={cls.role}
        leading={<ClassSigil classId={cls.id} size="lg" />}
        className="classed"
        style={classColorVars(cls.id)}
        badges={<span className="badge">Atributos-chave: {cls.primaryAttributes.map((a) => a.toUpperCase()).join(' e ')}</span>}
        description={cls.description}
        onChange={() => setPicker('class')}
      />

      <div className="grid-3 class-vitals">
        <div className="stat">
          <span className="stat-label">
            <Heart size={13} />
            PV inicial
          </span>
          <span className="stat-value">{cls.hpInitial}</span>
          <span className="stat-sub">+{cls.hpPerLevel} + Con/nível</span>
        </div>
        <div className="stat">
          <span className="stat-label">
            <Sparkles size={13} />
            PM inicial
          </span>
          <span className="stat-value">{cls.mpInitial}</span>
          <span className="stat-sub">+{cls.mpPerLevel}/nível</span>
        </div>
        <div className="stat">
          <span className="stat-label">
            <Shield size={13} />
            Uso
          </span>
          <span className="stat-sub t-2">Armas {weapons}</span>
          <span className="stat-sub">{armor.length ? `Armaduras ${armor.join(', ')}` : 'Sem armaduras'}</span>
        </div>
      </div>

      {subclass && subclass.options.length > 0 && (
        <ChoiceSection title={subclass.title}>
          <Segmented<string>
            value={subclassValue || ''}
            onChange={onSelectSubclass}
            ariaLabel={subclass.title}
            size="lg"
            options={subclass.options.map((o) => ({ value: o.id, label: o.name }))}
          />
          <p className="t-sm t-2">{subclass.options.find((o) => o.id === subclassValue)?.description}</p>
        </ChoiceSection>
      )}

      <ChoiceSection
        title="Perícias de classe"
        description={`Obrigatórias: ${cls.mandatorySkills.map(skillName).join(', ')}${
          cls.skillAlternative ? ` e ${cls.skillAlternative.map(skillName).join(' ou ')}` : ''
        }. Escolha mais ${cls.skillChoicesCount} da lista (Cap. 1, pág. ${cls.page}).`}
        count={{ value: selectedClassSkills.length, total: totalChoices }}
        action={
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() =>
              onOpenDetail({
                title: RULES_CITATIONS.SKILL_TRAINING_NO_STACK.title,
                category: 'Regra oficial',
                description: RULES_CITATIONS.SKILL_TRAINING_NO_STACK.explanation,
                ruleCitation: RULES_CITATIONS.SKILL_TRAINING_NO_STACK,
                initialTab: 'rules',
              })
            }
          >
            <Info size={14} />
            Regra
          </button>
        }
      >
        <div className="chip-wrap">
          {cls.mandatorySkills.map((id) => (
            <span key={id} className="chip chip-sm chip-locked">
              {skillName(id)}
            </span>
          ))}
        </div>
        <SelectedChips
          labels={selectedClassSkills.map((id) => ({ id, label: skillName(id) }))}
          placeholder={`Escolher ${totalChoices} perícias`}
          onOpen={() => setPicker('skills')}
          onRemove={(id) => onSelectClassSkills(selectedClassSkills.filter((s) => s !== id))}
        />
      </ChoiceSection>

      <ChoiceSection title="Habilidades de 1º nível">
        <div className="list">
          {cls.abilitiesLevel1.map((ab) => (
            <button
              key={ab.id}
              type="button"
              className="row items-start has-detail"
              onClick={() => onOpenDetail({ title: ab.name, category: `Habilidade de ${cls.name}`, cost: ab.cost, description: ab.description })}
            >
              <span className="row-main">
                <span className="row-title hstack-xs wrap">
                  {ab.name}
                  {ab.cost && <span className="badge badge-mp">{ab.cost}</span>}
                </span>
                <span className="row-sub clamp-3">{ab.description}</span>
              </span>
            </button>
          ))}
        </div>
      </ChoiceSection>

      <OptionPickerSheet
        open={picker === 'class'}
        onClose={() => setPicker(null)}
        title="Escolha sua classe"
        subtitle="14 classes oficiais"
        options={classOptions}
        value={[cls.id]}
        onChange={([id]) => id && onSelectClass(id)}
        searchPlaceholder="Buscar classe ou função…"
      />
      <OptionPickerSheet
        open={picker === 'skills'}
        onClose={() => setPicker(null)}
        title="Perícias de classe"
        subtitle={cls.skillAlternative ? `Inclua ${cls.skillAlternative.map(skillName).join(' ou ')} e mais ${cls.skillChoicesCount}` : `Escolha ${cls.skillChoicesCount} da lista de ${cls.name}`}
        options={skillOptions}
        value={selectedClassSkills}
        onChange={onSelectClassSkills}
        multiple
        max={totalChoices}
        searchPlaceholder="Buscar perícia…"
      />
    </div>
  );
};
