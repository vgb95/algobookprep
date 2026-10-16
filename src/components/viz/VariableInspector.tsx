/**
 * Inspector de variables: tabla nombre → valor actual.
 * Las variables que son arrays se renderizan con su contenido directo.
 */
export default function VariableInspector({
  locals,
  arrays,
}: {
  locals: Record<string, string>;
  arrays: Record<string, number[]>;
}) {
  const rows = Object.entries(locals);
  if (rows.length === 0) {
    return <p className="empty">Sin variables locales todavía.</p>;
  }
  return (
    <table className="vars">
      <thead>
        <tr>
          <th>variable</th>
          <th>valor</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([name, value]) => {
          const isArray = Object.prototype.hasOwnProperty.call(arrays, name);
          return (
            <tr key={name} className={isArray ? "array-row" : ""}>
              <td className="var-name">{name}</td>
              <td className="var-value">
                {isArray ? `[${(arrays as any)[name].join(", ")}]` : value}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
