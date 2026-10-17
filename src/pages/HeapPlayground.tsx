import { useMemo, useState } from "react";
import { record } from "../engine/timeline";
import { heapOps, type HeapOp } from "../algorithms/heap";
import FluidScrubber from "../components/viz/FluidScrubber";
import HeapViz from "../components/viz/HeapViz";
import { parseArray, randomArray } from "../utils/parse";

export default function HeapPlayground() {
  const [op, setOp] = useState<HeapOp>("insert");
  const [raw, setRaw] = useState("10, 7, 9, 5, 6, 3, 8");
  const [value, setValue] = useState("4");

  const parsed = useMemo(() => parseArray(raw), [raw]);
  const frames = useMemo(
    () => (parsed ? record(heapOps[op].run(parsed, Number.parseInt(value, 10))) : []),
    [parsed, op, value],
  );

  return (
    <div>
      <section className="card">
        <div className="controls">
          <label className="field">
            operación
            <select value={op} onChange={(e) => setOp(e.target.value as HeapOp)}>
              {Object.entries(heapOps).map(([id, o]) => (
                <option key={id} value={id}>{o.name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            montículo
            <input value={raw} onChange={(e) => setRaw(e.target.value)} spellCheck={false} />
          </label>
          {op === "insert" && (
            <label className="field">
              valor
              <input value={value} onChange={(e) => setValue(e.target.value)} />
            </label>
          )}
          <button className="btn ghost" onClick={() => setRaw(randomArray(5, 9).join(", "))}>
            🎲 aleatorio
          </button>
        </div>
        {frames.length > 0 && (
          <FluidScrubber
            frames={frames}
            code={heapOps[op].code}
            render={(f, _blend, _next, index) => (
              <>
                <p className="narrate" key={index}>{f.message}</p>
                <HeapViz frame={f} />
                <div className="meta">
                  <span className="badge">montículo: [{f.heap.join(", ")}]</span>
                </div>
              </>
            )}
          />
        )}
      </section>
    </div>
  );
}
