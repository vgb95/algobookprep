/**
 * The Frame Tape engine.
 *
 * Nothing in AlgoBook runs in real time. A visualization is a generator
 * that yields immutable snapshots ("frames"); we record them all upfront
 * and the player just scrubs through the tape. Play, pause, rewind and
 * step come for free because there is no clock — only steps.
 */

export interface Frame {
  message: string;
  /**
   * Code playback (Fase 2): línea activa del snippet Python canónico
   * que este cuadro ejecuta (1-based). El panel de código la resalta
   * y "fantasma" todas las líneas ya pasadas.
   */
  line?: number;
  /**
   * Permanencia: multiplicador de tiempo que el reproductor se detiene
   * avanzando DESDE este cuadro (2.5 = pausa extendida en un hito).
   */
  hold?: number;
  /** Variables vivas en este cuadro, para los chips del panel de código. */
  vars?: Record<string, string | number>;
}

export type FrameGenerator<T extends Frame> = Generator<T, void, undefined>;

/** Run a generator to completion and materialise the frame tape. */
export function record<T extends Frame>(gen: FrameGenerator<T>): T[] {
  const frames: T[] = [];
  for (const frame of gen) frames.push(frame);
  return frames;
}
