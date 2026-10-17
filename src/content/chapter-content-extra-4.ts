import { ChapterContent } from "./blocks";

/**
 * Capítulo 12 — Dynamic Programming (revisión 6c).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const dpChapter: ChapterContent = {
  id: "dynamic-programming",
  num: 12,
  title: "Dynamic Programming",
  blurb: "Memorizar subproblemas solapados: del exponencial al lineal.",
  blocks: [
    {
      kind: "prose",
      id: "dp-hook",
      text:
        "**Gancho:** el Fibonacci ingenuo del capítulo 11 gastaba O(1.618ⁿ) llamadas… ¿y por qué? Porque preguntaba lo MISMO una y otra vez — fib(20) se recalculaba miles de veces. La programación dinámica es uno de los descubrimientos técnicos más rentables de las entrevistas: un array como bloque de notas transforma exponenciales en lineales. No es un algoritmo: es una POLÍTICA — «no respondo dos veces a la misma pregunta».",
    },
    {
      kind: "prose",
      id: "dp-intro",
      text:
        "La **programación dinámica (DP)** aplica cuando el problema tiene DOS propiedades:\n\n1. **Subestructura óptima:** la solución óptima se compone de soluciones óptimas de subproblemas.\n2. **Subproblemas solapados:** los mismos subproblemas aparecen UNA Y OTRA VEZ (sin solape, no hay nada que ganar: p. ej. mergesort divide en pedazos disjuntos — puro divide y vencerás).\n\nCon ambas garantías, cada subproblema se resuelve UNA vez y su resultado se guarda. Dos direcciones:\n\n- **Top-down (memoización):** recursión natural + caché de respuestas.\n- **Bottom-up (tabulación):** bucles que llenan una tabla desde los casos base hasta el objetivo.",
    },
    {
      kind: "formula",
      id: "dp-fib-formula",
      latex: "fib(n) = fib(n-1) + fib(n-2), \\quad fib(0)=0, fib(1)=1",
    },
    {
      kind: "viz",
      id: "dp-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "0, 1, 1, 2, 3, 5, 8, 13, 21", target: "8" },
    },
    {
      kind: "prose",
      id: "dp-viz-link",
      text:
        "Ese array ES la tabla de DP: cada casilla se llenó una sola vez (el índice i guarda fib(i)) y responder es un acceso O(1). En coste: llenar la tabla son n accesos — O(n) total, frente a las millones de llamadas de la versión ingenua. La memoización es exactamente ESTO pero dejando que la recursión participe y la caché se forme sobre la marcha.",
    },
    {
      kind: "divider",
      id: "dp-divider-1",
    },
    {
      kind: "prose",
      id: "dp-ejemplo",
      text:
        "**Ejemplo resuelto — formas de pagar con monedas.** Monedas [1, 3, 4] y total 6: ¿de cuántas formas (con repetición, orden irrelevante) puedes pagar? Tabla dp[0..6], dp[0] = 1 (pagar 0 = una forma: no usar nada):\n\n| Total | dp | Cómo |\n| --- | --- | --- |\n| 0 | 1 | base |\n| 1 | 1 | una moneda de 1 |\n| 2 | 1 | 1+1 |\n| 3 | 2 | 3 ó 1+1+1 |\n| 4 | 3 | 4; 3+1; 1+1+1+1 |\n| 5 | 3 | 4+1; 3+1+1; 1×5 |\n| 6 | 4 | 4+1+1; 3+3; 3+1×3; 1×6 |\n\nCada dp[t] = dp[t] + dp[t − moneda]: el valor de HOY se cubre desde valores ya resueltos. O(6·3) operaciones frente a la enumeración exponencial de formas. Y este es el molde de TODA DP: definir el estado (total), la transición (sumar moneda) y el caso base (dp[0] = 1).",
    },
    {
      kind: "divider",
      id: "dp-divider-2",
    },
    {
      kind: "prose",
      id: "dp-tradeoffs",
      text:
        "**Top-down vs bottom-up:**\n\n| Criterio | Memoización | Tabulación |\n| --- | --- | --- |\n| escritura | recursión natural (menos esfuerzo) | bucles y tabla explícita |\n| cálculo | SOLO los estados necesarios | todos los estados, útil o no |\n| memoria | pila de recursión O(profundidad) + caché | tabla sola (O(1) de pila) |\n| optimización de espacio | no trivial | ventaja: si dp[t] solo mira dp[t−1], guarda 2 filas |\n\nRegla: si la recursión ya existe y su árbol es profundo pero disperso, memoiza; si los estados son contiguos (todo el rango 0..n), tabula y explota la ventana rodante para ahorrar memoria.",
    },
    {
      kind: "prose",
      id: "dp-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Aplicar DP sin solape.** Divide y vencerás con subproblemas disjuntos (mergesort) no gana nada memoizando: el trabajo duplicado no existe.\n2. **Estado mal definido.** El estado debe describir TODO lo necesario para continuar — si olvidas la segunda dimensión (p. ej. el peso restante), dp[idx] no captura el problema y la tabla «funciona» para casos falsos.\n3. **Orden de llenado.** En bottom-up, dp[t] necesita dp[t − coin] ya llenado: recorrer correctamente (ascendentemente aquí; en 0/1 mochila, DESCENDENTE para no reutilizar la misma moneda).\n4. **RecursionError al memoizar.** Con profundidad O(n), n grande obliga a elevar el límite o pasarse a tabulación.",
    },
    {
      kind: "prose",
      id: "dp-recap",
      text:
        "**Recap:** DP = política «resuelve cada subproblema UNA vez y guárdalo». Exige subestructura óptima + solape. Memoización (top-down) vs tabulación (bottom-up): mismo coste, distinta ergonomía — y la ventana rodante ahorra memoria. Fibonacci lo demuestra: O(1.618ⁿ) → O(n). El resto del repertorio — mochila, LCS, distancia de edición, caminos en DAG — es variar el ESTADO y la TRANSICIÓN.",
    },
  ],
};

/**
 * Capítulo 15 — Binary Search Trees (revisión 6c).
 */
export const bstChapter: ChapterContent = {
  id: "binary-search-trees",
  num: 15,
  title: "Binary Search Trees",
  blurb: "El invariante que convierte el árbol en un diccionario ordenado.",
  blocks: [
    {
      kind: "prose",
      id: "bst-hook",
      text:
        "**Gancho:** el hash table (cap. 3) responde «¿está?» en O(1)… pero si le preguntas «devuélvelos en orden» o «dame el vecino más cercano a 42», te encoges de hombros: el hash ARROJA el orden por la ventana. El BST es el compromiso elegante: casi tan rápido para buscar, y conserva el orden — mínimo, máximo y vecinos también baratos.",
    },
    {
      kind: "prose",
      id: "bst-intro",
      text:
        "Un **árbol binario de búsqueda (BST)** cumple el invariante: para cada nodo, todo su subárbol izquierdo vale MENOR y el derecho MAYOR (con una convención fija para duplicados — p. ej. a la izquierda). La consecuencia: cada comparación descarta UN SUBÁRBOL ENTERO — el árbol se parte por la mitad en cada paso. Un árbol de n nodos bien equilibrado tiene altura O(log n) → busca/inserta/borra O(log n).",
    },
    {
      kind: "viz",
      id: "bst-inorder-viz",
      type: "tree",
      config: { order: "inorder", array: "8, 3, 10, 1, 6, 14, 4, 7, 13" },
    },
    {
      kind: "prose",
      id: "bst-inorder-text",
      text:
        "El recorrido inorder (cap. 13) aquí revela su vocación: en un BST, el inorder lista SIEMPRE los valores ordenados — 1, 3, 4, 6, 7, 8, 10, 13, 14. Es la respuesta de entrevista más repetida del tema: ¿es un BST válido? Recórelo inorden y comprueba que la salida ascendente no se rompe.",
    },
    {
      kind: "divider",
      id: "bst-divider-1",
    },
    {
      kind: "prose",
      id: "bst-ejemplo",
      text:
        "**Ejemplo resuelto — buscar 7.** A la raíz (8): 7 < 8 → estoy en el subárbol IZQUIERDO y descarto los 5 nodos derechos de un tajo. A 3: 7 > 3 → derecha, descarto el izquierdo. A 6: 7 > 6 → derecha. A 7: igual — encontrado, con 3 comparaciones para n = 9. Cada comparación es un corte de mitad: esa es la «búsqueda binaria» del capítulo 4 hecha de árbol — y solo acorta si el árbol está equilibrado.",
    },
    {
      kind: "divider",
      id: "bst-divider-2",
    },
    {
      kind: "prose",
      id: "bst-degenerate",
      text:
        "**El lado oscuro: la degeneración.** Inserta 1, 2, 3, 4… en orden ascendente: cada nuevo nodo cae SIEMPRE a la derecha — el árbol se convierte en una cadena (lista enlazada) de altura n y todas las operaciones se ven O(n). La cura: árboles auto-balanceados (AVL, Red-Black) que rotan los nodos tras insertar/borrar para mantener altura O(log n) garantizada — mismas operaciones, peor caso asegurado.",
    },
    {
      kind: "prose",
      id: "bst-tradeoffs",
      text:
        "**BST vs rivales:**\n\n| Criterio | BST balanceado | Hash table (cap. 3) | Array ordenado + búsqueda binaria (cap. 4) |\n| --- | --- | --- | --- |\n| buscar / insertar / borrar | O(log n) | O(1) medio | buscar O(log n); insertar/borrar O(n) |\n| orden / rangos / vecino más cercano | ✓ EL punto fuerte | no | ✓ pero insertar caro |\n| memoria | punteros por nodo | punteros + huecos | contiguo ideal |\n\nRegla práctica: si solo te piden «¿está?» — hash. Si necesitas orden, rangos, predecesor/sucesor o el máximo/mínimo repetidamente — BST balanceado. Si el conjunto es estático — array ordenado y ya.",
    },
    {
      kind: "prose",
      id: "bst-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Invariante LOCAL vs GLOBAL.** Error común: «¿izq < padre < der?» verifica CADA nodo contra sus hijos… insuficiente: TODOS los valores del subárbol izquierdo deben ser menores (no solo su hijo). Arrastra límites min/max al descender durante la validación.\n2. **Insertar ya ordenado.** Cuidado con construir el árbol en orden: mezcla la entrada o usa un AVL/RB — un BST degenerado es el peor enemigo del BST.\n3. **Duplicados sin convención.** Define una política (p. ej. siempre izquierda) o la búsqueda entra en ambigüedad al contar duplicados.\n4. **Borrar con dos hijos.** El sucesor inorden (el mínimo del subárbol derecho) reemplaza el valor, Y luego se borra ese sucesor: sin este paso, el árbol rompe.",
    },
    {
      kind: "prose",
      id: "bst-recap",
      text:
        "**Recap:** BST = invariante «izquierda menor, derecha mayor» ⇒ cada comparación corta medio árbol: O(log n) en balanceado. Inorder = salida ordenada (validación instantánea). Sin balance degenera a O(n) — por eso AVL/Red-Black llevan rotaciones. En la práctica vivirás eligiendo entre hash (pura velocidad) y BST (orden y vecinos).",
    },
  ],
};

/**
 * Capítulo 16 — Tries (revisión 6c).
 */
export const triesChapter: ChapterContent = {
  id: "tries",
  num: 16,
  title: "Tries",
  blurb: "Prefijos a la velocidad del texto: diccionarios y autocompletado.",
  blocks: [
    {
      kind: "prose",
      id: "trie-hook",
      text:
        "**Gancho:** tecleas «alg» en cualquier editor y aparece «algoritmo, algorithmic, algorithmic-analysis» ANTES de terminar de escribir. Ni la tabla hash (cap. 3) ni el BST (cap. 15) responden bien a eso: la pregunta no es «¿está la palabra X?» sino «¿qué empieza por este PREFIJO?». El trie (árbol de prefijos) guarda palabras como CAMINOS desde la raíz: la búsqueda avanza letra a letra y a cada paso comparte el prefijo común de TODOS los caminos.",
    },
    {
      kind: "prose",
      id: "trie-intro",
      text:
        "Un **trie** almacena strings como caminos desde la raíz: cada nodo tiene un hijo POR CARÁCTER. Los nodos finales de un camino completo llevan marca de `fin_de_palabra`. Coste de buscar/insertar una palabra de longitud k: camino de k pasos — **O(k), independiente del nº de palabras** almacenadas. Ese es su sello: diccionario del tamaño que sea, buscar «abracadabra» cuesta lo mismo un dict de 100 que de 100 millones (por longitud de la PALABRA, no del diccionario).",
    },
    {
      kind: "formula",
      id: "trie-complexity",
      latex: "\\text{buscar/insertar} \\in O(k) \\qquad \\text{espacio: } O(\\text{total de caracteres})",
    },
    {
      kind: "prose",
      id: "trie-viz-link",
      text:
        "La visualización usa la convención A=1, B=2, …: la palabra APPLE se codifica como [1, 16, 16, 12, 5]. Piensa en cada letra como una CASILLA consultada y en el trie como esta cadena de consultas ENCADENADAS: consulta el primer carácter, salta a su nivel inferior, consulta el segundo… la búsqueda de prefijo es una búsqueda de camino que solo avanza.",
    },
    {
      kind: "viz",
      id: "trie-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 16, 16, 12, 5", target: "16" },
    },
    {
      kind: "divider",
      id: "trie-divider-1",
    },
    {
      kind: "prose",
      id: "trie-uses",
      text:
        "**Usos y variantes:**\n\n- **Autocompletado:** llegar al nodo del prefijo (k pasos) y CONSULTAR todos los caminos que cuelgan de ahí — el trie concentra millones de palabras en un subárbol.\n- **Corrección difusa:** caminos «cercanos» al prefijo tecleado dentro de una tolerancia (coste de edición).\n- **Enrutamiento IP:** longest-prefix match en tries de bits — el routing que lleva tu paquete usa ESTA estructura.\n- **Radix tree / Patricia:** comprime cadenas de nodos con un solo hijo en una arista con prefijo… más corto en espacio y saltos.",
    },
    {
      kind: "prose",
      id: "trie-tradeoffs",
      text:
        "**Trie vs hash table:**\n\n| Criterio | Trie | Hash table |\n| --- | --- | --- |\n| buscar palabra exacta | O(k) | O(1) medio — y GANA |\n| buscar por prefijo | O(k + salida) — nativo | forzado: barrer todas las claves O(n·k) |\n| orden alfabético | ✓ (DFS del trie) | no |\n| memoria | nodos por carácter (caro en alfabetos anchos) | flexible |\n\nEl trie gana cuando se consulta por PATRÓN: prefijos, diccionarios de juegos, rangos de palabras, autocompletado. Si solo guardas y consultas cadenas exactas, el hash es más simple y económico.",
    },
    {
      kind: "prose",
      id: "trie-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Espacio que explota.** Un nodo por carácter + hasta 26 punteros (o un dict de hijos): con muchas palabras, el trie supera mucho al hash. Mitiga con radix trees o mapas (dict) por nodo.\n2. **Olvidar la marca de fin.** Un camino de prefijos comparte letras SIEMPRE: sin `fin_de_palabra`, buscar «ana» responde «sí» solo porque está el camino de «andar».\n3. **Recursión sin caso base.** El nodo hoja (sin hijos) y el carácter fuera del alfabeto son los frenos — revive las reglas del cap. 11.\n4. **Alfabeto exigente.** UTF-8 / mayúsculas / acentos: normaliza las cadenas ANTES de decidir el índice de hijos (26 símbolos no bastan si la entrada trae acentos).",
    },
    {
      kind: "prose",
      id: "trie-recap",
      text:
        "**Recap:** el trie comparte prefijos y pone el coste de buscar en O(k) — la longitud de la palabra, no del diccionario. Su superpoder: consultas por PREFIJO (autocompletado, ortografía, routing de red). Su límite: memoria por carácter, mitigada con radix/Patricia. Cuando la pregunta empieza por «dame todo lo que empiece con…», la respuesta empieza por un trie.",
    },
  ],
};
