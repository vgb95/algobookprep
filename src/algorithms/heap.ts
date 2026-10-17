/**
 * Montículo binario máximo (max-heap) — generador de frames para insertar
 * y extraer el máximo. El montículo se representa como un array: el padre
 * de i es ⌊(i-1)/2⌋ y sus hijos 2i+1 y 2i+2. Snippets canónicos y
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

export interface HeapFrame {
  message: string;
  heap: number[];
  compare?: [number, number];
  swap?: [number, number];
  current?: number;
  settled: number[];
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
}

function* siftUp(heap: number[], idx: number): Generator<HeapFrame, void, undefined> {
  let i = idx;
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    yield frame(`¿${heap[i]} (i=${i}) > padre ${heap[p]} (i=${p})?`, {
      compare: [p, i],
      current: i,
      line: 8,
      vars: { i, p, heaped: `[${heap.join(", ")}]` },
    });
    if (heap[i] > heap[p]) {
      [heap[i], heap[p]] = [heap[p], heap[i]];
      yield frame(`Sí: intercambiamos — ${heap[p]} burbujea hacia la raíz.`, {
        swap: [p, i],
        current: p,
        line: 9,
        hold: 1.3,
        vars: { i: p, p, heaped: `[${heap.join(", ")}]` },
      });
      i = p;
    } else {
      yield frame(`No: ${heap[i]} está en su sitio.`, {
        current: i,
        line: 12,
        hold: 1.5,
        vars: { i, p, heaped: `[${heap.join(", ")}]` },
      });
      break;
    }
  }
}

function* siftDown(heap: number[], idx: number): Generator<HeapFrame, void, undefined> {
  let i = idx;
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  while (true) {
    let best = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < heap.length) {
      yield frame(`¿hijo izq ${heap[l]} (i=${l}) > actual ${heap[best]} (i=${best})?`, {
        compare: [best, l],
        current: i,
        line: 11,
        vars: { i, l, heaped: `[${heap.join(", ")}]` },
      });
      if (heap[l] > heap[best]) best = l;
    }
    if (r < heap.length) {
      yield frame(`¿hijo der ${heap[r]} (i=${r}) > actual ${heap[best]} (i=${best})?`, {
        compare: [best, r],
        current: i,
        line: 13,
        vars: { i, l, r, heaped: `[${heap.join(", ")}]` },
      });
      if (heap[r] > heap[best]) best = r;
    }
    if (best !== i) {
      [heap[i], heap[best]] = [heap[best], heap[i]];
      yield frame(`Intercambiamos y bajamos: el ${heap[i]} asciende.`, {
        swap: [i, best],
        current: best,
        line: 17,
        hold: 1.3,
        vars: { i: best, heaped: `[${heap.join(", ")}]` },
      });
      i = best;
    } else {
      yield frame(`${heap[i]} está en su sitio como padre máximo.`, {
        current: i,
        line: 15,
        hold: 1.5,
        vars: { i, heaped: `[${heap.join(", ")}]` },
      });
      break;
    }
  }
}

export function* insertIntoHeap(input: number[], value: number): Generator<HeapFrame, void, undefined> {
  const heap = input.slice();
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  yield frame(`Insertamos ${value} al final del montículo y hacemos sift-up.`, {
    current: heap.length,
    line: 2,
    hold: 1.2,
    vars: { value, heaped: `[${heap.join(", ")}] + ${value}` },
  });
  heap.push(value);
  yield* siftUp(heap, heap.length - 1);
  yield frame(`Montículo tras insertar ${value}: [${heap.join(", ")}].`, {
    line: 3,
    hold: 1.5,
    vars: { heaped: `[${heap.join(", ")}]` },
  });
}

export function* extractMaxFromHeap(input: number[]): Generator<HeapFrame, void, undefined> {
  const heap = input.slice();
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  if (heap.length === 0) {
    yield frame("Montículo vacío: nada que extraer.", { line: 2, hold: 1.5, vars: { heaped: "[]" } });
    return;
  }
  const max = heap[0];
  yield frame(`Extraemos el máximo ${max} (raíz). El último elemento lo movemos a la raíz y hacemos sift-down.`, {
    current: 0,
    line: 3,
    hold: 1.4,
    vars: { max, heaped: `[${heap.join(", ")}]` },
  });
  heap[0] = heap.pop()!;
  yield* siftDown(heap, 0);
  yield frame(`Máximo extraído: ${max}. Montículo resultante: [${heap.join(", ")}].`, {
    line: 5,
    hold: 1.6,
    vars: { max, heaped: `[${heap.join(", ")}]` },
  });
}

export type HeapOp = "insert" | "extract-max";

export const heapOps: Record<
  HeapOp,
  { name: string; code: string; run: (a: number[], v?: number) => Generator<HeapFrame, void, undefined> }
> = {
  insert: { name: "Insertar valor", code: HEAP_INSERT_CODE, run: (a, v) => insertIntoHeap(a, v ?? 0) },
  "extract-max": { name: "Extraer máximo", code: HEAP_EXTRACT_CODE, run: (a) => extractMaxFromHeap(a) },
};
