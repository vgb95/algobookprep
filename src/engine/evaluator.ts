/**
 * Evaluador de problemas.
 *
 * Recibe la solución del usuario, el código de setup (que define la función
 * a testear) y una batería de tests. Ejecuta todo dentro de Pyodide y devuelve
 * qué tests pasan y cuáles fallan.
 */

import { initPyodide } from "./pyodide";

/**
 * Nombre de la función a testear. Preferencias:
 *  1) la etiqueta explícita «_target = nombre» en el setup del problema,
 *  2) cualquier «_target = nombre» que el alumno dejara escrito,
 *  3) el primer «def» que exista en setup o solución.
 * Antes se parseaba SOLO la solución del alumno (que no suele traer la
 * etiqueta) y saltaba a un fallback roto («solucion») → NameError.
 */
export function resolveTargetName(setupCode: string, solutionCode: string): string {
  const inSetup = setupCode.match(/_target\s*=\s*([A-Za-z_]\w*)/);
  if (inSetup) return inSetup[1];
  const inUser = solutionCode.match(/_target\s*=\s*([A-Za-z_]\w*)/);
  if (inUser) return inUser[1];
  const defn = (setupCode + "\n" + solutionCode).match(/def\s+([A-Za-z_]\w*)/);
  return defn ? defn[1] : "solucion";
}

export interface ProblemTest {
  name: string;
  args: any[];
  expected: any;
  hidden?: boolean;
}

/**
 * Serializa un valor JS como literal de Python.
 * JSON.stringify produce true/false/null en minúsculas — Python pide
 * True/False/None (un NameError no capturable rompería cada test).
 */
export function pyLiteral(v: unknown): string {
  if (v === null || v === undefined) return "None";
  if (typeof v === "boolean") return v ? "True" : "False";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(pyLiteral).join(", ")}]`;
  if (typeof v === "object") {
    const entries = Object.entries(v as Record<string, unknown>).map(
      ([k, val]) => `${JSON.stringify(k)}: ${pyLiteral(val)}`,
    );
    return `{${entries.join(", ")}}`;
  }
  return JSON.stringify(v);
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
    // Los corchetes SON los paréntesis de la llamada: _target([a, b]) ≡ _target(a, b).
    const argsPy = `[${t.args.map(pyLiteral).join(", ")}]`;
    const expectedPy = pyLiteral(t.expected);
    const hiddenPy = t.hidden === true ? "True" : "False";
    return `
_budget_reset()
try:
    _result = _target(${argsPy})
    _ok = _result == ${expectedPy}
except Exception as _e:
    _result = f"ERROR: {_e}"
    _ok = False
_tests.append({
    "name": ${JSON.stringify(t.name)},
    "passed": _ok,
    "got": repr(_result),
    "expected": repr(${expectedPy}),
    "hidden": ${hiddenPy},
});
`;
  }).join("\n");

  const runner = `
import sys, time

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

# --- presupuesto por test: corta bucles infinitos y soluciones tontas ---
# El tracer de Python cuesta ~x2-x5 en bucles; los tests cosen pequeños,
# y la ganancia (nunca colgar la pestaña) bien vale el sobrecoste.
_pasos = 0
_t0 = 0.0

def _budget_reset():
    global _pasos, _t0
    _pasos = 0
    _t0 = time.time()

def _budget_check(frame, event, arg):
    global _pasos
    _pasos += 1
    if _pasos > 2000000:
        raise RuntimeError(
            "más de 2M de pasos — ¿bucle infinito?"
        )
    if (_pasos & 1023) == 0 and (time.time() - _t0) > 5.0:
        raise RuntimeError(
            "más de 5 s en un test — imposible: busca un algoritmo más rápido"
        )
    return _budget_check

sys.settrace(_budget_check)

${setupCode}

${solutionCode}

_target = ${resolveTargetName(setupCode, solutionCode)}

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

