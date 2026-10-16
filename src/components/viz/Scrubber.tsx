import { useEffect, useState, type ReactNode } from "react";

interface Props<F> {
  frames: readonly F[];
  render: (frame: F) => ReactNode;
}

const SPEEDS: { label: string; ms: number }[] = [
  { label: "0.5×", ms: 900 },
  { label: "1×", ms: 420 },
  { label: "2×", ms: 160 },
];

export default function Scrubber<F extends { message: string }>({ frames, render }: Props<F>) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(420); // ms por cuadro

  const last = Math.max(frames.length - 1, 0);
  const atStart = index === 0;
  const atEnd = index >= last;

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [frames]);

  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setIndex((i) => Math.min(i + 1, last)), speed);
    return () => window.clearTimeout(t);
  }, [playing, index, speed, last]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "ArrowLeft") {
        setPlaying(false);
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        setPlaying(false);
        setIndex((i) => Math.min(last, i + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last]);

  const press = (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    fn();
    e.currentTarget.blur();
  };

  return (
    <div className="player">
      <div className="stage">{render(frames[index])}</div>
      <div className="player-controls">
        <button
          className="btn ghost"
          onClick={press(() => {
            setIndex(0);
            setPlaying(false);
          })}
          disabled={atStart}
          title="Reiniciar"
        >
          ⏮
        </button>
        <button
          className="btn ghost"
          onClick={press(() => {
            setPlaying(false);
            setIndex((i) => Math.max(0, i - 1));
          })}
          disabled={atStart}
          title="Paso atrás (←)"
        >
          ◀
        </button>
        <button
          className="btn primary"
          onClick={press(() => {
            if (atEnd) setIndex(0);
            setPlaying((p) => !p);
          })}
          title="Play / pausa (espacio)"
        >
          {playing ? "⏸ pausa" : "▶ play"}
        </button>
        <button
          className="btn ghost"
          onClick={press(() => {
            setPlaying(false);
            setIndex((i) => Math.min(last, i + 1));
          })}
          disabled={atEnd}
          title="Paso adelante (→)"
        >
          ▶
        </button>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          title="Velocidad"
        >
          {SPEEDS.map((s) => (
            <option key={s.ms} value={s.ms}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="counter">
          cuadro {Math.min(index + 1, frames.length)} / {frames.length}
        </span>
      </div>
      <input
        type="range"
        className="scrub"
        min={0}
        max={last}
        value={index}
        onChange={(e) => {
          setPlaying(false);
          setIndex(Number(e.target.value));
        }}
        onPointerUp={(e) => e.currentTarget.blur()}
        aria-label="Línea de tiempo"
      />
      <div className="hints">
        <span className="kbd">espacio</span> reproducir / pausar
        <span className="kbd">←</span><span className="kbd">→</span> paso a paso
      </div>
    </div>
  );
}
