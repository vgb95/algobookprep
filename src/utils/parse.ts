export function parseArray(raw: string): number[] | null {
  const tokens = raw
    .split(/[,;\s]+/)
    .filter(Boolean)
    .map((t) => Number.parseInt(t, 10));
  if (tokens.length === 0 || tokens.some(Number.isNaN)) return null;
  const clamped = tokens.map((t) => Math.min(99, Math.max(1, t)));
  if (clamped.length > 20) return null;
  return clamped;
}

export function clampInt(raw: string, lo: number, hi: number, fallback: number): number {
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(hi, Math.max(lo, n));
}

export const randomArray = (min: number, max: number) =>
  Array.from(
    { length: min + Math.floor(Math.random() * (max - min + 1)) },
    () => 1 + Math.floor(Math.random() * 99),
  );
