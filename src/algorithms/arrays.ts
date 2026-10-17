import type { FrameGenerator } from "../engine/timeline";

/**
 * Arrays — operaciones sobre memoria contigua.
 *
 * Cada celda lleva una identidad estable (id) y su slot actual, de modo
 * que el reproductor pueda interpolar el DESPLAZAMIENTO entre cuadros:
 * al insertar, las celdas se deslizan a la derecha y el hueco viaja hacia
 * el índice; al borrar, colapsan a la izquierda y la última casilla se
 * recorta. Sin saltos: movimiento continuo, estilo "cartas sobre papel".
 */

/* ————— Código Python canónico (Fase 2 lo reproduce línea a línea) ————— */

export const LOOKUP_CODE = `def linear_search(a, target):
    for i in range(len(a)):
        if a[i] == target:
            return i
    return -1`;

export const INSERT_CODE = `def insert_at(a, index, value):
    if index >= len(a):
        a.append(value)          # O(1) amortizado
        return
    a.append(None)               # hueco provisional al final
    for j in range(len(a) - 1, index, -1):
        a[j] = a[j - 1]
    a[index] = value`;

export const DELETE_CODE = `def delete_at(a, index):
    for j in range(index, len(a) - 1):
        a[j] = a[j + 1]
    a.pop()
    return a`;

export const BINARY_CODE = `def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            return mid
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`;

/* ————— Frames ————— */

export interface ArrayCell {
  /** Identidad estable de la celda (permite interpolar su movimiento). */
  id: number;
  value: number;
  /** Posición actual (slot) en el array. */
  slot: number;
}

export type CellStatus = "probe" | "cursor" | "shift" | "found";

export interface ArrayFrame {
  message: string;
  cells: ArrayCell[];
  /** Estado visual por id de celda. */
  status?: Record<string, CellStatus>;
  /** Slot visible como hueco (vacío, punteado). */
  hole?: number;
  probes: number;
  writes: number;
  /** Fase 2: línea activa del código canónico, pausa extendida y variables. */
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
}

type ArrayGen = FrameGenerator<ArrayFrame>;

export type ArrayOp = "lookup" | "insert" | "delete" | "binary";

/**
 * Búsqueda binaria: exige array ORDENADO (el reproductor lo ordena
 * antes de representarla si hace falta). Las casillas descartadas
 * quedan tintadas; el cursor marca el medio que probamos en cada paso.
 */
export function* binarySearch(input: number[], target: number): ArrayGen {
  const cells: ArrayCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));
  let probes = 0;
  let lo = 0;
  let hi = cells.length - 1;

  const frame = (
    message: string,
    line: number,
    mid: number,
    found: boolean,
    hold?: number,
  ): ArrayFrame => {
    const status: Record<string, CellStatus> = {};
    for (let k = 0; k < lo; k++) status[String(k)] = "probe";
    for (let k = hi + 1; k < cells.length; k++) status[String(k)] = "probe";
    if (mid >= 0) status[String(mid)] = found ? "found" : "cursor";
    return {
      message,
      cells: cells.map((c) => ({ ...c })),
      status,
      probes,
      writes: 0,
      line,
      hold,
      vars: { lo, hi, mid: mid < 0 ? "—" : mid, objetivo: target, pasadas: probes },
    };
  };

  while (lo <= hi) {
    probes++;
    const mid = Math.floor((lo + hi) / 2);
    yield frame(`Rango a[${lo}..${hi}]: probamos el medio a[${mid}] = ${input[mid]}.`, 4, mid, false);
    if (input[mid] === target) {
      yield frame(`¡Encontrado! a[${mid}] = ${target}. ${probes} pasadas — eso es O(log n).`, 6, mid, true, 2.2);
      return;
    }
    if (input[mid] < target) {
      lo = mid + 1;
      yield frame(`a[${mid}] < ${target}: el objetivo solo puede estar a la derecha — descartamos la mitad izquierda.`, 8, mid, false);
    } else {
      hi = mid - 1;
      yield frame(`a[${mid}] > ${target}: el objetivo solo puede estar a la izquierda — descartamos la mitad derecha.`, 9, mid, false);
    }
  }
  yield frame(`El rango quedó vacío: ${target} no está. Devolvemos -1 tras ${probes} pasadas.`, 11, -1, false, 2);
}

export const arrayOps: Record<ArrayOp, { name: string; code: string }> = {
  lookup: { name: "Búsqueda lineal", code: LOOKUP_CODE },
  insert: { name: "Insertar en índice", code: INSERT_CODE },
  delete: { name: "Borrar en índice", code: DELETE_CODE },
  binary: { name: "Búsqueda binaria (ordenado)", code: BINARY_CODE },
};

const st = (cells: ArrayCell[], kind: CellStatus): Record<string, CellStatus> =>
  Object.fromEntries(cells.map((c) => [String(c.id), kind]));

/* ————— Búsqueda por valor: O(n) ————— */

export function* lookup(input: number[], target: number): ArrayGen {
  let probes = 0;
  const cells: ArrayCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));

  const frame = (
    message: string,
    line: number,
    cursor: number | null,
    found: boolean,
    hold?: number,
  ): ArrayFrame => {
    const status: Record<string, CellStatus> = {};
    for (let k = 0; k < (cursor ?? input.length); k++) status[String(k)] = "probe";
    if (cursor !== null) status[String(cursor)] = found ? "found" : "cursor";
    return {
      message,
      cells: cells.map((c) => ({ ...c })),
      status,
      probes,
      writes: 0,
      line,
      hold,
      vars: { i: cursor ?? "—", objetivo: target, lecturas: probes },
    };
  };

  for (let i = 0; i < cells.length; i++) {
    probes++;
    yield frame(`Visitamos a[${i}] = ${input[i]}…`, 2, i, false);
    if (input[i] === target) {
      yield frame(
        `¡Encontrado! a[${i}] = ${target}. Buscar por valor es O(n); solo el acceso por índice es O(1).`,
        3,
        i,
        true,
        2.2,
      );
      return;
    }
  }
  yield frame(
    `El ${target} no está: linear_search devolvería -1. ${probes} lecturas — eso es O(n).`,
    5,
    null,
    false,
    2,
  );
}

/* ————— Inserción: hueco que viaja hacia el índice ————— */

export function* insertAt(input: number[], index: number, value: number): ArrayGen {
  let probes = 0;
  let writes = 0;
  const cells: ArrayCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));
  let hole: number | undefined;
  let nextId = input.length;

  const frame = (
    message: string,
    line: number,
    moving: ArrayCell[] = [],
    landed?: ArrayCell,
    hold?: number,
  ): ArrayFrame => {
    const status = st(moving, "shift");
    if (landed) status[String(landed.id)] = "found";
    return {
      message,
      cells: cells.map((c) => ({ ...c })),
      status,
      hole,
      probes,
      writes,
      line,
      hold,
      vars: { index, hueco: hole ?? "—", escrituras: writes },
    };
  };

  if (index >= cells.length) {
    const slot = cells.length;
    const fresh: ArrayCell = { id: nextId++, value, slot };
    cells.push(fresh);
    writes++;
    yield frame(
      `Insertar al final es un append: cuesta O(1) amortizado. ${value} entra en a[${slot}].`,
      3,
      [],
      fresh,
      2,
    );
    return;
  }

  // 1) Agrandamos el array en 1: el hueco provisional nace al final.
  hole = cells.length;
  yield frame(
    `Para insertar ${value} en a[${index}] hay que hacer hueco: desplazamos hacia la derecha desde el final.`,
    5,
  );

  // 2) Las celdas se deslizan una a una; el hueco viaja hacia index.
  while (hole !== undefined && hole > index) {
    const h: number = hole;
    const moved = cells.find((c) => c.slot === h - 1)!;
    moved.slot = h;
    probes++;
    writes++;
    hole = h - 1;
    yield frame(`Desplazamos ${moved.value} (a[${h - 1}]) a la casilla ${h}.`, 7, [moved]);
  }

  // 3) La nueva celda entra en el hueco.
  const fresh: ArrayCell = { id: nextId++, value, slot: index };
  cells.push(fresh);
  writes++;
  hole = undefined;
  yield frame(
    `Colocamos ${value} en a[${index}]. El array mide ahora ${cells.length} — hacer hueco costó O(n).`,
    8,
    [],
    fresh,
    1.8,
  );
}

/* ————— Borrado: colapso hacia la izquierda ————— */

export function* deleteAt(input: number[], index: number): ArrayGen {
  let probes = 0;
  let writes = 0;
  const cells: ArrayCell[] = input.map((v, i) => ({ id: i, value: v, slot: i }));
  let hole: number | undefined;

  const frame = (
    message: string,
    line: number,
    moving: ArrayCell[] = [],
    leaving?: ArrayCell,
    hold?: number,
  ): ArrayFrame => {
    const status = st(moving, "shift");
    if (leaving) status[String(leaving.id)] = "cursor";
    return {
      message,
      cells: cells.map((c) => ({ ...c })),
      status,
      hole,
      probes,
      writes,
      line,
      hold,
      vars: { index, hueco: hole ?? "—", escrituras: writes },
    };
  };

  const leaving = cells[index];
  yield frame(
    `Vamos a borrar a[${index}] = ${leaving.value}. Los elementos posteriores caen una casilla a la izquierda.`,
    1,
    [],
    leaving,
    1.2,
  );

  // 1) La celda se extrae: queda un hueco en index.
  hole = index;
  cells.splice(cells.indexOf(leaving), 1);
  yield frame(`${leaving.value} sale del array: queda un hueco en a[${index}].`, 4);

  // 2) Las celdas de la derecha colapsan una a una hacia la izquierda.
  while (hole !== undefined && hole < cells.length) {
    const h: number = hole;
    const moved = cells.find((c) => c.slot === h + 1);
    if (!moved) break;
    moved.slot = h;
    probes++;
    writes++;
    hole = h + 1;
    yield frame(`${moved.value} (a[${h + 1}]) pasa a la casilla ${h}.`, 2, [moved]);
  }

  // 3) Se recorta la última casilla.
  hole = undefined;
  yield frame(
    `Recortamos la última casilla: el array mide ahora ${cells.length}. Borrar en medio cuesta O(n).`,
    4,
    [],
    undefined,
    1.8,
  );
}
