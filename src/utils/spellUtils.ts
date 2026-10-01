import { Spell } from '../types/rules';

export interface SpellDamageData {
  dice: string;
  type?: string;
  badgeText: string;
}

/**
 * Extrai a fórmula canônica e o tipo de dano de uma magia de Tormenta 20.
 * Suporta detecção de dados (ex: "2d8+2", "6d6", "10d12") e tipos de dano oficiais
 * (eletricidade, fogo, frio, ácido, trevas, luz, essência, psíquico, impacto, corte, perfuração, veneno, trovão).
 */
export function extractSpellDamage(description: string): SpellDamageData | null {
  if (!description) return null;

  // Normaliza o texto removendo hífens de quebra de linha tipo "ex-plosão"
  const clean = description.replace(/(\w+)-\s+(\w+)/g, '$1$2');

  const match =
    clean.match(/(\d+d\d+(?:\s*[+-]\s*\d+)?)\s*(?:pontos\s+de\s+dano|de\s+dano|dano)(?:\s+de\s+([a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+(?:\s*(?:ou|\/|,)\s*[a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+)*))?/i) ||
    clean.match(/causa(?:ndo|m)?\s+(\d+d\d+(?:\s*[+-]\s*\d+)?)(?:\s+pontos)?(?:\s+de\s+dano)?(?:\s+de\s+([a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+))?/i) ||
    clean.match(/sofre(?:m)?\s+(\d+d\d+(?:\s*[+-]\s*\d+)?)(?:\s+pontos)?(?:\s+de\s+dano)?(?:\s+de\s+([a-zA-ZáéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+))?/i);

  if (!match) return null;

  const dice = match[1].replace(/\s+/g, '');
  let rawType: string | undefined = match[2]?.trim();

  // Desconsidera preposições e artigos capturados erroneamente
  if (rawType) {
    const invalidTypes = ['seu', 'sua', 'do', 'da', 'uma', 'um', 'a', 'o', 'em', 'para', 'com', 'no'];
    if (invalidTypes.includes(rawType.toLowerCase())) {
      rawType = undefined;
    }
  }

  // Se não identificou tipo explícito no trecho do match, procura os tipos de dano canônicos de T20
  if (!rawType) {
    const knownTypes = [
      'eletricidade',
      'fogo',
      'frio',
      'ácido',
      'trevas',
      'luz',
      'essência',
      'psíquico',
      'impacto',
      'corte',
      'perfuração',
      'veneno',
      'trovão',
    ];
    const lower = clean.toLowerCase();
    for (const kt of knownTypes) {
      if (lower.includes(`dano de ${kt}`) || lower.includes(`dano ${kt}`) || lower.includes(`${kt}, impacto`)) {
        rawType = kt;
        break;
      }
    }
  }

  const formattedType = rawType ? rawType.charAt(0).toUpperCase() + rawType.slice(1) : undefined;

  return {
    dice,
    type: formattedType,
    badgeText: formattedType ? `${dice} ${formattedType}` : dice,
  };
}
