import { describe, it, expect } from 'vitest';
import {
  calculateTotalAttributes,
  calculateMaxHp,
  calculateMaxMp,
  calculateDefense,
  calculateArmorPenalty,
  calculateMaxSpaces,
  calculateSkillBonus,
  getAttackConditionPenalty,
  getAttackOnlyConditionPenalty,
  calculateWeaponAttack,
  calculateWeaponDamage,
  recalculateFullCharacterSheet,
} from '../rulesEngine';
import type { CharacterAttributes, CharacterSheet, CharacterInventoryItem } from '../../types/character';

describe('Tormenta 20 JDA (v1.3) — rulesEngine', () => {
  describe('1. Atributos Básicos (Capítulo 1, pág. 17)', () => {
    it('o valor do atributo É o próprio modificador direto (sem fórmula de D&D 5e/3.5e)', () => {
      const base: CharacterAttributes = { for: 3, des: 1, con: 2, int: 0, sab: 0, car: -1 };
      const racial: CharacterAttributes = { for: 1, des: 0, con: 1, int: 0, sab: 0, car: 0 };
      const total = calculateTotalAttributes(base, racial);

      expect(total.for).toBe(4);
      expect(total.con).toBe(3);
      expect(total.des).toBe(1);
      expect(total.car).toBe(-1);
    });
  });

  describe('2. Pontos de Vida (PV) e Pontos de Mana (PM) (Capítulo 1, pág. 34)', () => {
    it('calcula PV corretamente no Nível 1 (Base da classe + CON)', () => {
      // Guerreiro: hpInitial = 20, hpPerLevel = 5
      const attrs: CharacterAttributes = { for: 3, des: 1, con: 3, int: 0, sab: 0, car: 0 };
      const hp = calculateMaxHp(1, attrs, 'guerreiro', 'humano');
      // Nível 1: 20 (base classe) + 3 (CON) = 23
      expect(hp.value).toBe(23);
    });

    it('calcula PV corretamente em níveis superiores com avanço retroativo de CON', () => {
      // Guerreiro Nível 5 com CON 2:
      // Nível 1: 20 + 2 = 22
      // Níveis 2 a 5: 4 * (5 + 2) = 28
      // Total: 22 + 28 = 50
      const attrs: CharacterAttributes = { for: 3, des: 1, con: 2, int: 0, sab: 0, car: 0 };
      const hp = calculateMaxHp(5, attrs, 'guerreiro', 'humano');
      expect(hp.value).toBe(50);
    });

    it('calcula PM por nível conforme a progressão da classe', () => {
      // Arcanista: mpPerLevel = 6
      const mpLvl1 = calculateMaxMp(1, 'arcanista', 'humano');
      expect(mpLvl1.value).toBe(6);

      const mpLvl3 = calculateMaxMp(3, 'arcanista', 'humano');
      expect(mpLvl3.value).toBe(18); // 3 * 6
    });

    it('aplica bônus racial de PM de Elfo (+1 PM por nível)', () => {
      // Arcanista Nível 3 Elfo: 3 * 6 + 3 = 21 PM
      const mpElfo = calculateMaxMp(3, 'arcanista', 'elfo');
      expect(mpElfo.value).toBe(21);
    });
  });

  describe('3. Defesa e Armaduras (Capítulo 5 & Capítulo 3, pág. 226)', () => {
    it('defesa sem armadura: 10 + DES', () => {
      const attrs: CharacterAttributes = { for: 0, des: 3, con: 0, int: 0, sab: 0, car: 0 };
      const defense = calculateDefense(1, attrs, [], 'humano', 'guerreiro');
      expect(defense.value).toBe(13); // 10 + 3
    });

    it('armadura leve soma bônus de armadura + Destreza integral', () => {
      const attrs: CharacterAttributes = { for: 0, des: 2, con: 0, int: 0, sab: 0, car: 0 };
      const items: CharacterInventoryItem[] = [
        {
          id: 'couro_batido',
          name: 'Couro Batido',
          category: 'armadura_leve',
          spaces: 2,
          quantity: 1,
          isEquipped: true,
          defenseBonus: 3,
          armorPenalty: 1,
        },
      ];
      const defense = calculateDefense(1, attrs, items, 'humano', 'guerreiro');
      expect(defense.value).toBe(15); // 10 + 2 (DES) + 3 (armadura)
    });

    it('armadura pesada ANULA bônus de Destreza na Defesa canônica de T20', () => {
      const attrs: CharacterAttributes = { for: 4, des: 4, con: 2, int: 0, sab: 0, car: 0 };
      const items: CharacterInventoryItem[] = [
        {
          id: 'armadura_completa',
          name: 'Armadura Completa',
          category: 'armadura_pesada',
          spaces: 5,
          quantity: 1,
          isEquipped: true,
          defenseBonus: 10,
          armorPenalty: 5,
        },
      ];
      // Mesmo com DES 4, a armadura pesada anula o bônus de Destreza
      const defense = calculateDefense(1, attrs, items, 'humano', 'guerreiro');
      expect(defense.value).toBe(20); // 10 + 0 (DES anulada) + 10 (armadura)
    });

    it('escudo acumula com armadura leve e armadura pesada', () => {
      const attrs: CharacterAttributes = { for: 3, des: 3, con: 2, int: 0, sab: 0, car: 0 };
      const items: CharacterInventoryItem[] = [
        {
          id: 'cota_malha',
          name: 'Cota de Malha',
          category: 'armadura_pesada',
          spaces: 5,
          quantity: 1,
          isEquipped: true,
          defenseBonus: 6,
          armorPenalty: 2,
        },
        {
          id: 'escudo_pesado',
          name: 'Escudo Pesado',
          category: 'escudo',
          spaces: 2,
          quantity: 1,
          isEquipped: true,
          defenseBonus: 2,
          armorPenalty: 2,
        },
      ];
      const defense = calculateDefense(1, attrs, items, 'humano', 'guerreiro');
      expect(defense.value).toBe(18); // 10 + 0 (DES anulada) + 6 + 2
    });
  });

  describe('4. Penalidade de Armadura (Capítulo 3, pág. 142)', () => {
    it('soma a penalidade de armaduras e escudos equipados', () => {
      const items: CharacterInventoryItem[] = [
        {
          id: 'armadura',
          name: 'Armadura',
          category: 'armadura_pesada',
          spaces: 5,
          quantity: 1,
          isEquipped: true,
          defenseBonus: 6,
          armorPenalty: 3,
        },
        {
          id: 'escudo',
          name: 'Escudo',
          category: 'escudo',
          spaces: 2,
          quantity: 1,
          isEquipped: true,
          defenseBonus: 2,
          armorPenalty: 1,
        },
        {
          id: 'desequipado',
          name: 'Outro Escudo',
          category: 'escudo',
          spaces: 2,
          quantity: 1,
          isEquipped: false,
          defenseBonus: 1,
          armorPenalty: 5,
        },
      ];
      const penalty = calculateArmorPenalty(items);
      expect(penalty.value).toBe(4); // 3 + 1 (o desequipado é ignorado)
    });
  });

  describe('5. Capacidade de Carga em Espaços (Capítulo 3, pág. 142)', () => {
    it('calcula capacidade de carga baseada na Força', () => {
      const attrsFor3: CharacterAttributes = { for: 3, des: 0, con: 0, int: 0, sab: 0, car: 0 };
      const spacesFor3 = calculateMaxSpaces(attrsFor3, []);
      // 10 + 3 * 3 = 19
      expect(spacesFor3.value).toBe(19);

      const attrsFor0: CharacterAttributes = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
      const spacesFor0 = calculateMaxSpaces(attrsFor0, []);
      expect(spacesFor0.value).toBe(10); // 10 + 0
    });
  });

  describe('6. Testes de Perícia e Resistências (Capítulo 2, pág. 114)', () => {
    it('perícia destreinada = floor(nível / 2) + Atributo', () => {
      // Nível 3 (metade = 1), Atributo Luta (FOR = 3), Destreinada (+0)
      const attrs: CharacterAttributes = { for: 3, des: 0, con: 0, int: 0, sab: 0, car: 0 };
      const skill = calculateSkillBonus('luta', 3, attrs, false, 0, 'humano');
      expect(skill.total).toBe(4); // 1 (metade nível) + 3 (FOR)
    });

    it('perícia treinada nos níveis 1 a 6 recebe bônus de treino +2', () => {
      // Nível 1 (metade = 0), Atributo Pontaria (DES = 2), Treinada (+2)
      const attrs: CharacterAttributes = { for: 0, des: 2, con: 0, int: 0, sab: 0, car: 0 };
      const skill = calculateSkillBonus('pontaria', 1, attrs, true, 0, 'humano');
      expect(skill.total).toBe(4); // 0 + 2 + 2
    });

    it('perícia treinada nos níveis 7 a 14 recebe bônus de treino +4', () => {
      // Nível 7 (metade = 3), Atributo Vontade (SAB = 3), Treinada (+4)
      const attrs: CharacterAttributes = { for: 0, des: 0, con: 0, int: 0, sab: 3, car: 0 };
      const skill = calculateSkillBonus('vontade', 7, attrs, true, 0, 'humano');
      expect(skill.total).toBe(10); // 3 + 3 + 4
    });

    it('perícia treinada nos níveis 15 a 20 recebe bônus de treino +6', () => {
      // Nível 20 (metade = 10), Atributo Fortitude (CON = 5), Treinada (+6)
      const attrs: CharacterAttributes = { for: 0, des: 0, con: 5, int: 0, sab: 0, car: 0 };
      const skill = calculateSkillBonus('fortitude', 20, attrs, true, 0, 'humano');
      expect(skill.total).toBe(21); // 10 + 5 + 6
    });

    it('aplica penalidade de armadura em perícias afetadas (Acrobacia, Furtividade, Ladinagem)', () => {
      // Nível 1, DES 3, Treinada (+2), Penalidade de armadura -3
      const attrs: CharacterAttributes = { for: 0, des: 3, con: 0, int: 0, sab: 0, car: 0 };
      const skill = calculateSkillBonus('acrobacia', 1, attrs, true, -3, 'humano');
      expect(skill.total).toBe(2); // 0 + 3 + 2 - 3 = 2
    });
  });

  describe('7. Condições Ativas e Penalidades de Ataque (Apêndice: Condições, pág. 394)', () => {
    it('aplica penalidades de condições cumulativas para ataque corpo a corpo', () => {
      // Abalado (-2) e Caído (-5 para corpo a corpo)
      const { penalty, reasons } = getAttackConditionPenalty(['abalado', 'caido'], true);
      expect(penalty).toBe(-7);
      expect(reasons).toContain('Abalado (-2)');
      expect(reasons).toContain('Caído (-5 corpo a corpo)');
    });
  });

  describe('8. Recálculo Completo da Ficha (recalculateFullCharacterSheet)', () => {
    it('recalcula de forma coerente e consistente todos os atributos, defesas e perícias', () => {
      const mockCharacter: CharacterSheet = {
        id: 'test_char',
        name: 'Valeros',
        playerName: 'Lucas',
        level: 1,
        xp: 0,
        classId: 'guerreiro',
        raceId: 'humano',
        originId: 'soldado',
        selectedClassSkills: ['luta', 'fortitude'],
        selectedIntSkills: ['iniciativa'],
        selectedOriginBenefits: [],
        deityId: 'valkaria',
        selectedDeityPowers: [],
        attributeMethod: 'point_buy',
        baseAttributes: { for: 3, des: 2, con: 2, int: 1, sab: 0, car: -1 },
        racialModifiers: { for: 1, des: 0, con: 1, int: 0, sab: 0, car: 0 },
        totalAttributes: { for: 4, des: 2, con: 3, int: 1, sab: 0, car: -1 },
        stats: {
          currentHp: 23,
          maxHp: { value: 23, formula: '20 + 3', components: [] },
          currentMp: 3,
          maxMp: { value: 3, formula: '3', components: [] },
          tempHp: 0,
          tempMp: 0,
          defense: { value: 12, formula: '10 + 2', components: [] },
          armorPenalty: { value: 0, formula: '0', components: [] },
          speed: { value: 9, formula: '9m', components: [] },
          currentSpaces: 0,
          maxSpaces: { value: 22, formula: '10 + 4×3', components: [] },
        },
        skills: {},
        inventory: [],
        spells: [],
        powers: [],
        activeConditions: [],
        bio: {},
        notes: [],
        tibares: 100,
        createdAt: '2026-10-02',
        updatedAt: '2026-10-02',
      };

      const updated = recalculateFullCharacterSheet(mockCharacter);
      expect(updated.totalAttributes.for).toBe(4);
      expect(updated.totalAttributes.con).toBe(3);
      expect(updated.stats.maxHp.value).toBe(23); // 20 + 3
      expect(updated.stats.defense.value).toBe(12); // 10 + 2
      expect(updated.skills['luta']).toBeDefined();
    });
  });
});

describe('Tormenta 20 JDA (v1.3) — ataque e dano com armas (Cap. 5, pág. 230)', () => {
  const skills = {
    luta: { id: 'luta', name: 'Luta', attribute: 'for', isTrained: true, total: 5, breakdown: { value: 5, formula: '', components: [] }, source: 'classe' },
    pontaria: { id: 'pontaria', name: 'Pontaria', attribute: 'des', isTrained: false, total: 1, breakdown: { value: 1, formula: '', components: [] }, source: 'custom' },
  } as any;
  const attrs = { for: 3, des: 1, con: 2, int: 0, sab: 0, car: 0 };

  it('ataque corpo a corpo usa Luta + bônus da arma (Certeira +1)', () => {
    const atk = calculateWeaponAttack({ skills, activeConditions: [] }, { name: 'Espada longa', subcategory: 'uma_mao', attackBonus: 1 });
    expect(atk.value).toBe(6);
    expect(atk.isMelee).toBe(true);
  });

  it('não reaplica Abalado (já descontado na perícia), mas aplica Caído no corpo a corpo', () => {
    const atk = calculateWeaponAttack({ skills, activeConditions: ['abalado', 'caido'] }, { name: 'Espada longa', subcategory: 'uma_mao' });
    expect(atk.value).toBe(0); // Luta 5 (já com Abalado) − 5 (Caído)
    expect(getAttackOnlyConditionPenalty(['abalado'], true).penalty).toBe(0);
  });

  it('ataque à distância usa Pontaria e ignora Caído', () => {
    const atk = calculateWeaponAttack({ skills, activeConditions: ['caido'] }, { name: 'Arco curto', subcategory: 'distancia' });
    expect(atk.value).toBe(1);
    expect(atk.isMelee).toBe(false);
  });

  it('dano corpo a corpo soma Força: espada longa 1d8 com Força 3 = 1d8+3', () => {
    const dmg = calculateWeaponDamage({ totalAttributes: attrs }, { damage: '1d8', subcategory: 'uma_mao' });
    expect(dmg).toMatchObject({ count: 1, sides: 8, modifier: 3, formula: '1d8+3', addsStrength: true });
  });

  it('dano de arma de disparo NÃO soma Força', () => {
    const dmg = calculateWeaponDamage(
      { totalAttributes: attrs },
      { damage: '1d8', subcategory: 'distancia', description: 'Besta leve com mecanismo de disparo.' }
    );
    expect(dmg?.formula).toBe('1d8');
    expect(dmg?.addsStrength).toBe(false);
  });

  it('arma de arremesso soma Força e melhorias de dano (Cruel +1) entram no modificador', () => {
    const dmg = calculateWeaponDamage(
      { totalAttributes: attrs },
      { damage: '1d6 + 1', subcategory: 'distancia', description: 'Lança feita para arremesso.' }
    );
    expect(dmg?.modifier).toBe(4);
    expect(dmg?.formula).toBe('1d6+4');
  });

  it('armas sem dano (rede) retornam null', () => {
    expect(calculateWeaponDamage({ totalAttributes: attrs }, { damage: '-', subcategory: 'distancia' })).toBeNull();
  });
});
