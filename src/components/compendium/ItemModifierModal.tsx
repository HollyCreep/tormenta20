import React, { useState } from 'react';
import { EquipmentItem } from '../../types/rules';
import {
  ITEM_MODIFIERS_LIST,
  canApplyModifier,
  calculateModifiedItem,
  IMPROVEMENT_TIER_COSTS,
  ENCHANTMENT_TIER_COSTS,
  removeModifierWithDependents,
  getDependentModifierIds,
  sanitizeModifiers,
} from '../../data/itemModifiers';
import { EQUIPMENT_LIST } from '../../data/equipment';
import { ItemCard } from '../common/ItemCard';
import {
  Sparkles,
  Shield,
  Check,
  X,
  AlertCircle,
  Coins,
  Wrench,
  Sliders,
  Flame,
  Info,
} from 'lucide-react';

interface ItemModifierModalProps {
  item: EquipmentItem;
  initialModifiers?: string[];
  initialMaterial?: string;
  characterTibares?: number;
  isOpen: boolean;
  onClose: () => void;
  onApply: (customizedItem: EquipmentItem, appliedModifierIds: string[], totalCost: number) => void;
}

export const ItemModifierModal: React.FC<ItemModifierModalProps> = ({
  item,
  initialModifiers = [],
  characterTibares,
  isOpen,
  onClose,
  onApply,
}) => {
  // Encontra item base canônico caso esteja reabrindo customização prévia
  const originalEquipment = EQUIPMENT_LIST.find((eq) => eq.id === item.id);
  const baseName = originalEquipment?.name || item.name;
  const basePrice = originalEquipment?.price || item.price;
  const baseSpaces = originalEquipment?.spaces !== undefined ? originalEquipment.spaces : item.spaces;
  const baseDamage = originalEquipment?.damage || item.damage || '';
  const baseCritical = originalEquipment?.critical || item.critical || '';
  const baseDefense = originalEquipment?.defenseBonus !== undefined ? originalEquipment.defenseBonus : (item.defenseBonus || 0);
  const basePenalty = originalEquipment?.armorPenalty !== undefined ? originalEquipment.armorPenalty : (item.armorPenalty || 0);

  const [selectedModifiers, setSelectedModifiers] = useState<string[]>(sanitizeModifiers(initialModifiers));
  const [activeTab, setActiveTab] = useState<'melhorias' | 'materiais' | 'encantos' | 'valores'>('melhorias');

  // Valores customizados editáveis pelo usuário
  const [customName, setCustomName] = useState(baseName);
  const [customPriceStr, setCustomPriceStr] = useState(basePrice);
  const [customSpaces, setCustomSpaces] = useState(baseSpaces);
  const [customDamage, setCustomDamage] = useState(baseDamage);
  const [customCritical, setCustomCritical] = useState(baseCritical);
  const [customDefense, setCustomDefense] = useState(baseDefense);
  const [customPenalty, setCustomPenalty] = useState(basePenalty);
  const [customDescription, setCustomDescription] = useState(item.description || originalEquipment?.description || '');

  if (!isOpen) return null;

  // Item base com valores personalizados aplicados
  const baseItemWithEdits: EquipmentItem = {
    ...item,
    name: customName,
    price: customPriceStr,
    spaces: customSpaces,
    damage: customDamage || undefined,
    critical: customCritical || undefined,
    defenseBonus: item.category.startsWith('armadura') || item.category === 'escudo' ? customDefense : undefined,
    armorPenalty: item.category.startsWith('armadura') || item.category === 'escudo' ? customPenalty : undefined,
    description: customDescription,
  };

  // Recalcula o item dinamicamente com melhorias, materiais e encantos
  const calculated = calculateModifiedItem(baseItemWithEdits, selectedModifiers);

  // Cria objeto EquipmentItem resultante para o Live Preview e para salvar no inventário
  const previewItem: EquipmentItem = {
    ...baseItemWithEdits,
    name: calculated.name,
    price: calculated.totalPriceStr,
    defenseBonus: calculated.defenseBonus,
    armorPenalty: calculated.armorPenalty,
    spaces: calculated.spaces,
    damage: calculated.damage || baseItemWithEdits.damage,
    attackBonus: calculated.attackBonus > 0 ? calculated.attackBonus : undefined,
    critical: calculated.criticalStr || baseItemWithEdits.critical,
    description: baseItemWithEdits.description,
  };

  const improvements = ITEM_MODIFIERS_LIST.filter((m) => m.type === 'melhoria');
  const materials = ITEM_MODIFIERS_LIST.filter((m) => m.type === 'material_especial');
  const enchantments = ITEM_MODIFIERS_LIST.filter((m) => m.type === 'encanto');

  const handleToggleModifier = (modId: string) => {
    if (selectedModifiers.includes(modId)) {
      // Cascata: desmarcar um modificador remove ele e todos que dependem dele
      const newModifiers = removeModifierWithDependents(modId, selectedModifiers);
      setSelectedModifiers(newModifiers);
    } else {
      const mod = ITEM_MODIFIERS_LIST.find((m) => m.id === modId);
      if (!mod) return;
      const check = canApplyModifier(baseItemWithEdits, mod, selectedModifiers);
      if (check.allowed) {
        setSelectedModifiers([...selectedModifiers, modId]);
      } else {
        alert(check.reason || 'Este modificador não pode ser aplicado.');
      }
    }
  };

  const improvementsCount = selectedModifiers.filter((id) => {
    const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
    return m && (m.type === 'melhoria' || m.type === 'material_especial');
  }).length;

  const enchantmentsCount = selectedModifiers.filter((id) => {
    const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
    return m && m.type === 'encanto';
  }).length;

  const hasSpecialMaterial = selectedModifiers.some((id) => {
    const m = ITEM_MODIFIERS_LIST.find((x) => x.id === id);
    return m && m.type === 'material_especial';
  });

  const canAfford = characterTibares === undefined || characterTibares >= calculated.totalPrice;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1150px',
          width: '95vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}
      >
        {/* Header do Modal */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Wrench size={22} style={{ color: 'var(--t20-gold)' }} />
            <div>
              <h2 style={{ fontSize: '1.35rem', margin: 0, color: '#ffffff' }}>
                Oficina & Customização: {customName}
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Itens Superiores (pág. 164) e Encantos Mágicos (pág. 340) • Tormenta 20 Edição Jogo do Ano
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Abas Superiores do Modal */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.2)',
            padding: '0.5rem 1.5rem',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('melhorias')}
            className={`btn ${activeTab === 'melhorias' ? 'btn-gold' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <Sparkles size={15} />
            Melhorias Mecânicas ({improvementsCount}/4)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('materiais')}
            className={`btn ${activeTab === 'materiais' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <Shield size={15} />
            Materiais Especiais {hasSpecialMaterial ? '(Aplicado)' : ''}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('encantos')}
            className={`btn ${activeTab === 'encantos' ? 'btn-ruby' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <Flame size={15} />
            Encantos Mágicos ({enchantmentsCount}/3)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('valores')}
            className={`btn ${activeTab === 'valores' ? 'active' : 'btn-ghost'}`}
            style={{ fontSize: '0.85rem', gap: '0.4rem' }}
          >
            <Sliders size={15} />
            Editar Valores Básicos
          </button>
        </div>

        {/* Corpo: Grade 2 Colunas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(350px, 1.45fr) minmax(320px, 1fr)',
            gap: '1.5rem',
            padding: '1.5rem',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {/* COLUNA ESQUERDA: Seletor Interativo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* ABA 1: MELHORIAS MECÂNICAS */}
            {activeTab === 'melhorias' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--t20-gold-light)' }}>
                    Melhorias Mecânicas (Tabela 3-8, pág. 165)
                  </span>
                  <span className={`badge ${improvementsCount >= 4 ? 'badge-ruby' : 'badge-gold'}`} style={{ fontSize: '0.75rem' }}>
                    {improvementsCount} de 4 melhorias usadas
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.65rem' }}>
                  {improvements.map((mod) => {
                    const isSelected = selectedModifiers.includes(mod.id);
                    const check = canApplyModifier(baseItemWithEdits, mod, selectedModifiers);
                    const isAllowed = isSelected || check.allowed;
                    const activeDependents = getDependentModifierIds(mod.id).filter((depId) => selectedModifiers.includes(depId));

                    return (
                      <div
                        key={mod.id}
                        onClick={() => {
                          if (isAllowed) handleToggleModifier(mod.id);
                        }}
                        className="t20-card"
                        style={{
                          cursor: isAllowed ? 'pointer' : 'not-allowed',
                          padding: '0.75rem',
                          opacity: isAllowed ? 1 : 0.45,
                          borderColor: isSelected
                            ? 'var(--t20-gold)'
                            : isAllowed
                            ? 'var(--border-color)'
                            : 'rgba(239, 68, 68, 0.3)',
                          background: isSelected
                            ? 'rgba(245, 158, 11, 0.12)'
                            : isAllowed
                            ? 'rgba(0,0,0,0.2)'
                            : 'rgba(239, 68, 68, 0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.35rem',
                          transition: 'var(--transition)',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? 'var(--t20-gold-light)' : '#ffffff' }}>
                              {mod.name}
                            </span>
                            {isSelected && <Check size={16} style={{ color: 'var(--t20-gold)' }} />}
                          </div>

                          {/* Alerta de pré-requisito ativo caso este modificador seja desmarcado */}
                          {isSelected && activeDependents.length > 0 && (
                            <div
                              style={{
                                fontSize: '0.7rem',
                                color: '#f59e0b',
                                background: 'rgba(245, 158, 11, 0.12)',
                                border: '1px solid rgba(245, 158, 11, 0.25)',
                                padding: '0.2rem 0.4rem',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                margin: '0.3rem 0',
                              }}
                            >
                              <AlertCircle size={11} />
                              <span>
                                Pré-requisito ativo de:{' '}
                                {activeDependents
                                  .map((d) => ITEM_MODIFIERS_LIST.find((m) => m.id === d)?.name || d)
                                  .join(', ')}{' '}
                                (desmarcar removerá ambos)
                              </span>
                            </div>
                          )}

                          {/* Requisito prévio do modificador */}
                          {mod.requirementText && !isSelected && (
                            <div
                              style={{
                                fontSize: '0.7rem',
                                color: check.allowed ? '#34d399' : '#f87171',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                margin: '0.2rem 0',
                              }}
                            >
                              <Info size={11} />
                              <span>{mod.requirementText} {check.allowed ? '(satisfeito)' : ''}</span>
                            </div>
                          )}

                          {!isAllowed && (
                            <div style={{ fontSize: '0.7rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0.2rem 0' }}>
                              <AlertCircle size={11} />
                              <span>{check.reason}</span>
                            </div>
                          )}

                          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.775rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ABA 2: MATERIAIS ESPECIAIS */}
            {activeTab === 'materiais' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#38bdf8' }}>
                    Materiais Especiais (Tabela 3-9, pág. 166)
                  </span>
                  <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                    Conta como 1 melhoria do item
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.65rem' }}>
                  {materials.map((mat) => {
                    const isSelected = selectedModifiers.includes(mat.id);
                    const check = canApplyModifier(baseItemWithEdits, mat, selectedModifiers);
                    const isAllowed = isSelected || check.allowed;

                    let matCost = 0;
                    if (mat.priceByItemType) {
                      if (baseItemWithEdits.category.startsWith('arma')) matCost = mat.priceByItemType.arma || 0;
                      else if (baseItemWithEdits.category === 'armadura_leve') matCost = mat.priceByItemType.armadura_leve || 0;
                      else if (baseItemWithEdits.category === 'armadura_pesada') matCost = mat.priceByItemType.armadura_pesada || 0;
                      else if (baseItemWithEdits.category === 'escudo') matCost = mat.priceByItemType.escudo || 0;
                      else if (baseItemWithEdits.category === 'esoterico') matCost = mat.priceByItemType.esoterico || 0;
                    }

                    return (
                      <div
                        key={mat.id}
                        onClick={() => {
                          if (isAllowed) handleToggleModifier(mat.id);
                        }}
                        className="t20-card"
                        style={{
                          cursor: isAllowed ? 'pointer' : 'not-allowed',
                          padding: '0.75rem',
                          opacity: isAllowed ? 1 : 0.45,
                          borderColor: isSelected
                            ? '#38bdf8'
                            : isAllowed
                            ? 'var(--border-color)'
                            : 'rgba(239, 68, 68, 0.3)',
                          background: isSelected
                            ? 'rgba(56, 189, 248, 0.12)'
                            : isAllowed
                            ? 'rgba(0,0,0,0.2)'
                            : 'rgba(239, 68, 68, 0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.35rem',
                          transition: 'var(--transition)',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? '#38bdf8' : '#ffffff' }}>
                              {mat.name}
                            </span>
                            <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                              +T$ {matCost.toLocaleString('pt-BR')}
                            </span>
                          </div>

                          {!isAllowed && (
                            <div style={{ fontSize: '0.7rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0.2rem 0' }}>
                              <AlertCircle size={11} />
                              <span>{check.reason}</span>
                            </div>
                          )}

                          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.775rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                            {mat.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ABA 3: ENCANTOS MÁGICOS */}
            {activeTab === 'encantos' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--t20-ruby)' }}>
                    Encantos Mágicos (Capítulo 8, Tabelas 8-7, 8-8 e 8-10)
                  </span>
                  <span className={`badge ${enchantmentsCount >= 3 ? 'badge-ruby' : 'badge-slate'}`} style={{ fontSize: '0.75rem' }}>
                    {enchantmentsCount} de 3 encantos usados
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.65rem' }}>
                  {enchantments.map((enc) => {
                    const isSelected = selectedModifiers.includes(enc.id);
                    const check = canApplyModifier(baseItemWithEdits, enc, selectedModifiers);
                    const isAllowed = isSelected || check.allowed;
                    const activeDependents = getDependentModifierIds(enc.id).filter((depId) => selectedModifiers.includes(depId));

                    return (
                      <div
                        key={enc.id}
                        onClick={() => {
                          if (isAllowed) handleToggleModifier(enc.id);
                        }}
                        className="t20-card"
                        style={{
                          cursor: isAllowed ? 'pointer' : 'not-allowed',
                          padding: '0.75rem',
                          opacity: isAllowed ? 1 : 0.45,
                          borderColor: isSelected
                            ? 'var(--t20-ruby)'
                            : isAllowed
                            ? 'var(--border-color)'
                            : 'rgba(239, 68, 68, 0.3)',
                          background: isSelected
                            ? 'rgba(225, 29, 72, 0.12)'
                            : isAllowed
                            ? 'rgba(0,0,0,0.2)'
                            : 'rgba(239, 68, 68, 0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.35rem',
                          transition: 'var(--transition)',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? '#ff6b7b' : '#ffffff' }}>
                              {enc.name}
                            </span>
                            {isSelected && <Check size={16} style={{ color: 'var(--t20-ruby)' }} />}
                          </div>

                          {/* Alerta de pré-requisito ativo caso este encanto seja desmarcado */}
                          {isSelected && activeDependents.length > 0 && (
                            <div
                              style={{
                                fontSize: '0.7rem',
                                color: '#f59e0b',
                                background: 'rgba(245, 158, 11, 0.12)',
                                border: '1px solid rgba(245, 158, 11, 0.25)',
                                padding: '0.2rem 0.4rem',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                margin: '0.3rem 0',
                              }}
                            >
                              <AlertCircle size={11} />
                              <span>
                                Pré-requisito ativo de:{' '}
                                {activeDependents
                                  .map((d) => ITEM_MODIFIERS_LIST.find((m) => m.id === d)?.name || d)
                                  .join(', ')}{' '}
                                (desmarcar removerá ambos)
                              </span>
                            </div>
                          )}

                          {/* Requisito prévio do encanto */}
                          {enc.requirementText && !isSelected && (
                            <div
                              style={{
                                fontSize: '0.7rem',
                                color: check.allowed ? '#34d399' : '#f87171',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                margin: '0.2rem 0',
                              }}
                            >
                              <Info size={11} />
                              <span>{enc.requirementText} {check.allowed ? '(satisfeito)' : ''}</span>
                            </div>
                          )}

                          {!isAllowed && (
                            <div style={{ fontSize: '0.7rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem', margin: '0.2rem 0' }}>
                              <AlertCircle size={11} />
                              <span>{check.reason}</span>
                            </div>
                          )}

                          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.775rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                            {enc.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ABA 4: EDITAR VALORES BÁSICOS */}
            {activeTab === 'valores' && (
              <div className="t20-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ffffff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  Propriedades & Estatísticas Básicas do Item
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                      Nome do Item
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                      Preço Base
                    </label>
                    <input
                      type="text"
                      value={customPriceStr}
                      onChange={(e) => setCustomPriceStr(e.target.value)}
                      placeholder="Ex: T$ 25"
                      style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                      Espaços de Carga
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={customSpaces}
                      onChange={(e) => setCustomSpaces(parseInt(e.target.value, 10) || 0)}
                      style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                    />
                  </div>

                  {baseItemWithEdits.category.startsWith('arma') && (
                    <>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                          Dano (Ex: 1d8, 2d6)
                        </label>
                        <input
                          type="text"
                          value={customDamage}
                          onChange={(e) => setCustomDamage(e.target.value)}
                          style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                          Crítico (Ex: 19, 19/x3, x3)
                        </label>
                        <input
                          type="text"
                          value={customCritical}
                          onChange={(e) => setCustomCritical(e.target.value)}
                          style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                        />
                      </div>
                    </>
                  )}

                  {(baseItemWithEdits.category.startsWith('armadura') || baseItemWithEdits.category === 'escudo') && (
                    <>
                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                          Bônus na Defesa (+Defesa)
                        </label>
                        <input
                          type="number"
                          value={customDefense}
                          onChange={(e) => setCustomDefense(parseInt(e.target.value, 10) || 0)}
                          style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                          Penalidade de Armadura
                        </label>
                        <input
                          type="number"
                          value={customPenalty}
                          onChange={(e) => setCustomPenalty(parseInt(e.target.value, 10) || 0)}
                          style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.9rem' }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.3rem' }}>
                    Descrição / Notas do Item
                  </label>
                  <textarea
                    rows={3}
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    style={{ width: '100%', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* COLUNA DIREITA: Live Preview Card & Detalhamento Financeiro */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: 0 }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                Pré-visualização do Item em Tempo Real:
              </div>
              <ItemCard
                item={previewItem}
                appliedModifiers={selectedModifiers}
                actionType="compendium"
              />
            </div>

            {/* Painel Financeiro e Cálculo de Custos */}
            <div
              className="t20-card"
              style={{
                padding: '1rem',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                Cálculo de Custos & Regras:
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <span>Preço Base do Item:</span>
                <span>{baseItemWithEdits.price}</span>
              </div>

              {improvementsCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--t20-gold)' }}>
                  <span>Melhoria(s) ({improvementsCount}) [Tab. 3-7]:</span>
                  <span>+T$ {(IMPROVEMENT_TIER_COSTS[improvementsCount] || 0).toLocaleString('pt-BR')}</span>
                </div>
              )}

              {hasSpecialMaterial && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#38bdf8' }}>
                  <span>Material Especial (Tab. 3-9):</span>
                  <span>
                    +T${' '}
                    {(
                      calculated.totalPrice -
                      (parseFloat(baseItemWithEdits.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0) -
                      (IMPROVEMENT_TIER_COSTS[improvementsCount] || 0) -
                      (ENCHANTMENT_TIER_COSTS[enchantmentsCount] || 0)
                    ).toLocaleString('pt-BR')}
                  </span>
                </div>
              )}

              {enchantmentsCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#f43f5e' }}>
                  <span>Encanto(s) Mágico(s) ({enchantmentsCount}) [Tab. 8-7]:</span>
                  <span>+T$ {(ENCHANTMENT_TIER_COSTS[enchantmentsCount] || 0).toLocaleString('pt-BR')}</span>
                </div>
              )}

              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                }}
              >
                <span>Preço Total Final:</span>
                <span style={{ color: 'var(--t20-gold-light)', fontFamily: 'var(--font-mono)' }}>
                  {calculated.totalPriceStr}
                </span>
              </div>

              {characterTibares !== undefined && (
                <div style={{ fontSize: '0.8rem', color: canAfford ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <Coins size={14} />
                  <span>
                    Seu dinheiro: <strong>T$ {characterTibares.toLocaleString('pt-BR')}</strong>{' '}
                    {canAfford ? '(Saldo Suficiente)' : '(Saldo Insuficiente)'}
                  </span>
                </div>
              )}
            </div>

            {/* Ações de Cancelar / Salvar */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!canAfford}
                onClick={() => {
                  onApply(previewItem, selectedModifiers, calculated.totalPrice);
                  onClose();
                }}
                className="btn btn-primary"
                style={{ flex: 1.5, gap: '0.4rem' }}
              >
                <Check size={16} />
                Salvar Customização
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
