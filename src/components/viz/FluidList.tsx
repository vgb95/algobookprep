/**
 * FluidList — lista enlazada fluida (Fase 6b).
 *
 * Los nodos NO ocupan casillas contiguas: cada id tiene un "asiento"
 * estable en una rejilla dispersa (memoria deshilvanada) y las flechas
 * next cosen el orden. Al insertar/borrar NINGUNA tarjeta se mueve —
 * solo cambian las flechas (glow violeta en las recién cosidas). Es el
 * contraste visual central frente a ArrayCells.
 *
 * Entre cuadros: las flechas funden opacidad, las nuevas tarjetas
 * aparecen y las retiradas se desvanecen. El color cambia a mitad del
 * fundido (blend 0.5) como en todo el motor.
 */
import type { ListFrame, ListLink } from "../../algorithms/linked-list";
import { ROLE } from "./roles";

interface Props {
  curr: ListFrame;
  next?: ListFrame;
  blend?: number;
}

const CELL_W = 118;
const CELL_H = 52;
const COLS = 6;
const TINT: Record<string, string> = {
  probe: "rgba(149, 141, 128, 0.28)",
  cursor: ROLE.key,
  found: ROLE.found,
};

/** Asientos estables por id, con sondeo lineal para evitar choques. */
function seatOf(id: number, taken: Set<number>): { col: number; row: number } {
  let s = id % 24;
  while (taken.has(s)) s = (s + 1) % 24;
  taken.add(s);
  return { col: s % COLS, row: Math.floor(s / COLS) };
}

export default function FluidList({ curr, next, blend = 0 }: Props) {  const statusFrame = blend > 0.5 && next ? next : curr;

  // asientos calculados sobre la UNIÓN de ids de ambos cuadros (estables)
  const union = new Map<number, { value: number }>();
  for (const n of curr.nodes) union.set(n.id, n);
  for (const n of next?.nodes ?? []) union.set(n.id, n);
  const leavingId = statusFrame.leaving;
  if (leavingId !== undefined && !union.has(leavingId)) {
    const gone = curr.nodes.find((n) => n.id === leavingId) ?? next?.nodes.find((n) => n.id === leavingId);
    if (gone) union.set(gone.id, gone);
  }

  const taken = new Set<number>();
  const seats = new Map<number, { col: number; row: number }>();
  for (const id of union.keys()) seats.set(id, seatOf(id, taken));

  const height = Math.max(2, Math.ceil(taken.size / COLS)) * 92 + 40;
  const width = COLS * (CELL_W + 26) + 40;

  const posOf = new Map<number, { x: number; y: number }>();
  for (const [id, s] of seats) {
    // desplazamiento orgánico per-id (la memoria "esparcida")
    const jx = ((id * 53) % 21) - 10;
    const jy = ((id * 29) % 13) - 6;
    const x = 30 + s.col * (CELL_W + 26) + CELL_W / 2 + jx;
    const y = 34 + s.row * 92 + CELL_H / 2 + jy;
    posOf.set(id, { x, y });
  }

  // opacidad de entrada/salida por id
  const inCurr = new Set(curr.nodes.map((n) => n.id));
  const inNext = new Set((next?.nodes ?? []).map((n) => n.id));
  // aristas: fundimos de opacidad por par (from,to)
  const linkKey = (l: ListLink) => `${l.from}>${l.to}`;
  const currLinks = new Map(curr.links.map((l) => [linkKey(l), l]));

  const headId = statusFrame.nodes[0]?.id;
  const tail = statusFrame.nodes[statusFrame.nodes.length - 1];

  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ background: "#fffdf8", border: "1px solid var(--line)", borderRadius: "10px", maxWidth: "100%", height: "auto" }}
        className="list-svg fluid"
        role="img"
        aria-label="Lista enlazada"
      >
        <defs>
          <marker id="list-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={ROLE.key} />
          </marker>
          <marker id="list-arrow-soft" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#bdb3a0" />
          </marker>
        </defs>

        {/* puntero head */}
        {headId !== undefined && posOf.has(headId) && (
          <text
            x={Math.max(8, posOf.get(headId)!.x - 68)}
            y={posOf.get(headId)!.y + 4}
            fill={ROLE.ink}
            fontSize={12}
            fontWeight={700}
            fontFamily="var(--font-mono)"
          >
            head →
          </text>
        )}

        {/* flechas */}
        {[...currLinks.keys()].length > 0 || (next?.links ?? []).length > 0
          ? unionOfLinks(curr.links, next?.links ?? []).map((k) => {
              const l = decodeKey(k);
              const a = posOf.get(l.from);
              const b = posOf.get(l.to);
              if (!a || !b) return null;
              const had = currLinks.has(k);
              const will = (next?.links ?? []).some((x) => linkKey(x) === k);
              const alpha = had && will ? 1 : had ? 1 - blend : blend;
              const rewired = statusFrame.rewire?.some((x) => linkKey(x) === k);
              // curva: arqueada hacia el lado libre; casi vertical → bucle hacia un lado
              const dx = b.x - a.x;
              const verticalish = Math.abs(dx) < 24;
              const mx = verticalish ? a.x + 42 : (a.x + b.x) / 2;
              const my = verticalish ? (a.y + b.y) / 2 : (a.y + b.y) / 2 + (dx > 0 ? -22 : 22);
              const start = edgePoint(a, b);
              const end = edgePoint(b, a);
              return (
                <path
                  key={k}
                  d={`M ${start.x} ${start.y} Q ${mx} ${my} ${end.x} ${end.y}`}
                  fill="none"
                  stroke={rewired ? ROLE.key : "#bdb3a0"}
                  strokeWidth={rewired ? 3 : 2}
                  opacity={alpha}
                  className={rewired ? "list-rewire" : undefined}
                  markerEnd={rewired ? "url(#list-arrow)" : "url(#list-arrow-soft)"}
                />
              );
            })
          : null}

        {/* nodos */}
        {[...union.entries()].map(([id, node]) => {
          const p = posOf.get(id)!;
          const opacity = inCurr.has(id) && inNext.has(id) ? 1 : inCurr.has(id) ? 1 - blend : blend;
          const status = statusFrame.status?.[String(id)];
          const tint = status ? TINT[status] : undefined;
          return (
            <g key={`ln-${id}`} opacity={opacity}>
              <rect
                x={p.x - CELL_W / 2}
                y={p.y - CELL_H / 2}
                width={CELL_W}
                height={CELL_H}
                rx={12}
                fill={tint ?? "#ffffff"}
                stroke={status === "cursor" ? ROLE.key : status === "found" ? ROLE.found : "#d8cfbc"}
                strokeWidth={status ? 2.5 : 1.6}
                className={status === "cursor" ? "node-ping" : undefined}
              />
              <text x={p.x - 26} y={p.y + 5} fill="#a99e8a" fontSize={10} fontFamily="var(--font-mono)" textAnchor="middle">
                val
              </text>
              <text x={p.x + 8} y={p.y + 6} fill={ROLE.ink} fontSize={16} fontWeight={700} fontFamily="var(--font-mono)" textAnchor="middle">
                {node.value}
              </text>
              <line x1={p.x + 2} y1={p.y - CELL_H / 2 + 6} x2={p.x + 2} y2={p.y + CELL_H / 2 - 6} stroke="#e7dfcd" strokeWidth={1.5} />
            </g>
          );
        })}

        {/* None del final */}
        {tail && posOf.has(tail.id) && (
          <text
            x={posOf.get(tail.id)!.x + CELL_W / 2 + 12}
            y={posOf.get(tail.id)!.y + 4}
            fill="#a99e8a"
            fontSize={11}
            fontFamily="var(--font-mono)"
          >
            next → ∅
          </text>
        )}
      </svg>
      <div className="tree-legend">
        <span className="chip"><i style={{ background: "rgba(149, 141, 128, 0.45)" }} /> examinado</span>
        <span className="chip"><i style={{ background: ROLE.key }} /> actual / flecha recién cosida</span>
        <span className="chip"><i style={{ background: ROLE.found }} /> objetivo</span>
      </div>
    </div>
  );
}

/** Punto de salida/llegada sobre el borde de la caja, siguiendo la dirección. */
function edgePoint(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  if (Math.abs(dx) >= Math.abs(dy)) {
    return { x: a.x + ux * 62, y: a.y + uy * 18 };
  }
  return { x: a.x + ux * 30, y: a.y + uy * 28 };
}

function unionOfLinks(a: ListLink[], b: ListLink[]): string[] {
  const set = new Set<string>();
  for (const l of a) set.add(`${l.from}>${l.to}`);
  for (const l of b) set.add(`${l.from}>${l.to}`);
  return [...set];
}

function decodeKey(k: string): ListLink {
  const [from, to] = k.split(">").map((v) => Number.parseInt(v, 10));
  return { from, to };
}
