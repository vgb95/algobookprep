/**
 * Evaluador de problemas.
 *
 * Recibe la solución del usuario, el código de setup (que define la función
 * a testear) y una batería de tests. Ejecuta todo dentro de Pyodide y devuelve
 * qué tests pasan y cuáles fallan.
 */

import { initPyodide } from "./pyodide";

export interface ProblemTest {
  name: string;
  args: any[];
  expected: any;
  hidden?: boolean;
}

export interface TestResult {
  name: string;
  passed: boolean;
  got: string;
  expected: string;
  hidden: boolean;
}

export interface EvaluationResult {
  passed: number;
  total: number;
  results: TestResult[];
  stdout: string;
  error: string | null;
}

export async function evaluateSolution({
  solutionCode,
  setupCode = "",
  tests,
}: {
  solutionCode: string;
  setupCode?: string;
  tests: ProblemTest[];
}): Promise<EvaluationResult> {
  await initPyodide();

  const testCalls = tests.map((t) => {
    const argsJs = JSON.stringify(t.args);
    const expectedJs = JSON.stringify(t.expected);
    return `
try:
    _result = _target(${argsJs})
    _ok = _result == ${expectedJs}
except Exception as _e:
    _result = f"ERROR: {_e}"
    _ok = False
_tests.append({
    "name": ${JSON.stringify(t.name)},
    "passed": _ok,
    "got": repr(_result),
    "expected": ${expectedJs},
    "hidden": ${t.hidden === true},
});
`;
  }).join("\n");

  const runner = `
import sys

_out = []
class _Out:
    def write(self, s):
        _out.append(str(s))
        return len(s)
    def flush(self):
        pass
sys.stdout = _Out()
sys.stderr = _Out()

_tests = []

${setupCode}

${solutionCode}

_target = ${getTargetName(solutionCode)}

${testCalls}

sys.settrace(None)
`;

  try {
    await pyodideRun(runner);

    const resultsRaw = pyodide.globals.get("_tests").toJs();
    const stdoutRaw = pyodide.globals.get("_out").toJs();

    const results: TestResult[] = Array.from(resultsRaw).map((r: any) => ({
      name: r.name,
      passed: r.passed,
      got: r.got,
      expected: r.expected,
      hidden: r.hidden,
    }));

    const passed = results.filter((r) => r.passed).length;

    return {
      passed,
      total: results.length,
      results,
      stdout: Array.from(stdoutRaw).join(""),
      error: null,
    };
  } catch (e: any) {
    return {
      passed: 0,
      total: tests.length,
      results: tests.map((t) => ({
        name: t.name,
        passed: false,
        got: "—",
        expected: "",
        hidden: t.hidden === true,
      })),
      stdout: "",
      error: e?.message || String(e),
    };
  }
}

let pyodide: any = null;

async function pyodideRun(code: string): Promise<void> {
  if (!pyodide) {
    throw new Error("Pyodide no inicializado. Llama a initPyodide primero.");
  }
  await pyodide.runPythonAsync(code);
}

function getTargetName(solutionCode: string): string {
  const defs = solutionCode.match(/def\s+(\w+)/g);
  if (defs) {
    const last = defs[defs.length - 1];
    const name = last.match(/def\s+(\w+)/)?.[1];
    if (name) return name;
  }
  return "solucion";
}
