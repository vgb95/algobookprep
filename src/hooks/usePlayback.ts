import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Fase A — motor de reproducción en tiempo continuo.
 *
 * En vez de saltar de cuadro discreto en cuadro discreto con setTimeout,
 * el player avanza una posición fraccionaria sobre una línea de tiempo
 * (pasos por segundo × velocidad) con requestAnimationFrame. Los
 * visualizadores reciben (índice, blend) e interpolan entre el cuadro
 * actual y el siguiente: las barras se deslizan, los colores funden.
 * Pausa, rewind, paso a paso y scrub fraccionario salen gratis porque
 * solo hay un reloj — no una cadena de timeouts.
 */

export interface Playback {
  /** Posición fraccionaria en la cinta (0 = primer cuadro). */
  pos: number;
  /** Cuadro actual = floor(pos). */
  index: number;
  /** 0..1 con easing hacia el cuadro siguiente (0 si pausado en entero). */
  blend: number;
  playing: boolean;
  speed: number;
  last: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  restart: () => void;
  step: (delta: number) => void;
  seek: (pos: number) => void;
  setSpeed: (s: number) => void;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function usePlayback(count: number, stepsPerSecond = 2.4): Playback {
  const last = Math.max(count - 1, 0);
  const [pos, setPos] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeedState] = useState(1);

  const posRef = useRef(0);
  const speedRef = useRef(1);
  const playingRef = useRef(false);
  const lastRef = useRef(last);
  lastRef.current = last;

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  // Nueva cinta → rebobinar y pausar.
  useEffect(() => {
    posRef.current = 0;
    setPos(0);
    playingRef.current = false;
    setPlaying(false);
  }, [count]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      let next = posRef.current + dt * stepsPerSecond * speedRef.current;
      if (next >= lastRef.current) {
        next = lastRef.current;
        posRef.current = next;
        setPos(next);
        playingRef.current = false;
        setPlaying(false);
        return;
      }
      posRef.current = next;
      setPos(reduced ? Math.round(next) : next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, stepsPerSecond, reduced]);

  const pause = useCallback(() => {
    posRef.current = Math.round(posRef.current * 1000) / 1000;
    setPos(posRef.current);
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (posRef.current >= lastRef.current) posRef.current = 0;
    setPos(posRef.current);
    playingRef.current = true;
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (playingRef.current) {
      posRef.current = Math.round(posRef.current * 1000) / 1000;
      setPos(posRef.current);
      playingRef.current = false;
      setPlaying(false);
    } else {
      if (posRef.current >= lastRef.current) posRef.current = 0;
      setPos(posRef.current);
      playingRef.current = true;
      setPlaying(true);
    }
  }, []);

  const restart = useCallback(() => {
    posRef.current = 0;
    setPos(0);
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const step = useCallback(
    (delta: number) => {
      const next = clamp(Math.round(posRef.current) + delta, 0, lastRef.current);
      posRef.current = next;
      setPos(next);
      playingRef.current = false;
      setPlaying(false);
    },
    [],
  );

  const seek = useCallback((p: number) => {
    const next = clamp(p, 0, lastRef.current);
    posRef.current = next;
    setPos(next);
    playingRef.current = false;
    setPlaying(false);
  }, []);

  const setSpeed = useCallback((s: number) => {
    speedRef.current = s;
    setSpeedState(s);
  }, []);

  const index = Math.min(Math.floor(pos), last);
  const rawBlend = index >= last ? 0 : pos - index;
  const blend = reduced ? 0 : smooth(clamp(rawBlend, 0, 1));

  return {
    pos,
    index,
    blend,
    playing,
    speed,
    last,
    play,
    pause,
    toggle,
    restart,
    step,
    seek,
    setSpeed,
  };
}
