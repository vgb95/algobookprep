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
      textEn: "**Hook:** the array is the humblest structure and the fastest. Why? Look at how it lives in RAM: pure order, no detours. Picture a row of numbered lockers: locker #i is at `first + i·size` — one single jump, nothing walking down the hallway. Every other data structure exists to fix what the array does NOT do well: grow or shrink in the middle.",
    },
    {
      kind: "prose",
      id: "arrays-intro",
      text:
        "Un **array** es una colección de elementos del mismo tipo almacenados en **posiciones de memoria contiguas**. Todas las casillas tienen el mismo tamaño (¡por eso ese \"elemento del mismo tipo\"!): si sabes dónde empieza el array y cuánto ocupa cada casilla, puedes calcular la dirección de cualquier elemento sin recorrer nada.",
      textEn: "An **array** is a collection of same-type elements stored in **contiguous memory positions**. Every cell has the same size (that is why “same-type element”!): if you know where the array starts and how much each cell takes, you can compute the address of any element without walking anything.",
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
      textEn: "That formula is the array's superpower: **random access in O(1)**. Reading or writing `a[5]` is one single memory jump. BUT watch the visualization: searching *by value* (where is the 7?) forces a walk, cell by cell — O(n). O(1) holds only for the index; the value must be searched.",
    },
    {
      kind: "prose",
      id: "arrays-insert",
      text:
        "Ahora el lado oscuro: la contigüidad es un contrato rígido — no hay huecos. Para **insertar** en la posición *i*, todo lo posterior debe ganar una casilla a la derecha, UNO a UNO, para que siga habiendo contigüidad. En el peor caso (insertar al principio) desplazas los *n* elementos: **O(n)**.",
      textEn: "Now the dark side: contiguity is a rigid contract — no gaps allowed. To **insert** at position *i*, everything after it must win a cell to the right, ONE at a time, so the contiguity survives. In the worst case (inserting at the front) you shift all *n* elements: **O(n)**.",
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
      textEn: "**Deleting** is the reverse: the element leaves and the later ones fall one cell to the left to cover the gap. Again **O(n)**. Look at the visualization: the gap travels from the exit position to the end while the cards collapse — physical, not abstract.",
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
      textEn: "**Solved example.** What is the total cost of inserting 1,000 times ALWAYS at the beginning of an array? Every insertion shifts the whole list: 1 + 2 + … + 1,000 ≈ 500,000 writes — O(n²). Now insert ALWAYS at the end (append): nothing to shift — 1,000 writes — O(n) total, O(1) **amortized** per operation (from time to time the table grows and pays a copy). Same operation, different position: what you are choosing is the COST.",
    },
    {
      kind: "prose",
      id: "arrays-costs",
      text:
        "| Operación | Coste | Motivo |\n| --- | --- | --- |\n| acceso por índice `a[i]` | O(1) | aritmética de direcciones |\n| buscar por valor | O(n) | no hay orden garantizado |\n| insertar / borrar en medio | O(n) | desplazar el resto |\n| append al final | O(1) amortizado | nada que desplazar (crecer paga una copia) |\n\n**Tradeoff frente a otras estructuras:** si tu vida son inserciones en cualquier posición, la lista enlazada (cap. 8) hace la inserción en O(1)… pero su búsqueda también es O(n) y pierde el acceso aleatorio. Ninguna gana de forma absoluta: gana la que encaja con tu patrón de uso.",
      textEn: "| Operation | Cost | Why |\n| --- | --- | --- |\n| access by index `a[i]` | O(1) | address arithmetic |\n| search by value | O(n) | no guaranteed order |\n| insert / delete in the middle | O(n) | the rest must shift |\n| append at the end | O(1) amortized | nothing to shift (growing pays a copy) |\n\n**Tradeoff against other structures:** if your life is insertions at arbitrary positions, the linked list (ch. 8) inserts in O(1)… but its search is also O(n) and it loses random access. None wins absolutely: the one that fits your usage pattern wins.",
    },
    {
      kind: "prose",
      id: "arrays-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Off-by-one.** Bucles que en vez de `i < len` ponen `i <= len` — en Python, error; en C, corrupción silenciosa. Las casillas van de 0 a len−1.\n2. **Mutación compartida.** `b = a` copia la REFERENCIA (en Python): ordenar `b` ordena `a`. Copia de verdad cuando necesites copia: `b = a[:]`.\n3. **Borrar mientras iteras.** Eliminar elementos DENTRO de un bucle que recorre la lista hace que se te salten elementos: itera sobre índices ajustando el contador al borrar, o construye una lista nueva.\n4. **Arrays dinámicos como fijos.** En Python una lista es dinámica: el append es feliz. Pero si tu algoritmo promete O(n) total y encadenas N inserciones AL PRINCIPIO, sigue siendo O(n²) — amortizado solo cubre el append.",
      textEn: "**Frequent traps:**\n\n1. **Off-by-one.** Loops that say `i <= len` instead of `i < len` — in Python, an error; in C, silent corruption. Cells run from 0 to len−1.\n2. **Shared mutation.** `b = a` copies the REFERENCE (in Python): sorting `b` sorts `a`. Take a real copy when you need one: `b = a[:]`.\n3. **Deleting while iterating.** Removing elements INSIDE a loop that walks the list makes you skip some: iterate over indexes, adjusting the counter when you delete, or build a new list.\n4. **Dynamic arrays as fixed.** In Python a list is dynamic: the append is happy. But if your algorithm promises O(n) total and you chain N insertions AT THE FRONT, it stays O(n²) — amortization only covers the append.",
    },
    {
      kind: "prose",
      id: "arrays-recap",
      text:
        "**Recap:** contigüidad = acceso O(1) por índice; buscar por valor O(n); insertar o borrar en medio O(n) porque las tarjetas desplazan; append O(1) amortizado. El array domina cuando tu patrón es \"leer por posición\"; pierde cuando es \"modificar en medio\" — eso lo resuelven listas enlazadas (cap. 8) y deques.",
      textEn: "**Recap:** contiguity = O(1) access by index; search by value O(n); insert or delete in the middle O(n) because the cards shift; append O(1) amortized. The array rules when your pattern is “read by position”; it loses when it is “modify in the middle” — linked lists (ch. 8) and deques resolve that.",
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
 * Capítulo 13 — Trees (revisión 6c).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const treesChapter: ChapterContent = {
  id: "trees",
  num: 13,
  title: "Trees",
  blurb: "Jerarquías: vocabulario, los tres recorridos y quién vale para qué.",
  blocks: [
    {
      kind: "prose",
      id: "trees-hook",
      text:
        "**Gancho:** el DOM de esta página es un árbol. También lo es tu sistema de ficheros, el organigrama de una empresa y la escena de un videojuego (escena → grupos → objetos). En un array buscar el «hijo de X» no tiene sentido — el árbol añade jerarquía al mundo plano de las listas. Y su primera pregunta es siempre la misma: ¿EN QUÉ ORDEN lo recorro?",
    },
    {
      kind: "prose",
      id: "trees-intro",
      text:
        "Un **árbol** es una estructura jerárquica: un nodo **raíz** y, colgando de él, nodos hijos que a su vez cuelgan subárboles. Vocabulario que usarás siempre:\n\n- **Nodo:** guarda valor + referencias a sus hijos.\n- **Hoja:** nodo sin hijos.\n- **Altura:** número de niveles de abajo a arriba — la profundidad que condiciona TODO (recursión del cap. 11, BST del cap. 15, heaps del cap. 14).\n\nEn árboles binarios, cada nodo tiene como mucho dos hijos (izquierdo y derecho). Cualquier recorrido visita los n nodos una vez: O(n) — la pregunta es el ORDEN de esas visitas.",
    },
    {
      kind: "formula",
      id: "trees-edges",
      latex: "n \\text{ nodos} \\Rightarrow n - 1 \\text{ aristas} \\qquad \\text{recorrido: } O(n)",
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
        "**Inorder** (izquierda → raíz → derecha): visita cada nodo DESPUÉS de su subárbol izquierdo y ANTES del derecho. En un árbol binario de BÚSQUEDA, esto produce los valores en orden ascendente — es la firma de este recorrido y la pregunta de entrevista más repetida del tema (ya lo verás en el cap. 15).",
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
        "**Preorder** (raíz → izquierda → derecha): la raíz sale PRIMERO. Es el recorrido del copiar/serializar: para reconstruir el árbol se necesita conocer su estructura desde arriba. También el de imprimir un cálculo en notación prefija.",
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
        "**Postorder** (izquierda → derecha → raíz): los hijos salen antes que el padre. Es el recorrido del BORRADO (no puedes liberar un padre mientras sus hijos cuelgan) y del cálculo bottom-up: el tamaño o el balance de un subárbol se resuelve solo cuando ya conoces sus dos hijos.",
    },
    {
      kind: "divider",
      id: "trees-divider-1",
    },
    {
      kind: "prose",
      id: "trees-tradeoffs",
      text:
        "Los tres recorridos, con su mandato:\n\n| Recorrido | Orden | Para qué se usa |\n| --- | --- | --- |\n| inorder | izq → raíz → der | BST en orden creciente (cap. 15) |\n| preorder | raíz → izq → der | serializar/copiar/estructura |\n| postorder | izq → der → raíz | borrar, cálculos dependientes de los hijos |\n\nLos tres O(n). En todos, la implementación recursiva gasta O(altura) de pila (cap. 11): O(log n) si el árbol está balanceado, O(n) si degenera en cadena. Con pila EXPLÍCITA (cap. 9) se escribe iterativo: es el patrón típico cuando la profundidad dispara.",
    },
    {
      kind: "prose",
      id: "trees-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Confundir «árbol binario» con «BST».** Solo el BST tiene orden — recorrer inorden un árbol binario CUALQUIERA no produce nada ordenado.\n2. **Base case None olvidado.** El hijo que no existe es el freno de la recursión — sin esa guarda, el recorrido explota (cap. 11).\n3. **Altura ≠ nº de nodos.** La profundidad de la recursión es la ALTURA: un árbol de 10.000 nodos puede medir 13 de alto (perfecto) o 10.000 (cadena). El MISMO código, futuro muy distinto.\n4. **Modificar mientras recorres.** Insertar/borrar dentro del propio recorrido invalida el orden — calcula y después edita, o vuelve a planificar el recorrido con cuidado.",
    },
    {
      kind: "prose",
      id: "trees-recap",
      text:
        "**Recap:** árbol = jerarquía de nodos (raíz, hijos, hojas) con altura que gobierna su coste. Los tres recorridos — inorder, preorder, postorder — cuestan O(n) y se distinguen por DÓNDE sale la raíz: en medio (datos ordenados), al principio (copiar), al final (borrar/cálculos bottom-up). Cuando el árbol ORDENA, manda el inorder: es el mundo del capítulo 15.",
    },
  ],
};

/**
 * Capítulo 17 — Graphs (revisión 6c).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const graphsChapter: ChapterContent = {
  id: "graphs",
  num: 17,
  title: "Graphs",
  blurb: "Redes: representación y los dos recorridos madre (BFS y DFS).",
  blocks: [
    {
      kind: "prose",
      id: "graphs-hook",
      text:
        "**Gancho:** «¿Tienes un amigo en común con tu amigo?» — esa pregunta NO se responde con arrays ni árboles: las relaciones van en todas direcciones, con ciclos y sin cabeza. El **grafo** es la estructura más general del libro: árbol = grafo sin ciclos; lista = camino. Todo lo demás (Dijkstra, union-find, MST de los caps. 18–20) es aplicar recorridos sobre esta base.",
    },
    {
      kind: "prose",
      id: "graphs-intro",
      text:
        "Un **grafo** es un conjunto de nodos (vértices) y aristas que los conectan. En NO dirigidos, la arista vale para los dos sentidos; en dirigidos, solo en el suyo. Para describir el grafo en código hay dos representaciones:\n\n- **Lista de adyacencia:** por cada nodo, sus vecinos. Espacio O(n + m) — el estándar de casi todo.\n- **Matriz de adyacencia:** casilla n×n marcada si hay arista. Espacio O(n²) pero preguntar «¿a y b están conectados?» es O(1).\n\nn = nodos, m = aristas.",
    },
    {
      kind: "formula",
      id: "graphs-space",
      latex: "\\text{lista: } O(n + m) \\qquad \\text{matriz: } O(n^2), \\qquad \\text{consulta } O(1)",
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
        "**BFS (anchura):** una **cola** (cap. 10) hace el trabajo — dequeue al frente, encola los vecinos no visitados. El resultado es una ONDA: primero todo a distancia 1, luego a 2… Por eso BFS encuentra el **camino más corto** (en nº de aristas) de un grafo no ponderado — la propiedad que Dijkstra generalizará con pesos (cap. 18).",
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
        "**DFS (profundidad):** una **pila** (o la recursión del cap. 11) — avanza por UNA rama hasta el fondo y retrocede (backtracking) cuando no queda salida. Cambiar la cola por la pila es UNA línea que produce otro algoritmo: sirve para detectar CICLOS, orden topológico (cap. 18), componentes conexas y resolver laberintos.",
    },
    {
      kind: "divider",
      id: "graphs-divider-1",
    },
    {
      kind: "prose",
      id: "graphs-ejemplo",
      text:
        "**Ejemplo resuelto — ¿BFS o DFS?** Grafo con n = 6 y m = 6: quieres el camino más corto de 0 a 5 → BFS (la primera vez que 5 sale de la cola, esa distancia es mínima). Quieres saber si hay ciclo → DFS (una arista hacia un nodo «en pila» = ciclo). Quieres listar componentes → un bucle que lanza DFS desde cada nodo no visitado. La estructura (lista de adyacencia) es idéntica; el CONTENEDOR (cola vs pila) cambia el algoritmo.",
    },
    {
      kind: "prose",
      id: "graphs-tradeoffs",
      text:
        "Cuándo cada uno:\n\n| Criterio | BFS | DFS |\n| --- | --- | --- |\n| orden de exploración | por capas (onda) | por rama (profundidad) |\n| camino más corto (sin pesos) | ✓ | no garantizado |\n| memoria | O(anchura) — puede ser toda una capa | O(profundidad) de la pila |\n| usa | cola | pila / recursión |\n| detección de ciclos | sí (con marca de visita) | sí, natural |\n\nCoste de ambos: O(n + m) con lista de adyacencia — cada nodo entra/sale del contenedor una vez, cada arista se mira dos veces.",
    },
    {
      kind: "prose",
      id: "graphs-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Olvidar la marca de visitado.** En un grafo CON CICLOS, sin `visited` el recorrido entra en bucle infinito — la diferencia estructural con el árbol (que no tiene ciclos por definición).\n2. **Marcar tarde.** Marca el nodo al ENCOLARLO, no al sacarlo — si lo marcas al extraer, varios caminos lo encolen dos veces y la profundidad se acumula.\n3. **Componentes desconectadas.** Un solo BFS/DFS desde un nodo solo alcanza SU componente: para todo el grafo, lanza el recorrido desde cada nodo sin visitar.\n4. **Recursión profunda.** DFS recursivo sobre un grafo de 50.000 nodos lineales desborda el call stack (cap. 11) — versión iterativa con pila explícita.",
    },
    {
      kind: "prose",
      id: "graphs-recap",
      text:
        "**Recap:** el grafo generaliza arrays/árboles/listas: nodos + aristas con ciclos. Representación: lista O(n+m) por defecto, matriz O(n²) solo si necesitas consultas de par O(1). BFS (cola) = ondas y caminos mínimos; DFS (pila) = ramas, ciclos y topológico. Ambos O(n+m) — y son los motores de Dijkstra, union-find y MST de los caps. 18–20.",
    },
  ],
};

/**
 * Capítulo 14 — Heaps (revisión 6c).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const heapsChapter: ChapterContent = {
  id: "heaps",
  num: 14,
  title: "Heaps",
  blurb: "El montículo: máxima prioridad siempre arriba, con sift-up y sift-down.",
  blocks: [
    {
      kind: "prose",
      id: "heaps-hook",
      text:
        "**Gancho:** urgencias no atienden «por orden de llegada» ni «por orden de índice»: atienden LO MÁS GRAVE. Esa es una cola de prioridad, y su motor es el **montículo (heap)**: mantener el MÁXIMO (o mínimo) siempre arriba, con precio logarítmico por operación — sin ordenar el resto de la cola, que no lo necesita.",
    },
    {
      kind: "prose",
      id: "heaps-intro",
      text:
        "Un **montículo binario (max-heap)** es un árbol COMPLETO con invariante: cada padre es ≥ sus hijos. «Completo» significa que los niveles se llenan de izquierda a derecha — y esa propiedad es la clave práctica: un árbol completo vive DENTRO DE UN ARRAY sin huecos ni punteros.",
    },
    {
      kind: "formula",
      id: "heaps-indices",
      latex: "\\text{hijo izq de } i = 2i + 1, \\quad \\text{der} = 2i + 2, \\quad \\text{padre} = \\lfloor (i - 1)/2 \\rfloor",
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
        "**Insertar** = añadir al FINAL del array (la próxima hoja libre — árbol completo ⇒ hueco fijo) + **sift-up**: subir burbujeando mientras el padre sea menor. O(log n) — la altura del árbol: lo único que recorres.",
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
        "**Extraer el máximo** = llevar la RAÍZ (el máximo, gratis) al frente + poner el ÚLTIMO elemento en la raíz + **sift-down**: caer intercambiando con el hijo MAYOR mientras alguno lo supere. O(log n). El máximo sale ordenado cada vez — ese bucle ES el heapsort: O(n log n), en sitio.",
    },
    {
      kind: "divider",
      id: "heaps-divider-1",
    },
    {
      kind: "prose",
      id: "heaps-tradeoffs",
      text:
        "El montículo frente a sus rivales en «dame el máximo»:\n\n| Estructura | insertar | extraer máximo | ver máximo |\n| --- | --- | --- | --- |\n| **heap** | O(log n) | O(log n) | O(1) |\n| array ordenado | O(n) (insertar desplazando) | O(1) | O(1) |\n| BST balanceado (cap. 15) | O(log n) | O(log n) | O(log n) |\n| array sin orden | O(1) | O(n) (barrido) | O(n) |\n\nNinguna gana en TODO: el heap paga menos en cada operación y solo responde por el máximo — si necesitas el MÍNIMO, min-heap espejo; si necesitas cualquier ORDEN INTERMEDIO, el heap no lo da (no está ordenado globalmente: es «suficientemente ordenado» para prioridades).\n\nY el truco infrautilizado: **heapify** — convertir un array arbitrario en montículo en O(n) (desde el último padre, sift-down a cada uno), mejor que n inserciones O(n log n). De ahí nacen el heapsort y el clásico «los k mayores de un torrente de datos».",
    },
    {
      kind: "prose",
      id: "heaps-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Min vs max.** Python `heapq` es MIN-heap: el «más prioritario» es el menor. Para simular un max-heap: guarda las prioridades NEGATIVAS.\n2. **Sift-down al hijo equivocado.** Intercambiar con el hijo menor destruye el invariante: siempre el MAYOR en max-heap.\n3. **Construir con inserciones.** n inserts son O(n log n); heapify es O(n) — para los k-mayores de un flujo enorme, esa diferencia es la solución entera.\n4. **Actualizar prioridad.** Un elemento cuya prioridad CAMBIA exige depurar su posición (sift-up o down) — la cola de Dijkstra (cap. 18) vive de esto; un heap «inmutable» no resuelve decrease-key directamente.",
    },
    {
      kind: "prose",
      id: "heaps-recap",
      text:
        "**Recap:** árbol completo ⇒ array sin punteros (hijos en 2i+1 / 2i+2, padre en (i-1)/2). Invariante padre ≥ hijos — no orden total, suficiente para prioridades. Insert y extract O(log n), peek O(1); heapify O(n). Es la cola de prioridad (urgencias, schedulers, Dijkstra) y el heapsort. Donde el mundo pide «el más importante YA», responde él.",
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
