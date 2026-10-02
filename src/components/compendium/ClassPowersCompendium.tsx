import React, { useMemo, useState } from 'react';
import { Swords } from 'lucide-react';
import { CLASS_POWERS_LIST } from '../../data/classPowers';
import { CLASSES_LIST } from '../../data/classes';
import type { ClassPower } from '../../types/rules';
import type { CharacterSheet } from '../../types/character';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { ClassSigil } from '../common/ClassSigil';
import { cleanT20Text, getClassPowerRuleCitation } from '../../utils/textUtils';
import { EmptyState, SearchField, SelectField } from '../ui/controls';
import { normalizeSearch } from './FilterSheet';

interface ClassPowersCompendiumProps {
  switcher?: React.ReactNode;
  onBack?: () => void;
  activeCharacter?: CharacterSheet | null;
  characters?: CharacterSheet[];
}

export const ClassPowersCompendium: React.FC<ClassPowersCompendiumProps> = ({ switcher, activeCharacter }) => {
  const [search, setSearch] = useState('');
  const [classId, setClassId] = useState<string>(activeCharacter?.classId || 'todas');
  const [detail, setDetail] = useState<DetailModalData | null>(null);

  const results = useMemo(() => {
    const q = normalizeSearch(search.trim());
    return CLASS_POWERS_LIST.filter((p) => {
      if (classId !== 'todas' && p.classId !== classId) return false;
      if (!q) return true;
      return normalizeSearch(`${p.name} ${p.description} ${p.prerequisites || ''} ${p.className}`).includes(q);
    });
  }, [search, classId]);

  const openDetail = (power: ClassPower) =>
    setDetail({
      title: cleanT20Text(power.name),
      category: `Poder de classe · ${power.className}`,
      cost: power.cost,
      prerequisites: power.prerequisites ? cleanT20Text(power.prerequisites) : undefined,
      description: cleanT20Text(power.description),
      ruleCitation: getClassPowerRuleCitation(power.classId, power.className, power.name, power.description, power.prerequisites),
    });

  return (
    <>
      <div className="subbar compendium-bar">
        {switcher}
        <div className="filter-row">
          <SearchField value={search} onChange={setSearch} placeholder="Buscar poder…" />
          <SelectField
            value={classId}
            onChange={setClassId}
            ariaLabel="Classe"
            options={[{ value: 'todas', label: 'Todas' }, ...CLASSES_LIST.map((c) => ({ value: c.id, label: c.name }))]}
          />
        </div>
      </div>

      <span className="t-sm t-3">
        {results.length} {results.length === 1 ? 'poder' : 'poderes'}
        {activeCharacter && classId === activeCharacter.classId ? ` · classe de ${activeCharacter.name}` : ''}
      </span>

      {results.length === 0 ? (
        <EmptyState icon={<Swords size={24} />} title="Nenhum poder encontrado" description="Ajuste a busca ou a classe." />
      ) : (
        <div className="list compendium-list">
          {results.map((p) => (
            <button key={p.id} type="button" className="row items-start" onClick={() => openDetail(p)}>
              <ClassSigil classId={p.classId} size="sm" />
              <span className="row-main">
                <span className="row-title">{cleanT20Text(p.name)}</span>
                <span className="row-sub clamp-2">{cleanT20Text(p.description)}</span>
                <span className="hstack-xs wrap">
                  {classId === 'todas' && <span className="badge">{p.className}</span>}
                  {p.cost && <span className="badge badge-mp">{p.cost}</span>}
                  {p.prerequisites && <span className="badge badge-warning">Req.: {cleanT20Text(p.prerequisites)}</span>}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </>
  );
};
