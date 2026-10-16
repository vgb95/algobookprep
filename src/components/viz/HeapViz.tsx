/**
 * Renderizador de montículo binario con SVG (estilo árbol de heap).
 * Índice i -> hijo izquierdo 2i+1, derecho 2i+2.
 */
import type { HeapFrame } from "../../algorithms/heap";

export default function HeapViz({ frame }: { frame: HeapFrame }) {
  const { heap } = frame;
  if (heap.length === 0) {
    return <div className="empty-tree">Montículo vacío.</div>;
  }

  const width = 640;
  const height = 320;
  const radius = 20;

  const positions: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < heap.length; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const indexInLevel = i - (2 ** level - 1);
    const countInLevel = Math.min(2 ** level, heap.length - (2 ** level - 1));
    const x = 60 + (indexInLevel / Math.max(countInLevel - 1, 1)) * (width - 120);
    const y = 50 + level * 80;
    positions.push({ x, y });
  }

  const edges: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let i = 0; i < heap.length; i++) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < heap.length) {
      edges.push({ x1: positions[i].x, y1: positions[i].y + radius, x2: positions[l].x, y2: positions[l].y - radius });
    }
    if (r < heap.length) {
      edges.push({ x1: positions[i].x, y1: positions[i].y + radius, x2: positions[r].x, y2: positions[r].y - radius });
    }
  }

  const isSwap = frame.swap ? new Set(frame.swap) : null;
  const isCompare = frame.compare ? new Set(frame.compare) : null;

  return (
    <div>
      <svg width={width} height={height} style={{ background: "#fffdf8", border: "1px solid var(--line)", borderRadius: "10px" }} className="heap-svg">
        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#c9c3b8" strokeWidth="2" />
        ))}
        {heap.map((v: number, i: number) => {
          const p = positions[i];
          let fill = "#f59e0b";
          if (isSwap && isSwap.has(i)) fill = "#e8543f";
          else if (isCompare && isCompare.has(i)) fill = "#f59e0b";
          else if (frame.current === i) fill = "#a855f7";
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={radius} fill={fill} stroke="#2b2926" strokeWidth="2" />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700} fontFamily="var(--font-mono)">
                {v}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="heap-legend">
        <span className="chip"><i style={{ background: "#e8543f" }} /> intercambio</span>
        <span className="chip"><i style={{ background: "#a855f7" }} /> actual</span>
        <span className="chip"><i style={{ background: "#f59e0b" }} /> nodo</span>
      </div>
    </div>
  );
}
