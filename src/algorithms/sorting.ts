import type { FrameGenerator } from "../engine/timeline";

export interface SortFrame {
  message: string;
  array: number[];
  compare?: [number, number];
  swap?: [number, number];
  key?: [number, number];
  settled: number[];
  comparisons: number;
  writes: number;
}

type SortGen = FrameGenerator<SortFrame>;

const seq = (n: number) => Array.from({ length: n }, (_, i) => i);

export type SortId = "bubble" | "insertion" | "selection";

export const sorters: Record<SortId, { name: string; run: (a: number[]) => SortGen }> = {
  bubble: { name: "Bubble Sort", run: bubbleSort },
  insertion: { name: "Insertion Sort", run: insertionSort },
  selection: { name: "Selection Sort", run: selectionSort },
};

export function* bubbleSort(input: number[]): SortGen {
  const a = input.slice();
  const settled: number[] = [];
  let comparisons = 0;
  let writes = 0;
  const frame = (message: string, extra: Partial<SortFrame> = {}): SortFrame => ({
    message,
    array: a.slice(),
    settled: [...settled],
    comparisons,
    writes,
    ...extra,
  });

  yield frame(`Entrada: [${a.join(", ")}]. Empezamos a burbujear.`);
  if (a.length <= 1) {
    settled.push(...seq(a.length));
    yield frame(
      a.length === 1 ? "Solo hay un elemento: ya está ordenado." : "Array vacío: nada que ordenar.",
    );
    return;
  }

  for (let n = a.length; n > 1; n--) {
    let swapped = false;
    for (let i = 0; i < n - 1; i++) {
      comparisons++;
      yield frame(`¿a[${i}] = ${a[i]} > a[${i + 1}] = ${a[i + 1]}?`, { compare: [i, i + 1] });
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        writes += 2;
        swapped = true;
        yield frame(`Sí: intercambio — el ${a[i + 1]} burbujea hacia arriba.`, { swap: [i, i + 1] });
      }
    }
    settled.push(n - 1);
    yield frame(`a[${n - 1}] = ${a[n - 1]} queda fijado en su posición final.`, {
      key: [n - 1, a[n - 1]],
    });
    if (!swapped) {
      for (let k = n - 2; k >= 0; k--) settled.push(k);
      yield frame("Pasada sin intercambios: el array ya está ordenado.");
      return;
    }
  }
  settled.push(0);
  yield frame("¡Listo! Todas las posiciones están fijadas y ordenadas.");
}

export function* insertionSort(input: number[]): SortGen {
  const a = input.slice();
  const sortedSide = [0];
  let comparisons = 0;
  let writes = 0;
  const frame = (message: string, extra: Partial<SortFrame> = {}): SortFrame => ({
    message,
    array: a.slice(),
    settled: [...sortedSide],
    comparisons,
    writes,
    ...extra,
  });

  yield frame(`Entrada: [${a.join(", ")}]. El primer elemento forma por sí solo el lado ordenado.`);
  if (a.length <= 1) {
    yield frame(
      a.length === 1 ? "Solo hay un elemento: ya está ordenado." : "Array vacío: nada que ordenar.",
    );
    return;
  }

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    yield frame(`Clave: ${key} (a[${i}]). La insertamos en el lado ordenado buscando su sitio.`, {
      key: [i, key],
    });
    while (j >= 0) {
      comparisons++;
      if (a[j] <= key) {
        yield frame(`a[${j}] = ${a[j]} ≤ ${key}: aquí va la clave, justo después.`, {
          compare: [j, j + 1],
          key: [j + 1, key],
        });
        break;
      }
      a[j + 1] = a[j];
      writes++;
      yield frame(`a[${j}] = ${a[j]} > ${key}: lo desplazamos una casilla a la derecha.`, {
        swap: [j, j + 1],
        key: [j + 1, key],
      });
      j--;
    }
    a[j + 1] = key;
    writes++;
    sortedSide.push(i);
    yield frame(`Insertamos ${key} en a[${j + 1}]. Lado ordenado: a[0..${i}].`, {
      key: [j + 1, key],
    });
  }
  yield frame("¡Listo! Todas las claves están insertadas y el array está ordenado.");
}

export function* selectionSort(input: number[]): SortGen {
  const a = input.slice();
  const settled: number[] = [];
  let comparisons = 0;
  let writes = 0;
  const frame = (message: string, extra: Partial<SortFrame> = {}): SortFrame => ({
    message,
    array: a.slice(),
    settled: [...settled],
    comparisons,
    writes,
    ...extra,
  });

  yield frame(`Entrada: [${a.join(", ")}]. Buscamos el mínimo de la zona desordenada y lo fijamos al frente.`);
  if (a.length <= 1) {
    settled.push(...seq(a.length));
    yield frame(
      a.length === 1 ? "Solo hay un elemento: ya está ordenado." : "Array vacío: nada que ordenar.",
    );
    return;
  }

  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    yield frame(`Zona desordenada empieza en a[${i}]. Primer candidato a mínimo: ${a[min]}.`, {
      key: [min, a[min]],
    });
    for (let j = i + 1; j < a.length; j++) {
      comparisons++;
      yield frame(`¿a[${j}] = ${a[j]} < mínimo actual ${a[min]}?`, {
        compare: [min, j],
        key: [min, a[min]],
      });
      if (a[j] < a[min]) {
        min = j;
        yield frame(`Sí: nuevo mínimo = ${a[min]} (en a[${min}]).`, { key: [min, a[min]] });
      }
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      writes += 2;
      yield frame(`Intercambio a[${i}] ↔ a[${min}]: el mínimo ${a[i]} queda fijado.`, {
        swap: [i, min],
      });
    } else {
      yield frame(`a[${i}] = ${a[i]} ya era el mínimo: sin intercambio.`);
    }
    settled.push(i);
  }
  settled.push(a.length - 1);
  yield frame("¡Listo! El array está ordenado.");
}
