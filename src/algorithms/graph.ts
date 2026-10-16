/**
 * Grafo no dirigido — generador de frames para BFS y DFS.
 *
 * Nodos dispuestos en círculo; cada frame muestra qué nodo está actual,
 * cuáles están visitados y qué arista se está explorando.
 */

export interface GraphFrame {
  message: string;
  nodes: Array<{ id: number; label: string; visited: boolean; current: boolean; inQueue: boolean }>;
  edges: Array<{ from: number; to: number; active: boolean }>;
  queueOrStack: number[];
  visitedOrder: number[];
}

function buildGraph(n: number, edges: [number, number][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  return adj;
}

export function* bfs(n: number, edges: [number, number][], start: number): Generator<GraphFrame> {
  const adj = buildGraph(n, edges);
  for (const list of adj) list.sort((a, b) => a - b);
  const visited = new Set<number>();
  const queue: number[] = [start];
  const order: number[] = [];
  visited.add(start);

  const frame = (message: string, current: number | null): GraphFrame => ({
    message,
    nodes: adj.map((_, i) => ({
      id: i,
      label: String(i),
      visited: visited.has(i),
      current: i === current!,
      inQueue: queue.includes(i),
    })),
    edges: edges.map(([u, v]) => ({ from: u, to: v, active: false })),
    queueOrStack: [...queue],
    visitedOrder: [...order],
  });

  yield frame(`BFS desde el nodo ${start}. Lo ponemos en la cola y lo marcamos visitado.`, start);

  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);
    yield frame(`Sacamos el ${u} de la cola. Orden de visita: ${order.join(", ")}.`, u);

    for (const v of adj[u]) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        yield frame(`Vecino ${v} no visitado: lo marcamos y lo encolamos.`, v);
      } else {
        yield frame(`Vecino ${v} ya visitado: lo ignoramos.`, u);
      }
    }
  }
  yield frame(`BFS terminado. Orden de visita: ${order.join(", ")}.`, null);
}

export function* dfs(n: number, edges: [number, number][], start: number): Generator<GraphFrame> {
  const adj = buildGraph(n, edges);
  for (const list of adj) list.sort((a, b) => a - b);
  const visited = new Set<number>();
  const stack: number[] = [start];
  const order: number[] = [];

  const frame = (message: string, current: number | null): GraphFrame => ({
    message,
    nodes: adj.map((_, i) => ({
      id: i,
      label: String(i),
      visited: visited.has(i),
      current: i === current!,
      inQueue: stack.includes(i),
    })),
    edges: edges.map(([u, v]) => ({ from: u, to: v, active: false })),
    queueOrStack: [...stack],
    visitedOrder: [...order],
  });

  yield frame(`DFS desde el nodo ${start}. Lo apilamos.`, start);

  while (stack.length > 0) {
    const u = stack.pop()!;
    if (visited.has(u)) continue;
    visited.add(u);
    order.push(u);
    yield frame(`Desapilamos el ${u}. Orden de visita: ${order.join(", ")}.`, u);

    for (let i = adj[u].length - 1; i >= 0; i--) {
      const v = adj[u][i];
      if (!visited.has(v)) {
        stack.push(v);
        yield frame(`Vecino ${v} no visitado: lo apilamos.`, v);
      }
    }
  }
  yield frame(`DFS terminado. Orden de visita: ${order.join(", ")}.`, null);
}

export type GraphAlgo = "bfs" | "dfs";

export const graphAlgos: Record<GraphAlgo, { name: string; run: (n: number, e: [number, number][], s: number) => Generator<GraphFrame> }> = {
  bfs: { name: "BFS (búsqueda por anchura)", run: bfs },
  dfs: { name: "DFS (búsqueda por profundidad)", run: dfs },
};
