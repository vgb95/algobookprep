import { ChapterContent } from "./blocks";

/**
 * Capítulo 12 — Dynamic Programming
 */
export const dpChapter: ChapterContent = {
  id: "dynamic-programming",
  num: 12,
  title: "Dynamic Programming",
  blurb:
    "Memorizar subproblemas solapados para pasar de exponencial a polinómico.",
  blocks: [
    {
      kind: "prose",
      id: "dp-intro",
      text:
        "Programación dinámica (DP) resuelve problemas grandes descomponiéndolos en subproblemas más pequeños, guardando las soluciones intermedias para no recalcularlas. Requiere dos propiedades: subestructura óptima y subproblemas solapados.",
    },
    {
      kind: "prose",
      id: "dp-fib",
      text:
        "Fibonacci es el ejemplo perfecto. La recursión ingenua cuesta O(2ⁿ). Con DP (memorización o bottom-up) se reduce a O(n) porque cada valor se calcula una sola vez.",
    },
    {
      kind: "formula",
      id: "dp-fib-formula",
      latex: "fib(n) = fib(n-1) + fib(n-2), fib(0)=0, fib(1)=1",
    },
    {
      kind: "prose",
      id: "dp-approaches",
      text:
        "Dos formas de aplicar DP:\n- Top-down (memorización): recursión + caché que guarda resultados ya vistos.\n- Bottom-up (tabulación): llena una tabla desde los casos base hacia el resultado final, sin recursión.",
    },
    {
      kind: "viz",
      id: "dp-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "0, 1, 1, 2, 3, 5, 8, 13, 21", target: "8" },
    },
    {
      kind: "prose",
      id: "dp-outro",
      text:
        "Problemas clásicos de DP: mochila (knapsack), subsecuencia común más larga (LCS), camino más corto en DAG, y cambio de monedas.",
    },
  ],
};

/**
 * Capítulo 15 — Binary Search Trees
 */
export const bstChapter: ChapterContent = {
  id: "binary-search-trees",
  num: 15,
  title: "Binary Search Trees",
  blurb:
    "El invariante BST y por qué el balance lo cambia todo.",
  blocks: [
    {
      kind: "prose",
      id: "bst-intro",
      text:
        "Un árbol binario de búsqueda (BST) cumple el invariante: para cada nodo, todos los valores en el subárbol izquierdo son menores, y todos los del derecho son mayores. Esto permite buscar, insertar y borrar recorriendo solo una rama por nivel.",
    },
    {
      kind: "viz",
      id: "bst-lookup-viz",
      type: "tree",
      config: { order: "inorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "bst-complexity",
      text:
        "En un BST balanceado, buscar/insertar/borrar cuesta O(log n) porque cada paso descarta la mitad del árbol. Pero si insertas valores ya ordenados, el BST degenera en una lista enlazada y todo cuesta O(n).",
    },
    {
      kind: "formula",
      id: "bst-complexity-formula",
      latex: "balanceado: O(log n), degenerado: O(n)",
    },
    {
      kind: "prose",
      id: "bst-balance",
      text:
        "Para evitar la degeneración existen árboles auto-balanceables: AVL y Red-Black. Se reequilibran tras cada inserción/borrado mediante rotaciones, garantizando O(log n) en el peor caso.",
    },
  ],
};

/**
 * Capítulo 16 — Tries
 */
export const triesChapter: ChapterContent = {
  id: "tries",
  num: 16,
  title: "Tries",
  blurb:
    "Prefijos a la velocidad del texto: diccionarios y autocompletado.",
  blocks: [
    {
      kind: "prose",
      id: "trie-intro",
      text:
        "Un trie (árbol de prefijos) almacena strings como caminos desde la raíz. Cada nodo representa un carácter, y una palabra completa se marca al final de un camino. Buscar una palabra de longitud k cuesta O(k), independiente de cuántas palabras almacene el trie.",
    },
    {
      kind: "prose",
      id: "trie-uses",
      text:
        "Usos:\n- Autocompletado: dado un prefijo, recorre el trie hasta ese nodo y lista todas las palabras que cuelgan de él.\n- Corrector ortográfico: propone candidatas recorriendo caminos cercanos al prefijo escrito.\n- Enrutamiento IP: las tablas de enrutamiento usan tries de bits.",
    },
    {
      kind: "prose",
      id: "trie-ascii-note",
      text:
        "Con la convención A=1, B=2, …, la palabra APPLE se codifica como [1, 16, 16, 12, 5]. Buscar la segunda P es un lookup por valor:",
    },
    {
      kind: "viz",
      id: "trie-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 16, 16, 12, 5", target: "16" },
    },
    {
      kind: "prose",
      id: "trie-space",
      text:
        "La desventaja del trie es el espacio: cada nodo puede tener tantos hijos como símbolos del alfabeto (26 para letras minúsculas, 256 para bytes). Variantes como el radix tree comprimen nodos con un solo hijo para ahorrar memoria.",
    },
  ],
};
