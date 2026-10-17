/**
 * Fase A/B/C — árbol fluido.
 * Fase 3: el layout ya no adivina — el TreeFrame lleva las aristas
 * padre→hijo REALES y la profundidad real de cada nodo. Las aristas del
 * camino de la pila de recursión se resaltan (violeta): ves el backtracking
 * subiendo y bajando mientras las llamadas entran y salen.
 */
import { layoutTree, nodeFill, type RealEdge } from "./treeLayout";
import { ROLE } from "./roles";
import type { TreeFrame } from "../../algorithms/binary-tree";

export default function FluidTree({ frame }: { frame: TreeFrame }) {
  const { nodes, edges } = frame;
  if (nodes.length === 0) {
    return <div className="empty-tree">Árbol vacío.</div>;
  }

  const { width, height, radius, xPos, yPos, edges: geom } = layoutTree(
    nodes,
    edges as RealEdge[],
  );
  const pathSet = new Set(nodes.filter((n) => n.path).map((n) => n.id));

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
        {geom.map((e, i) => {
          const onPath = pathSet.has(e.from) && pathSet.has(e.to);
          return (
            <line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke={onPath ? ROLE.key : ROLE.edge}
              strokeWidth={onPath ? 3 : 2}
              className={onPath ? "edge-path" : undefined}
            />
          );
        })}
        {nodes.map((n) => {
          const x = xPos.get(n.id)!;
          const y = yPos.get(n.id)!;
          const lens = n.path ? 3 : 2;
          return (
            <g key={n.id}>
              {n.current && (
                <circle cx={x} cy={y} r={radius} fill="none" stroke={ROLE.current} strokeWidth="2" className="node-ping" />
              )}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={nodeFill(n)}
                stroke={n.path && !n.current ? ROLE.key : ROLE.ink}
                strokeWidth={lens}
                className="node"
              />
              <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700} fontFamily="var(--font-mono)">
                {n.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="tree-legend">
        <span className="chip"><i style={{ background: ROLE.current }} /> actual</span>
        <span className="chip"><i style={{ background: ROLE.key }} /> en la pila de llamadas</span>
        <span className="chip"><i style={{ background: ROLE.settled }} /> visitado</span>
        <span className="chip"><i style={{ background: ROLE.pending }} /> pendiente</span>
      </div>
    </div>
  );
}
