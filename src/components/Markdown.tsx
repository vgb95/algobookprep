import { Fragment, type ReactNode } from "react";

/**
 * Mini-markdown sin dependencias para los bloques prose.
 * Soporta lo que usa el contenido: párrafos, **negrita**, `código`,
 * *cursiva*, listas (- y 1.), tablas pipe y saltos de línea simples.
 * Antes el texto se mostraba crudo (**asteriscos** y | pipes | visibles).
 */

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;

function inline(text: string, base: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    const key = `${base}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>;
    }
    if (
      part.startsWith("*") &&
      part.endsWith("*") &&
      part.length > 2 &&
      !part.startsWith("**")
    ) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

function withBreaks(text: string, base: string): ReactNode[] {
  const out: ReactNode[] = [];
  text.split("\n").forEach((line, i) => {
    if (i > 0) out.push(<br key={`${base}-br-${i}`} />);
    out.push(<Fragment key={`${base}-l-${i}`}>{inline(line, `${base}-l-${i}`)}</Fragment>);
  });
  return out;
}

function isTable(lines: string[]): boolean {
  if (lines.length < 2) return false;
  if (!lines.every((l) => l.trim().startsWith("|"))) return false;
  return /^\|[\s:|-]+\|$/.test(lines[1].trim());
}

function cells(row: string): string[] {
  return row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
}

export default function Markdown({ text }: { text: string }) {
  const sections = text.split(/\n{2,}/);
  return (
    <>
      {sections.map((sec, si) => {
        const lines = sec.split("\n").filter((l) => l.trim().length > 0);
        if (lines.length === 0) return null;
        if (isTable(lines)) {
          const head = cells(lines[0]);
          const body = lines.slice(2).map(cells);
          return (
            <table key={si} className="tbl">
              <thead>
                <tr>
                  {head.map((c, i) => (
                    <th key={i}>{inline(c, `t${si}h${i}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, r) => (
                  <tr key={r}>
                    {row.map((c, i) => (
                      <td key={i} className="mono">{inline(c, `t${si}r${r}c${i}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
        if (lines.every((l) => /^\s*-\s+/.test(l))) {
          return (
            <ul key={si}>
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\s*-\s+/, ""), `ul${si}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={si}>
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\s*\d+\.\s+/, ""), `ol${si}-${i}`)}</li>
              ))}
            </ol>
          );
        }
        return <p key={si}>{withBreaks(sec.trim(), `p${si}`)}</p>;
      })}
    </>
  );
}
