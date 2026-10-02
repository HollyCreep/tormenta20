/** Agrupa entradas de log por dia, rotulando "Hoje" e "Ontem". Mantém a ordem recebida. */
export function groupByDay<T extends { dateFormatted: string }>(entries: T[]): [string, T[]][] {
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
  const groups = new Map<string, T[]>();
  entries.forEach((e) => {
    const label = e.dateFormatted === today ? 'Hoje' : e.dateFormatted === yesterday ? 'Ontem' : e.dateFormatted;
    groups.set(label, [...(groups.get(label) || []), e]);
  });
  return [...groups.entries()];
}
