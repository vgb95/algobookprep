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
  },
} as const;
