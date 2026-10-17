/**
 * VizPlayer — reproduce cualquier visualización a partir de configuración.
 * Recibe { type, config }, genera la cinta de cuadros (con su snippet
 * Python canónico) y la reproduce con FluidScrubber a dos columnas cuando
 * hay código sincronizado.
 *
 * Regla de hooks: la cinta se memoiza UNA vez al inicio (todos los hooks
 * se ejecutan en cada render, sin returns tempranos); el tipo solo decide
 * el renderizado y los badges.
 */
import { useMemo } from "react";
import { record } from "../../engine/timeline";
import FluidScrubber from "./FluidScrubber";
import FluidBars from "./FluidBars";
import FluidTree from "./FluidTree";
import FluidGraph from "./FluidGraph";
import FluidHeap from "./FluidHeap";
import ArrayCells from "./ArrayCells";
import { sorters, type SortId } from "../../algorithms/sorting";
import { treeOrders, type TreeOrder } from "../../algorithms/binary-tree";
import { graphAlgos, type GraphAlgo } from "../../algorithms/graph";
import { heapOps, type HeapOp } from "../../algorithms/heap";
import { lookup, insertAt, deleteAt, arrayOps, type ArrayOp } from "../../algorithms/arrays";
import { parseArray, clampInt } from "../../utils/parse";

export interface VizPlayerProps {
  type: "sorting" | "tree" | "graph" | "heap" | "array";
  config: Record<string, string | number>;
}

interface Show {
  frames: any[];
  code?: string;
}

/* ————— construcción de la cinta (fuera del componente: sin hooks) ————— */

function buildShow(
  type: VizPlayerProps["type"],
  config: Record<string, string | number>,
): Show {
  const raw = String(config.array ?? "");
  const parsed = parseArray(raw);

  if (type === "sorting") {
    if (!parsed) return { frames: [] };
    const algo = (config.algo as SortId) ?? "bubble";
    if (!(algo in sorters)) return { frames: [] };
    return { frames: record(sorters[algo].run(parsed)), code: sorters[algo].code };
  }

  if (type === "array") {
    if (!parsed) return { frames: [] };
    const op = (config.op as ArrayOp) ?? "lookup";
    if (op === "lookup") {
      return {
        frames: record(lookup(parsed, clampInt(String(config.target ?? "7"), 1, 99, 7))),
        code: arrayOps.lookup.code,
      };
    }
    if (op === "insert") {
      return {
        frames: record(
          insertAt(
            parsed,
            clampInt(String(config.index ?? "2"), 0, parsed.length, 0),
            clampInt(String(config.value ?? "5"), 1, 99, 5),
          ),
        ),
        code: arrayOps.insert.code,
      };
    }
    if (op === "delete") {
      return {
        frames: record(
          deleteAt(parsed, clampInt(String(config.index ?? "2"), 0, Math.max(parsed.length - 1, 0), 0)),
        ),
        code: arrayOps.delete.code,
      };
    }
    return { frames: [] };
  }

  if (type === "tree") {
    if (!parsed) return { frames: [] };
    const orderRaw = String(config.order ?? "inorder");
    const order = (["inorder", "preorder", "postorder"].includes(orderRaw) ? orderRaw : "inorder") as TreeOrder;
    return { frames: record(treeOrders[order].run(parsed)), code: treeOrders[order].code };
  }

  if (type === "graph") {
    const algo = (config.algo as GraphAlgo) ?? "bfs";
    if (!(algo in graphAlgos)) return { frames: [] };
    const n = clampInt(String(config.n ?? "7"), 2, 12, 7);
    const start = clampInt(String(config.start ?? "0"), 0, n - 1, 0);
    const edges: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      if (i + 1 < n) edges.push([i, i + 1]);
      if (i + 2 < n) edges.push([i, i + 2]);
    }
    return { frames: record(graphAlgos[algo].run(n, edges, start)), code: graphAlgos[algo].code };
  }

  if (type === "heap") {
    if (!parsed) return { frames: [] };
    const op = (config.op as HeapOp) ?? "insert";
    if (!(op in heapOps)) return { frames: [] };
    const value = clampInt(String(config.value ?? "4"), 1, 99, 4);
    return {
      frames: record(heapOps[op].run(parsed, value)),
      code: heapOps[op].code,
    };
  }

  return { frames: [] };
}

/* ————— badges por tipo ————— */

function metrics(type: VizPlayerProps["type"], f: any) {
  switch (type) {
    case "sorting":
      return (
        <>
          <span className="badge">comparaciones: {f.comparisons}</span>
          <span className="badge">escrituras: {f.writes}</span>
        </>
      );
    case "array":
      return (
        <>
          <span className="badge">lecturas: {f.probes}</span>
          <span className="badge">escrituras: {f.writes}</span>
        </>
      );
    case "tree":
      return (
        <>
          <span className="badge">orden: {f.order.join(", ")}</span>
          <span className="badge">
            visitados: {f.nodes.filter((n: any) => n.visited).length} / {f.nodes.length}
          </span>
        </>
      );
    case "graph":
      return (
        <>
          <span className="badge">cola/pila: [{f.queueOrStack.join(", ")}]</span>
          <span className="badge">visita: {f.visitedOrder.join(", ")}</span>
        </>
      );
    case "heap":
      return (
        <>
          <span className="badge">
            montículo: [{f.cards
              .slice()
              .sort((x: any, y: any) => x.slot - y.slot)
              .map((c: any) => c.value)
              .join(", ")}]
          </span>
        </>
      );
  }
}

export default function VizPlayer({ type, config }: VizPlayerProps) {
  const cfgKey = JSON.stringify(config);
  const show = useMemo(() => buildShow(type, config), [type, cfgKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <FluidScrubber
        frames={show.frames}
        code={show.code}
        render={(f: any, blend: number, next: any) => (
          <>
            <p className="narrate">{f.message}</p>
            {type === "sorting" && <FluidBars curr={f} next={next} blend={blend} />}
            {type === "array" && <ArrayCells curr={f} next={next} blend={blend} />}
            {type === "tree" && <FluidTree frame={f} />}
            {type === "graph" && <FluidGraph curr={f} next={next} blend={blend} />}
            {type === "heap" && <FluidHeap curr={f} next={next} blend={blend} />}
            <div className="meta">{metrics(type, f)}</div>
          </>
        )}
      />
    </div>
  );
}
