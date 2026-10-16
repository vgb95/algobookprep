/**
 * Árbol binario de búsqueda (BST) — generador de frames para recorridos.
 *
 * Cada frame es una foto del árbol: qué nodo se visita, el camino recorrido
 * y el orden de visita. El renderizador SVG lo dibuja como un árbol real.
 */

export interface TreeNode {
  id: number;
  value: number;
  left: number | null;
  right: number | null;
}

export interface TreeFrame {
  message: string;
  nodes: Array<{
    id: number;
    value: number;
    visited: boolean;
    current: boolean;
    path: boolean;
  }>;
  order: number[]; // ids en orden de visita hasta ahora
}

/** Construye un BST balanceado a partir de un array ordenado único. */
function buildBalanced(values: number[], nextId = 0): { root: number | null; nodes: TreeNode[]; nextId: number } {
  const nodes: TreeNode[] = [];
  function insert(val: number): number {
    const id = nextId++;
    nodes.push({ id, value: val, left: null, right: null });
    return id;
  }
  function build(lo: number, hi: number, parentId: number | null, isLeft: boolean): number | null {
    if (lo > hi) return null;
    const mid = Math.floor((lo + hi) / 2);
    const id = insert(values[mid]);
    if (parentId !== null) {
      const p = nodes.findIndex((n) => n.id === parentId);
      if (isLeft) nodes[p].left = id; else nodes[p].right = id;
    }
    build(lo, mid - 1, id, true);
    build(mid + 1, hi, id, false);
    return id;
  }
  const root = build(0, values.length - 1, null, false);
  return { root, nodes, nextId };
}

export function* inorderTraversal(input: number[]): Generator<TreeFrame> {
  const values = [...new Set(input)].sort((a, b) => a - b);
  if (values.length === 0) {
    yield { message: "Árbol vacío: nada que recorrer.", nodes: [], order: [] };
    return;
  }
  const { root, nodes } = buildBalanced(values);
  const visitOrder: number[] = [];
  const frame = (message: string, currentId: number | null, visitedSet: Set<number>): TreeFrame => ({
    message,
    nodes: nodes.map((n) => ({
      id: n.id,
      value: n.value,
      visited: visitedSet.has(n.id),
      current: n.id === currentId,
      path: false,
    })),
    order: [...visitOrder],
  });

  yield frame("Construimos el BST balanceado. Empezamos el recorrido inorder (izq → raíz → der).", null, new Set());

  function* walk(nodeId: number | null): Generator<TreeFrame> {
    if (nodeId === null) return;
    const node = nodes.find((n) => n.id === nodeId)!;
    yield* walk(node.left);
    visitOrder.push(nodeId);
    yield frame(`Visitamos el nodo ${node.value} (inorder).`, nodeId, new Set(visitOrder));
    yield* walk(node.right);
  }

  yield* walk(root);
  yield frame(`Recorrido inorder completo: ${visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ")}.`, null, new Set(visitOrder));
}

export function* preorderTraversal(input: number[]): Generator<TreeFrame> {
  const values = [...new Set(input)].sort((a, b) => a - b);
  if (values.length === 0) {
    yield { message: "Árbol vacío: nada que recorrer.", nodes: [], order: [] };
    return;
  }
  const { root, nodes } = buildBalanced(values);
  const visitOrder: number[] = [];
  const frame = (message: string, currentId: number | null, visitedSet: Set<number>): TreeFrame => ({
    message,
    nodes: nodes.map((n) => ({
      id: n.id,
      value: n.value,
      visited: visitedSet.has(n.id),
      current: n.id === currentId,
      path: false,
    })),
    order: [...visitOrder],
  });

  yield frame("Construimos el BST. Empezamos el recorrido preorder (raíz → izq → der).", null, new Set());

  function* walk(nodeId: number | null): Generator<TreeFrame> {
    if (nodeId === null) return;
    const node = nodes.find((n) => n.id === nodeId)!;
    visitOrder.push(nodeId);
    yield frame(`Visitamos el nodo ${node.value} (preorder).`, nodeId, new Set(visitOrder));
    yield* walk(node.left);
    yield* walk(node.right);
  }

  yield* walk(root);
  yield frame(`Recorrido preorder completo: ${visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ")}.`, null, new Set(visitOrder));
}

export function* postorderTraversal(input: number[]): Generator<TreeFrame> {
  const values = [...new Set(input)].sort((a, b) => a - b);
  if (values.length === 0) {
    yield { message: "Árbol vacío: nada que recorrer.", nodes: [], order: [] };
    return;
  }
  const { root, nodes } = buildBalanced(values);
  const visitOrder: number[] = [];
  const frame = (message: string, currentId: number | null, visitedSet: Set<number>): TreeFrame => ({
    message,
    nodes: nodes.map((n) => ({
      id: n.id,
      value: n.value,
      visited: visitedSet.has(n.id),
      current: n.id === currentId,
      path: false,
    })),
    order: [...visitOrder],
  });

  yield frame("Construimos el BST. Empezamos el recorrido postorder (izq → der → raíz).", null, new Set());

  function* walk(nodeId: number | null): Generator<TreeFrame> {
    if (nodeId === null) return;
    const node = nodes.find((n) => n.id === nodeId)!;
    yield* walk(node.left);
    yield* walk(node.right);
    visitOrder.push(nodeId);
    yield frame(`Visitamos el nodo ${node.value} (postorder).`, nodeId, new Set(visitOrder));
  }

  yield* walk(root);
  yield frame(`Recorrido postorder completo: ${visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ")}.`, null, new Set(visitOrder));
}

export type TreeOrder = "inorder" | "preorder" | "postorder";

export const treeOrders: Record<TreeOrder, { name: string; run: (a: number[]) => Generator<TreeFrame> }> = {
  inorder: { name: "Inorder (izq → raíz → der)", run: inorderTraversal },
  preorder: { name: "Preorder (raíz → izq → der)", run: preorderTraversal },
  postorder: { name: "Postorder (izq → der → raíz)", run: postorderTraversal },
};
