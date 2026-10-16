export interface VizFrame {
  array: number[];
  compare?: [number, number];
  swap?: [number, number];
  key?: [number, number];
  cursor?: number;
  found?: number;
  settled?: number[];
}

const COLORS = {
  swap: "#ef4444",
  compare: "#f59e0b",
  key: "#a855f7",
  cursor: "#a855f7",
  found: "#06b6d4",
  settled: "#22c55e",
  base: "#9ba6b5",
};

function colorFor(i: number, f: VizFrame): string {
  if (f.swap && (f.swap[0] === i || f.swap[1] === i)) return COLORS.swap;
  if (f.compare && (f.compare[0] === i || f.compare[1] === i)) return COLORS.compare;
  if (f.key && f.key[0] === i) return COLORS.key;
  if (f.cursor === i) return COLORS.cursor;
  if (f.found === i) return COLORS.found;
  if (f.settled && f.settled.includes(i)) return COLORS.settled;
  return COLORS.base;
}

export default function ArrayBarViz({ frame }: { frame: VizFrame }) {
  const { array } = frame;
  const max = Math.max(...array, 1);
  const showValues = array.length <= 16;
  const showIndices = array.length <= 20;

  return (
    <div>
      <div className="bars">
        {array.map((v, i) => (
          <div className="bar-slot" key={i}>
            <div
              className="bar"
              style={{
                height: `${(v / max) * 88 + 8}%`,
                backgroundColor: colorFor(i, frame),
              }}
            >
              {showValues && <span className="bar-val">{v}</span>}
            </div>
            {showIndices && <span className="bar-idx">{i}</span>}
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="chip"><i style={{ background: COLORS.compare }} /> comparando</span>
        <span className="chip"><i style={{ background: COLORS.swap }} /> intercambio / desplazando</span>
        <span className="chip"><i style={{ background: COLORS.cursor }} /> cursor / clave</span>
        <span className="chip"><i style={{ background: COLORS.settled }} /> posición final</span>
        <span className="chip"><i style={{ background: COLORS.found }} /> encontrado</span>
      </div>
    </div>
  );
}
