/**
 * VizPlayer — reproduce cualquier visualización a partir de configuración.
 * Recibe { type, config } y renderiza el scrubber correspondiente con los
 * frames generados por el algoritmo indicado.
 */
import { useMemo } from "react";
import { record } from "../../engine/timeline";
import Scrubber from "./Scrubber";
import ArrayBarViz from "./ArrayBarViz";
import TreeViz from "./TreeViz";
import GraphViz from "./GraphViz";
import HeapViz from "./HeapViz";
import { sorters, type SortId } from "../../algorithms/sorting";
import { treeOrders, type TreeOrder } from "../../algorithms/binary-tree";
import { graphAlgos, type GraphAlgo } from "../../algorithms/graph";
import { heapOps, type HeapOp } from "../../algorithms/heap";
import { lookup, insertAt, deleteAt } from "../../algorithms/arrays";
import { parseArray } from "../../utils/parse";

export interface VizPlayerProps {
  type: "sorting" | "tree" | "graph" | "heap" | "array";
  config: Record<string, string | number>;
}

export default function VizPlayer({ type, config }: VizPlayerProps) {
  // --- Sorting ---
  if (type === "sorting") {
    const algo = (config.algo as SortId) ?? "bubble";
    const raw = String(config.array ?? "7, 3, 9, 1, 5");
    const parsed = parseArray(raw);
    const frames = useMemo(
      () => (parsed ? record(sorters[algo].run(parsed)) : []),
      [parsed, algo],
    );
    return (
      <div>
        <Scrubber
          frames={frames}
          render={(f) => (
            <>
              <p className="narrate">{f.message}</p>
              <ArrayBarViz frame={f} />
              <div className="meta">
                <span className="badge">comparaciones: {f.comparisons}</span>
                <span className="badge">escrituras: {f.writes}</span>
              </div>
            </>
          )}
        />
      </div>
    );
  }

  // --- Array operations ---
  if (type === "array") {
    const op = (config.op as "lookup" | "insert" | "delete") ?? "lookup";
    const raw = String(config.array ?? "4, 1, 7, 3, 9, 2");
    const parsed = parseArray(raw);
    let frames: any[] = [];
    if (parsed) {
      if (op === "lookup") {
        frames = record(lookup(parsed, Number(config.target ?? 7)));
      } else if (op === "insert") {
        frames = record(insertAt(parsed, Number(config.index ?? 2), Number(config.value ?? 5)));
      } else {
        frames = record(deleteAt(parsed, Number(config.index ?? 2)));
      }
    }
    return (
      <div>
        <Scrubber
          frames={frames}
          render={(f: any) => (
            <>
              <p className="narrate">{f.message}</p>
              <ArrayBarViz frame={f} />
              <div className="meta">
                <span className="badge">lecturas: {f.probes}</span>
                <span className="badge">escrituras: {f.writes}</span>
              </div>
            </>
          )}
        />
      </div>
    );
  }

  // --- Trees ---
  if (type === "tree") {
    const order = (config.order as TreeOrder) ?? "inorder";
    const raw = String(config.array ?? "8, 3, 10, 1, 6, 14, 4, 7, 13");
    const parsed = parseArray(raw);
    const frames = useMemo(
      () => (parsed ? record(treeOrders[order].run(parsed)) : []),
      [parsed, order],
    );
    return (
      <div>
        <Scrubber
          frames={frames}
          render={(f) => (
            <>
              <p className="narrate">{f.message}</p>
              <TreeViz frame={f} />
              <div className="meta">
                <span className="badge">orden: {f.order.join(", ")}</span>
                <span className="badge">
                  visitados: {f.nodes.filter((n: any) => n.visited).length} /{" "}
                  {f.nodes.length}
                </span>
              </div>
            </>
          )}
        />
      </div>
    );
  }

  // --- Graphs ---
  if (type === "graph") {
    const algo = (config.algo as GraphAlgo) ?? "bfs";
    const n = Number(config.n ?? 7);
    const start = Number(config.start ?? 0);
    const edges: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      if (i + 1 < n) edges.push([i, i + 1]);
      if (i + 2 < n) edges.push([i, i + 2]);
    }
    const frames = useMemo(() => record(graphAlgos[algo].run(n, edges, start)), [
      algo,
      n,
      start,
    ]);
    return (
      <div>
        <Scrubber
          frames={frames}
          render={(f) => (
            <>
              <p className="narrate">{f.message}</p>
              <GraphViz frame={f} />
              <div className="meta">
                <span className="badge">
                  cola/pila: [{f.queueOrStack.join(", ")}]
                </span>
                <span className="badge">visita: {f.visitedOrder.join(", ")}</span>
              </div>
            </>
          )}
        />
      </div>
    );
  }

  // --- Heaps ---
  if (type === "heap") {
    const op = (config.op as HeapOp) ?? "insert";
    const raw = String(config.array ?? "10, 7, 9, 5, 6, 3, 8");
    const parsed = parseArray(raw);
    const value = Number(config.value ?? 4);
    const frames = useMemo(
      () => (parsed ? record(heapOps[op].run(parsed, value)) : []),
      [parsed, op, value],
    );
    return (
      <div>
        <Scrubber
          frames={frames}
          render={(f: any) => (
            <>
              <p className="narrate">{f.message}</p>
              <HeapViz frame={f} />
              <div className="meta">
                <span className="badge">montículo: [{f.heap.join(", ")}]</span>
              </div>
            </>
          )}
        />
      </div>
    );
  }

  return <div className="viz-placeholder">Tipo de visualización no soportado.</div>;
}
