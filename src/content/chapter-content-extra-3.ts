import { ChapterContent } from "./blocks";

/**
 * Capítulo 9 — Stacks
 */
export const stacksChapter: ChapterContent = {
  id: "stacks",
  num: 9,
  title: "Stacks",
  blurb:
    "LIFO: undo/redo, el call stack y cómo evaluar expresiones anidadas.",
  blocks: [
    {
      kind: "prose",
      id: "st-intro",
      text:
        "Una **pila (stack)** es una estructura LIFO (Last-In, First-Out): el último elemento en entrar es el primero en salir. Tiene dos operaciones principales: *push* (añadir al tope) y *pop* (quitar del tope), ambas O(1).",
    },
    {
      kind: "prose",
      id: "st-uses",
      text:
        "Usos clásicos:\n- **Deshacer/rehacer (undo/redo):** cada acción se apila; deshacer saca la última.\n- **Call stack:** cuando una función llama a otra, el retorno se apila.\n- **Evaluar expresiones:** paréntesis balanceados y notación postfix (polaca inversa).",
    },
    {
      kind: "viz",
      id: "st-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "5, 3, 8, 1, 9", target: "8" },
    },
    {
      kind: "prose",
      id: "st-balanced",
      text:
        "Para verificar paréntesis balanceados: recorre la cadena; si abres `(` apílala; si cierras `)`, desapila y comprueba que coincida. Si al final la pila está vacía y nunca hubo desajuste, está balanceada.",
    },
    {
      kind: "formula",
      id: "st-complexity",
      latex: "push, pop, peek \\in O(1) \\quad \\text{espacio: } O(n)",
    },
  ],
};

/**
 * Capítulo 10 — Queues
 */
export const queuesChapter: ChapterContent = {
  id: "queues",
  num: 10,
  title: "Queues",
  blurb:
    "FIFO y BFS: buffers, schedulers y colas de prioridad.",
  blocks: [
    {
      kind: "prose",
      id: "qu-intro",
      text:
        "Una **cola (queue)** es una estructura FIFO (First-In, First-Out): el primero en entrar es el primero en salir. Operaciones: *enqueue* (añadir al final) y *dequeue* (quitar del frente), ambas O(1) si se implementa con lista enlazada o array circular.",
    },
    {
      kind: "prose",
      id: "qu-uses",
      text:
        "Usos clásicos:\n- **BFS (búsqueda por anchura):** usa una cola para explorar nivel por nivel.\n- **Buffers y schedulers:** impresoras, llamadas telefónicas, tareas del sistema operativo.\n- **Colas de prioridad:** se atiende primero el de mayor prioridad (usualmente con un montículo/heap).",
    },
    {
      kind: "viz",
      id: "qu-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 3, 4, 5", target: "3" },
    },
    {
      kind: "prose",
      id: "qu-circular",
      text:
        "Una **cola circular** usa un array fijo con dos punteros (frente y fondo) que rodean el array. Cuando el fondo llega al final, vuelve al principio si hay hueco. Evita desplazar elementos al hacer dequeue.",
    },
    {
      kind: "formula",
      id: "qu-complexity",
      latex: "enqueue, dequeue \\in O(1) \\quad \\text{espacio: } O(n)",
    },
  ],
};

/**
 * Capítulo 11 — Recursion
 */
export const recursionChapter: ChapterContent = {
  id: "recursion",
  num: 11,
  title: "Recursion",
  blurb:
    "Divide y vencerás: casos base, árbol de llamadas y su coste real.",
  blocks: [
    {
      kind: "prose",
      id: "rec-intro",
      text:
        "La **recursión** es cuando una función se llama a sí misma con un problema más pequeño. Necesita un **caso base** que detenga la recursión, o se ejecutará para siempre (desbordamiento de pila).",
    },
    {
      kind: "prose",
      id: "rec-factorial",
      text:
        "Ejemplo clásico: el factorial de n.\n\nfactorial(n) = n × factorial(n-1), con factorial(0) = 1 como caso base.",
    },
    {
      kind: "formula",
      id: "rec-fact",
      latex: "n! = \\begin{cases} 1 & \\text{si } n = 0 \\\\ n \\cdot (n-1)! & \\text{si } n > 0 \\end{cases}",
    },
    {
      kind: "prose",
      id: "rec-fib",
      text:
        "La recursión ingenua de Fibonacci es el ejemplo de lo que puede salir mal: fib(n) = fib(n-1) + fib(n-2) recalcula los mismos valores una y otra vez, dando O(2ⁿ) tiempo. Cada llamada crea un árbol de llamadas que crece exponencialmente.",
    },
    {
      kind: "viz",
      id: "rec-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 1, 2, 3, 5, 8, 13", target: "5" },
    },
    {
      kind: "prose",
      id: "rec-outro",
      text:
        "Toda recursión se puede reescribir como iteración con una pila explícita. El compilador usa el *call stack* para recordar a qué volver después de cada llamada recursiva.",
    },
  ],
};
