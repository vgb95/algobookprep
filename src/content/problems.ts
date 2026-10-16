import type { ProblemTest } from "../engine/evaluator";

export interface Problem {
  id: string;
  chapter: string;
  title: string;
  difficulty: "fácil" | "medio" | "difícil";
  blurb: string;
  setupCode: string;      // código que se ejecuta antes (define la firma)
  starterCode: string;    // lo que ve el alumno en el editor
  solutionCode: string;   // solución de referencia (oculta)
  tests: ProblemTest[];   // tests visibles + ocultos
  hint: string;
  explanation: string;
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
    tests: [
      { name: "caso básico", args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: "números negativos", args: [[-3, 4, 3, 90], 0], expected: [0, 2] },
      { name: "sin solución", args: [[1, 2, 3], 7], expected: [] },
      { name: "test oculto", args: [[3, 2, 4], 6], expected: [1, 2], hidden: true },
    ],
    hint: "Usa un diccionario para recordar qué número has visto y en qué índice.",
    explanation: "Almacena cada número en un diccionario {valor: índice}. Para cada número, comprueba si target - valor ya está en el diccionario. O(n) tiempo, O(n) espacio.",
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
    tests: [
      { name: "con duplicados", args: [[1, 2, 3, 1]], expected: true },
      { name: "sin duplicados", args: [[1, 2, 3, 4]], expected: false },
      { name: "vacío", args: [[]], expected: false },
      { name: "test oculto", args: [[1, 1, 1, 3, 3, 4, 3, 2]], expected: true, hidden: true },
    ],
    hint: "Compara la longitud del array con la de su conjunto (set).",
    explanation: "Un set elimina duplicados. Si hay duplicados, el set es más corto que el array original.",
  },
];
