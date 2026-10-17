import { ChapterContent } from "./blocks";

/**
 * Capítulo 2 — Arrays. Contenido completo de ejemplo:
 * teoría, fórmulas, visualizaciones interactivas y problemas.
 */
export const arraysChapter: ChapterContent = {
  id: "arrays",
  num: 2,
  title: "Arrays",
  blurb:
    "Memoria contigua, indexado en O(1) y su precio: insertar o borrar en medio obliga a desplazar elementos.",
  blocks: [
    {
      kind: "prose",
      id: "arrays-intro",
      text:
        "Un **array** es una colección de elementos del mismo tipo almacenados en **posiciones de memoria contiguas**. Gracias a eso, el ordenador sabe exactamente dónde está cada elemento: si sabe la dirección de inicio y el tamaño de cada elemento, puede saltar directamente a la posición *i* en tiempo constante.",
    },
    {
      kind: "formula",
      id: "arrays-address",
      latex: "\\text{dirección}(a[i]) = \\text{dirección}(a[0]) + i \\times \\text{tamaño(elemento)}",
    },
    {
      kind: "prose",
      id: "arrays-o1",
      text:
        "Ese es el gran poder de los arrays: **acceso aleatorio en O(1)**. Puedes leer o escribir `a[5]` sin recorrer los elementos anteriores. El precio se paga cuando quieres insertar o borrar en medio: hay que desplazar todos los elementos posteriores para hacer o cerrar el hueco, y eso cuesta **O(n)**.",
    },
    {
      kind: "viz",
      id: "arrays-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "4, 1, 7, 3, 9, 2", target: "7" },
    },
    {
      kind: "prose",
      id: "arrays-insert",
      text:
        "Insertar un valor en la posición *i* obliga a desplazar una casilla a la derecha todos los elementos desde *i* hasta el final. En el peor caso (insertar al principio) mueves *n* elementos.",
    },
    {
      kind: "viz",
      id: "arrays-insert-viz",
      type: "array",
      config: { op: "insert", array: "4, 1, 7, 3, 9, 2", index: "2", value: "5" },
    },
    {
      kind: "prose",
      id: "arrays-delete",
      text:
        "Borrar en la posición *i* es lo inverso: desplazas una casilla a la izquierda todos los elementos posteriores para tapar el hueco. De nuevo, O(n) en el peor caso.",
    },
    {
      kind: "viz",
      id: "arrays-delete-viz",
      type: "array",
      config: { op: "delete", array: "4, 1, 7, 3, 9, 2", index: "2" },
    },
    {
      kind: "divider",
      id: "arrays-divider-1",
    },
    {
      kind: "prose",
      id: "arrays-summary",
      text:
        "Resumen de costes: acceso por índice O(1); búsqueda por valor O(n); inserción O(n); borrado O(n). Si necesitas inserciones y borrados frecuentes en cualquier posición, una lista enlazada puede ser mejor opción — lo veremos en el capítulo 8.",
    },
    {
      kind: "problem",
      id: "arrays-problem-1",
      problemId: "two-sum",
    },
    {
      kind: "problem",
      id: "arrays-problem-2",
      problemId: "contains-duplicate",
    },
  ],
};

/**
 * Capítulo 5 — Sorting. Contenido de ejemplo.
 */
export const sortingChapter: ChapterContent = {
  id: "sorting",
  num: 5,
  title: "Sorting",
  blurb:
    "Bubble, insertion y selection — tres formas de ordenar con distinto carácter y la misma cara fea: O(n²).",
  blocks: [
    {
      kind: "prose",
      id: "sorting-intro",
      text:
        "Ordenar un array es una de las tareas más comunes en programación. Hay docenas de algoritmos de ordenación, pero los tres más sencillos de entender —bubble, insertion y selection— comparten una propiedad: en el peor caso hacen **O(n²) comparaciones**. Veamos cómo funciona cada uno, paso a paso.",
    },
    {
      kind: "viz",
      id: "sorting-bubble-viz",
      type: "sorting",
      config: { algo: "bubble", array: "7, 3, 9, 1, 5" },
    },
    {
      kind: "prose",
      id: "sorting-bubble-text",
      text:
        '**Bubble sort** compara pares adyacentes y los intercambia si están en el orden equivocado. En cada pasada, el elemento más grande "burbujea" hacia el final. Es fácil de recordar pero ineficiente: siempre recorre todo el array incluso si ya está ordenado (salvo que añadas una bandera de intercambio).',
    },
    {
      kind: "viz",
      id: "sorting-insertion-viz",
      type: "sorting",
      config: { algo: "insertion", array: "7, 3, 9, 1, 5" },
    },
    {
      kind: "prose",
      id: "sorting-insertion-text",
      text:
        "**Insertion sort** construye el array ordenado de izquierda a derecha. Toma cada elemento y lo inserta en su sitio correcto dentro de la parte ya ordenada, desplazando los mayores hacia la derecha. Es eficiente en arrays casi ordenados (mejor caso O(n)).",
    },
    {
      kind: "viz",
      id: "sorting-selection-viz",
      type: "sorting",
      config: { algo: "selection", array: "7, 3, 9, 1, 5" },
    },
    {
      kind: "prose",
      id: "sorting-selection-text",
      text:
        "**Selection sort** busca el mínimo de la parte desordenada y lo coloca al final de la parte ordenada. Siempre hace el mismo número de comparaciones (O(n²)) sin importar el orden inicial, y no es estable (puede cambiar el orden relativo de elementos iguales).",
    },
    {
      kind: "divider",
      id: "sorting-divider-1",
    },
    {
      kind: "prose",
      id: "sorting-comparison",
      text:
        "| algoritmo | peor caso | mejor caso | espacio extra | estable |\n| --- | --- | --- | --- | --- |\n| bubble | O(n²) | O(n) | O(1) | sí |\n| insertion | O(n²) | O(n) | O(1) | sí |\n| selection | O(n²) | O(n²) | O(1) | no |",
    },
    {
      kind: "prose",
      id: "sorting-outro",
      text:
        "O(n²) está bien para aprender, pero para arrays grandes necesitamos algo mejor: merge sort y quicksort (O(n log n)) los veremos en los capítulos de recursión y divide y vencerás.",
    },
  ],
};

/**
 * Capítulo 13 — Trees. Contenido de ejemplo.
 */
export const treesChapter: ChapterContent = {
  id: "trees",
  num: 13,
  title: "Trees",
  blurb: "Jerarquías y sus recorridos: preorder, inorder, postorder sobre un BST balanceado.",
  blocks: [
    {
      kind: "prose",
      id: "trees-intro",
      text:
        "Un **árbol** es una estructura jerárquica de nodos. Cada nodo tiene un valor y punteros a hijos (izquierdo y derecho en un árbol binario). El nodo sin padre es la **raíz**; los nodos sin hijos son **hojas**.",
    },
    {
      kind: "viz",
      id: "trees-inorder-viz",
      type: "tree",
      config: { order: "inorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "trees-inorder-text",
      text:
        "**Inorder** (izquierda → raíz → derecha) es el recorrido natural de un árbol binario de búsqueda: visita los nodos en orden ascendente. Es el que usarás para imprimir un BST ordenado.",
    },
    {
      kind: "viz",
      id: "trees-preorder-viz",
      type: "tree",
      config: { order: "preorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "trees-preorder-text",
      text:
        "**Preorder** (raíz → izquierda → derecha) visita la raíz antes que sus hijos. Útil para copiar un árbol o imprimir expresiones en notación prefija.",
    },
    {
      kind: "viz",
      id: "trees-postorder-viz",
      type: "tree",
      config: { order: "postorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "trees-postorder-text",
      text:
        "**Postorder** (izquierda → derecha → raíz) visita los hijos antes que la raíz. Útil para liberar memoria de un árbol o calcular tamaños de subárboles de abajo hacia arriba.",
    },
  ],
};

/**
 * Capítulo 17 — Graphs. Contenido de ejemplo.
 */
export const graphsChapter: ChapterContent = {
  id: "graphs",
  num: 17,
  title: "Graphs",
  blurb: "BFS y DFS sobre grafos no dirigidos: orden de visita y colas/pilas.",
  blocks: [
    {
      kind: "prose",
      id: "graphs-intro",
      text:
        "Un **grafo** modela relaciones entre objetos: nodos (vértices) y aristas (conexiones). No dirigidos significa que las aristas van en ambos sentidos. Los recorridos fundamentales son BFS (anchura) y DFS (profundidad).",
    },
    {
      kind: "viz",
      id: "graphs-bfs-viz",
      type: "graph",
      config: { algo: "bfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "graphs-bfs-text",
      text:
        "**BFS** explora capa por capa: primero el nodo inicial, luego sus vecinos directos, luego los vecinos de esos vecinos. Usa una **cola** (FIFO). Es el algoritmo para encontrar el camino más corto en grafos no ponderados.",
    },
    {
      kind: "viz",
      id: "graphs-dfs-viz",
      type: "graph",
      config: { algo: "dfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "graphs-dfs-text",
      text:
        "**DFS** explora lo más profundo posible por una rama antes de retroceder. Usa una **pila** (LIFO) o recursión. Útil para detectar ciclos, orden topológico y resolver laberintos.",
    },
  ],
};

/**
 * Capítulo 14 — Heaps. Contenido de ejemplo.
 */
export const heapsChapter: ChapterContent = {
  id: "heaps",
  num: 14,
  title: "Heaps",
  blurb: "Montículos binarios: insertar y extraer máximo con sift-up y sift-down.",
  blocks: [
    {
      kind: "prose",
      id: "heaps-intro",
      text:
        "Un **montículo binario** (heap) es un árbol completo donde cada nodo cumple el **invariante del montículo**: en un max-heap, el padre es siempre mayor o igual que sus hijos. El máximo está siempre en la raíz. Se representa eficientemente como un array: el hijo izquierdo de i está en 2i+1, el derecho en 2i+2.",
    },
    {
      kind: "viz",
      id: "heaps-insert-viz",
      type: "heap",
      config: { op: "insert", array: "10, 7, 9, 5, 6, 3, 8", value: "4" },
    },
    {
      kind: "prose",
      id: "heaps-insert-text",
      text:
        "Para **insertar**, colocas el valor al final del array (última hoja) y haces **sift-up**: comparas con el padre e intercambias mientras sea mayor. O(log n).",
    },
    {
      kind: "viz",
      id: "heaps-extract-viz",
      type: "heap",
      config: { op: "extract-max", array: "10, 7, 9, 5, 6, 3, 8" },
    },
    {
      kind: "prose",
      id: "heaps-extract-text",
      text:
        "Para **extraer el máximo**, quitas la raíz, mueves el último elemento a la raíz y haces **sift-down**: comparas con los hijos e intercambias con el mayor mientras sea necesario. O(log n). Los montículos son la base de las colas de prioridad y del heapsort.",
    },
  ],
};

export const chaptersContent: Record<string, ChapterContent> = {
  arrays: arraysChapter,
  sorting: sortingChapter,
  trees: treesChapter,
  graphs: graphsChapter,
  heaps: heapsChapter,
};
