/**
 * Registro de ejercicios resueltos (fase 10d).
 *
 * Persistencia MÍNIMA en localStorage: clave «solved:<id>» por problema.
 * Sin servidor, sin cuentas: el progreso vive en el navegador del lector.
 * Los try/catch existen porque en modo privado el storage puede lanzar.
 */

const KEY = "solved:";

export function isSolved(id: string): boolean {
  try {
    return localStorage.getItem(KEY + id) !== null;
  } catch {
    return false;
  }
}

export function markSolved(id: string): void {
  try {
    localStorage.setItem(KEY + id, "1");
  } catch {
    /* modo privado: el badge vive solo durante la sesión */
  }
}

export function solvedCount(): number {
  try {
    let n = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if ((localStorage.key(i) ?? "").startsWith(KEY)) n++;
    }
    return n;
  } catch {
    return 0;
  }
}

/** Borra TODO el progreso. Devuelve cuántos registros había. */
export function clearSolved(): number {
  let n = 0;
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(KEY)) keys.push(k);
    }
    n = keys.length;
    for (const k of keys) localStorage.removeItem(k);
  } catch {
    /* noop */
  }
  return n;
}
