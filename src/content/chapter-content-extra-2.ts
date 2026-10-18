import { ChapterContent } from "./blocks";

/**
 * Capítulo 6 — Strings (revisión 6b).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const stringsChapter: ChapterContent = {
  id: "strings",
  num: 6,
  title: "Strings",
  blurb: "Cadenas: inmutabilidad, las dos caras de concatenar y buscar subcadenas.",
  blocks: [
    {
      kind: "prose",
      id: "str-hook",
      text:
        "**Gancho:** en pseudocódigo, `s + \" mundo\"` es gratis; en producción, concatenar un millón de veces dentro de un bucle es el clásico asesino silencioso de rendimiento. ¿Por qué? Porque una cadena no es un contenedor flexible: es (casi siempre) un **array inmutable** de caracteres — y la inmutabilidad cobra el precio cada vez que la modifies.",
      textEn: "**Hook:** in pseudocode, `s + \" world\"` is free; in production, concatenating a million times inside a loop is the classic silent performance killer. Why? Because a string is not a flexible container: it is (almost always) an **immutable array** of characters — and immutability collects its price every time you modify it.",
    },
    {
      kind: "prose",
      id: "str-intro",
      text:
        "Una **cadena** es una secuencia de caracteres; en la práctica, un array de ellos (o de bytes, si la codificación es UTF-8). Hereda las ventajas del array — acceso por índice O(1) — con una regla extra: **no puedes cambiar un carácter in situ**. Toda transformación produce una cadena nueva.",
      textEn: "A **string** is a sequence of characters; in practice, an array of them (or of bytes, if the encoding is UTF-8). It inherits the array's advantages — O(1) index access — with one extra rule: **you cannot change a character in place**. Every transformation produces a new string.",
    },
    {
      kind: "formula",
      id: "str-index",
      latex: "s[i] \\in O(1) \\qquad s' = s + t \\in O(|s| + |t|)",
    },
    {
      kind: "viz",
      id: "str-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "8, 5, 12, 12, 15", target: "12" },
    },
    {
      kind: "prose",
      id: "str-ascii-note",
      text:
        "La visualización mira la cadena HELLO como su array de códigos (A=1, B=2, …): H=8, E=5, L=12, L=12, O=15. Buscar la letra L es un lookup por valor sobre ese array — dos lecturas hasta la primera L (la segunda está pegada a la primera). Ojo: encontrar UNA letra es O(n); encontrar un PATRÓN es otra historia.",
      textEn: "The visualization looks at the string HELLO as its array of codes (A=1, B=2, …): H=8, E=5, L=12, L=12, O=15. Finding the letter L is a lookup by value over that array — two reads up to the first L (the second sits right next to it). Note: finding ONE letter is O(n); finding a PATTERN is another story.",
    },
    {
      kind: "divider",
      id: "str-divider-1",
    },
    {
      kind: "prose",
      id: "str-matching",
      text:
        "**Buscar una subcadena** (string matching): el patrón P de longitud *m* dentro del texto T de longitud *n*. La fuerza bruta alinea el patrón en cada posición de partida posible y compara carácter a carácter:",
      textEn: "**Substring search** (string matching): the pattern P of length *m* inside the text T of length *n*. Brute force aligns the pattern at every possible starting position and compares character by character:",
    },
    {
      kind: "formula",
      id: "str-naive",
      latex: "T(n, m) = O((n - m + 1) \\cdot m) = O(n \\cdot m)",
    },
    {
      kind: "prose",
      id: "str-matching-2",
      text:
        "**Ejemplo resuelto.** T = \"ABABABAB\", P = \"ABAB\" (n = 8, m = 4). Posición 0: A-B-A-B ✓ (4 comparaciones, match). Posición 1: A frente a B ✗ (1 comparación). Posición 2: otro match (4)… entre 1 y 4 comparaciones por posición — una media de ~2. Con el peor patrón, n·m; con el típico, mucho menos — pero lineal en n. Los algoritmos finos —KMP (recuerda prefijos fallidos), Rabin-Karp (hash rodante), Boyer-Moore (salta en bloque)— ganan descartando posiciones enteras sin mirarlas.",
      textEn: "**Solved example.** T = \"ABABABAB\", P = \"ABAB\" (n = 8, m = 4). Position 0: A-B-A-B ✓ (4 comparisons, match). Position 1: A against B ✗ (1 comparison). Position 2: another match (4)… between 1 and 4 comparisons per position — an average of ~2. With the worst pattern, n·m; with a typical one, much less — but still linear in n. The fine algorithms —KMP (remembers failed prefixes), Rabin-Karp (rolling hash), Boyer-Moore (skips in blocks)— win by discarding whole positions without ever looking at them.",
    },
    {
      kind: "prose",
      id: "str-hash",
      text:
        "**Rabin-Karp en una frase:** calcula el hash de la ventana actual del texto y lo compara con el hash del patrón; si los hashes casan, verifica carácter a carácter (el hash puede dar falsos positivos). El truco de la ventana: al DESLIZARla, actualizar el hash cuesta O(1) — no recalcula desde cero. Promedio O(n + m), peor caso O(n·m) (muchos falsos positivos seguidos).",
      textEn: "**Rabin-Karp in one sentence:** compute the hash of the current window of the text and compare it against the hash of the pattern; if the hashes match, verify character by character (the hash can give false positives). The window trick: as you SLIDE it, updating the hash costs O(1) — no recomputing from scratch. Average O(n + m), worst case O(n·m) (many false positives in a row).",
    },
    {
      kind: "divider",
      id: "str-divider-2",
    },
    {
      kind: "prose",
      id: "stringbuilder",
      text:
        "**El StringBuilder y por qué existe.** Concatenar en bucle: cada `s = s + c` copia TODA la cadena acumulada — 1 + 2 + … + n copias = O(n²). El patrón correcto: acumula los fragmentos en una lista y une todo UNA vez al final — O(n) total. Es el mismo argumento del append amortizado del capítulo 2, aplicado a texto.",
      textEn: "**The StringBuilder and why it exists.** Concatenating in a loop: every `s = s + c` copies the WHOLE accumulated string — 1 + 2 + … + n copies = O(n²). The right pattern: collect the fragments in a list and join everything ONCE at the end — O(n) total. It is the same argument as the amortized append of chapter 2, applied to text.",
    },
    {
      kind: "prose",
      id: "str-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Concatenar en bucle.** El O(n²) de arriba: media entrevista se gana detectando esto en el código del candidato.\n2. **Inmutabilidad carísima.** `s[i] = \"X\"` no existe en Python: sustituir un carácter crea una copia entera. Para editar textos grandes a trozos: lista de caracteres → `\"\".join(lista)`.\n3. **Comparar es O(n).** `a == b` no es O(1), es carácter a carácter (con cortocircuito si difieren pronto). Por eso una tabla hash arriesga poco: primero compara hashes y solo verifica contenido en caso de colisión.\n4. **Codificaciones.** En UTF-8, un «carácter» puede ocupar 1–4 bytes: cortar a ciegas por bytes corrompe símbolos — corta por code points.",
      textEn: "**Frequent traps:**\n\n1. **Concatenating in a loop.** The O(n²) above: half of interviews are won by spotting this in the candidate's code.\n2. **Very expensive immutability.** `s[i] = \"X\"` does not exist in Python: replacing one character creates a full copy. To edit large texts in chunks: list of characters → `\"\".join(list)`.\n3. **Comparing is O(n).** `a == b` is not O(1): it is character by character (short-circuiting if they differ early). That is why a hash table risks little: it compares hashes first and only verifies content on collision.\n4. **Encodings.** In UTF-8, a “character” can take 1–4 bytes: cutting blindly by bytes corrupts symbols — cut by code points.",
    },
    {
      kind: "prose",
      id: "str-recap",
      text:
        "**Recap:** cadena = array de caracteres (a veces inmutable). Índice O(1); concatenar O(n) cada vez (usa lista + join); matching ingenuo O(n·m), fino O(n + m). La regla de oro: construye con lista + join, compara con hash si es un conjunto, y desconfía de cualquier bucle que casque texto contra texto.",
      textEn: "**Recap:** string = array of characters (often immutable). Index O(1); each concatenation O(n) (use list + join); naive matching O(n·m), fine O(n + m). The golden rule: build with list + join, compare with a hash for sets, and distrust any loop that slams text against text.",
    },
  ],
};

/**
 * Capítulo 7 — Matrices (revisión 6b).
 */
export const matricesChapter: ChapterContent = {
  id: "matrices",
  num: 7,
  title: "Matrices",
  blurb: "El array bidimensional: indexado O(1), recorridos y la trampa de la caché.",
  blocks: [
    {
      kind: "prose",
      id: "mat-hook",
      text:
        "**Gancho:** una pantalla de 1920×1080 son 2.073.600 píxeles y un videojuego los recorre sesenta veces por segundo. La diferencia entre ir a 60 y a 12 FPS suele ser UNA cosa: el orden en el que se recorre la memoria de esa matriz. La matriz es 2D pero la memoria es 1D — y tiene preferencias claras sobre qué dirección recorrer.",
      textEn: "**Hook:** a 1920×1080 screen is 2,073,600 pixels, and a video game walks them sixty times per second. The difference between running at 60 and at 12 FPS is usually ONE thing: the order in which the matrix's memory is walked. The matrix is 2D but memory is 1D — and it has clear preferences about which direction you traverse.",
    },
    {
      kind: "prose",
      id: "mat-intro",
      text:
        "Una **matriz** es un array de arrays — o, a nivel físico, un único bloque contiguo APLANADO: `mat[i][j]` existe porque el lenguaje calcula el desplazamiento por ti. La fórmula central del capítulo:",
      textEn: "A **matrix** is an array of arrays — or, physically, a single FLATTENED contiguous block: `mat[i][j]` exists because the language computes the offset for you. The central formula of the chapter:",
    },
    {
      kind: "formula",
      id: "mat-index",
      latex: "\\text{pos}(i, j) = i \\cdot \\text{columnas} + j",
    },
    {
      kind: "prose",
      id: "mat-index-example",
      text:
        "**Ejemplo resuelto.** Matriz 3×3 (valores 1..9 por filas): el 5 vive en fila 1, columna 1 → posición plana = 1·3 + 1 = 4 (quinta casilla, contando desde 0). Cualquier elemento: un salto, O(1). La visualización recorre el array APLANADO buscando el 5 — la casilla central: la geometría 2D y la memoria 1D son el mismo bloque visto dos veces.",
      textEn: "**Solved example.** A 3×3 matrix (values 1..9 by rows): the 5 lives in row 1, column 1 → flat position = 1·3 + 1 = 4 (the fifth cell, counting from 0). Any element: one jump, O(1). The visualization walks the FLATTENED array looking for the 5 — the central cell: 2D geometry and 1D memory are the same block seen twice.",
    },
    {
      kind: "viz",
      id: "mat-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 3, 4, 5, 6, 7, 8, 9", target: "5" },
    },
    {
      kind: "prose",
      id: "mat-cache",
      text:
        "El coste de recorrerla completa es O(n·m) — inevitable, tienes que VISITAR cada celda. Pero la velocidad POR CELDA no es la misma: la caché de la CPU trae bloques contiguos. En una matriz aplanada por filas, recorrer en orden de filas (i, luego j) lee memoria consecutiva — el mejor amigo de la caché; por COLUMNAS (j, luego i) cada lectura salta n elementos — un miss por paso. Misma complejidad, 5–10× de diferencia real.",
      textEn: "Traversing it fully costs O(n·m) — inevitable, you must VISIT every cell. But the speed PER CELL is not the same: the CPU cache brings in contiguous blocks. In a row-flattened matrix, walking in row order (i, then j) reads consecutive memory — the cache's best friend; by COLUMNS (j, then i) every read jumps n elements — one miss per step. Same complexity, a real 5–10× difference.",
    },
    {
      kind: "divider",
      id: "mat-divider-1",
    },
    {
      kind: "prose",
      id: "mat-ops",
      text:
        "Operaciones clásicas (todas con n·m celdas implicadas):\n\n| Operación | Coste | Nota |\n| --- | --- | --- |\n| acceso `mat[i][j]` | O(1) | fórmula pos |\n| recorrido total | O(n·m) | el orden importa (caché) |\n| transponer | O(n·m) | in-place solo si CUADRADA |\n| rotar 90° | O(n·m) | = transponer + invertir filas |\n| sumar dos matrices | O(n·m) | elemento a elemento |\n| multiplicar (n×m)·(m×p) | O(n·m·p) | filas × columnas: el coste real |\n\nEse O(n·m·p) de la multiplicación abre el juego fino (Strassen divide y baja a ~O(n^2.8)): **lo que dispara el coste es el número de bucles anidados, no la jerga**.",
      textEn: "Classic operations (all involve n·m cells):\n\n| Operation | Cost | Note |\n| --- | --- | --- |\n| access `mat[i][j]` | O(1) | pos formula |\n| full traversal | O(n·m) | order matters (cache) |\n| transpose | O(n·m) | in-place only if SQUARE |\n| rotate 90° | O(n·m) | = transpose + reverse rows |\n| add two matrices | O(n·m) | element by element |\n| multiply (n×m)·(m×p) | O(n·m·p) | rows × columns: the real cost |\n\nThe multiplication's O(n·m·p) opens the fine game (Strassen divides and drops to ~O(n^2.8)): **what drives the cost is the number of nested loops, not the jargon**.",
    },
    {
      kind: "prose",
      id: "mat-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Filas vs columnas al transponer.** `t[i][j] = mat[j][i]` con las dimensiones al revés es un bug — para matrices RECTANGULARES (n ≠ m) salta fuera del rango.\n2. **Jagged arrays.** Si las filas no tienen todas el mismo largo, la fórmula pos se rompe: exige rectangularidad o guarda cols por fila.\n3. **Copiar filas con referencias.** `mat = [[0]*m]*n` repite LA MISMA fila n veces: cambiar mat[0][0] cambia todas. Correcto: `[[0 for _ in range(m)] for _ in range(n)]`.\n4. **Caché al revés.** Con listas de listas (Python), la fila es la parte contigua: recorrer por columnas — avanzar rápido el índice de FILA — da saltos entre filas en cada paso: el patrón lento.",
      textEn: "**Frequent traps:**\n\n1. **Rows vs columns when transposing.** `t[i][j] = mat[j][i]` with the dimensions swapped is a bug — for RECTANGULAR matrices (n ≠ m) it jumps out of range.\n2. **Jagged arrays.** If rows do not all have the same length, the pos formula breaks: demand rectangularity or store cols per row.\n3. **Copying rows with references.** `mat = [[0]*m]*n` repeats THE SAME row n times: changing mat[0][0] changes them all. Correct: `[[0 for _ in range(m)] for _ in range(n)]`.\n4. **Cache backwards.** With lists of lists (Python), the row is the contiguous part: walking by columns — advancing the ROW index fast — means jumps between rows on every step: the slow pattern.",
    },
    {
      kind: "prose",
      id: "mat-recap",
      text:
        "**Recap:** matriz = array 2D (a menudo aplanada), acceso O(1) vía i·cols + j; recorrer cuesta O(n·m) y el ORDEN decide la velocidad real (caché); transponer/rotar O(n·m); multiplicar O(n·m·p) — manda la longitud de la cadena de bucles. Todo lo que viene después (grafos, programación dinámica) viaja montado sobre matrices.",
      textEn: "**Recap:** matrix = 2D array (often flattened), O(1) access via i·cols + j; traversal costs O(n·m) and ORDER decides real speed (cache); transpose/rotate O(n·m); multiply O(n·m·p) — the nesting chain length rules. Everything that comes later (graphs, dynamic programming) travels built on top of matrices.",
    },
  ],
};

/**
 * Capítulo 8 — LinkedLists (revisión 6b, con FluidList).
 */
export const linkedListsChapter: ChapterContent = {
  id: "linked-lists",
  num: 8,
  title: "LinkedLists",
  blurb:
    "Nodos con punteros: nada se desplaza, se recosen flechas. Caminar cuesta; coser es O(1).",
  blocks: [
    {
      kind: "prose",
      id: "ll-hook",
      text:
        "**Gancho:** el array lleva todo agarrado en una barra: para meter un eslabón en medio, la fila entera retrocede casilla a casilla. La lista enlazada rompe ese contrato: cada nodo es una isla suelta en memoria y el orden vive en FLECHAS. Cambiar la estructura = cambiar punteros, no mover datos. En la visualización lo verás: las tarjetas no cambian de lugar; lo que cambia son las flechas.",
    },
    {
      kind: "prose",
      id: "ll-intro",
      text:
        "Una **lista enlazada** es una secuencia de nodos: cada uno guarda su valor y un puntero al siguiente. Un puntero externo marca la **cabeza** (head). Sin memoria contigua no hay fórmula de direcciones: llegar al nodo i exige caminar i saltos desde la cabeza.\n\n- **Acceso por índice / buscar por valor:** O(n) — flecha a flecha.\n- **Insertar/borrar tras un nodo que YA conoces:** O(1) — dos escrituras de puntero.\n- **Espacio:** O(n) + uno o dos punteros extra por nodo.",
    },
    {
      kind: "viz",
      id: "ll-lookup-viz",
      type: "list",
      config: { op: "lookup", array: "7, 13, 21, 5, 42", target: "21" },
    },
    {
      kind: "prose",
      id: "ll-lookup-text",
      text:
        "El recorrido no tiene atajos: head → next → next… Cada paso examina y salta; las flechas del grafo son LITERALES los saltos de memoria. Si el objetivo está al final (o no está) has caminado toda la lista. Comparado con el array: por índice pierde (O(n) frente a O(1)); por valor empatan (O(n) ambos) — lo que la lista pierde es el acceso aleatorio y NADA más.",
    },
    {
      kind: "divider",
      id: "ll-divider-1",
    },
    {
      kind: "prose",
      id: "ll-insert",
      text:
        "**Insertar** = dos escrituras de puntero: `nuevo.next = prev.next` y `prev.next = nuevo`. Nada se desplaza en memoria. PERO encontrar al previo exige caminar O(n) — por eso el caso de oro es insertar EN LA CABEZA (el previo es gratis) o desde un marcador/iterador que ya esté colocado.",
    },
    {
      kind: "viz",
      id: "ll-insert-viz",
      type: "list",
      config: { op: "insert", array: "7, 13, 21, 5", index: "2", value: "99" },
    },
    {
      kind: "prose",
      id: "ll-delete",
      text:
        "**Borrar** también es costura: el previo apunta POR ENCIMA de la víctima (`prev.next = victim.next`) y el nodo queda huérfano — el gestor de memoria lo recogerá. O(1) tras caminar hasta el previo… O(1) total si es la cabeza (no hay que caminar para nada).",
    },
    {
      kind: "viz",
      id: "ll-delete-viz",
      type: "list",
      config: { op: "delete", array: "7, 13, 21, 5", index: "2" },
    },
    {
      kind: "divider",
      id: "ll-divider-2",
    },
    {
      kind: "prose",
      id: "ll-variants",
      text:
        "**Variantes que verás por ahí:**\n\n- **Simple:** cada nodo → siguiente; el último apunta a None (lo que ves aquí).\n- **Doble:** además apunta al anterior — caminas en ambas direcciones y borrar un nodo SIN previo vuelve a ser O(1) (usa su propio puntero prev). Paga un puntero más por nodo.\n- **Circular:** el último apunta a la cabeza — ideal para rotar buffers sin huecos (schedulers round-robin).",
    },
    {
      kind: "prose",
      id: "ll-tradeoffs",
      text:
        "**Array vs lista, respondiendo a la misma pregunta:**\n\n| Criterio | Array | Lista enlazada |\n| --- | --- | --- |\n| acceso por índice | O(1) | O(n) |\n| buscar por valor | O(n) | O(n) |\n| insertar/borrar en medio | O(n) desplazando | O(1) con puntero (O(n) caminar hasta él) |\n| insertar/borrar en cabeza | O(n) | **O(1)** |\n| memoria | solo datos | datos + puntero(s) por nodo |\n| localidad de caché | contigua, amiga de la caché | dispersa, misses constantes |\n\nEn la práctica: si hay que caminar hasta el medio y luego tocar UN punto, gana el array (su desplazamiento es un memmove ultrarrápido); si vas a guardar marcadores para operar sin recorrer, gana la lista.",
    },
    {
      kind: "prose",
      id: "ll-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Perder el head.** Si avanzas destruyendo la referencia head, la lista se «acorta» para el resto del mundo: camina con un cursor `node = head` y nunca escribas sobre head.\n2. **Ciclos accidentales.** Un puntero cosido mal (apuntando hacia atrás) crea una cadena eterna — para detectar ciclos: dos punteros (Floyd, el lento y el rápido).\n3. **Borrar sin previo.** Sabes QUÉ borrar pero nadie sabe quién apunta a él: caminas de nuevo buscando el previo; la doble enlazada rompe ese problema.\n4. **Los bordes muerden.** Lista vacía, un solo nodo, borrar la cabeza, borrar la cola: el 80 % de los bugs con esta estructura viven en los bordes — prueba SIEMPRE los casos extremos.",
    },
    {
      kind: "prose",
      id: "ll-recap",
      text:
        "**Recap:** la lista enlazada compra flexibilidad estructural (coser punteros en O(1)) pagando caminatas O(n) y memoria extra. Su marca: insertar/borrar en cabeza O(1). Su lastre: acceso por índice. Y su herencia: el nodo suelto es la unidad de la que están fabricados los stacks y las queues (capítulos 9–10).",
    },
  ],
};
