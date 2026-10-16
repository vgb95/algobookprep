/**
 * Fase B — paleta única por rol semántico.
 * Todos los visualizadores (barras, árbol, grafo, montículo, canvas o
 * SVG) usan estos colores para el mismo significado: el rojo siempre
 * es "actual/en acción", el verde "resuelto", etc. Es el lenguaje
 * visual que hace que todo parezca una sola app.
 */
export const ROLE = {
  /** Nodo/barra protagonista del paso actual. */
  current: "#e8543f",
  /** Comparando / candidato. */
  compare: "#f59e0b",
  /** Intercambio o desplazamiento. */
  swap: "#ef4444",
  /** Clave insertada / cursor / elemento actual secundario. */
  key: "#a855f7",
  /** Encontrado. */
  found: "#06b6d4",
  /** Posición final / visitado / resuelto. */
  settled: "#22c55e",
  /** Pendiente de visitar. */
  pending: "#f59e0b",
  /** Neutro. */
  base: "#9ba6b5",
  /** Tinta y aristas. */
  ink: "#2b2926",
  edge: "#c9c3b8",
} as const;

export type Role = keyof typeof ROLE;
