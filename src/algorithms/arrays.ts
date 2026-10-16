import type { FrameGenerator } from "../engine/timeline";

export interface ArrayFrame {
  message: string;
  array: number[];
  cursor?: number;
  swap?: [number, number];
  found?: number;
  probes: number;
  writes: number;
}

type ArrayGen = FrameGenerator<ArrayFrame>;

export type ArrayOp = "lookup" | "insert" | "delete";

export function* lookup(input: number[], target: number): ArrayGen {
  let probes = 0;
  for (let i = 0; i < input.length; i++) {
    probes++;
    yield {
      message: `Visitamos a[${i}] = ${input[i]}…`,
      array: input.slice(),
      cursor: i,
      probes,
      writes: 0,
    };
    if (input[i] === target) {
      yield {
        message: `¡Encontrado! a[${i}] = ${target}. Buscar por valor es O(n); solo el acceso por índice es O(1).`,
        array: input.slice(),
        found: i,
        probes,
        writes: 0,
      };
      return;
    }
  }
  yield {
    message: `El ${target} no está en el array. linearSearch gastó ${probes} lecturas — eso es O(n).`,
    array: input.slice(),
    probes,
    writes: 0,
  };
}

export function* insertAt(input: number[], index: number, value: number): ArrayGen {
  let probes = 0;
  let writes = 0;

  if (index >= input.length) {
    const a = input.concat(value);
    yield {
      message: `Insertar al final es un append cuesta O(1) amortizado: ${value} entra en a[${index}].`,
      array: a,
      cursor: index,
      probes,
      writes: 1,
    };
    return;
  }

  const a = input.concat(0); // hueco temporal al final
  yield {
    message: `Para insertar ${value} en a[${index}] hay que hacer hueco: desplazamos hacia la derecha desde el final.`,
    array: a.slice(),
    cursor: a.length - 1,
    probes,
    writes,
  };
  for (let j = a.length - 1; j > index; j--) {
    a[j] = a[j - 1];
    probes++;
    writes++;
    yield {
      message: `Desplazamos ${a[j]} (a[${j - 1}]) a la casilla ${j}.`,
      array: a.slice(),
      swap: [j - 1, j],
      cursor: j,
      probes,
      writes,
    };
  }
  a[index] = value;
  writes++;
  yield {
    message: `Colocamos ${value} en a[${index}]. El array mide ahora ${a.length} — hacer hueco costó O(n).`,
    array: a,
    cursor: index,
    probes,
    writes,
  };
}

export function* deleteAt(input: number[], index: number): ArrayGen {
  const a = input.slice();
  const removed = a[index];
  let probes = 0;
  let writes = 0;

  yield {
    message: `Vamos a borrar a[${index}] = ${removed}. Los elementos posteriores caen una casilla a la izquierda.`,
    array: a.slice(),
    cursor: index,
    probes,
    writes,
  };
  for (let j = index; j < a.length - 1; j++) {
    a[j] = a[j + 1];
    probes++;
    writes++;
    yield {
      message: `${a[j]} (a[${j + 1}]) pasa a la casilla ${j}.`,
      array: a.slice(),
      swap: [j, j + 1],
      cursor: j,
      probes,
      writes,
    };
  }
  a.pop();
  yield {
    message: `Recortamos la última casilla: el array mide ahora ${a.length}. Borrar en medio cuesta O(n).`,
    array: a,
    probes,
    writes,
  };
}
