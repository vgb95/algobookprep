/**
 * Celdas de memoria para arrays (estilo cartesian).
 *
 * Slots uniformes (¡no barras!): un array es memoria contigua, todas las
 * casillas miden lo mismo. Las celdas son tarjetas con el valor centrado
 * y el índice debajo; entre cuadros se deslizan interpolando por
 * identidad (id) con `blend`, así el movimiento es físico, no un salto.
 * El hueco (insert/delete) se ve punteado y lo rellena la celda que
 * llega deslizándose.
 */
import type { ArrayFrame, CellStatus } from "../../algorithms/arrays";
import { ROLE } from "./roles";

interface Props {
  curr: ArrayFrame;
  next?: ArrayFrame;
  blend?: number;
}

const TINTS: Record<CellStatus, { bg: string; border: string }> = {
  probe: { bg: "#efe7d7", border: "#d8ccb2" },
  cursor: { bg: "#f3ecfe", border: ROLE.key },
  shift: { bg: "#fde7e0", border: ROLE.swap },
  found: { bg: "#e2f5ec", border: ROLE.found },
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const GAP_PX = 10;

export default function ArrayCells({ curr, next, blend = 0 }: Props) {
  const slotCount = (f: ArrayFrame) => {
    const maxSlot = f.cells.reduce((m, c) => Math.max(m, c.slot), -1);
    return Math.max(maxSlot + 1, (f.hole ?? -1) + 1);
  };
  const n = Math.max(slotCount(curr), next ? slotCount(next) : 0);
  if (n === 0) return <div className="empty-tree">Array vacío.</div>;

  const cellW = `calc((100% - ${(n - 1) * GAP_PX}px) / ${n})`;
  const left = (slot: number) =>
    `calc(${slot} * ((100% - ${(n - 1) * GAP_PX}px) / ${n} + ${GAP_PX}px))`;

  // Identidades presentes en cualquiera de los dos cuadros.
  const currById = new Map(curr.cells.map((c) => [c.id, c]));
  const nextById = new Map((next?.cells ?? []).map((c) => [c.id, c]));
  const ids = Array.from(new Set([...currById.keys(), ...nextById.keys()])).sort(
    (a, b) => (currById.get(a)?.slot ?? nextById.get(a)!.slot) - (currById.get(b)?.slot ?? nextById.get(b)!.slot),
  );

  // El estado visual cambia a mitad del fundido (como FluidBars).
  const statusFrame = blend > 0.5 && next ? next : curr;

  const holeNow = (blend > 0.5 && next ? next : curr).hole;
  const holeVisible = holeNow !== undefined;

  return (
    <div className="cells" role="img" aria-label={`Array de ${n} casillas`}>
      {/* slots (memoria contigua, punteada si están vacíos) */}
      {Array.from({ length: n }, (_, i) => (
        <div
          key={`slot-${i}`}
          className="slot"
          style={{ left: left(i), width: cellW }}
        />
      ))}

      {/* celdas */}
      {ids.map((id) => {
        const a = currById.get(id);
        const b = nextById.get(id);
        if (!a && !b) return null;
        const slotA = a?.slot;
        const slotB = b?.slot;
        // Solo en un cuadro → nace (fade in) o desaparece (fade out).
        const anchorSlot = (slotA ?? slotB)!;
        const slot =
          slotA !== undefined && slotB !== undefined
            ? lerp(slotA, slotB, blend)
            : anchorSlot;
        const opacity =
          slotA !== undefined && slotB !== undefined
            ? 1
            : slotA !== undefined
              ? 1 - blend
              : blend;
        const value = (a ?? b)!.value;
        const status: CellStatus | undefined = statusFrame.status?.[String(id)];
        const tint = status ? TINTS[status] : null;
        const fs = n <= 12 ? "1.05rem" : n <= 16 ? "0.9rem" : "0.78rem";
        return (
          <div
            key={`cell-${id}`}
            className="acell"
            style={{
              left: left(slot),
              width: cellW,
              opacity,
              background: tint ? tint.bg : "#ffffff",
              borderColor: tint ? tint.border : "var(--line)",
              fontSize: fs,
            }}
          >
            {value}
          </div>
        );
      })}

      {/* índices */}
      {Array.from({ length: n }, (_, i) => (
        <span
          key={`idx-${i}`}
          className="slot-idx"
          style={{ left: left(i), width: cellW }}
        >
          {i}
        </span>
      ))}

      {/* etiqueta del hueco */}
      {holeVisible && (
        <span
          className="hole-tag"
          style={{ left: left(holeNow!), width: cellW }}
        >
          hueco
        </span>
      )}
    </div>
  );
}
