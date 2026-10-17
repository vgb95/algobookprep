import type { FrameGenerator } from "../engine/timeline";

/**
 * Algoritmos de ordenación sobre memoria contigua.
 *
 * Cada celda lleva una identidad estable (id) y su slot actual: al
 * intercambiar, las dos tarjetas SE DESLIZAN cruzándose (una sube, la
 * otra baja) en lugar de fundirse en su sitio. En insertion sort la
 * clave se levanta de la barra (hueco punteado) y flota buscando su
 * sitio hasta que cae — el mismo modelo de tarjetas de ArrayCells.
 *
 * line/hold/vars alimentan el code playback (Fase 2).
 */

/* ————— Código Python canónico ————— */

export const BUBBLE_CODE = `def bubble_sort(a):
    for n in range(len(a), 1, -1):
        swapped = False
        for i in range(n - 1):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
        if not swapped:
            break
    return a`;

export const INSERTION_CODE = `def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`;

export const SELECTION_CODE = `def selection_sort(a):
    for i in range(len(a) - 1):
        min = i
        for j in range(i + 1, len(a)):
            if a[j] < a[min]:
                min = j
        a[i], a[min] = a[min], a[i]
    return a`;

/* ————— Frames ————— */

export interface SortCell {
  /** Identidad estable del elemento (permite interpolar su deslizamiento). */
  id: number;
  value: number;
  /** Posición actual (slot) en la fila. */
  slot: number;
}

export type SortStatus = "compare" | "move" | "key";

export interface SortFrame {
  message: string;
  cells: SortCell[];
  status?: Record<string, SortStatus>;
  /** Slots ya confirmados (zona ordenada contigua: sufijo en bubble, prefijo aquí). */
  settled: number[];
  comparisons: number;
  writes: number;
  /** Slot vacío (la clave levantada flota encima). */
  hole?: number;
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
}

type SortGen = FrameGenerator<SortFrame>;

const seq = (n: number) => Array.from({ length: n }, (_, i) => i);

export type SortId = "bubble" | "insertion" | "selection";

export const sorters: Record<
  SortId,
  { name: string; code: string; run: (a: number[]) => SortGen }
> = {
  bubble: { name: "Bubble Sort", code: BUBBLE_CODE, run: bubbleSort },
  insertion: { name: "Insertion Sort", code: INSERTION_CODE, run: insertionSort },
  selection: { name: "Selection Sort", code: SELECTION_CODE, run: selectionSort },
};

const st = (cells: SortCell[], kind: SortStatus): Record<string, SortStatus> =>
  Object.fromEntries(cells.map((c) => [String(c.id), kind]));

const at = (cells: SortCell[], slot: number): SortCell =>
  cells.find((c) => c.slot === slot)!;

/* ————— Bubble sort ————— */

export function* bubbleSort(input: number[]): SortGen {
  const cells: SortCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));
  const a = input.slice();
  const settled: number[] = [];
  let comparisons = 0;
  let writes = 0;

  const frame = (message: string, extra: Partial<SortFrame> = {}): SortFrame => ({
    message,
    cells: cells.map((c) => ({ ...c })),
    settled: [...settled],
    comparisons,
    writes,
    ...extra,
  });

  yield frame(`Entrada: [${a.join(", ")}]. Empezamos a burbujear.`, {
    line: 1,
    hold: 1.2,
    vars: { comparaciones: 0, escrituras: 0 },
  });
  if (a.length <= 1) {
    yield frame(
      a.length === 1 ? "Solo hay un elemento: ya está ordenado." : "Array vacío: nada que ordenar.",
      { line: 10, hold: 2, vars: { n: a.length } },
    );
    return;
  }

  for (let n = a.length; n > 1; n--) {
    let swapped = false;
    yield frame(`Pasada: burbujeamos hasta a[${n - 1}] — la cola ya está fijada.`, {
      line: 3,
      hold: 1.1,
      vars: { n, swapped: "False", comparaciones: comparisons, escrituras: writes },
    });
    for (let i = 0; i < n - 1; i++) {
      comparisons++;
      const c1 = at(cells, i);
      const c2 = at(cells, i + 1);
      yield frame(`¿a[${i}] = ${a[i]} > a[${i + 1}] = ${a[i + 1]}?`, {
        line: 5,
        status: st([c1, c2], "compare"),
        vars: { i, comparaciones: comparisons, escrituras: writes },
      });
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        writes += 2;
        swapped = true;
        c1.slot = i + 1;
        c2.slot = i;
        yield frame(`Sí: intercambio — el ${a[i + 1]} sigue viaje hacia el final.`, {
          line: 6,
          hold: 1.15,
          status: st([c1, c2], "move"),
          vars: { i, comparaciones: comparisons, escrituras: writes },
        });
      }
    }
    settled.push(n - 1);
    yield frame(`a[${n - 1}] = ${a[n - 1]} queda fijado en su posición final.`, {
      line: 4,
      hold: 1.4,
      vars: { n, comparaciones: comparisons, escrituras: writes },
    });
    if (!swapped) {
      settled.push(...seq(n - 1));
      yield frame("Pasada sin intercambios: break — el array ya está ordenado.", {
        line: 9,
        hold: 2,
        vars: { comparaciones: comparisons, escrituras: writes },
      });
      return;
    }
  }
  settled.push(0);
  yield frame("¡Listo! Todas las posiciones están fijadas y ordenadas.", {
    line: 10,
    hold: 2,
    vars: { comparaciones: comparisons, escrituras: writes },
  });
}

/* ————— Insertion sort — la clave levantada busca su sitio ————— */

export function* insertionSort(input: number[]): SortGen {
  const cells: SortCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));
  const a = input.slice();
  const settled: number[] = [];
  let comparisons = 0;
  let writes = 0;
  let hole: number | undefined;
  let keyCell: SortCell | null = null;

  const frame = (message: string, extra: Partial<SortFrame> = {}): SortFrame => ({
    message,
    cells: cells.map((c) => ({ ...c })),
    settled: [...settled],
    comparisons,
    writes,
    hole,
    ...extra,
  });

  yield frame(
    `Entrada: [${a.join(", ")}]. El primer elemento forma por sí solo el lado ordenado.`,
    { line: 1, hold: 1.2, vars: { lado: "a[0..0]" } },
  );
  if (a.length <= 1) {
    yield frame(
      a.length === 1 ? "Solo hay un elemento: ya está ordenado." : "Array vacío: nada que ordenar.",
      { line: 9, hold: 2 },
    );
    return;
  }
  settled.push(0);

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    // Levantamos la clave: queda un hueco punteado y la tarjeta flota.
    keyCell = at(cells, i);
    hole = i;
    yield frame(`Clave: ${key} (a[${i}]). La levantamos y buscamos su sitio en el lado ordenado.`, {
      line: 3,
      hold: 1.4,
      status: { [String(keyCell.id)]: "key" },
      vars: { key, j, lado: `a[0..${i - 1}]` },
    });
    while (j >= 0) {
      comparisons++;
      if (a[j] <= key) {
        yield frame(`a[${j}] = ${a[j]} ≤ ${key}: aquí va la clave, justo después.`, {
          line: 5,
          hold: 1.2,
          status: { [String(at(cells, j).id)]: "compare", [String(keyCell.id)]: "key" },
          vars: { key, j, lado: `a[0..${i - 1}]` },
        });
        break;
      }
      const moving = at(cells, j);
      a[j + 1] = a[j];
      writes++;
      moving.slot = j + 1;
      hole = j;
      keyCell.slot = j;
      yield frame(`a[${j}] = ${a[j]} > ${key}: lo desplazamos una casilla a la derecha.`, {
        line: 6,
        status: { [String(moving.id)]: "move", [String(keyCell.id)]: "key" },
        vars: { key, j, escrituras: writes },
      });
      j--;
    }
    a[j + 1] = key;
    writes++;
    keyCell.slot = j + 1;
    hole = undefined;
    keyCell = null;
    settled.push(i);
    yield frame(`Insertamos ${key} en a[${j + 1}]. Lado ordenado: a[0..${i}].`, {
      line: 8,
      hold: 1.5,
      vars: { pos: j + 1, lado: `a[0..${i}]` },
    });
  }
  yield frame("¡Listo! Todas las claves están insertadas y el array está ordenado.", {
    line: 9,
    hold: 2,
    vars: { comparaciones: comparisons, escrituras: writes },
  });
}

/* ————— Selection sort ————— */

export function* selectionSort(input: number[]): SortGen {
  const cells: SortCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));
  const a = input.slice();
  const settled: number[] = [];
  let comparisons = 0;
  let writes = 0;

  const frame = (message: string, extra: Partial<SortFrame> = {}): SortFrame => ({
    message,
    cells: cells.map((c) => ({ ...c })),
    settled: [...settled],
    comparisons,
    writes,
    ...extra,
  });

  yield frame(
    `Entrada: [${a.join(", ")}]. Buscamos el mínimo de la zona desordenada y lo fijamos al frente.`,
    { line: 1, hold: 1.2, vars: { zona: `a[0..${a.length - 1}]` } },
  );
  if (a.length <= 1) {
    yield frame(
      a.length === 1 ? "Solo hay un elemento: ya está ordenado." : "Array vacío: nada que ordenar.",
      { line: 8, hold: 2, vars: { n: a.length } },
    );
    return;
  }

  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    yield frame(`Zona desordenada empieza en a[${i}]. Primer candidato a mínimo: ${a[min]}.`, {
      line: 3,
      status: { [String(at(cells, min).id)]: "key" },
      vars: { i, m: min, zona: `a[${i}..${a.length - 1}]` },
    });
    for (let j = i + 1; j < a.length; j++) {
      comparisons++;
      yield frame(`¿a[${j}] = ${a[j]} < mínimo actual ${a[min]}?`, {
        line: 5,
        status: st([at(cells, min), at(cells, j)], "compare"),
        vars: { j, m: min, comparaciones: comparisons },
      });
      if (a[j] < a[min]) {
        min = j;
        yield frame(`Sí: nuevo mínimo = ${a[min]} (en a[${min}]).`, {
          line: 6,
          status: { [String(at(cells, min).id)]: "key" },
          vars: { j, m: min },
        });
      }
    }
    settled.push(i);
    if (min !== i) {
      const c1 = at(cells, i);
      const c2 = at(cells, min);
      [a[i], a[min]] = [a[min], a[i]];
      writes += 2;
      c1.slot = min;
      c2.slot = i;
      yield frame(`Intercambio a[${i}] ↔ a[${min}]: el mínimo ${a[i]} queda fijado.`, {
        line: 7,
        hold: 1.5,
        status: st([c1, c2], "move"),
        vars: { i, m: min, escrituras: writes },
      });
    } else {
      yield frame(`a[${i}] = ${a[i]} ya era el mínimo: sin intercambio.`, {
        line: 4,
        hold: 1.2,
        vars: { i },
      });
    }
  }
  settled.push(a.length - 1);
  yield frame("¡Listo! El array está ordenado.", {
    line: 8,
    hold: 2,
    vars: { comparaciones: comparisons, escrituras: writes },
  });
}
