/**
 * Renderizador de árbol binario con SVG.
 * Disposición: x por orden de valor (inorder), y por profundidad aproximada.
 */
import type { TreeFrame } from "../../algorithms/binary-tree";

type TreeNodeFlat = {
  id: number;
  value: number;
  visited: boolean;
  current: boolean;
  path: boolean;
};

export default function TreeViz({ frame }: { frame: TreeFrame }) {
  const { nodes } = frame;
  if (nodes.length === 0) {
    return <div className="empty-tree">Árbol vacío.</div>;
  }

  const width = 700;
  const height = 320;
  const radius = 22;

  const sortedByValue = [...nodes].sort((a: TreeNodeFlat, b: TreeNodeFlat) => a.value - b.value);
  const xPos = new Map<number, number>();
  sortedByValue.forEach((n: TreeNodeFlat, i: number) => {
    xPos.set(n.id, 80 + (i / Math.max(sortedByValue.length - 1, 1)) * (width - 160));
  });

  const depth = new Map<number, number>();
  nodes.forEach((n: TreeNodeFlat) => {
    depth.set(n.id, Math.floor(Math.log2(n.id + 1)));
  });
  const maxDepth = Math.max(...Array.from(depth.values()), 0);
  const yPos = (d: number) => 60 + (d / Math.max(maxDepth, 1)) * (height - 100);

  const edges: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  const nodesByDepth = new Map<number, TreeNodeFlat[]>();
  nodes.forEach((n: TreeNodeFlat) => {
    const d = depth.get(n.id)!;
    if (!nodesByDepth.has(d)) nodesByDepth.set(d, []);
    nodesByDepth.get(d)!.push(n);
  });

  const depths = Array.from(nodesByDepth.keys()).sort((a: number, b: number) => a - b);
  for (let i = 0; i < depths.length - 1; i++) {
    const upper = nodesByDepth.get(depths[i])!;
    const lower = nodesByDepth.get(depths[i + 1])!;
    for (const u of upper) {
      for (const l of lower) {
        if (Math.abs(xPos.get(u.id)! - xPos.get(l.id)!) < (width / upper.length) * 1.5) {
          edges.push({
            x1: xPos.get(u.id)!,
            y1: yPos(depths[i]),
            x2: xPos.get(l.id)!,
            y2: yPos(depths[i + 1]),
          });
          break;
        }
      }
    }
  }

  return (
    <div>
      <svg width={width} height={height} style={{ background: "#fffdf8", border: "1px solid var(--line)", borderRadius: "10px" }} className="tree-svg">
        {edges.map((e, i) => (
          <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#c9c3b8" strokeWidth="2" />
        ))}
        {nodes.map((n) => {
          const x = xPos.get(n.id)!;
          const y = yPos(depth.get(n.id)!);
          const fill = n.current ? "#e8543f" : n.visited ? "#22c55e" : "#f59e0b";
          return (
            <g key={n.id}>
              <circle cx={x} cy={y} r={radius} fill={fill} stroke="#2b2926" strokeWidth="2" />
              <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700} fontFamily="var(--font-mono)">
                {n.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="tree-legend">
        <span className="chip"><i style={{ background: "#e8543f" }} /> actual</span>
        <span className="chip"><i style={{ background: "#22c55e" }} /> visitado</span>
        <span className="chip"><i style={{ background: "#f59e0b" }} /> pendiente</span>
      </div>
    </div>
  );
}
