# AlgoBook 📖⚡

[![CI](https://github.com/vgb95/algobookprep/actions/workflows/ci.yml/badge.svg)](https://github.com/vgb95/algobookprep/actions/workflows/ci.yml)

> An interactive handbook for learning **Data Structures & Algorithms** — every visualization is a tape of frames you can play, pause, rewind and scrub through, generated from your own inputs.

Inspired by [cartesian.app](https://cartesian.app), rebuilt on a lean open web stack (React + Vite + TypeScript + Pyodide/WASM).

## ✨ Try it

```bash
npm install
npm run dev
```

Open http://localhost:5173 and head to the *Sorting* chapter or *Code Playback*.

## What's inside (v0.2)

- **Frame-tape playback engine** — every visualization is a tape of precomputed frames; the player plays, pauses, rewinds and scrubs. Rewind is free.
- **Sorting playground** (*Sorting*): bubble, insertion and selection sort with custom arrays, per-step Spanish narration, live comparison/write counters.
- **Arrays playground** (*Arrays*): lookup, insert and delete — animated step by step with read/write metrics.
- **Code Playback** (`#/code-playground`): write Python, hit Run, and a real trace (`sys.settrace` over Pyodide/WASM) becomes a scrubbable frame tape — active line highlighted, live variables, arrays drawn as bars.
- **Problems with evaluator** (`#/problem/two-sum`, `#/problem/contains-duplicate`): CodeMirror 6 editor with Python syntax, visible + hidden tests, step-by-step trace of the failing test, reference solution once solved.
- **Book shell**: 22-chapter sidebar, reading progress in localStorage, zero-dep hash routing, keyboard shortcuts (`space` = play/pause, `←/→` = step).

## How the Code Playback works

Every line of your code produces an immutable frame:

```ts
// inside Pyodide, with sys.settrace active:
_trace.append({
  "line": frame.f_lineno,
  "locals": {k: repr(v) for k, v in frame.f_locals.items()},
  "arrays": {k: v for k, v in frame.f_locals.items() if isinstance(v, list)},
  "stdout": ...,
});
```

The result is a flat `frames[]` that the same `Scrubber` from Phase 1 plays — so pause, rewind and step work identically for sorting animations and for Python code.

## Roadmap

| Phase | Status | Scope |
| --- | --- | --- |
| 0 — Book shell | ✅ done | typography, 22 chapters, local progress |
| 1 — Frame-tape engine | ✅ done | sorting + arrays playgrounds |
| 2 — Code playback | ✅ done | Pyodide + `sys.settrace` tracer |
| 3 — Problems + evaluator | ✅ done | CodeMirror 6, visible/hidden tests, failing-test trace |
| 4 — Viz library | 🔜 next | trees, graphs, heaps, recursion, matrices |
| 5 — Content | 🔜 | full chapter prose |
| 6 — PWA + QOL | 🔜 | offline, bookmarks, notes |

## License

MIT — see [LICENSE](LICENSE).
