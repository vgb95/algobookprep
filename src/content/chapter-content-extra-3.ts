import { ChapterContent } from "./blocks";

/**
 * Capítulo 9 — Stacks (revisión 6b).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const stacksChapter: ChapterContent = {
  id: "stacks",
  num: 9,
  title: "Stacks",
  blurb: "LIFO: un agujero por donde entra y sale lo último. Undo, call stack y paréntesis.",
  blocks: [
    {
      kind: "prose",
      id: "st-hook",
      text:
        "**Gancho:** pulsa Ctrl+Z y algo deshace tu última acción — no la primera de la mañana, LA ÚLTIMA. Cuando una función llama a otra, el ordenador recuerda a dónde volver con la misma pieza: LO ÚLTIMO QUE ENTRÓ ES LO PRIMERO QUE SALE. La pila es la estructura menos sofisticada del libro (quita y pon por un solo extremo) y por eso mismo una de las más usadas: el call stack, el undo, el parsing — y por detrás de TODO lo recursivo (capítulo 11).",
      textEn: "**Hook:** press Ctrl+Z and something undoes your last action — not the first of the morning, THE LAST. When a function calls another, the computer remembers where to return with the same piece: THE LAST THING IN IS THE FIRST THING OUT. The stack is the least sophisticated structure in the book (remove and place at a single end) and precisely for that reason one of the most used: the call stack, undo, parsing — and behind EVERYTHING recursive (chapter 11).",
    },
    {
      kind: "prose",
      id: "st-intro",
      text:
        "Una **pila (stack)** es una colección LIFO (*Last-In, First-Out*): solo se toca un extremo, el **tope**. Tres operaciones, todas O(1):\n\n- **push(x):** poner x encima del tope.\n- **pop():** quitar el tope y devolverlo.\n- **peek():** mirar el tope sin quitarlo.\n\nApila platos y verás la pila: lavas uno y lo pones encima (push); cuando sirves, coges el de encima (pop). Los de abajo esperan — indefinidamente.",
      textEn: "A **stack** is a LIFO collection (*Last-In, First-Out*): only one end is touched, the **top**. Three operations, all O(1):\n\n- **push(x):** put x on top of the top.\n- **pop():** remove the top and return it.\n- **peek():** look at the top without removing it.\n\nStack plates and you will see the stack: you wash one and put it on top (push); when serving, you take the one on top (pop). The ones below wait — indefinitely.",
    },
    {
      kind: "formula",
      id: "st-complexity",
      latex: "push,\\ pop,\\ peek \\in O(1) \\qquad \\text{espacio: } O(n)",
    },
    {
      kind: "viz",
      id: "st-push-viz",
      type: "list",
      config: { op: "insert", array: "7, 13, 21", index: "0", value: "9" },
    },
    {
      kind: "prose",
      id: "st-push-link",
      text:
        "Lo que acabas de ver ES un push: apilar = insertar en la cabeza de la lista, sin caminar, sin desplazar nada. Ahora al revés:",
      textEn: "What you just saw IS a push: stacking = inserting at the head of the list, no walking, nothing shifted. Now the other way around:",
    },
    {
      kind: "viz",
      id: "st-pop-viz",
      type: "list",
      config: { op: "delete", array: "9, 7, 13, 21", index: "0" },
    },
    {
      kind: "prose",
      id: "st-pop-link",
      text:
        "Y ese fue el pop: la cabeza se iba sin despedida. Por eso las pilas aman a las listas enlazadas (o a los arrays que añaden por el final): las dos operaciones de una pila son las operaciones O(1) de la cabeza. El array del capítulo 2 sirve igual si push/pop ocurren en el ÚLTIMO índice — el que no exige desplazamientos.",
      textEn: "And that was the pop: the head left without a farewell. That is why stacks love linked lists (or arrays that append at the end): the two operations of a stack are the O(1) operations of the head. The array of chapter 2 serves just as well if push/pop happen at the LAST index — the one that demands no shifting.",
    },
    {
      kind: "divider",
      id: "st-divider-1",
    },
    {
      kind: "prose",
      id: "st-balanced",
      text:
        "**Ejemplo resuelto — paréntesis balanceados.** Dada una cadena con `(`, `[`, `{` y sus cierres — p. ej. `\"([{}])\"` — recorre carácter a carácter con una pila:\n\n- Símbolo que ABRE → push.\n- Símbolo que CIERRA → pop y comprueba que coinciden en tipo.\n- Al final: balanceada ⇔ la pila quedó vacía Y nunca se cerró algo que no estaba abierto.\n\nTrace de `\"([{}])\"`:\n\n| Paso | Leo | Pila después | ¿OK? |\n| --- | --- | --- | --- |\n| 1 | `(` | `(` | ✓ |\n| 2 | `[` | `(`, `[` | ✓ |\n| 3 | `{` | `(`, `[`, `{` | ✓ |\n| 4 | `}` | `(`, `[` | ✓ (pop casa con `{`) |\n| 5 | `]` | `(` | ✓ |\n| 6 | `)` | *(vacía)* | ✓ |\n\nCoste O(n), una pila extra O(n). La pila convierte el problema «recuerda qué dejaste a medias» en «saca lo último que dejaste»: EXACTAMENTE lo que una pila conserva.",
      textEn: "**Solved example — balanced parentheses.** Given a string with `(`, `[`, `{` and their closers — e.g. `\"([{}])\"` — walk it character by character with a stack:\n\n- OPENING symbol → push.\n- CLOSING symbol → pop and check the types match.\n- At the end: balanced ⇔ the stack ended empty AND nothing was ever closed that was not open.\n\nTrace of `\"([{}])\"`:\n\n| Step | I read | Stack after | OK? |\n| --- | --- | --- | --- |\n| 1 | `(` | `(` | ✓ |\n| 2 | `[` | `(`, `[` | ✓ |\n| 3 | `{` | `(`, `[`, `{` | ✓ |\n| 4 | `}` | `(`, `[` | ✓ (pop matches `{`) |\n| 5 | `]` | `(` | ✓ |\n| 6 | `)` | *(empty)* | ✓ |\n\nCost O(n), one extra stack O(n). The stack turns the problem “remember what you left half-done” into “take out the last thing you left”: EXACTLY what a stack preserves.",
    },
    {
      kind: "divider",
      id: "st-divider-2",
    },
    {
      kind: "prose",
      id: "st-tradeoffs",
      text:
        "**Tradeoffs de implementación** (los dos builds serios, misma complejidad):\n\n| Criterio | Lista enlazada | Array dinámico |\n| --- | --- | --- |\n| push/pop garantizado | O(1) todos los casos | O(1) amortizado (redistribución ocasional) |\n| memoria | datos + puntero por nodo | solo datos, contiguo (+ capacidad extra) |\n| caché | dispersa | contigua: ideal |\n| límite | nada | tamaño fijo si implementación simple |\n\nRegla práctica: en Python, la lista nativa con `append`/`pop` ES tu pila (por el final); con muchísimos datos o memoria justa, la lista enlazada evita los realloc ocasionales. Y el patrón estrella de entrevistas: **reemplazar la recursión** del capítulo 11 por una pila explícita cuando la profundidad asusta.",
      textEn: "**Implementation tradeoffs** (the two serious builds, same complexity):\n\n| Criterion | Linked list | Dynamic array |\n| --- | --- | --- |\n| guaranteed push/pop | O(1) all cases | O(1) amortized (occasional redistribution) |\n| memory | data + pointer per node | data only, contiguous (+ spare capacity) |\n| cache | scattered | contiguous: ideal |\n| limit | none | fixed size with a simple implementation |\n\nPractical rule: in Python, the native list with `append`/`pop` IS your stack (at the end); with a huge amount of data or tight memory, the linked list avoids the occasional reallocs. And the star interview pattern: **replacing the recursion** of chapter 11 with an explicit stack when depth gets scary.",
    },
    {
      kind: "prose",
      id: "st-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Peek/pop sobre pila vacía.** El underflow es EL bug #1: comprueba `if stack:` antes — lenguajes sin verificación te dan basura o pánico.\n2. **Pilas y orden invertido.** Si apilas [a, b, c] y recorres la pila «en orden», obtienes c, b, a — los buffers y ordenadores de texto viven de esto, y los bugs también.\n3. **Push en el índice equivocado.** En un array, apilar por el FINAL (append) es O(1); apilar por el principio (`insert(0, x)`) es O(n) DESPLAZANDO todo — la pila «barata» mal implementada.\n4. **Confundir el call stack con la heap.** Los frames locales viven en la pila y son pequeños; lo que sobrevive a la llamada va a la heap. Una «pila llena» es señal de recursión sin caso base — no de demasiados datos.",
      textEn: "**Frequent traps:**\n\n1. **Peek/pop on an empty stack.** Underflow is bug #1: check `if stack:` first — languages without checks hand you garbage or panic.\n2. **Stacks and reversed order.** If you push [a, b, c] and walk the stack “in order”, you get c, b, a — text buffers and sorters live off this, and so do bugs.\n3. **Push at the wrong index.** In an array, stacking at the END (append) is O(1); stacking at the FRONT (`insert(0, x)`) is O(n) SHIFTING everything — the “cheap” stack badly implemented.\n4. **Confusing the call stack with the heap.** Local frames live on the stack and are small; whatever survives the call goes to the heap. A “stack overflow” signals recursion without a base case — not too much data.",
    },
    {
      kind: "prose",
      id: "st-recap",
      text:
        "**Recap:** la pila restringe el universo a UN extremo — y justo por eso garantiza push/pop/peek O(1) sin gestionar índices. Es la maquinaria del undo, del call stack, del parsing y del DFS. Y es el puente natural: se fabrica con una lista enlazada (cap. 8) y sostiene la recursión y el DFS de los caps. 11 y 18.",
      textEn: "**Recap:** the stack restricts the universe to ONE end — and precisely for that reason it guarantees O(1) push/pop/peek without managing indexes. It is the machinery of undo, the call stack, parsing and DFS. And it is the natural bridge: it is built from a linked list (ch. 8) and it holds the recursion and DFS of chs. 11 and 18.",
    },
  ],
};

/**
 * Capítulo 10 — Queues (revisión 6b).
 */
export const queuesChapter: ChapterContent = {
  id: "queues",
  num: 10,
  title: "Queues",
  blurb: "FIFO: lo primero que entra es lo primero que sale. Buffers, schedulers y BFS.",
  blocks: [
    {
      kind: "prose",
      id: "qu-hook",
      text:
        "**Gancho:** las tareas del mundo no se atienden como en una pila. Cuando 200 personas piden a la vez la misma página web, el servidor no dice «atiendo a la última que llegó» (esos usuarios protestan): forma UNA fila y la va sirviendo por orden de llegada. Los servidores de requests, los buffers de impresión, los sistemas de mensajería y el propio BFS del capítulo 18 comparten una pieza: la **cola**.",
      textEn: "**Hook:** the tasks of the world are not served like a stack. When 200 people request the same web page at once, the server does not say “I serve whoever came last” (those users protest): it forms ONE line and serves it in arrival order. Request servers, print buffers, messaging systems and the BFS of chapter 18 itself share one piece: the **queue**.",
    },
    {
      kind: "prose",
      id: "qu-intro",
      text:
        "Una **cola (queue)** es una colección FIFO (*First-In, First-Out*): entra por el FINAL, sale por el FRENTE. Dos operaciones, ambas O(1) si el frente no obliga a desplazar:\n\n- **enqueue(x):** añadir al final.\n- **dequeue():** extraer el elemento del frente.\n\nEl detalle que decide la implementación: hacer dequeue en un array «sano» exige abrir un hueco corriendo TODO hacia atrás (shift = O(n)) — por eso existen el **buffer circular** y la **lista con puntero al tail**:",
      textEn: "A **queue** is a FIFO collection (*First-In, First-Out*): it enters at the END and leaves at the FRONT. Two operations, both O(1) if the front does not force shifting:\n\n- **enqueue(x):** append at the end.\n- **dequeue():** pull the element at the front.\n\nThe detail that decides the implementation: doing dequeue on a “plain” array demands opening a gap by running EVERYTHING backwards (shift = O(n)) — that is why the **circular buffer** and the **list with a tail pointer** exist:",
    },
    {
      kind: "formula",
      id: "qu-complexity",
      latex: "enqueue, dequeue \\in O(1) \\qquad \\text{espacio: } O(n)",
    },
    {
      kind: "prose",
      id: "qu-variants",
      text:
        "Las implementaciones que resuelven el «shift»:\n\n1. **Buffer circular:** array fijo + punteros front/back que dan la VUELTA al final (back+1 mod capacidad). Dequeue solo mueve un puntero — nada se corre.\n2. **Lista enlazada con puntero tail:** enqueue cuelga del tail (O(1)), dequeue corta la cabeza (O(1)) — la combinación natural que acabas de ver en el capítulo 8.\n3. **Deque** (double-ended): añade push/pop en AMBOS extremos O(1) — en Python, `collections.deque`, y es la cola por defecto.",
      textEn: "The implementations that solve the “shift”:\n\n1. **Circular buffer:** fixed array + front/back pointers that WRAP AROUND at the end (back+1 mod capacity). Dequeue only moves one pointer — nothing runs.\n2. **Linked list with tail pointer:** enqueue hangs off the tail (O(1)), dequeue cuts the head (O(1)) — the natural combination you just saw in chapter 8.\n3. **Deque** (double-ended): adds push/pop at BOTH ends in O(1) — in Python, `collections.deque`, and it is the default queue.",
    },
    {
      kind: "viz",
      id: "qu-bfs-viz",
      type: "graph",
      config: { algo: "bfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "qu-bfs-link",
      text:
        "Aquí la cola trabaja en directo: el BFS encola el nodo inicial y entra en bucle — dequeue al frente, encola sus vecinos, repite. Ese orden de llegada es LO QUE PROPAGA el avance de ondas por niveles: primero todos los vecinos a distancia 1 (encolados por orden), después los a distancia 2… Sin la cola, el mismo grafo con una PILA en lugar de cola produce DFS — profundidad primero — y el orden de exploración cambia completamente.",
      textEn: "Here the queue works live: BFS enqueues the starting node and enters a loop — dequeue at the front, enqueue its neighbours, repeat. That arrival order is WHAT PROPAGATES the wave of levels: first all the neighbours at distance 1 (enqueued in order), then those at distance 2… Without the queue, the same graph with a STACK instead of a queue produces DFS — depth first — and the exploration order changes completely.",
    },
    {
      kind: "divider",
      id: "qu-divider-1",
    },
    {
      kind: "prose",
      id: "qu-tradeoffs",
      text:
        "**Tradeoffs — y el truco de entrevista favorito:**\n\n| Criterio | Buffer circular | Lista + tail | Dos stacks (truco) |\n| --- | --- | --- | --- |\n| enqueue | O(1) | O(1) | O(1) |\n| dequeue | O(1) | O(1) | O(1) amortizado |\n| capacidad | fija (¡o se agranda!) | flexible | flexible |\n| memoria | solo datos | puntero por nodo | dos contenedores |\n\n**El truco (implement Queue with Two Stacks):** apilo todo en la pila «in» al hacer enqueue; al hacer dequeue vierto solo si la pila «out» está vacía — cada elemento viaja exactamente 2 veces → amortizado O(1). La lección que el entrevistador busca: un orden puede invertirse con DOS pilas — a cambio de transportar cada elemento dos veces y de algo más de memoria.\n\nOjo con la **cola de prioridad** (heap, cap. 14): ahí el orden de salida es el «mayor prioridad primero», no el de llegada — la estructura es la hermana rica de la cola simple.",
      textEn: "**Tradeoffs — and the favourite interview trick:**\n\n| Criterion | Circular buffer | List + tail | Two stacks (trick) |\n| --- | --- | --- | --- |\n| enqueue | O(1) | O(1) | O(1) |\n| dequeue | O(1) | O(1) | O(1) amortized |\n| capacity | fixed (or it must grow!) | flexible | flexible |\n| memory | data only | pointer per node | two containers |\n\n**The trick (implement Queue with Two Stacks):** push everything into the “in” stack on enqueue; on dequeue pour over only if the “out” stack is empty — every element travels exactly 2 times → amortized O(1). The lesson the interviewer looks for: an order can be reversed with TWO stacks — at the price of carrying every element twice and a bit more memory.\n\nWatch out for the **priority queue** (heap, ch. 14): there the exit order is “highest priority first”, not arrival — the structure is the rich sister of the plain queue.",
    },
    {
      kind: "prose",
      id: "qu-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Dequeue con shift.** Un array sin punteros de frente corre O(n) por dequeue — la cola «simple» que abunda en código real se ahoga bajo carga.\n2. **Wrap-around olvidado.** En el buffer circular, back+1 mod capacidad y la condición «llena vs vacía» — ambos punteros quedan iguales si no añades un contador: usar `front == back` tanto para vacía como para llena es el bug clásico.\n3. **Cerrar con la cola creciendo.** Si la producción supera al consumo para siempre, la cola desborda — todo sistema de colas necesita política de presupuesto (backpressure, drop).\n4. **Queue vs stack al DFS/BFS swap.** Meter una pila donde va una cola en BFS rompe el orden de niveles — una línea de código, un algoritmo completamente diferente.",
      textEn: "**Frequent traps:**\n\n1. **Dequeue with shift.** An array without front pointers runs O(n) per dequeue — the “simple” queue that abounds in real code drowns under load.\n2. **Forgotten wrap-around.** In the circular buffer, back+1 mod capacity and the “full vs empty” condition — both pointers look the same unless you add a counter: using `front == back` for both empty and full is the classic bug.\n3. **Closing with a growing queue.** If production beats consumption forever, the queue overflows — every queuing system needs a budget policy (backpressure, drop).\n4. **Queue vs stack in the DFS/BFS swap.** Putting a stack where a queue belongs in BFS breaks the level order — one line of code, a completely different algorithm.",
    },
    {
      kind: "prose",
      id: "qu-recap",
      text:
        "**Recap:** la cola bloquea el desorden: entra al final, sale al frente, O(1) si evitas el shift (buffer circular o lista+tail). Es la estructura del ORDEN DE LLEGADA: schedulers, buffers, mensajería… y el motor del BFS. Su hermana (prioridad) rompe el orden a cambio de «primero lo importante» — y se llama heap.",
      textEn: "**Recap:** the queue blocks disorder: enter at the end, leave at the front, O(1) if you avoid the shift (circular buffer or list+tail). It is the structure of ARRIVAL ORDER: schedulers, buffers, messaging… and the engine of BFS. Its sister (priority) breaks the order in exchange for “important first” — and it is called a heap.",
    },
  ],
};

/**
 * Capítulo 11 — Recursion (revisión 6b).
 */
export const recursionChapter: ChapterContent = {
  id: "recursion",
  num: 11,
  title: "Recursion",
  blurb: "Una función que se llama a sí misma: caso base, árbol de llamadas y su coste real.",
  blocks: [
    {
      kind: "prose",
      id: "rec-hook",
      text:
        "**Gancho:** muñecas rusas: ¿cómo abres la primera? «Abre esta: si hay otra dentro, abre la otra». Esa frase se aplica a sí misma — y PARA SIEMPRE salvo si alguien dice «esta es la última». Ese freno — **caso base** — es el 90 % de la recursión: lo demás es confiar en que la llamada más pequeña resuelve su parte.",
    },
    {
      kind: "prose",
      id: "rec-intro",
      text:
        "La **recursión** es una función que se llama a sí misma con un problema MÁS PEQUEÑO. Dos piezas obligatorias:\n\n1. **Caso base:** el pedazo que responde sin volver a llamarse — sin él, la recursión no frena.\n2. **Caso recursivo:** reducir el problema + confiar en la propia llamada + combinar.\n\nY detrás de cada llamada hay una estructura física: el **call stack** del capítulo 9. Cada llamada apila un frame (parámetros, variable local, punto de retorno); la llamada termina → pop y se reanuda el frame de abajo. La memoria de la recursión es la pila — su profundidad ES su espacio: O(profundidad).",
    },
    {
      kind: "viz",
      id: "rec-tree-viz",
      type: "tree",
      config: { order: "inorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "rec-tree-link",
      text:
        "Este recorrido inorder de árbol ES recursión pura: «inorder(nodo) = inorder(izquierda) + visita(nodo) + inorder(derecha)». Sigue los frames: en el nodo raíz la llamada se congela («aún no visito el 8, primero mi izquierda»), se apila el hijo izquierdo, se congela, se apila el siguiente… hasta el caso base (nodo None) que no llama a nadie. El chip de profundidad de la visualización ES la altura del call stack en ese momento.",
    },
    {
      kind: "divider",
      id: "rec-divider-1",
    },
    {
      kind: "prose",
      id: "rec-factorial",
      text:
        "**Ejemplo resuelto — factorial.** `factorial(n) = n · factorial(n-1)` con caso base `factorial(0) = 1`. ¿Qué hace el call stack con factorial(4)?\n\n- factorial(4) llama a factorial(3) y se congela a la espera\n- factorial(3) llama a factorial(2) y se congela\n- factorial(2) llama a factorial(1) y se congela\n- factorial(0) → CASO BASE: devuelve 1. La pila llegó arriba; ahora, la VUELTA:\n- factorial(1) = 1·1 = 1 ; factorial(2) = 2·1 = 2 ; factorial(3) = 3·2 = 6 ; factorial(4) = 4·6 = 24.\n\nLa bajada (llenar la pila, descendiendo) se llama **recursión de ida**; el regreso con resultados (desapilando), **recursión de vuelta**. Toda recursión tiene las dos mitades — y el coste total es el TRABAJO de los frames combinado.",
    },
    {
      kind: "formula",
      id: "rec-fact",
      latex: "n! = \\begin{cases} 1 & \\text{si } n = 0 \\\\ n \\cdot (n-1)! & \\text{si } n > 0 \\end{cases}",
    },
    {
      kind: "prose",
      id: "rec-fib",
      text:
        "**El lado oscuro: Fibonacci ingenuo.** `fib(n) = fib(n-1) + fib(n-2)` con bases fib(0)=fib(1)=1. El árbol de llamadas DUPLICA trabajo a cada nivel: fib(5) pregunta por fib(3) DOS veces; fib(40) recalcula fib(20) miles de veces. El coste explota al ritmo del número áureo: O(φⁿ) ≈ O(1.618ⁿ) llamadas.\n\nLa cura — **memoización** («cada respuesta calculada se guarda; si se vuelve a pedir, devuélvela») — baja el coste a O(n) con O(n) de memoria: es la puerta a la programación dinámica del capítulo 12. Misma recursión, distinta política de memoria.",
    },
    {
      kind: "divider",
      id: "rec-divider-2",
    },
    {
      kind: "prose",
      id: "rec-tradeoffs",
      text:
        "**Recursión vs iteración:**\n\n| Criterio | Recursión | Iteración con bucle |\n| --- | --- | --- |\n| claridad en árboles/divide & vencerás | natural | engorroso |\n| profundidad | límite real (en Python ~1000 frames) | nada |\n| coste de espacio | O(profundidad) frames | O(1) si el problema lo permite |\n| conversión | SIEMPRE posible a iteración + pila explícita | directa |\n\nEn Python la recursión de cola NO se optimiza (el compilador no elimina frames) — una recursión «de cola» profunda se escribe como bucle. Los problemas recursivos natos — árboles, backtracking, divide y vencerás — conservan la recursión como herramienta mucho más clara; los lineales (sumas, bucles simples) se hacen iterativos.",
    },
    {
      kind: "prose",
      id: "rec-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Caso base olvidado o inalcanzable.** Si la reducción no se acerca al base (¡`n-1` contra un caso base `n == 5`!), la pila desborda — RecursionError en Python, segfault en otros.\n2. **Recalcular subproblemas.** La recursión pura sobre superposiciones (fib) explota: memoiza desde la primera entrevista.\n3. **Olvidar el `return`.** Cada rama debe PROPAGAR su resultado — la recursión «no devuelve nada» es el bug de copiado/pegado más común.\n4. **Estado compartido accidental.** Variables mutables definidas fuera de la llamada se comparten entre frames: para «limpiar» entre ramas (backtracking) recuerda deshacer — el patrón «elige, explora, DESHACE».\n5. **Confundir profundidad con coste.** O(profundidad) es espacio; el TIEMPO depende del árbol completo de llamadas — poca profundidad puede costar exponencial.",
    },
    {
      kind: "prose",
      id: "rec-recap",
      text:
        "**Recap:** recursión = caso base + llamada en problema más pequeño, ejecutada sobre el call stack (cap. 9): espacio O(profundidad), tiempo = trabajo del árbol completo. Factorial para ver las dos mitades; Fibonacci para ver el recálculo que la memoización (→ programación dinámica, cap. 12) cura. La disciplina «elige–explora–deshace» del backtracking llega más adelante (cap. 21).",
    },
  ],
};
