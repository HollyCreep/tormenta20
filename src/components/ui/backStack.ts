import { useEffect, useRef } from 'react';

/**
 * Pilha global de manipuladores do botão "Voltar" (Android/Capacitor e Esc).
 *
 * Sheets e fluxos (como o criador de personagem) registram um handler enquanto
 * estão ativos. O botão voltar nativo consome sempre o topo da pilha antes de
 * navegar entre telas — assim um modal aberto é fechado em vez de sair da tela.
 */

type BackEntry = {
  id: number;
  kind: 'overlay' | 'flow';
  handler: () => void;
};

let seq = 0;
const stack: BackEntry[] = [];

export function pushBackHandler(handler: () => void, kind: BackEntry['kind'] = 'overlay'): () => void {
  const entry: BackEntry = { id: ++seq, kind, handler };
  stack.push(entry);
  return () => {
    const idx = stack.findIndex((e) => e.id === entry.id);
    if (idx >= 0) stack.splice(idx, 1);
  };
}

/** Executa o handler do topo da pilha. Retorna true se algo consumiu o "voltar". */
export function handleBack(): boolean {
  const top = stack[stack.length - 1];
  if (!top) return false;
  top.handler();
  return true;
}

/** Retorna true se o id informado é o overlay mais recente (topo). */
export function isTopOverlay(id: number): boolean {
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i].kind === 'overlay') return stack[i].id === id;
  }
  return false;
}

export function hasOpenOverlay(): boolean {
  return stack.some((e) => e.kind === 'overlay');
}

/**
 * Registra um handler de "voltar" enquanto `active` for verdadeiro.
 * O handler mais recente sempre é usado (ref), sem re-registrar a cada render.
 */
export function useBackHandler(active: boolean, handler: () => void, kind: BackEntry['kind'] = 'overlay') {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!active) return;
    return pushBackHandler(() => handlerRef.current(), kind);
  }, [active, kind]);
}

/** Variante que expõe o id da entrada (usada pelo Sheet para tratar Esc só no topo). */
export function useBackEntry(active: boolean, handler: () => void): { current: number } {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const entry: BackEntry = { id: ++seq, kind: 'overlay', handler: () => handlerRef.current() };
    idRef.current = entry.id;
    stack.push(entry);
    return () => {
      const idx = stack.findIndex((e) => e.id === entry.id);
      if (idx >= 0) stack.splice(idx, 1);
    };
  }, [active]);

  return idRef;
}
