/**
 * Fase A — transporte de reproducción fluida.
 * Misma API mental que Scrubber (play/pausa/pasos/velocidad/scrub +
 * atajos de teclado) pero sobre usePlayback: tiempo continuo con
 * requestAnimationFrame. El slider es fraccionario: arrastrarlo
 * interpola entre cuadros en vez de saltar.
 */
import { useEffect, type ReactNode } from "react";
import { usePlayback } from "../../hooks/usePlayback";
import type { Frame } from "../../engine/timeline";

interface Props<F extends Frame> {
  frames: readonly F[];
  /** render(cuadroActual, blend 0..1, cuadroSiguiente) */
  render: (frame: F, blend: number, next: F) => ReactNode;
}

const SPEEDS = [0.5, 1, 2];

export default function FluidScrubber<F extends Frame>({ frames, render }: Props<F>) {
  const p = usePlayback(frames.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === " ") {
        e.preventDefault();
        p.toggle();
      } else if (e.key === "ArrowLeft") {
        p.step(-1);
      } else if (e.key === "ArrowRight") {
        p.step(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (frames.length === 0) {
    return <div className="viz-placeholder">No hay cuadros que reproducir — revisa los parámetros.</div>;
  }

  const frame = frames[p.index];
  const next = frames[Math.min(p.index + 1, p.last)];
  const atStart = p.pos <= 0;
  const atEnd = p.pos >= p.last;

  const press = (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    fn();
    e.currentTarget.blur();
  };

  return (
    <div className="player">
      <div className="stage fluid-stage">{render(frame, p.blend, next)}</div>
      <div className="player-controls">
        <button className="btn ghost" onClick={press(p.restart)} disabled={atStart} title="Reiniciar">
          ⏮
        </button>
        <button
          className="btn ghost"
          onClick={press(() => p.step(-1))}
          disabled={atStart}
          title="Paso atrás (←)"
        >
          ◀
        </button>
        <button
          className="btn primary"
          onClick={press(p.toggle)}
          disabled={p.last === 0}
          title="Play / pausa (espacio)"
        >
          {p.playing ? "⏸ pausa" : "▶ play"}
        </button>
        <button
          className="btn ghost"
          onClick={press(() => p.step(1))}
          disabled={atEnd}
          title="Paso adelante (→)"
        >
          ▶
        </button>
        <select
          value={p.speed}
          onChange={(e) => p.setSpeed(Number(e.target.value))}
          title="Velocidad"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>
              {s}×
            </option>
          ))}
        </select>
        <span className="counter">
          cuadro {p.index + 1} / {frames.length}
        </span>
      </div>
      <input
        type="range"
        className="scrub"
        min={0}
        max={p.last}
        step={0.01}
        value={p.pos}
        onChange={(e) => p.seek(Number(e.target.value))}
        onPointerUp={(e) => e.currentTarget.blur()}
        aria-label="Línea de tiempo"
      />
      <div className="hints">
        <span className="kbd">espacio</span> reproducir / pausar
        <span className="kbd">←</span>
        <span className="kbd">→</span> paso a paso
      </div>
    </div>
  );
}
