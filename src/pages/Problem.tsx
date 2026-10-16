import { useState } from "react";
import { problems } from "../content/problems";
import CodeEditor from "../components/editor/CodeEditor";
import { evaluateSolution } from "../engine/evaluator";
import FluidScrubber from "../components/viz/FluidScrubber";
import { runTraced } from "../engine/pyodide";

/**
 * Página de un problema de programación.
 * El alumno escribe su solución en el editor, pulsa "Ejecutar tests",
 * y ve qué tests pasan / fallan. Si falla, puede ver la traza paso a paso
 * de ese test específico (mismo reproductor de cinta de cuadros).
 */
export default function Problem({ id }: { id: string }) {
  const problem = problems.find((p) => p.id === id);
  if (!problem) {
    return (
      <div className="notfound">
        <h1 className="serif">Problema no encontrado</h1>
        <p className="lede">Ese problema no existe todavía.</p>
        <a className="btn primary" href="#/">← Volver a portada</a>
      </div>
    );
  }

  const [userCode, setUserCode] = useState(problem.starterCode);
  const [evalResult, setEvalResult] = useState<EvalState | null>(null);
  const [loading, setLoading] = useState(false);
  const [traceFrames, setTraceFrames] = useState<{
    line: number;
    message: string;
    locals: Record<string, string>;
    arrays: Record<string, number[]>;
    stdout: string;
  }[]>([]);
  const [traceFailedTest, setTraceFailedTest] = useState<{
    name: string;
    args: any;
    expected: any;
  } | null>(null);

  const runTests = async () => {
    setLoading(true);
    setEvalResult(null);
    try {
      const result = await evaluateSolution({
        solutionCode: userCode,
        setupCode: problem.setupCode,
        tests: problem.tests,
      });
      setEvalResult({
        passed: result.passed,
        total: result.total,
        results: result.results,
        stdout: result.stdout,
        error: result.error,
      });
    } catch (e: any) {
      setEvalResult({
        passed: 0,
        total: problem.tests.length,
        results: [],
        stdout: "",
        error: e?.message || String(e),
      });
    } finally {
      setLoading(false);
    }
  };

  const allPassed =
    evalResult != null &&
    evalResult.passed === evalResult.total &&
    evalResult.total > 0;

  const showTrace = async (testName: string) => {
    const test = problem.tests.find((t) => t.name === testName);
    if (!test) return;
    setTraceFailedTest(test);
    setTraceFrames([]);
    try {
      const callArgs = JSON.stringify(test.args);
      const tracedCode = `
${problem.setupCode}
${userCode}
_target = ${getTargetName(problem.setupCode)}
_result = _target(${callArgs})
`;
      const frames = await runTraced(tracedCode, 2000);
      setTraceFrames(frames);
    } catch (e: any) {
      setTraceFrames([]);
    }
  };

  return (
    <article>
      <div className="kicker">
        problema {problem.chapter === "arrays" ? "cap. 2" : ""} ·
        {problem.difficulty}
      </div>
      <h1 className="serif">{problem.title}</h1>
      <p className="lede">{problem.blurb}</p>
      <p className="prose-note">{problem.hint}</p>

      <section className="card" style={{ marginTop: 20 }}>
        <div className="controls" style={{ gap: 10 }}>
          <button className="btn primary" onClick={runTests} disabled={loading}>
            {loading ? "Ejecutando…" : "▶ Ejecutar tests"}
          </button>
          {allPassed && (
            <span className="badge" style={{ background: "#e7f8ee", color: "#16a34a", borderColor: "#86efac" }}>
              ✓ todos los tests pasan
            </span>
          )}
        </div>

        <div className="trace-row" style={{ marginTop: 14, gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CodeEditor
              value={userCode}
              onChange={setUserCode}
              height="420px"
              className="problem-editor"
            />
          </div>
          <div style={{ width: 320, minWidth: 0 }}>
            <h3 className="serif" style={{ fontSize: "1rem", marginBottom: 8 }}>
              Tests
            </h3>
            {evalResult ? (
              <div className="test-list">
                {evalResult.results.map((r) => {
                  return (
                    <div
                      key={r.name}
                      className={`test-item ${r.passed ? "pass" : "fail"}${
                        r.hidden ? " hidden" : ""
                      }`}
                    >
                      <span className="test-mark">{r.passed ? "✓" : "✗"}</span>
                      <span className="test-name">{r.name}</span>
                      {r.hidden && <span className="test-hidden">(oculto)</span>}
                      {!r.passed && (
                        <button
                          className="btn ghost"
                          onClick={() => showTrace(r.name)}
                          style={{ marginTop: 4, fontSize: "0.75rem" }}
                        >
                          ver traza paso a paso
                        </button>
                      )}
                      {!r.passed && (
                        <div className="test-detail">
                          esperado: <b>{r.expected}</b> · obtuviste:{" "}
                          <b>{r.got}</b>
                        </div>
                      )}
                    </div>
                  );
                })}
                {evalResult.error && (
                  <p className="err" style={{ marginTop: 8 }}>
                    Error: {evalResult.error}
                  </p>
                )}
              </div>
            ) : (
              <p className="prose-note">
                Pulsa "Ejecutar tests" para comprobar tu solución.
              </p>
            )}
            {evalResult?.stdout && (
              <div className="stdout" style={{ marginTop: 10 }}>
                <b>Salida:</b>{" "}
                <span className="stdout-text">{evalResult.stdout}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {traceFrames.length > 0 && (
        <section className="card" style={{ marginTop: 24 }}>
          <div className="controls" style={{ gap: 10 }}>
            <span className="kicker">
              Traza del test: {traceFailedTest?.name ?? ""}
            </span>
            <button className="btn ghost" onClick={() => setTraceFrames([])}>
              cerrar traza
            </button>
          </div>
          <FluidScrubber
            frames={traceFrames}
            render={(f, _blend, _next, index) => (
              <>
                <p className="narrate" key={index}>{f.message}</p>
                <div className="vars-mini">
                  {Object.entries(f.locals).map(([name, value]) => (
                    <span className="var-chip" key={name}>
                      {name} = {value}
                    </span>
                  ))}
                </div>
              </>
            )}
          />
        </section>
      )}

      {allPassed && (
        <section className="card soon-card" style={{ marginTop: 24, borderColor: "#86efac" }}>
          <h3 className="serif">✓ Resuelto</h3>
          <p className="prose-note">{problem.explanation}</p>
          <details className="solution-details">
            <summary>Ver solución de referencia</summary>
            <pre className="snippet" style={{ marginTop: 8 }}>
              {problem.solutionCode}
            </pre>
          </details>
        </section>
      )}
    </article>
  );
}

type EvalState = {
  passed: number;
  total: number;
  results: Array<{
    name: string;
    passed: boolean;
    got: string;
    expected: string;
    hidden: boolean;
  }>;
  stdout: string;
  error: string | null;
};

function getTargetName(setupCode: string): string {
  const m = setupCode.match(/_target\s*=\s*(\w+)/);
  return m ? m[1] : "solucion";
}
