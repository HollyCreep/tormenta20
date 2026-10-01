/**
 * Utilitários para formatação e higienização de textos e citações canônicas de Tormenta 20 JDA.
 */

const ENCLITIC_PRONOUNS = new Set([
  'o', 'a', 'os', 'as',
  'lo', 'la', 'los', 'las',
  'no', 'na', 'nos', 'nas',
  'se', 'me', 'te', 'lhe', 'lhes'
]);

const PREFIXES_WITH_HYPHEN = new Set([
  'pré', 'pre', 'pos', 'pós', 'recém', 'vice', 'ex', 'pró', 'contra', 'sub'
]);

/**
 * Remove quebras de linha e hifenização indevida geradas por extração de texto de PDFs.
 * Ex: "instantâ- nea" -> "instantânea", "per- mite" -> "permite", "pas-\nsar" -> "passar".
 */
export function cleanT20Text(text?: string): string {
  if (!text) return '';

  let cleaned = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  cleaned = cleaned.replace(/[\u2010\u2011\u2012\u2013\u2014]/g, '-');

  // 1. Hífen seguido de quebra de linha: (\w+)-\s*\n\s*(\w+)
  cleaned = cleaned.replace(/([a-zA-ZÀ-ÿ0-9]+)-\s*\n\s*([a-zA-ZÀ-ÿ0-9]+)/g, (_, w1, w2) => {
    const w1Low = w1.toLowerCase();
    const w2Low = w2.toLowerCase();
    if (PREFIXES_WITH_HYPHEN.has(w1Low) || ENCLITIC_PRONOUNS.has(w2Low)) {
      return `${w1}-${w2}`;
    }
    return `${w1}${w2}`;
  });

  // 2. Hífen seguido de espaço dentro de palavra quebrada: (\w+)-\s+([a-zA-ZÀ-ÿ]+)
  cleaned = cleaned.replace(/([a-zA-ZÀ-ÿ]+)-\s+([a-zA-ZÀ-ÿ]+)/g, (_, w1, w2) => {
    const w1Low = w1.toLowerCase();
    const w2Low = w2.toLowerCase();
    if (PREFIXES_WITH_HYPHEN.has(w1Low) || ENCLITIC_PRONOUNS.has(w2Low)) {
      return `${w1}-${w2}`;
    }
    if (w2[0] === w2[0].toLowerCase()) {
      return `${w1}${w2}`;
    }
    return `${w1} - ${w2}`;
  });

  // 3. Junta quebras de linhas isoladas mantendo parágrafos duplos
  const paragraphs = cleaned.split('\n\n');
  cleaned = paragraphs
    .map((p) => p.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
    .join('\n\n');

  // 4. Limpeza de espaços antes de pontuação
  cleaned = cleaned.replace(/\s+([.,;:!?])/g, '$1');

  return cleaned.trim();
}

/**
 * Mapeamento das páginas de cada classe no livro Tormenta 20 JDA (v1.3)
 */
const CLASS_BOOK_PAGES: Record<string, { page: number; pdfPage: number }> = {
  arcanista: { page: 36, pdfPage: 42 },
  barbaro: { page: 40, pdfPage: 46 },
  bardo: { page: 43, pdfPage: 49 },
  bucaneiro: { page: 46, pdfPage: 52 },
  cacador: { page: 49, pdfPage: 55 },
  cavaleiro: { page: 52, pdfPage: 58 },
  clerigo: { page: 56, pdfPage: 62 },
  druida: { page: 60, pdfPage: 66 },
  guerreiro: { page: 64, pdfPage: 70 },
  inventor: { page: 67, pdfPage: 73 },
  ladino: { page: 72, pdfPage: 78 },
  lutador: { page: 75, pdfPage: 81 },
  nobre: { page: 78, pdfPage: 84 },
  paladino: { page: 81, pdfPage: 87 },
};

import { RuleCitation } from '../data/rulesCitations';

/**
 * Retorna a citação canônica para um Poder de Classe
 */
export function getClassPowerCitation(classId: string, className: string, powerName: string): string {
  const info = CLASS_BOOK_PAGES[classId.toLowerCase()];
  const pageStr = info ? `pág. ${info.page} (PDF pág. ${info.pdfPage})` : 'Cap. 1';
  return `Tormenta 20: Edição Jogo do Ano (v1.3), Capítulo 1: Classes — Poderes de ${className} (${powerName}), ${pageStr}.`;
}

/**
 * Retorna o objeto canônico RuleCitation para um Poder de Classe
 */
export function getClassPowerRuleCitation(classId: string, className: string, powerName: string, description: string, prerequisites?: string): RuleCitation {
  const info = CLASS_BOOK_PAGES[classId.toLowerCase()];
  const pageStr = info ? `Página ${info.page} (PDF pág. ${info.pdfPage})` : 'Capítulo 1: Classes';
  return {
    id: `class_power_${classId}_${powerName.toLowerCase().replace(/\s+/g, '_')}`,
    title: powerName,
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 1: O Mundo de Arton — Classes',
    section: `Poderes de ${className}`,
    page: pageStr,
    quote: `“${powerName}. ${cleanT20Text(description)}”`,
    explanation: prerequisites
      ? `Para adquirir e utilizar este poder de ${className}, o personagem deve cumprir: ${cleanT20Text(prerequisites)}.`
      : `Habilidade selecionável na evolução da classe ${className}.`,
  };
}

/**
 * Retorna a citação canônica para um Poder Geral
 */
export function getGeneralPowerCitation(
  categoryOrPower: string | { category: string; name: string },
  powerName?: string
): string {
  if (typeof categoryOrPower === 'object' && categoryOrPower !== null) {
    return getGeneralPowerCitation(categoryOrPower.category, categoryOrPower.name);
  }
  const category = categoryOrPower;
  const name = powerName || '';
  const catNames: Record<string, string> = {
    combate: 'Poderes de Combate (pág. 124)',
    destino: 'Poderes de Destino (pág. 128)',
    magia: 'Poderes de Magia (pág. 130)',
    concedido: 'Poderes Concedidos (pág. 131)',
    tormenta: 'Poderes da Tormenta (pág. 135)',
  };
  const catStr = catNames[category.toLowerCase()] || 'Poderes Gerais (pág. 124-136)';
  return `Tormenta 20: Edição Jogo do Ano (v1.3), Capítulo 2: Perícias & Poderes — ${catStr}: ${name}.`;
}

/**
 * Retorna o objeto canônico RuleCitation para um Poder Geral
 */
export function getGeneralPowerRuleCitation(
  power: { id?: string; name: string; category: string; description: string; prerequisites?: string }
): RuleCitation {
  const catPages: Record<string, string> = {
    combate: 'Página 124-128',
    destino: 'Página 128-130',
    magia: 'Página 130-131',
    concedido: 'Página 131-135',
    tormenta: 'Página 135-136',
  };
  const pageStr = catPages[power.category.toLowerCase()] || 'Página 124-136';

  return {
    id: power.id || `power_${power.name.toLowerCase().replace(/\s+/g, '_')}`,
    title: power.name,
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 2: Perícias & Poderes',
    section: `Poderes Gerais — ${power.category.toUpperCase()}`,
    page: pageStr,
    quote: `“${power.name}. ${cleanT20Text(power.description)}”`,
    explanation: power.prerequisites
      ? `Para adquirir e utilizar este poder, o personagem deve cumprir: ${cleanT20Text(power.prerequisites)}.`
      : 'Este poder não exige pré-requisitos e pode ser aprendido por qualquer personagem qualificado.',
  };
}

/**
 * Retorna a citação canônica para uma Magia
 */
export function getSpellCitation(
  spellOrName: string | { name: string; circle?: number },
  circle: number = 1
): string {
  if (typeof spellOrName === 'object' && spellOrName !== null) {
    return getSpellCitation(spellOrName.name, spellOrName.circle || 1);
  }
  return `Tormenta 20: Edição Jogo do Ano (v1.3), Capítulo 4: Magia — ${spellOrName} (${circle}º Círculo), pág. 176-217.`;
}

/**
 * Retorna o objeto canônico RuleCitation para uma Magia
 */
export function getSpellRuleCitation(
  spell: {
    id?: string;
    name: string;
    circle: number;
    school: string;
    type: string;
    execution: string;
    range: string;
    duration: string;
    targetArea?: string;
    resistance?: string;
    description: string;
    upgrades?: { cost: string; description: string }[];
  }
): RuleCitation {
  return {
    id: spell.id || `spell_${spell.name.toLowerCase().replace(/\s+/g, '_')}`,
    title: spell.name,
    book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
    chapter: 'Capítulo 4: Magia',
    section: `${spell.type.toUpperCase()} — ${spell.school.toUpperCase()}`,
    page: 'Páginas 184-217',
    quote: `“${spell.name}. ${spell.type.toUpperCase()} ${spell.circle} (${spell.school}). Execução: ${spell.execution}; Alcance: ${spell.range}; Duração: ${spell.duration}.”`,
    explanation:
      spell.upgrades && spell.upgrades.length > 0
        ? `Aprimoramentos disponíveis:\n${spell.upgrades.map((u) => `• ${cleanT20Text(u.cost)}: ${cleanT20Text(u.description)}`).join('\n')}`
        : 'Esta magia não possui aprimoramentos adicionais.',
  };
}

