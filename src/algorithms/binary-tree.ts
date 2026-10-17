/**
 * Árbol binario de búsqueda (BST) — generador de frames para recorridos.
 *
 * Cada frame es una foto del árbol: qué nodo se visita, el camino de la
 * pila de recursión (path) y el orden de visita hasta ahora. Los frames
 * siguen el snippet canónico de cada recorrido: llamada, caso base,
 * visita y retorno (subimos un nivel). Todo esto alimenta el code
 * playback (Fase 2).
 */

export const INORDER_CODE = `def inorder(node):
    if node is None:
        return
    inorder(node.left)
    visit(node)
    inorder(node.right)`;

export const PREORDER_CODE = `def preorder(node):
    if node is None:
        return
    visit(node)
    preorder(node.left)
    preorder(node.right)`;

export const POSTORDER_CODE = `def postorder(node):
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    visit(node)`;

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
  line?: number;
  hold?: number;
  vars?: Record<string, string | number>;
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

type TreeGen = Generator<TreeFrame, void, undefined>;

interface TreeCtx {
  nodes: TreeNode[];
  visitOrder: number[];
  stack: number[];
}

function makeFramer(orderLabel: string, ctx: TreeCtx) {
  const { nodes, visitOrder, stack } = ctx;
  return (
    message: string,
    currentId: number | null,
    line: number,
    hold?: number,
  ): TreeFrame => ({
    message,
    nodes: nodes.map((n) => ({
      id: n.id,
      value: n.value,
      visited: visitOrder.includes(n.id),
      current: n.id === currentId,
      path: stack.includes(n.id),
    })),
    order: [...visitOrder],
    line,
    hold,
    vars: {
      pila: stack.length ? stack.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ") : "∅",
      visitados: visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(", ") || "∅",
      recorrido: orderLabel,
    },
  });
}

/* ————— Inorder: izq → raíz → der ————— */

export function* inorderTraversal(input: number[]): TreeGen {
  const values = [...new Set(input)].sort((a, b) => a - b);
  if (values.length === 0) {
    yield { message: "Árbol vacío: nada que recorrer.", nodes: [], order: [], line: 2, hold: 1.5, vars: {} };
    return;
  }
  const { root, nodes } = buildBalanced(values);
  const ctx: TreeCtx = { nodes, visitOrder: [], stack: [] };
  const frame = makeFramer("inorder", ctx);

  yield frame("Construimos el BST balanceado. Orden inorder: izquierda → raíz → derecha.", null, 1, 1.2);

  function* walk(nodeId: number | null, caller: number | null): Generator<TreeFrame, void, undefined> {
    if (nodeId === null) {
      const parent = caller !== null ? nodes.find((n) => n.id === caller)! : null;
      yield frame(
        parent
          ? `Hijo de ${parent.value} es None: return inmediato (caso base).`
          : "Árbol vacío: return (caso base).",
        caller,
        2,
        0.9,
      );
      return;
    }
    const node = nodes.find((n) => n.id === nodeId)!;
    ctx.stack.push(nodeId);
    yield frame(`Entramos en el nodo ${node.value}: primero todo su subárbol izquierdo.`, nodeId, 1);
    yield* walk(node.left, nodeId);
    ctx.visitOrder.push(nodeId);
    yield frame(`Izquierda de ${node.value} resuelta: lo visitamos a él.`, nodeId, 5, 1.2);
    yield frame(`Ahora despachamos inorder(hijo derecho de ${node.value}).`, nodeId, 6);
    yield* walk(node.right, nodeId);
    ctx.stack.pop();
    yield frame(`Termina la llamada de ${node.value}: subimos un nivel.`, nodeId, 3, 0.9);
  }

  yield* walk(root, null);
  yield frame(
    `Recorrido inorder completo: ${ctx.visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ")}.`,
    null,
    6,
    2,
  );
}

/* ————— Preorder: raíz → izq → der ————— */

export function* preorderTraversal(input: number[]): TreeGen {
  const values = [...new Set(input)].sort((a, b) => a - b);
  if (values.length === 0) {
    yield { message: "Árbol vacío: nada que recorrer.", nodes: [], order: [], line: 2, hold: 1.5, vars: {} };
    return;
  }
  const { root, nodes } = buildBalanced(values);
  const ctx: TreeCtx = { nodes, visitOrder: [], stack: [] };
  const frame = makeFramer("preorder", ctx);

  yield frame("Construimos el BST balanceado. Orden preorder: raíz → izquierda → derecha.", null, 1, 1.2);

  function* walk(nodeId: number | null, caller: number | null): Generator<TreeFrame, void, undefined> {
    if (nodeId === null) {
      const parent = caller !== null ? nodes.find((n) => n.id === caller)! : null;
      yield frame(
        parent
          ? `Hijo de ${parent.value} es None: return inmediato (caso base).`
          : "Árbol vacío: return (caso base).",
        caller,
        2,
        0.9,
      );
      return;
    }
    const node = nodes.find((n) => n.id === nodeId)!;
    ctx.stack.push(nodeId);
    yield frame(`Entramos en el nodo ${node.value}: lo visitamos nada más llegar.`, nodeId, 4, 1.2);
    ctx.visitOrder.push(nodeId);
    yield frame(`Visitado ${node.value}. Bajamos a su subárbol izquierdo.`, nodeId, 5);
    yield* walk(node.left, nodeId);
    yield frame(`Izquierda de ${node.value} resuelta: ahora su subárbol derecho.`, nodeId, 6);
    yield* walk(node.right, nodeId);
    ctx.stack.pop();
    yield frame(`Termina la llamada de ${node.value}: subimos un nivel.`, nodeId, 3, 0.9);
  }

  yield* walk(root, null);
  yield frame(
    `Recorrido preorder completo: ${ctx.visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ")}.`,
    null,
    6,
    2,
  );
}

/* ————— Postorder: izq → der → raíz ————— */

export function* postorderTraversal(input: number[]): TreeGen {
  const values = [...new Set(input)].sort((a, b) => a - b);
  if (values.length === 0) {
    yield { message: "Árbol vacío: nada que recorrer.", nodes: [], order: [], line: 2, hold: 1.5, vars: {} };
    return;
  }
  const { root, nodes } = buildBalanced(values);
  const ctx: TreeCtx = { nodes, visitOrder: [], stack: [] };
  const frame = makeFramer("postorder", ctx);

  yield frame("Construimos el BST balanceado. Orden postorder: izquierda → derecha → raíz.", null, 1, 1.2);

  function* walk(nodeId: number | null, caller: number | null): Generator<TreeFrame, void, undefined> {
    if (nodeId === null) {
      const parent = caller !== null ? nodes.find((n) => n.id === caller)! : null;
      yield frame(
        parent
          ? `Hijo de ${parent.value} es None: return inmediato (caso base).`
          : "Árbol vacío: return (caso base).",
        caller,
        2,
        0.9,
      );
      return;
    }
    const node = nodes.find((n) => n.id === nodeId)!;
    ctx.stack.push(nodeId);
    yield frame(`Entramos en el nodo ${node.value}: sus descendientes primero, él al final.`, nodeId, 1);
    yield frame(`Ahora postorder(hijo izquierdo de ${node.value}).`, nodeId, 4);
    yield* walk(node.left, nodeId);
    yield frame(`Izquierda de ${node.value} resuelta: ahora su subárbol derecho.`, nodeId, 5);
    yield* walk(node.right, nodeId);
    ctx.visitOrder.push(nodeId);
    ctx.stack.pop();
    yield frame(`Ambos subárboles listos: visitamos ${node.value} y subimos un nivel.`, nodeId, 6, 1.2);
  }

  yield* walk(root, null);
  yield frame(
    `Recorrido postorder completo: ${ctx.visitOrder.map((i) => nodes.find((n) => n.id === i)!.value).join(" → ")}.`,
    null,
    6,
    2,
  );
}

export type TreeOrder = "inorder" | "preorder" | "postorder";

export const treeOrders: Record<
  TreeOrder,
  { name: string; code: string; run: (a: number[]) => TreeGen }
> = {
  inorder: { name: "Inorder (izq → raíz → der)", code: INORDER_CODE, run: inorderTraversal },
  preorder: { name: "Preorder (raíz → izq → der)", code: PREORDER_CODE, run: preorderTraversal },
  postorder: { name: "Postorder (izq → der → raíz)", code: POSTORDER_CODE, run: postorderTraversal },
};
