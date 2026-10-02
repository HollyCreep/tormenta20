import { describe, it, expect } from 'vitest';
import type { CharacterPower } from '../../types/character';
import { getClassPowerRuleCitation, getGeneralPowerRuleCitation } from '../textUtils';
import { GENERAL_POWERS_LIST } from '../../data/generalPowers';

describe('Powers Logic and Rules Citations', () => {
  const samplePowers: CharacterPower[] = [
    {
      id: 'guerreiro_ataque_especial',
      name: 'Ataque Especial',
      source: 'classe',
      cost: '1 PM',
      description: 'Gaste 1 PM para receber +4 no teste de ataque ou na rolagem de dano.',
    },
    {
      id: 'acuidade_com_arma',
      name: 'Acuidade com Arma',
      source: 'geral',
      type: 'combate',
      description: 'Permite usar Destreza no ataque e dano com armas leves.',
    },
    {
      id: 'deity_sangue_ferro',
      name: 'Sangue de Ferro',
      source: 'divindade',
      cost: '1 PM',
      description: 'Gaste 1 PM para receber redução de dano 2 e +2 em Fortitude.',
    },
    {
      id: 'anao_duro_como_pedra',
      name: 'Duro como Pedra',
      source: 'raca',
      description: 'Você recebe +3 PV no 1º nível e +1 por nível seguinte.',
    },
  ];

  it('correctly partitions character powers into Class and General categories', () => {
    const classPowers = samplePowers.filter((p) => p.source === 'classe');
    const generalPowers = samplePowers.filter((p) => p.source !== 'classe');

    expect(classPowers).toHaveLength(1);
    expect(classPowers[0].name).toBe('Ataque Especial');

    expect(generalPowers).toHaveLength(3);
    const names = generalPowers.map((p) => p.name);
    expect(names).toContain('Acuidade com Arma');
    expect(names).toContain('Sangue de Ferro');
    expect(names).toContain('Duro como Pedra');
  });

  it('generates canonical Tormenta 20 JDA citation for Class Powers', () => {
    const citation = getClassPowerRuleCitation(
      'guerreiro',
      'Guerreiro',
      'Ataque Especial',
      'Gaste 1 PM para receber +4 no ataque.',
      'Guerreiro 1'
    );

    expect(citation.book).toBe('Tormenta 20: Edição Jogo do Ano (v1.3)');
    expect(citation.chapter).toBe('Capítulo 1: O Mundo de Arton — Classes');
    expect(citation.section).toBe('Poderes de Guerreiro');
    expect(citation.quote).toContain('Ataque Especial');
  });

  it('generates canonical Tormenta 20 JDA citation for General Powers', () => {
    const matched = GENERAL_POWERS_LIST.find((gp) => gp.id === 'acuidade_com_arma');
    expect(matched).toBeDefined();

    if (matched) {
      const citation = getGeneralPowerRuleCitation(matched);
      expect(citation.book).toBe('Tormenta 20: Edição Jogo do Ano (v1.3)');
      expect(citation.chapter).toBe('Capítulo 2: Perícias & Poderes');
      expect(citation.section).toBe('Poderes Gerais — COMBATE');
      expect(citation.page).toBe('Página 124-128');
    }
  });
});
