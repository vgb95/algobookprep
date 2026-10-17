/**
 * Montículo binario máximo (max-heap) — generador de frames para insertar
 * y extraer el máximo. El montículo se representa como un array (padre de
 * i: ⌊(i-1)/2⌋; hijos: 2i+1 y 2i+2) y las tarjetas llevan IDENTIDAD: al
 * intercambiar padre↔hijo, las tarjetas vuelan entre niveles interpolando
 * su posición — verá el sift-up escalar nodo a nodo. Snippets canónicos y
 * line/hold/vars alimentan el code playback (Fase 2).
 */

export const HEAP_INSERT_CODE = `def insert(heap, value):
    heap.append(value)          # lo colgamos abajo a la izquierda
    sift_up(heap, len(heap) - 1)

def sift_up(heap, i):
    while i > 0:
        p = (i - 1) // 2        # el padre está en (i-1)//2
        if heap[i] > heap[p]:
            heap[i], heap[p] = heap[p], heap[i]
            i = p
        else:
            break`;

export const HEAP_EXTRACT_CODE = `def extract_max(heap):
    max = heap[0]                # la raíz es el máximo
    heap[0] = heap.pop()         # el último sube a la raíz
    sift_down(heap, 0)
    return max

def sift_down(heap, i):
    while True:
        l, r = 2*i + 1, 2*i + 2
        best = i
        if l < len(heap) and heap[l] > heap[best]:
            best = l
        if r < len(heap) and heap[r] > heap[best]:
            best = r
        if best == i:
            break
        heap[i], heap[best] = heap[best], heap[i]
        i = best`;

export interface HeapCard {
  /** Identidad estable de la tarjeta (interpola su vuelo en el árbol). */
  id: number;
  value: number;
  /** Casilla del array-montículo (0 = raíz). */
  slot: number;
}

export interface HeapFrame {
  message: string;
  cards: HeapCard[];
  /** Comparación entre CASILLAS (glow ámbar en la arista). */
  compare?: [number, number];
  /** Par en intercambio (glow rojo + las tarjetas vuelan). */
  swap?: [number, number];
  /** Casilla protagonista. */
  current?: number;
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
}

type HeapGen = Generator<HeapFrame, void, undefined>;

const cardsOf = (arr: number[]): HeapCard[] => arr.map((v, i) => ({ id: i, value: v, slot: i }));

function* siftUp(cards: HeapCard[], idx: number): Generator<HeapFrame, void, undefined> {
  let i = idx;
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    cards: cards.map((c) => ({ ...c })),
    ...extra,
  });
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    const pc = cards.find((c) => c.slot === p)!;
    const ic = cards.find((c) => c.slot === i)!;
    yield frame(`¿${ic.value} (casilla ${i}) > padre ${pc.value} (casilla ${p})?`, {
      compare: [p, i],
      current: i,
      line: 8,
      vars: { i, p, monticulo: heapStr(cards) },
    });
    if (ic.value > pc.value) {
      pc.slot = i;
      ic.slot = p;
      const pcNow = cards.find((c) => c.slot === p)!;
      yield frame(`Sí: intercambio — ${pcNow.value} burbujea hacia la raíz.`, {
        swap: [p, i],
        current: p,
        line: 9,
        hold: 1.3,
        vars: { i: p, p, monticulo: heapStr(cards) },
      });
      i = p;
    } else {
      yield frame(`No: ${ic.value} está en su sitio.`, {
        current: i,
        line: 12,
        hold: 1.5,
        vars: { i, p, monticulo: heapStr(cards) },
      });
      break;
    }
  }
}

function* siftDown(cards: HeapCard[], idx: number): Generator<HeapFrame, void, undefined> {
  let i = idx;
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    cards: cards.map((c) => ({ ...c })),
    ...extra,
  });
  while (true) {
    let best = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    const at = (s: number) => cards.find((c) => c.slot === s)!;
    if (l < cards.length) {
      yield frame(`¿hijo izq ${at(l).value} (casilla ${l}) > actual ${at(best).value} (casilla ${best})?`, {
        compare: [best, l],
        current: i,
        line: 11,
        vars: { i, l, monticulo: heapStr(cards) },
      });
      if (at(l).value > at(best).value) best = l;
    }
    if (r < cards.length) {
      yield frame(`¿hijo der ${at(r).value} (casilla ${r}) > actual ${at(best).value} (casilla ${best})?`, {
        compare: [best, r],
        current: i,
        line: 13,
        vars: { i, l, r, monticulo: heapStr(cards) },
      });
      if (at(r).value > at(best).value) best = r;
    }
    if (best !== i) {
      const goingDown = at(i);
      const goingUp = at(best);
      goingDown.slot = best;
      goingUp.slot = i;
      yield frame(`Intercambio — ${goingUp.value} asciende y ${goingDown.value} baja un nivel.`, {
        swap: [i, best],
        current: best,
        line: 17,
        hold: 1.3,
        vars: { i: best, monticulo: heapStr(cards) },
      });
      i = best;
    } else {
      yield frame(`${at(i).value} está en su sitio como padre máximo.`, {
        current: i,
        line: 15,
        hold: 1.5,
        vars: { i, monticulo: heapStr(cards) },
      });
      break;
    }
  }
}

export function* insertIntoHeap(input: number[], value: number): HeapGen {
  const cards = cardsOf(input);
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    cards: cards.map((c) => ({ ...c })),
    ...extra,
  });
  yield frame(`Insertamos ${value} al final del montículo y hacemos sift-up.`, {
    current: cards.length,
    line: 2,
    hold: 1.2,
    vars: { value, monticulo: heapStr(cards) },
  });
  const fresh: HeapCard = { id: 1000 + cards.length, value, slot: cards.length };
  cards.push(fresh);
  yield* siftUp(cards, cards.length - 1);
  yield frame(`Montículo tras insertar ${value}: ${heapStr(cards)}.`, {
    line: 3,
    hold: 1.5,
    vars: { monticulo: heapStr(cards) },
  });
}

export function* extractMaxFromHeap(input: number[]): HeapGen {
  const cards = cardsOf(input);
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    cards: cards.map((c) => ({ ...c })),
    ...extra,
  });
  if (cards.length === 0) {
    yield frame("Montículo vacío: nada que extraer.", { line: 2, hold: 1.5, vars: { monticulo: "[]" } });
    return;
  }
  const maxCard = cards.find((c) => c.slot === 0)!;
  yield frame(`Extraemos el máximo ${maxCard.value} (raíz). El último elemento sube a la raíz y hundimos sift-down.`, {
    current: 0,
    line: 3,
    hold: 1.4,
    vars: { max: maxCard.value, monticulo: heapStr(cards) },
  });
  const last = cards.find((c) => c.slot === cards.length - 1)!;
  cards.splice(cards.indexOf(maxCard), 1);
  last.slot = 0;
  yield frame(`El ${last.value} de la última casilla sube a la raíz; el montículo ahora mide ${cards.length}.`, {
    current: 0,
    line: 3,
    hold: 1.1,
    vars: { monticulo: heapStr(cards) },
  });
  yield* siftDown(cards, 0);
  yield frame(`Máximo extraído: ${maxCard.value}. Montículo resultante: ${heapStr(cards)}.`, {
    line: 5,
    hold: 1.6,
    vars: { max: maxCard.value, monticulo: heapStr(cards) },
  });
}

function heapStr(cards: HeapCard[]): string {
  const bySlot = cards.slice().sort((a, b) => a.slot - b.slot).map((c) => c.value);
  return `[${bySlot.join(", ")}]`;
}

export type HeapOp = "insert" | "extract-max";

export const heapOps: Record<
  HeapOp,
  { name: string; code: string; run: (a: number[], v?: number) => HeapGen }
> = {
  insert: { name: "Insertar valor", code: HEAP_INSERT_CODE, run: (a, v) => insertIntoHeap(a, v ?? 0) },
  "extract-max": { name: "Extraer máximo", code: HEAP_EXTRACT_CODE, run: (a) => extractMaxFromHeap(a) },
};
