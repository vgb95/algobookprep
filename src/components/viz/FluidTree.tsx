/**
 * Fase A — árbol fluido: misma disposición que TreeViz pero los
 * cambios de estado funden color (transición CSS) y el nodo actual
 * lleva un anillo pulsante. En recorridos el conjunto de nodos es
 * estable, así que no hay saltos de posición.
 */
import type { TreeFrame } from "../../algorithms/binary-tree";
import { layoutTree, nodeFill } from "./treeLayout";
import { ROLE } from "./roles";

export default function FluidTree({ frame }: { frame: TreeFrame }) {
  const { nodes } = frame;
  if (nodes.length === 0) {
    return <div className="empty-tree">Árbol vacío.</div>;
  }

  const { width, height, radius, xPos, yPos, edges } = layoutTree(nodes);

  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ background: "#fffdf8", border: "1px solid var(--line)", borderRadius: "10px", maxWidth: "100%", height: "auto" }}
        className="tree-svg fluid"
        role="img"
        aria-label="Recorrido del árbol"
      >
        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#c9c3b8" strokeWidth="2" />
        ))}
        {nodes.map((n) => {
          const x = xPos.get(n.id)!;
          const y = yPos.get(n.id)!;
          return (
            <g key={n.id}>
              {n.current && (
                <circle cx={x} cy={y} r={radius} fill="none" stroke="#e8543f" strokeWidth="2" className="node-ping" />
              )}
              <circle cx={x} cy={y} r={radius} fill={nodeFill(n)} stroke="#2b2926" strokeWidth="2" className="node" />
              <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700} fontFamily="var(--font-mono)">
                {n.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="tree-legend">
        <span className="chip"><i style={{ background: ROLE.current }} /> actual</span>
        <span className="chip"><i style={{ background: ROLE.settled }} /> visitado</span>
        <span className="chip"><i style={{ background: ROLE.pending }} /> pendiente</span>
      </div>
    </div>
  );
}
