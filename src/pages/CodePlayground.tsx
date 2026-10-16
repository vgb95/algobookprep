import { useMemo, useState } from "react";
import { runTraced } from "../engine/pyodide";
import CodeLine from "../components/viz/CodeLine";
import VariableInspector from "../components/viz/VariableInspector";
import FluidScrubber from "../components/viz/FluidScrubber";
import FluidBars, { type BarMarker } from "../components/viz/FluidBars";
import { ROLE } from "../components/viz/roles";

/**
 * Heurística de punteros: locales con nombre de índice (i, j, min, mid…)
 * cuyo valor entero cae dentro del array se muestran como marcadores
 * sobre las casillas — las variables viven DENTRO de la visualización.
 */
const INDEX_LIKE =
  /^(i|j|k|l|r|m|left|right|mid|lo|hi|low|high|pos|idx|index|pivot|min|max|min_i|max_i|lo_i|hi_i)$/i;

function markersFor(
  locals: Record<string, string> | undefined,
  len: number,
): BarMarker[] {
  if (!locals || len === 0) return [];
  const out: BarMarker[] = [];
  for (const [name, raw] of Object.entries(locals)) {
    if (!INDEX_LIKE.test(name)) continue;
    const v = Number.parseInt(String(raw), 10);
    if (!Number.isInteger(v) || v < 0 || v >= len) continue;
    out.push({ index: v, label: name, color: ROLE.key });
  }
  return out;
}

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
  const [stdin, setStdin] = useState("");
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
      const traced = await runTraced(code, 5000, stdin);
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
          <label className="field">
            entrada (stdin)
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              rows={3}
              spellCheck={false}
              className="code-src"
              placeholder="Solo si tu código usa input(): una línea por cada llamada"
            />
          </label>
        </div>
      </section>

      {frames.length > 0 && (
        <FluidScrubber
          frames={frames}
          render={(f, blend, next, index) => {
            const arrKey =
              arrayVar && f.arrays && f.arrays[arrayVar] ? arrayVar : null;
            const toViz = (t: (typeof frames)[number]) => ({
              array: arrKey && t.arrays && t.arrays[arrKey] ? t.arrays[arrKey] : [],
              settled: [] as number[],
              compare: undefined,
              swap: undefined,
              key: undefined,
              cursor: undefined,
              found: undefined,
            });
            return (
              <>
                <div className="trace-row">
                  <div className="trace-code">
                    <CodeLine lines={lines} activeLine={f.line} />
                  </div>
                  <div className="trace-state">
                    <p className="narrate" key={index}>
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
                    <FluidBars
                      curr={toViz(f)}
                      next={toViz(next)}
                      blend={blend}
                      markers={markersFor(f.locals, f.arrays[arrKey].length)}
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
