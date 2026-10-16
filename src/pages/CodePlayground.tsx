import { useMemo, useState } from "react";
import { runTraced } from "../engine/pyodide";
import CodeLine from "../components/viz/CodeLine";
import VariableInspector from "../components/viz/VariableInspector";
import Scrubber from "../components/viz/Scrubber";
import ArrayBarViz from "../components/viz/ArrayBarViz";

/**
 * Code Playground: el usuario escribe Python, pulsa Run, y la traza línea a
 * línea se convierte en una cinta de cuadros navegable.
 */
const DEFAULT_CODE = `def bubble_sort(a):
    n = len(a)
    for i in range(n):
        for j in range(0, n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a

arr = [6, 2, 8, 1, 5]
bubble_sort(arr)
print(arr)
`;

export default function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [lines, setLines] = useState<string[]>(DEFAULT_CODE.split("\n"));
  const [frames, setFrames] = useState<{
    line: number;
    message: string;
    locals: Record<string, string>;
    arrays: Record<string, number[]>;
    stdout: string;
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arrayVar, setArrayVar] = useState<string | null>(null);
  const arrayNames = useMemo(() => {
    const names = new Set<string>();
    for (const f of frames) {
      for (const k of Object.keys(f.arrays || {})) names.add(k);
    }
    return Array.from(names);
  }, [frames]);

  const run = async () => {
    setError(null);
    setFrames([]);
    setArrayVar(null);
    setLoading(true);
    try {
      const traced = await runTraced(code);
      setFrames(traced);
      if (traced.length > 0) {
        const firstArray = Object.keys(traced[0].arrays || {})[0];
        if (firstArray) setArrayVar(firstArray);
      }
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="prose-note">
        Cada línea ejecutada se graba como un frame de la cinta. El código corre
        en <strong>Python real</strong> (Pyodide/WASM) dentro de tu pestaña.
      </p>

      <section className="card">
        <div className="controls">
          <label className="field">
            código python
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setLines(e.target.value.split("\n"));
              }}
              rows={12}
              spellCheck={false}
              className="code-src"
            />
          </label>
          <div className="run-col">
            <button className="btn primary" onClick={run} disabled={loading}>
              {loading ? "Ejecutando…" : "▶ Run (traza)"}
            </button>
            {error && <p className="err">{error}</p>}
          </div>
        </div>
      </section>

      {frames.length > 0 && (
        <Scrubber
          frames={frames}
          render={(f) => {
            const arrKey =
              arrayVar && f.arrays && f.arrays[arrayVar] ? arrayVar : null;
            return (
              <>
                <div className="trace-row">
                  <div className="trace-code">
                    <CodeLine lines={lines} activeLine={f.line} />
                  </div>
                  <div className="trace-state">
                    <p className="narrate">
                      Línea <b>{f.line}</b> ejecutada
                    </p>
                    <VariableInspector
                      locals={f.locals}
                      arrays={f.arrays}
                    />
                    {f.stdout && (
                      <div className="stdout">
                        <b>Salida:</b> <span className="stdout-text">{f.stdout}</span>
                      </div>
                    )}
                  </div>
                </div>
                {arrKey && (
                  <div className="trace-arr">
                    <p className="narrate">{`${arrKey} = [${f.arrays[arrKey].join(", ")}]`}</p>
                    <ArrayBarViz
                      frame={{
                        array: f.arrays[arrKey],
                        settled: [],
                        cursor: undefined,
                        swap: undefined,
                        key: undefined,
                        found: undefined,
                      }}
                    />
                  </div>
                )}
              </>
            );
          }}
        />
      )}

      {frames.length > 0 && (
        <div className="meta">
          <span className="badge">frames: {frames.length}</span>
          {arrayNames.length > 0 && (
            <>
              <span className="badge">arrays: {arrayNames.join(", ")}</span>
              <label className="field" style={{ marginLeft: 10 }}>
                mostrar array
                <select
                  value={arrayVar ?? ""}
                  onChange={(e) => setArrayVar(e.target.value || null)}
                >
                  <option value="">—</option>
                  {arrayNames.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}
