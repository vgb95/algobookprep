/**
 * Disposición determinista de árbol binario (extraída de TreeViz para
 * compartirla entre el render clásico y el fluido): x por orden de
 * valor, y por profundidad. Como depende solo del conjunto de nodos
 * (estable entre cuadros de un recorrido), las posiciones no saltan
 * y la fluidez se consigue fundiendo colores + pulso en el actual.
 */

import { ROLE } from "./roles";

export interface FlatNode {
  id: number;
  value: number;
  visited: boolean;
  current: boolean;
  path: boolean;
}

export interface TreeLayout {
  width: number;
  height: number;
  radius: number;
  xPos: Map<number, number>;
  yPos: Map<number, number>;
  edges: Array<{ x1: number; y1: number; x2: number; y2: number }>;
}

export function layoutTree(nodes: FlatNode[], width = 700, height = 320): TreeLayout {
  const radius = 22;
  const sortedByValue = [...nodes].sort((a, b) => a.value - b.value);
  const xPos = new Map<number, number>();
  sortedByValue.forEach((n, i) => {
    xPos.set(n.id, 80 + (i / Math.max(sortedByValue.length - 1, 1)) * (width - 160));
  });

  const depth = new Map<number, number>();
  nodes.forEach((n) => depth.set(n.id, Math.floor(Math.log2(n.id + 1))));
  const maxDepth = Math.max(...Array.from(depth.values()), 0);
  const yFor = (d: number) => 60 + (d / Math.max(maxDepth, 1)) * (height - 100);
  const yPos = new Map<number, number>();
  nodes.forEach((n) => yPos.set(n.id, yFor(depth.get(n.id)!)));

  const edges: TreeLayout["edges"] = [];
  const nodesByDepth = new Map<number, FlatNode[]>();
  nodes.forEach((n) => {
    const d = depth.get(n.id)!;
    if (!nodesByDepth.has(d)) nodesByDepth.set(d, []);
    nodesByDepth.get(d)!.push(n);
  });
  const depths = Array.from(nodesByDepth.keys()).sort((a, b) => a - b);
  for (let i = 0; i < depths.length - 1; i++) {
    const upper = nodesByDepth.get(depths[i])!;
    const lower = nodesByDepth.get(depths[i + 1])!;
    for (const u of upper) {
      for (const l of lower) {
        if (Math.abs(xPos.get(u.id)! - xPos.get(l.id)!) < (width / upper.length) * 1.5) {
          edges.push({
            x1: xPos.get(u.id)!,
            y1: yFor(depths[i]),
            x2: xPos.get(l.id)!,
            y2: yFor(depths[i + 1]),
          });
          break;
        }
      }
    }
  }

  return { width, height, radius, xPos, yPos, edges };
}

export function nodeFill(n: FlatNode): string {
  return n.current ? ROLE.current : n.visited ? ROLE.settled : ROLE.pending;
}
