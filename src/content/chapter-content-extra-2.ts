import { ChapterContent } from "./blocks";

/**
 * Capítulo 6 — Strings
 */
export const stringsChapter: ChapterContent = {
  id: "strings",
  num: 6,
  title: "Strings",
  blurb:
    "Cadenas y sus operaciones clásicas: concatenar, buscar subcadenas, prefijos útiles.",
  blocks: [
    {
      kind: "prose",
      id: "str-intro",
      text:
        "Una **cadena (string)** es una secuencia de caracteres. En la práctica se implementa como un array de caracteres (o bytes), lo que significa que el acceso por índice es O(1), pero operaciones como concatenar o insertar en medio pueden costar O(n).",
    },
    {
      kind: "prose",
      id: "str-substring",
      text:
        "Buscar una subcadena dentro de otra es el problema clásico del *string matching*. La ingenua compara carácter por carácter en cada posición: O(n × m) donde n es el texto y m el patrón. Existen algoritmos más rápidos como KMP, Rabin-Karp y Boyer-Moore.",
    },
    {
      kind: "formula",
      id: "str-naive",
      latex: "T(n, m) = O((n - m + 1) \\cdot m) = O(n \\cdot m)",
    },
    {
      kind: "prose",
      id: "str-hash",
      text:
        "Una técnica común es usar **hash rodante**: calcular el hash del patrón y deslizar una ventana sobre el texto, comparando hashes en O(1) por paso. Si los hashes coinciden, se verifica carácter por carácter para evitar falsos positivos.",
    },
    {
      kind: "viz",
      id: "str-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100", target: "87" },
    },
    {
      kind: "prose",
      id: "str-outro",
      text:
        "En muchos lenguajes las cadenas son inmutables: cada concatenación crea una nueva copia. Para construir cadenas por partes se usa un *StringBuilder* o lista de fragmentos, unido al final en una sola operación O(n).",
    },
  ],
};

/**
 * Capítulo 7 — Matrices
 */
export const matricesChapter: ChapterContent = {
  id: "matrices",
  num: 7,
  title: "Matrices",
  blurb:
    "El array bidimensional y sus recorridos: filas, columnas y diagonales.",
  blocks: [
    {
      kind: "prose",
      id: "mat-intro",
      text:
        "Una **matriz** es un array de arrays (o un bloque de memoria contigua indexado por dos coordenadas). El elemento en fila *i* y columna *j* se accede en O(1): `mat[i][j]` o `mat[i * cols + j]` si se aplanó en un solo array.",
    },
    {
      kind: "formula",
      id: "mat-index",
      latex: "\\text{pos}(i, j) = i \\cdot \\text{columnas} + j",
    },
    {
      kind: "prose",
      id: "mat-traversal",
      text:
        "Recorrer una matriz completa visita n × m elementos: O(n · m) tiempo. El orden del recorrido importa para la caché de CPU: recorrer por filas (major order) es más rápido que por columnas en lenguajes donde las filas son contiguas.",
    },
    {
      kind: "prose",
      id: "mat-rot-transpose",
      text:
        "Operaciones clásicas:\n- **Transponer:** intercambiar filas y columnas.\n- **Rotar 90°:** transponer y luego invertir cada fila.\n- **Suma de matrices:** elemento a elemento, O(n · m).\n- **Multiplicación:** producto punto de filas por columnas, O(n · m · p) para matrices n×m y m×p.",
    },
    {
      kind: "viz",
      id: "mat-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "1, 2, 3, 4, 5, 6, 7, 8, 9", target: "5" },
    },
    {
      kind: "prose",
      id: "mat-outro",
      text:
        "Las matrices son la base de gráficos por computadora, procesamiento de imágenes y álgebra lineal. Los grafos (capítulos 17-20) se representan a menudo como matriz de adyacencia.",
    },
  ],
};

/**
 * Capítulo 8 — LinkedLists
 */
export const linkedListsChapter: ChapterContent = {
  id: "linked-lists",
  num: 8,
  title: "LinkedLists",
  blurb:
    "Nodos con punteros: inserción en O(1) cuando ya conoces la posición.",
  blocks: [
    {
      kind: "prose",
      id: "ll-intro",
      text:
        "Una **lista enlazada** es una secuencia de nodos donde cada nodo guarda un valor y un puntero al siguiente nodo. No hay memoria contigua: para llegar al nodo *i* hay que recorrer desde el cabeza, por eso el acceso por índice es O(n).",
    },
    {
      kind: "prose",
      id: "ll-insert",
      text:
        "Su ventaja brilla al insertar o borrar: si ya tienes el puntero al nodo anterior, insertar después de él es **O(1)** — solo cambias dos punteros. En un array costaría O(n) por desplazar elementos.",
    },
    {
      kind: "prose",
      id: "ll-types",
      text:
        "Variantes comunes:\n- **Simple:** cada nodo apunta al siguiente; el último apunta a null.\n- **Doble:** cada nodo apunta al siguiente y al anterior; permite recorrer hacia atrás.\n- **Circular:** el último nodo apunta al primero, formando un anillo.",
    },
    {
      kind: "viz",
      id: "ll-lookup-viz",
      type: "array",
      config: { op: "lookup", array: "10, 20, 30, 40, 50", target: "30" },
    },
    {
      kind: "prose",
      id: "ll-outro",
      text:
        "Las listas enlazadas son la base de pilas, colas y estructuras de memoria dinámica. Su desventaja es el acceso aleatorio lento y el uso extra de memoria para los punteros.",
    },
  ],
};
