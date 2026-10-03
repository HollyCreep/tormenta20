/**
 * Linhagens Sobrenaturais do feiticeiro — T20 JdA v1.3, Cap. 1, pág. 39.
 *
 * "Ao escolher o caminho do feiticeiro, escolha uma linhagem da lista a seguir. Você recebe a herança
 * básica de sua linhagem e pode desenvolver as demais através de poderes de arcanista."
 * Herança Aprimorada: Feiticeiro, 6º nível de arcanista. Herança Superior: Herança Aprimorada, 11º nível
 * de arcanista (poderes de arcanista, pág. 38).
 */
export type BloodlineId = 'draconica' | 'feerica' | 'rubra';
export type BloodlineTier = 'basica' | 'aprimorada' | 'superior';
export type DraconicDamage = 'acido' | 'eletricidade' | 'fogo' | 'frio';

export interface BloodlineDefinition {
  id: BloodlineId;
  name: string;
  intro: string;
  tiers: Record<BloodlineTier, string>;
}

export const BLOODLINE_PAGE = 39;
export const HERANCA_APRIMORADA = 'Herança Aprimorada';
export const HERANCA_SUPERIOR = 'Herança Superior';

export const DRACONIC_DAMAGE: { id: DraconicDamage; label: string }[] = [
  { id: 'acido', label: 'Ácido' },
  { id: 'eletricidade', label: 'Eletricidade' },
  { id: 'fogo', label: 'Fogo' },
  { id: 'frio', label: 'Frio' },
];

export const BLOODLINES: BloodlineDefinition[] = [
  {
    id: 'draconica',
    name: 'Linhagem Dracônica',
    intro: 'Um de seus antepassados foi um majestoso dragão. Escolha um tipo de dano entre ácido, eletricidade, fogo ou frio.',
    tiers: {
      basica: 'Você soma seu Carisma em seus pontos de vida iniciais e recebe redução de dano 5 ao tipo escolhido.',
      aprimorada: 'Suas magias do tipo escolhido custam –1 PM e causam +1 ponto de dano por dado.',
      superior:
        'Você passa a somar o dobro do seu Carisma em seus pontos de vida iniciais e se torna imune a dano do tipo escolhido. Além disso, sempre que reduz um ou mais inimigos a 0 PV ou menos com uma magia do tipo escolhido, você recebe uma quantidade de PM temporários igual ao círculo da magia.',
    },
  },
  {
    id: 'feerica',
    name: 'Linhagem Feérica',
    intro: 'Seu sangue foi tocado pelas fadas.',
    tiers: {
      basica: 'Você se torna treinado em Enganação e aprende uma magia de 1º círculo de encantamento ou ilusão, arcana ou divina, a sua escolha.',
      aprimorada: 'A CD para resistir a suas magias de encantamento e ilusão aumenta em +2 e suas magias dessas escolas custam –1 PM.',
      superior:
        'Você recebe +2 em Carisma. Se uma criatura passar no teste de resistência contra uma magia de encantamento ou ilusão lançada por você, você fica alquebrado até o final da cena.',
    },
  },
  {
    id: 'rubra',
    name: 'Linhagem Rubra',
    intro: 'Seu sangue foi corrompido pela Tormenta.',
    tiers: {
      basica: 'Você recebe um poder da Tormenta. Além disso, pode perder outro atributo em vez de Carisma por poderes da Tormenta.',
      aprimorada:
        'Escolha uma magia para cada poder da Tormenta que você possui. Essas magias custam –1 PM. Sempre que recebe um novo poder da Tormenta, você pode escolher uma nova magia. Esta herança conta como um poder da Tormenta (exceto para perda de Carisma).',
      superior: 'Você recebe +4 PM para cada poder da Tormenta que tiver. Esta herança conta como um poder da Tormenta (exceto para perda de Carisma).',
    },
  },
];

export const TIER_LABEL: Record<BloodlineTier, string> = { basica: 'Básica', aprimorada: 'Aprimorada', superior: 'Superior' };
export const bloodlineDef = (id?: string) => BLOODLINES.find((b) => b.id === id);
