import mergeSort from "../mergeSort/mergeSort";

class TreeNode<NodeElement> {
  data: NodeElement;
  left: TreeNode<NodeElement> | null;
  right: TreeNode<NodeElement> | null;

  constructor (value: NodeElement) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree<NodeElement> {
  #root: TreeNode<NodeElement> | null;
  constructor(inputArray: NodeElement[]) {
    this.#root = this.#buildTree(mergeSort(Array.from(new Set(inputArray.slice()))));
  };
  get root() {
    return this.#root;
  };
  #buildTree(array: NodeElement[]) {
    if (array.length < 1) return null;
    const mid = Math.floor(array.length / 2);
    const newNode = new TreeNode(array[mid]);
    newNode.left = this.#buildTree(array.slice(0, mid));
    newNode.right = this.#buildTree(array.slice(mid + 1));
    return newNode;
  };
  insert(value: NodeElement) {
    this.#root = this.#insertHelper(this.root, value);
  };
  #insertHelper(node: TreeNode<NodeElement> | null, value: NodeElement): TreeNode<NodeElement> {
    if (node === null) return new TreeNode(value);
    if (value < node.data) node.left = this.#insertHelper(node.left, value);
    if (value > node.data) node.right = this.#insertHelper(node.right, value);
    return node;
  }
  remove(value: NodeElement) {
    this.#root = this.#removeHelper(this.root, value);
  }
  #removeHelper(node: TreeNode<NodeElement> | null, value: NodeElement): TreeNode<NodeElement> | null {
    // console.log(1, node, value);
    if (node === null) return node;
    if (node.left && value < node.data) {
      // console.log(2, node);
      node.left = this.#removeHelper(node.left, value);
      return node;
    }
    // console.log(3, node);
    if (node.right !== null && value > node.data) {
      // console.log(4, node);
      node.right = this.#removeHelper(node.right, value);
      return node;
    }
    // console.log(5, node);
    if (node.data === value) {
      // console.log(6, node);
      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      let pointer = node.right;
      while(pointer.left !== null) {
        pointer = pointer.left;
      }
      pointer.left = node.left;
      return pointer
    }
    // console.log(7, node);
    return node;
  }
  find(value: NodeElement) {
    let pointer = this.root;
    while(pointer) {
      if (value < pointer.data) {
        pointer = pointer.left
      } else if (value > pointer.data) {
        pointer = pointer.right
      } else {
        return pointer;
      }
    }
    return undefined;
  }
  levelOrderIter(cb?: (x: TreeNode<NodeElement>) => any) {
    let pointer: TreeNode<NodeElement> | null | undefined = this.root; 
    const queue = [];
    const values = [];
    do {
      if (pointer !== null && pointer !== undefined) {
        queue.push(pointer.left);
        queue.push(pointer.right);
        values.push(pointer.data);
        if (cb !== undefined) cb(pointer);
        if (queue.length === 1) queue.push(null);
      }
      pointer = queue.shift();
    } while (queue.length > 0);
    return values;
  }
  inorder(cb?: (x: TreeNode<NodeElement>) => any) {
    const values: NodeElement[] = [];
    this.#inorderHelper(this.root, values, cb);
    return values;
  }
  #inorderHelper(node: TreeNode<NodeElement> | null, values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    if (node === null) return;
    this.#inorderHelper(node.left, values, cb);
    values.push(node.data);
    if (cb !== undefined) cb(node);
    this.#inorderHelper(node.right, values, cb);
  }
  preorder(cb?: (x: TreeNode<NodeElement>) => any) {
    const values: NodeElement[] = [];
    this.#preorderHelper(this.root, values, cb);
    return values;
  }
  #preorderHelper(node: TreeNode<NodeElement> | null, values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    if (node === null) return;
    values.push(node.data);
    if (cb !== undefined) cb(node);
    this.#preorderHelper(node.left, values, cb);
    this.#preorderHelper(node.right, values, cb);
  }
  postorder(cb?: (x: TreeNode<NodeElement>) => any) {
    const values: NodeElement[] = [];
    this.#postorderHelper(this.root, values, cb);
    return values;
  }
  #postorderHelper(node: TreeNode<NodeElement> | null, values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    if (node === null) return;
    this.#postorderHelper(node.left, values, cb);
    this.#postorderHelper(node.right, values, cb);
    values.push(node.data);
    if (cb !== undefined) cb(node);
  }
  height(node: TreeNode<NodeElement>) {
    let leftSteps = 1;
    let rightSteps = 1;
    let pointer = node.left;
    while(pointer) {
      leftSteps += 1;
      pointer = pointer.left;
    }
    pointer = node.right;
    while(pointer) {
      rightSteps += 1;
      pointer = pointer.right;
    }
    return leftSteps >= rightSteps ? leftSteps : rightSteps;
  }
  depth(node: TreeNode<NodeElement>, currentNode = this.root): number {
    if (currentNode === null) return -1;
    if (node.data < currentNode.data) {
      return 1 + this.depth(node, currentNode.left);
    }
    if (node.data > currentNode.data) {
      return 1 + this.depth(node, currentNode.right);
    }
    return 0;
  }
  isBalanced() {
    let balancedStatus = true;
    const callback = (node: TreeNode<NodeElement>) => {
      let leftHeight = 0;
      let rightHeight = 0;
      if (node.left) leftHeight = this.height(node.left);
      if (node.right) rightHeight = this.height(node.right);
      const diff = Math.abs(leftHeight - rightHeight);
        if (balancedStatus) {
          balancedStatus = diff > 1 ? false : true;
        }
    }
    this.levelOrderIter(callback);
    return balancedStatus;
  }
  rebalance() {
    this.#root = this.#buildTree(this.inorder())
  }
}

const prettyPrint = (node: TreeNode<number> | null, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const generateRandomArray = (size: number): number[] => {
  const newSet = new Set<number>();
  while(newSet.size < size) {
    newSet.add(Math.floor(Math.random() * 1000));
  }
  return Array.from(newSet);
}

const driver = () => {
  const newTree = new Tree(generateRandomArray(100));
  prettyPrint(newTree.root);
  console.log("is the tree balanced?: ", newTree.isBalanced());
  console.log("levelOrder Traversal: ", newTree.levelOrderIter());
  console.log("inOrder Traversal: ", newTree.inorder());
  console.log("preOrder Traversal: ", newTree.preorder());
  console.log("postOrder Traversal: ", newTree.postorder());
  console.log("adding more items...");
  generateRandomArray(100).forEach(num => newTree.insert(num));
  prettyPrint(newTree.root);
  console.log("is the tree balanced?: ", newTree.isBalanced());
  console.log("rebalancing...");
  newTree.rebalance();
  console.log("is the tree balanced?: ", newTree.isBalanced());
  console.log("levelOrder Traversal: ", newTree.levelOrderIter());
  console.log("inOrder Traversal: ", newTree.inorder());
  console.log("preOrder Traversal: ", newTree.preorder());
  console.log("postOrder Traversal: ", newTree.postorder());
}

driver();
