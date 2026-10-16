/**
 * Code Playback engine — Python trazado línea a línea sobre Pyodide.
 *
 * Ejecutamos el código del usuario dentro de un intérprete Python real
 * (WASM) con sys.settrace. Cada evento 'line' graba un frame inmutable:
 * número de línea, valor de las variables (repr), arrays como listas JS,
 * y stdout acumulado. El reproductor de cinta (Scrubber) de la Fase 1
 * los muestra tal cual — mismo motor, distinto generador.
 */

let pyodide: any = null;
let initPromise: Promise<void> | null = null;

export interface TraceFrame {
  line: number;
  message: string;
  locals: Record<string, string>;
  arrays: Record<string, number[]>;
  stdout: string;
}

const PYODIDE_URL =
  "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js";

export async function initPyodide(): Promise<void> {
  if (pyodide) return;
  if (!initPromise) {
    initPromise = (async () => {
      const loadPyodide = (window as any).loadPyodide;
      if (!loadPyodide) {
        throw new Error(
          "Pyodide no cargado. Asegúrate de incluir el script en index.html (" +
            PYODIDE_URL +
            ").",
        );
      }
      pyodide = await loadPyodide();
      await pyodide.loadPackage(["stdlib"]);
    })();
  }
  await initPromise;
}

/**
 * Ejecuta `code` con un tracer activo y devuelve la cinta de frames.
 * `maxSteps` corta bucles infinitos antes de que cuelguen la pestaña.
 */
export async function runTraced(
  code: string,
  maxSteps: number = 5000,
  stdin: string = "",
): Promise<TraceFrame[]> {
  await initPyodide();

  // Entrada estándar del programa: se fija en cada ejecución para que no
  // queden restos entre runs. Vacío = EOF inmediato (input() lanza EOFError).
  const chars = Array.from(stdin).map((c) => c.codePointAt(0) ?? 10);
  let pos = 0;
  pyodide.setStdin({ stdin: () => (pos < chars.length ? chars[pos++] : null) });

  const tracer = `
import sys, json

class _Out:
    def __init__(self):
        self.buf = []
    def write(self, s):
        self.buf.append(s)
        return len(s)
    def flush(self):
        pass

_out = _Out()
sys.stdout = _out
sys.stderr = _out

_trace = []
_step = 0
MAX_STEPS = ${maxSteps}

def _trace_func(frame, event, arg):
    global _step
    if event == "line":
        _step += 1
        if _step > MAX_STEPS:
            raise RuntimeError(
                "Demasiados pasos ejecutados (posible bucle infinito)")
        locals_map = {k: repr(v) for k, v in frame.f_locals.items()}
        arrays_map = {k: v for k, v in frame.f_locals.items() if isinstance(v, list)}
        _trace.append({
            "line": frame.f_lineno,
            "message": "Línea " + str(frame.f_lineno),
            "locals": locals_map,
            "arrays": arrays_map,
            "stdout": "".join(_out.buf),
        })
    return _trace_func

sys.settrace(_trace_func)

${code}

sys.settrace(None)
`;

  await pyodide.runPythonAsync(tracer);
  const raw = pyodide.globals.get("_trace").toJs();
  return Array.from(raw) as TraceFrame[];
}
