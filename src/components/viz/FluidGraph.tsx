/**
 * Fase B — grafo en canvas con interpolación.
 * SVG/DOM no escala a decenas de nodos a 60fps; el canvas redibuja
 * barato cada frame del player. Layout circular estable por id, así
 * que la fluidez viene de: energía de visita interpolada (resplandor),
 * aristas que se encienden con alpha y anillo pulsante en el actual.
 */
import { useEffect, useMemo, useRef } from "react";
import type { GraphFrame } from "../../algorithms/graph";
import { ROLE } from "./roles";

interface Props {
  curr: GraphFrame;
  next: GraphFrame;
  blend: number;
}

const W = 640;
const H = 340;
const NODE_R = 20;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function energyOf(n: { visited: boolean; inQueue: boolean }): number {
  if (n.visited) return 1;
  if (n.inQueue) return 0.45;
  return 0.12;
}

function hexA(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function FluidGraph({ curr, next, blend }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const nodes = curr.nodes;

  const pos = useMemo(() => {
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) / 2 - 40;
    const m = new Map<number, { x: number; y: number }>();
    nodes.forEach((n, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / Math.max(nodes.length, 1);
      m.set(n.id, { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) });
    });
    return m;
  }, [nodes]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const nextById = new Map(next.nodes.map((n) => [n.id, n]));

    // Aristas con encendido interpolado.
    curr.edges.forEach((e, i) => {
      const p1 = pos.get(e.from);
      const p2 = pos.get(e.to);
      if (!p1 || !p2) return;
      const a0 = e.active ? 1 : 0;
      const a1 = next.edges[i]?.active ? 1 : 0;
      const a = lerp(a0, a1, blend);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = a > 0.02 ? hexA(ROLE.current, 0.25 + 0.75 * a) : ROLE.edge;
      ctx.lineWidth = 2 + a * 1.5;
      ctx.stroke();
    });

    // Nodos: color discreto por estado + resplandor interpolado.
    const t = (Date.now() % 1200) / 1200;
    nodes.forEach((n) => {
      const p = pos.get(n.id);
      if (!p) return;
      const nn = nextById.get(n.id);
      const e = lerp(energyOf(n), energyOf(nn ?? n), blend);
      const cf = (blend > 0.5 ? nn : n) ?? n;
      const fill = cf.current
        ? ROLE.current
        : cf.visited
          ? ROLE.settled
          : cf.inQueue
            ? hexA(ROLE.pending, 0.45)
            : ROLE.pending;

      if (e > 0.03) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, NODE_R + 3 + e * 5, 0, Math.PI * 2);
        ctx.fillStyle = hexA(ROLE.settled, 0.12 + 0.2 * e);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, NODE_R, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = ROLE.ink;
      ctx.stroke();

      if (cf.current) {
        const pr = NODE_R + 3 + t * 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(ROLE.current, 0.7 * (1 - t));
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.fillStyle = "#fff";
      ctx.font = "700 13px ui-monospace, Menlo, Consolas, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(n.label, p.x, p.y + 1);
    });
  }, [curr, next, blend, pos, nodes]);

  if (nodes.length === 0) return <div className="empty-tree">Grafo vacío.</div>;

  return (
    <div>
      <canvas
        ref={ref}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          background: "#fffdf8",
          border: "1px solid var(--line)",
          borderRadius: "10px",
        }}
        className="graph-canvas"
        role="img"
        aria-label={`Grafo: visitados ${curr.visitedOrder.join(", ") || "ninguno"}`}
      />
      <div className="graph-info">
        <span className="chip"><i style={{ background: ROLE.current }} /> actual</span>
        <span className="chip"><i style={{ background: ROLE.settled }} /> visitado</span>
        <span className="chip"><i style={{ background: ROLE.pending }} /> pendiente</span>
        <span className="chip"><i style={{ background: hexA(ROLE.pending, 0.45) }} /> en cola/pila</span>
      </div>
    </div>
  );
}
