export type ChapterStatus = "live";

export interface Chapter {
  id: string;
  num: number;
  title: string;
  blurb: string;
  blurbEn: string;
  status: ChapterStatus;
}

export const chapters: Chapter[] = [
  { id: "complexity", num: 1, title: "Complexity Analysis", status: "live", blurbEn: "Big-O, Θ and Ω: quantifying the time and memory an algorithm consumes before writing a line of code.", blurb: "Big-O, Θ y Ω: a cuantificar el tiempo y la memoria que consume un algoritmo antes de escribirlo." },
  { id: "arrays", num: 2, title: "Arrays", status: "live", blurbEn: "Contiguous memory and O(1) indexing — and their price: inserting or deleting in the middle forces elements to shift.", blurb: "Memoria contigua, indexado en O(1) y su precio: insertar o borrar en medio obliga a desplazar elementos." },
  { id: "hash-tables", num: 3, title: "Hash Tables", status: "live", blurbEn: "Mapping keys to values with hash functions — and what happens when two keys collide.", blurb: "Mapear claves a valores con funciones de hash — y qué pasa cuando dos claves colisionan." },
  { id: "search", num: 4, title: "Search", status: "live", blurbEn: "Linear and binary search: finding an element as fast as possible.", blurb: "Lineal y binario: encontrar un elemento lo antes posible." },
  { id: "sorting", num: 5, title: "Sorting", status: "live", blurbEn: "Bubble, insertion and selection — three ways to sort, each with its own character and the same ugly face: O(n²).", blurb: "Bubble, insertion y selection — tres formas de ordenar con distinto carácter y la misma cara fea: O(n²)." },
  { id: "strings", num: 6, title: "Strings", status: "live", blurbEn: "Text and its classic operations: concatenation, substring search, and the prefixes that actually pay off.", blurb: "Cadenas y sus operaciones clásicas: concatenar, buscar subcadenas, prefijos útiles." },
  { id: "matrices", num: 7, title: "Matrices", status: "live", blurbEn: "The two-dimensional array and its sweeps: rows, columns and diagonals.", blurb: "El array bidimensional y sus recorridos: filas, columnas y diagonales." },
  { id: "linked-lists", num: 8, title: "LinkedLists", status: "live", blurbEn: "Nodes with pointers: O(1) insertion once you already know the position.", blurb: "Nodos con punteros: inserción en O(1) cuando ya conoces la posición." },
  { id: "stacks", num: 9, title: "Stacks", status: "live", blurbEn: "LIFO: undo/redo, the call stack, and how nested expressions get evaluated.", blurb: "LIFO: undo/redo, el call stack y cómo evaluar expresiones anidadas." },
  { id: "queues", num: 10, title: "Queues", status: "live", blurbEn: "FIFO and BFS: buffers, schedulers and priority queues.", blurb: "FIFO y BFS: buffers, schedulers y colas de prioridad." },
  { id: "recursion", num: 11, title: "Recursion", status: "live", blurbEn: "Divide and conquer: base cases, the call tree, and its real cost.", blurb: "Divide y vencerás: casos base, árbol de llamadas y su coste real." },
  { id: "dynamic-programming", num: 12, title: "Dynamic Programming", status: "live", blurbEn: "Memoizing overlapping subproblems to go from exponential to polynomial.", blurb: "Memorizar subproblemas solapados para pasar de exponencial a polinómico." },
  { id: "trees", num: 13, title: "Trees", status: "live", blurbEn: "Hierarchies and their traversals: preorder, inorder, postorder over a balanced BST.", blurb: "Jerarquías y sus recorridos: preorder, inorder, postorder sobre un BST balanceado." },
  { id: "heaps", num: 14, title: "Heaps", status: "live", blurbEn: "Binary heaps: inserting and extracting the max with sift-up and sift-down.", blurb: "Montículos binarios: insertar y extraer máximo con sift-up y sift-down." },
  { id: "binary-search-trees", num: 15, title: "Binary Search Trees", status: "live", blurbEn: "The BST invariant, and why balance changes everything.", blurb: "El invariante BST y por qué el balance lo cambia todo." },
  { id: "tries", num: 16, title: "Tries", status: "live", blurbEn: "Prefixes at the speed of typing: dictionaries and autocomplete.", blurb: "Prefijos a la velocidad del texto: diccionarios y autocompletado." },
  { id: "graphs", num: 17, title: "Graphs", status: "live", blurbEn: "BFS and DFS on undirected graphs: visit order and the queue/stack behind each.", blurb: "BFS y DFS sobre grafos no dirigidos: orden de visita y colas/pilas." },
  { id: "graph-algorithms", num: 18, title: "Graph Algorithms", status: "live", blurbEn: "DFS, BFS, Dijkstra, Bellman-Ford and topological order.", blurb: "DFS, BFS, Dijkstra, Bellman-Ford y orden topológico." },
  { id: "union-find", num: 19, title: "Union-Find", status: "live", blurbEn: "Set partitions with union and find in near-constant time.", blurb: "Particiones de conjuntos con union y find en tiempo casi constante." },
  { id: "mst", num: 20, title: "Minimum Spanning Trees", status: "live", blurbEn: "Kruskal and Prim: connecting every vertex at minimum cost.", blurb: "Kruskal y Prim: conectar todos los vértices con el menor coste." },
  { id: "backtracking", num: 21, title: "Backtracking", status: "live", blurbEn: "Sweeping the solution space with constraint pruning.", blurb: "Recorrer el espacio de soluciones con poda por satisfacción de restricciones." },
  { id: "bit-operations", num: 22, title: "Bit Operations", status: "live", blurbEn: "Masks, XOR and shifts: low-level optimization tricks.", blurb: "Máscaras, XOR y desplazamientos: trucos low-level de optimización." },
];
