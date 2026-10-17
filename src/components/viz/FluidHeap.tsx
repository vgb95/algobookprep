/**
 * FluidHeap — montículo fluido (Fase 4).
 *
 * Cada tarjeta lleva identidad: entre cuadros se interpola su CASILLA y
 * por tanto su posición en el árbol — al hacer sift-up la tarjeta VUELA
 * de nivel en nivel (línea recta hacia su padre) en lugar de saltar.
 * Las aristas se dibujan de verdad de la estructura (padre de i:
 * ⌊(i-1)/2⌋) y se iluminan: ámbar al comparar, rojo al intercambiar.
 */
import type { HeapCard, HeapFrame } from "../../algorithms/heap";
import { ROLE } from "./roles";

interface Props {
  curr: HeapFrame;
  next?: HeapFrame;
  blend?: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Posición completa: profundidad y columna desde la casilla i. */
function slotXY(slot: number, width: number, levelGap: number) {
  const depth = Math.floor(Math.log2(slot + 1));
  const k = slot + 1 - (1 << depth); // índice dentro del nivel
  const span = 1 << depth;           // casillas en ese nivel
  return {
    x: ((k + 0.5) / span) * width,
    y: 54 + depth * levelGap,
    depth,
  };
}

export default function FluidHeap({ curr, next, blend = 0 }: Props) {
  const n = Math.max(
    curr.cards.length,
    next?.cards.length ?? 0,
  );
  if (n === 0) return <div className="empty-tree">Montículo vacío.</div>;

  const maxDepth = Math.floor(Math.log2(Math.max(n - 1, 0)) + 1e-9) + 1;
  const levelGap = 74;
  const height = 56 + maxDepth * levelGap + 64;
  const width = 700;

  const currById = new Map<number, HeapCard>(curr.cards.map((c) => [c.id, c]));
  const nextById = new Map<number, HeapCard>((next?.cards ?? []).map((c) => [c.id, c]));
  const ids = Array.from(new Set([...currById.keys(), ...nextById.keys()])).sort(
    (a, b) => (nextById.get(a)?.slot ?? currById.get(a)!.slot) - (nextById.get(b)?.slot ?? currById.get(b)!.slot),
  );

  const statusFrame = blend > 0.5 && next ? next : curr;
  const radius = 21;
  const posOf = (slot: number) => slotXY(slot, width, levelGap);

  // aristas estructurales (verticales sobre casillas existentes en frame)
  const structuralEdges: Array<{ from: number; to: number; hot: 0 | 1 | 2 }> = [];
  for (let s = 1; s < n; s++) {
    const p = Math.floor((s - 1) / 2);
    const isCompare = statusFrame.compare?.[0] === p && (statusFrame.compare?.[1] === s);
    const isSwap = statusFrame.swap?.[0] === p && statusFrame.swap?.[1] === s;
    structuralEdges.push({ from: p, to: s, hot: isSwap ? 2 : isCompare ? 1 : 0 });
  }

  // estado por TARJETA (color sigue al elemento, no a la casilla)
  const cardColor = (id: number): { fill: string; stroke: string } => {
    const f = statusFrame;
    const atSlot = (s: number | undefined) => f.cards.find((c) => c.slot === s)?.id;
    if (f.swap && (atSlot(f.swap[0]) === id || atSlot(f.swap[1]) === id)) {
      return { fill: ROLE.swap, stroke: ROLE.ink };
    }
    if (f.compare && (atSlot(f.compare[0]) === id || atSlot(f.compare[1]) === id)) {
      return { fill: ROLE.compare, stroke: ROLE.ink };
    }
    if (f.current !== undefined && atSlot(f.current) === id) {
      return { fill: ROLE.current, stroke: ROLE.ink };
    }
    return { fill: ROLE.key, stroke: ROLE.ink };
  };

  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ background: "#fffdf8", border: "1px solid var(--line)", borderRadius: "10px", maxWidth: "100%", height: "auto" }}
        className="heap-svg fluid"
        role="img"
        aria-label="Montículo binario máximo"
      >
        {/* aristas padre→hijo */}
        {structuralEdges.map((e, i) => {
          const a = posOf(e.from);
          const b = posOf(e.to);
          const color = e.hot === 2 ? ROLE.swap : e.hot === 1 ? ROLE.compare : ROLE.edge;
          const sw = e.hot > 0 ? 3.5 : 2;
          return (
            <line
              key={`he-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={color}
              strokeWidth={sw}
              className={e.hot > 0 ? "heap-edge-hot" : undefined}
            />
          );
        })}

        {/* tarjetas (interpola posición por identidad) */}
        {ids.map((id) => {
          const a = currById.get(id);
          const b = nextById.get(id);
          if (!a && !b) return null;
          const sA = a?.slot;
          const sB = b?.slot;
          const anchor = (sA ?? sB)!;
          const slot = sA !== undefined && sB !== undefined ? lerp(sA, sB, blend) : anchor;
          const opacity =
            sA !== undefined && sB !== undefined ? 1 : sA !== undefined ? 1 - blend : blend;
          const value = (a ?? b)!.value;
          const pa = posOf(slot);
          const { fill, stroke } = cardColor(id);
          return (
            <g key={`hc-${id}`} opacity={opacity}>
              <circle cx={pa.x} cy={pa.y} r={radius} fill={fill} stroke={stroke} strokeWidth="2" className="heap-card" />
              <text
                x={pa.x}
                y={pa.y + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize={14}
                fontWeight={700}
                fontFamily="var(--font-mono)"
              >
                {value}
              </text>
              <text x={pa.x} y={pa.y + radius + 13} textAnchor="middle" fill="#b3a68a" fontSize={10} fontFamily="var(--font-mono)">
                {Math.round(slot)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="tree-legend">
        <span className="chip"><i style={{ background: ROLE.compare }} /> comparando</span>
        <span className="chip"><i style={{ background: ROLE.swap }} /> intercambio</span>
        <span className="chip"><i style={{ background: ROLE.current }} /> actual</span>
      </div>
    </div>
  );
}
