# AlgoBook 📖⚡

[![CI](https://github.com/vgb95/algobookprep/actions/workflows/ci.yml/badge.svg)](https://github.com/vgb95/algobookprep/actions/workflows/ci.yml)

> An interactive handbook for learning **Data Structures & Algorithms** — every visualization is a tape of frames you can play, pause, rewind and scrub through, generated from your own inputs.

Inspired by [cartesian.app](https://cartesian.app), rebuilt on a lean open web stack (React + Vite + TypeScript). Next up: code playback with an embedded Python runtime (Pyodide), auto-checked problems, and an offline PWA.

## ✨ Try it

```bash
npm install
npm run dev
```

Open http://localhost:5173 and head to the *Sorting* chapter.

## What's inside (v0.1)

- **Frame-tape playback engine** — every visualization is a generator that yields immutable frames; the player plays, pauses, steps, rewinds and scrubs the tape. Rewind is free because nothing runs in real time.
- **Sorting playground** (*Sorting* chapter): bubble, insertion and selection sort with custom arrays, Spanish per-step narration, and live comparison/write counters.
- **Array operations playground** (*Arrays* chapter): value lookup, index insert and delete — visualized step by step with read/write metrics.
- **Book shell**: 22-chapter sidebar, reading progress saved locally, hash routing with zero dependencies, keyboard shortcuts (`space` = play/pause, `←`/`→` = step).

## How the engine works

Every visualization is just a generator yielding frames:

```ts
function* bubbleSort(a: number[]) {
  for (let i = 0; i < a.length - 1; i++) {
    yield { array: a.slice(), compare: [i, i + 1] /* + message, counters*/ };
  }
}

const frames = record(bubbleSort([7, 3, 9]));
// → the tape is a plain array: the player scrubs it like a video.
```

The player is a dumb scrubber over `frames[]`, so **any** new algorithm only needs a
generator — no animation code, no timing bugs, and rewind/time-travel cost nothing.

## Roadmap

| Phase | Status | Scope |
| --- | --- | --- |
| 0 — Book shell | ✅ done | typography, 22 chapters, local progress |
| 1 — Frame-tape engine | ✅ done | sorting + arrays playgrounds |
| 2 — Code playback | 🔜 next | Pyodide + `sys.settrace` tracer |
| 3 — IDE + evaluator | 🔜 | CodeMirror, tests, multiple solutions |
| 4 — Viz library | 🔜 | trees, graphs, heaps, recursion, matrices |
| 5 — Content | 🔜 | full chapter prose |
| 6 — PWA + QOL | 🔜 | offline, bookmarks, notes |

## License

MIT — see [LICENSE](LICENSE).
