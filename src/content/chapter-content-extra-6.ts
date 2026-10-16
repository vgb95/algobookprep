import { ChapterContent } from "./blocks";

/**
 * Capítulo 21 — Backtracking
 */
export const backtrackingChapter: ChapterContent = {
  id: "backtracking",
  num: 21,
  title: "Backtracking",
  blurb:
    "Recorrer el espacio de soluciones con poda por satisfacción de restricciones.",
  blocks: [
    {
      kind: "prose",
      id: "bt-intro",
      text:
        "**Backtracking** es una búsqueda sistemática por el espacio de soluciones. Construye una solución paso a paso; si en algún punto detecta que no puede llevar a una solución válida (constraint), retrocede (*backtrack*) y prueba otra rama.",
    },
    {
      kind: "prose",
      id: "bt-uses",
      text:
        "Problemas clásicos:\n- **N reinas:** colocar N reinas en un tablero sin que se ataquen.\n- **Sudoku:** rellenar el tablero respetando filas, columnas y bloques.\n- **Laberintos:** encontrar una salida probando caminos y retrocediendo en callejones sin salida.\n- **Subconjuntos y permutaciones:** generar todas las combinaciones posibles.",
    },
    {
      kind: "formula",
      id: "bt-complexity",
      latex: "peor\\_caso: O(b^d) \\quad b = \\text{ramificacion},\\; d = \\text{profundidad}",
    },
    {
      kind: "prose",
      id: "bt-pruning",
      text:
        "La **poda** es lo que hace viable el backtracking: al detectar temprano que una rama parcial no puede ser solución, se descarta todo su subárbol de una vez, reduciendo drásticamente el espacio explorado.",
    },
    {
      kind: "viz",
      id: "bt-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 3, 4, 5", target: "3" },
    },
  ],
};

/**
 * Capítulo 22 — Bit Operations
 */
export const bitOpsChapter: ChapterContent = {
  id: "bit-operations",
  num: 22,
  title: "Bit Operations",
  blurb:
    "Máscaras, XOR y desplazamientos: trucos low-level de optimización.",
  blocks: [
    {
      kind: "prose",
      id: "bit-intro",
      text:
        "Las **operaciones a nivel de bit** trabajan directamente sobre la representación binaria de los números. Son muy rápidas (una instrucción de CPU) y permiten trucos de optimización que parecen magia.",
    },
    {
      kind: "prose",
      id: "bit-ops",
      text:
        "Operaciones fundamentales:\n- **AND (&):** máscara para apagar bits.\n- **OR (|):** máscara para encender bits.\n- **XOR (^):** invierte bits donde la máscara es 1; x ^ x = 0 y x ^ 0 = x.\n- **NOT (~):** invierte todos los bits.\n- **Desplazamientos (<<, >>):** multiplican o dividen por potencias de 2.",
    },
    {
      kind: "formula",
      id: "bit-xor",
      latex: "x \\oplus 0 = x \\quad x \\oplus x = 0 \\quad x \\oplus y \\oplus y = x",
    },
    {
      kind: "prose",
      id: "bit-tricks",
      text:
        "Trucos útiles:\n- `x & (x - 1)` borra el bit 1 menos significativo.\n- `x & -x` aísla el bit 1 menos significativo.\n- `x ^= y; y ^= x; x ^= y` intercambia dos variables sin variable temporal.\n- Para comprobar si un número es potencia de 2 (con x > 0): `x & (x - 1) == 0`.",
    },
    {
      kind: "viz",
      id: "bit-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 4, 8, 16, 32", target: "8" },
    },
    {
      kind: "prose",
      id: "bit-outro",
      text:
        "Se usan en compresión, criptografía, gráficos, sistemas embebidos y optimización de algoritmos donde cada ciclo de CPU cuenta.",
    },
  ],
};
