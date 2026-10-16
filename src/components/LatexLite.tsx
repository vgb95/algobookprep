/**
 * LatexLite: las 10 fórmulas del libro sin KaTeX (300KB+ de fuentes).
 * Traduce los comandos que usa el contenido a Unicode legible y parte
 * las filas \\ en líneas. Antes se veía el LaTeX crudo con backslashes.
 */

const SUP: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  n: "ⁿ", d: "ᵈ", m: "ᵐ", i: "ⁱ",
};
const SUB: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "⁵", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
};

const REPL: Array<[RegExp, string]> = [
  [/\\text\{([^}]*)\}/g, "$1"],
  [/\\times/g, "×"],
  [/\\cdot/g, "·"],
  [/\\in/g, "∈"],
  [/\\iff/g, "⟺"],
  [/\\implies/g, "⟹"],
  [/\\land/g, "∧"],
  [/\\le/g, "≤"],
  [/\\ge/g, "≥"],
  [/\\log/g, "log"],
  [/\\min/g, "min"],
  [/\\alpha/g, "α"],
  [/\\Theta/g, "Θ"],
  [/\\Omega/g, "Ω"],
  [/\\oplus/g, "⊕"],
  [/\\exists/g, "∃"],
  [/\\forall/g, "∀"],
  [/\\approx/g, "≈"],
  [/\\bmod/g, "mod"],
  [/\\quad/g, " "],
  [/\\;/g, " "],
  [/\\,/g, ""],
  [/\\_/g, "_"],
  [/\\begin\{cases\}/g, ""],
  [/\\end\{cases\}/g, ""],
];

function renderLine(latex: string): string {
  let s = latex;
  for (const [re, to] of REPL) s = s.replace(re, to);
  s = s.replace(/_([0-9])/g, (_, c: string) => SUB[c] ?? `_${c}`);
  s = s.replace(/\^([0-9a-zA-Z])/g, (_, c: string) => SUP[c] ?? `^${c}`);
  s = s.replace(/&/g, "   ");
  return s.replace(/\s+/g, " ").trim();
}

export default function LatexLite({ latex }: { latex: string }) {
  const lines = latex.split(/\\\\/).map(renderLine).filter(Boolean);
  return (
    <span className="latex">
      {lines.map((l, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {l}
        </span>
      ))}
    </span>
  );
}
