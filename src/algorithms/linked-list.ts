/**
 * Listas enlazadas (Fase 6b): nodos con punteros — cada nodo vive donde
 * la memoria quiera; lo que une la lista es la cadena de flechas next.
 *
 * Las tarjetas llevan identidad (id): al insertar o borrar los nodos NO
 * se desplazan (al contrario que el array) — se RE-HILAN las flechas.
 * Cada frame lleva sus aristas explícitas (from/to por id).
 */

import type { FrameGenerator } from "../engine/timeline";

export const LIST_LOOKUP_CODE = `def find(head, target):
    node = head
    while node:
        if node.value == target:
            return node
        node = node.next
    return None`;

export const LIST_INSERT_CODE = `def insert_at(head, index, value):
    if index == 0:
        node = Node(value)
        node.next = head
        return node
    prev = head
    for _ in range(index - 1):
        prev = prev.next
    node = Node(value)
    node.next = prev.next
    prev.next = node
    return head`;

export const LIST_DELETE_CODE = `def delete_at(head, index):
    if index == 0:
        head = head.next
        return head
    prev = head
    for _ in range(index - 1):
        prev = prev.next
    victim = prev.next
    prev.next = victim.next
    return head`;

export interface ListNode {
  id: number;
  value: number;
}

export type ListStatus = "probe" | "cursor" | "found";

export interface ListLink {
  from: number;
  to: number;
}

export interface ListFrame {
  message: string;
  /** Nodos EN orden de lista (head primero). */
  nodes: ListNode[];
  /** Aristas reales por id (head → … → None). */
  links: Array<ListLink>;
  status?: Record<string, ListStatus>;
  /** Aristas que se acaban de coser (glow violeta). */
  rewire?: Array<ListLink>;
  /** Id que acaba de salir de la lista (fade out). */
  leaving?: number;
  steps: number;
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
}

type ListGen = FrameGenerator<ListFrame>;

export type ListOp = "lookup" | "insert" | "delete";

export const listOps: Record<ListOp, { name: string; code: string }> = {
  lookup: { name: "Recorrer / buscar", code: LIST_LOOKUP_CODE },
  insert: { name: "Insertar en índice", code: LIST_INSERT_CODE },
  delete: { name: "Borrar en índice", code: LIST_DELETE_CODE },
};

const st = (id: number, kind: ListStatus): Record<string, ListStatus> => ({
  [String(id)]: kind,
});

function linksOf(order: ListNode[]): ListLink[] {
  const out: ListLink[] = [];
  for (let i = 0; i < order.length - 1; i++) out.push({ from: order[i].id, to: order[i + 1].id });
  return out;
}

/* ————— Recorrido: cada «next» es un salto ————— */

export function* listLookup(input: number[], target: number): ListGen {
  let steps = 0;
  const nodes: ListNode[] = input.map((v, i) => ({ id: i, value: v }));
  const links = linksOf(nodes);

  const frame = (
    message: string,
    cursorId: number | null,
    line: number,
    found = false,
    hold?: number,
  ): ListFrame => {
    const status: Record<string, ListStatus> = {};
    // examinados en orden = posiciones [0..steps-1] de la lista
    for (let k = 0; k < Math.min(steps, nodes.length); k++) status[String(nodes[k].id)] = "probe";
    if (cursorId !== null) Object.assign(status, st(cursorId, found ? "found" : "cursor"));
    return {
      message,
      nodes: nodes.map((n) => ({ ...n })),
      links: links.map((l) => ({ ...l })),
      status,
      steps,
      line,
      hold,
      vars: { objetivo: target, saltos: steps, actual: cursorId !== null ? nodes.find((n) => n.id === cursorId)?.value ?? "∅" : "∅" },
    };
  };

  yield frame(
    "Cada nodo guarda su valor y un puntero al siguiente: el orden no vive en casillas, vive en las flechas.",
    nodes.length ? nodes[0].id : null,
    2,
    false,
    1.3,
  );

  let cursorPos = 0;
  while (cursorPos < nodes.length) {
    steps++;
    yield frame(`¿node.value = ${nodes[cursorPos].value} == ${target}?`, nodes[cursorPos].id, 4);
    if (nodes[cursorPos].value === target) {
      yield frame(
        `¡Encontrado ${target} en el salto ${steps}! Para LLEGAR hasta aquí no hubo fórmula mágica: flecha a flecha — O(n).`,
        nodes[cursorPos].id,
        5,
        true,
        2.2,
      );
      return;
    }
    cursorPos++;
    if (cursorPos < nodes.length) {
      yield frame(`No coincide: node = node.next — saltamos al siguiente.`, nodes[cursorPos].id, 6, false, 0.85);
    }
  }
  yield frame(`node = None: fin de la lista. ${steps} pasos y ${target} no está — O(n).`, null, 7, false, 2);
}

/* ————— Insertar: caminar O(n), coser O(1) ————— */

export function* listInsert(input: number[], index: number, value: number): ListGen {
  const nodes: ListNode[] = input.map((v, i) => ({ id: i, value: v }));
  let links = linksOf(nodes);
  const fresh: ListNode = { id: 1000 + nodes.length, value };
  let steps = 0;

  const frame = (message: string, line: number, extra: Partial<ListFrame> = {}): ListFrame => ({
    message,
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ ...l })),
    steps,
    line,
    ...extra,
  });

  if (nodes.length === 0) {
    yield frame("Lista vacía: el nuevo nodo se convierte en la cabeza.", 3, {
      nodes: [fresh],
      links: [],
      status: st(fresh.id, "found"),
      hold: 1.5,
    });
    return;
  }

  if (index <= 0) {
    yield frame("Insertar en la CABEZA: la operación barata por excelencia — cero caminata.", 2, { hold: 1.2 });
    yield frame(`Creamos el nodo ${value}; aún nadando suelto.`, 3, {
      nodes: [fresh, ...nodes],
      links,
      status: st(fresh.id, "cursor"),
      hold: 1.1,
    });
    yield frame(`Su next apunta a la antigua cabeza (${nodes[0].value})…`, 4, {
      nodes: [fresh, ...nodes],
      links: [{ from: fresh.id, to: nodes[0].id }, ...links],
      rewire: [{ from: fresh.id, to: nodes[0].id }],
      status: st(fresh.id, "cursor"),
      hold: 1.2,
    });
    yield frame("…y la cabeza de la lista pasa a ser ÉL. Ni una tarjeta se movió de memoria.", 5, {
      nodes: [fresh, ...nodes],
      links: [{ from: fresh.id, to: nodes[0].id }, ...links],
      status: st(fresh.id, "found"),
      hold: 1.6,
    });
    return;
  }

  const clamped = Math.min(index, nodes.length);

  // 1) caminar hasta el previo (la parte cara de las listas)
  yield frame(`Caminamos a la posición ${clamped - 1}: partimos de la cabeza.`, 6, {
    status: st(nodes[0].id, "probe"),
  });
  let prevPos = 0;
  while (prevPos < clamped - 1) {
    prevPos++;
    steps++;
    yield frame(
      `prev = prev.next → posición ${prevPos} (${nodes[prevPos].value}). Sin acceso por índice: paso a paso.`,
      8,
      { status: st(nodes[prevPos].id, "probe") },
    );
  }
  const prev = nodes[clamped - 1];
  steps++;

  // 2) Coser el nodo: primero su flecha de salida… (líneas 9-11)
  yield frame(`Creamos el nodo ${value} junto a ${prev.value} (el previo).`, 9, {
    status: { ...nodes.slice(0, clamped).reduce<Record<string, ListStatus>>((acc, n) => ({ ...acc, [String(n.id)]: "probe" }), {}) , [String(fresh.id)]: "cursor" },
    hold: 1.1,
  });
  const nextNode = nodes[clamped];
  yield frame(
    `node.next = prev.next: el nuevo nodo ${value} sale en dirección a ${nextNode?.value ?? "None"}.`,
    10,
    {
      nodes: [...nodes, fresh],
      links: [...links, ...(nextNode ? [{ from: fresh.id, to: nextNode.id }] : [])],
      rewire: nextNode ? [{ from: fresh.id, to: nextNode.id }] : [],
      status: st(fresh.id, "cursor"),
      hold: 1.2,
    },
  );
  const newOrder = [...nodes.slice(0, clamped), fresh, ...nodes.slice(clamped)];
  yield frame(
    `prev.next = node: ${prev.value} apunta ahora AL NUEVO — la cadena ${prev.value} → ${value} → ${nextNode?.value}. Dos flechas, O(1).`,
    11,
    {
      nodes: newOrder,
      links: linksOf(newOrder),
      rewire: [{ from: prev.id, to: fresh.id }],
      status: st(fresh.id, "found"),
      hold: 1.6,
    },
  );
  yield frame("Insertar en medio: caminar O(n) para llegar + coser O(1). El array habría desplazado todo lo posterior.", 12, {
    hold: 1.5,
  });
}

/* ————— Borrar: caminar O(n), puentear O(1) ————— */

export function* listDelete(input: number[], index: number): ListGen {
  const idx = Math.min(Math.max(index, 0), input.length - 1);
  const nodes: ListNode[] = input.map((v, i) => ({ id: i, value: v }));
  let links = linksOf(nodes);
  let steps = 0;

  const frame = (message: string, line: number, extra: Partial<ListFrame> = {}): ListFrame => ({
    message,
    nodes: nodes.map((n) => ({ ...n })),
    links: links.map((l) => ({ ...l })),
    steps,
    line,
    ...extra,
  });

  if (nodes.length === 0) {
    yield frame("Lista vacía: nada que borrar.", 1, { hold: 1.4 });
    return;
  }
  const victim = nodes[idx];

  if (idx === 0) {
    yield frame(`Borrar la CABEZA (${victim.value}): ni caminata ni re-hilado largo — head salta al segundo.`, 2, {
      status: st(victim.id, "cursor"),
      hold: 1.2,
    });
    const rest = nodes.slice(1);
    links = linksOf(rest);
    yield frame(`head = head.next: la lista ya empieza en ${rest[0]?.value ?? "None"}; la víctima queda huérfana.`, 3, {
      nodes: rest,
      links,
      leaving: victim.id,
      status: st(victim.id, "cursor"),
      hold: 1.6,
    });
    yield frame(`Devolviendo la nueva cabeza — O(1) limpio.`, 4, { hold: 1.3 });
    return;
  }

  // 1) caminar hasta el previo
  yield frame(`Caminamos a la posición ${idx - 1}: partimos de la cabeza.`, 5, {
    status: st(nodes[0].id, "probe"),
  });
  let prevPos = 0;
  while (prevPos < idx - 1) {
    prevPos++;
    steps++;
    yield frame(
      `prev = prev.next → posición ${prevPos} (${nodes[prevPos].value}).`,
      7,
      { status: st(nodes[prevPos].id, "probe") },
    );
  }
  const prev = nodes[idx - 1];
  steps++;

  // 2) el puente
  yield frame(`victim = prev.next: la víctima es ${victim.value}.`, 8, {
    status: { [String(prev.id)]: "cursor", [String(victim.id)]: "cursor" },
    hold: 1.2,
  });
  const nextNode = nodes[idx + 1];
  const restOrder = nodes.filter((_, i) => i !== idx);
  const rewire: ListLink[] = nextNode ? [{ from: prev.id, to: nextNode.id }] : [];
  links = linksOf(restOrder);
  yield frame(
    nextNode
      ? `prev.next = victim.next: la flecha de ${prev.value} SALTA el nodo ${victim.value} y aterriza en ${nextNode.value}.`
      : `prev.next = victim.next: ${victim.value} era el último — ${prev.value} apunta ahora a None.`,
    9,
    {
      nodes: restOrder,
      links,
      rewire,
      leaving: victim.id,
      status: { [String(prev.id)]: "cursor", [String(victim.id)]: "cursor" },
      hold: 1.6,
    },
  );
  yield frame(
    "Borrar en medio: puentear es O(1)… más el O(n) que costó caminar hasta el previo.",
    10,
    { hold: 1.5 },
  );
}
