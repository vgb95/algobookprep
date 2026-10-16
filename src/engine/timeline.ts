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
}

export type FrameGenerator<T extends Frame> = Generator<T, void, undefined>;

/** Run a generator to completion and materialise the frame tape. */
export function record<T extends Frame>(gen: FrameGenerator<T>): T[] {
  const frames: T[] = [];
  for (const frame of gen) frames.push(frame);
  return frames;
}
