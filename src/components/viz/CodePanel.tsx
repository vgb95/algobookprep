/**
 * CodePanel — la mitad "código" del code playback (estilo cartesian).
 *
 * Muestra el snippet Python canónico del algoritmo con:
 *  - la línea activa resaltada (el cuadro actual del generador la ejecuta);
 *  - las líneas ya ejecutadas "fantasma" (seadas);
 *  - chips con las variables vivas del cuadro, actualizadas en vivo.
 *
 * No necesita estado: todo lo deriva del cuadro actual que le pasa el
 * reproductor gracias a frames[].line / frames[].vars.
 */
import { useMemo } from "react";

interface CodePanelProps {
  source: string;
  /** Línea ejecutada AHORA (1-based). */
  active?: number;
  /** Conjunto de líneas ya ejecutadas. */
  seen?: Set<number>;
  /** Variables vivas del cuadro actual. */
  vars?: Record<string, string | number>;
}

export default function CodePanel({ source, active, seen, vars }: CodePanelProps) {
  const lines = useMemo(() => source.split("\n"), [source]);
  const entries = vars ? Object.entries(vars) : [];

  return (
    <div className="code-panel" aria-live="polite">
      <div className="code-panel-title">
        <span className="lang">python</span>
        <span className="hint">paso a paso</span>
      </div>
      <pre className="code-src">
        {lines.map((src, i) => {
          const n = i + 1;
          const isActive = active === n;
          const isSeen = !isActive && seen?.has(n);
          return (
            <div key={n} className={`code-line${isActive ? " active" : isSeen ? " done" : ""}`}>
              <span className="ln">{n}</span>
              <span className="src">{src || " "}</span>
            </div>
          );
        })}
      </pre>
      {entries.length > 0 && (
        <div className="code-vars">
          {entries.map(([k, v]) => (
            <span key={k} className="var">
              <b>{k}</b>
              <span className="val">{String(v)}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
