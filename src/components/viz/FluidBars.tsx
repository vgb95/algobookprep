/**
 * Fase A — barras con interpolación.
 * Entre el cuadro actual y el siguiente, cada altura se interpola
 * linealmente según `blend`: los valores se deslizan en vez de saltar.
 * El color cambia a mitad del fundido para marcar el nuevo estado.
 */
import type { CSSProperties } from "react";
import { colorFor, type VizFrame } from "./ArrayBarViz";
import { ROLE } from "./roles";

export interface BarMarker {
  index: number;
  label: string;
  color?: string;
}

interface Props {
  curr: VizFrame;
  next: VizFrame;
  blend: number;
  /** Punteros (i, j, min…) sobre las casillas. Se agrupan por índice. */
  markers?: BarMarker[];
}

export default function FluidBars({ curr, next, blend, markers = [] }: Props) {
  const n = Math.max(curr.array.length, next?.array.length ?? 0);
  const values = Array.from(
    { length: n },
    (_, i) =>
      (curr.array[i] ?? 0) + ((next?.array[i] ?? 0) - (curr.array[i] ?? 0)) * blend,
  );
  const max = Math.max(...curr.array, ...(next?.array ?? []), 1);
  const showValues = n <= 16;
  const showIndices = n <= 20;
  const colorFrame = blend > 0.5 && next ? next : curr;
  const labelFrame = blend > 0.5 && next ? next : curr;

  const marksByIndex = new Map<number, BarMarker[]>();
  for (const m of markers) {
    if (m.index < 0 || m.index >= n) continue;
    if (!marksByIndex.has(m.index)) marksByIndex.set(m.index, []);
    marksByIndex.get(m.index)!.push(m);
  }

  return (
    <div>
      <div className="bars">
        {values.map((v, i) => {
          const alive = i < curr.array.length || i < (next?.array.length ?? 0);
          const h = !alive || v <= 0 ? 0 : (v / max) * 88 + 8;
          const label =
            i < labelFrame.array.length ? labelFrame.array[i] : undefined;
          const marks = marksByIndex.get(i);
          return (
            <div className="bar-slot" key={i}>
              <div
                className="bar"
                style={{
                  height: `${h}%`,
                  backgroundColor: colorFor(i, colorFrame),
                }}
              >
                {marks && (
                  <span
                    className="bar-ptr"
                    style={{ "--ptr": marks[0].color ?? ROLE.key } as CSSProperties}
                    title={marks.map((m) => m.label).join(", ")}
                  >
                    {marks.map((m) => m.label).join("/")}
                  </span>
                )}
                {showValues && label !== undefined && <span className="bar-val">{label}</span>}
              </div>
              {showIndices && <span className="bar-idx">{i}</span>}
            </div>
          );
        })}
      </div>
      <div className="legend">
        <span className="chip"><i style={{ background: ROLE.compare }} /> comparando</span>
        <span className="chip"><i style={{ background: ROLE.swap }} /> intercambio / desplazando</span>
        <span className="chip"><i style={{ background: ROLE.key }} /> cursor / clave</span>
        <span className="chip"><i style={{ background: ROLE.settled }} /> posición final</span>
        <span className="chip"><i style={{ background: ROLE.found }} /> encontrado</span>
      </div>
    </div>
  );
}
