/**
 * Renderizador de grafo con SVG.
 * Nodos en círculo; aristas como líneas; colores por estado de visita.
 */
import type { GraphFrame } from "../../algorithms/graph";

export default function GraphViz({ frame }: { frame: GraphFrame }) {
  const { nodes, edges } = frame;
  if (nodes.length === 0) return <div className="empty-tree">Grafo vacío.</div>;

  const width = 640;
  const height = 340;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 180;
  const nodeR = 22;

  const positions = nodes.map((_, i: number) => {
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / nodes.length;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  const posById = new Map<number, { x: number; y: number }>();
  nodes.forEach((n: typeof nodes[number], i: number) => posById.set(n.id, positions[i]));

  return (
    <div>
      <svg width={width} height={height} style={{ background: "#fffdf8", border: "1px solid var(--line)", borderRadius: "10px" }} className="graph-svg">
        {edges.map((e: typeof edges[number], i: number) => {
          const p1 = posById.get(e.from)!;
          const p2 = posById.get(e.to)!;
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={e.active ? "#e8543f" : "#c9c3b8"}
              strokeWidth={e.active ? 3 : 2}
            />
          );
        })}
        {nodes.map((n: typeof nodes[number], i: number) => {
          const p = positions[i];
          const fill = n.current ? "#e8543f" : n.visited ? "#22c55e" : "#f59e0b";
          return (
            <g key={n.id}>
              <circle cx={p.x} cy={p.y} r={nodeR} fill={fill} stroke="#2b2926" strokeWidth="2" />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700} fontFamily="var(--font-mono)">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="graph-info">
        <span className="chip"><i style={{ background: "#e8543f" }} /> actual</span>
        <span className="chip"><i style={{ background: "#22c55e" }} /> visitado</span>
        <span className="chip"><i style={{ background: "#f59e0b" }} /> pendiente</span>
        <span className="chip"><i style={{ background: "#f59e0b", opacity: 0.4 }} /> en cola/pila</span>
      </div>
    </div>
  );
}
