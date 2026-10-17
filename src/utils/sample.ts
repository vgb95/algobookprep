/**
 * Datasets procedurales (Fase 5): cada visualización embebida ofrece
 * botones para generar entradas interesantes — aleatorio, ordenado,
 * inverso, con duplicados, casi ordenado y extremos. Números 1–99
 * (el parser de arrays ya hace clamping defensivo).
 */

export type SampleKind =
  | "random"
  | "sorted"
  | "reversed"
  | "dups"
  | "almost"
  | "extremes";

export const SAMPLE_LABELS: Record<SampleKind, string> = {
  random: "aleatorio",
  sorted: "ordenado",
  reversed: "inverso",
  dups: "con duplicados",
  almost: "casi ordenado",
  extremes: "extremos",
};

const rand = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));

const sorted = (n: number): number[] =>
  Array.from({ length: n }, (_, i) =>
    Math.min(99, Math.max(1, Math.round(1 + (i * 98) / Math.max(n - 1, 1)))),
  );

export function sampleFor(kind: SampleKind, n = 8): number[] {
  const len = Math.min(Math.max(n, 2), 20);
  switch (kind) {
    case "sorted":
      return sorted(len);
    case "reversed":
      return sorted(len).slice().reverse();
    case "dups": {
      // pocas bases → colisiones garantizadas
      const base = [7, 3, 9, 1, 5];
      return Array.from({ length: len }, () => base[rand(0, base.length - 1)]);
    }
    case "almost": {
      const a = sorted(len);
      const i = rand(0, len - 2);
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
      return a;
    }
    case "extremes":
      return Array.from({ length: len }, (_, i) => (i % 2 ? 1 : 99));
    case "random":
    default:
      return Array.from({ length: len }, () => rand(1, 99));
  }
}

/** "0-1, 0-2, 2-3" → aristas dirigidas-no; clamped a [0, n). */
export function parseEdges(raw: string, n: number): [number, number][] {
  const out: [number, number][] = [];
  const seen = new Set<string>();
  const re = /(\d+)\s*-\s*(\d+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    const a = Math.min(Math.max(parseInt(m[1], 10), 0), n - 1);
    const b = Math.min(Math.max(parseInt(m[2], 10), 0), n - 1);
    if (a === b) continue;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push([a, b]);
  }
  return out;
}
