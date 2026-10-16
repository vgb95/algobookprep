/**
 * Montículo binario máximo (max-heap) — generador de frames para insertar
 * y extraer el máximo. El montículo se representa como un array.
 */

export interface HeapFrame {
  message: string;
  heap: number[];
  compare?: [number, number];
  swap?: [number, number];
  current?: number;
  settled: number[];
}

function* siftUp(heap: number[], idx: number): Generator<HeapFrame> {
  let i = idx;
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    yield frame(`¿${heap[i]} (i=${i}) > padre ${heap[p]} (i=${p})?`, { compare: [p, i], current: i });
    if (heap[i] > heap[p]) {
      [heap[i], heap[p]] = [heap[p], heap[i]];
      yield frame(`Sí: intercambiamos ${heap[p]} ↔ ${heap[i]}.`, { swap: [p, i], current: p });
      i = p;
    } else {
      yield frame(`No: ${heap[i]} está en su sitio.`, { current: i });
      break;
    }
  }
}

function* siftDown(heap: number[], idx: number): Generator<HeapFrame> {
  let i = idx;
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  while (true) {
    let max = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < heap.length) {
      yield frame(`¿${heap[l]} (i=${l}) > ${heap[max]} (i=${max})?`, { compare: [max, l], current: i });
      if (heap[l] > heap[max]) max = l;
    }
    if (r < heap.length) {
      yield frame(`¿${heap[r]} (i=${r}) > ${heap[max]} (i=${max})?`, { compare: [max, r], current: i });
      if (heap[r] > heap[max]) max = r;
    }
    if (max !== i) {
      [heap[i], heap[max]] = [heap[max], heap[i]];
      yield frame(`Intercambiamos ${heap[max]} ↔ ${heap[i]} y bajamos.`, { swap: [i, max], current: max });
      i = max;
    } else {
      yield frame(`${heap[i]} está en su sitio como padre máximo.`, { current: i });
      break;
    }
  }
}

export function* insertIntoHeap(input: number[], value: number): Generator<HeapFrame> {
  const heap = input.slice();
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  yield frame(`Insertamos ${value} al final del montículo y hacemos sift-up.`, { current: heap.length });
  heap.push(value);
  yield* siftUp(heap, heap.length - 1);
  yield frame(`Montículo tras insertar ${value}: [${heap.join(", ")}].`, { settled: [] });
}

export function* extractMaxFromHeap(input: number[]): Generator<HeapFrame> {
  const heap = input.slice();
  const frame = (message: string, extra: Partial<HeapFrame> = {}): HeapFrame => ({
    message,
    heap: heap.slice(),
    settled: [],
    ...extra,
  });
  if (heap.length === 0) {
    yield frame("Montículo vacío: nada que extraer.");
    return;
  }
  const max = heap[0];
  yield frame(`Extraemos el máximo ${max} (raíz). Movemos el último elemento a la raíz y hacemos sift-down.`, { current: 0 });
  heap[0] = heap.pop()!;
  yield* siftDown(heap, 0);
  yield frame(`Máximo extraído: ${max}. Montículo resultante: [${heap.join(", ")}].`, { settled: [] });
}

export type HeapOp = "insert" | "extract-max";

export const heapOps: Record<HeapOp, { name: string; run: (a: number[], v?: number) => Generator<HeapFrame> }> = {
  insert: { name: "Insertar valor", run: (a, v) => insertIntoHeap(a, v ?? 0) },
  "extract-max": { name: "Extraer máximo", run: (a) => extractMaxFromHeap(a) },
};
