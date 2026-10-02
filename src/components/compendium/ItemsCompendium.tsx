import React, { lazy, Suspense, useMemo, useState } from 'react';
import { BookOpen, Package, Wrench } from 'lucide-react';
import { EQUIPMENT_LIST } from '../../data/equipment';
import type { EquipmentItem } from '../../types/rules';
import { RULES_CITATIONS } from '../../data/rulesCitations';
import { DetailModal, type DetailModalData } from '../common/DetailModal';
import { getCategoryFullLabel, getEquipmentDetailModalData } from '../../utils/equipmentDetail';
import { EmptyState, SearchField, Segmented } from '../ui/controls';
import { categoryIcon } from '../sheet/tabs/InventoryTab';
import { normalizeSearch } from './FilterSheet';

const ItemModifierModal = lazy(() => import('./ItemModifierModal').then((m) => ({ default: m.ItemModifierModal })));

interface ItemsCompendiumProps {
  switcher?: React.ReactNode;
  onBack?: () => void;
}

type Group = 'todas' | 'armas' | 'armaduras' | 'geral';

const isWeapon = (it: EquipmentItem) => it.category.startsWith('arma');
const isArmor = (it: EquipmentItem) => it.category.startsWith('armadura') || it.category === 'escudo';
const isModifiable = (it: EquipmentItem) => isWeapon(it) || isArmor(it) || it.category === 'esoterico';

export const ItemsCompendium: React.FC<ItemsCompendiumProps> = ({ switcher }) => {
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState<Group>('todas');
  const [detail, setDetail] = useState<DetailModalData | null>(null);
  const [forging, setForging] = useState<EquipmentItem | null>(null);

  const results = useMemo(() => {
    const q = normalizeSearch(search.trim());
    return EQUIPMENT_LIST.filter((it) => {
      if (group === 'armas' && !isWeapon(it)) return false;
      if (group === 'armaduras' && !isArmor(it)) return false;
      if (group === 'geral' && (isWeapon(it) || isArmor(it))) return false;
      if (!q) return true;
      return normalizeSearch(`${it.name} ${it.description || ''} ${it.category} ${it.damageType || ''}`).includes(q);
    });
  }, [search, group]);

  return (
    <>
      <div className="subbar compendium-bar">
        {switcher}
        <SearchField value={search} onChange={setSearch} placeholder="Buscar item…" />
        <Segmented<Group>
          value={group}
          onChange={setGroup}
          ariaLabel="Grupo de itens"
          options={[
            { value: 'todas', label: 'Todos' },
            { value: 'armas', label: 'Armas' },
            { value: 'armaduras', label: 'Proteção' },
            { value: 'geral', label: 'Gerais' },
          ]}
        />
      </div>

      <div className="hstack between">
        <span className="t-sm t-3">
          {results.length} {results.length === 1 ? 'item' : 'itens'}
        </span>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() =>
            setDetail({
              title: RULES_CITATIONS.EQUIPMENT_RULES.title,
              category: 'Regra oficial',
              description: RULES_CITATIONS.EQUIPMENT_RULES.explanation,
              ruleCitation: RULES_CITATIONS.EQUIPMENT_RULES,
              initialTab: 'rules',
            })
          }
        >
          <BookOpen size={16} />
          Regras
        </button>
      </div>

      {results.length === 0 ? (
        <EmptyState icon={<Package size={24} />} title="Nenhum item encontrado" description="Ajuste a busca ou o grupo." />
      ) : (
        <div className="list compendium-list">
          {results.map((it) => (
            <div key={it.id} className="row pick-row">
              <button type="button" className="pick-main has-detail" onClick={() => setDetail(getEquipmentDetailModalData(it))}>
                <span className="inv-icon">{categoryIcon(it.category)}</span>
                <span className="row-main">
                  <span className="row-title">{it.name}</span>
                  <span className="row-sub truncate">
                    {getCategoryFullLabel(it.category, it.subcategory)}
                    {it.damage && it.damage !== '-' ? ` · ${it.damage}` : ''}
                    {it.critical ? ` · ${it.critical}` : ''}
                    {it.defenseBonus ? ` · Def +${it.defenseBonus}` : ''}
                    {` · ${it.spaces} esp.`}
                  </span>
                </span>
                <span className="t-sm t-gold t-semibold shrink-0">{it.price}</span>
              </button>
              {isModifiable(it) && (
                <button type="button" className="icon-btn icon-btn-sm" onClick={() => setForging(it)} aria-label={`Simular oficina para ${it.name}`}>
                  <Wrench size={17} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <DetailModal data={detail} onClose={() => setDetail(null)} />

      <Suspense fallback={null}>
        {forging && (
          <ItemModifierModal
            key={forging.id}
            item={forging}
            isOpen={!!forging}
            chargeMode="none"
            onClose={() => setForging(null)}
            onApply={() => setForging(null)}
          />
        )}
      </Suspense>
    </>
  );
};
