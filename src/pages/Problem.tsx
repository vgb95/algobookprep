import { useState } from "react";
import { problems } from "../content/problems";
import { chapters } from "../content/chapters";
import CodeEditor from "../components/editor/CodeEditor";
import { evaluateSolution, pyLiteral, resolveTargetName } from "../engine/evaluator";
import FluidScrubber from "../components/viz/FluidScrubber";
import { runTraced } from "../engine/pyodide";

type Tab = "enunciado" | "pistas" | "solucion";

const DIFF_CLASS: Record<string, string> = {
  fácil: "diff-facil",
  medio: "diff-medio",
  difícil: "diff-dificil",
};

/**
 * Página de un problema de programación.
 * Tabs: Enunciado (statement + editor + tests), Pistas (progresivas) y
 * Solución (desbloqueada al pasar todos los tests): explicación, tradeoff
 * y código de referencia. Si un test falla, la traza paso a paso de ese
 * test usa el mismo reproductor de cinta de cuadros.
 */
export default function Problem({ id }: { id: string }) {
  const problem = problems.find((p) => p.id === id);
  const chapter = chapters.find((c) => c.id === problem?.chapter);
  const siblings = problems.filter(
    (p) => p.chapter === problem?.chapter && p.id !== problem?.id,
  );

  const [tab, setTab] = useState<Tab>("enunciado");
  const [hintCount, setHintCount] = useState(1);
  const [userCode, setUserCode] = useState(problem?.starterCode ?? "");
  const [evalResult, setEvalResult] = useState<AllResultState | null>(null);
  const [loading, setLoading] = useState(false);
  const [traceFrames, setTraceFrames] = useState<{
    line: number;
    message: string;
    locals: Record<string, string>;
    arrays: Record<string, number[]>;
    stdout: string;
  }[]>([]);
  const [traceCode, setTraceCode] = useState("");
  const [traceError, setTraceError] = useState("");
  const [traceFailedTest, setTraceFailedTest] = useState<{
    name: string;
    args: unknown;
    expected: unknown;
  } | null>(null);

  if (!problem) {
    return (
      <div className="notfound">
        <h1 className="serif">Problema no encontrado</h1>
        <p className="lede">Ese problema no existe todavía.</p>
        <a className="btn primary" href="#/problems">← Ver el banco de problemas</a>
      </div>
    );
  }

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
    } catch (e: unknown) {
      setEvalResult({
        passed: 0,
        total: problem.tests.length,
        results: [],
        stdout: "",
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setLoading(false);
    }
  };

  const allPassed =
    evalResult != null && evalResult.passed === evalResult.total && evalResult.total > 0;

  const showTrace = async (testName: string) => {
    const test = problem.tests.find((t) => t.name === testName);
    if (!test) return;
    setTraceFailedTest(test);
    setTraceFrames([]);
    setTraceError("");
    try {
      const callArgs = `[${test.args.map(pyLiteral).join(", ")}]`;
      const tracedCode = `
${problem.setupCode}
${userCode}
_target = ${resolveTargetName(problem.setupCode, userCode)}
_result = _target(${callArgs})
`;
      const frames = await runTraced(tracedCode, 2000);
      setTraceCode(tracedCode);
      setTraceFrames(frames);
    } catch {
      setTraceError(
        "no se pudo dibujar la traza — tu código lanza un error o supera el límite de pasos antes de terminar este test",
      );
    }
  };

  return (
    <article>
      <div className="kicker">
        problema · cap. {chapter?.num} {chapter ? `· ${chapter.title}` : ""} ·{" "}
        <span className={`diff ${DIFF_CLASS[problem.difficulty] ?? ""}`}>{problem.difficulty}</span>
      </div>
      <h1 className="serif">{problem.title}</h1>
      <p className="lede">{problem.blurb}</p>

      {siblings.length > 0 && (
        <div className="sibling-row">
          <span className="prose-note">más del capítulo:</span>
          {siblings.map((s) => (
            <a key={s.id} className="badge chip-link" href={`#/problem/${s.id}`}>
              {s.title}
            </a>
          ))}
        </div>
      )}

      <nav className="tabs" style={{ marginTop: 16 }}>
        {(["enunciado", "pistas", "solucion"] as const).map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "solucion" && allPassed ? "✓ solución" : t}
          </button>
        ))}
      </nav>

      {tab === "enunciado" && (
        <section className="card" style={{ marginTop: 16 }}>
          <div className="controls" style={{ gap: 10 }}>
            <button className="btn primary" onClick={runTests} disabled={loading}>
              {loading ? "Ejecutando…" : "▶ Ejecutar tests"}
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                setUserCode(problem.starterCode);
                setEvalResult(null);
              }}
              disabled={loading}
            >
              ↺ reiniciar código
            </button>
            {allPassed && (
              <span
                className="badge"
                style={{ background: "#e7f8ee", color: "#16a34a", borderColor: "#86efac" }}
              >
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
                        {!r.passed && !r.hidden && (
                          <>
                            <div className="test-detail">
                              esperado: <b>{r.expected}</b> · obtuviste: <b>{r.got}</b>
                            </div>
                            <button
                              className="btn ghost"
                              onClick={() => showTrace(r.name)}
                              style={{ marginTop: 4, fontSize: "0.75rem" }}
                            >
                              ver traza paso a paso
                            </button>
                          </>
                        )}
                        {!r.passed && r.hidden && (
                          <div className="test-detail">
                            falla — los datos del test oculto no se revelan
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
                  {traceError && (
                    <p className="err" style={{ marginTop: 8 }}>
                      Traza: {traceError}
                    </p>
                  )}
                </div>
              ) : (
                <p className="prose-note">
                  Pulsa «Ejecutar tests» para comprobar tu solución.
                </p>
              )}
              {evalResult?.stdout && (
                <div className="stdout" style={{ marginTop: 10 }}>
                  <b>Salida:</b> <span className="stdout-text">{evalResult.stdout}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {tab === "pistas" && (
        <section className="card" style={{ marginTop: 16 }}>
          <h3 className="serif" style={{ fontSize: "1rem" }}>
            Pistas progresivas
          </h3>
          <p className="prose-note">
            Intenta resolverlo con la primera antes de pedir la siguiente — cada una destapa
            solo una capa del razonamiento.
          </p>
          <ol className="hint-list">
            {problem.hints.slice(0, hintCount).map((h, i) => (
              <li key={i} className="hint-item">
                <span className="hint-tag">pista {i + 1}</span>
                {h}
              </li>
            ))}
          </ol>
          {hintCount < problem.hints.length ? (
            <button className="btn ghost" onClick={() => setHintCount(hintCount + 1)}>
              + otra pista ({hintCount}/{problem.hints.length})
            </button>
          ) : (
            <p className="prose-note" style={{ marginTop: 8 }}>
              Era la última pista — ya tienes todo lo que necesita la solución.
            </p>
          )}
        </section>
      )}

      {tab === "solucion" && (
        <section className="card" style={{ marginTop: 16 }}>
          {allPassed ? (
            <>
              <h3 className="serif" style={{ fontSize: "1rem" }}>
                ✓ Resuelto — así lo hace la referencia
              </h3>
              <p className="prose-block">{problem.explanation}</p>
              <p className="prose-block">
                <b>Tradeoff:</b> {problem.tradeoff}
              </p>
              <details className="solution-details">
                <summary>Ver código de referencia</summary>
                <pre className="snippet" style={{ marginTop: 8 }}>
                  {problem.solutionCode}
                </pre>
              </details>
            </>
          ) : (
            <>
              <h3 className="serif" style={{ fontSize: "1rem" }}>
                Solución bloqueada
              </h3>
              <p className="prose-note">
                Pasa todos los tests para desbloquear la explicación, el tradeoff y el código de
                referencia. Si te atascas, tienes {problem.hints.length} pistas en la pestaña
                «pistas».
              </p>
              <button className="btn primary" onClick={() => setTab("enunciado")}>
                Ir al editor
              </button>
            </>
          )}
        </section>
      )}

      {traceFrames.length > 0 && tab === "enunciado" && (
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
            code={traceCode}
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
    </article>
  );
}

type AllResultState = {
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
