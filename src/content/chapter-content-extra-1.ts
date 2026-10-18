import { ChapterContent } from "./blocks";

/**
 * Capítulo 1 — Complexity Analysis (revisión didáctica 6a).
 * Estructura: gancho → teoría → ejemplo resuelto → tabla de tradeoffs
 * → trampas → recap.
 */
export const complexityChapter: ChapterContent = {
  id: "complexity",
  num: 1,
  title: "Complexity Analysis",
  blurb:
    "Big-O, Θ y Ω: a cuantificar el tiempo y la memoria que consume un algoritmo antes de escribirlo.",
  blocks: [
    {
      kind: "prose",
      id: "cx-hook",
      text:
        "**Gancho:** dos programas resuelven lo mismo; uno tarda milisegundos con 10.000 datos y otro quema tu portátil. La diferencia no es el lenguaje ni el ordenador: es cómo **crece** el trabajo con el tamaño de la entrada. La complejidad es la charla delante de la codificación: promete qué va a pasar cuando tus datos crezcan.",
      textEn: "**Hook:** two programs solve the same problem; one finishes in milliseconds with 10,000 records and the other burns your laptop. The difference is not the language nor the computer: it is how the work **grows** with the input size. Complexity is the talk before the coding: it promises what will happen when your data grows.",
    },
    {
      kind: "prose",
      id: "cx-intro",
      text:
        "La **complejidad** mide cuánto crece el coste de un algoritmo (tiempo o memoria) cuando *n* crece. No medimos segundos ni megabytes — eso depende de la máquina — sino el **orden de crecimiento**: cuántas veces más trabajo hace el algoritmo cuando duplicas la entrada.",
      textEn: "**Complexity** measures how much an algorithm's cost (time or memory) grows as *n* grows. We do not measure seconds or megabytes — that depends on the machine — but the **order of growth**: how many times more work the algorithm does when you double the input.",
    },
    {
      kind: "formula",
      id: "cx-big-o",
      latex: "f(n) \\in O(g(n)) \\iff \\exists c>0, n_0: \\forall n \\ge n_0, \\; f(n) \\le c \\cdot g(n)",
    },
    {
      kind: "prose",
      id: "cx-big-o-text",
      text:
        "**Big-O** es un techo: \"a partir de cierto n, nunca crece más rápido que *g(n)*\". Intuición útil: si un algoritmo es O(n²), al **duplicar** la entrada el trabajo se **cuadruplica**; si es O(n log n), poco más que se duplica; si es O(n), se duplica exactamente. Esa regla del \"¿qué pasa si duplico n?\" vale más que memorizar la definición formal.",
      textEn: "**Big-O** is a ceiling: “from some n onward, it never grows faster than *g(n)*”. Useful intuition: if an algorithm is O(n²), doubling the input **quadruples** the work; if it is O(n log n), it barely more than doubles; if it is O(n), it exactly doubles. The rule “what happens if I double n?” is worth more than memorizing the formal definition.",
    },
    {
      kind: "formula",
      id: "cx-theta",
      latex: "f(n) \\in \\Theta(g(n)) \\iff f(n) \\in O(g(n)) \\; \\land \\; f(n) \\in \\Omega(g(n))",
    },
    {
      kind: "prose",
      id: "cx-theta-text",
      text:
        "**Θ** encierra el crecimiento entre dos cotas iguales: crece *exactamente* como g(n) (a escala constante). **Ω** es el suelo — el mejor caso que puedes esperar. En entrevistas casi siempre hablamos del *peor caso* con Big-O.",
      textEn: "**Θ** boxes the growth between two equal bounds: it grows *exactly* like g(n) (up to a constant scale). **Ω** is the floor — the best case you can hope for. In interviews we almost always talk about the *worst case* with Big-O.",
    },
    {
      kind: "divider",
      id: "cx-divider-0",
    },
    {
      kind: "prose",
      id: "cx-example",
      text:
        "**Ejemplo resuelto.** Búsqueda lineal: ya visto en el capítulo de arrays; en el peor caso (objetivo ausente o al final) la revisas entera. Duplicar n duplica las comparaciones → T(n) = c·n → **O(n)**, y además es Θ(n) porque aunque el elemento sea el primero (mejor caso Ω(1)), la escala creciente es lineal. Búsqueda binaria: cada paso mata la mitad del rango; 1.000.000 elementos se resuelven en ≈20 pasadas porque 2²⁰ > 10⁶ → **O(log n)**.",
      textEn: "**Solved example.** Linear search: already seen in the arrays chapter; in the worst case (a missing target or one at the very end) you re-check the whole array. Doubling n doubles the comparisons → T(n) = c·n → **O(n)**; it is also Θ(n), because although a first-slot element is a best case of Ω(1), the growing scale is linear. Binary search: each step kills half of the range; 1,000,000 elements resolve in ≈20 passes because 2²⁰ > 10⁶ → **O(log n)**.",
    },
    {
      kind: "viz",
      id: "cx-demo-viz",
      type: "sorting",
      config: { algo: "insertion", array: "1, 2, 3, 5, 12, 7, 9, 14" },
      // casi ordenado: mira los contadores — sintetiza un O(n) real en pantalla
    },
    {
      kind: "prose",
      id: "cx-demo-text",
      text:
        "Mira los contadores de la visualización anterior: para un array *casi ordenado*, insertion sort compara muy poco (un O(n) disfrazado). Pulsa 🎲 y elige «aleatorio»: las comparaciones se disparan hacia O(n²). Mismos n, distinto carácter — por eso existen **peor** y **mejor** caso.",
      textEn: "Look at the counters in the visualization above: for an *almost sorted* array, insertion sort compares very little (an O(n) in disguise). Press 🎲 and pick “random”: comparisons explode toward O(n²). Same n, different character — that is why **worst** and **best** case exist.",
    },
    {
      kind: "prose",
      id: "cx-classes",
      text:
        "Las clases que verás una y otra vez, de más rápido a más lento:\n\n| Clase | Nombre | Ejemplo |\n| --- | --- | --- |\n| O(1) | constante | acceso por índice, insertar en tabla hash (promedio) |\n| O(log n) | logarítmico | búsqueda binaria, altura de un BST balanceado |\n| O(n) | lineal | un bucle que recorre todo |\n| O(n log n) | linealítmico | merge sort, quicksort promedio |\n| O(n²) | cuadrático | bucles anidados, sorts elementales |\n| O(2ⁿ) | exponencial | explorar todos los subconjuntos |",
      textEn: "The classes you will see over and over, from fastest to slowest:\n\n| Class | Name | Example |\n| --- | --- | --- |\n| O(1) | constant | access by index, insert into a hash table (average) |\n| O(log n) | logarithmic | binary search, the height of a balanced BST |\n| O(n) | linear | one loop that walks everything |\n| O(n log n) | linearithmic | merge sort, average quicksort |\n| O(n²) | quadratic | nested loops, elementary sorts |\n| O(2ⁿ) | exponential | exploring every subset |",
    },
    {
      kind: "prose",
      id: "cx-space",
      text:
        "La **complejidad espacial** mide memoria extra aparte de la entrada: un algoritmo *in-place* usa O(1) extra; uno que copia el array usa O(n). **Tradeoff clásico del capítulo:** la tabla hash paga O(n) de memoria para conseguir búsquedas O(1); sin esa inversión del espacio, buscas en O(n). Espacio a cambio de tiempo es una de las trucos más rentables de las entrevistas.",
      textEn: "**Spatial complexity** measures extra memory apart from the input: an *in-place* algorithm uses O(1) extra; one that copies the array uses O(n). **Classic chapter tradeoff:** the hash table pays O(n) of memory to gain O(1) lookups; without investing that space, you search in O(n). Space for time is one of the most profitable tricks in interviews.",
    },
    {
      kind: "prose",
      id: "cx-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Comparar n pequeño.** Para n = 20, O(n²) a veces gana a O(n log n) por constantes ocultas. Big-O es una promesa para entradas grandes, no un cronómetro.\n2. **Contar líneas, no bucles.** Un bucle que trabaja con otro bucle dentro no son dos líneas: es O(n²). Cuenta las veces que se ejecuta el bloque más interno.\n3. **Olvidar el logaritmo disfrazado.** `while (n > 1) n = n / 2` es O(log n) aunque no veas ninguna búsqueda binaria.\n4. **Confundir peor caso con promedio.** Quicksort es O(n log n) promedio pero O(n²) en el peor caso (piras malignas); el entrevistador pregunta por el peor.",
      textEn: "**Frequent traps:**\n\n1. **Comparing small n.** For n = 20, O(n²) sometimes beats O(n log n) because of hidden constants. Big-O is a promise for large inputs, not a stopwatch.\n2. **Counting lines, not loops.** A loop working inside another is not two lines: it is O(n²). Count how many times the innermost block runs.\n3. **Forgetting the disguised logarithm.** `while (n > 1) n = n / 2` is O(log n) even with no binary search in sight.\n4. **Confusing worst case with average.** Quicksort is O(n log n) on average but O(n²) in the worst case (evil pivots); the interviewer asks about the worst.",
    },
    {
      kind: "prose",
      id: "cx-recap",
      text:
        "**Recap:** Big-O acota el peor crecimiento; Ω el mejor; Θ ambos a la vez. Duplicar la entrada es tu radar mental: O(1) no cambió, O(n) se duplica, O(log n) casi aguantó, O(n²) se cuadruplicó. Y la segunda carta: memoria — comprar espacio pares a bajar el tiempo.",
      textEn: "**Recap:** Big-O bounds the worst growth; Ω the best; Θ both at once. Doubling the input is your mental radar: O(1) did not move, O(n) doubled, O(log n) almost held, O(n²) quadrupled. And the second card: memory — buying space often buys time.",
    },
    {
      kind: "divider",
      id: "cx-divider-1",
    },
  ],
};

/**
 * Capítulo 3 — Hash Tables (revisión didáctica 6a).
 */
export const hashTablesChapter: ChapterContent = {
  id: "hash-tables",
  num: 3,
  title: "Hash Tables",
  blurb:
    "Mapear claves a valores con funciones de hash — y qué pasa cuando dos claves colisionan.",
  blocks: [
    {
      kind: "prose",
      id: "ht-hook",
      text:
        "**Gancho:** buscar en un array de 10 millones de elementos es O(n): un millón de pasadas. Pero tu `set` de Python responde \"¿está este elemento?\" en milisegundos. ¿Magia? No: la tabla hash convierte la clave en una **dirección de memoria directa** — la búsqueda desaparece y en su lugar hay un cálculo.",
      textEn: "**Hook:** searching a 10-million-element array is O(n): a million passes. But your Python `set` answers “is this element in it?” in milliseconds. Magic? No: the hash table turns the key into a **direct memory address** — the search disappears and in its place there is a calculation.",
    },
    {
      kind: "prose",
      id: "ht-intro",
      text:
        "Una **tabla hash** guarda pares (clave, valor) con operaciones put/get/delete en **tiempo promedio O(1)**. El truco: la función de hash traduce la clave a un número, y ese número es un **índice directo** del array interno — no hay que buscar: sabes exactamente dónde vive.",
      textEn: "A **hash table** stores (key, value) pairs with put/get/delete in **average O(1) time**. The trick: the hash function translates the key into a number, and that number is a **direct index** into the internal array — there is nothing to search: you know exactly where it lives.",
    },
    {
      kind: "formula",
      id: "ht-hash",
      latex: "h(k) = k \\bmod m",
    },
    {
      kind: "prose",
      id: "ht-hash-text",
      text:
        "Una función de hash buena debe ser **rápida** de calcular y **uniforme**: repartir las claves de forma pareja entre las *m* posiciones para minimizar las aglomeraciones. En la fórmula del ejemplo h(k) = k mod m, para claves enteras con m primo se distribuyen razonablemente bien.",
      textEn: "A good hash function must be **fast** to compute and **uniform**: spread the keys evenly across the *m* slots to minimize pile-ups. In the example formula h(k) = k mod m, integer keys with a prime m distribute reasonably well.",
    },
    {
      kind: "prose",
      id: "ht-collision",
      text:
        "Si dos claves distintas caen en la misma casilla, ocurre una **colisión**. Hay dos estrategias clásicas:\n\n1. **Encadenamiento (chaining):** cada casilla apunta a una lista (o bucket) de elementos; las colisiones se apilan ahí. Las listas también admiten borrado directo.\n2. **Direccionamiento abierto (open addressing):** si la casilla está ocupada, se prueba la siguiente de una secuencia de sondeo (lineal: i, i+1, i+2…; o cuadrática/doble hash para evitar aglomeraciones).",
      textEn: "If two different keys land in the same slot, a **collision** happens. There are two classic strategies:\n\n1. **Chaining:** each slot points to a list (or bucket) of elements; collisions pile up there. Lists also support direct deletion.\n2. **Open addressing:** if the slot is taken, try the next one in a probing sequence (linear: i, i+1, i+2…; or quadratic / double hashing to avoid clusters).",
    },
    {
      kind: "prose",
      id: "ht-load-factor",
      text:
        "El **factor de carga** decide el rendimiento:\n",
      textEn: "The **load factor** decides the performance:\n",
    },
    {
      kind: "formula",
      id: "ht-alpha",
      latex: "\\alpha = n / m \\quad (\\text{elementos / casillas})",
    },
    {
      kind: "prose",
      id: "ht-load-text",
      text:
        "Con α ≈ 0.7, casi todas las búsquedas dan con el hueco a la primera. Cuando α sube mucho, se hace **rehashing**: un array nuevo (normalmente el doble) y se reinsertan todos los elementos — la operación puntual cuesta O(n) (por eso los diccionarios hablan de **O(1) amortizado**, como el append de un array).",
      textEn: "With α ≈ 0.7, almost every search finds an empty slot on the first try. When α climbs too high, **rehashing** kicks in: a new array (usually double) and every element re-inserted — that one-off operation costs O(n) (that is why dictionaries speak of **amortized O(1)**, like an array's append).",
    },
    {
      kind: "viz",
      id: "ht-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "12, 44, 13, 88, 23, 94, 11, 39, 20, 16", target: "23" },
    },
    {
      kind: "prose",
      id: "ht-viz-text",
      text:
        "Esta visualización es lo que SUCEDE sin hash: buscar por valor barre casilla a casilla. Con una tabla hash, ese traveseo se convierte en `h(clave) → casilla` — cero búsqueda. Por eso, ante un bucle doble de comparaciones, la primera mejora a proponer en una entrevista es sustituirlo por un mapa.",
      textEn: "This visualization is what happens WITHOUT a hash: searching by value sweeps slot by slot. With a hash table, that traversal becomes `h(key) → slot` — zero searching. That is why, facing a double loop of comparisons, the first improvement to propose in an interview is to replace it with a map.",
    },
    {
      kind: "prose",
      id: "ht-example",
      text:
        "**Ejemplo resuelto.** Detectar si hay duplicados en un array: bucle doble O(n²); con un set provisional (hash) es O(n) promedio — visitas cada elemento una vez y preguntas \"¿ya lo había guardado?\". Pago: O(n) extra de memoria. Esa es la cara del tradeoff espacio-tiempo, aplicado.",
      textEn: "**Solved example.** Detecting duplicates in an array: a double loop is O(n²); with a temporary hash set it is average O(n) — you visit each element once and ask “have I already stored this?”. The payment: O(n) extra memory. That is the space-time tradeoff, applied.",
    },
    {
      kind: "prose",
      id: "ht-tradeoffs",
      text:
        "Tabla de alternativas para BUSCAR en una colección:\n\n| Estructura | Requisito | Búsqueda | Borrar/insertar | Memoria |\n| --- | --- | --- | --- | --- |\n| array sin orden | nada | O(n) | O(n) | mínima |\n| array ordenado + binaria | estar ordenado | O(log n) | O(n) | mínima |\n| hash table | función hash | O(1) prom. / O(n) peor | O(1) prom. / O(n) peor | O(n) + huecos |\n| STD set / BST balanceado | nada (ordena solo) | O(log n) garantizado | O(log n) | O(n) |\n",
      textEn: "Table of alternatives for SEARCHING a collection:\n\n| Structure | Requirement | Search | Delete/insert | Memory |\n| --- | --- | --- | --- | --- |\n| unordered array | none | O(n) | O(n) | minimal |\n| sorted array + binary | must be sorted | O(log n) | O(n) | minimal |\n| hash table | hash function | O(1) avg / O(n) worst | O(1) avg / O(n) worst | O(n) + gaps |\n| STD set / balanced BST | none (sorts itself) | O(log n) guaranteed | O(log n) | O(n) |",
    },
    {
      kind: "prose",
      id: "ht-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Claves mutables.** Si mutas la clave (una lista) después de meterla al dict, se guarda mal: hash ya no corresponde. Usa claves inmutables (ints, strings, tuples).\n2. **Caso peor real.** Un hash mal elegido (todas las claves al mismo bucket) degenera la tabla a O(n) — la entrevista menciona \"¿y si el atacante eligió las claves?\".\n3. **α = 1 en open addressing.** Con el array lleno, una búsqueda puede girar infinito: siempre has de dejar huecos o hacer rehash antes.\n4. **Orden de iteración.** Un dict no garantiza orden de inserción en casi todos lenguajes: si necesitas orden, ordena las claves por separado.",
      textEn: "**Frequent traps:**\n\n1. **Mutable keys.** If you mutate the key (a list) after putting it into the dict, it is stored wrong: the hash no longer matches. Use immutable keys (ints, strings, tuples).\n2. **A real worst case.** A badly chosen hash (all keys into one bucket) degenerates the table to O(n) — interviews love “what if the attacker picked the keys?”.\n3. **α = 1 in open addressing.** With the array full, a search can spin forever: always leave gaps or rehash before it comes to that.\n4. **Iteration order.** A dict does not guarantee insertion order in most languages: if you need order, sort the keys separately.",
    },
    {
      kind: "prose",
      id: "ht-recap",
      text:
        "**Recap:** hash O(1) promedio para put/get/delete; la función hash reparte; las colisiones se resuelven con encadenamiento o sondeo; el factor de carga dispara el rehash cuando α crece. El peor caso es O(n), pero con un hash decente y α bajito, la operación es \"directa\". Y desactivar el ahorro de bucles anidados es la jugada nº1 de entrevistas.",
      textEn: "**Recap:** average O(1) for put/get/delete; the hash function spreads the keys; collisions are resolved with chaining or probing; the load factor triggers rehashing when α grows. The worst case is O(n), but with a decent hash and a low α the operation is “direct”. And swapping the nested-loop scan for a map is the number-one move in interviews.",
    },
  ],
};

/**
 * Capítulo 4 — Search (revisión didáctica 6a).
 */
export const searchChapter: ChapterContent = {
  id: "search",
  num: 4,
  title: "Search",
  blurb: "Lineal y binario: encontrar un elemento lo antes posible.",
  blocks: [
    {
      kind: "prose",
      id: "search-hook",
      text:
        "**Gancho:** busca tu nombre en una guía de teléfono DESORDENADA: 1.000 páginas, una a una — eso es búsqueda lineal. Ahora busca en la ordenada: abres por la mitad, ves que tu letra va antes, tiras la otra mitad… log₂(1.000.000) ≈ 20 pasos. La mitad del trabajo se tira en cada paso. Ese es TODO el capítulo.",
      textEn: "**Hook:** look for your name in an UNSORTED phone book: 1,000 pages, one by one — that is linear search. Now the sorted one: you open at the middle, see your letter comes earlier, throw the other half away… log₂(1,000,000) ≈ 20 steps. Half of the work is discarded at each step. That is the WHOLE chapter.",
    },
    {
      kind: "prose",
      id: "search-linear",
      text:
        "**Búsqueda lineal** no pide nada a los datos: recorre de principio a fin comparando. Sirve para cualquier colección (ordenada o no), pero en el peor caso examina TODO: O(n). Es la única opción si la colección desordena y no puedes invertir en pre-proceso.",
      textEn: "**Linear search** asks nothing of the data: it walks from start to end comparing. It works on any collection (sorted or not), but in the worst case it examines EVERYTHING: O(n). It is the only option when the collection is unordered and you cannot invest in pre-processing.",
    },
    {
      kind: "viz",
      id: "search-linear-viz",
      type: "array",
      config: { op: "lookup", array: "4, 1, 7, 3, 9, 2", target: "7" },
    },
    {
      kind: "divider",
      id: "search-divider-1",
    },
    {
      kind: "prose",
      id: "search-binary",
      text:
        "**Búsqueda binaria:** exige array **ordenado**. Toma el elemento medio; si es el objetivo, listo; si el objetivo es menor, todo lo que haya a la derecha del medio es descartable (¡está ordenado!) — y viceversa. El rango de candidatos se reduce a la mitad en CADA paso.",
      textEn: "**Binary search:** it demands a **sorted** array. Take the middle element; if it is the target, done; if the target is smaller, everything to the right of the middle is discardable (it is sorted!) — and vice versa. The range of candidates halves at EVERY step.",
    },
    {
      kind: "formula",
      id: "search-binary-f",
      latex: "T(n) = T(n/2) + O(1) \\implies T(n) = O(\\log n)",
    },
    {
      kind: "prose",
      id: "search-binary-intuition",
      text:
        "Eso es: n → n/2 → n/4 → … → 1 son ⌊log₂ n⌋ pasos para llegar a 1. Un array de un millón no necesita un millón de pasadas: ~20. Diez mil millones de elementos: ~33. El logaritmo mata la escala.",
      textEn: "Exactly: n → n/2 → n/4 → … → 1 is ⌊log₂ n⌋ steps to reach 1. A million-element array does not need a million passes: ~20. Ten billion elements: ~33. The logarithm kills the scale.",
    },
    {
      kind: "viz",
      id: "search-binary-viz",
      type: "array",
      config: { op: "binary", array: "1, 3, 7, 9, 12, 15, 19, 22", target: "12" },
    },
    {
      kind: "prose",
      id: "search-binary-viz-text",
      text:
        "Mira la visualización: el cursor salta al MEDIO, no a la casilla siguiente. Las casillas tintadas son las ya descartadas — cada gris es media colección que ya no re-visitarás jamás. Con el mismo array y objetivo, la lineal de arriba realizó 5 lecturas; la binaria, 3.",
      textEn: "Watch the visualization: the cursor jumps to the MIDDLE, not to the next slot. The tinted slots are the ones already discarded — each gray is half a collection you will never revisit again. With the same array and target, the linear search above made 5 reads; the binary one, 3.",
    },
    {
      kind: "prose",
      id: "search-example",
      text:
        "**Ejemplo resuelto.** Array [1, 3, 7, 9, 12, 15, 19, 22], busca 12. Paso 1: lo = 0, hi = 7 → mid = 3 → a[3] = 9 < 12 → lo = 4. Bajamos a la mitad derecha. Paso 2: lo = 4, hi = 7 → mid = 5 → a[5] = 15 > 12 → hi = 4. Paso 3: lo = 4, hi = 4 → mid = 4 → a[4] = 12 ✓. Tres pasadas para n = 8. Con la lineal: cinco.",
      textEn: "**Solved example.** Array [1, 3, 7, 9, 12, 15, 19, 22], look for 12. Step 1: lo = 0, hi = 7 → mid = 3 → a[3] = 9 < 12 → lo = 4. We drop to the right half. Step 2: lo = 4, hi = 7 → mid = 5 → a[5] = 15 > 12 → hi = 4. Step 3: lo = 4, hi = 4 → mid = 4 → a[4] = 12 ✓. Three passes for n = 8. Linear: five.",
    },
    {
      kind: "prose",
      id: "search-tradeoffs",
      text:
        "| Método | Requisito | Peor caso | Espacio |\n| --- | --- | --- | --- |\n| Lineal | nada | O(n) | O(1) |\n| Binaria (iterativa) | array ordenado | O(log n) | O(1) |\n| Binaria (recursiva) | array ordenado | O(log n) | O(log n) de pila |\n| Hash | función hash | O(1) promedio | O(n) |\n\nLa binaria es el punto dulce: logarítmica y sin memoria extra. Ahora bien: si ordenas (O(n log n)) SOLO para hacer UNA búsqueda, te has pasado — la ordenación es un **pre-proceso**: paga mucho si vas a buscar mil veces.",
      textEn: "| Method | Requirement | Worst case | Space |\n| --- | --- | --- | --- |\n| Linear | none | O(n) | O(1) |\n| Binary (iterative) | sorted array | O(log n) | O(1) |\n| Binary (recursive) | sorted array | O(log n) | O(log n) of stack |\n| Hash | hash function | O(1) average | O(n) |\n\nBinary is the sweet spot: logarithmic, and no extra memory. That said: if you sort (O(n log n)) ONLY to do ONE search, you have overspent — sorting is a **pre-process**: it pays off when you are going to search a thousand times.",
    },
    {
      kind: "prose",
      id: "search-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Rango acumulado incorrecto.** `lo = mid + 1` y `hi = mid - 1`, nunca `= mid`: si el puesto no garantiza progreso, el bucle no termina. Comprueba que en cada paso eliminas al menos un elemento del rango.\n2. **Overflow del mid** en lenguajes con ints acotados: `mid = lo + (hi − lo) // 2` en lugar de `(lo + hi) // 2` (en Python no aplica, en Java/C++ sí).\n3. **Duplicados.** Si a = [2, 2, 2, 3] y búsqueda 2, la binaria devuelve ALGÚN 2, no el primero. Para el primero: seguir buscando a la izquierda (hi = mid) incluso con a[mid] == target — variante *leftmost*.\n4. **Precondición mentirosa.** Binaria sobre desordenado es un bug silencioso: compila, corre, se equivoca. El invariante lo paga el que llama.",
      textEn: "**Frequent traps:**\n\n1. **Wrong range update.** `lo = mid + 1` and `hi = mid − 1`, never `= mid`: if the move does not guarantee progress, the loop never ends. Check that each step eliminates at least one element of the range.\n2. **mid overflow** in languages with bounded ints: `mid = lo + (hi − lo) // 2` instead of `(lo + hi) // 2` (in Python it does not apply; in Java/C++ it does).\n3. **Duplicates.** If a = [2, 2, 2, 3] and you search 2, binary returns SOME 2, not the first one. For the first: keep searching left (hi = mid) even when a[mid] == target — the *leftmost* variant.\n4. **Lying precondition.** Binary search over unsorted data is a silent bug: it compiles, it runs, it answers wrong. The invariant is the caller's responsibility.",
    },
    {
      kind: "prose",
      id: "search-recap",
      text:
        "**Recap:** sin orden, lineal O(n); con orden, binaria O(log n) que descarta media colección por paso; hash si puedes pagar memoria y quieres O(1) promedio. La búsqueda binaria es el patrón base de media entrevista: \"encuentra la primera ≥ x\", \"el mínimo en una serie rotada\", \"la primera vez que falla la condición\"… son todas la MISMA plantilla — mantén saneados lo, hi y mid.",
      textEn: "**Recap:** no order, linear O(n); with order, binary O(log n) that discards half the collection per step; hash if you can afford memory and want average O(1). Binary search is the base pattern of half of all interviews: “find the first ≥ x”, “the minimum in a rotated series”, “the first time the condition fails”… they are all the SAME template — keep lo, hi and mid sane.",
    },
  ],
};
