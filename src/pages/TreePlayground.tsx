import { useMemo, useState } from "react";
import { record } from "../engine/timeline";
import { treeOrders, type TreeOrder } from "../algorithms/binary-tree";
import Scrubber from "../components/viz/Scrubber";
import TreeViz from "../components/viz/TreeViz";
import { parseArray, randomArray } from "../utils/parse";

export default function TreePlayground() {
  const [order, setOrder] = useState<TreeOrder>("inorder");
  const [raw, setRaw] = useState("8, 3, 10, 1, 6, 14, 4, 7, 13");

  const parsed = useMemo(() => parseArray(raw), [raw]);
  const frames = useMemo(
    () => (parsed ? record(treeOrders[order].run(parsed)) : []),
    [parsed, order],
  );

  return (
    <div>
      <section className="card">
        <div className="controls">
          <label className="field">
            recorrido
            <select value={order} onChange={(e) => setOrder(e.target.value as TreeOrder)}>
              {Object.entries(treeOrders).map(([id, o]) => (
                <option key={id} value={id}>{o.name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            nodos
            <input value={raw} onChange={(e) => setRaw(e.target.value)} spellCheck={false} />
          </label>
          <button className="btn ghost" onClick={() => setRaw(randomArray(6, 10).join(", "))}>
            🎲 aleatorio
          </button>
        </div>
        {frames.length > 0 && (
          <Scrubber
            frames={frames}
            render={(f) => (
              <>
                <p className="narrate">{f.message}</p>
                <TreeViz frame={f} />
                <div className="meta">
                  <span className="badge">orden: {f.order.join(", ")}</span>
                  <span className="badge">visitados: {f.nodes.filter((n) => n.visited).length} / {f.nodes.length}</span>
                </div>
              </>
            )}
          />
        )}
      </section>
    </div>
  );
}
