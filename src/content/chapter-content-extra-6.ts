import { ChapterContent } from "./blocks";

/**
 * Capítulo 21 — Backtracking (revisión 6d).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const backtrackingChapter: ChapterContent = {
  id: "backtracking",
  num: 21,
  title: "Backtracking",
  blurb: "Construye, explora, DESHACE: DFS sobre el espacio de soluciones con poda.",
  blocks: [
    {
      kind: "prose",
      id: "bt-hook",
      text:
        "**Gancho:** ¿cómo colocas 8 reinas en un tablero sin que se ataquen? Nadie tiene la fórmula cerrada — pero sí un PLAN metódico: coloca la primera reina donde veas, intenta la segunda… y si tu opción lleva a un callejón, QUITA la última y prueba otra. Ese «quita y vuelve» es backtracking: el DFS (cap. 17) aplicado al ESPACIO DE SOLUCIONES, con las herramientas de la recursión (cap. 11) y la pila (cap. 9).",
    },
    {
      kind: "prose",
      id: "bt-intro",
      text:
        "**Backtracking** es búsqueda sistemática por el espacio de soluciones: construyes la solución PASO a PASO; cuando una decisión parcial puede descartarse (no puede llevar a nada válido — o ya lo has enumerado), DESHACES y pruebas la alternativa. El ritual de cada nodo:\n\n1. **Elige:** decide la siguiente pieza (colocar la reina en la columna c).\n2. **Explora:** recursión — sigue construyendo con esa pieza.\n3. **Deshace:** al volver, retira la pieza y restaura el estado — LA PARTE QUE TODO EL MUNDO OLVIDA.\n\nLa memoria externa (marcados, tablero) se comparte entre llamadas: si no la restauras, las ramas «se contaminan» entre sí.",
    },
    {
      kind: "formula",
      id: "bt-complexity",
      latex: "T = O(b^d) \\quad b = \\text{factor de ramificación}, \\; d = \\text{profundidad}",
    },
    {
      kind: "prose",
      id: "bt-ejemplo",
      text:
        "**Ejemplo resuelto — n reinas (n = 4).** Tablero por filas: la reina de la fila f va en UNA columna de la f. Constraint: ninguna reina comparte columna NI diagonal con las ya colocadas.\n\n- f0: col 0. f1: col 2 es la primera válida. En f2 NADA vale → retrocede a f1.\n- f1: col 3 (siguiente válida). f2: col 1 ✓ → f3: col 2 comparte diagonal con f2 → DEAD END, no quedan columnas.\n- Retrocede toda la llamada hasta f0: col 1.\n- f0 col 1 → f1 col 3 → f2 col 0 → f3 col 2. ✓ SOLUCIÓN [1, 3, 0, 2].\n\nCuatro reinas, árbol de potenciales 4⁴ = 256 colocaciones; la PODA (columna/diagonales/validez parcial) reduce el espacio real a unas pocas decenas de intentos. Sin poda, fuerza bruta con 8 reinas son 16.777.216 colocaciones; con poda por conflicto, ~2.000 nodos del árbol.",
    },
    {
      kind: "divider",
      id: "bt-divider-1",
    },
    {
      kind: "prose",
      id: "bt-uses",
      text:
        "Los usos existen donde las soluciones se ENUMERAN (no se computan de una vez):\n\n- **N reinas / Sudoku:** restricciones de conflicto — la poda mata la rama nada más violarla.\n- **Subconjuntos y permutaciones:** el patrón índice + elegir/no elegir (bifurcación binaria por elemento).\n- **Combination Sum (suma objetivo):** poda cuando la suma parcial ya supera el objetivo.\n- **Laberintos:** DFS con desmarque al retroceder (cap. 17).",
    },
    {
      kind: "viz",
      id: "bt-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 3, 4, 5", target: "3" },
    },
    {
      kind: "prose",
      id: "bt-viz-link",
      text:
        "La visualización muestra el array de decisiones: cada casilla es un NIVEL de profundidad y su valor, la opción elegida. El backtracking no barre linealmente: avanza a la siguiente casilla cuando la actual funciona y REGRESA cuando fracasa — el cursor que camina y vuelve es la imagen del backtrack.",
    },
    {
      kind: "divider",
      id: "bt-divider-2",
    },
    {
      kind: "prose",
      id: "bt-tradeoffs",
      text:
        "**Backtracking vs otras herramientas de explotación:**\n\n| Criterio | Backtracking | DP (cap. 12) | Fuerza bruta |\n| --- | --- | --- | --- |\n| objetivo | enumerar TODAS las válidas | hallar el óptimo | enumerar todas, sin filtro |\n| poda | ✓ mata ramas enteras | no (estados fijos) | no |\n| estados repetidos | raros | ✓ su punto fuerte | n/a |\n| ejemplo | n reinas, sudoku | cambio de monedas | probar todas las claves |\n\nLa frontera: si tus subproblemas SOLAPAN, guarda respuestas (dp); si son DIFERENTES pero PODEABLES por restricciones dinámicas, backtracking. Cada uno explota lo que el otro no puede.",
    },
    {
      kind: "prose",
      id: "bt-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **No restaurar el estado.** El clásico #1: quitas la reina pero no borras su marca de conflicto — la siguiente rama hereda un mundo contaminado. Cada «elige» tiene su deshace espejo.\n2. **Poda torpe.** Recorrer TODAS las combinaciones y verificar al final NO es backtracking — la poda actúa MIENTRAS se construye la solución.\n3. **Orden del espacio.** Confundir permutaciones con combinaciones duplica el trabajo: el índice de arranque marca la frontera de cada rama.\n4. **Recursión profunda + resultado global.** La profundidad d consume pila (cap. 11); las SOLUCIONES acumuladas viven en una lista aparte — copia lo que guardas, o deshaz lo que añades.",
    },
    {
      kind: "prose",
      id: "bt-recap",
      text:
        "**Recap:** backtracking = DFS por el espacio de soluciones con el ciclo «elige–explora–deshace» y restauración del estado compartido. Coste bruto b^d — la PODA (detectar temprano que una rama no lleva a nada) es lo que lo hace viable. Se usa cuando las soluciones se enumeran (reinas, sudoku, subconjuntos); DP cuando se calcula el óptimo con subproblemas solapados.",
    },
  ],
};

/**
 * Capítulo 22 — Bit Operations (revisión 6d).
 */
export const bitOpsChapter: ChapterContent = {
  id: "bit-operations",
  num: 22,
  title: "Bit Operations",
  blurb: "Máscaras, XOR y desplazamientos: el nivelmecánico del lenguaje binario.",
  blocks: [
    {
      kind: "prose",
      id: "bit-hook",
      text:
        "**Gancho:** un servidor respalda 32 interruptores — encendido/apagado por servicio. ¿32 variables booleanas o UN NÚMERO? Un solo `int`, cada bit un interruptor, y encender/consultar/invertir es UNA instrucción de CPU. El bit-op es la capa más baja del libro — y la que resuelve sorprendentemente bien ciertos puzzles de entrevista: el XOR de los pares.",
    },
    {
      kind: "prose",
      id: "bit-intro",
      text:
        "Las **operaciones a nivel de bit** trabajan sobre la representación binaria: cada instrucción es 1:1 con el hardware. El kit básico:\n\n- **AND (&):** máscara — apaga bits (1 solo si AMBOS son 1).\n- **OR (|):** enciende bits (1 si CUALQUIERA es 1).\n- **XOR (^):** invierte donde la máscara es 1 — 1 si DIFIEREN.\n- **NOT (~):** invierte todos.\n- **«<<» y «>>»:** multiplicar/dividir por 2^k (desplazar bits es aritmética).\n\nXOR tiene sus propiedades mágicas: x ^ x = 0 (se anulan), x ^ 0 = x (identidad) y es conmutativa/asociativa — la base de los puzzles de pares.",
    },
    {
      kind: "formula",
      id: "bit-xor",
      latex: "x \\oplus 0 = x \\qquad x \\oplus x = 0 \\qquad (x \\oplus y) \\oplus y = x",
    },
    {
      kind: "viz",
      id: "bit-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 4, 8, 16, 32", target: "8" },
    },
    {
      kind: "prose",
      id: "bit-viz-link",
      text:
        "Ese array son POTENCIAS DE DOS: en binario son bits solitarios — 8 se ve como `1000`. Encontrar la potencia en el array equivale a LEER un bit del número: la posición del bit se convierte en índice de casilla. Cada casilla del array = un interruptor del int del gancho; las máscaras y el AND/XOR manipulan exactamente estos bits.",
    },
    {
      kind: "divider",
      id: "bit-divider-1",
    },
    {
      kind: "prose",
      id: "bit-tricks",
      text:
        "**Trucos que valen la pena de memoria:**\n\n- `x & (x - 1)`: BORRA el bit 1 más bajo encendido — y `x & (x-1) == 0` detecta potencias de 2 (con x > 0).\n- `x & -x`: AÍSLA el bit 1 más bajo.\n- `x ^= y; y ^= x; x ^= y`: intercambio SIN temporal (curiosidad; no lo escribas en producción).\n- **Un solo no-pareado:** XOR de TODO el array — los pares se anulan y queda el singular. n = 5 con [4, 1, 2, 1, 2]: 4^1^2^1^2 = 4 ✓\n\n**¿Y el conteo de bits 1?** Bucle con `x & (x - 1)`: cada iteración borra un 1 — el nº de iteraciones ES el popcount. En Python, `bin(x).count(\"1\")` lo resuelve directo.",
    },
    {
      kind: "divider",
      id: "bit-divider-2",
    },
    {
      kind: "prose",
      id: "bit-tradeoffs",
      text:
        "**¿Cuándo vencen los bits?**\n\n| Criterio | Operaciones a bit equivalentes | Contrapartida «normal» |\n| --- | --- | --- |\n| k flags booleanos | UN int + máscara O(1) | array de bools: O(1) igual… pero k× memoria |\n| conjuntos pequeños de enteros | bitset | hash set |\n| división/multiplicación por 2^k | «<<»/«>>» O(1) | operadores normales (igual velocidad hoy) |\n| criptografía | XOR es el corazón | librerías serias (¡nunca crypto casera!) |\n\nHoy el compilador ya convierte `x * 2` en shift — el argumento ya no es VELOCIDAD salvo en bitsets/matrices crudas: es la CAPACIDAD (32 flags en un int) y la ELEGANCIA de algunos algoritmos (el XOR del singular) lo que sostiene este tema.",
    },
    {
      kind: "prose",
      id: "bit-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Precedencia.** `x & 4 == 0` NO es `(x & 4) == 0`: el `==` SE APLICA primero en C/Java/JS. Paréntesis SIEMPRE en expresiones mixtas &/==.\n2. **Desplazamiento por anchura.** `x << 32` sobre un int de 32 bits es UB en C y módulo del ancho en JS: el shifter solo mira 5 bits del operando — el resultado sorprende.\n3. **Signed vs unsigned.** El «>>» ARITMÉTICO (conserva el signo) difiere del lógico; `x >>> 0` en JS convierte a uint32 — y los bits de los NEGATIVOS dependen del complemento a 2.\n4. **Endianness.** El orden de bytes en memoria NO cambia los bits del número, pero sí cómo los envías dentro de un protocolo — nunca supongas el byte order que no estás viendo.",
    },
    {
      kind: "prose",
      id: "bit-recap",
      text:
        "**Recap:** el nivel bajo: máscaras (& encender/desactivar bits concretos), XOR (identidad y autonullación — el truco de los pares), shifts (multiplicar por 2^k). Trucos de bolsillo: potencia de 2 con `x & (x-1)`; bit aislado con `x & -x`; singular por XOR del array. Gana por CAPACIDAD (n flags en un int) y por puzzles; no por velocidad moderna de compiladores.",
    },
  ],
};
