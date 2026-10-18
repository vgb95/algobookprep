/**
 * "En la entrevista": la capa de livecoding de cada capítulo.
 *
 * Para cada tema, cuatro piezas de consejo práctico:
 *  - enfoque: cómo reconocer la familia de problemas y por dónde empezar.
 *  - comunicacion: qué decir en voz alta, qué preguntar al entrevistador.
 *  - variantes: parientes del problema que te pueden poner ese día.
 *  - cambios: giros que te sueltan a mitad de la entrevista y que cambian
 *    la solución (n crece, sin memoria extra, streaming...).
 *
 * Todo va en segunda persona y con frases que se pueden decir tal cual:
 * es lo que un candidato debería soltar delante del entrevistador.
 * Se renderiza al final de cada capítulo (véase Chapter.tsx).
 */

export interface Entrevista {
  enfoque: string;
  comunicacion: string;
  variantes: string[];
  cambios: string[];
  /** Versión inglesa (traducción progresiva; si falta, se muestra la española). */
  en?: {
    enfoque: string;
    comunicacion: string;
    variantes: string[];
    cambios: string[];
  };
}

export const entrevistas: Record<string, Entrevista> = {
  "complexity": {
    "enfoque": "En entrevistas, la complejidad casi nunca va sola: o te enseñan una función y te piden su coste, o te fijan un límite (n hasta 10⁵ o 10⁶, un segundo de margen) y tienes que elegir el algoritmo que lo cumple. La técnica: en lugar de decir un Big-O a bote pronto, cuenta cuántas veces se ejecuta cada línea y cómo crece con n. Regla mental: los bucles anidados multiplican, los bloques consecutivos suman, y lo que domina la suma es el término más lento.",
    "comunicacion": "Pregunta el tamaño de la entrada ANTES de proponer nada: «¿n llega a miles o a millones?». Con el límite claro, verbaliza la regla que todo entrevistador espera: «10⁵ me apunta a O(n log n) o mejor; con O(n²) me iría a la escala de segundos». Cuando mejores, compara con la versión anterior: «bajo de O(n²) a O(n log n): para n = 10⁵ son unos 10¹⁰ pasos contra ~10⁶ — la diferencia entre minutos y milisegundos».",
    "variantes": [
      "Te muestran un bucle con un salto escondido (j *= 2 dentro del for) y piden el coste: son los log₂(n) pasos del capítulo 1.",
      "Elegir algoritmo por cotas: con n = 10⁵ y 1 segundo, O(n log n) cabe y O(n²) no.",
      "Caso peor vs amortizado: un append puede desencadenar una copia — piden el coste medio, no el máximo.",
      "Comparar dos soluciones: tiempo y memoria — O(n) tiempo y O(n) memoria contra O(n) tiempo y O(1).",
    ],
    "cambios": [
      "Vuelven a leer el bucle contigo y te piden recalcular cuando el paso interno pasa de línea fija a llamada.",
      "Preguntan por espacio en vez de tiempo: lo que guardas también cuenta.",
      "Prohíben la biblioteca (nada de len() ni sort()): tienes que estimar costes a mano.",
      "La entrada llega en streaming: cambia el coste en memoria y hay que reexpresar el algoritmo.",
    ],
    "en": {
    enfoque: "In interviews, complexity almost never comes alone: either they show you a function and ask for its cost, or they pin a limit (n up to 10⁵ or 10⁶, one second of budget) and you have to pick the algorithm that meets it. The technique: instead of shouting a Big-O off the top of your head, count how many times each line runs and how it grows with n. Mental rule: nested loops multiply, consecutive blocks add, and the slowest term dominates the sum.",
    comunicacion: "Ask for the input size BEFORE proposing anything: “does n reach thousands or millions?”. With the limit settled, say out loud the rule every interviewer expects: “10⁵ points me at O(n log n) or better; O(n²) would drift into seconds”. When you improve something, compare with the previous version: “I drop from O(n²) to O(n log n): for n = 10⁵ that is about 10¹⁰ steps against ~10⁶ — the difference between minutes and milliseconds”.",
    variantes: [
"They show you a loop with a hidden jump (j *= 2 inside the for) and ask for the cost: the log₂(n) steps of chapter 1.",
      "Picking an algorithm from bounds: with n = 10⁵ and 1 second, O(n log n) fits and O(n²) does not.",
      "Worst case vs amortized: one append can trigger a copy — they ask for the average cost, not the max.",
      "Comparing two solutions: time and memory — O(n) time with O(n) memory against O(n) time and O(1).",
    ],
    cambios: [
"They re-read the loop with you and ask you to recompute when the inner step goes from a fixed line to a call.",
      "They ask about space instead of time: what you keep around also counts.",
      "They ban the library (no len() or sort()): you have to estimate costs by hand.",
      "The input arrives as a stream: memory cost changes and the algorithm must be re-expressed.",
    ]
  },
  },
  "arrays": {
    "enfoque": "La mayoría de los problemas de arrays en livecoding cae en tres plantillas: dos punteros (array ordenado o extremos), ventana deslizante (sumas de intervalos, «el más largo sin repetir») y suma de prefijos (consultas de rango, equilibrio). Antes de escribir: pregunta si está ordenado (¿binaria o hash?) y si la memoria extra es permisiva (¿set o in-place?). Dibuja un array de cinco casillas y resuélvelo con el dedo antes de codificar: los bugs de arrays nacen de índices, no de ideas.",
    "comunicacion": "Arranca con la temperatura baja: «voy a pensar primero con un array pequeño y, si la idea encaja, lo generalizo». Mientras escribes, di el invariante: «el rango [i, j) son los elementos ya procesados; j avanza con el candidato nuevo y alguna condición decide si i retrocede». Si la ventana es compleja, dibújala: al entrevistador le tranquiliza oír «cierro la ventana cuando la condición se rompe, y muevo i».",
    "variantes": [
      "Rotación in-place sin espacio extra (la versión de tres inversiones del capítulo 2).",
      "Subarray máximo con producto — trampa de ceros y negativos que rompen el máximo acumulado.",
      "Media móvil O(1) de una ventana fija sobre un stream de datos.",
      "Eliminar un valor in-place y devolver la nueva longitud: los dos punteros que nunca se cruzan.",
      "Intersección de dos arrays ordenados sin set: dos punteros caminando a la par.",
    ],
    "cambios": [
      "«Sin memoria extra»: si usaste set, la solución in-place de dos punteros pasa a ser obligatoria.",
      "«Devuelve índices, no valores»: casi el mismo código, pero mapea cada valor a su posición.",
      "«El array es enorme y no cabe»: la ventana deslizante de memoria O(1) gana la ronda.",
      "«Ahora hay duplicados»: revisa si tu invariante sigue siendo cierto con claves repetidas.",
    ],
    "en": {
    enfoque: "Most livecoding array problems fall into three templates: two pointers (sorted array or ends), sliding window (range sums, “longest without repeating”) and prefix sums (range queries, balance). Before writing: ask whether it is sorted (binary search or hash?) and whether extra memory is allowed (set or in-place?). Draw a five-cell array and solve it with your finger before coding: array bugs are born of indexes, not ideas.",
    comunicacion: "Start at low temperature: “I will think first with a small array and, if the idea holds, generalize it”. While writing, state the invariant: “the range [i, j) holds the processed elements; j advances with the new candidate and some condition decides whether i retreats”. If the window is complex, sketch it: hearing “I close the window when the condition breaks, and I move i” calms the interviewer down.",
    variantes: [
"In-place rotation with no extra memory (the three-reversal trick of chapter 2).",
      "Maximum subarray with a product — zeros and negatives as the trap that breaks the running max.",
      "O(1) moving average of a fixed window over a data stream.",
      "Remove a value in-place and return the new length: the two pointers that never cross.",
      "Intersection of two sorted arrays without a set: two pointers walking side by side.",
    ],
    cambios: [
"“No extra memory”: if you used a set, the in-place two-pointer solution becomes mandatory.",
      "“Return indexes, not values”: nearly the same code, but map each value to its position.",
      "“The array is huge and doesn’t fit”: the O(1)-memory sliding window wins the round.",
      "“There are duplicates now”: re-check whether your invariant survives repeated keys.",
    ]
  },
  },
  "hash-tables": {
    "enfoque": "La señal del dict o el set en livecoding es una sola pregunta: «¿he visto este valor antes?» — frecuencia, duplicados, complemento (target − x). Detectar esa frase y elegir la estructura correcta es la mitad de la solución; la otra mitad es defender el coste: O(n) total porque cada consulta cuesta O(1) esperado. Si te piden implementar más que usarlo (un LRU, un hash set propio), declara primero la estrategia: «encadenamiento» o «sondeo lineal» y qué papel tiene la función de hash.",
    "comunicacion": "Sobre colisiones no deslices si no te lo preguntan, pero ten listo el mínimo: «el O(1) amortizado es la promesa normal; el peor caso degenera a O(n) si el hash se concentra, cosa rara en la práctica». Concreta el dominio: «¿las claves son strings cortos o enteros?» — cambia qué estructura pagarías. Y remata el patrón en voz alta: «esto es el two-sum de libro: dict de complemento visto» — la ronda avanza.",
    "variantes": [
      "LRU cache (dict + lista doblemente enlazada: el design clásico y favorito).",
      "Encontrar el valor repetido sin ordenar, en una sola pasada con un set.",
      "Diseñar un hash set propio sin librería: lista de buckets y módulo.",
      "El subarray binario más largo con igual número de 0s y 1s: dict de prefix sums.",
      "Agrupar palabras por firma canónica (los anagramas del capítulo 3).",
    ],
    "cambios": [
      "«Implementa el hash map desde cero»: te toca el encadenamiento y el rehashing en vivo.",
      "«Las claves son listas» (no hashables): conviértelas en tuples o en una firma canónica.",
      "«Memoiza esta recursión»: añade la caché y salta de exponencial a polinómico delante de ellos.",
      "«El dict no cabe en memoria»: describe un particionado o un bloom filter — ahí mandan las ideas, no el código.",
    ],
    "en": {
    enfoque: "The dict-or-set signal in livecoding is one question: “have I seen this value before?” — frequency, duplicates, complement (target − x). Spotting that phrase and picking the right structure is half the solution; the other half is defending the cost: O(n) total because each lookup costs O(1) expected. If they ask you to implement rather than use (an LRU, your own hash set), declare the strategy first: “chaining” or “linear probing” and what role the hash function plays.",
    comunicacion: "On collisions, don’t volunteer if they don’t ask, but keep the minimum ready: “the amortized O(1) is the normal promise; the worst case degenerates to O(n) if the hash concentrates, which is rare in practice”. Pin the domain: “are the keys short strings or integers?” — it changes which structure you would pay for. And close the pattern out loud: “this is textbook two-sum: a dict of seen complements” — the round moves forward.",
    variantes: [
"LRU cache (dict + doubly linked list: the classic design favorite).",
      "Find the repeated value without sorting, in a single pass with a set.",
      "Design your own hash set without a library: bucket list and modulo.",
      "The longest binary subarray with equal 0s and 1s: a dict of prefix sums.",
      "Group words by canonical signature (the anagrams of chapter 3).",
    ],
    cambios: [
"“Implement the hash map from scratch”: chaining and rehashing land on you, live.",
      "“The keys are lists” (unhashable): turn them into tuples or a canonical signature.",
      "“Memoize this recursion”: add the cache and jump from exponential to polynomial in front of them.",
      "“The dict doesn’t fit in memory”: describe sharding or a bloom filter — ideas rule here, not code.",
    ]
  },
  },
  "search": {
    "enfoque": "La búsqueda binaria es más estructura que algoritmo: si la condición es monótona (el primer «sí», el menor cuadrado ≤ x, el mínimo tamaño que funciona), la respuesta vive en [lo, hi] y se parte a la mitad. Frase de reconocimiento: «puedo llevarlo a O(log n) si hay un umbral en alguna parte». Practica los límites en voz alta — fronteras inclusivas, mid ± 1, condición de salida — porque es ahí donde mueren el 80 % de las binarias en directo.",
    "comunicacion": "Verbaliza el invariante ANTES de escribir: «yo mantengo que la respuesta está en [lo, hi]; en cada paso decido qué mitad descarto». Cada comparación se razona: «nums[mid] < target significa que la respuesta está a la derecha, lo = mid + 1». Y los bordes se dicen, no se piensan: «array vacío → -1; un elemento → comparación directa; target fuera de rango → respuesta en uno de los extremos».",
    "variantes": [
      "Búsqueda en array ordenado rotado: deducir qué mitad está ordenada en cada paso.",
      "Posición de inserción / lower bound con duplicados (bisect_left contra bisect_right).",
      "Encontrar un pico (peak element): la forma «sube y luego baja» define la binaria.",
      "Mediana de dos arrays ordenados — O(log min(m, n)), la reina del tema.",
      "First bad version simulado: una API isBad(i) que solo una binaria caza en O(log n).",
    ],
    "cambios": [
      "«Ahora hay duplicados»: la binaria pura degenera a O(n) en el peor caso — hay que razonar cuándo recortar un solo lado.",
      "«El tamaño es desconocido» (length() prohibida): expandir exponencial 1, 2, 4, 8… y luego binaria.",
      "«Muchas consultas sobre el mismo array»: preprocesar una vez y no rebuscar cada vez.",
      "«¿Puedes hacerlo mejor que O(n)?» cuando planteaste lineal: busca la monotonía que no pediste.",
      "«El array está en otra máquina y solo accedes con get(i)»: la binaria sigue viva, el coste se mide en llamadas.",
    ],
    "en": {
    enfoque: "Binary search is more structure than algorithm: if the condition is monotone (the first “yes”, the smallest square ≤ x, the minimum size that works), the answer lives in [lo, hi] and you split it in half. Recognition phrase: “I can take this to O(log n) if there is a threshold somewhere”. Practice the limits out loud — inclusive borders, mid ± 1, exit condition — because that is where 80% of live binary searches die.",
    comunicacion: "Say the invariant BEFORE writing: “I maintain that the answer is in [lo, hi]; each step decides which half I discard”. Reason through each comparison: “nums[mid] < target means the answer is on the right, lo = mid + 1”. And speak the edges rather than think them: “empty array → -1; one element → direct comparison; target outside the range → the answer sits at one of the ends”.",
    variantes: [
"Search in a rotated sorted array: deduce which half is ordered at each step.",
      "Insertion position / lower bound with duplicates (bisect_left vs bisect_right).",
      "Find a peak (peak element): the “rises then falls” shape defines the binary search.",
      "Median of two sorted arrays — O(log min(m, n)), the queen of the topic.",
      "Simulated first bad version: an isBad(i) API only a binary search catches in O(log n).",
    ],
    cambios: [
"“There are duplicates now”: pure binary search degenerates to O(n) in the worst case — you must reason about trimming only one side.",
      "“The size is unknown” (length() banned): expand exponentially 1, 2, 4, 8… then binary search.",
      "“Many queries over the same array”: preprocess once instead of searching each time.",
      "“Can you do better than O(n)?” when you proposed linear: look for the monotonicity you didn’t ask about.",
      "“The array lives on another machine and you only have get(i)”: the binary search survives; cost is measured in calls.",
    ]
  },
  },
  "sorting": {
    "enfoque": "Cuando el orden importa en el problema, la pregunta de fondo es ¿qué sort y con qué comparación? A nivel básico: `sorted()` está permitido pero te preguntarán «¿cuál usas por debajo y su coste?» — recuerda que Python usa Timsort (O(n log n) peor, y casi O(n) si ya está casi ordenado). En modo fuerte te piden escribir el sort: insertion para listas cortas, mergesort si hay que garantizar estabilidad, quicksort si exigen memoria O(1) en promedio. Y no olvides que a veces el problema «de sort» se arma con un comparador: «ordena por longitud y, a igual longitud, alfabético».",
    "comunicacion": "Di primero la elección y la razón: «uso mergesort porque es estable y garantiza O(n log n); con quicksort sería in-place más rápido en la práctica pero el peor caso es O(n²)». Si el sort es propio, narra el invariante por pasada: «después de la pasada k, los últimos k elementos ya están en su sitio». Y si usas sort() con clave, di la regla del desempate — si el comparador no es total, el orden queda indefinido y eso cuesta puntos en la entrevista.",
    "variantes": [
      "Ordenar colores con tres zonas (bandera holandesa): partición de un solo recorrido sin sort().",
      "Los k mayores con orden parcial: top-k con heap del capítulo 14 o con corte de quickselect.",
      "Ordenar con clave compuesta: edad y luego nombre; la regla del desempate marca el diseño.",
      "Intervals solapados: ordenar por inicio y fusionar en una pasada.",
      "Ordenar un millón de números entre 0 y 99: counting sort: cuenta apariciones y relee los contadores, sin una sola comparación.",
    ],
    "cambios": [
      "«Hazlo estable»: quicksort genérico no vale — mergesort o pares (índice, valor) ordenados lexicográficamente.",
      "«Memoria O(1)»: heapsort o insertion in-place; se acabó el slice().",
      "«Nada de sort()»: tienes que escribir el algoritmo completo delante de ellos.",
      "«Los datos llegan casi ordenados»: casi no cuesta — di Timsort y por qué.",
      "«El comparador es carísimo»: precalcular la clave una vez por elemento y comparar las claves cacheadas.",
    ],
    "en": {
    enfoque: "When order matters in the problem, the underlying question is which sort, and with which comparison? At the basic level: sorted() is allowed, but they will ask “which one runs underneath, and what does it cost?” — Python uses Timsort (O(n log n) worst, and almost O(n) when the input is nearly sorted). In strong mode they make you write the sort: insertion for short lists, mergesort when stability must be guaranteed, quicksort when they demand O(1) average memory. And sometimes the “sorting” problem isn’t about sorting: it is built with a comparator — “sort by length, ties broken alphabetically”.",
    comunicacion: "Say the choice and the reason first: “I use mergesort because it is stable and guarantees O(n log n); quicksort would be faster in practice and in-place, but its worst case is O(n²)”. If the sort is your own, narrate the invariant per pass: “after pass k, the last k elements are already in place”. And if you use sort() with a key, state the tie rule — if the comparator is not total, the order is undefined and that costs points.",
    variantes: [
"Sort colors with three zones (Dutch flag): single-sweep partitioning without sort().",
      "The k largest with partial order: top-k with the heap of chapter 14 or a quickselect cutoff.",
      "Sorting with a composite key: age then name; the tie-break rule marks the design.",
      "Overlapping intervals: sort by start and merge in one pass.",
      "Sort a million numbers between 0 and 99: counting sort — tally and re-read the counters, not a single comparison.",
    ],
    cambios: [
"“Make it stable”: a generic quicksort is out — mergesort or (index, value) pairs sorted lexicographically.",
      "“O(1) memory”: heapsort or in-place insertion; the slice() days are over.",
      "“No sort()”: you have to write the whole algorithm in front of them.",
      "“The data arrives almost sorted”: it almost costs nothing — say Timsort and why.",
      "“The comparator is expensive”: precompute the key once per element and compare cached keys.",
    ]
  },
  },
  "strings": {
    "enfoque": "La primera acción con strings en livecoding es normalizar y confirmar: mayúsculas/minúsculas, espacios, acentos, si la cadena vacía cuenta. La segunda es recordar el precio: los strings de Python son inmutables, ahí concatenar en bucle es costoso, y la respuesta es ''.join(parts). El kit de resolución son dos punteros (palíndromos, reversión), ventana (el substring más largo) y dict de conteo (anagramas, frecuencia).",
    "comunicacion": "Pregunta antes de codificar: «¿cuenta un acento como su versión sin acento?», «¿la cadena vacía es válida?», y y di el motivo: «si no normalizo, «ana» y «Ana» me rompían el caso». Avisa cuando el coste sube: «concateno con lista y join porque un += en bucle sería O(n²)». Si cambias de plan, dilo sin drama: «esta ruta se va a complicar, la cierro y me paso a la ventana con dict».",
    "variantes": [
      "Conversión string → int (atoi): espacios, signo, saturación — un arsenal de casos esquina.",
      "El substring más largo sin repetir caracteres: ventana deslizante con dict de últimos vistos.",
      "Anagramas: solo contar caracteres con un dict por palabra.",
      "Palíndromo tras saltar lo no alfanumérico: dos punteros que se acercan.",
      "Agrupar anagramas (capítulo 3) o sustituir palabras por raíz (trie, capítulo 16) según la ronda.",
    ],
    "cambios": [
      "«La entrada llega con acentos o Unicode»: normaliza a la forma canónica (NFC, tildes fuera) antes de nada.",
      "«La cadena es gigantesca y no cabe»: ventana fija con dos índices y memoria constante.",
      "«Responde en streaming»: el dict de últimos vistos se actualiza por carácter, sin relanzar todo.",
      "«Ahora el conteo debe mantenerse con repeticiones»: tu dict de ventana ya lo hace; actualiza al entrar y al salir.",
      "«Devolución mínima de cambios»: cuando el tema se complica, declara distancia de edición (DP, capítulo 12).",
    ],
    "en": {
    enfoque: "The first move with strings in livecoding is normalize and confirm: case, spaces, accents, whether the empty string counts. The second is remembering the price: Python strings are immutable, so accumulating in a loop is costly, and the answer is ''.join(parts). The solving kit is two pointers (palindromes, reversal), window (the longest substring) and a counting dict (anagrams, frequency).",
    comunicacion: "Ask before coding: “does an accent count as its plain version?”, “is the empty string valid?” — and say why: “if I don’t normalize, “ana” and “Ana” would break the case”. Warn when the cost climbs: “I join a list because a += in a loop would be O(n²)”. If you change plans, say it without drama: “this path is getting complicated, dropping it for the window with a dict”.",
    variantes: [
"string → int conversion (atoi): spaces, sign, saturation — an arsenal of corner cases.",
      "The longest substring without repeated characters: sliding window with a dict of last seen.",
      "Anagrams: just count characters with one dict per word.",
      "Palindrome after skipping non-alphanumeric: two pointers closing in.",
      "Group anagrams (chapter 3) or replace words by root (trie, chapter 16) depending on the round.",
    ],
    cambios: [
"“The input arrives with accents or Unicode”: normalize to the canonical form (NFC, tildes out) before anything else.",
      "“The string is gigantic and doesn’t fit”: fixed window with two indexes and constant memory.",
      "“Answer while streaming”: the last-seen dict updates per character, no restarting.",
      "“Now the count must survive repeats”: your window dict already does; update on enter and on exit.",
      "“Minimum edits to fix”: when the topic deepens, declare edit distance (DP, chapter 12).",
    ]
  },
  },
  "matrices": {
    "enfoque": "Las matrices en livecoding viven de sus límites: el trazado de la espiral, la rotación y el barrido diagonal mueren en los bordes. Tu rutina: elige convención (¿fila y columna inclusive? ¿filas primero?), dibuja la matriz 3×3 con índices y recorre una vuelta completa con el dedo antes de escribir código. Y pregunta si es cuadrada: rotar y espiral hablan otra cosa si es rectangular.",
    "comunicacion": "Pregunta siempre dos cosas: «¿cuadrada o rectangular?» y «¿puedo mutar la matriz?» — son las dos que te salvan. Declara los límites con nombres (filaTop, filaBottom, colIzq, colDer) y dilo con palabras: «avanzo el límite después de pintar cada lado, para no repetir celdas». Si mutas la matriz, avisa: «voy a marcar en la propia matriz las celdas visitadas; si esto no vale, me pides otro sistema».",
    "variantes": [
      "Recorrer en espiral: los cuatro límites y avanzar cada lado hasta tocarse.",
      "Rotar 90° in-place: transponer y luego invertir cada fila — sin matriz auxiliar.",
      "Buscar en una matriz que sube por filas y por columnas: empieza por la esquina inferior izquierda.",
      "Imprimir diagonales o zig-zag: el cálculo de índices con la suma i + j.",
      "Juego de la vida in-place: codificar el nuevo estado en bits no usados de cada celda.",
    ],
    "cambios": [
      "«Matriz gigante, no cabe en memoria»: procesarla fila a fila en streaming.",
      "«Ahora se muta en vivo» (se agregan o quitan filas): tu doble bucle rígido tiene que sostener inserciones o borrados.",
      "«Devuélvelo como generator, no como lista»: cede fila a fila con yield.",
      "«Sin memoria extra para la copia»: codificar estados en la propia matriz o pedir una copia.",
      "«El acceso ahora es remoto get(i, j)»: cambia el orden del recorrido para minimizar llamadas a la red.",
    ],
    "en": {
    enfoque: "Matrices in livecoding live and die by their borders: the spiral, the rotation and the diagonal sweep all break at the edges. Your routine: pick a convention (row and column inclusive? rows first?), draw the 3×3 matrix with indexes, and walk one full turn with your finger before writing code. And ask whether it is square: rotation and spiral mean different things if it is rectangular.",
    comunicacion: "Ask two things always: “square or rectangular?” and “may I mutate the matrix?” — they are the ones that save you. Declare the borders with names (rowTop, rowBottom, colLeft, colRight) and say it in words: “I advance each border after painting its side, so no cell repeats”. If you mutate, warn: “I will mark visited cells inside the matrix itself; if that’s not allowed, ask me for a different scheme”.",
    variantes: [
"Spiral traversal: the four borders, each side advancing until they touch.",
      "Rotate 90° in-place: transpose and then reverse each row — no auxiliary matrix.",
      "Search a matrix sorted row-wise and column-wise: start at the bottom-left corner.",
      "Print diagonals or zig-zag: index arithmetic with the sum i + j.",
      "Game of life in-place: encode the new state in unused bits of each cell.",
    ],
    cambios: [
"“Huge matrix, it doesn’t fit in memory”: process it row by row as a stream.",
      "“It mutates live now” (rows added or removed): your rigid double loop must survive inserts or deletes.",
      "“Return it as a generator, not a list”: yield row by row.",
      "“No extra memory for the copy”: encode states inside the matrix itself or ask for a copy.",
      "“Access is now remote get(i, j)”: reorder the traversal to minimize network calls.",
    ]
  },
  },
  "linked-lists": {
    "enfoque": "Con listas enlazadas, dibuja la cadena de nodos y flechas ANTES de codificar; el bug eterno es perder la referencia al resto de la lista. El truco salvador es el nodo dummy: un nodo fantasma antes de la cabeza limpia los casos de «insertar/borrar la primera posición». Y slow/fast resuelve a la vez el punto medio, los ciclos y el n-ésimo desde el final — sin conocer el tamaño.",
    "comunicacion": "Pregunta la forma: «¿sencilla o doble?» y «¿puedo modificar el campo next?» — las hay de ambas en livecoding. Narra mientras escribes: «guardo next en una temporal ANTES de sobrescribir curr.next, si no pierdo el resto de la lista». Y para el fast/slow: «avanzo fast dos pasos y slow uno; si se cruzan hay ciclo, y para la mitad freno fast al final».",
    "variantes": [
      "Invertir en grupos de k nodos: la clásica que combina reversión y reenganche.",
      "Eliminar el n-ésimo desde el final: dos punteros con separación de n y dummy.",
      "Sumar dos números almacenados en listas (dígito por dígito, con acarreo).",
      "Fusionar k listas ordenadas: heap de cabeceras (capítulo 14) o fusionar de dos en dos.",
      "Copiar una lista con puntero aleatorio: map de nodo original a copia, dos pasadas.",
    ],
    "cambios": [
      "«Sin memoria extra» cuando usaste una lista auxiliar: reengancha los punteros en su sitio, iterativo.",
      "«Ahora es circular»: los bucles con do-while y el criterio de parada cambian — recalcula.",
      "«Inserta o borra la cabeza sin if especiales»: el dummy y las temporales lo resuelven.",
      "«La lista es un stream, solo puedes ir hacia adelante»: una sola pasada obligatoria.",
      "«Devuelve también dónde empieza el ciclo»: al cruzarse reinicia un puntero al inicio; se vuelven a encontrar en la entrada del ciclo.",
    ],
    "en": {
    enfoque: "With linked lists, draw the chain of nodes and arrows BEFORE coding; the eternal bug is losing the reference to the rest of the list. The savior trick is the dummy node: a ghost node before the head clears the “insert/delete at the first position” cases. And slow/fast solves the midpoint, cycles and the n-th from the end at once — without knowing the size.",
    comunicacion: "Ask the shape: “singly or doubly linked?” and “may I modify the next field?” — both appear in livecoding. Narrate while writing: “I save next into a temporary BEFORE overwriting curr.next; otherwise I lose the rest of the list”. And for fast/slow: “I advance fast two steps and slow one; if they cross there is a cycle, and for the midpoint I stop fast at the end”.",
    variantes: [
"Reverse in groups of k nodes: the classic that combines reversal and re-attachment.",
      "Delete the n-th node from the end: two pointers n apart, with a dummy.",
      "Add two numbers stored as lists (digit by digit, with carry).",
      "Merge k sorted lists: a heap of heads (chapter 14) or merging two at a time.",
      "Copy a list with a random pointer: a map from original to copy, two passes.",
    ],
    cambios: [
"“No extra memory” when you used an auxiliary list: re-wire the pointers in place, iteratively.",
      "“Now it is circular”: loops change to do-while and the stopping criterion changes — recompute.",
      "“Insert or delete the head without special ifs”: the dummy and the temporaries solve it.",
      "“The list is a stream, you can only go forward”: one pass, mandatory.",
      "“Also return where the cycle starts”: on crossing, restart one pointer at the head; they meet again at the cycle’s entrance.",
    ]
  },
  },
  "stacks": {
    "enfoque": "La pila en livecoding aparece con dos caras: emparejar (paréntesis, deshacer) y monotónica (el próximo mayor/menor). La señal: cuando el problema expulsa al elemento que llegó antes en cuanto llega uno nuevo válido, es pila. La variante monotónica — «mientras la cima sea menor que el actual, la expulso» — es la que más cuesta ver: practica next-greater hasta que la narración salga sola.",
    "comunicacion": "Di el invariante en voz alta antes de escribir: «mi pila queda ordenada de menor a mayor; cada elemento se empuja y se expulsa una sola vez, así que el coste es O(n)». Si es matching, narra el error de libro: «si llega cierre y no hay apertura o no coincide el tipo, devuelvo False». Pregunta lo que cambia el diseño: «¿los brackets van solo (), [] o {} también?», «¿puede llegar una cadena vacía?».",
    "variantes": [
      "Min-stack: pila con mínimo en O(1) guardando pares o una pila secundaria.",
      "Asteroid collision: sobrevivientes de choques — un emparejamiento con direcciones.",
      "El rectángulo máximo de un histograma (la cima de la dificultad del tema).",
      "Deducir reverso polaco (postfix) con una pila de operandos.",
      "Car fleet: ordenar por posición y apilar tiempos de llegada.",
    ],
    "cambios": [
      "«Ahora con precedencia de operadores»: de postfix pasas a infix con dos pilas (shunting-yard).",
      "«Devuelve también los índices de lo que sobrevive»: la pila guarda pares (valor, índice).",
      "«Memoria O(1) encima»: usa la propia entrada como pila con dos punteros.",
      "«Sin recursión»: convierte tu solución recursiva en pila explícita delante de ellos.",
      "«La lista es enorme y llegó en stream»: tu pila monotónica en streaming —ella misma recuerda, nada vuelve atrás.",
    ],
    "en": {
    enfoque: "In livecoding the stack shows two faces: matching (parentheses, undo) and monotonic (next greater/smaller). The signal: when the problem expels an earlier element the moment a valid newcomer arrives, it is a stack. The monotonic variant — “while the top is smaller than the current one, I pop it” — is the hardest to see: practice next-greater until the narration comes out on its own.",
    comunicacion: "Say the invariant out loud before writing: “my stack stays ordered from small to big; each element is pushed and popped at most once, so the cost is O(n)”. If it is matching, narrate the textbook error: “if a closer arrives and there is no opener, or the type mismatches, I return False”. Ask what actually changes the design: “can brackets be (), [] and {}?”, “can an empty string arrive?”.",
    variantes: [
"Min-stack: a stack with an O(1) minimum, storing pairs or a secondary stack.",
      "Asteroid collision: collision survivors — a matching game with directions.",
      "The largest rectangle in a histogram (the difficulty ceiling of the topic).",
      "Evaluate reverse polish (postfix) with a stack of operands.",
      "Car fleet: sort by position and stack arrival times.",
    ],
    cambios: [
"“Now with operator precedence”: from postfix you move to infix with two stacks (shunting-yard).",
      "“Also return the indexes of the survivors”: the stack stores (value, index) pairs.",
      "“O(1) memory on top”: use the input itself as the stack with two pointers.",
      "“No recursion”: convert your recursive solution into an explicit stack in front of them.",
      "“The list is enormous and arrived as a stream”: your monotonic stack in streaming — it remembers by itself, nothing rewinds.",
    ]
  },
  },
  "queues": {
    "enfoque": "La cola en livecoding es sobre todo lo que hace BFS: niveles, distancias, expansión por capas. La segunda cara es el deque monotónico para ventanas deslizantes. La tercera: distinguir orden literal frente a prioridad: «¿el orden importa literalmente o es por prioridad?» — si es prioridad, la cosa pasa a heap y explícalo.",
    "comunicacion": "Si es BFS: «uso una cola porque BFS procesa por niveles; meto el nodo y marco VISITADO en el momento de encolar — así nadie se encola dos veces». Para el deque: «la cola queda decreciente: cuando entra uno mayor, saco por el final hasta que vuelve a decrecer». Pregunta límites: «¿puede el buffer empezar vacío?», «¿qué quiero hacer si la cola está llena?».",
    "variantes": [
      "Implementar una pila con dos colas (y viceversa): el baile de costes amortizados.",
      "El máximo de una ventana deslizante con deque monotónica.",
      "Task scheduler con cooldown: cola + contador de frecuencias.",
      "Recent calls en O(1): cola de timestamps que recorta por el frente.",
      "Rotting oranges: multi-source BFS en la matriz — varios inicios en la cola inicial.",
    ],
    "cambios": [
      "«Ahora hay prioridades»: la cola FIFO pasa a heap — explica qué orden cambia.",
      "«El buffer tiene límite y se llena»: di qué haces al llenar (bloquear, descartar, sobreescribir) y su coste.",
      "«Muchos productores a la vez»: sincronización — se razona el bloqueo con palabras, no con código.",
      "«Los pasos ahora cuestan distinto»: el BFS deja de ser por capas y la cola pasa a prioridad — Dijkstra (capítulo 18).",
      "«Devuelve los índices de los expulsados»: el deque guarda pares (valor, índice), no valores.",
    ],
    "en": {
    enfoque: "In livecoding the queue is mostly what BFS does: levels, distances, layer-by-layer expansion. The second face is the monotonic deque for sliding windows. The third: telling literal order from priority — “does the order literally matter or is it by priority?” — and if it is priority, the game becomes a heap, and you say so.",
    comunicacion: "If it is BFS: “I use a queue because BFS processes by levels; I enqueue the node and mark it VISITED at enqueue time — so nobody gets enqueued twice”. For the deque: “the queue stays decreasing: when a bigger one enters, I pop from the tail until it decreases again”. Ask about limits: “can the buffer start empty?”, “what should I do when the queue is full?”.",
    variantes: [
"Implement a stack with two queues (and the reverse): the amortized-cost dance.",
      "The max of a sliding window with a monotonic deque.",
      "Task scheduler with cooldown: queue + frequency counter.",
      "Recent calls in O(1): a queue of timestamps trimmed from the front.",
      "Rotting oranges: multi-source BFS over the grid — several starts in the initial queue.",
    ],
    cambios: [
"“There are priorities now”: the FIFO queue becomes a heap — explain which order changes.",
      "“The buffer has a limit and fills up”: say what you do when full (block, drop, overwrite) and its cost.",
      "“Many producers at once”: synchronization — reason about blocking in words, not code.",
      "“Steps now cost differently”: BFS stops being layered and the queue becomes priority — Dijkstra (chapter 18).",
      "“Return the indexes of the evicted”: the deque stores (value, index) pairs, not values.",
    ]
  },
  },
  "recursion": {
    "enfoque": "Un problema recursivo en livecoding se cierra con las dos preguntas de siempre: ¿cuál es el caso base? y ¿cómo se reduce el problema a uno más pequeño? Escribe el caso base primero (vacío, un elemento, el borde) y la recursión en una sola línea. Con n = 3, dibuja el árbol de llamadas a mano y cuenta las hojas: así estimas el coste delante del entrevistador.",
    "comunicacion": "Di la recurrencia antes del código: «llamo a f(n-1) y lo que resta es sumar n». Y señala los solapes: «veo que el árbol repite estados; si te parece, memoizo» — esa frase vale puntos. Pregunta límites: «¿hasta qué tamaño de n? ¿límite de profundidad de la pila?» — no introduces la exponencial ingenua sin avisar.",
    "variantes": [
      "Generar paréntesis válidas: árbol de decisiones con dos ramas y poda.",
      "Todas las subsets: incluir o excluir cada elemento (orden include-primero).",
      "Potencia por cuadrados: de O(n) en llamadas a O(log n) bajando a la mitad.",
      "Torres de Hanoi: la recursión de manual — mueve n-1 al auxiliar, el disco grande, y vuelve a juntar.",
      "Memoizar el fibonacci ingenuo: dibuja el árbol, marca los solapes y enseña qué ahorra la caché.",
    ],
    "cambios": [
      "«n crece»: la versión naiva muere — memoiza o pasa a iterativo con bucle bottom-up.",
      "«Límite de profundidad de la pila»: desdibuja a iterativo con pila explícita.",
      "«Devuelve todas las soluciones, no una»: cambia el retorno unitario a lista de soluciones.",
      "«Añade una restricción»: poda — corta la rama en cuanto el árbol genera un inválido.",
      "«¿Qué imprime al ejecutar?» con llamadas entrelazadas: simula el orden de impresión a mano.",
    ],
    "en": {
    enfoque: "A recursion problem in livecoding closes with the two usual questions: what is the base case? and how does the problem shrink? Write the base case first (empty, one element, the border) and the recursion in a single line. With n = 3, draw the call tree by hand and count the leaves: that is how you estimate the cost in front of the interviewer.",
    comunicacion: "State the recurrence before the code: “I call f(n-1) and what remains is adding n”. And flag the overlaps: “I see the tree repeating states; if you agree, I memoize” — that sentence earns points. Ask about limits: “up to which n? stack depth limit?” — never introduce the naive exponential without warning.",
    variantes: [
"Generate valid parentheses: a decision tree with two branches and pruning.",
      "All subsets: include or exclude each element (include-first order).",
      "Exponentiation by squaring: from O(n) calls to O(log n) by halving.",
      "Towers of Hanoi: textbook recursion — move n-1 to the auxiliary, the big disk, and reassemble.",
      "Memoize naive fibonacci: draw the tree, mark the overlaps and show what the cache saves.",
    ],
    cambios: [
"“n grows”: the naive version dies — memoize or go iterative with a bottom-up loop.",
      "“Stack depth limit”: fade into iterative with an explicit stack.",
      "“Return all solutions, not one”: change the single return into a list of solutions.",
      "“Now add a constraint”: pruning — cut the branch the moment the tree generates an invalid state.",
      "“What does it print?” with interleaved calls: simulate the print order by hand.",
    ]
  },
  },
  "dynamic-programming": {
    "enfoque": "DP en livecoding es un método de cuatro pasos: definir el estado, la transición, la base y el orden de llenado. Estado: qué significa dp[i] o dp[i][j] con una frase — «dp[i] es la mejor suma que termina en i». Transición: cómo sale dp[i] de estados anteriores. Y de ahí el orden: si solo mira hacia atrás, un bucle basta; si mira hacia delante, dibuja la matriz. Si el greedy falla, el problema suele ser DP — pero demuéstralo con un contraejemplo, no con miedo.",
    "comunicacion": "Escribe la recurrencia ANTES del código y confirma: «¿te cuadra el estado así?». Pregunta límites: ¿puede haber negativos?, ¿valores enormes, overflow? Y cifra el coste delante: «O(n²) estados a O(1) cada uno — lo aceptan sin pestañear».",
    "variantes": [
      "Longest increasing subsequence: la dp[i] clásica y, si apuntan más arriba, la O(n log n) con búsqueda binaria.",
      "Knapsack 0/1: incluir o no incluir, tabla 2D o vector comprimido.",
      "Edit distance: la matriz 2D con los tres costes (insertar, borrar, sustituir).",
      "Word break: dp + set de palabras — y si piden todos los caminos, vuelve al backtracking.",
      "Robber house (capítulo 12): la más suave para arrancar el tema.",
    ],
    "cambios": [
      "«Memoria mínima»: de tabla completa a dos filas o una ventana rodante.",
      "«Recuperar una solución concreta, no solo el valor»: guarda la decisión en otra tabla y retrace.",
      "«La entrada empieza en stream»: ¿puedes computar dp al vuelo solo con un pequeño buffer que deslice?",
      "«Valores enormes con módulo»: aritmética con módulo en cada paso — di dónde está el overflow.",
      "«Tu solución era greedy y choca»: demuéstralo con contraejemplo y luego diga DP.",
    ],
    "en": {
    enfoque: "DP in livecoding is a four-step method: define the state, the transition, the base and the fill order. State: what dp[i] or dp[i][j] means in one phrase — “dp[i] is the best sum ending at i”. Transition: how dp[i] derives from earlier states. Then the order: if it only looks backward, one loop is enough; if it looks forward, draw the matrix. If greedy fails, the problem is usually DP — but prove it with a counterexample, not fear.",
    comunicacion: "Write the recurrence BEFORE the code and confirm: “does this state look right to you?”. Ask about limits: can there be negatives? huge values, overflow? And price the cost out loud: “O(n²) states at O(1) each — they accept it without blinking”.",
    variantes: [
"Longest increasing subsequence: the classic dp[i] and, if they push further, the O(n log n) with binary search.",
      "Knapsack 0/1: include or not, a 2D table or a compressed vector.",
      "Edit distance: the 2D matrix with the three costs (insert, delete, replace).",
      "Word break: dp + a set of words — and if they want all the paths, it is backtracking again.",
      "House robber (chapter 12): the gentlest opener for the topic.",
    ],
    cambios: [
"“Minimum memory”: from the full table to two rows or a rolling window.",
      "“Recover an actual solution, not just the value”: store the decision in a second table and retrace.",
      "“The input starts streaming”: can you compute dp on the fly with just a small sliding buffer?",
      "“Huge values with a modulus”: modular arithmetic at every step — say where the overflow would live.",
      "“Your solution was greedy and it clashes”: prove it with a counterexample, then say DP.",
    ]
  },
  },
  "trees": {
    "enfoque": "En árboles, el 90 % de los livecodings es «haz un recorrido y acumula algo»: preorder para construcciones y caminos, inorder para BST y orden creciente, postorder para respuestas que dependen de los hijos. El punto de decisión es único: ¿resuelves desde arriba (recibes datos de tu padre y avisas a los hijos) o desde abajo (los hijos devuelven y el nodo combina)? Los árboles se aclaran a base de dibujo: dibuja un árbol de 5 nodos y escribe el recorrido esperado antes de codificar.",
    "comunicacion": "Comprométete a decir el recorrido en palabras antes del código: «voy a hacer postorder: resuelvo primero los hijos y el nodo combina lo suyo». Pregunta las propiedades: «¿está balanceado? ¿puedo asumir que los valores son únicos?», porque cambian el diseño. Para el BFS por niveles di el porqué: «necesito ver por capas (right side view, distancias) — me conviene una cola con marca de nivel».",
    "variantes": [
      "Lowest common ancestor: la clásica de postorder entre dos objetivos.",
      "Serializar y deserializar un árbol: preorder con marcas de nulo, siempre.",
      "El diámetro: postorder que devuelve altura y acumula el máximo.",
      "Right side view: BFS por niveles tomando el último de cada nivel.",
      "Symmetric tree: comparación de dos ramas espejadas (recursiva o con cola).",
    ],
    "cambios": [
      "«Árbol muy profundo, sin recursión»: iterativo con pila explícita — la misma plantilla desmontada.",
      "«Ahora es n-ario»: el bucle de hijos sustituye las dos llamadas left/right.",
      "«Te dan dos recorridos (preorder + inorder) y piden construir»: recursión con cortes en la lista.",
      "«Devuelve solo la cuenta»: el mismo recorrido con un acumulador entero.",
      "«No cabe en memoria»: la solución iterativa, o recorrer por niveles al vuelo.",
    ],
    "en": {
    enfoque: "For trees, 90% of livecodings is “do a traversal and accumulate something”: preorder for constructions and paths, inorder for BSTs and increasing order, postorder for answers that depend on the children. There is exactly one decision point: do you solve top-down (you receive data from your parent and notify your children) or bottom-up (the children return and the node combines)? Trees become clear through drawing: sketch a 5-node tree and write the expected traversal before coding.",
    comunicacion: "Commit to saying the traversal in words first: “I will do postorder: solve the children first and then the node combines its own work”. Ask about properties: “is it balanced? may I assume unique values?” — they change the design. For level-order BFS give the reason: “I need to see by layers (right side view, distances) — a queue with a level marker suits me”.",
    variantes: [
"Lowest common ancestor: the classic postorder between two targets.",
      "Serialize and deserialize a tree: preorder with null marks, always.",
      "The diameter: a postorder that returns height and accumulates the max.",
      "Right side view: level-order BFS taking the last node of each level.",
      "Symmetric tree: comparing two mirrored branches (recursive or with a queue).",
    ],
    cambios: [
"“A very deep tree, without recursion”: iterative with an explicit stack — the same template disassembled.",
      "“Now it is n-ary”: the children loop replaces the two left/right calls.",
      "“They give you two traversals (preorder + inorder) and ask to build”: recursion with cuts in the list.",
      "“Return just the count”: the same traversal with an integer accumulator.",
      "“No memory to hold it”: the iterative solution, or traverse by levels on the fly.",
    ]
  },
  },
  "heaps": {
    "enfoque": "El heap en entrevistas es la estructura del top-k y la mediana que corre. Elegir min o max: «¿qué cima necesito?»; si piden los k mayores de una lista grande, usa un min-heap limitado a k: al final quedan dentro los k verdaderos. Recuerda el presupuesto: mantener un heap de k cuesta O(n log k), no O(n log n). Y en Python heapq es min-heap: para max guarda negativos o el par invertido.",
    "comunicacion": "Justifica el heap a priori: «con k pequeño y n de millones, mantengo un min-heap del tamaño k: O(n log k) y O(k) de memoria». Pregunta los detalles que cambian datos: «¿hay empates? ¿quiero el orden de llegada?». Di la operación central: «si el nuevo es mayor que la cima, la saco y meto el nuevo». Y decide qué pasa con el heap vacío: dilo antes de que te pregunten.",
    "variantes": [
      "kth largest en stream: min-heap del tamaño k en el momento de la consulta.",
      "Merge k listas ordenadas: heap de cabeceras con su lista de origen.",
      "Mediana del stream: dos heaps — un max-heap a la izquierda y un min-heap a la derecha.",
      "La ventana con la mediana deslizante: dos heaps con borrado perezoso (lazy) para la ventana.",
      "Reorganizar un string sin letras iguales vecinas: heap de frecuencias y una cola de reserva.",
    ],
    "cambios": [
      "«k crece hasta que vale n»: se acabó el heap limitado — heapify del array completo en O(n).",
      "«Los pesos cambian en caliente»: reinsertar y seguir — di que heapq no decrease-key, y que la alternativa es el recompute.",
      "«Sin biblioteca»: escribirás sift-up/sift-down delante de ellos.",
      "«Stream infinito»: la memoria O(k) es la cota que importa — dilo.",
      "«Devuelve además los k mayores ordenados descendentemente»: heap + orden final.",
    ],
    "en": {
    enfoque: "The heap in interviews is the structure of top-k and the running median. Pick min or max by asking “which top do I need?”; for the k largest of a huge list, use a min-heap capped at k: in the end the true top k are inside. Remember the budget: maintaining a heap of k costs O(n log k), not O(n log n). And in Python heapq is a min-heap: for a max, store negatives or inverted pairs.",
    comunicacion: "Justify the heap upfront: “with small k and millions of n, I keep a min-heap of size k: O(n log k) time and O(k) memory”. Ask the details that change the data: “any ties? do you want arrival order?”. Say the central operation: “if the new one beats the top, I pop and push the new one”. And decide what happens with an empty heap: say it before they ask.",
    variantes: [
"kth largest in a stream: a min-heap of size k at query time.",
      "Merge k sorted lists: a heap of heads carrying their source list.",
      "Median of a stream: two heaps — a max-heap on the left and a min-heap on the right.",
      "The sliding-window median: two heaps with lazy deletion for the window.",
      "Rearrange a string so no equal letters are adjacent: a frequency heap and a reserve queue.",
    ],
    cambios: [
"“k grows until it is n”: the capped heap is over — heapify the whole array in O(n).",
      "“Weights change on the fly”: reinsert and move on — say heapq has no decrease-key, and the alternative is recompute.",
      "“No library”: you will write sift-up/sift-down in front of them.",
      "“Infinite stream”: O(k) memory is the bound that matters — say it.",
      "“Also return the k largest sorted descending”: heap + a final sort.",
    ]
  },
  },
  "binary-search-trees": {
    "enfoque": "BST en livecoding gira sobre su invariante: izquierda < nodo < derecha de forma GLOBAL — los límites (lo, hi) viajan con la recursión, no basta con comparar el hijo directo. La segunda potencia: el inorder creciente es la llave de la validación barata y del k-ésimo. E insert/delete recursivos devolviendo el nodo — así se reengancha sin dolor.",
    "comunicacion": "Pregunta dos cosas: «¿los duplicados van a la izquierda o a la derecha?» y «¿qué auxiliares puedo usar?» — sí cambia el diseño. Antes de escribir valid BST di la alternativa: «puedo hacerlo con límites que viajan O(n), o un inorder que ya está ordenado — elijo límites». En delete, narra el caso de dos hijos: «tomo el mayor de la izquierda (predecessor), copio su valor y elimino ese sucesor».",
    "variantes": [
      "El k-ésimo más pequeño: inorder contando (o acumular subtallas si exigen O(h)).",
      "Valid BST: límites lo/hi heredados — el bug del «solo contra el hijo directo» es el test favorito.",
      "Rango suma en un rango [lo, hi]: poda por los cuatro lados sin recorrer todo.",
      "Insertar / eliminar nodo devolviendo el subárbol: los reenganches se escriben solos.",
      "BST iterator en memoria O(h): la pila del inorder a medias.",
    ],
    "cambios": [
      "«El árbol creció desbalanceado»: confiesa que la búsqueda es O(n) a la altura — y menciona reequilibrio (AVL) si te lo piden.",
      "«El árbol deja de ser BST»: muere la poda por rango — la búsqueda pasa a DFS con visitados.",
      "«Muchos inserts en streaming»: el balanceo importa — menciona rotaciones aunque no las escribas.",
      "«Iterar de menor a mayor con memoria O(h)»: el iterator con pila — sin materializar el inorder.",
      "«El árbol es enorme y remoto»: en cada llamada, la poda de rango reduce las llamadas remotas.",
    ],
    "en": {
    enfoque: "BST in livecoding revolves around its invariant: left < node < right GLOBALLY — the bounds (lo, hi) travel with the recursion; comparing with the direct child is not enough. The second power: the increasing inorder is the key to the cheap validation and to the k-th smallest. And recursive insert/delete returning the node — the re-attachment then writes itself.",
    comunicacion: "Ask two things: “do duplicates go left or right?” and “what helpers may I use?” — both change the design. Before writing a valid-BST check, offer the alternative: “I can do it with traveling bounds in O(n), or an inorder that comes out sorted — I choose bounds”. On delete, narrate the two-children case: “I take the largest of the left subtree (the predecessor), copy its value and delete that successor”.",
    variantes: [
"The k-th smallest: inorder counting (or accumulating subtree sizes if they demand O(h)).",
      "Validate BST: inherited lo/hi bounds — the “only against the direct child” bug is their favorite test.",
      "Range sum over [lo, hi]: prune on all four sides without traversing everything.",
      "Insert / delete a node returning the subtree: the re-links write themselves.",
      "BST iterator in O(h) memory: the half-finished inorder stack.",
    ],
    cambios: [
"“The tree grew unbalanced”: admit the search is O(n) at that height — and mention rebalancing (AVL) if they ask.",
      "“The tree stopped being a BST”: range pruning dies — the search becomes DFS with a visited set.",
      "“Many inserts in streaming”: balance matters — mention rotations even if you don’t write them.",
      "“Iterate from smallest to largest with O(h) memory”: the iterator with a stack — no materializing the inorder.",
      "“The tree is huge and remote”: with each call, the pruning by range trims the remote calls.",
    ]
  },
  },
  "tries": {
    "enfoque": "El trie (árbol de prefijos) entra cuando el problema habla de prefijos comunes, autocompletar o buscar miles de palabras a la vez; comparado con un set, su interés es el prefijo compartido: recorres letra a letra y decides si seguir. En livecoding se implementa con un dict de hijos y una marca de fin de palabra — cada palabra entra letra a letra. Piensa en la tradeoff: trie vs hash set («¿solo busco palabras enteras? entonces set; ¿prefijos? trie»).",
    "comunicacion": "Idea clara: «guardaré en un trie: prefijos compartidos en una sola rama, y cada nodo lleva su marca de fin de palabra. Pregunta la escala: «¿palabras de ~20 caracteres y hay miles?» — entonces la altura del trie es 20 y la memoria va por caracteres totales. Con eso, autocompletar es recorrer el trie desde el prefijo y recolectar lo que queda por debajo.",
    "variantes": [
      "Word search II: trie + backtracking sobre la grid — los prefijos podan ramas enteras.",
      "El prefijo común más largo de una lista: el trie o comparación directa carácter a carácter.",
      "Estructura de datos con comodín «.» en la búsqueda: el trie con ramificación por carácter.",
      "Autocompletado con sugerencias ordenadas de menor a mayor longitud.",
      "Reemplazar palabras por su prefijo más corto del diccionario.",
    ],
    "cambios": [
      "«El vocabulario es gigante y en disco»: los nodos se comprimen — habla de radix trie y nodos por array.",
      "«Ahora los acentos también»: normaliza antes de insertar — di dónde guardas la clave canónica.",
      "«El alfabeto cambia»: las ramas por nodo se adaptan (26 letras, bytes o lo que toque).",
      "«Búsqueda de palabra con una corrección»: distancia 1 — desde cada nodo, el DP de ediciones.",
      "«Stream de inserciones constantes»: insertar al vuelo: cada palabra nueva entra letra a letra (si te empujan, menciona el suffix trie).",
    ],
    "en": {
    enfoque: "The trie (prefix tree) enters when the problem speaks of common prefixes, autocomplete or searching thousands of words at once; compared with a set, what is interesting is the shared prefix: you walk letter by letter and decide whether to continue. In livecoding it is implemented with a dict of children and an end-of-word mark — each word enters letter by letter. Think about the tradeoff: trie vs hash set (“do I only search whole words? then a set; do I need prefixes? then a trie”).",
    comunicacion: "Clear idea: “I will build a trie: shared prefixes share one branch, and each node carries its end-of-word mark.” Ask about scale: “words of ~20 characters and thousands of them?” — then the trie’s height is 20 and memory scales with total characters. With that, autocomplete is walking the trie from the prefix and collecting what remains below.",
    variantes: [
"Word search II: trie + backtracking over the grid — prefixes prune whole branches.",
      "The longest common prefix of a list: the trie, or direct character-by-character comparison.",
      "A data structure with the “.” wildcard in the search: the trie branching per character.",
      "Autocomplete with suggestions ordered by increasing length.",
      "Replace words by their shortest dictionary prefix.",
    ],
    cambios: [
"“The vocabulary is giant and lives on disk”: compress the nodes — talk about radix tries and array-backed nodes.",
      "“Accents count now”: normalize before inserting — say where you keep the canonical key.",
      "“The alphabet changes”: branches per node adapt (26 letters, bytes, whatever fits).",
      "“Search a word allowing one correction”: distance 1 — from each node, the edit DP.",
      "“A constant stream of insertions”: insert on the fly, letter by letter (if they push, mention the suffix trie).",
    ]
  },
  },
  "graphs": {
    "enfoque": "Los grafos en livecoding se resuelven eligiendo pila contra cola: DFS para recorrer en profundidad, estructuras y ciclos; BFS para distancias mínimas y niveles. Lo demás es andamio: lista de adyacencia y marcar visitado ANTES de encolar o apilar, no al sacar. En livecoding los grafos también llegan enmascarados: una grid es un grafo (celdas = nodos, vecinos = aristas), y así lo dices en voz alta antes de convertir la matriz a grafo.",
    "comunicacion": "Confirma presupuestos temprano: «¿el grafo es dirigido? ¿puede haber ciclos? ¿puedo tener nodos aislados?». Antes de escribir: «a V nodos y E aristas, DFS y BFS son O(V + E); la memoria, O(V): visitados más la cola o pila». En el grid pregunta algo que ahorra bugs: «¿los vecinos son los 8 o solo los 4 ortogonales?»",
    "variantes": [
      "Clonar un grafo: mapa de originales a copias con DFS.",
      "Number of islands: flood fill explorando en la grid (DFS o BFS).",
      "HasPath / components count: BFS desde un origen o bucle sobre no visitados.",
      "Course schedule: detección de ciclo con DFS dirigido por colores (blanco/gris/negro).",
      "Walls and gates: BFS multi-fuente desde todas las puertas a la vez.",
    ],
    "cambios": [
      "«Ahora es dirigido»: cambia qué aristas cuentan y cómo detectas ciclos.",
      "«Grafo gigante, sin recursión»: DFS iterativo con pila explícita.",
      "«Modifica la grid y devuelve esa misma»: marca en sitio en lugar de un set de visitados.",
      "«El grafo llega por API: getNeighbors(u)»: el algoritmo aguanta; cuenta cada llamada remota como coste.",
      "«Devuelve también las distancias»: BFS por niveles con un contador de nivel.",
    ],
    "en": {
    enfoque: "Graphs in livecoding resolve by choosing stack vs queue: DFS to walk deep, structures and cycles; BFS for shortest distances and levels. The rest is scaffolding: an adjacency list and marking visited BEFORE enqueuing or pushing, not when popping. Graphs also arrive disguised: a grid is a graph (cells = nodes, neighbors = edges), and you say that out loud before converting the matrix.",
    comunicacion: "Confirm budgets early: “is the graph directed? can there be cycles? may there be isolated nodes?”. Before writing: “with V nodes and E edges, DFS and BFS are O(V + E); memory is O(V): visited plus the queue or stack”. On a grid, ask the bug-saver: “are neighbors the 8 surrounding cells or only the 4 orthogonal ones?”.",
    variantes: [
"Clone a graph: a map from originals to copies with DFS.",
      "Number of islands: flood fill over the grid (DFS or BFS).",
      "HasPath / component count: BFS from a source, or a loop over unvisited nodes.",
      "Course schedule: cycle detection with a colored DFS (white/gray/black).",
      "Walls and gates: multi-source BFS from every gate at once.",
    ],
    cambios: [
"“It is directed now”: which edges count changes, and so does cycle detection.",
      "“Huge graph, no recursion”: iterative DFS with an explicit stack.",
      "“Mutate the grid and return it”: mark in place instead of a visited set.",
      "“The graph arrives via an API: getNeighbors(u)”: the algorithm holds; count every remote call as cost.",
      "“Also return the distances”: level-order BFS with a level counter.",
    ]
  },
  },
  "graph-algorithms": {
    "enfoque": "Aquí se eligen algoritmos por firmas: pesos positivos → Dijkstra; pesos negativos → Bellman-Ford; dependencias → topológico; conectividad fuerte → Kosaraju/Tarjan (a mano). En livecoding lo que se premia es que la FIRMA del problema apunte al algoritmo correcto ANTES de codificar: en Dijkstra, di el invariante — «lo que sale de la cola es definitivo» y la cola es una cola de prioridad.",
    "comunicacion": "En Dijkstra narra el invariante: «cuando un nodo sale de la cola con distancia mínima, queda definitivo». Pregunta restricciones: «¿puede haber pesos negativos? ¿hay un destino concreto o van todos?». En el topológico di el sentido: «es un orden de dependencias válido — si hay ciclo, no existe orden válido».",
    "variantes": [
      "Dijkstra versión clásica (network delay time): tiempo de propagación a todos los nodos.",
      "Dijkstra con una parada k: el número restante va en el estado (o Bellman-Ford por rondas).",
      "Alien dictionary: topológico sobre las letras por orden de las palabras.",
      "Cheapest flights dentro de k aristas: Bellman-Ford con guardas por ronda.",
      "Pacific Atlantic water flow: BFS desde las dos costas y solo cuenta el agua que llega a ambos océanos.",
    ],
    "cambios": [
      "«Ahora hay pesos negativos»: Dijkstra queda roto — toca Bellman-Ford y lo dices en voz alta.",
      "«Importa el límite de k aristas»: Bellman-Ford de k rondas o Dijkstra con estado (nodo, restantes).",
      "«Ahora hay varias fuentes»: todas arrancan en la cola a la vez — BFS multi-fuente.",
      "«El destino cambia a mitad de camino»: recompute partiendo de lo que ya sabes — y di cuánto te ahorra.",
    ],
    "en": {
    enfoque: "Here you pick algorithms by signatures: positive weights → Dijkstra; negative weights → Bellman-Ford; dependencies → topological order; strong connectivity → Kosaraju/Tarjan by hand. In livecoding you are rewarded for reading the problem’s signature and pointing to the right algorithm BEFORE coding: in Dijkstra, state the invariant — “what leaves the queue is settled” — and the queue is a priority queue.",
    comunicacion: "In Dijkstra narrate the invariant: “when a node leaves the queue with the minimum distance, it is settled”. Ask constraints: “can weights be negative? is there a specific destination or all of them?”. On topological order say what it means: “it is a valid dependency order — with a cycle, no valid order exists”.",
    variantes: [
"Classic Dijkstra (network delay time): the time for the signal to reach every node.",
      "Dijkstra with a k-stop cap: the remaining budget rides inside the state (or Bellman-Ford in rounds).",
      "Alien dictionary: topological order over letters, derived from word order.",
      "Cheapest flights within k edges: Bellman-Ford with per-round guards.",
      "Pacific Atlantic water flow: BFS from both coasts; only the water reaching both oceans counts.",
    ],
    cambios: [
"“There are negative weights now”: Dijkstra is broken — it is Bellman-Ford, and you say so out loud.",
      "“The k-edge cap matters”: k rounds of Bellman-Ford, or Dijkstra with a budget state (node, remaining).",
      "“Several sources now”: they all enter the queue at once — multi-source BFS.",
      "“The destination changes mid-run”: recompute starting from what you already know — and say how much you save.",
    ]
  },
  },
  "union-find": {
    "enfoque": "Union-Find aparece cuando el problema pide conectividad dinámica: «¿u y v van juntos?» mientras llegan pares. El esqueleto mínimo en livecoding: padre[i] = i, un find que comprime al volver y una union por talla. Su logro es el coste: prácticamente O(1) amortizado por operación (α(n)); y para «¿cuántos componentes quedan?», un contador que baja con cada unión.",
    "comunicacion": "Dibuja el bosque de padres en tu ejemplo y di la técnica: «path compression acorta cada camino; union by size mantiene árboles bajos — la intuición es que casi no hay trabajo». Pregunta el tamaño: «¿cuántos nodos y cuántas uniones?». Y al cerrar: «quedan k componentes — lo llevo en un contador».",
    "variantes": [
      "Number of provinces: contar componentes sobre la matriz de adyacencia.",
      "Detectar ciclo: cuando el par (a, b) ya estaba conexo antes de la unión.",
      "Accounts merge: unir por e-mails compartidos y devolver los grupos ordenados.",
      "Redundant connection: el primer par que crea ciclo al añadirse — esa es la respuesta.",
      "Number of islands II: cada turno añaden celdas y piden cuántas islas quedan en vivo.",
    ],
    "cambios": [
      "«Ahora cuenta el TAMAÑO de cada componente»: mantén un array de tallas y súmalo en cada unión.",
      "«Borrar no es gratis»: la remoción es cara — el enfoque estándar es marcar el nodo muerto y rehacer las uniones que lo afectaban.",
      "«Ahora hay pesos por arista» (union-find ponderado): la compresión sigue; el peso acumulado viaja con el camino.",
      "«Necesito deshacer uniones» (rollback): apila la historia de cada unión para revertirla.",
      "«El tamaño n es colosal»: array de enteros directo, sin dicts.",
    ],
    "en": {
    enfoque: "Union-Find appears when the problem asks dynamic connectivity: “are u and v together?” while pairs keep arriving. The minimal skeleton in livecoding: parent[i] = i, a find that compresses on the way back and a union by size. Its achievement is the cost: essentially O(1) amortized per operation (α(n)); and for “how many components remain?”, a counter that drops with every union.",
    comunicacion: "Draw the forest of parents on your example and state the technique: “path compression shortens every path; union by size keeps trees shallow — the intuition is that almost no work remains”. Ask for the size: “how many nodes and how many unions?”. And to close: “k components remain — I carry them in a counter”.",
    variantes: [
"Number of provinces: counting components over the adjacency matrix.",
      "Detect a cycle: the pair (a, b) was already connected before the union.",
      "Accounts merge: unify by shared e-mails and return the sorted groups.",
      "Redundant connection: the first pair that creates a cycle when added — that is the answer.",
      "Number of islands II: cells are added each turn and you answer how many islands remain, live.",
    ],
    cambios: [
"“Now the SIZE of each component counts”: keep a size array and add it up on every union.",
      "“Deleting is not free”: removal is expensive — the standard approach marks the node dead and redoes the unions it touched.",
      "“Now there are edge weights” (weighted union-find): compression still applies; the accumulated weight travels with the path.",
      "“I need to undo unions” (rollback): stack the history of each union to be able to revert it.",
      "“n is colossal”: a plain array of integers, no dicts.",
    ]
  },
  },
  "mst": {
    "enfoque": "El árbol de expansión mínima en livecoding es «conectarlo todo al mínimo coste». Declara primero el plan entre Kruskal y Prim: Kruskal = aristas ordenadas + union-find (menos código que escribir) y Prim = heap de frontera (mejor en grafos densos). El punto conceptual que gustas defender es la propiedad del corte: la arista más barata que cruza una división del grafo pertenece a algún MST — esa frase convierte la voracidad en algoritmo justificado.",
    "comunicacion": "Pregunta lo esencial: «¿el grafo es conexo? Si no, no hay árbol de expansión y devuelvo -1 o un bosque». Narra la firma: «ordenar aristas es O(E log E) y cada unión casi O(1): total O(E log E)». Y di el detalle de libro: «tomo la arista solo si une dos componentes distintas; si no, forma ciclo y la descarto».",
    "variantes": [
      "Min cost to connect points: de coordenadas del plano → a distancias entre todas las parejas (Kruskal directo).",
      "Conectar nodos con algunas aristas ya dadas de gratis: union-find primero, el MST del resto.",
      "El camino que minimiza el arista máximo en un par: MST y el arista más pesado del camino.",
      "¿El MST es único?: ordenar aristas y comprobar empates al cruzar el corte.",
    ],
    "cambios": [
      "«Algunas aristas están prohibidas»: filtra antes del Kruskal — la plantilla no cambia.",
      "«Cambió: ahora Prim en vez de Kruskal»: ambos son correctos — di qué estructura gana en cada caso.",
      "«Los costes cambian con el tiempo»: recompute a caballo — di cuánto te cuesta reintentar.",
      "«Devuelve también las aristas elegidas, no solo el coste»: guarda las que entran al árbol.",
    ],
    "en": {
    enfoque: "The minimum spanning tree in livecoding is “connect everything at minimum cost”. Declare the plan between Kruskal and Prim first: Kruskal = sorted edges + union-find (less code to write) and Prim = a frontier heap (better on dense graphs). The conceptual point worth defending is the cut property: the cheapest edge crossing any split of the graph belongs to some MST — that sentence turns greed into a justified algorithm.",
    comunicacion: "Ask the essential: “is the graph connected? If not, there is no spanning tree and I return -1 or a forest”. Narrate the signature: “sorting edges is O(E log E) and each union is nearly O(1): total O(E log E)”. And add the textbook detail: “I take an edge only if it joins two different components; otherwise it forms a cycle and I discard it”.",
    variantes: [
"Min cost to connect points: from plane coordinates → distances between every pair (straight Kruskal).",
      "Connect nodes when some edges are given for free: union-find first, then the MST of the rest.",
      "The path minimizing the maximum edge for a pair: an MST, and the heaviest edge along its path.",
      "Is the MST unique?: sort the edges and check for ties when crossing a cut.",
    ],
    cambios: [
"“Some edges are forbidden”: filter them before Kruskal — the template doesn’t change.",
      "“Switch: Prim instead of Kruskal”: both are correct — say which structure wins in each case.",
      "“Costs change over time”: recompute from scratch — and say what retrying costs you.",
      "“Also return the chosen edges, not just the cost”: keep the ones admitted into the tree.",
    ]
  },
  },
  "backtracking": {
    "enfoque": "La firma del backtracking en livecoding es «quiero todas las combinaciones, caminos o soluciones» con n pequeño. La plantilla de tres pasos (elegir, recursar, deshacer) se escribe de memoria y se repite en voz alta: en cada nivel recorres los candidatos, haces la marca, llamas a la profundidad siguiente y la deshaces. Antes de codificar, dibuja el árbol de decisiones con n = 3 — el entrevistador ve la plantilla y tu poda.",
    "comunicacion": "Concreta el objetivo de la salida: «¿quiero UNA solución, TODAS o cuántas hay?» — cambia el retorno del esqueleto. Di la poda que aplicas: «si la suma parcial ya se pasa del resto, corto la rama y vuelvo». Y con duplicados, la regla de libro: «ordeno y salto los iguales consecutivos del mismo nivel».",
    "variantes": [
      "Word search en la grid: backtracking marcando y desmarcando la casilla.",
      "Combination sum: sin duplicados y su versión con repetición permitida.",
      "Subsets / permutaciones / combinaciones: la tríada con el mismo esqueleto.",
      "Particionado de palíndromos: decidir dónde partir según si cada bloque es palíndromo.",
      "Sudoku solver: la poda por filas/columnas/cajas con sets de vistos.",
    ],
    "cambios": [
      "«Solo una solución, no todas»: return temprano en cuanto la hay — el esqueleto no cambia, la salida sí.",
      "«Cuenta soluciones, no las guardes»: las recursiones devuelven enteros y la memoria queda en O(profundidad).",
      "«Referencia memoria mínima»: generator de resultados en vez de lista entera.",
      "«Poda extra con máscara»: bitmask de lo ya usado — el capítulo 22 en acción.",
      "«El orden de salida exacto importa»: di la convención de tu recorrido (incluir antes que excluir) — con eso dicto el orden.",
    ],
    "en": {
    enfoque: "The signature of backtracking in livecoding is “I want all combinations, paths or solutions” with a small n. The three-step template (choose, recurse, undo) is written from memory and repeated out loud: at each level you walk the candidates, place the mark, call the deeper level and undo it. Before coding, draw the decision tree with n = 3 — the interviewer sees the template and your pruning.",
    comunicacion: "Pin down the shape of the output: “do you want ONE solution, ALL of them, or just how many?” — it changes the skeleton’s return. Say which pruning you apply: “if the partial sum already exceeds the target, I cut the branch and back”. And with duplicates, the textbook rule: “sort and skip equal consecutive candidates at the same level”.",
    variantes: [
"Word search on the grid: backtracking marking and unmarking the cell.",
      "Combination sum: without duplicates, and its version with repetition allowed.",
      "Subsets / permutations / combinations: the triad sharing the same skeleton.",
      "Palindrome partitioning: decide where to cut by checking whether each block is a palindrome.",
      "Sudoku solver: pruning by rows/columns/boxes with seen sets.",
    ],
    cambios: [
"“Only one solution, not all”: return early as soon as one appears — the skeleton stands, the exit changes.",
      "“Count solutions, don’t store them”: the recursions return integers and memory stays O(depth).",
      "“Keep memory minimal”: a generator of results instead of the whole list.",
      "“Extra pruning with a mask”: a bitmask of what is already used — chapter 22 in action.",
      "“The exact output order matters”: say your traversal convention (include before exclude) — with that, the order is dictated.",
    ]
  },
  },
  "bit-operations": {
    "enfoque": "Los bits en livecoding aparecen con dos caras: máscaras como sets de enteros (visitado, subsets, poda) y el truco del XOR — los pares se anulan. Señales de reconocimiento: «sin memoria extra» o «todos iguales salvo uno» huele a bits. El resto es tabla: el bit comprobable último de n (n % 2 o n & 1) y la máscara pura (n | (1 << i)) hacen la magia.",
    "comunicacion": "Di siempre los límites del dominio: «¿los números pueden ser negativos? ¿cabe en 32 bits o en 64?». Cuando uses el truco, en voz alta: «n & (n-1) apaga el uno más a la derecha de n — el clásico para contar». Pregunta lo que puede cambiar el diseño: «¿la entrada llega completa o en stream, pareja a pareja?».",
    "variantes": [
      "Single number: XOR de todo — los pares se anulan y queda el único.",
      "Missing number: XOR de índices contra XOR de números — otra vez la anulación.",
      "Counting bits 1..n: dp[i] = dp[i >> 1] + (i & 1).",
      "Reverse bits y rotaciones: máscaras de desplazamiento, sin operadores difíciles.",
      "Subsets con bitmask: con n ≤ 20, cada subconjunto se numera de 0 a 2^n − 1.",
    ],
    "cambios": [
      "«Ahora n ocupa 64 bits» (o es enorme): di qué cambia en el desplazamiento y en los techos.",
      "«Ahora hay negativos»: complemento a dos — la máquina está firme, tú cuidado con el bit de signo.",
      "«Llega en stream y no puedes guardar nada»: el acumulador XOR es el ganador fino.",
      "«La poda del backtracking pide más memoria»: máscara en enteros — ya la tienes.",
      "«Además devuelve todos los subsets del 1..n»: enumerar contando de 0 a 2^n − 1.",
    ],
    "en": {
    enfoque: "Bits in livecoding arrive with two faces: masks as integer sets (visited, subsets, pruning) and the XOR trick — pairs cancel out. Recognition signals: “without extra memory” or “all equal except one” smells like bits. The rest is lookup: the last set bit of n (n % 2 or n & 1) and the raw mask (n | (1 << i)) do the magic.",
    comunicacion: "Always state the domain limits: “can numbers be negative? do they fit in 32 or 64 bits?”. When you use the trick, say it aloud: “n & (n-1) turns off the rightmost set bit of n — the classic for counting”. Ask what would change the design: “does the input arrive complete, or pairwise in a stream?”.",
    variantes: [
"Single number: XOR of everything — pairs cancel and the unique one survives.",
      "Missing number: XOR of indexes against XOR of numbers — the cancellation again.",
      "Counting bits 1..n: dp[i] = dp[i >> 1] + (i & 1).",
      "Reverse bits and rotations: shift masks, without exotic operators.",
      "Subsets with a bitmask: with n ≤ 20, number each subset from 0 to 2^n − 1.",
    ],
    cambios: [
"“Now n occupies 64 bits” (or is huge): say what changes in shifts and ceilings.",
      "“Negatives now”: two’s complement — the machine is steady, watch the sign bit.",
      "“It arrives in a stream and you may keep nothing”: the XOR accumulator is the fine winner.",
      "“The backtracking pruning asks for more memory”: a mask in one integer — you already have it.",
      "“Also return all the subsets of 1..n”: enumerate by counting from 0 to 2^n − 1.",
    ]
  },
  },
} as const;
