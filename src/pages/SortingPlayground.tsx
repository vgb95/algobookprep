import { useMemo, useState } from "react";
import { record } from "../engine/timeline";
import { sorters, type SortId } from "../algorithms/sorting";
import FluidScrubber from "../components/viz/FluidScrubber";
import FluidBars from "../components/viz/FluidBars";
import { parseArray, randomArray } from "../utils/parse";

export default function SortingPlayground() {
  const [algo, setAlgo] = useState<SortId>("bubble");
  const [raw, setRaw] = useState("7, 3, 9, 1, 5, 8");

  const parsed = useMemo(() => parseArray(raw), [raw]);
  const frames = useMemo(
    () => (parsed ? record(sorters[algo].run(parsed)) : []),
    [parsed, algo],
  );
  const error = parsed
    ? null
    : "Introduce 2–20 números enteros entre 1 y 99, separados por comas o espacios.";

  return (
    <div>
      <table className="tbl">
        <thead>
          <tr>
            <th>algoritmo</th>
            <th>peor</th>
            <th>mejor</th>
            <th>espacio</th>
            <th>estable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bubble</td>
            <td className="mono">O(n²)</td>
            <td className="mono">O(n)</td>
            <td className="mono">O(1)</td>
            <td>sí</td>
          </tr>
          <tr>
            <td>insertion</td>
            <td className="mono">O(n²)</td>
            <td className="mono">O(n)</td>
            <td className="mono">O(1)</td>
            <td>sí</td>
          </tr>
          <tr>
            <td>selection</td>
            <td className="mono">O(n²)</td>
            <td className="mono">O(n²)</td>
            <td className="mono">O(1)</td>
            <td>no</td>
          </tr>
        </tbody>
      </table>

      <section className="card">
        <div className="controls">
          <label className="field">
            algoritmo
            <select value={algo} onChange={(e) => setAlgo(e.target.value as SortId)}>
              {Object.entries(sorters).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            tu array
            <input
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              spellCheck={false}
            />
          </label>
          <button
            className="btn ghost"
            onClick={() => setRaw(randomArray(7, 12).join(", "))}
          >
            🎲 aleatorio
          </button>
        </div>

        {error && <p className="err">{error}</p>}

        {frames.length > 0 && (
          <FluidScrubber
            frames={frames}
            render={(f, blend, next, index) => (
              <>
                <p className="narrate" key={index}>{f.message}</p>
                <FluidBars curr={f} next={next} blend={blend} />
                <div className="metrics">
                  <span className="badge">comparaciones: {f.comparisons}</span>
                  <span className="badge">escrituras: {f.writes}</span>
                  <span className="badge">cinta: {frames.length} cuadros</span>
                </div>
              </>
            )}
          />
        )}
      </section>
    </div>
  );
}
