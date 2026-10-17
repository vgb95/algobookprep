/**
 * Disposición REAL de árbol binario (Fase 3):
 *
 *  - x: proporción de hojas — cada hoja ocupa una columna; los nodos
 *    internos se centran entre sus hijos. Adiós a log2(id+1) y a las
 *    aristas "por proximidad" que dibujaban un árbol mentiroso.
 *  - y: profundidad REAL de recursión (5 niveles = 5 filas).
 *  - las aristas son las verdaderas padre→hijo (frame.edges), nada de
 *    vecinos cercanos.
 *
 * La estructura es constante durante un recorrido, así que las
 * posiciones no saltan entre cuadros: la fluidez viene de los estados
 * (visited/current/path) fundiéndose.
 */

import { ROLE } from "./roles";

export interface FlatNode {
  id: number;
  value: number;
  visited: boolean;
  current: boolean;
  path: boolean;
}

export interface RealEdge {
  from: number;
  to: number;
}

export interface TreeLayout {
  width: number;
  height: number;
  radius: number;
  xPos: Map<number, number>;
  yPos: Map<number, number>;
  edges: Array<{ from: number; to: number; x1: number; y1: number; x2: number; y2: number }>;
}

const LEAF_GAP = 66;
const PAD_X = 50;
const LEVEL_GAP = 84;
const RADIUS = 22;

export function layoutTree(nodes: FlatNode[], edges: RealEdge[] = []): TreeLayout {
  if (nodes.length === 0) {
    return { width: 700, height: 320, radius: RADIUS, xPos: new Map(), yPos: new Map(), edges: [] };
  }

  const children = new Map<number, number[]>();
  const parent = new Map<number, number>();
  for (const e of edges) {
    if (!children.has(e.from)) children.set(e.from, []);
    children.get(e.from)!.push(e.to);
    parent.set(e.to, e.from);
  }

  const roots = nodes.filter((n) => !parent.has(n.id));
  // Un BST con aristas reales tiene exactamente una raíz; robustés por si acaso.
  const root = roots[0] ?? nodes[0];

  const xPos = new Map<number, number>();
  const depth = new Map<number, number>();
  let leaves = 0;
  let maxDepth = 0;

  const place = (id: number, d: number): number => {
    maxDepth = Math.max(maxDepth, d);
    depth.set(id, d);
    const kids = children.get(id) ?? [];
    if (kids.length === 0) {
      const x = PAD_X + leaves * LEAF_GAP;
      leaves++;
      xPos.set(id, x);
      return x;
    }
    const xs = kids.map((k) => place(k, d + 1));
    const avg = xs.reduce((a, b) => a + b, 0) / xs.length;
    xPos.set(id, avg);
    return avg;
  };
  place(root.id, 0);

  const yPos = new Map<number, number>();
  nodes.forEach((n) => yPos.set(n.id, 56 + depth.get(n.id)! * LEVEL_GAP));

  const geometry = edges
    .filter((e) => xPos.has(e.from) && xPos.has(e.to))
    .map((e) => ({
      from: e.from,
      to: e.to,
      x1: xPos.get(e.from)!,
      y1: yPos.get(e.from)!,
      x2: xPos.get(e.to)!,
      y2: yPos.get(e.to)!,
    }));

  return {
    width: Math.max(700, PAD_X * 2 + (Math.max(leaves - 1, 0)) * LEAF_GAP),
    height: 56 + maxDepth * LEVEL_GAP + 60,
    radius: RADIUS,
    xPos,
    yPos,
    edges: geometry,
  };
}

export function nodeFill(n: FlatNode): string {
  if (n.current) return ROLE.current;
  if (n.visited) return ROLE.settled;
  if (n.path) return ROLE.key;
  return ROLE.pending;
}
