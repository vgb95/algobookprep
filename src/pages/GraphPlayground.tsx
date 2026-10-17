import { useMemo, useState } from "react";
import { record } from "../engine/timeline";
import { graphAlgos, type GraphAlgo } from "../algorithms/graph";
import FluidScrubber from "../components/viz/FluidScrubber";
import FluidGraph from "../components/viz/FluidGraph";

export default function GraphPlayground() {
  const [algo, setAlgo] = useState<GraphAlgo>("bfs");
  const [n, setN] = useState(7);
  const [start, setStart] = useState(0);

  const edges = useMemo(() => {
    const e: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      if (i + 1 < n) e.push([i, i + 1]);
      if (i + 2 < n) e.push([i, i + 2]);
    }
    return e;
  }, [n]);

  const frames = useMemo(() => record(graphAlgos[algo].run(n, edges, start)), [algo, n, start]);

  return (
    <div>
      <section className="card">
        <div className="controls">
          <label className="field">
            algoritmo
            <select value={algo} onChange={(e) => setAlgo(e.target.value as GraphAlgo)}>
              {Object.entries(graphAlgos).map(([id, a]) => (
                <option key={id} value={id}>{a.name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            nodos
            <input value={String(n)} onChange={(e) => setN(Number.parseInt(e.target.value, 10) || 1)} />
          </label>
          <label className="field">
            inicio
            <input value={String(start)} onChange={(e) => setStart(Number.parseInt(e.target.value, 10) || 0)} />
          </label>
          <button className="btn ghost" onClick={() => setStart(Math.floor(Math.random() * n))}>
            🎲 inicio aleatorio
          </button>
        </div>
        {frames.length > 0 && (
          <FluidScrubber
            frames={frames}
            code={graphAlgos[algo].code}
            render={(f, blend, next, index) => (
              <>
                <p className="narrate" key={index}>{f.message}</p>
                <FluidGraph curr={f} next={next} blend={blend} />
                <div className="meta">
                  <span className="badge">cola/pila: [{f.queueOrStack.join(", ")}]</span>
                  <span className="badge">visita: {f.visitedOrder.join(", ")}</span>
                </div>
              </>
            )}
          />
        )}
      </section>
    </div>
  );
}
