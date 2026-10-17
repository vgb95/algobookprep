/**
 * Barras con interpolación por IDENTIDAD (estilo cartesian).
 *
 * Cada elemento lleva id: entre el cuadro actual y el siguiente casamos
 * las tarjetas por id y interpolamos su slot — al intercambiar, las dos
 * barras SE DESLIZAN cruzándose (la que va a la derecha sube, la que va
 * a la izquierda baja) en lugar de fundirse en su sitio. La clave
 * levantada del insertion sort flota sobre el hueco punteado.
 *
 * El color cambia a mitad del fundido (blend 0.5) como el resto del
 * motor; el tamaño/borde del movimiento se ancla por identidad.
 */
import type { CSSProperties } from "react";
import type { SortCell, SortFrame, SortStatus } from "../../algorithms/sorting";
import { ROLE } from "./roles";

interface Props {
  curr: SortFrame;
  next?: SortFrame;
  blend?: number;
  /** Punteros (i, j, min…) sobre los slots — variables vivas en la viz. */
  markers?: BarMarker[];
}

const TINTS: Record<SortStatus, string> = {
  compare: ROLE.compare,
  move: ROLE.swap,
  key: ROLE.key,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const GAP_PX = 10;

export interface BarMarker {
  /** Slot (índice) del array donde anclar el puntero. */
  index: number;
  label: string;
  color?: string;
}

export default function FluidBars({ curr, next, blend = 0, markers = [] }: Props) {
  const spanRows = (f: SortFrame) => {
    const maxSlot = f.cells.reduce((m, c) => Math.max(m, c.slot), -1);
    return Math.max(maxSlot + 1, (f.hole ?? -1) + 1);
  };
  const n = Math.max(spanRows(curr), next ? spanRows(next) : 0);
  if (n === 0) return <div className="empty-tree">Array vacío.</div>;

  const cellW = `calc((100% - ${(n - 1) * GAP_PX}px) / ${n})`;
  const left = (slot: number) =>
    `calc(${slot} * ((100% - ${(n - 1) * GAP_PX}px) / ${n} + ${GAP_PX}px))`;

  const currById = new Map<number, SortCell>(curr.cells.map((c) => [c.id, c]));
  const nextById = new Map<number, SortCell>((next?.cells ?? []).map((c) => [c.id, c]));
  const ids = Array.from(new Set([...currById.keys(), ...nextById.keys()])).sort(
    // orden por posición futura para que el DOM quede estable
    (a, b) => (nextById.get(a)?.slot ?? currById.get(a)!.slot) - (nextById.get(b)?.slot ?? currById.get(b)!.slot),
  );

  const max = Math.max(...curr.cells.map((c) => c.value), ...(next?.cells ?? []).map((c) => c.value), 1);
  const statusFrame = blend > 0.5 && next ? next : curr;

  // Zona ordenada contigua (prefijo o sufijo de slots).
  const zone = statusFrame.settled;
  const zMin = zone.length ? Math.min(...zone) : null;
  const zMax = zone.length ? Math.max(...zone) : null;
  const inZone = (slot: number) => zMin !== null && slot >= zMin && slot <= zMax!;

  const showValues = n <= 16;
  const showIndices = n <= 20;

  const marksBySlot = new Map<number, BarMarker[]>();
  for (const m of markers) {
    if (m.index < 0 || m.index >= n) continue;
    if (!marksBySlot.has(m.index)) marksBySlot.set(m.index, []);
    marksBySlot.get(m.index)!.push(m);
  }

  return (
    <div>
      <div className="bars" role="img" aria-label={`Ordenación de ${n} elementos`}>
        {zMin !== null && (
          <div
            className="sorted-zone"
            style={{
              left: left(zMin),
              width: `calc(${zMax! - zMin} * ((100% - ${(n - 1) * GAP_PX}px) / ${n} + ${GAP_PX}px) + (100% - ${(n - 1) * GAP_PX}px) / ${n})`,
            }}
          />
        )}

        {ids.map((id) => {
          const a = currById.get(id);
          const b = nextById.get(id);
          if (!a && !b) return null;
          const sA = a?.slot;
          const sB = b?.slot;
          const anchor = (sA ?? sB)!;
          const slot =
            sA !== undefined && sB !== undefined ? lerp(sA, sB, blend) : anchor;
          const opacity =
            sA !== undefined && sB !== undefined ? 1 : sA !== undefined ? 1 - blend : blend;
          // En frames de algoritmo el valor por identidad es constante;
          // en arrays de trazas (CodePlayground) el valor por slot cambia:
          // fundimos altura y etiqueta entre cuadros.
          const vA = a?.value ?? 0;
          const vB = b?.value ?? vA;
          const h = (Math.max(lerp(vA, vB, blend), 0) / max) * 84 + 8;
          const value = blend > 0.5 && next ? (nextById.get(id)?.value ?? (a ?? b)!.value) : (a ?? b)!.value;

          const status = statusFrame.status?.[String(id)];
          const color = status ? TINTS[status] : inZone(Math.round(sB ?? sA ?? anchor)) ? ROLE.settled : ROLE.base;

          // deslizamiento: cruce en zigzag (sube quien va a la derecha)
          const stA = curr.status?.[String(id)];
          const stB = next?.status?.[String(id)];
          const moving = stA === "move" || stB === "move";
          const dir = moving && sA !== undefined && sB !== undefined ? (sB > sA ? -12 : 12) : 0;
          const steady = moving && stA === stB ? 1 : Math.sin(Math.PI * blend);
          const lively = stA === "key" || stB === "key";
          const keyLift = lively ? (stA === stB ? 1 : Math.sin(Math.PI * blend)) : 0;
          const y = dir * steady - 20 * keyLift;

          const fs = n <= 12 ? "0.72rem" : "0.62rem";
          return (
            <div
              key={`bar-${id}`}
              className="bar"
              style={{
                left: left(slot),
                width: cellW,
                height: `${h}%`,
                backgroundColor: color,
                transform: `translateY(${y}px)`,
                opacity,
              }}
            >
              {marksBySlot.has(Math.round(slot)) && (
                <span
                  className="bar-ptr"
                  style={{ "--ptr": marksBySlot.get(Math.round(slot))![0].color ?? ROLE.key } as CSSProperties}
                  title={marksBySlot.get(Math.round(slot))!.map((m) => m.label).join(", ")}
                >
                  {marksBySlot.get(Math.round(slot))!.map((m) => m.label).join("/")}
                </span>
              )}
              {showValues && <span className="bar-val" style={{ fontSize: fs }}>{value}</span>}
            </div>
          );
        })}

        {showIndices &&
          Array.from({ length: n }, (_, i) => (
            <span
              key={`bidx-${i}`}
              className="bar-idx"
              style={{
                left: left(i),
                width: cellW,
                color: inZone(i) ? ROLE.settled : undefined,
              }}
            >
              {i}
            </span>
          ))}

        {statusFrame.hole !== undefined && (
          <div
            className="bar-hole"
            style={{ left: left(statusFrame.hole), width: cellW }}
          />
        )}
      </div>
      <div className="legend">
        <span className="chip"><i style={{ background: ROLE.compare }} /> comparando</span>
        <span className="chip"><i style={{ background: ROLE.swap }} /> intercambio / desplazando</span>
        <span className="chip"><i style={{ background: ROLE.key }} /> clave levantada / mínimo</span>
        <span className="chip"><i style={{ background: ROLE.settled }} /> posición final</span>
      </div>
    </div>
  );
}
