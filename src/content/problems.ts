import type { ProblemTest } from "../engine/evaluator";

export interface Problem {
  id: string;
  chapter: string;
  title: string;
  difficulty: "fácil" | "medio" | "difícil";
  blurb: string;
  setupCode: string;      // define la firma de la función y el target
  starterCode: string;    // lo que ve el alumno en el editor
  solutionCode: string;   // solución de referencia (oculta hasta resolver)
  explanation: string;    // por qué funciona
  tradeoff: string;       // contra qué alternativa se mide
  hints: string[];        // pistas progresivas (1 → 3)
  tests: ProblemTest[];   // tests visibles + ocultos
}

export const problems: Problem[] = [
  {
    id: "two-sum",
    chapter: "arrays",
    title: "Two Sum",
    difficulty: "fácil",
    blurb: "Dado un array de enteros y un valor objetivo, devuelve los índices de dos números que sumen dicho objetivo.",
    setupCode: `def two_sum(nums, target):
    """Devuelve [i, j] tal que nums[i] + nums[j] == target."""
    pass

_target = two_sum`,
    starterCode: `def two_sum(nums, target):
    # TODO: implementa esta función
    pass

# Ejemplo de uso:
# print(two_sum([2, 7, 11, 15], 9))  # debería devolver [0, 1]`,
    solutionCode: `def two_sum(nums, target):
    visto = {}
    for i, num in enumerate(nums):
        complemento = target - num
        if complemento in visto:
            return [visto[complemento], i]
        visto[num] = i
    return []`,
    explanation:
      "Almacena cada número en un diccionario {valor: índice}. Para cada número, comprueba si target - valor ya está en el diccionario. O(n) tiempo, O(n) espacio.",
    tradeoff:
      "La fuerza bruta también es O(n²) tiempo pero O(1) espacio: esta versión compra tiempo pagando memoria. Con el array ordenado, la búsqueda binaria doma el O(n²) a O(n log n) sin el diccionario — pero exige ordenar (O(n log n)) y perder los índices originales.",
    hints: [
      "Para cada número, ¿qué necesitas poder preguntar rápido: «¿su pareja ya apareció antes?»",
      "Un diccionario {valor: índice} responde esa pregunta en O(1). — recorres una vez y en cada paso consultas el complemento.",
      "Si guardas el complemento ANTES de almacenar el propio valor, los índices salen en el orden [i_antiguo, j_actual] naturalmente.",
    ],
    tests: [
      { name: "caso básico", args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: "números negativos", args: [[-3, 4, 3, 90], 0], expected: [0, 2] },
      { name: "sin solución", args: [[1, 2, 3], 7], expected: [] },
      { name: "test oculto", args: [[3, 2, 4], 6], expected: [1, 2], hidden: true },
    ],
  },
  {
    id: "contains-duplicate",
    chapter: "arrays",
    title: "Contains Duplicate",
    difficulty: "fácil",
    blurb: "Dado un array, devuelve True si algún valor aparece al menos dos veces.",
    setupCode: `def contains_duplicate(nums):
    """Devuelve True si hay duplicados, False si no."""
    pass

_target = contains_duplicate`,
    starterCode: `def contains_duplicate(nums):
    # TODO: implementa esta función
    pass`,
    solutionCode: `def contains_duplicate(nums):
    return len(set(nums)) != len(nums)`,
    explanation:
      "Un set elimina duplicados: si el set es más corto que el array original, hay duplicados. O(n) tiempo, O(n) espacio.",
    tradeoff:
      "Ordenar primero y comparar vecinos cuesta O(n log n) tiempo pero O(1) espacio extra (in-place) — mejor si la memoria es el recurso caro. El set es el equilibrio habitual: O(n) y legible.",
    hints: [
      "¿Qué estructura de datos confirma «no he visto esto antes» en O(1)?",
      "Convierte el array en un set y compara longitudes.",
      "Si len(set(nums)) < len(nums), algún valor se perdió al deduplicar: hay duplicados.",
    ],
    tests: [
      { name: "con duplicados", args: [[1, 2, 3, 1]], expected: true },
      { name: "sin duplicados", args: [[1, 2, 3, 4]], expected: false },
      { name: "vacío", args: [[]], expected: false },
      { name: "test oculto", args: [[1, 1, 1, 3, 3, 4, 3, 2]], expected: true, hidden: true },
    ],
  },
  {
    id: "halving-count",
    chapter: "complexity",
    title: "¿Cuántas veces cabe la mitad?",
    difficulty: "fácil",
    blurb: "Devuelve cuántas veces puedes dividir n entre 2 (división entera) antes de llegar a 1. Es el número de pasos de una búsqueda binaria sobre n elementos.",
    setupCode: `def halving_count(n):
    """Cuenta las divisiones enteras entre 2 necesarias para llegar a 1."""
    pass

_target = halving_count`,
    starterCode: `def halving_count(n):
    # TODO: divide n entre 2 mientras n > 1 y cuenta los pasos
    pass`,
    solutionCode: `def halving_count(n):
    pasos = 0
    while n > 1:
        n //= 2
        pasos += 1
    return pasos`,
    explanation:
      "Cada división a la mitad «mata» la mitad del espacio restante: llegar de n a 1 exige log₂(n) pasos. Dobla n y añades UN SOLO paso — esa es la firma de O(log n).",
    tradeoff:
      "Podrías computarlo con la fórmula int(log2(n)) de biblioteca, pero el bucle es la PRUEBA viviente: duplica n y los pasos crecen UNO solo — la firma de O(log n). El mismo conteo es la altura del árbol de un heap con n elementos y el número de comparaciones de la búsqueda binaria del cap. 4.",
    hints: [
      "El bucle termina cuando n llega a 1 — cuenta cada división.",
      "División ENTERA: n //= 2 (8 → 4 → 2 → 1 son 3 pasos).",
      "No necesitas logs: el while hace todo el trabajo.",
    ],
    tests: [
      { name: "n = 1", args: [1], expected: 0 },
      { name: "n = 8", args: [8], expected: 3 },
      { name: "n = 100", args: [100], expected: 6 },
      { name: "potencia de dos (oculto)", args: [1024], expected: 10, hidden: true },
    ],
  },
  {
    id: "count-pairs",
    chapter: "complexity",
    title: "El contador del doble bucle",
    difficulty: "medio",
    blurb: "Un bucle anidado (for i in range(n): for j in range(i)) da vueltas n(n-1)/2 veces… o eso crees. Calcula cuántas veces se ejecuta el cuerpo para n dado.",
    setupCode: `def count_pairs(n):
    """Veces que se ejecuta el cuerpo: for i in range(n): for j in range(i)."""
    pass

_target = count_pairs`,
    starterCode: `def count_pairs(n):
    # TODO: sin dobles bucles gigantes, devuelve el número exacto de ejecuciones
    pass`,
    solutionCode: `def count_pairs(n):
    total = 0
    for i in range(n):
        total += i
    return total`,
    explanation:
      "Para cada i, el bucle interior da i vueltas: 0 + 1 + … + (n-1) = n(n-1)/2, la suma de Gauss. Es la complejidad exacta de la fuerza bruta de muchas entrevistas (comprobar pares = O(n²) comparaciones).",
    tradeoff:
      "Simular el doble bucle con un contador interno es O(n²) — con n = 1000 son ~500.000 vueltas: lento y tonto. La fórmula cerrada (aquí acumulada en una línea de bucle simple) es O(n): reconoce la serie aritmética y te saltas el cuello de botella.",
    hints: [
      "¿Cuántas vueltas da el bucle interior cuando i = 0? ¿Y cuando i = 3?",
      "Los valores son 0, 1, 2, …, n-1: la suma 0+1+…+(n-1) tiene un nombre famoso.",
      "Un while que suma i y aumenta i en 1 hasta n calcula la serie en UN solo bucle.",
    ],
    tests: [
      { name: "n = 5", args: [5], expected: 10 },
      { name: "n = 6", args: [6], expected: 15 },
      { name: "n = 0", args: [0], expected: 0 },
      { name: "n = 1000 (oculto)", args: [1000], expected: 499500, hidden: true },
    ],
  },
  {
    id: "rotate-left",
    chapter: "arrays",
    title: "Rotación circular",
    difficulty: "medio",
    blurb: "Desplaza los elementos del array k posiciones a la IZQUIERDA de forma circular: rotate_left([1,2,3,4,5], 2) → [3,4,5,1,2]. k puede ser mayor que la longitud.",
    setupCode: `def rotate_left(nums, k):
    """Devuelve el array desplazado k a la izquierda (circular)."""
    pass

_target = rotate_left`,
    starterCode: `def rotate_left(nums, k):
    # TODO: los primeros k elementos pasan al final
    pass`,
    solutionCode: `def rotate_left(nums, k):
    if not nums:
        return []
    k %= len(nums)
    return nums[k:] + nums[:k]`,
    explanation:
      "Rotar k a la izquierda = partir en el índice k y concatenar la segunda mitad antes que la primera. El módulo maneja k ≥ n: rotar 4 veces un array de 3 es rotar 1. Coste O(n): la operación completa cabe en dos slicings.",
    tradeoff:
      "La versión «shift uno a la vez» repetida k veces cuesta O(n·k): el clásico asesino silencioso. El slicing de Python es O(n) con espacio extra O(n); la variante in-place con TRES inversiones (primero las k primeras, luego el resto, luego el conjunto entero) consigue O(n) tiempo y O(1) espacio — más código, menos memoria.",
    hints: [
      "¿Qué subarray es nums[k:] y qué es nums[:k]? ¿En qué orden los concatenas?",
      "Si k es mayor que la longitud del array, solo importa k % len(nums).",
      "Un array vacío o k = 0 devuelven el array tal cual.",
    ],
    tests: [
      { name: "rotación de 2", args: [[1, 2, 3, 4, 5], 2], expected: [3, 4, 5, 1, 2] },
      { name: "k mayor que n", args: [[1, 2, 3], 4], expected: [2, 3, 1] },
      { name: "k = 0", args: [[1], 0], expected: [1] },
      { name: "dos elementos (oculto)", args: [[1, 2], 3], expected: [2, 1], hidden: true },
    ],
  },
  {
    id: "max-subarray-sum",
    chapter: "arrays",
    title: "Subarray de suma máxima",
    difficulty: "medio",
    blurb: "Devuelve la mayor suma de un subarray CONTIGUO (al menos un elemento). Es el clásico algoritmo de Kadane.",
    setupCode: `def max_subarray_sum(nums):
    """Mayor suma de un subarray contiguo (al menos un elemento)."""
    pass

_target = max_subarray_sum`,
    starterCode: `def max_subarray_sum(nums):
    # TODO: implementa Kadane
    pass`,
    solutionCode: `def max_subarray_sum(nums):
    mejor = actual = nums[0]
    for x in nums[1:]:
        actual = max(x, actual + x)
        mejor = max(mejor, actual)
    return mejor`,
    explanation:
      "En cada elemento decides: ¿extiendo la racha actual o empiezo de nuevo desde aquí? max(x, actual + x) — si lo acumulado es un lastre, mejor soltarlo. O(n) tiempo, O(1) espacio: la DP más compacta del libro (la misma forma del cap. 12).",
    tradeoff:
      "La fuerza bruta con todos los (i, j) cuesta O(n²) (o con sumas por prefijo O(n²)). Kadane exige «al menos un elemento» — por eso arranca con nums[0] y no con 0: con todo negativo ([−3, −1, −2]) la respuesta es −1, no 0: el mayor elemento sobrevive solo.",
    hints: [
      "Guarda dos cosas: la mejor suma VISTA y la mejor suma TERMINANDO aquí.",
      "La mejor suma terminando en x es max(x, mejor_que_termina_antes + x).",
      "Todo negativo es un caso legal: la respuesta es el mayor elemento, no 0.",
    ],
    tests: [
      { name: "clásico", args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { name: "un solo elemento", args: [[1]], expected: 1 },
      { name: "todo negativo", args: [[-3, -1, -2]], expected: -1 },
      { name: "positivos al final (oculto)", args: [[5, 4, -1, 7, 8]], expected: 23, hidden: true },
    ],
  },
  {
    id: "char-frequency",
    chapter: "hash-tables",
    title: "Frecuencia de caracteres",
    difficulty: "fácil",
    blurb: "Dada una cadena, devuelve un diccionario {carácter: cantidad de apariciones}.",
    setupCode: `def char_frequency(s):
    """Devuelve {carácter: nº de apariciones}."""
    pass

_target = char_frequency`,
    starterCode: `def char_frequency(s):
    # TODO: construye el diccionario de frecuencias
    pass`,
    solutionCode: `def char_frequency(s):
    d = {}
    for ch in s:
        d[ch] = d.get(ch, 0) + 1
    return d`,
    explanation:
      "El patrón «d[ch] = d.get(ch, 0) + 1» es EL uso básico de la tabla hash: espacio para recordar lo que ya viste. Convertirlo en d.setdefault, defaultdict(int) o collections.Counter no cambia la esencia: una pasada O(n) con consultas O(1).",
    tradeoff:
      "¿Por qué hash y no array indexado por ord(ch)? El array de 128/256 casillas es MÁS rápida en la práctica para alfabetos pequeños… pero con Unicode solo queda el diccionario. El hash compra generalidad; el array compra velocidad puntual.",
    hints: [
      "¿Qué estructura devuelve «cuántas veces vi esto» en una sola pasada?",
      "d.get(ch, 0) te da el contador actual incluso si ch es nuevo.",
      "Una cadena vacía devuelve el dict vacío {}.",
    ],
    tests: [
      { name: "banana", args: ["banana"], expected: { a: 3, b: 1, n: 2 } },
      { name: "dos letras", args: ["ab"], expected: { a: 1, b: 1 } },
      { name: "cadena vacía", args: [""], expected: {} },
      { name: "mississippi (oculto)", args: ["mississippi"], expected: { m: 1, i: 4, s: 4, p: 2 }, hidden: true },
    ],
  },
  {
    id: "first-unique-char",
    chapter: "hash-tables",
    title: "Primer carácter sin repetir",
    difficulty: "medio",
    blurb: "Devuelve el ÍNDICE del primer carácter que aparece una sola vez en la cadena; si no existe, −1.",
    setupCode: `def first_unique_char(s):
    """Índice del primer carácter único, o -1 si no hay."""
    pass

_target = first_unique_char`,
    starterCode: `def first_unique_char(s):
    # TODO: dos pasadas y un diccionario
    pass`,
    solutionCode: `def first_unique_char(s):
    cuenta = {}
    for ch in s:
        cuenta[ch] = cuenta.get(ch, 0) + 1
    for i, ch in enumerate(s):
        if cuenta[ch] == 1:
            return i
    return -1`,
    explanation:
      "Fase 1 (hash): contar. Fase 2: RECORRER EN ORDEN y devolver el primero con cuenta 1. El orden original es información que el diccionario PIERDE — por eso el segundo barrido vuelve a caminar la cadena.",
    tradeoff:
      "Con un solo barrido + lista de «primeras posiciones» también se puede, pero la versión a dos pasadas es la estándar: O(n). La variante sin espacio extra (comparar cada carácter con el resto) cuesta O(n²): con 100.000 caracteres es la diferencia entre «vuela» y «se muere».",
    hints: [
      "Primero cuenta TODO; después camina en orden buscando cuenta == 1.",
      "Un dict de frecuencias + un segundo for con enumerate resuelven en dos pasadas.",
      "Si ninguna cuenta vale 1, devuelve -1.",
    ],
    tests: [
      { name: "abracadabra", args: ["abracadabra"], expected: 4 },
      { name: "aabcdb", args: ["aabcdb"], expected: 2 },
      { name: "todo repetido", args: ["aaa"], expected: -1 },
      { name: "primera letra (oculto)", args: ["leetcode"], expected: 0, hidden: true },
    ],
  },
  {
    id: "group-anagrams",
    chapter: "hash-tables",
    title: "Anagramas agrupados",
    difficulty: "difícil",
    blurb: "Agrupa palabras que son anagramas entre sí. Cada grupo va ordenado alfabéticamente y los grupos, por su primer elemento: ver el test de ejemplo.",
    setupCode: `def group_anagrams(words):
    """Devuelve listas de grupos; cada grupo y la lista de grupos ordenados."""
    pass

_target = group_anagrams`,
    starterCode: `def group_anagrams(words):
    # TODO: una clave canónica por grupo de anagramas
    pass`,
    solutionCode: `def group_anagrams(words):
    d = {}
    for w in words:
        clave = "".join(sorted(w))
        d.setdefault(clave, []).append(w)
    grupos = [sorted(g) for g in d.values()]
    grupos.sort()
    return grupos`,
    explanation:
      "Dos palabras son anagramas ⇔ sus letras ordenadas son IDÉNTICAS: esa cadena ordenada es la «clave canónica» que manda a la misma cubeta del diccionario. El hash convierte el problema de comparar pares O(n²·k log k) en una pasada O(n·k log k).",
    tradeoff:
      "La clave alternativa —un contador de 26 letras convertido en tuple— evita ordenar cada palabra (O(k) vs O(k log k) por palabra) pero genera claves más torpes y grandes; con k pequeño gana por sorted. El orden de salida exige el doble sort final: el orden determinista es parte del contrato (determinista para los tests).",
    hints: [
      "¿Qué transformación da lo mismo para «tea» y para «eat»?",
      "Ordem las letras de cada palabra y úsala como clave de un dict de listas.",
      "Al final: cada grupo con sorted() y la lista de grupos con sort().",
    ],
    tests: [
      { name: "clásico", args: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]] },
      { name: "una cadena vacía", args: [[""]], expected: [[""]] },
      { name: "una palabra", args: [["a"]], expected: [["a"]] },
      { name: "un solo grupo (oculto)", args: [["abc", "cba", "bac"]], expected: [["abc", "bac", "cba"]], hidden: true },
    ],
  },
  {
    id: "binary-search",
    chapter: "search",
    title: "Búsqueda binaria",
    difficulty: "fácil",
    blurb: "En un array ordenado ascendente SIN duplicados, devuelve el índice del objetivo o −1 si no está. Implementa la binaria clásica.",
    setupCode: `def binary_search(nums, target):
    """Índice de target en nums (ordenado, sin duplicados) o -1."""
    pass

_target = binary_search`,
    starterCode: `def binary_search(nums, target):
    # TODO: lo, hi y el corte de la mitad
    pass`,
    solutionCode: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    explanation:
      "Cada comparación descarta la MITAD del rango: T(n) = T(n/2) + O(1) → O(log n). El invariante «target ∈ nums[lo..hi] o no existe» es lo único que importa — los detalles (<= vs <, mid±1) se acoplan a él.",
    tradeoff:
      "Existe la recursiva (misma lógica, O(log n) de pila extra) y el módulo bisect de la librería. El caso peor y el medio son O(log n) SIEMPRE: comparado con la lineal (O(n)), en 1.000.000 elementos es 20 comparaciones contra un millón. La condición: el array DEBE estar ordenado — ordenar para buscar una vez no compensa; ordenar para buscar MIL veces sí.",
    hints: [
      "lo = 0, hi = len-1; mientras lo <= hi sigues buscando.",
      "mid = (lo + hi) // 2; compara nums[mid] con target y descarta UNA mitad.",
      "Si sales del while sin encontrar, la respuesta es -1.",
    ],
    tests: [
      { name: "centro", args: [[1, 3, 5, 7, 9], 7], expected: 3 },
      { name: "ausente", args: [[1, 2, 3], 0], expected: -1 },
      { name: "un elemento", args: [[1], 1], expected: 0 },
      { name: "extremo derecho (oculto)", args: [[2, 4, 6, 8, 10, 12], 12], expected: 5, hidden: true },
    ],
  },
  {
    id: "search-insert-position",
    chapter: "search",
    title: "Posición de inserción",
    difficulty: "medio",
    blurb: "En un array ordenado, devuelve el índice donde target debería insertarse para mantenerlo ordenado (o su índice si ya existe). Es el lower bound.",
    setupCode: `def search_insert_position(nums, target):
    """Índice de target, o donde se insertaría."""
    pass

_target = search_insert_position`,
    starterCode: `def search_insert_position(nums, target):
    # TODO: lower bound con búsqueda binaria
    pass`,
    solutionCode: `def search_insert_position(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
    explanation:
      "El «lower bound»: el PRIMER índice cuyo valor no es menor que target. A diferencia de la binaria clásica, no se para al encontrar — se sigue contrayendo hasta que lo == hi: el rango se cierra alrededor del punto de inserción.",
    tradeoff:
      "Devolver el primero-si-hay-duplicados vs el último cambia el invariante (lo<hi vs lo<=hi) — la librería los llama bisect_left y bisect_right. Es O(log n) igual que la búsqueda de existencia; el coste diferencial es de DISEÑO, no de orden.",
    hints: [
      "hi empieza en len(nums) — la respuesta puede estar al final.",
      "Mientras nums[mid] < target, todo lo de la izquierda está descartado: lo = mid + 1.",
      "Cuando lo == hi, ese índice es la respuesta (sin siquiera mirar el valor).",
    ],
    tests: [
      { name: "presente", args: [[1, 3, 5, 6], 5], expected: 2 },
      { name: "entre medias", args: [[1, 3, 5, 6], 2], expected: 1 },
      { name: "al final", args: [[1, 3, 5, 6], 7], expected: 4 },
      { name: "antes de todos (oculto)", args: [[10], 5], expected: 0, hidden: true },
    ],
  },
  {
    id: "sqrt-int",
    chapter: "search",
    title: "Raíz cuadrada entera",
    difficulty: "medio",
    blurb: "Devuelve floor(√x) sin usar librería de matemáticas: 8 → 2, 16 → 4. Búsqueda binaria sobre la respuesta.",
    setupCode: `def my_sqrt(x):
    """floor(sqrt(x)) sin librerías, x >= 0."""
    pass

_target = my_sqrt`,
    starterCode: `def my_sqrt(x):
    # TODO: búsqueda binaria sobre la RESPUESTA
    pass`,
    solutionCode: `def my_sqrt(x):
    if x < 2:
        return x
    lo, hi, ans = 1, x, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`,
    explanation:
      "La respuesta vive en [0, x] y «mid² ≤ x» es una condición MONÓTONA: a la derecha de la raíz todo falla, a la izquierda todo pasa. Eso la convierte en una búsqueda binaria — la misma estructura del capítulo sobre el espacio de respuestas, no de elementos.",
    tradeoff:
      "El bucle lineal (probar i = 1, 2, 3…) es O(√x) — con x = 10⁹ son 31.623 pasos contra ~30 de la binaria; con x = 10¹⁸ la brecha son 10⁹ contra 60. Por eso sqrt es el ejemplo canónico de «binarizar la respuesta». El método de Newton converge aún más rápido (cuadrático) pero es más delicado de programar.",
    hints: [
      "Busca en el rango [0, x] el ÚLTIMO mid cuyo cuadrado ≤ x.",
      "Si mid² ≤ x, recuerda mid (ans) y sube: lo = mid + 1.",
      "x < 2 es caso directo (0 → 0, 1 → 1).",
    ],
    tests: [
      { name: "imperfecto", args: [8], expected: 2 },
      { name: "perfecto", args: [16], expected: 4 },
      { name: "cero", args: [0], expected: 0 },
      { name: "casi int-max (oculto)", args: [2147483647], expected: 46340, hidden: true },
    ],
  },
  {
    id: "count-inversions",
    chapter: "sorting",
    title: "Contar inversiones",
    difficulty: "medio",
    blurb: "Una inversión es un par (i, j) con i < j y nums[i] > nums[j]. Devuelve cuántas hay: mide en cuánto se está el array de estar ordenado.",
    setupCode: `def count_inversions(nums):
    """Número de pares i < j con nums[i] > nums[j]."""
    pass

_target = count_inversions`,
    starterCode: `def count_inversions(nums):
    # TODO: doble bucle primero; ¿te atreves con merge-sort?
    pass`,
    solutionCode: `def count_inversions(nums):
    total = 0
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] > nums[j]:
                total += 1
    return total`,
    explanation:
      "Cada par fuera de orden es una «mala» comparación que el ordenamiento tendrá que arreglar. El doble bucle cuenta en O(n²); la versión docta cuenta durante el MERGE de mergesort, en O(n log n): al fusionar, si sale el elemento de la DERECHA, ganó sobre todos los restantes de la izquierda — júntalos de golpe.",
    tradeoff:
      "O(n²) frente a O(n log n) es el tema entero del capítulo: el doble bucle es la versión «entendible», el merge la «escalable» (necesaria con n ~ 10⁵). La lección: primero la versión entendible y, cuando los datos crecen, la escalable SIN cambiar la respuesta.",
    hints: [
      "Empieza con el doble bucle: para cada i, cuántos j > i tienen nums[j] < nums[i]?",
      "Array ya ordenado → 0 inversiones; invertido completo → n(n-1)/2.",
      "La versión pro: cuenta durante el merge (cada vez que tomas de la DERECHA, sumas lo que queda de la izquierda).",
    ],
    tests: [
      { name: "tres inversiones", args: [[2, 4, 1, 3]], expected: 3 },
      { name: "ya ordenado", args: [[1, 2, 3]], expected: 0 },
      { name: "totalmente invertido", args: [[3, 2, 1]], expected: 3 },
      { name: "cinco elementos (oculto)", args: [[5, 3, 4, 2, 1]], expected: 9, hidden: true },
    ],
  },
  {
    id: "sort-by-frequency",
    chapter: "sorting",
    title: "Ordenar por frecuencia",
    difficulty: "medio",
    blurb: "Ordena los números de más frecuente a menos frecuente; a igual frecuencia, de menor a mayor. [2,3,1,2,3,3] → [3,3,3,2,2,1].",
    setupCode: `def sort_by_frequency(nums):
    """Ordena por (-frecuencia, valor)."""
    pass

_target = sort_by_frequency`,
    starterCode: `def sort_by_frequency(nums):
    # TODO: cuenta con un dict y ordena con una clave compuesta
    pass`,
    solutionCode: `def sort_by_frequency(nums):
    cuenta = {}
    for x in nums:
        cuenta[x] = cuenta.get(x, 0) + 1
    return sorted(nums, key=lambda v: (-cuenta[v], v))`,
    explanation:
      "Un diccionario de frecuencias + una clave de ordenación COMPUESTA (−cuenta, valor). Python ordena estable: la clave hace todo el trabajo. Es la reunión de los caps. 3 (contar) y 5 (ordenar) en un solo comando.",
    tradeoff:
      "El mismo resultado sale con el bucket sort: agrupa por frecuencia en listas y lee de mayor a menor — O(n) frente al O(n log n) del sort, a cambio de más código y un caso peor en frecuencias dispersas. La clave compuesta es la apuesta práctica: una línea y determinista.",
    hints: [
      "Primero construye el dict de frecuencias como en «first-unique-char».",
      "sorted(nums, key=…): la clave debe poner la frecuencia más alta primero.",
      "Devuelve −cuenta como primer término y el valor como desempate.",
    ],
    tests: [
      { name: "tres treses", args: [[2, 3, 1, 2, 3, 3]], expected: [3, 3, 3, 2, 2, 1] },
      { name: "empate entre 4 y 5", args: [[5, 5, 4, 6, 4]], expected: [4, 4, 5, 5, 6] },
      { name: "un elemento", args: [[1]], expected: [1] },
      { name: "empates triples (oculto)", args: [[7, 7, 7, 1, 1, 2]], expected: [7, 7, 7, 1, 1, 2], hidden: true },
    ],
  },
  {
    id: "longest-common-prefix",
    chapter: "strings",
    title: "Prefijo común más largo",
    difficulty: "fácil",
    blurb: "Devuelve el prefijo más largo que comparten todas las cadenas: de casa, cascada y carne sale ca. Con lista vacía, la cadena vacía.",
    setupCode: `def longest_common_prefix(words):
    """Prefijo común de todas las cadenas, "" si no hay."""
    pass

_target = longest_common_prefix`,
    starterCode: `def longest_common_prefix(words):
    # TODO: parte de la primera y recorta
    pass`,
    solutionCode: `def longest_common_prefix(words):
    if not words:
        return ""
    prefijo = words[0]
    for w in words[1:]:
        while not w.startswith(prefijo):
            prefijo = prefijo[:-1]
            if not prefijo:
                return ""
    return prefijo`,
    explanation:
      "El prefijo vivo SÓLO puede encogerse: parte de la primera palabra y recorta por la derecha hasta que todas lo contienen. O(total de caracteres revisados) — la poda del while evita comparar carácter a carácter.",
    tradeoff:
      "La versión «columna a columna» (comparar la posición j en todas las palabras) también es O(n·k) y más espacial en cadenas largas; vertical vs horizontal es un detalle de caché, no de orden. El caso lista vacía y el prefijo vacío son las dos entradas que se comen las soluciones descuidadas.",
    hints: [
      "El prefijo nunca crece: solo puede recortarse.",
      "startswith te dice si la palabra contiene el prefijo actual.",
      "Lista vacía → \"\"; una sola palabra → ella misma.",
    ],
    tests: [
      { name: "tres palabras", args: [["casa", "cascada", "carne"]], expected: "ca" },
      { name: "una palabra", args: [["solo"]], expected: "solo" },
      { name: "nada común", args: [["ab", "cd"]], expected: "" },
      { name: "lista vacía (oculto)", args: [[]], expected: "", hidden: true },
    ],
  },
  {
    id: "is-palindrome",
    chapter: "strings",
    title: "¿Palíndromo?",
    difficulty: "fácil",
    blurb: "Ignorando minúsculas/mayúsculas y todo lo que no sea letra o número, ¿se lee igual al derecho y al revés?",
    setupCode: `def is_palindrome(text):
    """True si text es palíndromo ignorando no alfanuméricos y mayúsculas."""
    pass

_target = is_palindrome`,
    starterCode: `def is_palindrome(text):
    # TODO: normaliza y compara con su reverso
    pass`,
    solutionCode: `def is_palindrome(text):
    limpio = [c.lower() for c in text if c.isalnum()]
    return limpio == limpio[::-1]`,
    explanation:
      "Normalizar (minúsculas + solo alfanuméricos) y comparar con el reverso: O(n) tiempo, O(n) espacio. La comparación de DOBLES pointers (dos índices hacia el centro, saltándose el ruido) consigue O(1) extra — mismo resultado, menos memoria.",
    tradeoff:
      "El doble pointer evita copiar la cadena (O(1) extra) y es la versión que piden cuando la memoria es límite; la copia es más legible. El caso «0P» (falso: '0'≠'p') y las cadenas de solo puntuación (verdadero: quedan VACÍAS) son los casos edge que deciden entrevistas.",
    hints: [
      "Primero construye la versión «limpia»: minúsculas con isalnum.",
      "Una lista y su reverso: limpio == limpio[::-1].",
      "Cuidado con «0P»: '0' y 'p' no son iguales aunque ignoren mayúsculas.",
    ],
    tests: [
      { name: "Ana lava lana", args: ["Ana lava lana"], expected: true },
      { name: "abba", args: ["abba"], expected: true },
      { name: "Hola mundo", args: ["Hola mundo"], expected: false },
      { name: "trampa 0P (oculto)", args: ["0P"], expected: false, hidden: true },
    ],
  },
  {
    id: "count-occurrences",
    chapter: "strings",
    title: "Apariciones con solape",
    difficulty: "medio",
    blurb: "Cuenta cuántas veces aparece pattern dentro de text, PERMITIENDO solapes: «aaaa» contiene «aa» 3 veces, no 2.",
    setupCode: `def count_occurrences(text, pattern):
    """Número de apariciones de pattern en text (con solapes)."""
    pass

_target = count_occurrences`,
    starterCode: `def count_occurrences(text, pattern):
    # TODO: find + un salto de UN carácter para permitir solapes
    pass`,
    solutionCode: `def count_occurrences(text, pattern):
    if not pattern:
        return 0
    total = 0
    i = 0
    while True:
        idx = text.find(pattern, i)
        if idx < 0:
            return total
        total += 1
        i = idx + 1`,
    explanation:
      "find lleva a la siguiente aparición; el salto de UN carácter (i = idx + 1, no len(pattern)) es lo que PERMITE el solape. El bucle completo cuesta O(n·m) en el peor caso — el famoso algoritmo KMP del capítulo lo baja a O(n + m) precalculando prefijos.",
    tradeoff:
      "Sin solape, el salto es i = idx + len(pattern) y el método str.count de Python ya lo resuelve. El costo del naive es aceptable para textos normales; para el peor patrón («aaaa…» contra «aaa…a») el KMP gana por diseño — recuerda el tradeoff del cap. 6.",
    hints: [
      "text.find(pattern, start) devuelve la posición o -1.",
      "Para permitir solapes, avanza un solo carácter tras cada hallazgo.",
      "Patrón vacío: define tú la respuesta (aquí 0).",
    ],
    tests: [
      { name: "solape máximo", args: ["aaaa", "aa"], expected: 3 },
      { name: "sin solape", args: ["abcabc", "abc"], expected: 2 },
      { name: "ausente", args: ["hola", "adios"], expected: 0 },
      { name: "solape intercalado (oculto)", args: ["ababa", "aba"], expected: 2, hidden: true },
    ],
  },
  {
    id: "transpose",
    chapter: "matrices",
    title: "Transponer una matriz",
    difficulty: "fácil",
    blurb: "Intercambia filas por columnas: la entrada es una lista de filas (todas del mismo largo), la salida su transpuesta. Te servirá zip(*matrix) y la indexación del cap. 7.",
    setupCode: `def transpose(matrix):
    """Devuelve la matriz transpuesta como lista de filas."""
    pass

_target = transpose`,
    starterCode: `def transpose(matrix):
    # TODO: filas ↔ columnas
    pass`,
    solutionCode: `def transpose(matrix):
    if not matrix:
        return []
    return [list(col) for col in zip(*matrix)]`,
    explanation:
      "pos(i, j) = i·C + j ↔ pos(j, i) = j·R + i — el capítulo 7 enseñó que la matriz vive en memoria plana y la transposición es el PRECIO de ese layout: lectura por columnas rompe la caché (el «sin transponer» es un bucle de novato al que la caché mata). zip(*matrix) hace el truco en una línea.",
    tradeoff:
      "Sin zip (con dobles bucles y listas explícitas) sería O(R·C) igual — la diferencia es de legibilidad. Para matrices enormes en NumPy, .T es VISTA (O(1) en memoria); en listas puras la transposición copia todo (O(R·C)).",
    hints: [
      "La fila i de la salida toma la columna i de la entrada.",
      "zip(*matrix) agrupa por columnas — solo convierte cada tupla en lista.",
      "Matriz vacía → lista vacía.",
    ],
    tests: [
      { name: "cuadrada", args: [[[1, 2], [3, 4]]], expected: [[1, 3], [2, 4]] },
      { name: "rectangular", args: [[[1, 2, 3], [4, 5, 6]]], expected: [[1, 4], [2, 5], [3, 6]] },
      { name: "una celda", args: [[[7]]], expected: [[7]] },
      { name: "3x2 (oculto)", args: [[[1, 2], [3, 4], [5, 6]]], expected: [[1, 3, 5], [2, 4, 6]], hidden: true },
    ],
  },
  {
    id: "diagonal-difference",
    chapter: "matrices",
    title: "Diferencia de diagonales",
    difficulty: "fácil",
    blurb: "En una matriz cuadrada devuelve el valor absoluto de (suma de la diagonal principal − suma de la anti-diagonal).",
    setupCode: `def diagonal_difference(matrix):
    """|diag principal - anti-diagonal| de una matriz cuadrada."""
    pass

_target = diagonal_difference`,
    starterCode: `def diagonal_difference(matrix):
    # TODO: dos sumas y un valor absoluto
    pass`,
    solutionCode: `def diagonal_difference(matrix):
    n = len(matrix)
    d1 = sum(matrix[i][i] for i in range(n))
    d2 = sum(matrix[i][n - 1 - i] for i in range(n))
    return abs(d1 - d2)`,
    explanation:
      "La diagonal principal vive en (i, i); la anti en (i, n−1−i) — dos fórmulas de indexación del cap. 7 convertidas en un abs(). O(n) frente a las n² celdas: las diagonales son la parte BARATA de la matriz.",
    tradeoff:
      "Recorrer la matriz entera buscando las celdas «de las diagonales» también funciona pero confunde el diseño con el barrido; la aritmética de índices es O(n) y no visita nada innecesario: con n = 10.000 son 100 millones de celdas frente a 20.000 de las diagonales.",
    hints: [
      "Principal: matrix[i][i] con la misma i.",
      "Anti-diagonal: la columna es n - 1 - i.",
      "abs() al final y devuelve el valor.",
    ],
    tests: [
      { name: "clásico", args: [[[11, 2, 4], [4, 5, 6], [10, 8, -12]]], expected: 15 },
      { name: "equilibrado", args: [[[1, 2], [3, 4]]], expected: 0 },
      { name: "una celda", args: [[[5]]], expected: 0 },
      { name: "con negativos (oculto)", args: [[[-1, 1], [1, -1]]], expected: 2, hidden: true },
    ],
  },
  {
    id: "zero-out",
    chapter: "matrices",
    title: "Poner filas y columnas a cero",
    difficulty: "difícil",
    blurb: "Si una celda vale 0, su FILA ENTERA y su COLUMNA ENTERA pasan a 0. Devuelve la matriz resultante (no modifiques la entrada).",
    setupCode: `def zero_out(matrix):
    """Cada celda que contiene 0 apaga su fila y columna; devuelve nueva matriz."""
    pass

_target = zero_out`,
    starterCode: `def zero_out(matrix):
    # TODO: primero localiza los ceros; después construye la salida
    pass`,
    solutionCode: `def zero_out(matrix):
    filas, cols = set(), set()
    for i, fila in enumerate(matrix):
        for j, v in enumerate(fila):
            if v == 0:
                filas.add(i)
                cols.add(j)
    return [
        [0 if (i in filas or j in cols) else v for j, v in enumerate(fila)]
        for i, fila in enumerate(matrix)
    ]`,
    explanation:
      "El orden manda: si pones ceros DURANTE la primera pasada, un cero recién creado contamina sus vecinos y toda la matriz acaba en ceros. Se buscan los ceros PRIMERO (dos sets O(R + C) de memoria) y se construye la salida DESPUÉS.",
    tradeoff:
      "El derecho a memoria: guardar sets cuesta O(R + C); la variante O(1) usa la primera fila y la primera columna como registro vivo en vez de sets (clásico de entrevista, más código). La fuerza bruta O(R·C) de re-check por celda explota en matrices grandes.",
    hints: [
      "Si pones ceros al vuelo, los ceros nuevos generan más ceros: primero RECOGE, después convierte.",
      "Dos sets: filas que contienen un 0 y columnas que contienen un 0.",
      "Al escribir la salida, una celda vale 0 si su fila o su columna está en los sets.",
    ],
    tests: [
      { name: "cero central", args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
      { name: "cero en esquina", args: [[[0, 2], [3, 4]]], expected: [[0, 0], [0, 4]] },
      { name: "sin ceros", args: [[[1, 2], [4, 5]]], expected: [[1, 2], [4, 5]] },
      { name: "dos ceros (oculto)", args: [[[1, 0], [0, 4]]], expected: [[0, 0], [0, 0]], hidden: true },
    ],
  },
  {
    id: "merge-sorted-lists",
    chapter: "linked-lists",
    title: "Fusionar listas ordenadas",
    difficulty: "medio",
    blurb: "Dadas dos listas (representadas por arrays) ya ordenadas, devuelve su fusión ordenada en O(n + m) — la operación estrella del cap. 8 y el corazón de mergesort.",
    setupCode: `def merge_lists(a, b):
    """Fusión de dos listas ordenadas (arrays)."""
    pass

_target = merge_lists`,
    starterCode: `def merge_lists(a, b):
    # TODO: dos punteros, un resultado
    pass`,
    solutionCode: `def merge_lists(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out`,
    explanation:
      "Dos punteros, uno por cada lista; en cada paso «gana» el menor y su puntero avanza. Al agotarse una, el resto de la otra ya está ordenado: se ENGANCHA entero (con extend): en la lista real, enganchar el tail no es copiar nodos, es reasignar un puntero.",
    tradeoff:
      "Concatenar + sort es O((n+m) log(n+m)): desecha el orden que ya tenías. La fusión lineal O(n+m) es la mitad del CAPÍTULO de mergesort: el sort recursivo por encima + esta fusión por debajo. El «<=» en la comparación mantiene la ESTABILIDAD — con empates, el de a sale antes.",
    hints: [
      "i y j avanzan solo cuando SU_LISTA aporta el elemento ganador.",
      "Cuando una lista se acaba, ¿qué queda por hacer? (no compares: engánchala).",
      "El «<=» mantiene la estabilidad: en empates, gana a[i].",
    ],
    tests: [
      { name: "entrelazadas", args: [[[1, 2, 4], [1, 3, 4]]], expected: [1, 1, 2, 3, 4, 4] },
      { name: "ambas vacías", args: [[], []], expected: [] },
      { name: "una vacía", args: [[], [0]], expected: [0] },
      { name: "largo desigual (oculto)", args: [[[5], [1, 2, 3, 4, 6]]], expected: [1, 2, 3, 4, 5, 6], hidden: true },
    ],
  },
  {
    id: "remove-duplicates-sorted",
    chapter: "linked-lists",
    title: "Desduplicar lista ordenada",
    difficulty: "fácil",
    blurb: "En una lista ORDENADA (array), elimina los duplicados de modo que cada valor quede una vez; devuelve la lista nueva. En la lista enlazada real es un solo puntero sobre el nodo actual.",
    setupCode: `def remove_duplicates(values):
    """Quedarse con la primera aparición de cada valor (lista ya ordenada)."""
    pass

_target = remove_duplicates`,
    starterCode: `def remove_duplicates(values):
    # TODO: un solo recorrido, comparando con lo último guardado
    pass`,
    solutionCode: `def remove_duplicates(values):
    if not values:
        return []
    out = [values[0]]
    for v in values[1:]:
        if v != out[-1]:
            out.append(v)
    return out`,
    explanation:
      "Como está ordenada, los duplicados están ADYACENTES: basta comparar con el último guardado. En la lista enlazada real es el bucle `if cur.val == cur.next.val: cur.next = cur.next.next` — la cirugía de punteros del cap. 8 hecha función.",
    tradeoff:
      "set(…) + sort resolvería pero paga O(n log n) para tirar el orden que ya tenía. La comparación con el vecino es O(n) y en sitio con un solo puntero — la lección de «aprovecha la ordenación»: si el array NO estuviera ordenado, esto ya no vale y necesitarías el set.",
    hints: [
      "Por estar ordenada, los duplicados quedan adyacentes.",
      "Guarda el primer valor; añade solo los distintos al último guardado.",
      "Lista vacía: [] de vuelta.",
    ],
    tests: [
      { name: "con repetidos", args: [[1, 1, 2, 3, 3]], expected: [1, 2, 3] },
      { name: "todo igual", args: [[5, 5, 5]], expected: [5] },
      { name: "vacía", args: [[]], expected: [] },
      { name: "sin duplicados (oculto)", args: [[1, 2]], expected: [1, 2], hidden: true },
    ],
  },
  {
    id: "find-duplicate",
    chapter: "linked-lists",
    title: "El duplicado (Floyd)",
    difficulty: "difícil",
    blurb: "Array de n+1 enteros entre 1 y n con al menos un repetido: devuelve el duplicado SIN espacio extra (trátala como lista enlazada: el índice i apunta al nodo nums[i]).",
    setupCode: `def find_duplicate(nums):
    """El valor repetido, por el algoritmo de la liebre y la tortuga."""
    pass

_target = find_duplicate`,
    starterCode: `def find_duplicate(nums):
    # TODO: nums[i] = «siguiente nodo»; detecta el ciclo con Floyd
    pass`,
    solutionCode: `def find_duplicate(nums):
    lento = nums[0]
    rapido = nums[nums[0]]
    while lento != rapido:
        lento = nums[lento]
        rapido = nums[nums[rapido]]
    lento = 0
    while lento != rapido:
        lento = nums[lento]
        rapido = nums[rapido]
    return lento`,
    explanation:
      "Al interpretar cada índice como puntero hacia nums[i], la secuencia forma una lista con CICLO (dos índices apuntan al duplicado) — exactamente la geometría del cap. 8. Floyd: fase 1 los hace correr a velocidades distintas hasta cruzarse dentro del ciclo; fase 2 reinicia a la tortuga en el índice 0 y ambos avanzan un paso — se reencuentran en la ENTRADA del ciclo, que es el duplicado. O(n) tiempo, O(1) espacio.",
    tradeoff:
      "Un set dictaría el repetido en O(n) pero con O(n) de memoria — aquí el reto es NO gastarla. Ordenar y comparar vecinos cuesta O(n log n) y TRASTORNA el array. Floyd es la única respuesta O(n) tiempo / O(1) espacio — la prueba de que los punteros son más potentes que los contenedores.",
    hints: [
      "Piensa en la secuencia 0 → nums[0] → nums[nums[0]] → …: si hay duplicado, hay ciclo.",
      "Fase 1: lento da un paso, rapido da dos; se cruzan DENTRO del ciclo.",
      "Fase 2: reinicia uno al índice 0 y avanza AMBOS un paso — se reencuentran EN LA ENTRADA del ciclo: el duplicado.",
    ],
    tests: [
      { name: "duplicado al final", args: [[1, 3, 4, 2, 2]], expected: 2 },
      { name: "duplicado medio", args: [[3, 1, 3, 4, 2]], expected: 3 },
      { name: "par mínimo", args: [[1, 1]], expected: 1 },
      { name: "todo igual (oculto)", args: [[2, 2, 2, 2, 2]], expected: 2, hidden: true },
    ],
  },
  {
    id: "valid-parentheses",
    chapter: "stacks",
    title: "¿Paréntesis válidos?",
    difficulty: "fácil",
    blurb: "Una cadena únicamente con ()[]{} ¿está balanceada: cada cierre casa con el abierto más reciente y su mismo tipo? Es el ejemplo resuelto del cap. 9 en forma de problema.",
    setupCode: `def valid_parentheses(s):
    """True si la cadena está balanceada."""
    pass

_target = valid_parentheses`,
    starterCode: `def valid_parentheses(s):
    # TODO: la pila del cap. 9 resuelve esto sola
    pass`,
    solutionCode: `def valid_parentheses(s):
    pares = {")": "(", "]": "[", "}": "{"}
    pila = []
    for ch in s:
        if ch in "([{":
            pila.append(ch)
        else:
            if not pila or pila[-1] != pares[ch]:
                return False
            pila.pop()
    return not pila`,
    explanation:
      "Abre → push. Cierra → pop y comparar. Y la comprobación FINAL: la pila debe quedar VACÍA (el caso «(» sin cerrar es el que se olvida). O(n) — cada carácter entra y sale de la pila como mucho una vez.",
    tradeoff:
      "Contar APERTURAS menos CIERRES falla con «([)]»: los contadores netos cuadran pero el ORDEN rompe — solo la pila recuerda cuál abierto espera su cierre. Es la diferencia entre saber «cuántos deben» y saber «quién debe»: la pila conserva el quién.",
    hints: [
      "Un dict {cierre: apertura} te descuenta el «debe casar el tipo».",
      "Cierre con pila vacía o tope distinto → False inmediato.",
      "Devuelve not pila: los abiertos sobrantes también invalidan.",
    ],
    tests: [
      { name: "simple", args: ["()"], expected: true },
      { name: "anidado (el cap. 9)", args: ["([{}])"], expected: true },
      { name: "intercalado inválido", args: ["([)]"], expected: false },
      { name: "abierto sin cerrar (oculto)", args: ["("], expected: false, hidden: true },
    ],
  },
  {
    id: "next-greater",
    chapter: "stacks",
    title: "El siguiente mayor a la derecha",
    difficulty: "medio",
    blurb: "Para cada elemento devuelve el PRIMER valor mayor que aparece a su derecha; si no existe, −1. Con pila monótona: O(n) frente al O(n²) ingenuo.",
    setupCode: `def next_greater(nums):
    """Lista: primer mayor a la derecha de cada elemento, o -1."""
    pass

_target = next_greater`,
    starterCode: `def next_greater(nums):
    # TODO: pila monótona de índices
    pass`,
    solutionCode: `def next_greater(nums):
    out = [-1] * len(nums)
    pila = []
    for i, x in enumerate(nums):
        while pila and nums[pila[-1]] < x:
            out[pila.pop()] = x
        pila.append(i)
    return out`,
    explanation:
      "La pila guarda índices con valores aún SIN respuesta, en orden decreciente. Cuando llega un x mayor, resuelve de golpe TANTOS pendientes como supere: cada índice entra una vez y sale una vez → O(n). Es la pila del cap. 9 trabajando a la inversa: recuerda lo que espera una respuesta futura.",
    tradeoff:
      "El doble bucle es O(n²) — con n = 10⁵ son 10¹⁰ comparaciones: inviable; la pila monótona es O(n). Lo dificultoso no es el código (8 líneas) sino VER que los elementos de la pila comparten la condición «espero un mayor»: cuando la vista la detecta, media familia de problemas se vuelve pila.",
    hints: [
      "Guarda ÍNDICES, no valores: la respuesta va por posición.",
      "Un x más grande despacha (pop) a todos los índices con valor menor que x.",
      "Los que sobreviven sin despacharse se quedan con -1 (el array ya nace relleno).",
    ],
    tests: [
      { name: "clásico", args: [[1, 3, 2, 4]], expected: [3, 4, 4, -1] },
      { name: "ordena descendente", args: [[4, 3, 2, 1]], expected: [-1, -1, -1, -1] },
      { name: "un solo elemento", args: [[1]], expected: [-1] },
      { name: "ascendente (oculto)", args: [[1, 2, 3, 4]], expected: [2, 3, 4, -1], hidden: true },
    ],
  },
  {
    id: "evaluate-postfix",
    chapter: "stacks",
    title: "Evaluar expresión postfix",
    difficulty: "medio",
    blurb: "Tokens de una expresión en notación postfix (RPN), p. ej. [2, 1, +, 3, *] = 9. Devuelve el valor. La división es entera.",
    setupCode: `def evaluate_postfix(tokens):
    """Evalúa una lista de tokens postfix y devuelve el entero."""
    pass

_target = evaluate_postfix`,
    starterCode: `def evaluate_postfix(tokens):
    # TODO: operandos → pila; operador → pop pop push
    pass`,
    solutionCode: `def evaluate_postfix(tokens):
    pila = []
    for t in tokens:
        if t in "+-*/":
            b = pila.pop()
            a = pila.pop()
            if t == "+":
                pila.append(a + b)
            if t == "-":
                pila.append(a - b)
            if t == "*":
                pila.append(a * b)
            if t == "/":
                pila.append(a // b)
        else:
            pila.append(int(t))
    return pila[0]`,
    explanation:
      "Postfix no necesita paréntesis ni precedencia: el ORDEN de los tokens es la precedencia. Al ver un operador, los dos operandos son los DOS últimos que entraron: pop(pop) en orden b-luego-a (la resta y la división NO son conmutativas: el orden del pop decide si dice 5−3 o 3−5).",
    tradeoff:
      "Infix (la notación que escribe la gente) exige precedencia y paréntesis: los parsers shunting-yard construyen postfix… con LA MISMA PILA de este problema. La evaluación aquí es O(n) y sin estados ocultos; la recursión directa sobre un árbol de expresiones también funciona — esta pila es la versión plana de esa recursión.",
    hints: [
      "Operando → push. Operador → pop DOS operandos y push el resultado.",
      "El PRIMER pop es el operando derecho: cuidado con − y /.",
      "Al final queda exactamente un valor en la pila.",
    ],
    tests: [
      { name: "dos operadores", args: [["2", "1", "+", "3", "*"]], expected: 9 },
      { name: "división entera", args: [["4", "13", "5", "/"]], expected: 4 },
      { name: "resta no conmutativa", args: [["5", "3", "-"]], expected: 2 },
      { name: "un solo operador (oculto)", args: [["10", "2", "/"]], expected: 5, hidden: true },
    ],
  },
  {
    id: "sliding-window-max",
    chapter: "queues",
    title: "Máximo de cada ventana",
    difficulty: "difícil",
    blurb: "Ventana de tamaño k que avanza una posición por paso: devuelve el máximo de cada ventana. Con una deque monótona: O(n) frente al O(n·k) ingenuo.",
    setupCode: `def sliding_window_max(nums, k):
    """Lista con el máximo de cada ventana de k elementos."""
    pass

_target = sliding_window_max`,
    starterCode: `def sliding_window_max(nums, k):
    # TODO: deque de índices con candidatos a máximo
    pass`,
    solutionCode: `def sliding_window_max(nums, k):
    from collections import deque
    dq = deque()
    out = []
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out`,
    explanation:
      "La deque guarda ÍNDICES con valores en orden DECRECIENTE: el frente es el máximo de la ventana. Un x nuevo expulsa por la cola a los menores-iguales (nunca podrán ser máximos: x es más joven y más grande) y el frente se comprueba caducado (fuera de la ventana). Cada índice entra y sale una vez → O(n).",
    tradeoff:
      "Un heap maximiza rápido pero la CADUCIDAD exige expulsiones perezosas (lazy); el reescaneo de cada ventana es O(n·k). La deque es la tercera herramienta de mantenimiento de candidatos (tras la pila del cap. 9 y el heap): la diferencia pila/deque es que aquí el máximo caduca por la IZQUIERDA — y un deque se puede avanzar por ambos extremos.",
    hints: [
      "Guarda índices (para poder decidir la caducidad) y sus valores van decreciendo.",
      "x expulsa por el LADO DE ATRÁS a todo menor o igual; el frente caducado sale por el otro extremo.",
      "Escribe la respuesta cuando la ventana está completa (i >= k - 1).",
    ],
    tests: [
      { name: "clásico", args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { name: "k = 1", args: [[1], 1], expected: [1] },
      { name: "k = 2", args: [[9, 10, 9, -7, -4, 8, 7, -6], 2], expected: [10, 10, 9, -4, 8, 8, 7] },
      { name: "ventana completa (oculto)", args: [[1, 3, 1, 2, 0, 5], 3], expected: [3, 3, 2, 5], hidden: true },
    ],
  },
  {
    id: "interleave-queue",
    chapter: "queues",
    title: "Entrelazar la cola",
    difficulty: "fácil",
    blurb: "La cola (array de longitud PAR, siempre) se divide a la mitad: devuelve primero el 1º de la primera mitad, el 1º de la segunda, el 2º con el 2º… como un shuffle de dos mitades.",
    setupCode: `def interleave_queue(q):
    """Entrelaza las dos mitades: [a1..an, b1..bn] → [a1, b1, a2, b2…]."""
    pass

_target = interleave_queue`,
    starterCode: `def interleave_queue(q):
    # TODO: parte el array y entrelaza
    pass`,
    solutionCode: `def interleave_queue(q):
    mitad = len(q) // 2
    a = q[:mitad]
    b = q[mitad:]
    return [x for par in zip(a, b) for x in par]`,
    explanation:
      "Partir a la mitad y entrelazar — literalmente lo que pasa cuando dos filas se fusionan alternando turnos. zip con el patrón [x for par in zip(...) for x in par] aplana el emparejamiento en una sola lista.",
    tradeoff:
      "En una cola REAL (solo dequeue/enqueue, sin acceso por índice) el entrelazado exige sacar la primera mitad a una cola auxiliar y volver a fusionarlas alternando — O(n) igual, pero la mitad extra de memoria. Con arrays, el slicing lo hace sin cola auxiliar: el acceso por índice ES el superpoder del cap. 2.",
    hints: [
      "mitad = len(q) // 2 (longitud siempre par).",
      "zip(a, b) produce pares (a1, b1), (a2, b2)…",
      "El patrón de doble for aplana los pares en una lista única.",
    ],
    tests: [
      { name: "seis elementos", args: [[1, 2, 3, 4, 5, 6]], expected: [1, 4, 2, 5, 3, 6] },
      { name: "cuatro", args: [[10, 20, 30, 40]], expected: [10, 30, 20, 40] },
      { name: "dos", args: [[1, 2]], expected: [1, 2] },
      { name: "otro par (oculto)", args: [[1, 2, 3, 4]], expected: [1, 3, 2, 4], hidden: true },
    ],
  },
  {
    id: "fib-fast",
    chapter: "recursion",
    title: "Fibonacci sin recálculo",
    difficulty: "fácil",
    blurb: "fib(0) = 0, fib(1) = 1, fib(n) = fib(n−1) + fib(n−2). Los tests llegan hasta n = 50: la recursión ingenua del cap. 11 NO los sobreviviría — memoiza o itera.",
    setupCode: `def fib(n):
    """n-ésimo Fibonacci (fib(0)=0, fib(1)=1)."""
    pass

_target = fib`,
    starterCode: `def fib(n):
    # TODO: NO lo hagas con la recursión ingenua: memoiza o avanza con dos variables
    pass`,
    solutionCode: `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
    explanation:
      "Dos variables que avanzan juntos: en cada iteración (a, b) → (b, a + b). O(n) tiempo, O(1) espacio — y Python lo escribe sin índices: la asignación simultánea de la tupla es la firma del lenguaje. La memoización top-down llega al mismo coste a cambio de O(n) de caché (cap. 12).",
    tradeoff:
      "La recursión ingenua cuesta O(φⁿ): con n = 50 son ~12.000 millones de llamadas, ni Pyodide soporta eso. La iteración con dos variables es O(n) tiempo, O(1) espacio; si n escala a millones queda la matriz de potencias en O(log n) — pero para entrevistas, las dos variables son la respuesta limpia.",
    hints: [
      "Guarda SOLO los dos últimos: (a, b) y avanza.",
      "a, b = b, a + b — la asignación simultánea evita una variable temporal.",
      "fib(0) = 0: el bucle no gira ni una vez.",
    ],
    tests: [
      { name: "base", args: [0], expected: 0 },
      { name: "uno", args: [1], expected: 1 },
      { name: "n = 10", args: [10], expected: 55 },
      { name: "n = 50 (oculto)", args: [50], expected: 12586269025, hidden: true },
    ],
  },
  {
    id: "power-int",
    chapter: "recursion",
    title: "Potencia con exponente entero",
    difficulty: "medio",
    blurb: "base^exp con exp ≥ 0 SIN usar el operador ** (ni pow). Con base entera y exp entero: 2^10 = 1024. Bonus didáctico: la versión por cuadrados es O(log exp).",
    setupCode: `def power(base, exp):
    """base elevado a exp, exp >= 0, sin ** ni pow()."""
    pass

_target = power`,
    starterCode: `def power(base, exp):
    # TODO: multiplicar en cuadrados lo hace logarítmico
    pass`,
    solutionCode: `def power(base, exp):
    resultado = 1
    while exp > 0:
        if exp % 2 == 1:
            resultado *= base
        base *= base
        exp //= 2
    return resultado`,
    explanation:
      "Exponenciación por cuadrados: exp en binario — cada bit que vale 1 añade una multiplicación al resultado; la base se cuadra a cada paso. 8 bits en lugar de 256 vueltas: O(log exp) multiplicaciones. Es «divide y vencerás» sobre el OPERADOR, no sobre el número.",
    tradeoff:
      "El bucle lineal (multiplicar exp veces) es O(exp) multiplicaciones y suficiente para tests pequeños — pero con exp = 10⁹ explota. La recursión doble (power(b, e/2)²) consigue el mismo O(log exp) y es más natural de leer; el while es la versión iterativa del mismo truco (los bits del exponente, del más bajo al más alto).",
    hints: [
      "Observa la expansión binaria del exponente: 13 = 1101 → b · b² · b⁸.",
      "En cada paso: si exp es impar, multiplica el resultado; luego base *= base y exp //= 2.",
      "exp = 0 → devuelve 1 (el while no entra).",
    ],
    tests: [
      { name: "2^10", args: [2, 10], expected: 1024 },
      { name: "base negativa", args: [-2, 3], expected: -8 },
      { name: "exp cero", args: [5, 0], expected: 1 },
      { name: "casi 2^62 (oculto)", args: [2, 62], expected: 4611686018427387904, hidden: true },
    ],
  },
  {
    id: "digital-root",
    chapter: "recursion",
    title: "Raíz digital",
    difficulty: "fácil",
    blurb: "Suma los dígitos de n; si el resultado tiene más de un dígito, repite. 9875 → 29 → 11 → 2. La recursión del cap. 11 en su versión mini.",
    setupCode: `def digital_root(n):
    """Suma los dígitos de n recursivamente hasta un solo dígito."""
    pass

_target = digital_root`,
    starterCode: `def digital_root(n):
    # TODO: base + llamada a sí misma con el problema más pequeño
    pass`,
    solutionCode: `def digital_root(n):
    if n < 10:
        return n
    return digital_root(sum(int(c) for c in str(n)))`,
    explanation:
      "Caso base (n < 10) + caso recursivo (un problema claramente más pequeño: los dígitos de n suman menos que n para n > 9). Cada llamada es uno de los cuadros del árbol — aquí el árbol degenera en una cadena: la recursión de cola del cap. 11 (que Python no optimiza: con n de millones de dígitos sería un bucle, pero para números normales la profundidad es ~4).",
    tradeoff:
      "La fórmula cerrada existe: 1 + (n − 1) % 9 (con n > 0) — O(1) sin bucles, y es un buen «¿lo sabías?» de entrevista. La recursión educa EL PATRÓN general (base + reducción); la fórmula solo existe porque este problema tiene estructura modular — la mayoría de recursiones bonitas no la tienen.",
    hints: [
      "Caso base: un solo dígito (n < 10) se devuelve tal cual.",
      "Paso recursivo: digital_root(suma_de_dígitos(n)).",
      "sum(int(c) for c in str(n)) suma los dígitos de golpe.",
    ],
    tests: [
      { name: "9875", args: [9875], expected: 2 },
      { name: "cero", args: [0], expected: 0 },
      { name: "un dígito", args: [9], expected: 9 },
      { name: "solo unos (oculto)", args: [1000001], expected: 2, hidden: true },
    ],
  },
  {
    id: "climb-stairs",
    chapter: "dynamic-programming",
    title: "Subir la escalera",
    difficulty: "fácil",
    blurb: "Subes una escalera de n escalones dando pasos de 1 o 2. ¿De cuántas maneras distintas? Es Fibonacci disfrazado de DP.",
    setupCode: `def climb_stairs(n):
    """Nº de formas de subir n escalones con pasos de 1 o 2."""
    pass

_target = climb_stairs`,
    starterCode: `def climb_stairs(n):
    # TODO: la recurrencia es formas(n) = formas(n-1) + formas(n-2)
    pass`,
    solutionCode: `def climb_stairs(n):
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
    explanation:
      "El último salto fue de 1 (quedan n−1) o de 2 (quedan n−2): formas(n) = formas(n−1) + formas(n−2) con bases formas(0) = formas(1) = 1. Es la recurrencia de Fibonacci con las bases desplazadas: O(n) tiempo, O(1) espacio. El primer caso real de DP bottom-up del cap. 12.",
    tradeoff:
      "La recursión ingenua sería O(φⁿ): subproblemas solapados — la firma que exige DP. La tabla completa (array de n+1) es la forma explícita; las dos variables es la ventana de rodar del cap. 12 (solo mira los dos últimos). Espacio O(1) vs O(n) — gana la ventana si el problema no necesita consultar estados remotos.",
    hints: [
      "Piensa en el ÚLTIMO paso: ¿de 1 o de 2 escalones?",
      "formas(n) = formas(n-1) + formas(n-2) con formas(0) = formas(1) = 1.",
      "Con dos variables (a, b) avanzando, ni siquiera necesitas un array.",
    ],
    tests: [
      { name: "dos escalones", args: [2], expected: 2 },
      { name: "tres", args: [3], expected: 3 },
      { name: "cinco", args: [5], expected: 8 },
      { name: "n = 10 (oculto)", args: [10], expected: 89, hidden: true },
    ],
  },
  {
    id: "coin-change-min",
    chapter: "dynamic-programming",
    title: "Cambio mínimo de monedas",
    difficulty: "medio",
    blurb: "Monedas de valores dados (usables sin límite) y un total: ¿el mínimo número de monedas para pagar exactamente? Imposible → −1.",
    setupCode: `def coin_change_min(coins, amount):
    """Mínimo nº de monedas para amount; -1 si imposible."""
    pass

_target = coin_change_min`,
    starterCode: `def coin_change_min(coins, amount):
    # TODO: dp[t] = mínimo de monedas para pagar t
    pass`,
    solutionCode: `def coin_change_min(coins, amount):
    INF = float("inf")
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for t in range(1, amount + 1):
        for c in coins:
            if c <= t and dp[t - c] + 1 < dp[t]:
                dp[t] = dp[t - c] + 1
    return dp[amount] if dp[amount] != INF else -1`,
    explanation:
      "dp[t] = mínimo de monedas para pagar t. La transición: el ÚLTIMO pago fue una moneda c → dp[t] = min(dp[t−c]) + 1. Caso base dp[0] = 0 (pagar cero cuesta nada). O(amount·nº de monedas) tiempo y O(amount) memoria — la tabla de estados del cap. 12 en forma pura: el molde estado/transición/base del cap. 12 con monedas de ejemplo.",
    tradeoff:
      "El greedy (coger siempre la más grande) FALLA con monedas no-canónicas: [1, 3, 4] para 6 → greedy 4+1+1 (3 monedas); DP: 3+3 (2 monedas). La DP garantiza el óptimo porque explora TODO el último paso. La recursión + memoización llega al mismo sitio: arriba-abajo vs abajo-arriba — la misma abstracción, distinta ergonomía.",
    hints: [
      "Construye la tabla dp[0..amount] desde dp[0] = 0.",
      "Para cada total t, el ÚLTIMO pago fue una moneda c: dp[t] = 1 + dp[t-c].",
      "Todo lo que quede en «infinito» al final no es pagable → -1.",
    ],
    tests: [
      { name: "clásico", args: [[1, 2, 5], 11], expected: 3 },
      { name: "imposible", args: [[2], 3], expected: -1 },
      { name: "cero", args: [[1], 0], expected: 0 },
      { name: "pesado (oculto)", args: [[186, 419, 83, 208], 6249], expected: 20, hidden: true },
    ],
  },
  {
    id: "house-robber",
    chapter: "dynamic-programming",
    title: "Casa sin vecinos",
    difficulty: "medio",
    blurb: "Array de tesoros por casa: roba el máximo SIN robar dos casas adyacentes. [2,7,9,3,1] → 12 (2 + 9 + 1).",
    setupCode: `def house_robber(nums):
    """Máximo elemento a robar sin dos adyacentes."""
    pass

_target = house_robber`,
    starterCode: `def house_robber(nums):
    # TODO: para cada casa: robarla o no robarla
    pass`,
    solutionCode: `def house_robber(nums):
    if not nums:
        return 0
    robarlo, saltar = 0, 0
    for x in nums:
        robarlo, saltar = saltar + x, max(robarlo, saltar)
    return max(robarlo, saltar)`,
    explanation:
      "Dos estados caminan contigo: «robo ESTA casa» (vengo del mejor estado que saltó la casa previa, y le sumas x) y «no robo esta» (vengo del mejor de los dos anteriores). La transición robarlo = saltar + x, saltar = max(robarlo_viejo, saltar_viejo) y robarlo/saltar empaquetan la DP en dos variables — ventana de rodar de 2 casillas.",
    tradeoff:
      "La tabla completa (dp[i] = mejor hasta i) es la forma clara; las dos variables son la optimización de espacio cuando solo miras O(1) estados hacia atrás — la distinción explícita del cap. 12. Hay solapes entre subproblemas — por eso la DP aporta; sin ellos (subproblemas disjuntos) no estaría justificada.",
    hints: [
      "Para cada casa tienes DOS opciones: la añades (vienes de no-robar la anterior) o la saltas.",
      "Guarda dos totales: el mejor ACUMULADO si robas la casa actual y el mejor si la saltas.",
      "La respuesta es el máximo de los dos al final.",
    ],
    tests: [
      { name: "clásico", args: [[2, 7, 9, 3, 1]], expected: 12 },
      { name: "alternados", args: [[1, 2, 3, 1]], expected: 4 },
      { name: "una casa", args: [[5]], expected: 5 },
      { name: "dos y dos (oculto)", args: [[2, 1, 1, 2]], expected: 4, hidden: true },
    ],
  },
  {
    id: "max-depth-tree",
    chapter: "trees",
    title: "Profundidad del árbol",
    difficulty: "fácil",
    blurb: "El árbol llega como lista por niveles con None para huecos: los hijos del índice i son 2i+1 y 2i+2 (un None no tiene hijos). Devuelve su profundidad en niveles. [] → 0.",
    setupCode: `def max_depth_tree(level):
    """Profundidad del árbol dado por niveles (None = hueco)."""
    pass

_target = max_depth_tree`,
    starterCode: `def max_depth_tree(level):
    # TODO: recursión sobre los índices 2i+1 / 2i+2
    pass`,
    solutionCode: `def max_depth_tree(level):
    def profundidad(i):
        if i >= len(level) or level[i] is None:
            return 0
        return 1 + max(profundidad(2 * i + 1), profundidad(2 * i + 2))
    return profundidad(0)`,
    explanation:
      "La recursión camina los ÍNDICES en lugar de nodos: level[i] es None (o está fuera del rango) → 0; si no, 1 + máxima profundidad de sus dos hijos-puntero (2i+1, 2i+2). Es la recursión binaria del cap. 11 con la aritmética del heap: el array ES el árbol — el cap. 14 lo explotaba para prioridades, aquí para geometría.",
    tradeoff:
      "La profundidad es O(altura del árbol) de pila — balanceado O(log n), degenerado (cadena por un solo brazo) O(n): la misma advertencia del cap. 11. La versión iterativa con un array de pendientes (pila explícita) lo evita si el árbol es profundo… aunque los tests se quedan cortos.",
    hints: [
      "El nodo i existe si i < len(level) y level[i] no es None.",
      "profundidad(i) = 1 + max(profundidad(2i+1), profundidad(2i+2)).",
      "Lista vacía → 0; un solo nodo → 1.",
    ],
    tests: [
      { name: "tres niveles", args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { name: "vacío", args: [[]], expected: 0 },
      { name: "un nodo", args: [[1]], expected: 1 },
      { name: "hueco intermedio (oculto)", args: [[1, null, 2]], expected: 2, hidden: true },
    ],
  },
  {
    id: "preorder-from-level",
    chapter: "trees",
    title: "Preorder desde el array",
    difficulty: "medio",
    blurb: "Del mismo árbol por niveles (None = huecos, hijos de i: 2i+1/2i+2), devuelve la lista del recorrido PREORDER (raíz → izquierda → derecha, cap. 13).",
    setupCode: `def preorder_from_level(level):
    """Valores del árbol por niveles en orden preorder."""
    pass

_target = preorder_from_level`,
    starterCode: `def preorder_from_level(level):
    # TODO: append del valor ANTES de explorar los hijos
    pass`,
    solutionCode: `def preorder_from_level(level):
    out = []
    def walk(i):
        if i >= len(level) or level[i] is None:
            return
        out.append(level[i])
        walk(2 * i + 1)
        walk(2 * i + 2)
    walk(0)
    return out`,
    explanation:
      "El recorrido preorder ES el orden del DFS: el valor se ANOTA al llegar (antes de los hijos). La pila de la recursión es la contabilidad del cap. 11/13 — el walk canónico que, cambiado de sitio el append (antes / después / entre los hijos), se convierte en preorder, inorder o postorder: tres recorridos, un esqueleto.",
    tradeoff:
      "La versión iterativa con pila explícita vale lo mismo (empuja el derecho primero y el izquierdo después: la pila desapila en orden de visita) y la recursión es más clara: el caso «leer None» es el caso base natural. El recorrido completo cuesta O(n): no hay plan mejor, cada nodo se toca una vez.",
    hints: [
      "append(level[i]) ANTES de walk(2i+1) — el orden de visita define preorder.",
      "El caso base: índice fuera del array o None → return sin añadir.",
      "La lista out necesita vivir FUERA de la función interna que la rellena.",
    ],
    tests: [
      { name: "tres niveles", args: [[3, 9, 20, null, null, 15, 7]], expected: [3, 9, 20, 15, 7] },
      { name: "un nodo", args: [[1]], expected: [1] },
      { name: "vacío", args: [[]], expected: [] },
      { name: "solo rama izquierda (oculto)", args: [[5, 2, null, 1]], expected: [5, 2, 1], hidden: true },
    ],
  },
  {
    id: "k-largest",
    chapter: "heaps",
    title: "Los k mayores",
    difficulty: "medio",
    blurb: "Devuelve los k elementos mayores del array, ordenados de MAYOR a menor. Con heapq.nlargest (min-heap interno) es una línea; sin ella, un min-heap de tamaño k.",
    setupCode: `def k_largest(nums, k):
    """Los k mayores de nums, en orden descendente."""
    pass

_target = k_largest`,
    starterCode: `def k_largest(nums, k):
    # TODO: ordenar es lo fácil; ¿cómo se hace con un heap de tamaño k?
    pass`,
    solutionCode: `def k_largest(nums, k):
    import heapq
    return heapq.nlargest(k, nums)`,
    explanation:
      "heapq.nlargest mantiene un MIN-heap de tamaño k: cualquier candidato que no supere al menor del heap no entra (es la poda del cap. 14 aplicada a selección). Ese «mirar solo la mayor porción» es el truco de los k-mayores sobre flujos: O(n log k) sin guardar todo el array ordenado.",
    tradeoff:
      "sorted(nums, reverse=True)[:k] es O(n log n); el heap de tamaño k es O(n log k) — con n grande y k chico la poda gana por mucho; cuando k ≈ n, los dos convergen al sort completo.",
    hints: [
      "heapq.nlargest(k, nums) ya devuelve la lista descendente de los k mayores.",
      "El min-heap de tamaño k expulsa al más pequeño cuando el grupo supera k.",
      "Si no quieres librería: sorted(nums, reverse=True)[:k] sirve (con otro coste).",
    ],
    tests: [
      { name: "tres mayores", args: [[3, 1, 5, 12, 2, 11], 3], expected: [12, 11, 5] },
      { name: "k = len(nums)", args: [[4, 2], 2], expected: [4, 2] },
      { name: "uno", args: [[1], 1], expected: [1] },
      { name: "repetidos (oculto)", args: [[9, 9, 9], 2], expected: [9, 9], hidden: true },
    ],
  },
  {
    id: "is-max-heap",
    chapter: "heaps",
    title: "¿Es un max-heap válido?",
    difficulty: "medio",
    blurb: "Dado un array (sin huecos: el heap SIEMPRE es completo), ¿respeta el invariante del max-heap: cada padre ≥ sus hijos? Es una pasada O(n) con la aritmética del cap. 14.",
    setupCode: `def is_max_heap(a):
    """True si a cumple el invariante del max-heap."""
    pass

_target = is_max_heap`,
    starterCode: `def is_max_heap(a):
    # TODO: para cada padre, mira sus hijos en 2i+1 y 2i+2
    pass`,
    solutionCode: `def is_max_heap(a):
    n = len(a)
    for i in range(n):
        for h in (2 * i + 1, 2 * i + 2):
            if h < n and a[h] > a[i]:
                return False
    return True`,
    explanation:
      "No hay que RECONSTRUIR nada: el invariante es local (padre ≥ sus dos hijos) y basta COMPROBARLO en cada índice. La aritmética de hijos (2i+1, 2i+2) es la codificación en array del cap. 14 — el mismo código con el que sift-down decide con quién intercambia.",
    tradeoff:
      "Recursión (comprobar padre y descender) vs doble bucle iterativo: la iterativa es más barata en pila y más simple de acotar. La dirección IMPORTA: validar es O(n) (una pasada); generarlo insertando sería O(n log n) — nunca confundir comprobar con construir.",
    hints: [
      "Los hijos del índice i son 2i+1 y 2i+2 (cuidado con el alcance del array).",
      "Una sola violación padre < hijo → False inmediato.",
      "Las hojas no tienen hijos: la comprobación se cuida con h < n.",
    ],
    tests: [
      { name: "el heap del capítulo", args: [[10, 7, 9, 5, 6, 3, 8]], expected: true },
      { name: "violado en una hoja", args: [[10, 7, 9, 5, 6, 3, 11]], expected: false },
      { name: "un elemento", args: [[1]], expected: true },
      { name: "empate perfecto (oculto)", args: [[9, 4, 7, 1, 2, 6, 5, 0]], expected: true, hidden: true },
    ],
  },
  {
    id: "valid-bst-level",
    chapter: "binary-search-trees",
    title: "¿Es un BST válido?",
    difficulty: "difícil",
    blurb: "Árbol por niveles (None = huecos, hijos de i: 2i+1/2i+2). ¿Cumple el invariante del BST: todos los valores del subárbol izquierdo menores, los del derecho mayores? Ojo: no basta comparar con los hijos directos.",
    setupCode: `def is_valid_bst(level):
    """True si el árbol (por niveles) es un BST válido."""
    pass

_target = is_valid_bst`,
    starterCode: `def is_valid_bst(level):
    # TODO: validación con límites min/max que BAJAN por el árbol
    pass`,
    solutionCode: `def is_valid_bst(level):
    def valido(i, lo, hi):
        if i >= len(level) or level[i] is None:
            return True
        v = level[i]
        if not (lo < v < hi):
            return False
        return valido(2 * i + 1, lo, v) and valido(2 * i + 2, v, hi)
    return valido(0, float("-inf"), float("inf"))`,
    explanation:
      "El invariante es GLOBAL: un nieto puede violarlo sin que su padre se entere (el clásico [5,1,4,None,None,3,6]: el 3 vive bajo el 4, que es hijo DERECHO del 5, y 3 < 5 rompe el invariante). La corrección: cada nodo hereda un RANGO (lo, hi) que se estrecha al descender — la recursión arrastra los límites que el invariante exige.",
    tradeoff:
      "La alternativa elegante: recorrer inorder y comprobar que la salida es estrictamente creciente (sin duplicados) — explota la propiedad del cap. 15 con una pasada extra de memoria. Los límites viven en la pila: O(altura) de memoria, mejor que la copia del inorder O(n) en árboles profundos y desbalanceados.",
    hints: [
      "Comparar con el padre directo NO basta: los límites vienen de ANCESTROS lejanos.",
      "Raíz: (−∞, +∞); hijo izquierdo: (lo, valor_del_padre); hijo derecho: (valor_del_padre, hi).",
      "Un nodo None o fuera del array siempre es válido (es un hueco).",
    ],
    tests: [
      { name: "el árbol del capítulo", args: [[8, 3, 10, 1, 6, 14, 4, 7, 13]], expected: true },
      { name: "nieto ladrón", args: [[5, 1, 4, null, null, 3, 6]], expected: false },
      { name: "mini válido", args: [[2, 1, 3]], expected: true },
      { name: "cadena derecha (oculto)", args: [[1, null, 2]], expected: true, hidden: true },
    ],
  },
  {
    id: "autocomplete-prefix",
    chapter: "tries",
    title: "Autocompletar con prefijo",
    difficulty: "fácil",
    blurb: "Dadas unas palabras y un prefijo, devuelve las que EMPIEZAN por él, ordenadas alfabéticamente. En un trie real esta consulta cuesta prefijo + subárbol — aquí calcula el equivalente con lo que tienes.",
    setupCode: `def autocomplete_prefix(words, prefix):
    """Palabras que empiezan por prefix, ordenadas."""
    pass

_target = autocomplete_prefix`,
    starterCode: `def autocomplete_prefix(words, prefix):
    # TODO: filtro por prefijo y orden
    pass`,
    solutionCode: `def autocomplete_prefix(words, prefix):
    return sorted(w for w in words if w.startswith(prefix))`,
    explanation:
      "El contrato funcional es simple: filtrar con startswith y ordenar. La lección del trie (cap. 16) es dónde ESTÁ el atajo: con un trie, bajar por el prefijo te planta en el subárbol entero de palabras que casan — la salida sale ordenada gratis si el trie guarda hijos por orden alfabético (DFS del subárbol).",
    tradeoff:
      "El filtro en un array es O(n·k) (n palabras por prefijo de largo k); el trie natural es O(k + salida) INDEPENDIENTE del diccionario: con 1 millón de palabras es la diferencia entre «recorrerlas todas» y «bajar k escalones». Para diccionarios pequeños el array gana por simplicidad — se apuesta al trie cuando el prefijo es la consulta ESTRELLA.",
    hints: [
      "w.startswith(prefix) es el filtro.",
      "sorted() ya da el orden alfabético pedido.",
      "Ninguna palabra casada → lista vacía.",
    ],
    tests: [
      { name: "algoritmo…", args: [["algobook", "algoritmo", "arbol", "algo"], "alg"], expected: ["algo", "algobook", "algoritmo"] },
      { name: "sin coincidencias", args: [["oeste", "oslo"], "x"], expected: [] },
      { name: "todas casan", args: [["estado", "estilo"], "es"], expected: ["estado", "estilo"] },
      { name: "prefijo completo (oculto)", args: [["algo"], "algo"], expected: ["algo"], hidden: true },
    ],
  },
  {
    id: "bfs-distances",
    chapter: "graphs",
    title: "Distancias por niveles",
    difficulty: "medio",
    blurb: "Grafo DIRIGIDO con n nodos (0..n-1) y lista de aristas [u, v]. Devuelve, para cada nodo, cuántos pasos lo separan del origen (BFS); inalcanzable → −1.",
    setupCode: `def bfs_distances(n, edges, start):
    \"\"\"Distancia BFS desde start a cada nodo (-1 si inalcanzable).\"\"\"\n    pass\n\n_target = bfs_distances`,
    starterCode: `def bfs_distances(n, edges, start):\n    # TODO: lista de vecinos, cola, y distancias que se asignan AL ENTRAR\n    pass`,
    solutionCode: `def bfs_distances(n, edges, start):\n    from collections import deque\n    vecinos = [[] for _ in range(n)]\n    for u, v in edges:\n        vecinos[u].append(v)\n    dist = [-1] * n\n    dist[start] = 0\n    cola = deque([start])\n    while cola:\n        u = cola.popleft()\n        for v in vecinos[u]:\n            if dist[v] == -1:\n                dist[v] = dist[u] + 1\n                cola.append(v)\n    return dist`,
    explanation:
      "BFS explora el grafo por ANILLOS: primero todo lo que está a 1 paso, luego a 2… La distancia se asigna AL ENTRAR en la cola (no al salir) — así cada nodo toma, de todas sus rutas, la más corta. O(V + E): cada vértice entra en la cola una vez y cada arista se mira como mucho dos veces.",
    tradeoff:
      "DFS también llegaría a todo lo alcanzable, pero su profundidad no es la MÍNIMA: el primer camino de DFS puede dar la vuelta al mundo antes de tocar la esquina vecina. Para distancias mínimas en grafos SIN pesos, BFS es la única respuesta; cuando las aristas tienen pesos, cede el mando a Dijkstra (cap. 18).",
    hints: [
      "La cola del cap. 10 ES el algoritmo: entra el origen y vas extrayendo.",
      "Marca la distancia cuando ENCOLAS, no cuando extraes — evita duplicados.",
      "Los nodos que quedan con -1 son los que jamás toca la cola.",
    ],
    tests: [
      { name: "seis nodos", args: [6, [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], 0], expected: [0, 1, 1, 2, 3, -1] },
      { name: "desde el fondo", args: [6, [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]], 3], expected: [-1, -1, -1, 0, 1, -1] },
      { name: "solo el origen", args: [1, [], 0], expected: [0] },
      { name: "origen sin salida (oculto)", args: [4, [[0, 1], [1, 2]], 2], expected: [-1, -1, 0, -1], hidden: true },
    ],
  },
  {
    id: "count-islands",
    chapter: "graphs",
    title: "Contar islas",
    difficulty: "difícil",
    blurb: "Matriz de 0/1: una isla es un grupo de 1 que tocan arriba/abajo/izquierda/derecha (las DIAGONALES no conectan). ¿Cuántas islas hay?",
    setupCode: `def count_islands(grid):\n    \"\"\"Número de islas de 1s conectadas (sin diagonales).\"\"\"\n    pass\n\n_target = count_islands`,
    starterCode: `def count_islands(grid):\n    # TODO: al encontrar una isla sin marcar, húndela entera\n    pass`,
    solutionCode: `def count_islands(grid):\n    filas = len(grid)\n    cols = len(grid[0]) if filas else 0\n    visto = [[False] * cols for _ in range(filas)]\n\n    def hundir(i, j):\n        pendientes = [(i, j)]\n        visto[i][j] = True\n        while pendientes:\n            x, y = pendientes.pop()\n            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n                nx, ny = x + dx, y + dy\n                if 0 <= nx < filas and 0 <= ny < cols:\n                    if grid[nx][ny] == 1 and not visto[nx][ny]:\n                        visto[nx][ny] = True\n                        pendientes.append((nx, ny))\n\n    total = 0\n    for i in range(filas):\n        for j in range(cols):\n            if grid[i][j] == 1 and not visto[i][j]:\n                total += 1\n                hundir(i, j)\n    return total`,
    explanation:
      "Barrido sistemático: cada celda navegable SIN marcar empieza una isla NUEVA (total += 1) y de inmediato la hundes enterita con DFS (la pila explícita del cap. 9 en vez de la recursión — misma técnica del cap. 17). Cada celda se toca un número constante de veces → O(filas × columnas).",
    tradeoff:
      "BFS también hunde (la «ola» del cap. 10); la diferencia es solo la estructura y el orden, no el coste. Marcar la celda AL ENTRAR en la pila (y no al POP) es lo que evita empujar la misma celda 4 veces — el detalle que separa una solución nítida de una con memoria inflada.",
    hints: [
      "Dos bucles recorren TODA la matriz; solo entras en hundir si la celda es isla sin marcar.",
      "hundir(i, j) marca la celda y camina a sus 4 vecinos navegables sin marcar.",
      "Una celda de isla marcada jamás vuelve a contar — cuidado de no repetir islas.",
    ],
    tests: [
      { name: "una sola", args: [[[1, 1], [1, 1]]], expected: 1 },
      { name: "dos", args: [[[1, 0], [0, 1]]], expected: 2 },
      { name: "todo agua", args: [[[0]]], expected: 0 },
      { name: "diagonales no conectan (oculto)", args: [[[1, 1, 0], [0, 1, 0], [1, 0, 1]]], expected: 3, hidden: true },
    ],
  },
  {
    id: "has-cycle-undirected",
    chapter: "graphs",
    title: "¿Tiene ciclos el grafo?",
    difficulty: "medio",
    blurb: "Grafo NO dirigido con n nodos y lista de aristas [u, v]: ¿contiene algún ciclo? El union-find del cap. 19 lo responde en una pasada.",
    setupCode: `def has_cycle(n, edges):\n    \"\"\"True si el grafo no dirigido tiene un ciclo.\"\"\"\n    pass\n\n_target = has_cycle`,
    starterCode: `def has_cycle(n, edges):\n    # TODO: unir componentes; si una arista une lo ya unido, hay ciclo\n    pass`,
    solutionCode: `def has_cycle(n, edges):\n    padre = list(range(n))\n\n    def buscar(x):\n        while padre[x] != x:\n            x = padre[x]\n        return x\n\n    for u, v in edges:\n        ru, rv = buscar(u), buscar(v)\n        if ru == rv:\n            return True\n        padre[ru] = rv\n    return False`,
    explanation:
      "Cada arista que NO cierra ciclo fusiona dos componentes distintas; la que encuentra sus dos extremos DENTRO de la misma componente cierra un ciclo — la cuenta del cap. 19: con n−1 fusiones útiles ya hechas, cualquier arista nueva une lo ya unido — ciclo. Así detectas el ciclo en O(n·α) sin DFS ni orden de visita.",
    tradeoff:
      "La DFS con «padre de llegada» da el mismo veredicto (si regresas a un vecino que no es tu padre, hay ciclo) y sirve igual: O(V + E). La ventaja del union-find es que no necesita memoria de visita ni recursión y acepta aristas a medida que llegan (streaming). Pero solo va para NO dirigidos: en dirigidos el ciclo se caza con la DFS de tres colores. Los self-loops (u == v) cuentan igual aquí: buscar(u) == buscar(u) → True.",
    hints: [
      "Cada nodo nace en SU PROPIA componente: padre[i] = i.",
      "Una arista u-v con buscar(u) == buscar(v) conecta lo ya conectado: ciclo.",
      "Si llegas al final sin hallar arista interna, el grafo es un bosque.",
    ],
    tests: [
      { name: "triángulo", args: [3, [[0, 1], [1, 2], [2, 0]]], expected: true },
      { name: "cadena", args: [4, [[0, 1], [1, 2], [2, 3]]], expected: false },
      { name: "árbol parcial", args: [3, [[0, 1], [1, 2]]], expected: false },
      { name: "anillo de 5 (oculto)", args: [5, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]], expected: true, hidden: true },
    ],
  },
  {
    id: "dijkstra-cost",
    chapter: "graph-algorithms",
    title: "El coste del camino más corto",
    difficulty: "difícil",
    blurb: "Grafo no dirigido con pesos positivos: lista de aristas [u, v, w]. Devuelve el coste del camino más corto de 0 a n−1; inalcanzable → −1. Dijkstra del cap. 18 en forma de problema.",
    setupCode: `def dijkstra_cost(n, edges):\n    \"\"\"Coste mínimo de 0 a n-1 (-1 si no hay camino).\"\"\"\n    pass\n\n_target = dijkstra_cost`,
    starterCode: `def dijkstra_cost(n, edges):\n    # TODO: vecinos, distancias infinitas y un heap de candidatos\n    pass`,
    solutionCode: `def dijkstra_cost(n, edges):\n    import heapq\n    vecinos = [[] for _ in range(n)]\n    for u, v, w in edges:\n        vecinos[u].append((v, w))\n        vecinos[v].append((u, w))\n    dist = [float(\"inf\")] * n\n    dist[0] = 0\n    heap = [(0, 0)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if u == n - 1:\n            return d\n        if d > dist[u]:\n            continue  # entrada caducada: ya la mejoramos por otro camino\n        for v, w in vecinos[u]:\n            nd = d + w\n            if nd < dist[v]:\n                dist[v] = nd\n                heapq.heappush(heap, (nd, v))\n    return -1`,
    explanation:
      "Dijkstra con min-heap (el cap. 14 sirve al cap. 18): siempre extraes el candidato SIN VISITAR de coste MENOR y conviertes ese coste en definitivo (los pesos positivos lo garantizan: ninguna otra ruta puede mejorar un mínimo ya extraído). El guard «d > dist[u]» descarta las entradas CADUCADAS del heap — el heap no soporta «bajar prioridad», así que se mete un duplicado y se ignora el viejo.",
    tradeoff:
      "La versión sin heap (buscar el mínimo a mano entre los no visitados) es O(V²) — mejor para grafos densos (V² ≈ E); con el heap es O(E log V) — mejor para grafos dispersos como las carreteras reales. Bellman-Ford acepta pesos NEGATIVOS pagando O(V·E): la elección del algoritmo es la del grafo, no la del guste.",
    hints: [
      "dist = infinito en todo menos en el origen; heap con (0, 0).",
      "Al extraer del heap, si d > dist[u], es una entrada vieja: continue.",
      "Al extraer del heap el nodo n−1, ese d es LA respuesta — los pesos positivos lo garantizan.",
    ],
    tests: [
      { name: "cinco nodos", args: [5, [[0, 1, 10], [0, 2, 3], [2, 1, 4], [1, 4, 2], [2, 3, 7], [3, 4, 9]]], expected: 9 },
      { name: "directa más cara que la indirecta", args: [4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 10]]], expected: 3 },
      { name: "una arista", args: [2, [[0, 1, 7]]], expected: 7 },
      { name: "sin camino (oculto)", args: [3, []], expected: -1, hidden: true },
    ],
  },
  {
    id: "can-finish-courses",
    chapter: "graph-algorithms",
    title: "¿Puedo terminar la carrera?",
    difficulty: "medio",
    blurb: "n cursos y prerrequisitos [curso, requisito] (para tomar `curso` hay que haber tomado `requisito` antes). ¿Se pueden cursar TODOS? Un ciclo = imposible.",
    setupCode: `def can_finish(n, prereqs):\n    \"\"\"True si el grafo de prerrequisitos no tiene ciclo.\"\"\"\n    pass\n\n_target = can_finish`,
    starterCode: `def can_finish(n, prereqs):\n    # TODO: grados de entrada; empieza por los que dependen de nadie\n    pass`,
    solutionCode: `def can_finish(n, prereqs):\n    vecinos = [[] for _ in range(n)]\n    grado = [0] * n\n    for curso, antes in prereqs:\n        vecinos[antes].append(curso)\n        grado[curso] += 1\n    pendientes = [i for i in range(n) if grado[i] == 0]\n    vistos = 0\n    while pendientes:\n        u = pendientes.pop()\n        vistos += 1\n        for v in vecinos[u]:\n            grado[v] -= 1\n            if grado[v] == 0:\n                pendientes.append(v)\n    return vistos == n`,
    explanation:
      "Orden topológico de Kahn (el corazón del cap. 18): empieza por los nodos con grado de entrada 0 (cursos libres); si los «tomas», liberan a sus dependientes restando 1 a su grado. Lo que sobra con grado > 0 está EN un ciclo y jamás se libera: si vistos < n, imposible. O(V + E).",
    tradeoff:
      "La alternativa: DFS de tres colores detecta el ciclo igualmente (gris = en curso; si llego a un gris, ciclo) — pero Kahn es iterativo, sin recursión ni pila profunda, y de paso deja el ORDEN listo (el mismo cálculo sin el booleano). Ambos van O(V + E): la diferencia es ergonómica, no de orden.",
    hints: [
      "Grado de entrada = cuántos prerrequisitos tiene cada curso.",
      "Un curso con grado 0 ya se puede tomar: quítalo de la cuenta y libera a sus dependientes.",
      "Si al final no se «tomaron» todos, hubo ciclo.",
    ],
    tests: [
      { name: "lineal", args: [2, [[1, 0]]], expected: true },
      { name: "dos que se piden", args: [2, [[1, 0], [0, 1]]], expected: false },
      { name: "cadena de cuatro", args: [4, [[1, 0], [2, 1], [3, 2]]], expected: true },
      { name: "ciclo de tres (oculto)", args: [3, [[0, 1], [1, 2], [2, 0]]], expected: false, hidden: true },
    ],
  },
  {
    id: "topo-order-kahn",
    chapter: "graph-algorithms",
    title: "Orden topológico (Kahn)",
    difficulty: "difícil",
    blurb: "Los n cursos con prerrequisitos [ curso, requisito ]: devuelve UN orden válido para cursar todos, con la REGLA determinista de empate «el menor número disponible primero». Ciclo → lista vacía.",
    setupCode: `def topo_order(n, prereqs):\n    \"\"\"Orden topológico con desempate por menor índice; [] si hay ciclo.\"\"\"\n    pass\n\n_target = topo_order`,
    starterCode: `def topo_order(n, prereqs):\n    # TODO: Kahn, pero eligiendo SIEMPRE el menor disponible\n    pass`,
    solutionCode: `def topo_order(n, prereqs):\n    import heapq\n    vecinos = [[] for _ in range(n)]\n    grado = [0] * n\n    for curso, antes in prereqs:\n        vecinos[antes].append(curso)\n        grado[curso] += 1\n    heap = [i for i in range(n) if grado[i] == 0]\n    heapq.heapify(heap)\n    orden = []\n    while heap:\n        u = heapq.heappop(heap)\n        orden.append(u)\n        for v in vecinos[u]:\n            grado[v] -= 1\n            if grado[v] == 0:\n                heapq.heappush(heap, v)\n    return orden if len(orden) == n else []`,
    explanation:
      "Kahn con min-heap en vez de cola simple: la idea es LA MISMA (extraer, liberar dependientes), pero el heap garantiza el contrato determinista «siempre el menor disponible» — requisito para que un problema de salida LISTA sea verificable por tests (un orden topológico genérico no es único: sin desempate nadie puede constatar tu respuesta).",
    tradeoff:
      "La cola simple de Kahn es O(V + E); el min-heap añade un factor log en cada push/pop: O((V + E) log V) en el peor caso — el precio del determinismo. A cambio: verificar el resultado es O(E) (cada arista debe apuntar de un curso anterior a uno posterior), un verificador barato que salva en entrevistas.",
    hints: [
      "Empieza con los nodos cuya lista de prerrequisitos está vacía.",
      "Extrae SIEMPRE el menor del heap de disponibles.",
      "Al terminar, si orden no junta n nodos, había ciclo → [].",
    ],
    tests: [
      { name: "convergencia", args: [4, [[2, 0], [2, 1], [3, 2]]], expected: [0, 1, 2, 3] },
      { name: "sin prerrequisitos", args: [3, []], expected: [0, 1, 2] },
      { name: "cadena", args: [5, [[1, 0], [2, 1], [3, 2], [4, 3]]], expected: [0, 1, 2, 3, 4] },
      { name: "dos libres a la vez (oculto)", args: [4, [[3, 0], [3, 1], [1, 2]]], expected: [0, 2, 1, 3], hidden: true },
    ],
  },
  {
    id: "count-components",
    chapter: "union-find",
    title: "Contar componentes conexas",
    difficulty: "medio",
    blurb: "n nodos y lista de aristas no dirigidas: ¿cuántas componentes hay? Cada arista que une dos componentes distintas las fusiona y baja el contador.",
    setupCode: `def count_components(n, edges):\n    \"\"\"Número de componentes conexas del grafo.\"\"\"\n    pass\n\n_target = count_components`,
    starterCode: `def count_components(n, edges):\n    # TODO: empieza con n componentes; cada fusión útil resta 1\n    pass`,
    solutionCode: `def count_components(n, edges):\n    padre = list(range(n))\n\n    def buscar(x):\n        while padre[x] != x:\n            x = padre[x]\n        return x\n\n    componentes = n\n    for u, v in edges:\n        ru, rv = buscar(u), buscar(v)\n        if ru != rv:\n            padre[ru] = rv\n            componentes -= 1\n    return componentes`,
    explanation:
      "El contador nace en n (cada nodo es su propia isla, cap. 19). Cada arista pregunta: ¿misma componente? Si no, FUSIONA y el contador baja 1. Si sí, es una arista redundante (ciclo) — no cambia el número: contar componentes es contar fusiones útiles. O(n + E·α).",
    tradeoff:
      "DFS/BFS desde cada nodo no visitado también cuenta componentes (una «ola» por isla) y cuesta lo mismo O(V + E) — el union-find solo gana cuando llegan poco a poco (streaming): no necesitas re-hacer el BFS entero cada vez que aparece una arista, solo fusión local. Con compresión de caminos, el buscar se hace casi O(1) amortizado.",
    hints: [
      "padre[i] = i al empezar; buscar(x) sube hasta la raíz de su componente.",
      "Una arista entre raíces DISTINTAS fusiona y resta 1 al contador.",
      "Las aristas repetidas o internas a una componente no cambian nada.",
    ],
    tests: [
      { name: "dos islas", args: [5, [[0, 1], [1, 2], [3, 4]]], expected: 2 },
      { name: "nada conectado", args: [4, []], expected: 4 },
      { name: "con ciclos", args: [3, [[0, 1], [1, 2], [2, 0]]], expected: 1 },
      { name: "tres parejas (oculto)", args: [6, [[0, 1], [2, 3], [4, 5]]], expected: 3, hidden: true },
    ],
  },
  {
    id: "is-valid-tree",
    chapter: "union-find",
    title: "¿Es un árbol válido?",
    difficulty: "medio",
    blurb: "n nodos y lista de aristas: ¿forman un árbol? Dos condiciones: n−1 aristas Y conectados (sin ciclos). Comprueba ESAS dos y no busques nada más.",
    setupCode: `def is_valid_tree(n, edges):\n    \"\"\"True si las aristas forman un árbol con la n dada.\"\"\"\n    pass\n\n_target = is_valid_tree`,
    starterCode: `def is_valid_tree(n, edges):\n    # TODO: la condición barata primero, la conectividad después\n    pass`,
    solutionCode: `def is_valid_tree(n, edges):\n    if len(edges) != n - 1:\n        return False\n    padre = list(range(n))\n\n    def buscar(x):\n        while padre[x] != x:\n            x = padre[x]\n        return x\n\n    for u, v in edges:\n        ru, rv = buscar(u), buscar(v)\n        if ru == rv:\n            return False\n        padre[ru] = rv\n    return True`,
    explanation:
      "Un árbol con n nodos tiene EXACTAMENTE n−1 aristas — comprobarlo primero elimina en O(1) media batería de casos (demasiadas aristas ⇒ hay ciclo de regalo: las que sobran). Con n−1 aristas, «sin ciclo» y «conectado» son la MISMA condición: si n−1 aristas no cierran ciclo, han fusionado n−1 veces… y eso conecta todo. Es la dualidad del cap. 19.",
    tradeoff:
      "Hacer DOS comprobaciones (ciclo por union-find + conectividad por contador) es correcto pero redundante: la aritmética n−1 SUSTITUYE la segunda comprobación. La lección de entrevista: contar antes de caminar — un invariante combinatorio (aristas = nodos − 1) ahorra medio algoritmo.",
    hints: [
      "¿n−1 aristas? Si no, ya es «no»: si sobran, hay ciclo garantizado; si faltan, desconexión garantizada.",
      "Con exactamente n−1 aristas, basta comprobar que NO hay ciclo.",
      "Al terminar sin ciclo con n−1 fusiones, ya está todo conectado.",
    ],
    tests: [
      { name: "camino de cuatro", args: [4, [[0, 1], [1, 2], [2, 3]]], expected: true },
      { name: "una arista de más", args: [4, [[0, 1], [0, 2], [2, 3], [3, 1]]], expected: false },
      { name: "conectado doble", args: [2, [[0, 1], [1, 0]]], expected: false },
      { name: "árbol de cinco (oculto)", args: [5, [[0, 1], [0, 2], [1, 3], [2, 4]]], expected: true, hidden: true },
    ],
  },
  {
    id: "redundant-edge",
    chapter: "union-find",
    title: "La arista redundante",
    difficulty: "difícil",
    blurb: "En un grafo no dirigido se AÑADIÓ una arista de más (que cerró un ciclo). Recórrelas EN ORDEN y devuelve la primera que conecte dos nodos ya conectados — esa es la redundante.",
    setupCode: `def redundant_edge(edges):\n    \"\"\"La primera arista que cierra un ciclo (o [] si no la hay).\"\"\"\n    pass\n\n_target = redundant_edge`,
    starterCode: `def redundant_edge(edges):\n    # TODO: union-find y devolver la arista culpable\n    pass`,
    solutionCode: `def redundant_edge(edges):\n    maximo = max(max(u, v) for u, v in edges)\n    padre = list(range(maximo + 1))\n\n    def buscar(x):\n        while padre[x] != x:\n            x = padre[x]\n        return x\n\n    for u, v in edges:\n        ru, rv = buscar(u), buscar(v)\n        if ru == rv:\n            return [u, v]\n        padre[ru] = rv\n    return []`,
    explanation:
      "Recorrido en el orden de ENTRADA: cada arista o une dos componentes (se la queda) o es la CULPABLE (sus extremos ya están unidos). El union-find responde la pregunta «¿están u y v ya conectados?» en casi O(1) amortizado — la consulta a la que BFS respondería con una travesía entera por cada arista. O(E·α) total.",
    tradeoff:
      "Devolver LA PRIMERA arista redundante en el orden dado es el contrato estandarizado (LC 684); sin determinismo, «cuál es LA arista de más» es ambiguo en grafos con varios ciclos — otra muestra de que el orden de entrada ES un dato del problema, no un detalle. Y el retorno es el par ENTERO [u, v], no un nodo: la arista es el contrato.",
    hints: [
      "El tamaño de padre debe cubrir el mayor nodo que aparezca en edges.",
      "buscar(u) == buscar(v) ANTES de fusionar → esa es la arista a devolver.",
      "Si ninguna cierra ciclo, devuelve [] (los tests no incluyen ese caso).",
    ],
    tests: [
      { name: "triángulo", args: [[[1, 2], [1, 3], [2, 3]]], expected: [2, 3] },
      { name: "cierre temprano", args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expected: [1, 3] },
      { name: "cuadrado", args: [[[1, 2], [2, 3], [3, 4], [4, 1]]], expected: [4, 1] },
      { name: "cierre al pasar (oculto)", args: [[[1, 2], [2, 3], [3, 1], [3, 4]]], expected: [3, 1], hidden: true },
    ],
  },
  {
    id: "mst-cost",
    chapter: "mst",
    title: "El coste del MST (Kruskal)",
    difficulty: "medio",
    blurb: "n nodos y aristas ponderadas no dirigidas [u, v, w]: el coste mínimo para conectar TODO el grafo (árbol de expansión mínima). Imposible → −1; un solo nodo → 0.",
    setupCode: `def mst_cost(n, edges):\n    \"\"\"Coste del MST (Kruskal); -1 si el grafo está desconectado.\"\"\"\n    pass\n\n_target = mst_cost`,
    starterCode: `def mst_cost(n, edges):\n    # TODO: ordena por peso y fusiona con union-find\n    pass`,
    solutionCode: `def mst_cost(n, edges):\n    padre = list(range(n))\n\n    def buscar(x):\n        while padre[x] != x:\n            x = padre[x]\n        return x\n\n    total = 0\n    usadas = 0\n    for u, v, w in sorted(edges, key=lambda e: e[2]):\n        ru, rv = buscar(u), buscar(v)\n        if ru != rv:\n            padre[ru] = rv\n            total += w\n            usadas += 1\n            if usadas == n - 1:\n                return total\n    return total if n <= 1 else -1`,
    explanation:
      "Kruskal = union-find + codicia: ordena las aristas por peso y tómala SIEMPRE que no cierre ciclo (si cierra, esos dos nodos ya están unidos por aristas MÁS BARATAS que llegaron antes — la propiedad del corte del cap. 20). n−1 fusiones útiles ⇒ árbol completo. Si tras agotar las aristas no llegaste a n−1, el grafo estaba roto por fragmentos: −1. O(E log E) por el sort (el union-find es casi gratis).",
    tradeoff:
      "Prim crece DESDE UN ORIGEN con un min-heap (como Dijkstra) y llega a lo mismo en O(E log V) — mejor para grafos densos. Kruskal es más simple de escribir (sort + union-find) y brilla en grafos dispersos. El COSTE del MST es ÚNICO aunque el árbol no lo sea: con empates de pesos puede haber varios MST — por eso este problema pide el coste, no la lista de aristas.",
    hints: [
      "sorted(edges, key=lambda e: e[2]) ordena por peso.",
      "Fusiona solo si las raíces difieren; cada fusión suma w y cuenta como usada.",
      "Si nunca llegas a n−1 fusiones, el grafo es desconectado → -1.",
    ],
    tests: [
      { name: "cuatro nodos", args: [4, [[0, 1, 1], [1, 2, 2], [2, 3, 3], [0, 3, 4], [0, 2, 9]]], expected: 6 },
      { name: "un nodo", args: [1, []], expected: 0 },
      { name: "desconectado", args: [3, [[0, 1, 1]]], expected: -1 },
      { name: "cinco nodos (oculto)", args: [5, [[0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 7]]], expected: 16, hidden: true },
    ],
  },
  {
    id: "generate-subsets",
    chapter: "backtracking",
    title: "Todos los subconjuntos",
    difficulty: "medio",
    blurb: "Dado un array sin duplicados, genera TODOS los subconjuntos en el orden de la recursión clásica: en cada nivel decides PRIMERO incluir el elemento y luego saltarlo. Salen 2^n subconjuntos.",
    setupCode: `def generate_subsets(nums):\n    \"\"\"Todos los subconjuntos, en el orden de la recursión clásica.\"\"\"\n    pass\n\n_target = generate_subsets`,
    starterCode: `def generate_subsets(nums):\n    # TODO: incluir primero, saltar después; copia al llegar a la hoja\n    pass`,
    solutionCode: `def generate_subsets(nums):\n    out = []\n\n    def backtracking(i, actual):\n        if i == len(nums):\n            out.append(actual[:])\n            return\n        actual.append(nums[i])\n        backtracking(i + 1, actual)\n        actual.pop()\n        backtracking(i + 1, actual)\n\n    backtracking(0, [])\n    return out`,
    explanation:
      "El árbol binario de decisiones (cap. 21): en el nivel i eliges INCLUIR nums[i] (rama izquierda) o no (rama derecha); en la hoja i == len(nums), copias lo acumulado ([:] — si no, todas las salidas serían el MISMO array mutable retocado). O(2^n) hojas — la salida misma es exponencial, ningún algoritmo lo elude, y la pila solo baja n niveles.",
    tradeoff:
      "La alternativa iterativa (empezar con [[]] y, por cada número, CLONAR todos los subconjuntos existentes con y sin el nuevo) escribe lo mismo en 4 líneas de bucle sin recursión — pero no ejercita la plantilla copia/avanza/deshace del cap. 21 que reutilizarás en n-reinas o sudokus. La salida (2^n subconjuntos de tamaño medio n/2) fija el coste: aquí los datos mandan.",
    hints: [
      "Caso base: i == len(nums) → out.append(actual[:]) — con la COPIA.",
      "Rama 1: append, recursión, pop (deshacer). Rama 2: recursión directa.",
      "Incluir primero y saltar después produce el orden que piden los tests.",
    ],
    tests: [
      { name: "dos elementos", args: [[1, 2]], expected: [[1, 2], [1], [2], []] },
      { name: "un elemento", args: [[1]], expected: [[1], []] },
      { name: "sin elementos", args: [[]], expected: [[]] },
      { name: "tres elementos (oculto)", args: [[1, 2, 3]], expected: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []], hidden: true },
    ],
  },
  {
    id: "generate-permutations",
    chapter: "backtracking",
    title: "Todas las permutaciones",
    difficulty: "medio",
    blurb: "Genera todas las permutaciones de un array sin duplicados, ORDENADAS lexicográficamente. [1, 2, 3] → [[1,2,3], [1,3,2], [2,1,3], …].",
    setupCode: `def generate_permutations(nums):\n    \"\"\"Todas las permutaciones, ordenadas lexicográficamente.\"\"\"\n    pass\n\n_target = generate_permutations`,
    starterCode: `def generate_permutations(nums):\n    # TODO: elegir en cada nivel uno de los restantes; ordenar al final\n    pass`,
    solutionCode: `def generate_permutations(nums):\n    out = []\n\n    def backtracking(actual, restantes):\n        if not restantes:\n            out.append(actual[:])\n            return\n        for i in range(len(restantes)):\n            backtracking(actual + [restantes[i]], restantes[:i] + restantes[i + 1 :])\n\n    backtracking([], nums)\n    out.sort()\n    return out`,
    explanation:
      "En cada nivel: elige CADA UNO de los elementos restantes como próximo (bucle de decisión del cap. 21), fíjalo, recursiona sobre el resto — y deshaz (aquí con inmutabilidad: actual + [x] crea listas nuevas, así que no hay pop; el coste de copiar se paga con legibilidad). El sort final pone la salida en orden lexicográfico determinista.",
    tradeoff:
      "n! salidas — factorial puro: con n = 10 ya son 3.6 millones de listas. El backtracking in-place con swap evita las copias (O(n) por nivel contra O(n²) del slicing) a cambio del pop/restore manual; para entrevistas, la versión legible gana mientras los tests no crezcan. El algoritmo de Heap produce todas sin orden explícito: si necesitas determinismo, ordena al final o genera lexicográficamente en sitio.",
    hints: [
      "La lista `actual` lleva lo fijado; `restantes` lo que aún no se decidió.",
      "restantes[:i] + restantes[i+1:] elimina sin mutar.",
      "Al final, out.sort() — los tests exigen el orden lexicográfico.",
    ],
    tests: [
      { name: "tres elementos", args: [[1, 2, 3]], expected: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { name: "dos", args: [[1, 2]], expected: [[1, 2], [2, 1]] },
      { name: "uno", args: [[1]], expected: [[1]] },
      { name: "con cuatro (oculto)", args: [[1, 2, 4]], expected: [[1, 2, 4], [1, 4, 2], [2, 1, 4], [2, 4, 1], [4, 1, 2], [4, 2, 1]], hidden: true },
    ],
  },
  {
    id: "count-n-queens",
    chapter: "backtracking",
    title: "Contar soluciones de N reinas",
    difficulty: "difícil",
    blurb: "¿De cuántas maneras se pueden colocar n reinas en un tablero n×n sin que se ataquen? Devuelve solo la CANTIDAD (n = 4 → 2, n = 8 → 92).",
    setupCode: `def count_n_queens(n):\n    \"\"\"Número de soluciones del problema n-reinas.\"\"\"\n    pass\n\n_target = count_n_queens`,
    starterCode: `def count_n_queens(n):\n    # TODO: fila a fila; tres sets para columnas y diagonales\n    pass`,
    solutionCode: `def count_n_queens(n):\n    total = 0\n    columnas = set()\n    diag1 = set()\n    diag2 = set()\n\n    def colocar(fila):\n        nonlocal total\n        if fila == n:\n            total += 1\n            return\n        for col in range(n):\n            if col in columnas or (fila - col) in diag1 or (fila + col) in diag2:\n                continue\n            columnas.add(col)\n            diag1.add(fila - col)\n            diag2.add(fila + col)\n            colocar(fila + 1)\n            columnas.remove(col)\n            diag1.remove(fila - col)\n            diag2.remove(fila + col)\n\n    colocar(0)\n    return total`,
    explanation:
      "La plantilla del cap. 21 en estado puro: una reina por fila (en cada fila cae EXACTAMENTE una reina), tres sets como tablas de ataque — columna, diagonal ↘ (fila−col constante) y diagonal ↗ (fila+col constante) — y el deshacer EXACTO del avance. La poda temprana (no probar columnas ya vedadas) es la que baja el factorial a lo manejable: n = 8 se resuelve recorriendo millones de nodos, no miles de millones.",
    tradeoff:
      "Bitmasks (un int = una fila entera de banderas, aprendizajes del cap. 22) hacen lo mismo unas 10× más rápido y sin sets, a cambio de código que exige explicar la aritmética de bits. Contar mientras se busca (como aquí) evita dibujar el tablero: en entrevistas, el contador basta.",
    hints: [
      "Una reina por fila: solo decides la columna.",
      "Tres sets: columnas, fila−col, fila+col — comprobar que ninguno repite.",
      "Al terminar la recursión (fila == n): total += 1 y DESHACER al regresar.",
    ],
    tests: [
      { name: "n = 2", args: [2], expected: 0 },
      { name: "n = 4", args: [4], expected: 2 },
      { name: "n = 5", args: [5], expected: 10 },
      { name: "n = 6 (oculto)", args: [6], expected: 4, hidden: true },
    ],
  },
  {
    id: "single-number",
    chapter: "bit-operations",
    title: "El que no se repite",
    difficulty: "fácil",
    blurb: "En un array todos los enteros aparecen DOS veces menos uno. Devuelve el solitario. Con XOR, sin memoria extra: O(n) tiempo, O(1) espacio.",
    setupCode: `def single_number(nums):\n    \"\"\"El elemento único del array (los demás aparecen dos veces).\"\"\"\n    pass\n\n_target = single_number`,
    starterCode: `def single_number(nums):\n    # TODO: un operador lo hace todo\n    pass`,
    solutionCode: `def single_number(nums):\n    resultado = 0\n    for x in nums:\n        resultado ^= x\n    return resultado`,
    explanation:
      "XOR es su propio deshacer: x ^ x = 0 y 0 ^ x = x. Al acumular por todo el array, los pares se cancelan entre sí y el solitario sobrevive intacto — da igual el ORDEN (xor es conmutativo): es una suma módulo 2 bit a bit. Un solo acumulador, un solo operador: el cap. 22 en acción.",
    tradeoff:
      "La cuenta con set/diccionario es O(n) de memoria; el sort + comparar vecinos es O(n log n). El XOR es la única respuesta O(1) de espacio — y la más estética. Pero ojo su alcance: funciona porque los demás aparecen DOS veces; con «todos tres veces menos uno» toca contar bits módulo 3.",
    hints: [
      "x ^ x = 0 y el orden de XOR no importa.",
      "Acumula: resultado = resultado ^ x para cada elemento.",
      "Lo que sobra es la respuesta.",
    ],
    tests: [
      { name: "dup en extremos", args: [[2, 2, 1]], expected: 1 },
      { name: "cuatro elementos", args: [[4, 1, 2, 1, 2]], expected: 4 },
      { name: "un elemento", args: [[1]], expected: 1 },
      { name: "tres parejas (oculto)", args: [[7, 3, 3, 9, 7]], expected: 9, hidden: true },
    ],
  },
  {
    id: "count-ones",
    chapter: "bit-operations",
    title: "Cuenta de unos (popcount)",
    difficulty: "fácil",
    blurb: "¿Cuántos bits a 1 tiene el entero n? SIN bin(n), sin str().count(\"1\") — la vía del cap. 22: el truco de Kernighan.",
    setupCode: `def count_ones(n):\n    \"\"\"Número de bits a 1 de n (sin bin() ni librerías).\"\"\"\n    pass\n\n_target = count_ones`,
    starterCode: `def count_ones(n):\n    # TODO: n &= n - 1 apagando el bit más bajo cada vuelta\n    pass`,
    solutionCode: `def count_ones(n):\n    unos = 0\n    while n:\n        n &= n - 1\n        unos += 1\n    return unos`,
    explanation:
      "n & (n − 1) APAGA el bit 1 más bajo de n (los que eran 1 sobre él quedan intactos; bajo él todo era 0 y el −1 lo convierte en 1s que el AND mata). Cada vuelta elimina UN uno y basta: el bucle corre tantas veces como bits a 1 — no los 32 de turno. Recorrido: 1011 → 1010 → 1000 → 0000 — 3 pasos.",
    tradeoff:
      "El shift-and-mask bit a bit (n & 1; n >>= 1) es O(bits totales = 32 por int) — funcional para siempre, blindado frente a ceros; Kernighan es O(unos) — un turbo cuando los unos son pocos. La librería existe (int.bit_count() desde Python 3.10), pero aquí la misión es entender el truco: esa misma lógica gobierna máscaras de permisos y flags en los sistemas operativos vivos.",
    hints: [
      "¿Qué le pasa a n al calcular n & (n - 1)? Prueba a mano con 12 (1100) y 11 (1011).",
      "Cada vuelta del bucle apaga exactamente UN bit encendido.",
      "n = 0 → 0 (el while ni arranca).",
    ],
    tests: [
      { name: "siete", args: [7], expected: 3 },
      { name: "potencia de dos", args: [8], expected: 1 },
      { name: "cero", args: [0], expected: 0 },
      { name: "byte lleno (oculto)", args: [255], expected: 8, hidden: true },
    ],
  },
  {
    id: "iteraciones-modo",
    chapter: "complexity",
    title: "Pasos estimados por modo de bucle",
    difficulty: "fácil",
    blurb: "Dados n y un modo («lineal», «cuadrado», «logaritmico», «nlogn»), devuelve cuántos pasos hace el bucle de ese modo. «logaritmico» = cuántas veces puedes dividir n entre 2 antes de llegar a 0 (n = 0 → 0). El resto: «lineal» → n; «cuadrado» → n·n; «nlogn» → n·logaritmico(n).",
    setupCode: `def iteraciones(n, modo):
    \"\"\"Pasos estimados del bucle según el modo dado.\"\"\"
    pass

_target = iteraciones`,
    starterCode: `def iteraciones(n, modo):
    # TODO: mapea cada modo a su fórmula de coste
    pass`,
    solutionCode: `def iteraciones(n, modo):
    if modo == "lineal":
        return n
    if modo == "cuadrado":
        return n * n
    def log_n(m):
        pasos = 0
        while m > 0:
            m = m // 2
            pasos += 1
        return pasos
    logaritmo = log_n(n)
    if modo == "logaritmico":
        return logaritmo
    if modo == "nlogn":
        return n * logaritmo
    return -1`,
    explanation:
      "Es la tabla del cap. 1 convertida en función: cada modo es una clase de coste (O(n), O(n²), O(log n), O(n log n)) y el resultado es su valor exacto para ese n. El truco útil: contar divisiones entre 2 de un entero equivale a su bit_length() — porque «dividir a la mitad hasta 0» es contar los bits.",
    tradeoff:
      "log_n() con bucle vale el capítulo: es O(log n) y refleja de dónde sale el factor. La versión real usaría bit_length(), y para cuadrados grandes un n·n desborda en lenguajes fijos — pero Python maneja enteros grandes sin drama. Con esto puedes establecer la regla delante de cualquier n.",
    hints: [
      "logaritmico(n): bucle que divide entre 2 hasta 0 y cuenta vueltas.",
      "n = 0 → 0 para todos los modos (ni un paso).",
      "nlogn = n veces el logaritmico de n.",
    ],
    tests: [
      { name: "lineal", args: [5, "lineal"], expected: 5 },
      { name: "cuadrado", args: [4, "cuadrado"], expected: 16 },
      { name: "logaritmico de 1", args: [1, "logaritmico"], expected: 1 },
      { name: "cero", args: [0, "logaritmico"], expected: 0 },
      { name: "nlogn de cuatro", args: [4, "nlogn"], expected: 12, hidden: true },
      { name: "logaritmico de 10 (oculto)", args: [10, "logaritmico"], expected: 4, hidden: true },
    ],
  },
  {
    id: "papa-caliente",
    chapter: "queues",
    title: "La patata caliente",
    difficulty: "fácil",
    blurb: "En una fila circular, la patata pasa k veces: cada pase toma al primero de la fila y lo reencola al final; en el pase k-ésimo quien la recibe queda ELIMINADO. Repite hasta que quede uno y devuelve la lista con el ganador dentro. k = 1 elimina al primero de cada ronda.",
    setupCode: `def ganador(fila, k):
    \"\"\"El que sobrevive a la patata caliente de k pases por ronda.\"\"\"
    pass

_target = ganador`,
    starterCode: `def ganador(fila, k):
    # TODO: pases = quitar de delante y volver a poner detrás;
    # el k-ésimo pase no vuelve a la fila
    pass`,
    solutionCode: `def ganador(fila, k):
    cola = fila[:]
    while len(cola) > 1:
        for i in range(k):
            primera = cola.pop(0)
            if i < k - 1:
                cola.append(primera)
    return cola`,
    explanation:
      "Es el BFS de las fiestas: una cola circular. Cada pase es dequeue + enqueue; el pase k-ésimo se salta el reencolado y ese nombre desaparece. Rotar la fila k−1 veces con append/pop(0) es exactamente lo que hace el doble bucle — y si k fuera gigante, el truco mod: (índice + k − 1) % len(cola) elude los pases uno a uno.",
    tradeoff:
      "El pop(0) de listas es O(n): la simulación entera queda O(n²) para filas grandes; con collections.deque los pases son O(1) y el total O(n·k) sin remodelar el algoritmo. Y como en la ventaja del deque del cap. 10: la ESTRUCTURA del contenedor consigue la misma idea más barata — la plantilla mental (rotar y expulsar) no cambia.",
    hints: [
      "k−1 pases normales y el k-ésimo elimina (no reencola).",
      "pop(0) quita de delante; append(x) devuelve al final — eso ES rotar.",
      "El bucle para cuando la cola tiene un solo nombre.",
    ],
    tests: [
      { name: "cuatro y pases dos", args: [["a", "b", "c", "d"], 2], expected: ["a"] },
      { name: "tres y pases tres", args: [["a", "b", "c"], 3], expected: ["b"] },
      { name: "pase uno elimina al primero", args: [["a", "b", "c"], 1], expected: ["c"] },
      { name: "dos jugadores (oculto)", args: [["ana", "eva"], 4], expected: ["ana"], hidden: true },
    ],
  },
  {
    id: "triage-hospital",
    chapter: "heaps",
    title: "Triage con severidad",
    difficulty: "fácil",
    blurb: "Cada paciente es [severidad, nombre]. Devuelve los nombres de los k primeros que ATENDE el triage: de mayor severidad a menor, y a igual severidad, el que llegó antes (la lista está ordenada por llegada). Si k supera a los pacientes, devuélvelos todos ya ordenados por el mismo criterio.",
    setupCode: `def triage(pacientes, k):
    \"\"\"Los k primeros según severidad (mayor primero, estable).\"\"\"
    pass

_target = triage`,
    starterCode: `def triage(pacientes, k):
    # TODO: clave (−severidad, llegada) — o un max-heap del tamaño k que reciba la cima
    pass`,
    solutionCode: `def triage(pacientes, k):
    orden = []
    for i, p in enumerate(pacientes):
        orden.append([-p[0], i, p[1]])
    orden.sort()
    return [nombre for _, _, nombre in orden[:k]]`,
    explanation:
      "El max-heap es la fórmula del cap. 14: la cima concentra al urgente. En Python la respuesta se ordena con una CLAVE COMPUESTA (−severidad, llegada): el − invierte el signo para que el min-heap del heapq se comporte como max, y el índice de llegada resuelve los empates con estabilidad total. Un heap real con push/pop limitado a k es la versión «de stream»: mismo criterio, memoria O(k).",
    tradeoff:
      "El sort completo es O(n log n) y nuevo-código mínimo — perfecto con n razonable y datos ya reunidos; el heap limitado a k baja a O(n log k) memoria O(k) y crea prioridad para un STREAM que nunca deja de llegar. Cuando los pacientes siguen entrando mientras atiendes, el sort por cada consulta vuelve a ser O(n log n) y el heap solo actualiza — esa es la razón práctica del capítulo 14.",
    hints: [
      "La clave de orden es (−severidad, índice de llegada).",
      "orden[:k] tras el sort da los k primeros; si k > n, slice no protesta.",
      "−5 ordena ANTES que −3: el min-heap de negativos actúa como max-heap.",
    ],
    tests: [
      { name: "dos urgentes primero", args: [[[3, "ana"], [5, "bo"], [3, "aly"], [5, "don"]], 2], expected: ["bo", "don"] },
      { name: "k tres con empates", args: [[[3, "ana"], [5, "bo"], [3, "aly"], [5, "don"]], 3], expected: ["bo", "don", "ana"] },
      { name: "k gigante devuelve todos", args: [[[2, "x"]], 5], expected: ["x"] },
      { name: "de menor a mayor (oculto)", args: [[[1, "a"], [2, "b"]], 1], expected: ["b"], hidden: true },
    ],
  },
  {
    id: "hojas-arbol",
    chapter: "trees",
    title: "Cuántas hojas tiene el árbol",
    difficulty: "fácil",
    blurb: "El árbol llega como lista por niveles con None para huecos (hijos de i: 2i+1 y 2i+2). Cuenta cuántos nodos son HOJA: ninguno de los dos hijos existe (está fuera del array o es None). El array [] tiene 0 hojas.",
    setupCode: `def cuenta_hojas(level):
    \"\"\"Número de hojas del árbol por niveles (None = hueco).\"\"\"
    pass

_target = cuenta_hojas`,
    starterCode: `def cuenta_hojas(level):
    # TODO: recursión por índices; hoja = sin ninguno de los dos hijos
    pass`,
    solutionCode: `def cuenta_hojas(level):
    def existe(i):
        return i < len(level) and level[i] is not None

    def recorrido(i):
        if not existe(i):
            return 0
        izq, der = 2 * i + 1, 2 * i + 2
        if not existe(izq) and not existe(der):
            return 1
        return recorrido(izq) + recorrido(der)
    return recorrido(0)`,
    explanation:
      "La recursión es la misma del cap. 13 con un acumulador distinto: el nodo cuenta 1 cuando AMBOS hijos están ausentes (fuera del array o None) y si no reparte la pregunta entre 2i+1 y 2i+2. En un array por niveles un None puede tener nietos (el hueco no corta la rama a la derecha) — por eso existe() mira primero y la hoja se define por la AUSENCIA de hijos, no por la marca del array.",
    tradeoff:
      "Recursión por índices = nadie materializa el árbol; pila pequeña si está balanceado (O(log n)) y O(n) recorrido puntual. La versión con cola (BFS nivel a nivel) añade memoria O(n) para salvar la profundidad — misma cuenta, más estructura. Con BFS podrías parar antes si todo lo que queda son huecos… pero el array ES el árbol: jugar con índices es el atajo más limpio.",
    hints: [
      "existe(i) = i < len(level) y level[i] no es None.",
      "Hoja: sin hijos izq. NI der. — y devuelve 1 entonces.",
      "El total es la suma de hojas de las dos ramas.",
    ],
    tests: [
      { name: "raiz con dos hojas", args: [[1, 2, 3]], expected: 2 },
      { name: "solo raiz", args: [[7]], expected: 1 },
      { name: "vacio", args: [[]], expected: 0 },
      { name: "con hueco al medio", args: [[1, 2, 3, 4, null, null, 6, 7]], expected: 2, hidden: true },
    ],
  },
  {
    id: "bst-k-esimo",
    chapter: "binary-search-trees",
    title: "El k-ésimo del BST",
    difficulty: "medio",
    blurb: "Dado el orden de inserciones, construye al vuelo el BST insertando en ese orden y devuelve el k-ésimo valor más pequeño (k desde 1). Si k supera al número de nodos, −1.",
    setupCode: `def bst_k(orden, k):
    \"\"\"k-ésimo más pequeño del BST construido con las inserciones dadas.\"\"\"
    pass

_target = bst_k`,
    starterCode: `def bst_k(orden, k):
    # TODO: insertar en orden y recorrer inorder contando
    pass`,
    solutionCode: `def bst_k(orden, k):
    raiz = None

    class Nodo:
        def __init__(self, valor):
            self.valor = valor
            self.izq = None
            self.der = None

    def insertar(nodo, valor):
        if nodo is None:
            return Nodo(valor)
        if valor < nodo.valor:
            nodo.izq = insertar(nodo.izq, valor)
        else:
            nodo.der = insertar(nodo.der, valor)
        return nodo

    for v in orden:
        raiz = insertar(raiz, v)

    contador = [0]
    respuesta = [-1]

    def inorder(nodo):
        if nodo is None or respuesta[0] != -1:
            return
        inorder(nodo.izq)
        contador[0] += 1
        if contador[0] == k:
            respuesta[0] = nodo.valor
            return
        inorder(nodo.der)

    inorder(raiz)
    return respuesta[0]`,
    explanation:
      "Insertar en un BST (cap. 15): menor a la izquierda, mayor/igual a la derecha; el árbol que salga refleja el orden de llegada, no sale ordenado por sí solo. Y ahí está el tiro: el inorder de CUALQUIER BST sale creciente — recorrer en ese orden y contar es encontrar el k-ésimo sin ordenar nada. El cortocircuito (respuesta != -1) detiene la recursión en cuanto lo encuentra, la poda del inorder contado.",
    tradeoff:
      "El inorder completo cuesta O(n) SIEMPRE, con o sin cortocircuito; pero con un BST aumentado (cada nodo anota cuántos viven debajo) el k-ésimo baja a O(h) con una única bajada. Si el árbol llegara balanceado, O(log n): el balanceo es quien paga el siguiente tramo del capítulo 15 — y la altura depende del orden de inserción, que aquí dicta el array.",
    hints: [
      "insertar(nodo, valor): menor → izquierda; si no, derecha.",
      "El inorder visita izq, el nodo mismo, der — cuenta y compara con k.",
      "Deténte en cuanto el contador toque k — no sigas recorriendo el árbol entero.",
    ],
    tests: [
      { name: "el tercero de seis", args: [[5, 3, 7, 1, 4, 9], 3], expected: 4 },
      { name: "el primero", args: [[2, 1, 3], 1], expected: 1 },
      { name: "k fuera de rango", args: [[5, 3, 7], 5], expected: -1 },
      { name: "un nodo", args: [[10], 1], expected: 10 },
      { name: "el mayor (oculto)", args: [[5, 3, 7, 1, 4, 9], 6], expected: 9, hidden: true },
    ],
  },
  {
    id: "contar-prefijo",
    chapter: "tries",
    title: "Cuántas palabras empiezan por el prefijo",
    difficulty: "fácil",
    blurb: "Dado un diccionario de palabras y una consulta q, devuelve cuántas palabras empiezan por q. El prefijo vacío cuenta TODAS. Con un trie, construirlo cuesta una vez y cada consulta es una bajada; para pocas consultas, el bucle con startswith basta.",
    setupCode: `def contar_prefijo(palabras, q):
    """Cuántas palabras empiezan por el prefijo q."""
    pass

_target = contar_prefijo`,
    starterCode: `def contar_prefijo(palabras, q):
    # TODO: opcion A) startswith en un bucle
    #       opcion B) trie: baja por el prefijo y cuenta la hoja
    pass`,
    solutionCode: `def contar_prefijo(palabras, q):
    trie = {}
    END = "fin"
    for palabra in palabras:
        nodo = trie
        for letra in palabra:
            nodo = nodo.setdefault(letra, {})
        nodo[END] = True

    nodo = trie
    for letra in q:
        if letra not in nodo:
            return 0
        nodo = nodo[letra]

    def cuenta(rama):
        total = 1 if END in rama else 0
        for letra, sub in rama.items():
            if letra != END:
                total += cuenta(sub)
        return total

    return cuenta(nodo)`,
    explanation:
      "El trie del cap. 16 en su forma de dict de dicts: cada palabra deja un camino de caracteres y una marca de fin. La consulta q es solo una bajada por ese camino: si una letra no está, cero; si está, el subárbol colgante concentra TODAS las palabras que comparten el prefijo — contarlas ahí es recorrer ese subárbol, no todo el diccionario. El caso del prefijo vacío sale gratis: el nodo de arranque ES la raíz entera.",
    tradeoff:
      "El bucle con startswith es O(m·L) POR CONSULTA (m palabras, L longitud) y su código cabe en tres líneas — perfecto para pocas consultas o diccionarios pequeños. El trie cuesta O(total de caracteres) UNA VEZ y cada consulta es O(len(q) + subárbol): con miles de q sobre el mismo diccionario la diferencia es de minutos a milisegundos. Es exactamente el intercambio del capítulo: ¿estructura propia o bucle cada vez?",
    hints: [
      "Dict de dicts: nodo[letra] = sub-dict; tras la última letra, una marca de fin.",
      "Baja por q letra a letra; una letra ausente → 0 de golpe.",
      "El conteo del subárbol: +1 si hay marca de fin, y recursión por cada rama distinta de la marca.",
    ],
    tests: [
      { name: "tres con anillo", args: [["ana", "anillo", "andaluz", "bolso"], "an"], expected: 3 },
      { name: "prefijo vacio todas", args: [["hola"], ""], expected: 1 },
      { name: "ninguna con z", args: [["a", "b", "ab"], "z"], expected: 0 },
      { name: "dos con a (oculto)", args: [["a", "b", "ab"], "a"], expected: 2, hidden: true },
    ],
  },
  {
    id: "cuello-ruta",
    chapter: "mst",
    title: "El peaje máximo de la ruta más ligera",
    difficulty: "medio",
    blurb: "Grafo no dirigido con nodos 0..n−1 y aristas [u, v, w]: entre s y t, encuentra el camino cuya arista MÁS PESADA sea lo más pequeña posible (problema minimax) y devuelve ese peso. s == t → 0; sin conexión → −1.",
    setupCode: `def cuello_ruta(n, edges, s, t):
    """Minimax: mínimo sobre caminos del máximo de sus aristas."""
    pass

_target = cuello_ruta`,
    starterCode: `def cuello_ruta(n, edges, s, t):
    # TODO: ordena por peso y une componentes hasta que s y t toquen
    pass`,
    solutionCode: `def cuello_ruta(n, edges, s, t):
    padre = list(range(n))

    def buscar(x):
        while padre[x] != x:
            x = padre[x]
        return x

    if s == t:
        return 0
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        ru, rv = buscar(u), buscar(v)
        if ru != rv:
            padre[ru] = rv
        if buscar(s) == buscar(t):
            return w
    return -1`,
    explanation:
      "Es Kruskal con un objetivo distinto: en el cap. 20 sumabas pesos hasta conectar el grafo; aquí te paras en la PRIMERA arista que pisa s y t en la misma componente. ¿Por qué funciona? Un camino de s a t solo puede existir con aristas de peso ≤ w, y la primera arista que consigue unir sus componentes marca el MÍNIMO w que lo logra — la propiedad del corte al servicio del minimax.",
    tradeoff:
      "Sort + union-find es O(E log E) y el código cabe en media pantalla — formidable para consultas de UN par (s, t). Con MUCHOS pares conviene el MST completo (el camino entre cualquiera de los dos por el árbol de expansión mínima es su minimax óptimo) o un preprocesado por componentes; Dijkstra con max en vez de suma lo resuelve por O(E log V) par a par pero es mucho más código para un solo par.",
    hints: [
      "sorted(edges, key=lambda e: e[2]): aristas de barato a caro.",
      "Fusiona componentes, no mires pesos para la suma — solo para avanzar.",
      "En cuanto s y t tocan la misma componente, el peso de la arista de esa ronda es la respuesta.",
    ],
    tests: [
      { name: "tres aristas necesarias", args: [4, [[0, 1, 2], [1, 2, 3], [2, 3, 4]], 0, 3], expected: 4 },
      { name: "hay un atajo", args: [5, [[0, 1, 1], [1, 3, 9], [0, 2, 1], [2, 3, 2]], 0, 3], expected: 2 },
      { name: "origen y destino iguales", args: [3, [[0, 1, 5]], 2, 2], expected: 0 },
      { name: "el barato llega igual (oculto)", args: [3, [[0, 1, 2], [1, 2, 1]], 0, 2], expected: 2, hidden: true },
    ],
  },
  {
    id: "potencia-de-cuatro",
    chapter: "bit-operations",
    title: "¿Es potencia de cuatro?",
    difficulty: "fácil",
    blurb: "Devuelve True si n es una potencia exacta de cuatro (4⁰ = 1, 4, 16, 64…). El truco de bits apaga la duda: potencia de dos con el 1 en posición par.",
    setupCode: `def potencia_cuatro(n):
    \"\"\"True si n == 4**k para algún k ≥ 0.\"\"\"
    pass

_target = potencia_cuatro`,
    starterCode: `def potencia_cuatro(n):
    # TODO: primero potencia de dos; luego la posición del bit
    pass`,
    solutionCode: `def potencia_cuatro(n):
    if n <= 0:
        return False
    if n & (n - 1) != 0:
        return False
    return (n & 0x5555555555555555) == n`,
    explanation:
      "Dos cerrojos sientan el veredicto. Primero n & (n−1) == 0: «apaga el uno más bajo», y si el resultado es cero, n solo tenía UN bit — es potencia de dos (o n ≤ 0, bloqueado arriba). Pero 8 también pasa ese filtro; la diferencia es DÓNDE vive el bit: las potencias de cuatro lo sitúan en posiciones 0, 2, 4… (pares), así que comparar n con la máscara 0b…0101 (0x55…) debe salir idéntica. Un solo AND explica lo que el módulo n % 3 confirmaría a ojo de número.",
    tradeoff:
      "El bucle de dividir entre 4 también acaba (O(log₄ n)) y lo entiende cualquiera; el bitmask es O(1) en dos instrucciones y funciona con números gigantes sin tocar el valor. En la entrevista cuadra con la ronda del capítulo 22: máscara para la potencia de dos y máscara 0x55… para la posición. El módulo (n % 3 == 1 después del filtro) es la alternativa aritmética con menos refrán pero misma eficacia.",
    hints: [
      "n & (n−1) == 0 quiere decir «un solo bit encendido».",
      "Con solo un bit, revisa que caiga en posición par: la máscara 0x5555…5555 tiene 1 en las posiciones pares (0, 2, 4…)",
      "n ≤ 0 sale False ANTES de los ANDs.",
    ],
    tests: [
      { name: "uno", args: [1], expected: true },
      { name: "cuatro", args: [4], expected: true },
      { name: "ocho es solo de dos", args: [8], expected: false },
      { name: "sesenta y cuatro", args: [64], expected: true },
      { name: "cero", args: [0], expected: false },
      { name: "seis no", args: [6], expected: false, hidden: true },
      { name: "negativo (oculto)", args: [-4], expected: false, hidden: true },
    ],
  },

];
