/**
 * Fase A — barras con interpolación.
 * Entre el cuadro actual y el siguiente, cada altura se interpola
 * linealmente según `blend`: los valores se deslizan en vez de saltar.
 * El color cambia a mitad del fundido para marcar el nuevo estado.
 */
import { COLORS, colorFor, type VizFrame } from "./ArrayBarViz";

interface Props {
  curr: VizFrame;
  next: VizFrame;
  blend: number;
}

export default function FluidBars({ curr, next, blend }: Props) {
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

  return (
    <div>
      <div className="bars">
        {values.map((v, i) => {
          const alive = i < curr.array.length || i < (next?.array.length ?? 0);
          const h = !alive || v <= 0 ? 0 : (v / max) * 88 + 8;
          const label =
            i < labelFrame.array.length ? labelFrame.array[i] : undefined;
          return (
            <div className="bar-slot" key={i}>
              <div
                className="bar"
                style={{
                  height: `${h}%`,
                  backgroundColor: colorFor(i, colorFrame),
                }}
              >
                {showValues && label !== undefined && <span className="bar-val">{label}</span>}
              </div>
              {showIndices && <span className="bar-idx">{i}</span>}
            </div>
          );
        })}
      </div>
      <div className="legend">
        <span className="chip"><i style={{ background: COLORS.compare }} /> comparando</span>
        <span className="chip"><i style={{ background: COLORS.swap }} /> intercambio / desplazando</span>
        <span className="chip"><i style={{ background: COLORS.cursor }} /> cursor / clave</span>
        <span className="chip"><i style={{ background: COLORS.settled }} /> posición final</span>
        <span className="chip"><i style={{ background: COLORS.found }} /> encontrado</span>
      </div>
    </div>
  );
}
