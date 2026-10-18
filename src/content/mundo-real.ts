/**
 * "En el mundo real": la capa de anclaje de cada capítulo.
 *
 * Para cada tema, tres piezas:
 *  - analogia: la imagen cotidiana que hace que la estructura/algoritmo
 *    "se vea" antes de ser código (paraguas, matrioskas, ovillo de lana…).
 *  - casos: tres usos reales y verificables donde ese concepto hace el
 *    trabajo pesado de un producto que el lector ya usa.
 *
 * Todo llega bilingüe de fábrica (es + en): esta sección es corta pero
 * es la que responde la pregunta que toda persona se hace al estudiar:
 * «¿y esto para qué sirve de verdad?». Se renderiza al final de cada
 * capítulo, justo antes de "En la entrevista" (véase Chapter.tsx).
 */

export interface MundoCaso {
  titulo: string;
  detalle: string;
}

export interface MundoReal {
  analogia: string;
  analogiaEn: string;
  casos: MundoCaso[];
  casosEn: MundoCaso[];
}

export const mundoReal: Record<string, MundoReal> = {
  complexity: {
    analogia:
      "Elegir cómo cruzar la ciudad: para 500 m da igual ir a pie, en bici o en coche; para 50 km lo decide todo. El vehículo es el algoritmo, la distancia es n, y Big-O es saber elegir antes de salir de casa.",
    analogiaEn:
      "Choosing how to cross the city: for 500 m walking, biking or driving makes no difference; for 50 km it decides everything. The vehicle is the algorithm, the distance is n, and Big-O means choosing before leaving home.",
    casos: [
      {
        titulo: "La consulta que no escala",
        detalle:
          "Un SELECT sin índice es O(n) en cada búsqueda: con 10 000 clientes funciona y con 10 millones tumba el servicio. La complejidad se paga (o se ahorra) en producción, no en la pizarra.",
      },
      {
        titulo: "Presupuestos de capacidad",
        detalle:
          "Si tu pipeline es O(n²), duplicar los usuarios cuadruplica el tiempo; los equipos dimensionan servidores con esta aritmética antes de firmar la factura de la nube.",
      },
      {
        titulo: "Code reviews en dos minutos",
        detalle:
          "La pregunta «¿y si la lista tiene un millón de elementos?» es complejidad aplicada: mata la mitad de los bugs de rendimiento antes de escribirlos.",
      },
    ],
    casosEn: [
      {
        titulo: "The query that doesn't scale",
        detalle:
          "A SELECT without an index is O(n) on every lookup: fine with 10,000 customers, fatal with 10 million. Complexity gets paid (or saved) in production, not on the whiteboard.",
      },
      {
        titulo: "Capacity budgets",
        detalle:
          "If your pipeline is O(n²), doubling users quadruples the time; teams size their servers with this arithmetic before signing the cloud bill.",
      },
      {
        titulo: "Two-minute code reviews",
        detalle:
          "The question “what if the list has a million items?” is applied complexity: it kills half of all performance bugs before they are written.",
      },
    ],
  },

  arrays: {
    analogia:
      "La fila de casillas numeradas de un ropero: todas del mismo tamaño, cada una con su dirección. Saber dónde vive algo (índice) es llegar sin recorrer los demás.",
    analogiaEn:
      "A row of numbered lockers, all the same size, each with its own address. Knowing where something lives (its index) is getting there without walking past the others.",
    casos: [
      {
        titulo: "El fotograma de un vídeo",
        detalle:
          "Cada cuadro es un array de píxeles: para leer el píxel (x, y) no se recorre nada — offset = y × ancho + x. Todo el procesado de imagen apoya ahí.",
      },
      {
        titulo: " Buffers de audio",
        detalle:
          "Las muestras del micrófono llegan en un array contiguo y la placa las consume por índice, en tiempo real: no hay margen para listas que se recorren en bucles anidados.",
      },
      {
        titulo: "Playlists y mazos de cartas",
        detalle:
          "Toda colección donde el orden importa y casi nunca se inserta en medio vive feliz en un array: barajar, cortar y repartir son accesos por índice.",
      },
    ],
    casosEn: [
      {
        titulo: "A video frame",
        detalle:
          "Every frame is an array of pixels: reading pixel (x, y) traverses nothing — offset = y × width + x. All image processing stands on that.",
      },
      {
        titulo: "Audio buffers",
        detalle:
          "Microphone samples arrive in a contiguous array and the sound card consumes them by index, in real time — no slack for lists walked in nested loops.",
      },
      {
        titulo: "Playlists and card decks",
        detalle:
          "Any collection where order matters and you almost never insert in the middle lives happily in an array: shuffling, cutting and dealing are index accesses.",
      },
    ],
  },

  "hash-tables": {
    analogia:
      "El guardarropa del teatro: entregas el abrigo, te dan un número, y el encargado calcula en qué gancho colgarlo a partir de ese número. Cobrarlo es mirar el gancho — no recorrer 2 000 abrigos.",
    analogiaEn:
      "The theatre cloakroom: you hand over your coat, get a ticket, and the attendant computes which hook to hang it on from that number. Claiming it means looking at one hook — not searching 2,000 coats.",
    casos: [
      {
        titulo: "El DNS de internet",
        detalle:
          "Traducir www.ejemplo.com a su IP es una búsqueda por tabla hash repartida por el mundo: millones de nombres, resolución en milisegundos.",
      },
      {
        titulo: "«Recordar quién eres» en cada web",
        detalle:
          "Tu cookie guarda un token; el servidor lo busca en su tabla de sesiones y recupera tu identidad en O(1) por petición.",
      },
      {
        titulo: "Importar sin duplicados",
        detalle:
          "Meter 100 000 clientes nuevos comparándolos todos contra todos es O(n²); meterlos con un set de hashes es O(n) — la diferencia es colgar la base de datos o no.",
      },
    ],
    casosEn: [
      {
        titulo: "The internet's DNS",
        detalle:
          "Turning www.example.com into its IP is a lookup sorted by distributed hash tables worldwide: millions of names, resolution in milliseconds.",
      },
      {
        titulo: "“Remembering who you are” on every website",
        detalle:
          "Your cookie holds a token; the server looks it up in its session table and recovers your identity in O(1) per request.",
      },
      {
        titulo: "Importing without duplicates",
        detalle:
          "Adding 100,000 customers by comparing everyone against everyone is O(n²); doing it with a hash set is O(n) — the difference between hanging the database or not.",
      },
    ],
  },

  search: {
    analogia:
      "Buscar una palabra en el diccionario de papel: abres por la mitad, ves que vas tarde, abres por la mitad de la mitad… 20 preguntas basten para un millón de palabras. Nadie empieza por la página 1.",
    analogiaEn:
      "Looking up a word in a paper dictionary: open in the middle, see you're too far, open the middle of the middle… 20 questions cover a million words. Nobody starts at page 1.",
    casos: [
      {
        titulo: "git bisect",
        detalle:
          "Un bug apareció «en algún commit de este mes»: la búsqueda binaria sobre el historial ordenado encuentra el commit culpable en pocas ejecuciones, no en cientos.",
      },
      {
        titulo: "Índices ordenados en la base de datos",
        detalle:
          "lower_bound/bisect detrás de cualquier rango: «facturas desde el 1 de enero» recorre solo el tramo que toca, porque el índice está ordenado.",
      },
      {
        titulo: "El control de versiones del hardware",
        detalle:
          "El firmware de un router se busca a sí mismo bloque memoria ordenada: la tabla de símbolos se consulta binaria, arrancar no puede darse el lujo de un escaneo lineal.",
      },
    ],
    casosEn: [
      {
        titulo: "git bisect",
        detalle:
          "A bug appeared “somewhere in this month's commits”: binary search over the ordered history finds the culprit in a few runs, not hundreds.",
      },
      {
        titulo: "Ordered database indexes",
        detalle:
          "lower_bound/bisect behind every range query: “invoices since January 1st” walks only the slice it needs, because the index is sorted.",
      },
      {
        titulo: "Hardware's own version control",
        detalle:
          "A router's firmware finds itself in ordered memory at boot: symbol tables are queried binary — starting up can't afford a linear scan.",
      },
    ],
  },

  sorting: {
    analogia:
      "Ordenar las cartas en la mano: pasas una por una cada carta a su sitio entre las ya ordenadas. Eso, literalmente, es insertion sort — lo haces bien sin saber su nombre.",
    analogiaEn:
      "Sorting cards in your hand: you move one card at a time into its place among the already-sorted ones. That, literally, is insertion sort — you do it well without knowing its name.",
    casos: [
      {
        titulo: "El feed de tu red social",
        detalle:
          "Ordenar miles de posts por relevancia o fecha usa Timsort (merge + insertion): el híbrido que viene de fábrica en Python y Java.",
      },
      {
        titulo: "Rankings de torneos",
        detalle:
          "Cada partida que termina reordena la tabla: estabilidad (empates conservan su orden previo) es la propiedad que hace justo el desempate.",
      },
      {
        titulo: "Ordenar es invertir en buscar",
        detalle:
          "Contactos, historial, facturas: casi todo índice se ordena a propósito porque después cada búsqueda cae de O(n) a O(log n).",
      },
    ],
    casosEn: [
      {
        titulo: "Your social feed",
        detalle:
          "Sorting thousands of posts by relevance or date uses Timsort (merge + insertion): the hybrid shipped by default in Python and Java.",
      },
      {
        titulo: "Tournament leaderboards",
        detalle:
          "Every finished game re-sorts the table: stability (ties keep their previous order) is the property that makes tie-breaking fair.",
      },
      {
        titulo: "Sorting is an investment in searching",
        detalle:
          "Contacts, history, invoices: almost every index is sorted on purpose because afterwards each search drops from O(n) to O(log n).",
      },
    ],
  },

  strings: {
    analogia:
      "Reconocer una cara en una multitud: no examinas a todo el mundo con la misma atención; tu mente busca un patrón concreto y salta. Buscar patrones dentro de texto es exactamente eso, con reglas.",
    analogiaEn:
      "Spotting a friend in a crowd: you don't examine everyone with equal attention; your mind hunts one specific pattern and jumps. Searching patterns inside text is exactly that, with rules.",
    casos: [
      {
        titulo: "El Ctrl+F del navegador",
        detalle:
          "Encontrar una palabra en la página no re-compara todo el texto en cada posición: los algoritmos de este capítulo (a los que KMP puso números) hacen que resaltar «algoritmo» en 500 000 caracteres sea instantáneo.",
      },
      {
        titulo: "Rutas y URLs",
        detalle:
          "Partir /es/chapter/arrays en trozos, unir cadenas, comparar sufijos: cada navegación por la web son operaciones básicas de strings encadenadas.",
      },
      {
        titulo: "Sanear la entrada del usuario",
        detalle:
          "trim, minúsculas, longitud, escapado: todo endpoint limpia el texto con operaciones de string antes de dejarlo cerca de la base de datos.",
      },
    ],
    casosEn: [
      {
        titulo: "The browser's Ctrl+F",
        detalle:
          "Finding a word on a page doesn't re-compare the whole text at every position: the algorithms in this chapter (the ones KMP put numbers on) make highlighting “algorithm” across 500,000 characters instant.",
      },
      {
        titulo: "Paths and URLs",
        detalle:
          "Splitting /es/chapter/arrays into pieces, joining strings, comparing suffixes: every bit of web navigation is basic string operations chained together.",
      },
      {
        titulo: "Sanitizing user input",
        detalle:
          "trim, lowercase, length, escaping: every endpoint cleans text with string operations before letting it anywhere near the database.",
      },
    ],
  },

  matrices: {
    analogia:
      "La sala de cine: tu entrada dice fila H, butaca 7 y no hace falta buscar. Dos coordenadas, un asiento — barrer la sala entera es verla por filas, columnas o diagonales.",
    analogiaEn:
      "A movie theatre: your ticket says row H, seat 7, and nobody has to search. Two coordinates, one seat — sweeping the whole room means going by rows, columns or diagonals.",
    casos: [
      {
        titulo: "La pantalla que estás mirando",
        detalle:
          "Una imagen es una matriz de píxeles; desenfocar o ajustar contraste es un barrido que mezcla cada celda con sus vecinas.",
      },
      {
        titulo: "La hoja de cálculo",
        detalle:
          "Excel/Sheets es una matriz con suma por filas y columnas: los barridos del capítulo son su motor interno.",
      },
      {
        titulo: "Tableros de juego",
        detalle:
          "Ajedrez, sudoku, buscaminas: el estado vive en una matriz y cada jugada es un acceso [fila][columna] más comprobar celdas vecinas.",
      },
    ],
    casosEn: [
      {
        titulo: "The screen you're looking at",
        detalle:
          "An image is a matrix of pixels; blurring or adjusting contrast is a sweep that blends each cell with its neighbours.",
      },
      {
        titulo: "The spreadsheet",
        detalle:
          "Excel/Sheets is a matrix with row and column sums: this chapter's sweeps are its inner engine.",
      },
      {
        titulo: "Game boards",
        detalle:
          "Chess, Sudoku, Minesweeper: the state lives in a matrix and every move is a [row][col] access plus checking neighbouring cells.",
      },
    ],
  },

  "linked-lists": {
    analogia:
      "La búsqueda del tesoro: cada pista contiene dónde está la siguiente. Para llegar a la pista 5 hay que pasar por las 4 anteriores — y meter una pista nueva entre dos es reescribir dos papeles, no renumerar todo el barrio.",
    analogiaEn:
      "A treasure hunt: each clue says where the next one is. To reach clue 5 you must pass through the previous four — and inserting a new clue between two means rewriting two notes, not renumbering the whole neighbourhood.",
    casos: [
      {
        titulo: "El planificador del sistema operativo",
        detalle:
          "Los procesos listos se enlazan en una lista circular que el scheduler rota en O(1): quitar el actual es re-apuntar dos enlaces.",
      },
      {
        titulo: "El DOM del navegador",
        detalle:
          "Los elementos de la página son nodos enlazados: insertar un elemento entre dos no desplaza al resto — por eso el editor de texto no reescribe el documento entero al teclear.",
      },
      {
        titulo: "Replay de acciones en editores",
        detalle:
          "Los editores de audio/video guardan las operaciones como nodos enlazados: insertar un corte entre dos sin recolocar los demás es la gracia de la lista.",
      },
    ],
    casosEn: [
      {
        titulo: "The OS scheduler",
        detalle:
          "Ready processes sit in a circular linked list the scheduler rotates in O(1): removing the current one means re-pointing two links.",
      },
      {
        titulo: "The browser's DOM",
        detalle:
          "Page elements are linked nodes: inserting one between two shifts nothing else — which is why typing doesn't rewrite the whole document.",
      },
      {
        titulo: "Action replay in editors",
        detalle:
          "Audio/video editors store operations as linked nodes: inserting a cut between two without moving the rest is the whole point of the list.",
      },
    ],
  },

  stacks: {
    analogia:
      "La pila de platos lavados: sirves y apilas por arriba; lo que quieres siempre está arriba, y desmontar la pila empieza por el último plato puesto. LIFO sin misterio.",
    analogiaEn:
      "The stack of washed plates: you serve and stack from the top; what you want is always on top, and dismantling starts with the last plate placed. LIFO, no mystery.",
    casos: [
      {
        titulo: "Deshacer y rehacer",
        detalle:
          "Ctrl+Z es pop sobre la pila de acciones; rehacer es pop de la pila gemela. Todo editor que respete tus dedos lleva dos pilas dentro.",
      },
      {
        titulo: "El botón atrás del navegador",
        detalle:
          "Cada URL visitada se apila por pestaña: atrás es pop, adelante es pop de la pila de redirecciones.",
      },
      {
        titulo: "La pila de llamadas",
        detalle:
          "Cada función en marcha vive apilada: por eso una recursión sin caso base se llama «stack overflow» — apiló hasta que no cupo.",
      },
    ],
    casosEn: [
      {
        titulo: "Undo and redo",
        detalle:
          "Ctrl+Z is a pop on the stack of actions; redo pops the twin stack. Every editor that respects your fingers carries two stacks inside.",
      },
      {
        titulo: "The browser's back button",
        detalle:
          "Each visited URL is pushed per tab: back is a pop, forward is a pop on the redirects stack.",
      },
      {
        titulo: "The call stack",
        detalle:
          "Every running function lives stacked: that's why a recursion with no base case is called “stack overflow” — it stacked until nothing fit.",
      },
    ],
  },

  queues: {
    analogia:
      "La fila de la panadería con ticket: coge el número 34, te atienden cuando salga el 33. Nadie se cuela y nadie se olvida: FIFO que cualquiera entiende sin saber programar.",
    analogiaEn:
      "The bakery line with tickets: you take number 34 and get served when 33 leaves. Nobody skips ahead and nobody is forgotten — FIFO anyone understands without coding.",
    casos: [
      {
        titulo: "La cola de impresión",
        detalle:
          "Los trabajos de la oficina entran por el final y se imprimen en orden de llegada; cancelar uno es sacarlo de en medio.",
      },
      {
        titulo: "Tickets de soporte y chats",
        detalle:
          "Cada conversación de atención al cliente es una cola (o cola de prioridad cuando hay urgencias): el orden de entrada decide quién es atendido.",
      },
      {
        titulo: "Tareas asíncronas de tu app",
        detalle:
          "Subir fotos, mandar emails, procesar pagos: las colas de mensajes (RabbitMQ, SQS) desacoplan al que produce del que consume.",
      },
    ],
    casosEn: [
      {
        titulo: "The print queue",
        detalle:
          "Office jobs enter at the tail and print in arrival order; cancelling one means pulling it out of the middle.",
      },
      {
        titulo: "Support and chat tickets",
        detalle:
          "Every customer-service conversation is a queue (or a priority queue when urgency exists): arrival order decides who gets served.",
      },
      {
        titulo: "Your app's async tasks",
        detalle:
          "Uploading photos, sending emails, processing payments: message queues (RabbitMQ, SQS) decouple producers from consumers.",
      },
    ],
  },

  recursion: {
    analogia:
      "Las matrioskas: abres una, dentro hay otra más pequeña; sigues hasta la que ya no abre (caso base) y montas de nuevo hacia fuera. Cada muñeca se resuelve «confiando» en la siguiente.",
    analogiaEn:
      "Matryoshka dolls: open one, a smaller one is inside; keep going until the one that doesn't open (base case), then build back outward. Each doll is solved by “trusting” the next.",
    casos: [
      {
        titulo: "El explorador de archivos",
        detalle:
          "Cada carpeta contiene archivos y más carpetas: listar todo, calcular el tamaño o sincronizar dos árboles de directorios es recursión natural.",
      },
      {
        titulo: "Comentarios anidados",
        detalle:
          "Los hilos de respuestas (foros, Reddit, issues) se renderizan con una función que llama a sí misma por cada hijo.",
      },
      {
        titulo: "Parsear el JSON de una API",
        detalle:
          "El parser desciende recursivamente: objetos dentro de arrays dentro de objetos… hasta los valores atómicos que ya no se abren.",
      },
    ],
    casosEn: [
      {
        titulo: "The file explorer",
        detalle:
          "Every folder holds files and more folders: listing everything, computing size or syncing two directory trees is natural recursion.",
      },
      {
        titulo: "Nested comments",
        detalle:
          "Threaded replies (forums, Reddit, issues) render with a function that calls itself for each child.",
      },
      {
        titulo: "Parsing an API's JSON",
        detalle:
          "The parser descends recursively: objects inside arrays inside objects… down to atomic values that no longer open.",
      },
    ],
  },

  "dynamic-programming": {
    analogia:
      "La libreta de un pastelero: cuando termina una prueba anota el resultado; la próxima vez que esa prueba aparezca, solo consulta la libreta, no vuelve a cocinar. Memorizar lo ya hecho es todo el secreto.",
    analogiaEn:
      "A pastry chef's notebook: after each test they write the result down; next time that test comes up they just read the notebook — no baking again. Remembering what's done is the whole secret.",
    casos: [
      {
        titulo: "El autocorrector y el «¿quisiste decir?»",
        detalle:
          "La distancia de edición entre lo que tecleaste y cada palabra candidata sale de una tabla DP: autocorrect, git diff y los diffs de vesniones comparten el mismo algoritmo.",
      },
      {
        titulo: "Comparar secuencias de ADN",
        detalle:
          "Alinear dos genomas (BLAST y familia) usa DP para llenar tablas de similitud: compararlo a lo bruto sería computacionalmente imposible.",
      },
      {
        titulo: "El cambio exacto de la máquina",
        detalle:
          "«¿Con qué monedas doy 87 céntimos con el mínimo?» es coins-change en la caja del supermercado — DP puro rebajado a la vida diaria.",
      },
    ],
    casosEn: [
      {
        titulo: "Autocorrect and “did you mean?”",
        detalle:
          "The edit distance between your typing and each candidate word comes out of a DP table: autocorrect, git diff and version diffs all share the same algorithm.",
      },
      {
        titulo: "Comparing DNA sequences",
        detalle:
          "Aligning two genomes (BLAST and friends) uses DP to fill similarity tables: brute-forcing it would be computationally impossible.",
      },
      {
        titulo: "Exact change from the machine",
        detalle:
          "“Which coins give 87 cents with the fewest coins?” is coin change at the supermarket register — pure DP toned down to daily life.",
      },
    ],
  },

  trees: {
    analogia:
      "El organigrama de una empresa: hay un CEO (raíz), cada jefe tiene subordinados (hijos) y a nadie le sobra jefe. Recorrer «todo el departamento» es un preorder bien hecho.",
    analogiaEn:
      "A company's org chart: one CEO (root), every manager has subordinates (children) and nobody has two bosses. “Touring the whole department” is a well-done preorder.",
    casos: [
      {
        titulo: "El sistema de archivos",
        detalle:
          "Carpetas dentro de carpetas con raíz en «/»: cada ruta absoluta es un camino del árbol, y mover un directorio es re-colgarlo de otro padre.",
      },
      {
        titulo: "El DOM de esta página",
        detalle:
          "html > body > div > p: todo lo visible es un árbol; los frameworks lo recorren y lo reparchean nodo a nodo.",
      },
      {
        titulo: "Árboles de decisión",
        detalle:
          "«¿Está enchufado? ¿Hay luz? ¿El fusible salta?» — los guiones de soporte técnico y los modelos de ML tipo árbol comparten la misma forma.",
      },
    ],
    casosEn: [
      {
        titulo: "The file system",
        detalle:
          "Folders inside folders rooted at “/”: every absolute path is a path in the tree, and moving a directory is re-hanging it under another parent.",
      },
      {
        titulo: "The DOM of this page",
        detalle:
          "html > body > div > p: everything visible is a tree; frameworks walk it and re-patch it node by node.",
      },
      {
        titulo: "Decision trees",
        detalle:
          "“Is it plugged in? Any power? Did the fuse blow?” — tech-support scripts and tree-shaped ML models share the same shape.",
      },
    ],
  },

  heaps: {
    analogia:
      "La sala de urgencias: no se entra por orden de llegada sino por gravedad, y el más crítico está siempre en cabeza. La estructura exige poco: solo que el «más urgente» se vea rápido.",
    analogiaEn:
      "The emergency room: patients enter not by arrival order but by severity, and the most critical is always at the front. The structure demands little: only that the “most urgent” be visible fast.",
    casos: [
      {
        titulo: "El planificador del sistema",
        detalle:
          "El kernel elige en cada tick el proceso con mayor prioridad de una heap: por eso tu reproductor de música no se corta cuando compila algo.",
      },
      {
        titulo: "El top-K de tendencias",
        detalle:
          "«Las 10 canciones más escuchadas ahora»: mantener una heap pequeña y preguntarle cada minuto es más barato que ordenar el catálogo entero.",
      },
      {
        titulo: "El GPS calculando rutas",
        detalle:
          "Dijkstra extrae «el vértice más cerca aún por revisar» de una cola de prioridad: sin heap, cada ruta del mapa costaría demasiado.",
      },
    ],
    casosEn: [
      {
        titulo: "The system scheduler",
        detalle:
          "Each tick the kernel picks the highest-priority process from a heap: that's why your music player doesn't stutter while something compiles.",
      },
      {
        titulo: "The top-K of trends",
        detalle:
          "“The 10 most-played songs right now”: keeping a small heap and asking it every minute is cheaper than sorting the whole catalogue.",
      },
      {
        titulo: "Your GPS computing routes",
        detalle:
          "Dijkstra extracts “the nearest vertex not yet settled” from a priority queue: without a heap, every route on the map would cost too much.",
      },
    ],
  },

  "binary-search-trees": {
    analogia:
      "El juego de adivinar el número con reglas fijas: en cada nodo se pregunta «¿mayor o menor?» y el espacio se parte en dos. Si la mitad del árbol se descarta en cada paso, encontrar algo entre un millón son ~20 preguntas.",
    analogiaEn:
      "The number-guessing game with fixed rules: at each node you ask “higher or lower?” and the space splits in two. Discard half the tree each step, and finding something among a million takes ~20 questions.",
    casos: [
      {
        titulo: "Los índices de tu base de datos",
        detalle:
          "B-trees (primos robustos del BST) sostienen cada índice de Postgres/MySQL: buscar por email es descender por el árbol, no escanear la tabla.",
      },
      {
        titulo: "Fenotecas y ventanas ordenadas",
        detalle:
          "«Facturas entre dos fechas» o «el máximo en la última hora» se resuelven descendiendo el árbol por los rangos que importan.",
      },
      {
        titulo: "El diccionario estructurado",
        detalle:
          "Autocompletar por rango, conteo de elementos menores que x, vecino siguiente: operaciones que un array desordenado cobra caro y un BST alive barato.",
      },
    ],
    casosEn: [
      {
        titulo: "Your database's indexes",
        detalle:
          "B-trees (robust cousins of the BST) back every Postgres/MySQL index: looking up by email means walking down the tree, not scanning the table.",
      },
      {
        titulo: "Ordered windows and ranges",
        detalle:
          "“Invoices between two dates” or “max in the last hour” resolve by descending the tree through the ranges that matter.",
      },
      {
        titulo: "The structured dictionary",
        detalle:
          "Range autocomplete, counting items below x, next neighbour: operations an unordered array prices high and a BST prices cheap.",
      },
    ],
  },

  tries: {
    analogia:
      "El cartelerón de rúbricas de un pueblo: cada letra cuelga de la anterior y las rutas compartidas se escriben una sola vez. «Algor» y «algoritmo» comparten todo el camino.",
    analogiaEn:
      "A village signboard of name lists: each letter hangs off the previous one and shared routes are written once. “Algor” and “algorithm” share the whole path.",
    casos: [
      {
        titulo: "El autocompletado del buscador",
        detalle:
          "Tecleas «alg» y aparecen sugerencias: detrás hay un trie sobre el histórico de búsquedas y los títulos más frecuentes.",
      },
      {
        titulo: "El teclado del móvil",
        detalle:
          "Predictivo y deslizado (swipe) recorren tries con frecuencias: elegir «poco» antes que «puco» es un max por prefijo.",
      },
      {
        titulo: "Filtros y resaltado",
        detalle:
          "Reservar palabras clave de un lenguaje o detectar términos prohibidos se hace prefijo a prefijo: un trie evita re-escanear el texto por cada palabra.",
      },
    ],
    casosEn: [
      {
        titulo: "Searchbox autocomplete",
        detalle:
          "Type “alg” and suggestions appear: behind them sits a trie over search history and frequent titles.",
      },
      {
        titulo: "Your phone's keyboard",
        detalle:
          "Predictive and swipe typing walk tries with frequencies: choosing “poco” over “puco” is a max per prefix.",
      },
      {
        titulo: "Filters and highlighting",
        detalle:
          "Reserving a language's keywords or catching banned terms is done prefix by prefix: a trie avoids re-scanning the text per word.",
      },
    ],
  },

  graphs: {
    analogia:
      "El mapa de metro: estaciones (nodos) y líneas (aristas). Importa quién toca a quién, no dónde queda dibujado: por eso los planos doblan y estiran la geografía para que las conexiones se lean claras.",
    analogiaEn:
      "The metro map: stations (nodes) and lines (edges). What matters is who touches whom, not where it's drawn — that's why the maps bend and stretch geography so connections read clearly.",
    casos: [
      {
        titulo: "El grafo social",
        detalle:
          "«Amigos en común» y «quizá conozcas a…» son recorridos a 1-2 saltos del grafo de usuarios: el BFS del capítulo menos los detalles comerciales.",
      },
      {
        titulo: "El rastreo de la web",
        detalle:
          "El crawler de un buscador recorre la red de páginas y enlaces (BFS/DFS a escala de miles de millones) con colas y visitados.",
      },
      {
        titulo: "Redes de transporte y logística",
        detalle:
          "Planificar rutas de reparto o跨国 máximas de pasajeros empieza por modelar paradas y tramos como grafo.",
      },
    ],
    casosEn: [
      {
        titulo: "The social graph",
        detalle:
          "“Mutual friends” and “you may also know…” are 1-2-hop walks over the user graph: this chapter's BFS minus the commercial details.",
      },
      {
        titulo: "Crawling the web",
        detalle:
          "A search engine's crawler walks the web of pages and links (BFS/DFS at billions scale) with queues and visited sets.",
      },
      {
        titulo: "Transport and logistics networks",
        detalle:
          "Planning delivery routes or max passenger flows starts by modelling stops and legs as a graph.",
      },
    ],
  },

  "graph-algorithms": {
    analogia:
      "El mismo mapa de metro, pero con misión: llegar en el menor tiempo (Dijkstra), evitar la estación inundada (camino alterno), reordenar las obras para que nadie abra sin antes cerrar otra (orden topológico).",
    analogiaEn:
      "The same metro map, but on a mission: arrive fastest (Dijkstra), avoid the flooded station (alternate path), reorder the works so nothing opens before another closes (topological order).",
    casos: [
      {
        titulo: "El GPS de tu móvil",
        detalle:
          "Dijkstra con pesos en minutos (y variantes con atascos en vivo) elige tu ruta: el algoritmo del capítulo sirviendo comidas a escala de planeta.",
      },
      {
        titulo: "El orden de compilación",
        detalle:
          "npm/make/builds ordenan módulos con orden topológico: primero lo que no depende de nadie, o la build falla por desorden.",
      },
      {
        titulo: "Alarmas por ciclos y pesos raros",
        detalle:
          "Bellman-Ford detecta ciclos negativos: en finanzas, ese patrón desenmascara arbitrajes y fraudes «bola de nieve».",
      },
    ],
    casosEn: [
      {
        titulo: "Your phone's GPS",
        detalle:
          "Dijkstra with weights in minutes (and variants with live traffic) picks your route: this chapter's algorithm serving dinner at planetary scale.",
      },
      {
        titulo: "Build order",
        detalle:
          "npm/make/build systems order modules topologically: no-dependencies first, or the build fails out of disorder.",
      },
      {
        titulo: "Alarms from cycles and odd weights",
        detalle:
          "Bellman-Ford detects negative cycles: in finance, that pattern unmasks arbitrage and snowball fraud.",
      },
    ],
  },

  "union-find": {
    analogia:
      "Los grupos en una boda: para saber si dos invitados van juntos, pregúntale a cualquiera «¿quién es el jefe de tu mesa?» y compara. Unir mesas es simplemente ponerse de acuerdo sobre un solo jefe.",
    analogiaEn:
      "Groups at a wedding: to know if two guests travel together, ask anyone “who's your table's boss?” and compare. Merging tables is simply agreeing on one single boss.",
    casos: [
      {
        titulo: "Tendido de redes que se van uniendo",
        detalle:
          "Al tirar fibra entre sedas, cada cable nuevo plantea «¿ya están conectadas estas dos?»: find responde en casi-constante y union fusiona las zonas.",
      },
      {
        titulo: "Etiquetar regiones de una imagen",
        detalle:
          "Píxeles «de la misma mancha» se van fusionando aіг pixel a pixel: segmentación y éditos de ráster viven de union-find.",
      },
      {
        titulo: "Fusionar cuentas de usuario",
        detalle:
          "Cuando dos perfiles resultan ser la misma persona, se hace union de sus datos: el id canónico es el raíz del árbol.",
      },
    ],
    casosEn: [
      {
        titulo: "Networks being stitched together",
        detalle:
          "While laying fiber between offices, every new cable asks “are these two already connected?”: find answers in near-constant time and union merges the zones.",
      },
      {
        titulo: "Labeling regions of an image",
        detalle:
          "Pixels “of the same blob” get merged pixel by pixel: segmentation and raster editing live on union-find.",
      },
      {
        titulo: "Merging user accounts",
        detalle:
          "When two profiles turn out to be the same person, their data gets unioned: the canonical id is the tree's root.",
      },
    ],
  },

  mst: {
    analogia:
      "Tender cable de fibra entre pueblos sin tirar el dinero: cada cable conecta dos sitios y quieres tocar todos pagando la mínima longitud total. Nunca conviene un loop: sobra cable.",
    analogiaEn:
      "Laying fiber between villages without burning money: each cable connects two places and you want to touch all of them for the least total length. A loop is never worth it: spare cable.",
    casos: [
      {
        titulo: "Redes físicas mínimas",
        detalle:
          "Fibra, tuberías, cableado eléctrico y mallas de sensores: Kruskal y Prim son literalmente el presupuesto del ingeniero de redes.",
      },
      {
        titulo: "Agrupar por similitud",
        detalle:
          "Quitar las aristas más caras del MST deja grupos de puntos «parecidos»: clustering barata en imágenes y biología.",
      },
      {
        titulo: "Diseño de placas y circuitos",
        detalle:
          "Conectar componentes con la mínima pista de cobre: aproximaciones MST en el ruteado automático de PCBs.",
      },
    ],
    casosEn: [
      {
        titulo: "Minimum physical networks",
        detalle:
          "Fiber, pipelines, electrical wiring, sensor meshes: Kruskal and Prim are literally the network engineer's budget.",
      },
      {
        titulo: "Grouping by similarity",
        detalle:
          "Removing an MST's most expensive edges leaves clusters of “similar” points: cheap clustering in imaging and biology.",
      },
      {
        titulo: "Boards and circuit design",
        detalle:
          "Connecting components with the least copper: MST approximations in automatic PCB routing.",
      },
    ],
  },

  backtracking: {
    analogia:
      "Recorrer un laberinto con un ovillo de lana: avanzas dejando hilo y, cuando el pasaje muere, vuelves desandando hasta el último cruce donde había otra puerta sin probar.",
    analogiaEn:
      "Walking a maze with a ball of yarn: you advance leaving thread and, when the passage dies, you retrace to the last junction with an untried door.",
    casos: [
      {
        titulo: "Sudoku automático",
        detalle:
          "Los solvers colocan un dígito, comprueban las reglas y — al primer contradicción — retroceden: poda exprés de ramas muertas.",
      },
      {
        titulo: "Horarios imposibles",
        detalle:
          "Universidades y centros asignan aulas, profesores y grupos con backtracking + podas: probar opciones y deshacer conflictos.",
      },
      {
        titulo: "Verificación de chips (SAT)",
        detalle:
          "Los SAT-solvers industriales son backtracking masivo con poda inteligente: cada chip que compras pasó por uno antes de fabricarse.",
      },
    ],
    casosEn: [
      {
        titulo: "Automatic Sudoku",
        detalle:
          "Solvers place a digit, check the rules and — at the first contradiction — back up: instant pruning of dead branches.",
      },
      {
        titulo: "Impossible timetables",
        detalle:
          "Universities assign rooms, teachers and groups with backtracking + pruning: trying options and undoing conflicts.",
      },
      {
        titulo: "Chip verification (SAT)",
        detalle:
          "Industrial SAT solvers are massive backtracking with smart pruning: every chip you buy went through one before being manufactured.",
      },
    ],
  },

  "bit-operations": {
    analogia:
      "Un tablero de interruptores: cada fila es un número binario, cada interruptor un bit. Girar dos a la vez es XOR; encender todos menos uno es una máscara; desplazar es pasar el tren de luces a otra fila.",
    analogiaEn:
      "A board of switches: each row is a binary number, each switch a bit. Flipping two at once is XOR; enabling all but one is a mask; shifting is sliding the string of lights to another row.",
    casos: [
      {
        titulo: "Permisos de archivos",
        detalle:
          "chmod 755 son máscaras de bits: lectura, escritura y ejecución por dueño/grupo/resto se comprueban con AND y se les otorgan con OR.",
      },
      {
        titulo: "Flags y estados de hardware",
        detalle:
          "El teclado marca teclas pulsadas en un registro de bits; el driver pregunta con AND. Datos mínimos, respuestas inmediatas.",
      },
      {
        titulo: "Checksums y cifrado de flujo",
        detalle:
          "XOR es reversible y gratis: los ciphers de flujo y los CRC de descargas se montan sobre desplazamientos y XOR encadenados.",
      },
    ],
    casosEn: [
      {
        titulo: "File permissions",
        detalle:
          "chmod 755 is bit masks: read, write and execute per owner/group/others are checked with AND and granted with OR.",
      },
      {
        titulo: "Hardware flags and states",
        detalle:
          "The keyboard marks pressed keys in a bit register; the driver asks with AND. Minimal data, immediate answers.",
      },
      {
        titulo: "Checksums and stream ciphers",
        detalle:
          "XOR is reversible and free: stream ciphers and download CRCs are built on chained shifts and XOR.",
      },
    ],
  },
};
