import React from 'react';
import { EquipmentItem } from '../types/rules';
import { DetailModalData, DetailStat } from '../components/common/DetailModal';
import {
  Coins,
  Weight,
  Shield,
  ArrowDown,
  Sparkles,
  Sword,
  Swords,
  Gavel,
  BowArrow,
  Target,
  Crosshair,
  Hand,
  Anvil,
  Wrench,
  Compass,
  Flame,
  Zap,
} from 'lucide-react';

export const getEquipmentDamageTypeIcon = (damageType?: string, size = 14): React.ReactNode => {
  if (!damageType) return React.createElement(Sparkles, { size });
  const dt = damageType.toLowerCase();
  if (dt.includes('perfuração') && dt.includes('corte')) return React.createElement(Swords, { size });
  if (dt.includes('perfuração') || dt.includes('perfuracao')) return React.createElement(BowArrow, { size });
  if (dt.includes('corte')) return React.createElement(Sword, { size });
  if (dt.includes('impacto')) return React.createElement(Gavel, { size });
  if (dt.includes('fogo')) return React.createElement(Flame, { size });
  if (dt.includes('eletricidade')) return React.createElement(Zap, { size });
  return React.createElement(Sparkles, { size });
};

export const getDamageTypeExplanation = (type?: string): string => {
  if (!type) return 'Tipo de dano padrão.';
  switch (type.toLowerCase()) {
    case 'corte':
      return 'Dano cortante causado por lâminas afiadas e arestas cortantes.';
    case 'perfuração':
    case 'perfuracao':
      return 'Dano perfurante causado por pontas agudas e estocadas penetrantes.';
    case 'impacto':
      return 'Dano contundente causado por concussão, maças, martelos ou esmagamento.';
    case 'corte ou perfuração':
    case 'corte ou perfuracao':
      return 'Dano versátil: o atacante escolhe livremente se causa corte ou perfuração a cada ataque.';
    case 'fogo':
      return 'Dano ígneo causado por chamas ardentes ou calor extremo.';
    case 'frio':
      return 'Dano gélido causado por congelamento ou baixas temperaturas.';
    case 'eletricidade':
      return 'Dano elétrico transmitido por descargas, arcos voltaicos ou raios.';
    case 'ácido':
    case 'acido':
      return 'Dano corrosivo causado por compostos químicos ou venenos cáusticos.';
    case 'essência':
    case 'essencia':
      return 'Dano mágico puro de força cósmica ou arcana; não é reduzido por resistência comum.';
    default:
      return `Dano especializado do tipo ${type}.`;
  }
};

export const getCriticalExplanation = (critical?: string): string => {
  if (!critical) return 'Acerto crítico com rolagem 20 natural no d20 (multiplicador x2).';
  if (critical.includes('/')) {
    const [threat, mult] = critical.split('/');
    return `Margem de ameaça a partir de ${threat} no d20; multiplica o dano total por ${mult.replace('x', '')} vezes.`;
  }
  if (critical.startsWith('x')) {
    return `Margem de ameaça 20 no d20; ao confirmar, multiplica o dano total por ${critical.replace('x', '')} vezes.`;
  }
  return `Margem de ameaça a partir de ${critical} no d20 (multiplicador padrão de x2 no dano).`;
};

export const getRangeExplanation = (range?: string): string => {
  if (!range) return 'Arma de ataque corpo a corpo contra alvos adjacentes (alcance de 1,5 metros).';
  switch (range.toLowerCase()) {
    case 'curto':
      return 'Alcance Curto: atinge alvos a até 9 metros (6 quadrados no mapa tático).';
    case 'médio':
    case 'medio':
      return 'Alcance Médio: atinge alvos a até 30 metros (20 quadrados no mapa tático).';
    case 'longo':
      return 'Alcance Longo: atinge alvos a até 90 metros (60 quadrados no mapa tático).';
    default:
      return `Alcance da arma: ${range}.`;
  }
};

export const getCategoryFullLabel = (category: string, subcategory?: string): string => {
  const subMap: Record<string, string> = {
    leves: 'Leve',
    uma_mao: 'de Uma Mão',
    duas_maos: 'de Duas Mãos',
    disparo: 'de Disparo',
    arremesso: 'de Arremesso',
  };

  const subText = subcategory && subMap[subcategory] ? ` ${subMap[subcategory]}` : '';

  switch (category) {
    case 'arma_simples':
      return `Arma Simples${subText}`;
    case 'arma_marcial':
      return `Arma Marcial${subText}`;
    case 'arma_exotica':
      return `Arma Exótica${subText}`;
    case 'arma_fogo':
      return `Arma de Fogo${subText}`;
    case 'armadura_leve':
      return 'Armadura Leve';
    case 'armadura_pesada':
      return 'Armadura Pesada';
    case 'escudo':
      return 'Escudo';
    case 'item_geral':
      return 'Item Geral de Aventura';
    case 'alquimia':
      return 'Item Alquímico / Preparado';
    case 'ferramenta':
      return 'Ferramenta / Instrumento de Ofício';
    case 'vestuario':
      return 'Vestuário / Traje Especial';
    case 'esoterico':
      return 'Item Esotérico (Foco de Magia)';
    case 'alimentacao':
      return 'Alimentação & Ração de Viagem';
    case 'animal':
      return 'Animal & Montaria';
    case 'veiculo':
      return 'Veículo de Transporte';
    case 'servico':
      return 'Serviço Contratado';
    default:
      return category.replace('_', ' ').toUpperCase();
  }
};

export const getSubcategoryExplanation = (subcategory?: string): string => {
  switch (subcategory) {
    case 'leves':
      return 'Arma leve: empunhada com uma mão e permite usar Acuidade com Arma para atacar com Destreza.';
    case 'uma_mao':
      return 'Arma de uma mão: empunhada com uma das mãos. Se usada com as duas mãos, soma +2 no dano.';
    case 'duas_maos':
      return 'Arma de duas mãos: exige as duas mãos livres para empunhar; soma 1,5x o bônus de Força no dano.';
    case 'disparo':
      return 'Arma de disparo: utiliza projéteis ou flechas para disparar contra alvos à distância.';
    case 'arremesso':
      return 'Arma de arremesso: pode ser lançada com as mãos usando a perícia Pontaria.';
    default:
      return 'Equipamento padrão do sistema Tormenta 20.';
  }
};

export const getEquipmentDetailModalData = (
  item: EquipmentItem,
  sourceBadge?: string,
  appliedModifiers?: string[],
  specialMaterial?: string
): DetailModalData => {
  const isWeapon = item.category.startsWith('arma');
  const isArmorOrShield = item.category.startsWith('armadura') || item.category === 'escudo';
  const categoryLabel = getCategoryFullLabel(item.category, item.subcategory);

  const stats: DetailStat[] = [
    {
      label: 'Preço de Mercado',
      value: item.price || 'T$ 0',
      subtext: 'Valor de aquisição em Tibares de Arton (T$)',
      color: '#fbbf24',
      icon: React.createElement(Coins, { size: 15 }),
    },
    {
      label: 'Espaço no Inventário',
      value: `${item.spaces || 1} ${item.spaces === 1 ? 'espaço' : 'espaços'}`,
      subtext: 'Capacidade de carga ocupada no inventário do aventureiro',
      color: '#cbd5e1',
      icon: React.createElement(Weight, { size: 15 }),
    },
  ];

  if (isArmorOrShield) {
    stats.push(
      {
        label: 'Bônus na Defesa',
        value: item.defenseBonus !== undefined ? (item.defenseBonus > 0 ? `+${item.defenseBonus}` : `${item.defenseBonus}`) : '+0',
        subtext: 'Bônus numérico somado à Defesa total do personagem quando equipado',
        color: '#34d399',
        icon: React.createElement(Shield, { size: 15 }),
      },
      {
        label: 'Penalidade de Armadura',
        value: `${item.armorPenalty !== undefined ? item.armorPenalty : 0}`,
        subtext:
          item.armorPenalty && item.armorPenalty < 0
            ? 'Penalidade aplicada em testes de perícias baseadas em Força e Destreza (Acrobacia, Cavalgar, Furtividade, Ladinagem)'
            : 'Esta proteção não impõe qualquer penalidade em testes de perícias físicas',
        color: item.armorPenalty && item.armorPenalty < 0 ? '#f87171' : '#34d399',
        icon: React.createElement(ArrowDown, { size: 15 }),
      },
      {
        label: 'Tipo de Proteção',
        value: item.category === 'armadura_leve' ? 'Armadura Leve' : item.category === 'armadura_pesada' ? 'Armadura Pesada' : 'Escudo',
        subtext:
          item.category === 'armadura_leve'
            ? 'Permite somar todo o seu bônus de Destreza na Defesa do personagem'
            : item.category === 'armadura_pesada'
            ? 'Não permite somar bônus de Destreza na Defesa e reduz o deslocamento em -3 metros'
            : 'Empunhado em uma das mãos; fornece bônus de Defesa cumulativo com armaduras',
        color: '#60a5fa',
        icon: React.createElement(Shield, { size: 15 }),
      }
    );
  }

  if (isWeapon) {
    if (item.attackBonus) {
      stats.push({
        label: 'Bônus de Ataque',
        value: `+${item.attackBonus}`,
        subtext: 'Bônus adicional somado a todas as rolagens no teste de ataque',
        color: '#38bdf8',
        icon: React.createElement(Sparkles, { size: 15 }),
      });
    }

    stats.push(
      {
        label: 'Dano Base',
        value: item.damage || '1d4',
        subtext: 'Rolagem de dano básica aplicada aos pontos de vida do adversário',
        color: '#ff6b7b',
        icon: React.createElement(Sparkles, { size: 15 }),
      },
      {
        label: 'Tipo de Dano',
        value: item.damageType || 'Padrão',
        subtext: getDamageTypeExplanation(item.damageType),
        color: '#ff6b7b',
        icon: getEquipmentDamageTypeIcon(item.damageType, 15),
      },
      {
        label: 'Margem & Crítico',
        value: item.critical || 'x2',
        subtext: getCriticalExplanation(item.critical),
        color: '#fbbf24',
        icon: React.createElement(Target, { size: 15 }),
      },
      {
        label: 'Alcance do Ataque',
        value: item.range || 'Corpo a Corpo',
        subtext: getRangeExplanation(item.range),
        color: '#c4b5fd',
        icon: React.createElement(Crosshair, { size: 15 }),
      }
    );

    if (item.subcategory) {
      stats.push({
        label: 'Empunhadura & Uso',
        value: item.subcategory === 'uma_mao' ? 'Uma Mão' : item.subcategory === 'duas_maos' ? 'Duas Mãos' : item.subcategory === 'leves' ? 'Arma Leve' : item.subcategory === 'disparo' ? 'Disparo' : item.subcategory,
        subtext: getSubcategoryExplanation(item.subcategory),
        color: '#94a3b8',
        icon: React.createElement(Hand, { size: 15 }),
      });
    }
  }

  if (specialMaterial) {
    stats.push({
      label: 'Material Especial',
      value: specialMaterial,
      subtext: 'Material especial nobre de forja que aprimora as estatísticas da peça',
      color: '#e63946',
      icon: React.createElement(Anvil, { size: 15 }),
    });
  }

  if (appliedModifiers && appliedModifiers.length > 0) {
    stats.push({
      label: 'Melhorias Aplicadas',
      value: `${appliedModifiers.length} melhoria${appliedModifiers.length > 1 ? 's' : ''}`,
      subtext: appliedModifiers.join(' • '),
      color: '#60a5fa',
      icon: React.createElement(Wrench, { size: 15 }),
    });
  }

  if (sourceBadge) {
    stats.push({
      label: 'Origem do Item',
      value: sourceBadge,
      subtext: 'Item obtido através de benefício inicial ou histórico de personagem',
      color: '#fbbf24',
      icon: React.createElement(Compass, { size: 15 }),
    });
  }

  return {
    title: item.name,
    category: categoryLabel,
    subtitle: `Preço: ${item.price} • Espaços: ${item.spaces || 1} ${item.spaces === 1 ? 'espaço' : 'espaços'}`,
    description: item.description || 'Equipamento oficial do sistema Tormenta 20: Edição Jogo do Ano (v1.3).',
    stats,
    ruleCitation: {
      id: item.id,
      title: item.name,
      book: 'Tormenta 20: Edição Jogo do Ano (v1.3)',
      chapter: 'Capítulo 3: Equipamento',
      section: categoryLabel,
      page: 'Páginas 140 a 178',
      quote: `“${item.name}. Preço: ${item.price}; Espaços: ${item.spaces || 1}.${item.description ? ` ${item.description}` : ''}”`,
      explanation:
        'Itens de equipamento são regidos pelas regras oficiais do Tormenta 20 Jogo do Ano. Suas estatísticas, bônus e penalidades integram-se de forma direta aos testes e rolagens da ficha.',
    },
  };
};
