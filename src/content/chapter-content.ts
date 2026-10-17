import { ChapterContent } from "./blocks";

/**
 * Capítulo 2 — Arrays (revisión didáctica 6a).
 * Estructura: gancho → teoría → vizzes → ejemplo resuelto →
 * tabla de costes → trampas → recap → problemas.
 */
export const arraysChapter: ChapterContent = {
  id: "arrays",
  num: 2,
  title: "Arrays",
  blurb:
    "Memoria contigua, indexado en O(1) y su precio: insertar o borrar en medio obliga a desplazar elementos.",
  blocks: [
    {
      kind: "prose",
      id: "arrays-hook",
      text:
        "**Gancho:** un array es la estructura más humilde y la más rápida. ¿Por qué? Mira cómo vive en RAM: puro orden, sin desvíos. Piensa en una fila de casilleros numerados en línea: la casilla nº i es `primera + i·tamaño`, un solo salto, sin caminar el pasillo. Las demás estructuras existen para arreglar lo que el array NO hace bien: crecer o encoger en medio.",
    },
    {
      kind: "prose",
      id: "arrays-intro",
      text:
        "Un **array** es una colección de elementos del mismo tipo almacenados en **posiciones de memoria contiguas**. Todas las casillas tienen el mismo tamaño (¡por eso ese \"elemento del mismo tipo\"!): si sabes dónde empieza el array y cuánto ocupa cada casilla, puedes calcular la dirección de cualquier elemento sin recorrer nada.",
    },
    {
      kind: "formula",
      id: "arrays-address",
      latex: "\\text{dirección}(a[i]) = \\text{dirección}(a[0]) + i \\times \\text{tamaño(elemento)}",
    },
    {
      kind: "viz",
      id: "arrays-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "4, 1, 7, 3, 9, 2", target: "7" },
    },
    {
      kind: "prose",
      id: "arrays-o1",
      text:
        "Esa fórmula es el superpoder del array: **acceso aleatorio en O(1)**. Leer o escribir `a[5]` es un solo salto de memoria. PERO mira la visualización: buscar *por valor* (¿dónde está el 7?) obliga a recorrer casilla a casilla — O(n). El O(1) vale solo para el índice; el valor hay que buscarlo.",
    },
    {
      kind: "prose",
      id: "arrays-insert",
      text:
        "Ahora el lado oscuro: la contigüidad es un contrato rígido — no hay huecos. Para **insertar** en la posición *i*, todo lo posterior debe ganar una casilla a la derecha, UNO a UNO, para que siga habiendo contigüidad. En el peor caso (insertar al principio) desplazas los *n* elementos: **O(n)**.",
    },
    {
      kind: "viz",
      id: "arrays-insert-viz",
      type: "array",
      config: { op: "insert", array: "4, 1, 7, 3, 9, 2", index: "2", value: "5" },
    },
    {
      kind: "prose",
      id: "arrays-delete",
      text:
        "**Borrar** es lo inverso: el elemento sale y los posteriores caen una casilla a la izquierda para tapar el hueco. De nuevo **O(n)**. Fíjate en la visualización: el hueco viaja de la posición de salida al final mientras las tarjetas colapsan — físico, no abstracto.",
    },
    {
      kind: "viz",
      id: "arrays-delete-viz",
      type: "array",
      config: { op: "delete", array: "4, 1, 7, 3, 9, 2", index: "2" },
    },
    {
      kind: "divider",
      id: "arrays-divider-1",
    },
    {
      kind: "prose",
      id: "arrays-example",
      text:
        "**Ejemplo resuelto.** ¿Cuál es el coste total de insertar 1.000 veces SIEMPRE al principio de un array? Cada inserción desplaza toda la lista: 1 + 2 + … + 1.000 ≈ 500.000 escrituras — O(n²). En cambio, si insertas SIEMPRE al final (append), no hay que desplazar nada: 1.000 escrituras — O(n) total, O(1) **amortizado** por operación (de vez en cuando la tabla crece y paga un copy). Misma operación, distinta posición: lo que decides es el COSTE.",
    },
    {
      kind: "prose",
      id: "arrays-costs",
      text:
        "| Operación | Coste | Motivo |\n| --- | --- | --- |\n| acceso por índice `a[i]` | O(1) | aritmética de direcciones |\n| buscar por valor | O(n) | no hay orden garantizado |\n| insertar / borrar en medio | O(n) | desplazar el resto |\n| append al final | O(1) amortizado | nada que desplazar (crecer paga una copia) |\n\n**Tradeoff frente a otras estructuras:** si tu vida son inserciones en cualquier posición, la lista enlazada (cap. 8) hace la inserción en O(1)… pero su búsqueda también es O(n) y pierde el acceso aleatorio. Ninguna gana de forma absoluta: gana la que encaja con tu patrón de uso.",
    },
    {
      kind: "prose",
      id: "arrays-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Off-by-one.** Bucles que en vez de `i < len` ponen `i <= len` — en Python, error; en C, corrupción silenciosa. Las casillas van de 0 a len−1.\n2. **Mutación compartida.** `b = a` copia la REFERENCIA (en Python): ordenar `b` ordena `a`. Copia de verdad cuando necesites copia: `b = a[:]`.\n3. **Borrar mientras iteras.** Eliminar elementos DENTRO de un bucle que recorre la lista hace que se te salten elementos: itera sobre índices ajustando el contador al borrar, o construye una lista nueva.\n4. **Arrays dinámicos como fijos.** En Python una lista es dinámica: el append es feliz. Pero si tu algoritmo promete O(n) total y encadenas N inserciones AL PRINCIPIO, sigue siendo O(n²) — amortizado solo cubre el append.",
    },
    {
      kind: "prose",
      id: "arrays-recap",
      text:
        "**Recap:** contigüidad = acceso O(1) por índice; buscar por valor O(n); insertar o borrar en medio O(n) porque las tarjetas desplazan; append O(1) amortizado. El array domina cuando tu patrón es \"leer por posición\"; pierde cuando es \"modificar en medio\" — eso lo resuelven listas enlazadas (cap. 8) y deques.",
    },
    {
      kind: "problem",
      id: "arrays-problem-1",
      problemId: "two-sum",
    },
    {
      kind: "problem",
      id: "arrays-problem-2",
      problemId: "contains-duplicate",
    },
  ],
};

/**
 * Capítulo 5 — Sorting (revisión didáctica 6a).
 */
export const sortingChapter: ChapterContent = {
  id: "sorting",
  num: 5,
  title: "Sorting",
  blurb:
    "Bubble, insertion y selection — tres formas de ordenar con distinto carácter y la misma cara fea: O(n²).",
  blocks: [
    {
      kind: "prose",
      id: "sorting-hook",
      text:
        "**Gancho:** ordenar es la tarea más común del mundo (buscar, deduplicar, rangos, fusionar…). Hay docenas de algoritmos de ordenación, pero los tres elementales —bubble, insertion y selection— comparten la misma figura: en el peor caso hacen **O(n²) comparaciones** y todo sucede dentro del array. Lo que los distingue es CÓMO mueven las tarjetas: intercambiando vecinos, levantando una clave o seleccionando el mínimo.",
    },
    {
      kind: "prose",
      id: "sorting-intro",
      text:
        "Los tres trabajan completamente sobre el array: espacio extra O(1) — *in-place*. Míralos en movimiento: cada uno con sus contadores de comparaciones y escrituras activos, y el código Python debajo ejecutándose línea a línea (code playback). Cambia la entrada con 🎲 «casi ordenado» y observa cómo cambia el carácter de cada uno.",
    },
    {
      kind: "viz",
      id: "sorting-bubble-viz",
      type: "sorting",
      config: { algo: "bubble", array: "7, 3, 9, 1, 5, 2" },
    },
    {
      kind: "prose",
      id: "sorting-bubble-text",
      text:
        "**Bubble sort** barre pares adyacentes e intercambia si están al revés: en cada pasada, el mayor de la zona activa \"flota\" hasta su posición final (fijada en verde). Su gracia: si una pasada entera se hace sin UN solo intercambio, el array ya está ordenado y puedes PARAR — mejor caso O(n). Sin esa bandera, pierde tiempo recorriendo array ya ordenado.",
    },
    {
      kind: "viz",
      id: "sorting-insertion-viz",
      type: "sorting",
      config: { algo: "insertion", array: "7, 3, 9, 1, 5, 2" },
    },
    {
      kind: "prose",
      id: "sorting-insertion-text",
      text:
        "**Insertion sort** va construyendo a la IZQUIERDA una versión ordenada: toma la siguiente clave, la LEVANTA (verás el hueco punteado), y la desliza hacia atrás hasta encajarla. Es el algoritmo de la baraja que usas sin darte cuenta jugando a cartas. Con entradas **casi ordenadas** vuela: O(n) — cada clave se mueve una casilla o ninguna. Además es **estable** (los iguales conservan su orden relativo).",
    },
    {
      kind: "viz",
      id: "sorting-selection-viz",
      type: "sorting",
      config: { algo: "selection", array: "7, 3, 9, 1, 5, 2" },
    },
    {
      kind: "prose",
      id: "sorting-selection-text",
      text:
        "**Selection sort** busca el mínimo de la zona desordenada y lo intercambia con el primer hueco libre. Su marca: hace SIEMPRE las mismas comparaciones — ~n²/2, sin importar cómo venga la entrada, son tarifa fija. A cambio solo hace hasta n−1 intercambios: si cada ESCRITURA te cuesta cara (memoria lenta, flash), escribir poco importa. No es estable.",
    },
    {
      kind: "divider",
      id: "sorting-divider-1",
    },
    {
      kind: "prose",
      id: "sorting-example",
      text:
        "**Ejemplo resuelto.** [7, 3, 9, 1, 5, 2] con bubble: pasada 1 fija el 9 al final, pasada 2 fija el 7… los mayores van migrando hacia la derecha hasta que solo queda el 1 suelto. Pregunta clave: ¿cuántas pasadas si la entrada YA está ordenada? Con la bandera `swapped`: UNA pasada de n−1 comparaciones → O(n). Sin bandera: las n pasadas igualmente. Nada es gratis para quien no vigile su bucle.",
    },
    {
      kind: "prose",
      id: "sorting-costs",
      text:
        "| Algoritmo | Peor | Mejor | Espacio | Estable | Cuándo usarlo |\n| --- | --- | --- | --- | --- | --- |\n| Bubble | O(n²) | O(n) (con bandera) | O(1) | sí | docencia, arrays minúsculos |\n| Insertion | O(n²) | O(n) | O(1) | sí | casi ordenado, n pequeño |\n| Selection | O(n²) | O(n²) | O(1) | no | escrituras caras, n pequeño |\n\n**Tradeoff central:** los tres comparten el O(n²) en el peor caso — lo que los distingue es el caso mejor (el carácter) y cuántas escrituras hacen. Para n grande: merge sort / quicksort O(n log n), los verás en el capítulo de recursión.",
    },
    {
      kind: "prose",
      id: "sorting-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Bucle infinito «invisible».** Cualquier variante que en vez de avanzar (`i+1`, `hi−1`) deje el rango igual puede no terminar. Comprueba SIEMPRE que cada paso reduce el rango activo.\n2. **Estabilidad en selección.** El intercambio salta distancias: [2a, 2b, 1] → [1, 2b, 2a] reordena dos iguales — por eso selection NO es estable.\n3. **Insertion disfrazado.** Contar solo «escrituras» esconde el trabajo real del desplazamiento: la comparación `while j ≥ 0` es la que dispara el coste en orden inverso, no la escritura.\n4. **O(n²) a escala.** n = 10⁵ son ~10¹⁰ operaciones — minutos de CPU. Para millones de elementos, pasar a O(n log n) es la diferencia entre «hoy» y «nunca».",
    },
    {
      kind: "prose",
      id: "sorting-recap",
      text:
        "**Recap:** bubble = intercambios de vecinos con bandera de parada temprana; insertion = clave levantada que se encaja en el lado ordenado (rey del casi ordenado, estable); selection = mínimo global a lo suyo (pocas escrituras, inestable). Los tres in-place con O(1) extra y O(n²) en el peor caso. El paso siguiente: divide y vencerás (recursión) reduce ese n² a n log n.",
    },
  ],
};

/**
 * Capítulo 13 — Trees (revisión 6c pendiente; vizzes actualizadas).
 */
export const treesChapter: ChapterContent = {
  id: "trees",
  num: 13,
  title: "Trees",
  blurb: "Jerarquías y sus recorridos: preorder, inorder, postorder sobre un BST balanceado.",
  blocks: [
    {
      kind: "prose",
      id: "trees-intro",
      text:
        "Un **árbol** es una estructura jerárquica de nodos. Cada nodo tiene un valor y punteros a hijos (izquierdo y derecho en un árbol binario). El nodo sin padre es la **raíz**; los nodos sin hijos son **hojas**.",
    },
    {
      kind: "viz",
      id: "trees-inorder-viz",
      type: "tree",
      config: { order: "inorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "trees-inorder-text",
      text:
        "**Inorder** (izquierda → raíz → derecha) es el recorrido natural de un árbol binario de búsqueda: visita los nodos en orden ascendente. Es el que usarás para imprimir un BST ordenado.",
    },
    {
      kind: "viz",
      id: "trees-preorder-viz",
      type: "tree",
      config: { order: "preorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "trees-preorder-text",
      text:
        "**Preorder** (raíz → izquierda → derecha) visita la raíz antes que sus hijos. Útil para copiar un árbol o imprimir expresiones en notación prefija.",
    },
    {
      kind: "viz",
      id: "trees-postorder-viz",
      type: "tree",
      config: { order: "postorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "trees-postorder-text",
      text:
        "**Postorder** (izquierda → derecha → raíz) visita los hijos antes que la raíz. Útil para liberar memoria de un árbol o calcular tamaños de subárboles de abajo hacia arriba.",
    },
  ],
};

/**
 * Capítulo 17 — Graphs (revisión 6c pendiente; vizzes actualizadas).
 */
export const graphsChapter: ChapterContent = {
  id: "graphs",
  num: 17,
  title: "Graphs",
  blurb: "BFS y DFS sobre grafos no dirigidos: orden de visita y colas/pilas.",
  blocks: [
    {
      kind: "prose",
      id: "graphs-intro",
      text:
        "Un **grafo** modela relaciones entre objetos: nodos (vértices) y aristas (conexiones). No dirigidos significa que las aristas van en ambos sentidos. Los recorridos fundamentales son BFS (anchura) y DFS (profundidad).",
    },
    {
      kind: "viz",
      id: "graphs-bfs-viz",
      type: "graph",
      config: { algo: "bfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "graphs-bfs-text",
      text:
        "**BFS** explora capa por capa: primero el nodo inicial, luego sus vecinos directos, luego los vecinos de esos vecinos. Usa una **cola** (FIFO). Es el algoritmo para encontrar el camino más corto en grafos no ponderados.",
    },
    {
      kind: "viz",
      id: "graphs-dfs-viz",
      type: "graph",
      config: { algo: "dfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "graphs-dfs-text",
      text:
        "**DFS** explora lo más profundo posible por una rama antes de retroceder. Usa una **pila** (LIFO) o recursión. Útil para detectar ciclos, orden topológico y resolver laberintos.",
    },
  ],
};

/**
 * Capítulo 14 — Heaps (revisión 6c pendiente; vizzes actualizadas).
 */
export const heapsChapter: ChapterContent = {
  id: "heaps",
  num: 14,
  title: "Heaps",
  blurb: "Montículos binarios: insertar y extraer máximo con sift-up y sift-down.",
  blocks: [
    {
      kind: "prose",
      id: "heaps-intro",
      text:
        "Un **montículo binario** (heap) es un árbol completo donde cada nodo cumple el **invariante del montículo**: en un max-heap, el padre es siempre mayor o igual que sus hijos. El máximo está siempre en la raíz. Se representa eficientemente como un array: el hijo izquierdo de i está en 2i+1, el derecho en 2i+2.",
    },
    {
      kind: "viz",
      id: "heaps-insert-viz",
      type: "heap",
      config: { op: "insert", array: "10, 7, 9, 5, 6, 3, 8", value: "4" },
    },
    {
      kind: "prose",
      id: "heaps-insert-text",
      text:
        "Para **insertar**, colocas el valor al final del array (última hoja) y haces **sift-up**: comparas con el padre e intercambias mientras sea mayor. O(log n).",
    },
    {
      kind: "viz",
      id: "heaps-extract-viz",
      type: "heap",
      config: { op: "extract-max", array: "10, 7, 9, 5, 6, 3, 8" },
    },
    {
      kind: "prose",
      id: "heaps-extract-text",
      text:
        "Para **extraer el máximo**, quitas la raíz, mueves el último elemento a la raíz y haces **sift-down**: comparas con los hijos e intercambias con el mayor mientras sea necesario. O(log n). Los montículos son la base de las colas de prioridad y del heapsort.",
    },
  ],
};

export const chaptersContent: Record<string, ChapterContent> = {
  arrays: arraysChapter,
  sorting: sortingChapter,
  trees: treesChapter,
  graphs: graphsChapter,
  heaps: heapsChapter,
};
