import { useState } from "react";
import { problems } from "../content/problems";
import { chapters } from "../content/chapters";
import CodeEditor from "../components/editor/CodeEditor";
import PyCode from "../components/PyCode";
import { evaluateSolution, pyLiteral, resolveTargetName } from "../engine/evaluator";
import FluidScrubber from "../components/viz/FluidScrubber";
import { runTraced } from "../engine/pyodide";
import { useI18n } from "../engine/i18n";
import { isSolved, markSolved } from "../engine/solved";

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
  const { lang, t } = useI18n();
  const problem = problems.find((p) => p.id === id);
  const chapter = chapters.find((c) => c.id === problem?.chapter);
  const siblings = problems.filter(
    (p) => p.chapter === problem?.chapter && p.id !== problem?.id,
  );

  const diffLabel = (d: string): string =>
    lang === "en"
      ? d === "fácil"
        ? t("problem.diffEasy")
        : d === "medio"
          ? t("problem.diffMedium")
          : t("problem.diffHard")
      : d;

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
  const [solved, setSolved] = useState(() => isSolved(problem?.id ?? ""));

  if (!problem) {
    return (
      <div className="notfound">
        <h1 className="serif">{t("problem.notFoundTitle")}</h1>
        <p className="lede">{t("problem.notFoundBody")}</p>
        <a className="btn primary" href="#/problems">{t("problem.backToBank")}</a>
      </div>
    );
  }

  const runTests = async () => {
    setLoading(true);
    setEvalResult(null);
    try {
      const result = await evaluateSolution({
        lang,
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
      if (result.passed === result.total && result.total > 0) {
        markSolved(problem.id);
        setSolved(true);
      }
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
_result = _target(*${callArgs})
`;
      const frames = await runTraced(tracedCode, 2000);
      setTraceCode(tracedCode);
      setTraceFrames(frames);
    } catch {
      setTraceError(t("problem.traceError"));
    }
  };

  return (
    <article>
      <div className="kicker">
        {t("problem.kickerA")} {chapter?.num}{chapter ? ` · ${chapter.title}` : ""} ·{" "}
        <span className={`diff ${DIFF_CLASS[problem.difficulty] ?? ""}`}>
          {diffLabel(problem.difficulty)}
        </span>
      </div>
      <h1 className="serif">{problem.title}</h1>
      <p className="lede">{problem.blurb}</p>
      {lang === "en" && (
        <p className="prose-note i18n-mini">Statement still in Spanish — English on the way.</p>
      )}

      {siblings.length > 0 && (
        <div className="sibling-row">
          <span className="prose-note">{t("problem.moreChapter")}</span>
          {siblings.map((s) => (
            <a key={s.id} className="badge chip-link" href={`#/problem/${s.id}`}>
              {s.title}
            </a>
          ))}
        </div>
      )}

      <nav className="tabs" style={{ marginTop: 16 }}>
        {(["enunciado", "pistas", "solucion"] as const).map((tb) => (
          <button
            key={tb}
            className={`tab ${tab === tb ? "active" : ""}`}
            onClick={() => setTab(tb)}
          >
            {tb === "solucion" && (allPassed || solved)
              ? t("problem.tabSolved")
              : tb === "solucion"
                ? t("problem.tabSolution")
                : tb === "pistas"
                  ? t("problem.tabHints")
                  : t("problem.tabStatement")}
          </button>
        ))}
      </nav>

      {tab === "enunciado" && (
        <section className="card" style={{ marginTop: 16 }}>
          <div className="controls" style={{ gap: 10 }}>
            <button className="btn primary" onClick={runTests} disabled={loading}>
              {loading ? t("problem.running") : t("problem.run")}
            </button>
            <button
              className="btn ghost"
              onClick={() => {
                setUserCode(problem.starterCode);
                setEvalResult(null);
              }}
              disabled={loading}
            >
              {t("problem.reset")}
            </button>
            {(allPassed || solved) && (
              <span
                className="badge"
                style={{ background: "#e7f8ee", color: "#16a34a", borderColor: "#86efac" }}
              >
                {t("problem.allPass")}
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
                {t("problem.testsH")}
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
                        {r.hidden && <span className="test-hidden">{t("problem.hidden")}</span>}
                        {!r.passed && !r.hidden && (
                          <>
                            <div className="test-detail">
                              {t("problem.expected")} <b>{r.expected}</b> · {t("problem.got")} <b>{r.got}</b>
                            </div>
                            <button
                              className="btn ghost"
                              onClick={() => showTrace(r.name)}
                              style={{ marginTop: 4, fontSize: "0.75rem" }}
                            >
                              {t("problem.viewTrace")}
                            </button>
                          </>
                        )}
                        {!r.passed && r.hidden && (
                          <div className="test-detail">
                            {t("problem.hiddenFail")}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {evalResult.error && (
                    <p className="err" style={{ marginTop: 8 }}>
                      {t("problem.errPrefix")} {evalResult.error}
                    </p>
                  )}
                  {traceError && (
                    <p className="err" style={{ marginTop: 8 }}>
                      {t("problem.tracePrefix")} {traceError}
                    </p>
                  )}
                </div>
              ) : (
                <p className="prose-note">
                  {t("problem.runHint")}
                </p>
              )}
              {evalResult?.stdout && (
                <div className="stdout" style={{ marginTop: 10 }}>
                  <b>{t("problem.output")}</b> <span className="stdout-text">{evalResult.stdout}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {tab === "pistas" && (
        <section className="card" style={{ marginTop: 16 }}>
          <h3 className="serif" style={{ fontSize: "1rem" }}>
            {t("problem.hintsTitle")}
          </h3>
          <p className="prose-note">{t("problem.hintsIntro")}</p>
          <ol className="hint-list">
            {problem.hints.slice(0, hintCount).map((h, i) => (
              <li key={i} className="hint-item">
                <span className="hint-tag">{t("problem.hintN", { n: i + 1 })}</span>
                {h}
              </li>
            ))}
          </ol>
          {hintCount < problem.hints.length ? (
            <button className="btn ghost" onClick={() => setHintCount(hintCount + 1)}>
              {t("problem.moreHint", { a: hintCount, b: problem.hints.length })}
            </button>
          ) : (
            <p className="prose-note" style={{ marginTop: 8 }}>
              {t("problem.lastHint")}
            </p>
          )}
        </section>
      )}

      {tab === "solucion" && (
        <section className="card" style={{ marginTop: 16 }}>
          {(allPassed || solved) ? (
            <>
              <h3 className="serif" style={{ fontSize: "1rem" }}>
                {t("problem.solvedH")}
              </h3>
              <p className="prose-block">{problem.explanation}</p>
              <p className="prose-block">
                <b>{t("problem.tradeoffLabel")}</b> {problem.tradeoff}
              </p>
              <details className="solution-details">
                <summary>{t("problem.refCode")}</summary>
                <PyCode code={problem.solutionCode} style={{ marginTop: 8 }} />
              </details>
            </>
          ) : (
            <>
              <h3 className="serif" style={{ fontSize: "1rem" }}>
                {t("problem.lockedH")}
              </h3>
              <p className="prose-note">{t("problem.lockedBody", { n: problem.hints.length })}</p>
              <button className="btn primary" onClick={() => setTab("enunciado")}>
                {t("problem.goEditor")}
              </button>
            </>
          )}
        </section>
      )}

      {traceFrames.length > 0 && tab === "enunciado" && (
        <section className="card" style={{ marginTop: 24 }}>
          <div className="controls" style={{ gap: 10 }}>
            <span className="kicker">
              {t("problem.traceKicker", { name: traceFailedTest?.name ?? "" })}
            </span>
            <button className="btn ghost" onClick={() => setTraceFrames([])}>
              {t("problem.closeTrace")}
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
