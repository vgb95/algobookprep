import { ChapterContent } from "./blocks";

/**
 * Capítulo 18 — Graph Algorithms (revisión 6d).
 * Estructura: gancho → teoría → viz → ejemplo resuelto → tradeoffs →
 * trampas → recap.
 */
export const graphAlgorithmsChapter: ChapterContent = {
  id: "graph-algorithms",
  num: 18,
  title: "Graph Algorithms",
  blurb: "Pesos y direcciones: Dijkstra, Bellman-Ford y el orden topológico.",
  blocks: [
    {
      kind: "prose",
      id: "ga-hook",
      text:
        "**Gancho:** tu GPS no responde «¿hay UN camino de casa a la playa?» sino «¿el más RÁPIDO?». El capítulo 17 construyó el motor (BFS/DFS); aquí el grafo se pone serio: cada arista lleva un PESO y cada arista puede tener DIRECCIÓN. Con dos preguntas nuevas: «¿camino mínimo con pesos?» (Dijkstra) y «¿qué depende de qué?» (orden topológico).",
    },
    {
      kind: "prose",
      id: "ga-intro",
      text:
        "El capítulo 17 exploró grafos SIN pesos: BFS bastaba para caminos mínimos porque cada arista costaba lo mismo (1 paso). Cuando cada arista w(u, v) tiene su propio coste, el «más cerca en capas» deja de ser verdad: un puente largo puede acortar diez tramos cortos. La operación fundamental pasa a ser la **relajación**: si encuentro un camino mejor hacia v pasando por u, actualizo:",
    },
    {
      kind: "formula",
      id: "ga-dijkstra-formula",
      latex: "d[v] = \\min\\big(d[v], \\; d[u] + w(u, v)\\big)",
    },
    {
      kind: "prose",
      id: "ga-dijkstra",
      text:
        "**Dijkstra** — caminos mínimos con pesos NO NEGATIVOS. Cola de prioridad (el heap del cap. 14): siempre expande el nodo con la distancia MENOR provisional. La intuición de su garantía: cuando un nodo sale del heap, ninguna arista puede mejorarle (todas suman ≥ 0) — su distancia ya es definitiva. Complejidad: O((n + m) log n) con heap binario.\n\n**Ejemplo resuelto.** Nodos {A, B, C}, aristas A→B (4), A→C (1), C→B (2). Sale A con d = 0; relaja C = 1 y B = 4. Sale C (el menor) y relaja B: min(4, 1 + 2) = 3 — ¡el puente CORTO ganó! Sale B con 3 definitivo. Esa mejoría tardía es la relajación en acción.",
    },
    {
      kind: "viz",
      id: "ga-viz",
      type: "graph",
      config: { algo: "bfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "ga-viz-link",
      text:
        "La visualización es el caso SIN pesos del mismo problema: aquí el orden de salida de la cola YA es la distancia (todas las aristas valen 1). Dijkstra es exactamente este bucle, cambiando la cola simple por la de prioridad — la estructura del cap. 14 aplicada al cap. 17.",
    },
    {
      kind: "divider",
      id: "ga-divider-1",
    },
    {
      kind: "prose",
      id: "ga-bellman",
      text:
        "**Bellman-Ford** — cuando hay pesos NEGATIVOS. Dijkstra rompe con ellos (su garantía «salgo y ya no toco» falla: una arista negativa puede rebajar un nodo ya cerrado). Bellman-Ford relaja TODAS las aristas, V−1 veces — tras V−1 pasadas el camino mínimo no puede alargar más (ningún camino simple tiene más de V−1 aristas). O(n·m): más lento, más general. Su régalo extra: una V-ésima pasada que SIGUE mejorando delata un **ciclo negativo** (el «beneficio eterno» de arbitraje de monedas se detecta exactamente así).",
    },
    {
      kind: "prose",
      id: "ga-topo",
      text:
        "**Orden topológico** — la dirección manda. En un grafo dirigido ACÍCLICO (no hay arista u→v que exija «primero v»), un orden topológico lista los nodos de modo que toda arista apunta HACIA ADELANTE. Sirve para planificar: tareas con dependencias, cursos con prerrequisitos, cálculos de make. Se construye con DFS (cuando un nodo TERMINA, apílalo; la pila invertida es la respuesta) o con el algoritmo de Kahn (encola los nodos sin pendientes y va apartando sus aristas). Solo existe si el grafo es un DAG — si Kahn termina con nodos descolocados, hay un CICLO: detector gratis.",
    },
    {
      kind: "divider",
      id: "ga-divider-2",
    },
    {
      kind: "prose",
      id: "ga-tradeoffs",
      text:
        "¿Cuál camino mínimo lanzo? Un menú rápido:\n\n| Problema | Algoritmo | Coste |\n| --- | --- | --- |\n| sin pesos | BFS (cap. 17) | O(n + m) |\n| con pesos, todos ≥ 0 | Dijkstra + heap | O((n + m) log n) |\n| con pesos negativos | Bellman-Ford | O(n · m) |\n| solo DAG (peso irrelevante) | topo + relajación en orden | O(n + m) |\n\nEl caso DAG es el subestimado: si las dependencias ya imponen un orden, una única pasada de relajación en orden topológico resuelve todo — Dijkstra sobra.",
    },
    {
      kind: "prose",
      id: "ga-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Dijkstra con aristas negativas.** Roza el top de bugs clásicos: el algoritmo funciona «y a veces no» — un caso con arista negativa devuelve el camino equivocado sin aviso.\n2. **Relajar sin comparar el viejo valor.** «d[u] + w» se ESCRIBE solo si es menor que el d[v] actual: sobrescribir siempre destruye información.\n3. **Topo sobre grafo con ciclo.** Kahn que termina con nodos pendientes = ciclo — ignora ese aviso y tu scheduler se bloquea para siempre.\n4. **Interpretar el topo como único.** El orden topológico NO es único (hermanos sin relación viven en cualquier orden) — pregunta «un» orden válido, no una lista exacta.",
    },
    {
      kind: "prose",
      id: "ga-recap",
      text:
        "**Recap:** pesos rompen el BFS; entra la relajación (d[v] = min(d[v], d[u]+w)). Dijkstra + heap para pesos no negativos; Bellman-Ford para negativos (y para detectar ciclos negativos); orden topológico para DAGs y dependencias (y detector de ciclos dirigidos). El menú de menús: BFS para lo uniforme, Dijkstra para lo general, Bellman-Ford para lo raro, DAG en una sola pasada.",
    },
  ],
};

/**
 * Capítulo 19 — Union-Find (revisión 6d).
 */
export const unionFindChapter: ChapterContent = {
  id: "union-find",
  num: 19,
  title: "Union-Find",
  blurb: "¿Mismo clan? Un bosque de árboles-padre: find/union casi O(1).",
  blocks: [
    {
      kind: "prose",
      id: "uf-hook",
      text:
        "**Gancho:** «¿son del mismo equipo?» — la pregunta que Kruskal (cap. 20) necesita MILLONES de veces, y que DFS no puede responder barato porque los uniones CAMBIAN datos mientras ves. Union-Find es la estructura dedicada: mantiene conjuntos DISJUNTOS y responde find/union en tiempo casi constante — mejor que lo que puede lograr cualquier recorrido desde cero en cada query.",
    },
    {
      kind: "prose",
      id: "uf-intro",
      text:
        "**Union-Find (Disjoint Set Union)** mantiene una partición de n elementos en conjuntos disjuntos con dos operaciones:\n\n- **find(x):** ¿QUIÉN es el representante del conjunto de x?\n- **union(x, y):** fusiona los conjuntos de x e y.\n\nLa implementación clásica: un array `padre[]` — cada elemento apunta a su padre, y la raíz del árbol es el REPRESENTANTE del conjunto. Todos los elementos con la misma raíz = mismo conjunto. Al principio cada elemento es su propio conjunto (n conjuntos de 1).",
    },
    {
      kind: "formula",
      id: "uf-complexity",
      latex: "find, union \\in O(\\alpha(n)) \\approx O(1) \\quad \\text{amortizado}",
    },
    {
      kind: "prose",
      id: "uf-viz-link",
      text:
        "La visualización muestra el array padre crudo: buscar el representante de un elemento significa SEGUIR los punteros hasta su raíz — exactamente lo que hace el find. Con las optimizaciones de abajo, ese paseo se acorta para siempre con cada query.",
    },
    {
      kind: "viz",
      id: "uf-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 3, 4, 5, 6, 7", target: "4" },
    },
    {
      kind: "divider",
      id: "uf-divider-1",
    },
    {
      kind: "prose",
      id: "uf-optimizations",
      text:
        "Dos optimizaciones que hacen viable el milagro:\n\n1. **Compresión de caminos (en find):** tras llegar a la raíz, TODOS los nodos del camino pasan a apuntar directo a ella — el árbol se aplana gratis en cada query.\n2. **Union por rango/tamaño:** al fusionar, la raíz MÁS CHICA cuelga de la más grande — los árboles jamás crecen de forma desproporcionada.\n\nCon AMBAS: find/union en O(α(n)) — la inversa de Ackermann, menos que 5 para cualquier n practicable: constante de facto.\n\n**Ejemplo resuelto.** Empieza con 1..7 cada uno solo. union(1, 2) → {1, 2} ; union(3, 4) → {3, 4} ; find(2) ≠ find(4) (clanes distintos); union(2, 4) → {1, 2, 3, 4} ; AHORA find(2) == find(4) — en 5 operaciones, y find(5) siempre con su propia raíz: sigue aislado. Con compresión de caminos, la segunda find(2) tarda UN paso.",
    },
    {
      kind: "divider",
      id: "uf-divider-2",
    },
    {
      kind: "prose",
      id: "uf-tradeoffs",
      text:
        "Connectividad estática vs dinámica — la frontera de esta estructura:\n\n| Criterio | Union-Find | DFS/BFS (cap. 17) |\n| --- | --- | --- |\n| «¿x e y conectados?» (grafo FIJO) | podría, pero mejor mapa | O(n + m) una vez, respuestas O(1) tras precalcular |\n| uniones que se AÑADEN sobre la marcha | ✓ el único jugador asequible | obligado a recorrer todo otra vez en cada unión |\n| memoria | un array padre O(n) | lista adyacencia O(n + m) |\n\nUsos estrella: componentes conexos dinámicos, detección de ciclos en no-dirigidos (unión que FALLA porque ya estaban juntos = arista extra con ciclo), regiones de píxeles (flood fill por uniones), y el motor de Kruskal (cap. 20).",
    },
    {
      kind: "prose",
      id: "uf-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Olvidar las optimizaciones.** Sin compresión ni por-rango, el find degenera a O(n) (cadena larga) — las dos van SIEMPRE juntas.\n2. **union a secas sin representante.** Fusionar x con y SIN llegar antes a sus raíces solo coloca un elemento en otro árbol — pásale los REPRESENTANTES.\n3. **Ciclos en grafos DIRIGIDOS.** El find-de-ciclo solo sirve no-dirigido: en dirigido usa DFS + colores (cap. 17–18).\n4. **Costes ocultos.** La PRIMERA find de una rama larga paga todos los punteros; la compresión amortiza después — mide con consultas realistas, no con la segunda.",
    },
    {
      kind: "prose",
      id: "uf-recap",
      text:
        "**Recap:** un array `padre[]` representa n conjuntos disjuntos; find persigue la raíz (representante) y union fusiona colgando la raíz chica de la grande. Con compresión de caminos + union por rango: O(α(n)) ≈ O(1) amortizado. Es la pieza de plomería que hace posible Kruskal (cap. 20) y la detección de conectividad mientras las cosas cambian — una estructura chiquita que sostiene algoritmos grandes.",
    },
  ],
};

/**
 * Capítulo 20 — Minimum Spanning Trees (revisión 6d).
 */
export const mstChapter: ChapterContent = {
  id: "mst",
  num: 20,
  title: "Minimum Spanning Trees",
  blurb: "Kruskal y Prim: conectar todo con el câble más barato.",
  blocks: [
    {
      kind: "prose",
      id: "mst-hook",
      text:
        "**Gancho:** n ciudades por conectar con fibra óptica. Cada par posible tiene un coste asociado; mientras TIENEN que estar todas comunicadas, el presupuesto NO es negociable. Respuesta: escoger un SUBCONJUNTO de aristas que dejen todo conectado, con el total más barato. Eso es el **MST** — y su solución cabe en V−1 aristas: fijo, barato, algorítmicamente determinista.",
    },
    {
      kind: "prose",
      id: "mst-intro",
      text:
        "Un **árbol de expansión mínima (MST)** de un grafo CONEXO con pesos es un subconjunto de aristas que conecta TODOS los vértices, sin ciclos, con peso total mínimo. Siempre tiene exactamente n − 1 aristas — cualquier arista extra crea un ciclo que se puede quitar (y con menos peso total). La herramienta conceptual clave —la propiedad del CORTE— sostiene a los dos algoritmos: si parto el grafo en dos pedazos, la arista MÁS BARATA que cruza el corte SIEMPRE pertenece a algún MST.",
    },
    {
      kind: "prose",
      id: "mst-kruskal",
      text:
        "**Kruskal** — «coge aristas baratas sin crear ciclos»: 1) ordena TODAS las aristas por peso; 2) tómala en orden: si sus dos extremos están en componentes DISTINTAS, añádela (y fusiona con union-find del cap. 19); si ya están juntos, DESCÁRTALA; 3) para tras n − 1 aristas. La regla del corte garantiza que cada incorporación es segura. Coste: O(m log m) — el ordenamiento manda.",
    },
    {
      kind: "prose",
      id: "mst-prim",
      text:
        "**Prim** — «haz CHICO el árbol y crece barato»: empieza en cualquier nodo y crece un ÚNICO árbol: a cada paso tomas de la cola de prioridad (cap. 14) la arista más barata que une el árbol con un nodo FUERA. Cuando el heap se vacía, todo está dentro: n − 1 aristas. Coste: O((n + m) log n) con heap binario — la misma maquinaria que Dijkstra, sin d[] acumulados: aquí la «distancia» es solo el COSTE de la arista de entrada, no el camino total.",
    },
    {
      kind: "viz",
      id: "mst-viz",
      type: "graph",
      config: { algo: "dfs", n: "7", start: "0" },
    },
    {
      kind: "prose",
      id: "mst-viz-link",
      text:
        "La visualización recorre el grafo tomando la primera arista LIBRE de cada nodo — la forma del árbol en expansión (n − 1 aristas, sin ciclos) es lo que prim/kruskal construyen; la diferencia está en elegir por peso en lugar de por orden de exploración.",
    },
    {
      kind: "divider",
      id: "mst-divider-1",
    },
    {
      kind: "prose",
      id: "mst-tradeoffs",
      text:
        "**Kruskal vs Prim — y el resto de la familia:**\n\n| Criterio | Kruskal | Prim |\n| --- | --- | --- |\n| estrategia | aristas baratas globales, sin ciclos | árbol único que crece barato |\n| estructura auxiliar | sort + union-find (cap. 19) | cola de prioridad (cap. 14) |\n| grafo disperso (m pequeño) | ✓ ideal | bien |\n| grafo denso (m ≈ n²) | el sort pesa | ✓ ideal |\n| grafo NO conexo | da bosque de MSTs | solo alcanza un componente |\n\nAplicaciones reales: redes de fibra/cables (el origen), clustering (quitando las aristas CARAS del MST particiona naturalmente), y la aproximación 2× al viajante (recorre el MST con DFS).",
    },
    {
      kind: "prose",
      id: "mst-pitfalls",
      text:
        "**Trampas frecuentes:**\n\n1. **Pesos duplicados.** «el» MST ya no es único si hay empates: puedes dar cualquier solución mínima, …a la pregunta «¿es único el MST?» la respuesta es: no en general.\n2. **No parar tras n − 1 aristas.** Kruskal sigue procesando y desperdicia tiempo; mejor detener y devolver.\n3. **Grafo no conexo.** Prim desde un nodo solo recorre SU componente — para el bosque mínimo, repite por componente (o lanza Kruskal, que da el bosque gratis).\n4. **Confundir MST con camino mínimo.** El MST minimiza el COSTE TOTAL de conectar; Dijkstra minimiza el camino DESDE una fuente a cada nodo — árboles distintos con la misma clase de materia prima.",
    },
    {
      kind: "prose",
      id: "mst-recap",
      text:
        "**Recap:** MST = conectar todo con V−1 aristas y el menor peso total; la propiedad del corte es la garantía de los dos algoritmos. Kruskal ordena y encaja con union-find (perfecto para grafos dispersos); Prim crece con heap (perfecto para densos); NO conexo → bosque. Su atajo natural: clustering — quita las aristas más CARAS del MST y los clusters se dibujan solos.",
    },
  ],
};
