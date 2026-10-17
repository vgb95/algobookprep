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
];
