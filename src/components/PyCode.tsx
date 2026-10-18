/**
 * PyCode — display de código Python de SOLO LECTURA con resaltado de
 * sintaxis por tokenización (regex) y numeración de líneas.
 *
 * Se usa donde el contenido es fijo y no necesita editor: los bloques
 * «code» de los capítulos y el código de referencia de cada problema.
 * (El editor editable de los problemas usa CodeEditor, no esto.)
 */
import { useMemo, type CSSProperties, type ReactNode } from "react";

/**
 * Alternativas por prioridad:
 *  1 comentario  2 string (incluye docstrings """…""")  3+4 def/class + nombre
 *  5 palabra clave  6 builtin  7 número.
 * La alternancia se procesa en orden de posición, así un «#» dentro de una
 * cadena nunca abre comentario: la cadena ya lo consumió al arrancar antes.
 */
const TOKEN_RE =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(def|class)\s+([A-Za-z_]\w*)|\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b|\b(print|len|range|enumerate|zip|sum|min|max|abs|sorted|reversed|list|dict|set|tuple|int|float|str|bool|round|map|filter|any|all)\b|\b(0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?)\b/g;

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const [full, comment, str, defKw, defName, kw, builtin, num] = m;
    if (comment !== undefined) {
      out.push(<span key={out.length} className="py-c">{full}</span>);
    } else if (str !== undefined) {
      out.push(<span key={out.length} className="py-s">{full}</span>);
    } else if (defKw !== undefined) {
      out.push(
        <span key={out.length}>
          <span className="py-k">{defKw}</span>{" "}
          <span className="py-d">{defName}</span>
        </span>,
      );
    } else if (kw !== undefined) {
      out.push(<span key={out.length} className="py-k">{full}</span>);
    } else if (builtin !== undefined) {
      out.push(<span key={out.length} className="py-b">{full}</span>);
    } else if (num !== undefined) {
      out.push(<span key={out.length} className="py-n">{full}</span>);
    }
    last = m.index + full.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export interface PyCodeProps {
  code: string;
  className?: string;
  style?: CSSProperties;
}

export default function PyCode({ code, className = "", style }: PyCodeProps) {
  // Un \n final de cortesía no debe producir una línea fantasma en la gutta.
  const shown = code.replace(/\n+$/, "");
  const body = useMemo(() => highlight(shown), [shown]);
  const lineCount = shown.split("\n").length;

  return (
    <figure className={`pycode ${className}`} style={style}>
      <div className="pycode-gutter" aria-hidden="true">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <pre className="pycode-body">
        <code>{body}</code>
      </pre>
    </figure>
  );
}
