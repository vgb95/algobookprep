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
    chapter: "hash",
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
    chapter: "hash",
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
    chapter: "hash",
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
];
