/**
 * Grafo no dirigido — generador de frames para BFS y DFS.
 *
 * Nodos dispuestos en círculo; cada frame muestra qué nodo está actual,
 * cuáles están visitados y qué arista se está explorando (glow). Los
 * snippets canónicos y line/hold/vars alimentan el code playback.
 */

export const BFS_CODE = `def bfs(graph, start):
    queue = deque([start])
    visited = {start}
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)
    return order`;

export const DFS_CODE = `def dfs(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        u = stack.pop()
        if u in visited:
            continue
        visited.add(u)
        order.append(u)
        for v in reversed(graph[u]):
            if v not in visited:
                stack.append(v)
    return order`;

export interface GraphFrame {
  message: string;
  nodes: Array<{ id: number; label: string; visited: boolean; current: boolean; inQueue: boolean }>;
  edges: Array<{ from: number; to: number; active: boolean }>;
  queueOrStack: number[];
  visitedOrder: number[];
  /** Arista que se explora ahora mismo (la que ilumina). */
  activeEdge?: [number, number];
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
}

function buildGraph(n: number, edges: [number, number][]): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  return adj;
}

type GraphGen = Generator<GraphFrame, void, undefined>;

export function* bfs(n: number, edges: [number, number][], start: number): GraphGen {
  const adj = buildGraph(n, edges);
  for (const list of adj) list.sort((a, b) => a - b);
  const visited = new Set<number>();
  const queue: number[] = [start];
  const order: number[] = [];
  visited.add(start);

  const frame = (
    message: string,
    current: number | null,
    line: number,
    activeEdge: [number, number] | null = null,
    hold?: number,
  ): GraphFrame => ({
    message,
    nodes: adj.map((_, i) => ({
      id: i,
      label: String(i),
      visited: visited.has(i),
      current: i === current,
      inQueue: queue.includes(i),
    })),
    edges: edges.map(([u, v]) => ({
      from: u,
      to: v,
      active: activeEdge !== null && ((activeEdge[0] === u && activeEdge[1] === v) || (activeEdge[0] === v && activeEdge[1] === u)),
    })),
    queueOrStack: [...queue],
    visitedOrder: [...order],
    activeEdge: activeEdge ?? undefined,
    line,
    hold,
    vars: {
      u: current ?? "—",
      cola: `[${queue.join(", ")}]`,
      visitados: [...visited].join(", "),
    },
  });

  yield frame(`BFS por anchura desde el nodo ${start}. Lo encolamos y lo marcamos visitado.`, start, 3, null, 1.1);

  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);
    yield frame(`Sacamos el ${u} de la cola y lo añadimos al orden de visita: ${order.join(", ")}.`, u, 6, null, 1.15);

    for (const v of adj[u]) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        yield frame(`Arista ${u}—${v}: vecino ${v} sin visitar — lo marcamos y lo encolamos.`, u, 10, [u, v], 1.2);
      } else {
        yield frame(`Arista ${u}—${v}: ${v} ya está visitado, lo ignoramos.`, u, 9, [u, v]);
      }
    }
  }
  yield frame(`BFS terminado. Orden de visita (por capas): ${order.join(" → ")}.`, null, 12, null, 2);
}

export function* dfs(n: number, edges: [number, number][], start: number): GraphGen {
  const adj = buildGraph(n, edges);
  for (const list of adj) list.sort((a, b) => a - b);
  const visited = new Set<number>();
  const stack: number[] = [start];
  const order: number[] = [];

  const frame = (
    message: string,
    current: number | null,
    line: number,
    activeEdge: [number, number] | null = null,
    hold?: number,
  ): GraphFrame => ({
    message,
    nodes: adj.map((_, i) => ({
      id: i,
      label: String(i),
      visited: visited.has(i),
      current: i === current,
      inQueue: stack.includes(i),
    })),
    edges: edges.map(([u, v]) => ({
      from: u,
      to: v,
      active: activeEdge !== null && ((activeEdge[0] === u && activeEdge[1] === v) || (activeEdge[0] === v && activeEdge[1] === u)),
    })),
    queueOrStack: [...stack],
    visitedOrder: [...order],
    activeEdge: activeEdge ?? undefined,
    line,
    hold,
    vars: {
      u: current ?? "—",
      pila: `[${stack.join(", ")}]`,
      visitados: [...visited].join(", "),
    },
  });

  yield frame(`DFS por profundidad desde el nodo ${start}. Lo apilamos.`, start, 3, null, 1.1);

  while (stack.length > 0) {
    const u = stack.pop()!;
    if (visited.has(u)) continue;
    visited.add(u);
    order.push(u);
    yield frame(`Desapilamos el ${u}, lo visitamos: ${order.join(", ")}.`, u, 10, null, 1.15);

    for (let i = adj[u].length - 1; i >= 0; i--) {
      const v = adj[u][i];
      if (!visited.has(v)) {
        stack.push(v);
        yield frame(`Arista ${u}—${v}: ${v} sin visitar — lo apilamos para meternos en él.`, u, 13, [u, v], 1.2);
      }
    }
  }
  yield frame(`DFS terminado. Orden de visita (cavando hasta el fondo): ${order.join(" → ")}.`, null, 14, null, 2);
}

export type GraphAlgo = "bfs" | "dfs";

export const graphAlgos: Record<
  GraphAlgo,
  { name: string; code: string; run: (n: number, e: [number, number][], s: number) => GraphGen }
> = {
  bfs: { name: "BFS (anchura)", code: BFS_CODE, run: bfs },
  dfs: { name: "DFS (profundidad)", code: DFS_CODE, run: dfs },
};
