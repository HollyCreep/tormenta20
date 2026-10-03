import React, { useState } from 'react';
import { AlertTriangle, Check, Info, Sun, UserX } from 'lucide-react';
import { DEITIES_LIST } from '../../data/deities';
import type { DetailModalData } from '../common/DetailModal';
import { Segmented } from '../ui/controls';
import { ChoiceCard, ChoiceSection, OptionPickerSheet, StepIntro, type PickerOption } from './wizardUi';

interface StepDeityProps {
  selectedDeityId: string;
  selectedDeityPowers: string[];
  characterClassId: string;
  characterRaceId?: string;
  onSelectDeity: (deityId: string) => void;
  onSelectDeityPowers: (powers: string[]) => void;
  /** Poderes já escolhidos em outros benefícios (nome → fonte). */
  takenPowers?: Map<string, string>;
  onOpenDetail: (data: DetailModalData) => void;
}

export const StepDeity: React.FC<StepDeityProps> = ({
  selectedDeityId,
  selectedDeityPowers,
  characterClassId,
  onSelectDeity,
  onSelectDeityPowers,
  onOpenDetail,
  takenPowers,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const deity = DEITIES_LIST.find((d) => d.id === selectedDeityId);
  const isDevout = !!deity;
  const isCleric = characterClassId === 'clerigo';
  const powerLimit = isCleric ? deity?.grantedPowers.length || 1 : 1;

  const chooseDeity = (id: string) => {
    const d = DEITIES_LIST.find((x) => x.id === id);
    onSelectDeity(id);
    // Clérigos recebem todos os poderes concedidos; demais devotos começam com o primeiro
    onSelectDeityPowers(d ? (isCleric ? d.grantedPowers.map((p) => p.name) : [d.grantedPowers[0]?.name].filter(Boolean)) : []);
  };

  const togglePower = (name: string) => {
    const on = selectedDeityPowers.includes(name);
    if (powerLimit === 1) {
      onSelectDeityPowers(on ? [] : [name]);
      return;
    }
    if (on) onSelectDeityPowers(selectedDeityPowers.filter((p) => p !== name));
    else if (selectedDeityPowers.length < powerLimit) onSelectDeityPowers([...selectedDeityPowers, name]);
  };

  const options: PickerOption[] = DEITIES_LIST.map((d) => ({
    id: d.id,
    title: d.name,
    subtitle: d.title,
    meta: <span className="badge">Energia {d.energyChannel}</span>,
    searchText: d.description,
  }));

  return (
    <div className="stack-lg">
      <StepIntro
        title="Divindade"
        description="Opcional. Devotos recebem poderes concedidos, mas devem seguir as obrigações do seu deus."
      />

      <Segmented<'devoto' | 'nenhum'>
        value={isDevout ? 'devoto' : 'nenhum'}
        onChange={(v) => {
          if (v === 'nenhum') {
            onSelectDeity('nenhum');
            onSelectDeityPowers([]);
          } else if (!isDevout) {
            setPickerOpen(true);
          }
        }}
        ariaLabel="Devoção"
        size="lg"
        options={[
          { value: 'devoto', label: 'Devoto', icon: <Sun size={16} /> },
          { value: 'nenhum', label: 'Sem divindade', icon: <UserX size={16} /> },
        ]}
      />

      {!deity ? (
        <div className="card stack-sm">
          <span className="eyebrow">Não devoto</span>
          <p className="t-sm t-2">
            Seu herói não segue nenhum deus do Panteão. Não recebe poderes concedidos, mas também não tem obrigações sagradas.
          </p>
          <button type="button" className="btn btn-secondary" onClick={() => setPickerOpen(true)}>
            Escolher uma divindade
          </button>
        </div>
      ) : (
        <>
          <ChoiceCard
            eyebrow="Seu deus"
            title={deity.name}
            subtitle={deity.title}
            description={deity.description}
            onChange={() => setPickerOpen(true)}
            badges={
              <>
                <span className="badge">Energia {deity.energyChannel}</span>
                <span className="badge">Arma: {deity.favoredWeapon}</span>
              </>
            }
          />

          <div className="kv card-inset" style={{ gridTemplateColumns: 'repeat(2, minmax(min(140px, 100%), 1fr))' }}>
            <div className="kv-item">
              <span className="kv-key">Símbolo</span>
              <span className="kv-value">{deity.symbol}</span>
            </div>
            <div className="kv-item">
              <span className="kv-key">Devotos</span>
              <span className="kv-value">{deity.allowedDevoteesText}</span>
            </div>
          </div>

          {deity.obligations && (
            <div className="callout callout-danger">
              <AlertTriangle size={18} />
              <div className="stack-xs">
                <span className="callout-title">Obrigações e restrições</span>
                <span>{deity.obligations}</span>
              </div>
            </div>
          )}

          <ChoiceSection
            title="Poderes concedidos"
            description={isCleric ? 'Clérigos recebem os poderes concedidos do seu deus.' : 'Escolha 1 poder concedido.'}
            count={{ value: selectedDeityPowers.length, total: powerLimit }}
          >
            <div className="list">
              {deity.grantedPowers.map((p) => {
                const on = selectedDeityPowers.includes(p.name);
                const takenBy = takenPowers?.get(p.name);
                return (
                  <div key={p.id} className={`row pick-row${on ? ' is-selected' : ''}${takenBy ? (on ? ' is-conflict' : ' is-disabled') : ''}`}>
                    <button
                      type="button"
                      role={powerLimit === 1 ? 'radio' : 'checkbox'}
                      aria-checked={on}
                      className="pick-main"
                      disabled={!!takenBy && !on}
                      onClick={() => togglePower(p.name)}
                    >
                      <span className={`mark${powerLimit === 1 ? ' mark-radio' : ''}${on ? ' is-on' : ''}`}>{on && <Check size={14} strokeWidth={3} />}</span>
                      <span className="row-main">
                        <span className="row-title">{p.name}</span>
                        {takenBy ? (
                          <span className="t-xs t-warning">Já escolhido como benefício de {takenBy}</span>
                        ) : (
                          <span className="row-sub clamp-3">{p.description}</span>
                        )}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn-sm"
                      aria-label={`Detalhes de ${p.name}`}
                      onClick={() =>
                        onOpenDetail({
                          title: p.name,
                          category: `Poder concedido · ${deity.name}`,
                          prerequisites: p.prerequisites,
                          description: p.description,
                        })
                      }
                    >
                      <Info size={17} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ChoiceSection>
        </>
      )}

      <OptionPickerSheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Panteão de Arton"
        subtitle="20 divindades maiores"
        options={options}
        value={deity ? [deity.id] : []}
        onChange={([id]) => id && chooseDeity(id)}
        searchPlaceholder="Buscar deus ou domínio…"
      />
    </div>
  );
};
