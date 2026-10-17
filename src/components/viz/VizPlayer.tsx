/**
 * VizPlayer — reproduce cualquier visualización a partir de configuración.
 *
 * Fase 5: además de RENDERIZAR una cinta, es EDITABLE — cada tipo le
 * expone sus parámetros (algoritmo, array, índice, valor, aristas…) con
 * validación y datasets procedurales (aleatorio/ordenado/inverso/
 * duplicados/casi ordenado/extremos). Cambiar un control genera una
 * cinta nueva; la velocidad y la posición se reinician con ella.
 *
 * Regla de hooks: la cinta se memoiza UNA vez arriba (sin returns
 * tempranos); el tipo solo decide controles, render y badges.
 */
import { useEffect, useMemo, useState } from "react";
import { record } from "../../engine/timeline";
import FluidScrubber from "./FluidScrubber";
import FluidBars from "./FluidBars";
import FluidTree from "./FluidTree";
import FluidGraph from "./FluidGraph";
import FluidHeap from "./FluidHeap";
import ArrayCells from "./ArrayCells";
import { sorters, type SortId } from "../../algorithms/sorting";
import { treeOrders, type TreeOrder } from "../../algorithms/binary-tree";
import { graphAlgos, type GraphAlgo } from "../../algorithms/graph";
import { heapOps, type HeapOp } from "../../algorithms/heap";
import { lookup, insertAt, deleteAt, arrayOps, type ArrayOp } from "../../algorithms/arrays";
import { parseArray, clampInt } from "../../utils/parse";
import { sampleFor, parseEdges, SAMPLE_LABELS, type SampleKind } from "../../utils/sample";

export interface VizPlayerProps {
  type: "sorting" | "tree" | "graph" | "heap" | "array";
  config: Record<string, string | number>;
}

interface Show {
  frames: any[];
  code?: string;
}

/* ————— construcción de la cinta (fuera del componente: sin hooks) ————— */

function buildShow(
  type: VizPlayerProps["type"],
  config: Record<string, string | number>,
): Show {
  const raw = String(config.array ?? "");
  const parsed = parseArray(raw);

  if (type === "sorting") {
    if (!parsed) return { frames: [] };
    const algo = (config.algo as SortId) ?? "bubble";
    if (!(algo in sorters)) return { frames: [] };
    return { frames: record(sorters[algo].run(parsed)), code: sorters[algo].code };
  }

  if (type === "array") {
    if (!parsed) return { frames: [] };
    const op = (config.op as ArrayOp) ?? "lookup";
    if (op === "lookup") {
      return {
        frames: record(lookup(parsed, clampInt(String(config.target ?? "7"), 1, 99, 7))),
        code: arrayOps.lookup.code,
      };
    }
    if (op === "insert") {
      return {
        frames: record(
          insertAt(
            parsed,
            clampInt(String(config.index ?? "2"), 0, parsed.length, 0),
            clampInt(String(config.value ?? "5"), 1, 99, 5),
          ),
        ),
        code: arrayOps.insert.code,
      };
    }
    if (op === "delete") {
      return {
        frames: record(
          deleteAt(parsed, clampInt(String(config.index ?? "2"), 0, Math.max(parsed.length - 1, 0), 0)),
        ),
        code: arrayOps.delete.code,
      };
    }
    return { frames: [] };
  }

  if (type === "tree") {
    if (!parsed) return { frames: [] };
    const orderRaw = String(config.order ?? "inorder");
    const order = (["inorder", "preorder", "postorder"].includes(orderRaw) ? orderRaw : "inorder") as TreeOrder;
    return { frames: record(treeOrders[order].run(parsed)), code: treeOrders[order].code };
  }

  if (type === "graph") {
    const algo = (config.algo as GraphAlgo) ?? "bfs";
    if (!(algo in graphAlgos)) return { frames: [] };
    const n = clampInt(String(config.n ?? "7"), 2, 12, 7);
    const start = clampInt(String(config.start ?? "0"), 0, n - 1, 0);
    const custom = String(config.edges ?? "").trim();
    const edges: [number, number][] = custom
      ? parseEdges(custom, n)
      : (() => {
          const e: [number, number][] = [];
          for (let i = 0; i < n; i++) {
            if (i + 1 < n) e.push([i, i + 1]);
            if (i + 2 < n) e.push([i, i + 2]);
          }
          return e;
        })();
    return { frames: record(graphAlgos[algo].run(n, edges, start)), code: graphAlgos[algo].code };
  }

  if (type === "heap") {
    if (!parsed) return { frames: [] };
    const op = (config.op as HeapOp) ?? "insert";
    if (!(op in heapOps)) return { frames: [] };
    const value = clampInt(String(config.value ?? "4"), 1, 99, 4);
    return {
      frames: record(heapOps[op].run(parsed, value)),
      code: heapOps[op].code,
    };
  }

  return { frames: [] };
}

/* ————— badges por tipo ————— */

function metrics(type: VizPlayerProps["type"], f: any) {
  switch (type) {
    case "sorting":
      return (
        <>
          <span className="badge">comparaciones: {f.comparisons}</span>
          <span className="badge">escrituras: {f.writes}</span>
        </>
      );
    case "array":
      return (
        <>
          <span className="badge">lecturas: {f.probes}</span>
          <span className="badge">escrituras: {f.writes}</span>
        </>
      );
    case "tree":
      return (
        <>
          <span className="badge">orden: {f.order.join(", ")}</span>
          <span className="badge">
            visitados: {f.nodes.filter((n: any) => n.visited).length} / {f.nodes.length}
          </span>
        </>
      );
    case "graph":
      return (
        <>
          <span className="badge">cola/pila: [{f.queueOrStack.join(", ")}]</span>
          <span className="badge">visita: {f.visitedOrder.join(", ")}</span>
        </>
      );
    case "heap":
      return (
        <>
          <span className="badge">
            montículo: [{f.cards
              .slice()
              .sort((x: any, y: any) => x.slot - y.slot)
              .map((c: any) => c.value)
              .join(", ")}]
          </span>
        </>
      );
  }
}

/* ————— controles por tipo (Fase 5) ————— */

const SAMPLE_KINDS = Object.keys(SAMPLE_LABELS) as SampleKind[];

function Controls({
  type,
  cfg,
  upd,
  randArray,
}: {
  type: VizPlayerProps["type"];
  cfg: Record<string, string | number>;
  upd: (k: string, v: string) => void;
  randArray: () => void;
}) {
  const sampleSelect = (
    <select
      className="mini"
      title="Dataset procedural"
      value=""
      onChange={(e) => {
        const kind = e.target.value as SampleKind;
        upd("array", sampleFor(kind === "random" ? "random" : kind, 8).join(", "));
        e.currentTarget.blur();
      }}
    >
      <option value="">🎲 dataset…</option>
      {SAMPLE_KINDS.map((k) => (
        <option key={k} value={k}>
          {SAMPLE_LABELS[k]}
        </option>
      ))}
    </select>
  );

  const op = String(cfg.op ?? (type === "heap" ? "insert" : "lookup"));

  if (type === "graph") {
    const n = clampInt(String(cfg.n ?? "7"), 2, 12, 7);
    return (
      <>
        <label className="field">
          algoritmo
          <select value={String(cfg.algo ?? "bfs")} onChange={(e) => upd("algo", e.target.value)}>
            {Object.entries(graphAlgos).map(([id, g]) => (
              <option key={id} value={id}>{g.name}</option>
            ))}
          </select>
        </label>
        <label className="field">
          nodos
          <select value={String(n)} onChange={(e) => upd("n", e.target.value)}>
            {Array.from({ length: 11 }, (_, i) => i + 2).map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="field">
          inicio
          <select value={String(clampInt(String(cfg.start ?? "0"), 0, n - 1, 0))} onChange={(e) => upd("start", e.target.value)}>
            {Array.from({ length: n }, (_, i) => i).map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="field" title="Formato «0-1, 0-2»; vacío = cadenas + saltos">
          aristas
          <input
            value={String(cfg.edges ?? "")}
            onChange={(e) => upd("edges", e.target.value)}
            spellCheck={false}
            placeholder="0-1, 0-2, 1-3…"
          />
        </label>
      </>
    );
  }

  const needs: Record<string, string[]> = {
    lookup: ["target"],
    insert: ["index", "value"],
    delete: ["index"],
  };
  const arrayLabel = type === "heap" ? "montículo" : type === "tree" ? "nodos" : "array";

  // Entradas extra según la operación: target (búsqueda), index/value.
  const extraOps = (() => {
    if (type === "array") return needs[op] ?? [];
    if (type === "heap") return op === "insert" ? ["value"] : [];
    return [];
  })();

  return (
    <>
      {type === "sorting" && (
        <label className="field">
          algoritmo
          <select value={String(cfg.algo ?? "bubble")} onChange={(e) => upd("algo", e.target.value)}>
            {Object.entries(sorters).map(([id, s]) => (
              <option key={id} value={id}>{s.name}</option>
            ))}
          </select>
        </label>
      )}
      {type === "tree" && (
        <label className="field">
          recorrido
          <select value={String(cfg.order ?? "inorder")} onChange={(e) => upd("order", e.target.value)}>
            {Object.entries(treeOrders).map(([id, o]) => (
              <option key={id} value={id}>{o.name}</option>
            ))}
          </select>
        </label>
      )}
      {type === "array" && (
        <label className="field">
          operación
          <select value={op} onChange={(e) => upd("op", e.target.value)}>
            {Object.entries(arrayOps).map(([id, o]) => (
              <option key={id} value={id}>{o.name}</option>
            ))}
          </select>
        </label>
      )}
      {type === "heap" && (
        <label className="field">
          operación
          <select value={op} onChange={(e) => upd("op", e.target.value)}>
            {Object.entries(heapOps).map(([id, o]) => (
              <option key={id} value={id}>{o.name}</option>
            ))}
          </select>
        </label>
      )}
      <label className="field">
        {arrayLabel}
        <input
          value={String(cfg.array ?? "")}
          onChange={(e) => upd("array", e.target.value)}
          spellCheck={false}
        />
      </label>
      {sampleSelect}
      {extraOps.map((k) => (
        <label className="field" key={k}>
          {k === "target" ? "busca" : k === "index" ? "índice" : "valor"}
          <input
            value={String(cfg[k] ?? "")}
            onChange={(e) => upd(k, e.target.value)}
            spellCheck={false}
            inputMode="numeric"
          />
        </label>
      ))}
      <button className="btn ghost" onClick={randArray}>
        🎲 aleatorio
      </button>
    </>
  );
}

export default function VizPlayer({ type, config }: VizPlayerProps) {
  const configKey = JSON.stringify(config);
  const [cfg, setCfg] = useState<Record<string, string | number>>(config);
  const cfgKey = JSON.stringify(cfg);

  // Si el bloque externo cambia (navegación entre captulos), resetea.
  useEffect(() => {
    setCfg(JSON.parse(configKey) as Record<string, string | number>);
  }, [configKey]);

  const show = useMemo(() => buildShow(type, cfg), [type, cfgKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const upd = (k: string, v: string) => setCfg((c) => ({ ...c, [k]: v }));
  const randArray = () => {
    const n = type === "graph" ? clampInt(String(cfg.n ?? "7"), 2, 12, 7) : 8;
    if (type === "graph") upd("start", String(Math.floor(Math.random() * n)));
    else upd("array", sampleFor("random", n).join(", "));
  };

  return (
    <div>
      <div className="viz-controls">
        <Controls type={type} cfg={cfg} upd={upd} randArray={randArray} />
      </div>
      <FluidScrubber
        frames={show.frames}
        code={show.code}
        render={(f: any, blend: number, next: any) => (
          <>
            <p className="narrate">{f.message}</p>
            {type === "sorting" && <FluidBars curr={f} next={next} blend={blend} />}
            {type === "array" && <ArrayCells curr={f} next={next} blend={blend} />}
            {type === "tree" && <FluidTree frame={f} />}
            {type === "graph" && <FluidGraph curr={f} next={next} blend={blend} />}
            {type === "heap" && <FluidHeap curr={f} next={next} blend={blend} />}
            <div className="meta">{metrics(type, f)}</div>
          </>
        )}
      />
    </div>
  );
}
