import { ChapterContent } from "./blocks";

/**
 * Capítulo 18 — Graph Algorithms
 */
export const graphAlgorithmsChapter: ChapterContent = {
  id: "graph-algorithms",
  num: 18,
  title: "Graph Algorithms",
  blurb:
    "DFS, BFS, Dijkstra, Bellman-Ford y orden topológico.",
  blocks: [
    {
      kind: "prose",
      id: "ga-intro",
      text:
        "Los algoritmos sobre grafos resuelven problemas de redes: caminos, conexiones, ordenes y flujos. Los dos recorridos base son DFS y BFS (capítulo 17); sobre ellos se construyen algoritmos más potentes.",
    },
    {
      kind: "prose",
      id: "ga-dijkstra",
      text:
        "**Dijkstra** encuentra el camino más corto desde un origen a todos los nodos en un grafo con pesos no negativos. Usa una cola de prioridad (montículo) para siempre expandir el nodo más cercano no visitado. Complejidad: O((V + E) log V) con montículo binario.",
    },
    {
      kind: "formula",
      id: "ga-dijkstra-formula",
      latex: "d[v] = \\min(d[v], \\; d[u] + w(u, v))",
    },
    {
      kind: "prose",
      id: "ga-bellman",
      text:
        "**Bellman-Ford** también encuentra caminos más cortos, pero admite pesos negativos y detecta ciclos negativos. Relaja todas las aristas V-1 veces. Complejidad: O(V · E), más lento que Dijkstra pero más general.",
    },
    {
      kind: "prose",
      id: "ga-topo",
      text:
        "**Orden topológico:** ordena los vértices de un grafo acíclico dirigido (DAG) de modo que si hay arista u → v, entonces u aparece antes que v. Se resuelve con DFS o con el algoritmo de Kahn (usando grados de entrada).",
    },
    {
      kind: "viz",
      id: "ga-lookup-viz",
      type: "graph",
      config: { algo: "bfs", n: "7", start: "0" },
    },
  ],
};

/**
 * Capítulo 19 — Union-Find
 */
export const unionFindChapter: ChapterContent = {
  id: "union-find",
  num: 19,
  title: "Union-Find",
  blurb:
    "Particiones de conjuntos con union y find en tiempo casi constante.",
  blocks: [
    {
      kind: "prose",
      id: "uf-intro",
      text:
        "Union-Find (o Disjoint Set Union, DSU) mantiene una partición de elementos en conjuntos disjuntos. Soporta dos operaciones: *find(x)* (¿a qué conjunto pertenece x?) y *union(x, y)* (une los conjuntos de x e y).",
    },
    {
      kind: "prose",
      id: "uf-optimizations",
      text:
        "Dos optimizaciones clave hacen que sea casi O(1) por operación:\n- **Compresión de camino:** al hacer find, hace que todos los nodos del camino apunten directamente a la raíz.\n- **Union por rango/tamaño:** siempre cuelga la raíz del árbol más pequeño bajo la del más grande.",
    },
    {
      kind: "formula",
      id: "uf-complexity",
      latex: "amortizado: O(\\alpha(n)) \\approx O(1)",
    },
    {
      kind: "prose",
      id: "uf-uses",
      text:
        "Usos: detectar ciclos en grafos no dirigidos, componentes conexos, y el algoritmo de Kruskal para árboles de expansión mínima (capítulo 20).",
    },
    {
      kind: "viz",
      id: "uf-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "0, 1, 2, 3, 4, 5, 6", target: "4" },
    },
  ],
};

/**
 * Capítulo 20 — Minimum Spanning Trees
 */
export const mstChapter: ChapterContent = {
  id: "mst",
  num: 20,
  title: "Minimum Spanning Trees",
  blurb:
    "Kruskal y Prim: conectar todos los vértices con el menor coste.",
  blocks: [
    {
      kind: "prose",
      id: "mst-intro",
      text:
        "Un **árbol de expansión mínima (MST)** de un grafo conexo ponderado es un subconjunto de aristas que conecta todos los vértices sin ciclos y con la suma mínima de pesos. Tiene exactamente V-1 aristas.",
    },
    {
      kind: "prose",
      id: "mst-kruskal",
      text:
        "**Kruskal:** ordena todas las aristas por peso y las añade una a una si no forman ciclo (usa Union-Find para detectarlo). Complejidad: O(E log E) por el ordenamiento.",
    },
    {
      kind: "prose",
      id: "mst-prim",
      text:
        "**Prim:** empieza desde un nodo arbitrario y crece el árbol añadiendo siempre la arista de menor peso que conecte un nodo dentro del árbol con uno fuera. Usa una cola de prioridad. Complejidad: O((V + E) log V).",
    },
    {
      kind: "viz",
      id: "mst-lookup-viz",
      type: "graph",
      config: { algo: "bfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "mst-outro",
      text:
        "Los MST se usan en diseño de redes (fibra óptica, electricidad), agrupamiento (clustering) y como aproximación para el problema del viajante de comercio.",
    },
  ],
};
