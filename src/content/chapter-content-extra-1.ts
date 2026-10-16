import { ChapterContent } from "./blocks";

/**
 * Capítulo 1 — Complexity Analysis
 */
export const complexityChapter: ChapterContent = {
  id: "complexity",
  num: 1,
  title: "Complexity Analysis",
  blurb:
    "Big-O, Θ y Ω: a cuantificar el tiempo y la memoria que consume un algoritmo antes de escribirlo.",
  blocks: [
    {
      kind: "prose",
      id: "cx-intro",
      text:
        "La **complejidad computacional** mide cuánto crece el coste de un algoritmo (tiempo o memoria) cuando el tamaño de la entrada *n* aumenta. No medimos segundos ni megabytes exactos, porque eso depende del ordenador; medimos el orden de crecimiento.",
    },
    {
      kind: "formula",
      id: "cx-big-o",
      latex: "f(n) \\in O(g(n)) \\iff \\exists c>0, n_0: \\forall n \\ge n_0, \\; f(n) \\le c \\cdot g(n)",
    },
    {
      kind: "prose",
      id: "cx-big-o-text",
      text:
        "**Big-O** cota el crecimiento por encima: \"en el peor caso, no crece más rápido que esto\". Si un algoritmo es O(n²), al duplicar la entrada el trabajo se cuadruplica (aprox.).",
    },
    {
      kind: "formula",
      id: "cx-theta",
      latex: "f(n) \\in \\Theta(g(n)) \\iff f(n) \\in O(g(n)) \\; \\land \\; f(n) \\in \\Omega(g(n))",
    },
    {
      kind: "prose",
      id: "cx-theta-text",
      text:
        "**Theta** ajusta el crecimiento por arriba y por abajo: crece exactamente como *g(n)*. **Omega** cota por debajo (el mejor caso posible).",
    },
    {
      kind: "prose",
      id: "cx-classes",
      text:
        "Las clases más comunes, de más rápido a más lento:\n\n| Clase | Nombre | Ejemplo |\n| --- | --- | --- |\n| O(1) | constante | acceso por índice a un array |\n| O(log n) | logarítmico | búsqueda binaria |\n| O(n) | lineal | recorrer un array |\n| O(n log n) | linealítmico | merge sort, quicksort promedio |\n| O(n²) | cuadrático | bubble sort, insertion sort |\n| O(2ⁿ) | exponencial | recursión ingenua de Fibonacci |",
    },
    {
      kind: "prose",
      id: "cx-space",
      text:
        "También medimos **complejidad espacial**: cuánta memoria extra usa el algoritmo aparte de la entrada. Un algoritmo in-place usa O(1) espacio adicional; uno que crea una copia del array usa O(n).",
    },
    {
      kind: "divider",
      id: "cx-divider-1",
    },
    {
      kind: "prose",
      id: "cx-outro",
      text:
        "Cuando compares dos algoritmos, el que tenga menor orden de crecimiento ganará para entradas grandes, aunque para *n* pequeño el constante oculto pueda importar más.",
    },
  ],
};

/**
 * Capítulo 3 — Hash Tables
 */
export const hashTablesChapter: ChapterContent = {
  id: "hash-tables",
  num: 3,
  title: "Hash Tables",
  blurb:
    "Mapear claves a valores con funciones de hash — y qué pasa cuando dos claves colisionan.",
  blocks: [
    {
      kind: "prose",
      id: "ht-intro",
      text:
        "Una **tabla hash** guarda pares (clave, valor) y permite buscar, insertar y borrar en **tiempo promedio O(1)**. La idea: una función de hash convierte la clave en un índice del array donde se guarda el valor.",
    },
    {
      kind: "formula",
      id: "ht-hash",
      latex: "h(k) = k \\bmod m",
    },
    {
      kind: "prose",
      id: "ht-hash-text",
      text:
        "La función de hash debe ser rápida y distribuir las claves uniformemente. Si dos claves distintas dan el mismo índice, ocurre una **colisión** y hay que resolverla.",
    },
    {
      kind: "prose",
      id: "ht-collision",
      text:
        "Hay dos estrategias clásicas:\n\n1. **Encadenamiento (chaining):** cada casilla del array es una lista; las colisiones se apilan en la misma casilla.\n2. **Direccionamiento abierto (open addressing):** si la casilla está ocupada, se prueba la siguiente según una secuencia (sondeo lineal, cuadrático, doble hash).",
    },
    {
      kind: "prose",
      id: "ht-load-factor",
      text:
        "El **factor de carga** α = n / m (elementos / tamaño del array) determina el rendimiento. Cuando α crece demasiado, se aplica un **rehashing**: se crea un array más grande (normalmente el doble) y se reinsertan todos los elementos.",
    },
    {
      kind: "viz",
      id: "ht-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "12, 44, 13, 88, 23, 94, 11, 39, 20, 16", target: "23" },
    },
    {
      kind: "prose",
      id: "ht-outro",
      text:
        "En el peor caso (todas las claves colisionan), una tabla hash degenera a O(n). Una buena función de hash y un factor de carga bajo evitan eso en la práctica.",
    },
  ],
};

/**
 * Capítulo 4 — Search
 */
export const searchChapter: ChapterContent = {
  id: "search",
  num: 4,
  title: "Search",
  blurb: "Lineal y binario: encontrar un elemento lo antes posible.",
  blocks: [
    {
      kind: "prose",
      id: "search-intro",
      text:
        "Buscar un valor en una colección es una operación fundamental. La estrategia depende de si los datos están ordenados o no.",
    },
    {
      kind: "prose",
      id: "search-linear",
      text:
        "**Búsqueda lineal:** recorre el array de principio a fin comparando cada elemento. Funciona en arrays desordenados, pero cuesta O(n) en el peor caso.",
    },
    {
      kind: "viz",
      id: "search-linear-viz",
      type: "array",
      config: { op: "lookup", array: "4, 1, 7, 3, 9, 2", target: "7" },
    },
    {
      kind: "prose",
      id: "search-binary",
      text:
        "**Búsqueda binaria:** requiere el array **ordenado**. Cada paso compara el valor medio y descarta la mitad que no puede contener el objetivo, así que el espacio se reduce a la mitad en cada paso: O(log n).",
    },
    {
      kind: "formula",
      id: "search-binary-f",
      latex: "T(n) = T(n/2) + O(1) \\implies T(n) = O(\\log n)",
    },
    {
      kind: "prose",
      id: "search-binary-text",
      text:
        "Si el valor buscado es menor que el medio, buscamos en la mitad izquierda; si es mayor, en la derecha. Repetimos hasta encontrar el valor o agotar el rango.",
    },
    {
      kind: "divider",
      id: "search-divider-1",
    },
    {
      kind: "prose",
      id: "search-comparison",
      text:
        "| Método | Requisito | Peor caso | Mejor caso |\n| --- | --- | --- | --- |\n| Lineal | ninguno | O(n) | O(1) |\n| Binario | array ordenado | O(log n) | O(1) |",
    },
  ],
};
