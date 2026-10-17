import { useMemo, useState } from "react";
import { record } from "../engine/timeline";
import { lookup, insertAt, deleteAt, type ArrayOp } from "../algorithms/arrays";
import FluidScrubber from "../components/viz/FluidScrubber";
import ArrayCells from "../components/viz/ArrayCells";
import { parseArray, clampInt, randomArray } from "../utils/parse";

const OP_HINTS: Record<ArrayOp, string> = {
  lookup:
    "Buscar por valor obliga a recorrer casilla a casilla: O(n). Solo el acceso por índice es O(1).",
  insert:
    "Insertar en medio obliga a hacer hueco desplazando todo lo posterior: O(n). El append al final es O(1) amortizado.",
  delete:
    "Borrar en medio obliga a tapar el hueco desplazando todo lo posterior hacia la izquierda: O(n).",
};

export default function ArraysPlayground() {
  const [op, setOp] = useState<ArrayOp>("lookup");
  const [raw, setRaw] = useState("4, 1, 7, 3, 9, 2");
  const [target, setTarget] = useState("7");
  const [index, setIndex] = useState("2");
  const [value, setValue] = useState("5");

  const parsed = useMemo(() => parseArray(raw), [raw]);
  const frames = useMemo(() => {
    if (!parsed) return [];
    if (op === "lookup") {
      return record(lookup(parsed, clampInt(target, 1, 99, 1)));
    }
    if (op === "insert") {
      return record(
        insertAt(parsed, clampInt(index, 0, parsed.length, 0), clampInt(value, 1, 99, 1)),
      );
    }
    return record(deleteAt(parsed, clampInt(index, 0, Math.max(parsed.length - 1, 0), 0)));
  }, [parsed, op, target, index, value]);

  const error = parsed ? null : "Introduce 2–20 números enteros entre 1 y 99, separados por comas o espacios.";

  return (
    <div>
      <p className="prose-note">{OP_HINTS[op]}</p>

      <section className="card">
        <div className="controls">
          <label className="field">
            operación
            <select value={op} onChange={(e) => setOp(e.target.value as ArrayOp)}>
              <option value="lookup">buscar valor</option>
              <option value="insert">insertar en i</option>
              <option value="delete">borrar en i</option>
            </select>
          </label>
          <label className="field">
            array
            <input value={raw} onChange={(e) => setRaw(e.target.value)} spellCheck={false} />
          </label>
          <button className="btn ghost" onClick={() => setRaw(randomArray(5, 10).join(", "))}>
            🎲 aleatorio
          </button>
        </div>

        <div className="controls">
          {op === "lookup" ? (
            <label className="field">
              buscar
              <input value={target} onChange={(e) => setTarget(e.target.value)} />
            </label>
          ) : (
            <>
              <label className="field">
                posición i
                <input value={index} onChange={(e) => setIndex(e.target.value)} />
              </label>
              {op === "insert" && (
                <label className="field">
                  valor a insertar
                  <input value={value} onChange={(e) => setValue(e.target.value)} />
                </label>
              )}
            </>
          )}
        </div>

        {error && <p className="err">{error}</p>}

        {frames.length > 0 && (
          <FluidScrubber
            frames={frames}
            render={(f, blend, next, index) => (
              <>
                <p className="narrate" key={index}>{f.message}</p>
                <ArrayCells curr={f} next={next} blend={blend} />
                <div className="metrics">
                  <span className="badge">lecturas: {f.probes}</span>
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
