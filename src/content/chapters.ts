export type ChapterStatus = "live";

export interface Chapter {
  id: string;
  num: number;
  title: string;
  blurb: string;
  status: ChapterStatus;
}

export const chapters: Chapter[] = [
  { id: "complexity", num: 1, title: "Complexity Analysis", status: "live", blurb: "Big-O, Θ y Ω: a cuantificar el tiempo y la memoria que consume un algoritmo antes de escribirlo." },
  { id: "arrays", num: 2, title: "Arrays", status: "live", blurb: "Memoria contigua, indexado en O(1) y su precio: insertar o borrar en medio obliga a desplazar elementos." },
  { id: "hash-tables", num: 3, title: "Hash Tables", status: "live", blurb: "Mapear claves a valores con funciones de hash — y qué pasa cuando dos claves colisionan." },
  { id: "search", num: 4, title: "Search", status: "live", blurb: "Lineal y binario: encontrar un elemento lo antes posible." },
  { id: "sorting", num: 5, title: "Sorting", status: "live", blurb: "Bubble, insertion y selection — tres formas de ordenar con distinto carácter y la misma cara fea: O(n²)." },
  { id: "strings", num: 6, title: "Strings", status: "live", blurb: "Cadenas y sus operaciones clásicas: concatenar, buscar subcadenas, prefijos útiles." },
  { id: "matrices", num: 7, title: "Matrices", status: "live", blurb: "El array bidimensional y sus recorridos: filas, columnas y diagonales." },
  { id: "linked-lists", num: 8, title: "LinkedLists", status: "live", blurb: "Nodos con punteros: inserción en O(1) cuando ya conoces la posición." },
  { id: "stacks", num: 9, title: "Stacks", status: "live", blurb: "LIFO: undo/redo, el call stack y cómo evaluar expresiones anidadas." },
  { id: "queues", num: 10, title: "Queues", status: "live", blurb: "FIFO y BFS: buffers, schedulers y colas de prioridad." },
  { id: "recursion", num: 11, title: "Recursion", status: "live", blurb: "Divide y vencerás: casos base, árbol de llamadas y su coste real." },
  { id: "dynamic-programming", num: 12, title: "Dynamic Programming", status: "live", blurb: "Memorizar subproblemas solapados para pasar de exponencial a polinómico." },
  { id: "trees", num: 13, title: "Trees", status: "live", blurb: "Jerarquías y sus recorridos: preorder, inorder, postorder sobre un BST balanceado." },
  { id: "heaps", num: 14, title: "Heaps", status: "live", blurb: "Montículos binarios: insertar y extraer máximo con sift-up y sift-down." },
  { id: "binary-search-trees", num: 15, title: "Binary Search Trees", status: "live", blurb: "El invariante BST y por qué el balance lo cambia todo." },
  { id: "tries", num: 16, title: "Tries", status: "live", blurb: "Prefijos a la velocidad del texto: diccionarios y autocompletado." },
  { id: "graphs", num: 17, title: "Graphs", status: "live", blurb: "BFS y DFS sobre grafos no dirigidos: orden de visita y colas/pilas." },
  { id: "graph-algorithms", num: 18, title: "Graph Algorithms", status: "live", blurb: "DFS, BFS, Dijkstra, Bellman-Ford y orden topológico." },
  { id: "union-find", num: 19, title: "Union-Find", status: "live", blurb: "Particiones de conjuntos con union y find en tiempo casi constante." },
  { id: "mst", num: 20, title: "Minimum Spanning Trees", status: "live", blurb: "Kruskal y Prim: conectar todos los vértices con el menor coste." },
  { id: "backtracking", num: 21, title: "Backtracking", status: "live", blurb: "Recorrer el espacio de soluciones con poda por satisfacción de restricciones." },
  { id: "bit-operations", num: 22, title: "Bit Operations", status: "live", blurb: "Máscaras, XOR y desplazamientos: trucos low-level de optimización." },
];
