import mergeSort from "../mergeSort/mergeSort";

// A Node class for the tree
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

// the Tree class containing the binary search tree
class Tree<NodeElement> {
  // private property root holding the root of the tree
  #root: TreeNode<NodeElement> | null;
  // a constructor, so the class needs an initializing array
  constructor(inputArray: NodeElement[]) {
    // removing duplicates and then sorting the provided array using the mergeSort function
    // before passing it to the build tree function, the rootNode returned from buildTree will
    // added to the class's root property. Removing duplicates as duplicate values complicates
    // balancing and sorting as Binary search only works on sorted datasets
    this.#root = this.#buildTree(mergeSort(Array.from(new Set(inputArray.slice()))));
  };
  // a getter for the root node
  get root() {
    return this.#root;
  };
  // a recursive build tree function which is private
  #buildTree(array: NodeElement[]) {
    // out base case returning null if array is empty
    if (array.length < 1) return null;
    // calculate the midpoint to split the array into two
    // halves
    const mid = Math.floor(array.length / 2);
    // create a new node and set it as the current root
    const newNode = new TreeNode(array[mid]);
    // recursively call the function to set the left and right
    // branches of the root
    newNode.left = this.#buildTree(array.slice(0, mid));
    newNode.right = this.#buildTree(array.slice(mid + 1));
    return newNode;
  };
  // add a new node to the tree.
  insert(value: NodeElement) {
    // retcursively call the helper function to add the node
    this.#root = this.#insertHelper(this.root, value);
  };
  // private helper function to add a new node
  #insertHelper(node: TreeNode<NodeElement> | null, value: NodeElement): TreeNode<NodeElement> {
    // the base case, if the passed in node is null we'll return the newly created node
    if (node === null) return new TreeNode(value);
    // if new node is less than current node's root, then traverse down the left branch of the tree
    // if it's greater than the root then traverse down the right branch
    if (value < node.data) node.left = this.#insertHelper(node.left, value);
    if (value > node.data) node.right = this.#insertHelper(node.right, value);
    return node;
  }
  // remove a node from the tree
  remove(value: NodeElement) {
    // recursively call the helper function to remove the node
    this.#root = this.#removeHelper(this.root, value);
  }
  // private helper function to remove the node
  #removeHelper(node: TreeNode<NodeElement> | null, value: NodeElement): TreeNode<NodeElement> | null {
    // base case if provided node is null, we'll simply return it
    if (node === null) return node;
    // provided value is less than current node's root then we'll recursively traverse down the left branch,
    // if it's greater then we'll traverse down the right branch
    if (node.left && value < node.data) {
      node.left = this.#removeHelper(node.left, value);
      return node;
    }
    if (node.right !== null && value > node.data) {
      node.right = this.#removeHelper(node.right, value);
      return node;
    }
    // when deleting a node we'll have to consider three cases, the node to be deleted is 
    // leaf node then we can simply remove it, if it has only child then we need to set it's child
    // as it's parent child, if it has both child then we'll have to find the left leaf node of it's
    // right child and make it as successor
    if (node.data === value) {
      // if both left and right branch is null it's a leaf node return null
      if (node.left === null && node.right === null) return null;
      // if left child is null return right branch, if right child is null
      // return left branch
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // both branches exist so find the left side leaf node of it's right child
      let pointer = node.right;
      // keep traversing down the left branch untill a node's left child is null
      while(pointer.left !== null) {
        pointer = pointer.left;
      }
      // copy the contents of successor to the current node and if it's same as 
      // right / left child node's data then set the right / left child to null
      node.data = pointer.data;
      if (node.data === node.right.data) node.right = null;
      if (node.data === node.left.data) node.left = null;
    }
    return node;
  }
  // find the node containing a given value
  find(value: NodeElement) {
    let pointer = this.root;
    while(pointer) {
      // if provided value is less than current node's data
      // traverse down the left sub-tree, if it's greater than
      // current node's data traverse down the right sub-tree
      // if it's same return the current node
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
  // an iterative version of levelOrder traversal function
  levelOrderIter(cb?: (x: TreeNode<NodeElement>) => any) {
    let pointer: TreeNode<NodeElement> | null | undefined = this.root; 
    // once we visit a node we'll keep it's children in a queue to be visited after
    // visiting all the nodes in the same level
    const queue = [];
    // an array to keep track of the values of all the nodes visited
    const values = [];
    // as long as the queue is not empty process each node in the queue
    do {
      if (pointer !== null && pointer !== undefined) {
        // push the left and right children to the queue to be visited later
        queue.push(pointer.left);
        queue.push(pointer.right);
        // push the values to the array and call the callback passing the 
        // current node as argument
        values.push(pointer.data);
        if (cb !== undefined) cb(pointer);
        // what happens at the end of the queue, the queue get's emptied and the 
        // while loop ends but that leaves the last item in the queue unprocessed,
        // to avoid this we add a null to the queue when it's length is reduced to 1
        // to ensure the last item is not left over
        if (queue.length === 1) queue.push(null);
      }
      // set the pointer to the first item in the queue to be processed in next
      // iteration
      pointer = queue.shift();
    } while (queue.length > 0);
    return values;
  }
  // a recursive version of levelOrder traversal function
  levelOrderRec(cb?: (x: TreeNode<NodeElement>) => any){
    const values: NodeElement[] = [];
    // once we visit a node we'll keep it's children in a queue to be visited after
    // visiting all the nodes in the same level
    const queue = [];
    queue.push(this.root);
    this.#levelOrderRecHelper(queue, values, cb);
    return values;
  }
  #levelOrderRecHelper(queue: any[], values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    // our base case, if the queue is empty we're done return
    if (queue.length < 1) return;
    // we take the first item in the queue if it's not null or undefined we'll push it's children
    // to the queue and process the node's data
    const pointer = queue.shift();
    if (pointer !== null && pointer !== undefined) {
      queue.push(pointer.left);
      queue.push(pointer.right);
      values.push(pointer.data);
      if (cb !== undefined) cb(pointer);
    }
    this.#levelOrderRecHelper(queue, values, cb);
  }
  // function for inorder traversal of the tree
  inorder(cb?: (x: TreeNode<NodeElement>) => any) {
    // an array to hold the data of all the visited nodes which will be returned
    const values: NodeElement[] = [];
    // recursively call the helper function to traverse through the tree
    this.#inorderHelper(this.root, values, cb);
    return values;
  }
  // private helper function to recuresively traverse inorder
  #inorderHelper(node: TreeNode<NodeElement> | null, values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    // the base case, if the provided node is null we'll return
    if (node === null) return;
    // recursively call the function on the left subtree
    this.#inorderHelper(node.left, values, cb);
    // process the data of the provided node
    values.push(node.data);
    if (cb !== undefined) cb(node);
    // recursively call the function on the right subtree
    this.#inorderHelper(node.right, values, cb);
  }
  // function for preorder traversal of the tree
  preorder(cb?: (x: TreeNode<NodeElement>) => any) {
    // an array to hold the data of all the visited nodes which will be returned
    const values: NodeElement[] = [];
    // recursively call the helper function to traverse through the tree
    this.#preorderHelper(this.root, values, cb);
    return values;
  }
  // private helper function to recuresively traverse preorder
  #preorderHelper(node: TreeNode<NodeElement> | null, values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    // the base case, if the provided node is null we'll return
    if (node === null) return;
    // process the data of the provided node
    values.push(node.data);
    if (cb !== undefined) cb(node);
    // recursively call the function on the left subtree
    this.#preorderHelper(node.left, values, cb);
    // recursively call the function on the right subtree
    this.#preorderHelper(node.right, values, cb);
  }
  // function for postorder traversal of the tree
  postorder(cb?: (x: TreeNode<NodeElement>) => any) {
    // an array to hold the data of all the visited nodes which will be returned
    const values: NodeElement[] = [];
    // recursively call the helper function to traverse through the tree
    this.#postorderHelper(this.root, values, cb);
    return values;
  }
  // private helper function to recuresively traverse postorder
  #postorderHelper(node: TreeNode<NodeElement> | null, values: NodeElement[], cb?: (x: TreeNode<NodeElement>) => any) {
    // the base case, if the provided node is null we'll return
    if (node === null) return;
    // recursively call the function on the left subtree
    this.#postorderHelper(node.left, values, cb);
    // recursively call the function on the right subtree
    this.#postorderHelper(node.right, values, cb);
    // process the data of the provided node
    values.push(node.data);
    if (cb !== undefined) cb(node);
  }
  // a function to return the height of a given node. 
  height(node: TreeNode<NodeElement>) {
    // height is nothing but number of edges from given node to a leaf node
    // we need to return the greater of the heights of left and right subtrees hence
    // calculating the height for both
    let leftSteps = 1;
    let rightSteps = 1;
    // traverse down the left subtree incrementing the left steps by 1
    let pointer = node.left;
    while(pointer) {
      leftSteps += 1;
      pointer = pointer.left;
    }
    pointer = node.right;
    // traverse down the right subtree incrementing the right steps by 1
    while(pointer) {
      rightSteps += 1;
      pointer = pointer.right;
    }
    // return the greater of the two steps counted
    return leftSteps >= rightSteps ? leftSteps : rightSteps;
  }
  // a function to return the depth of a given node.
  depth(node: TreeNode<NodeElement>, currentNode = this.root): number {
    // depth is nothing but the number of edges between the root of the tree 
    // and the provided node

    // the base case if the provided node is null then we'll subtract 1 from the
    // current count
    if (currentNode === null) return -1;
    // if provided node has a value lesser than current node traverse down
    // left subtree adding one to the steps count if it's greater traverse
    // down the right subtree
    if (node.data < currentNode.data) {
      return 1 + this.depth(node, currentNode.left);
    }
    if (node.data > currentNode.data) {
      return 1 + this.depth(node, currentNode.right);
    }
    // if it's neither lesser not greater then we have reached the node return a 0
    return 0;
  }
  // a function to check if the tree is balanced
  isBalanced() {
    // a binary search tree is balanced if the difference between the height
    // of left subtree and height of right subtree is not greater than 1 for all
    // the nodes

    // a state variable which remains true untill it's false
    let balancedStatus = true;
    // a callback function which is passed to the levelOrder traversal function
    // which in turn checks the each node provided to the call back is balanced.
    // if it's not balanced it will change the balancedStatus state to false.
    const callback = (node: TreeNode<NodeElement>) => {
      // get the height of left and right subtrees of provided node
      let leftHeight = 0;
      let rightHeight = 0;
      if (node.left) leftHeight = this.height(node.left);
      if (node.right) rightHeight = this.height(node.right);
      const diff = Math.abs(leftHeight - rightHeight);
      // we'll only alter the balanedStatus if it remains true, if it's false 
      // for any node then it's false for the whole tree hence we'll not modify
      // the state if it's false
      if (balancedStatus) {
        balancedStatus = diff < 1;
      }
    }
    this.levelOrderIter(callback);
    return balancedStatus;
  }
  // a function to rebalance the tree
  rebalance() {
    // inorder traversal of a binary search tree returns a sorted array,
    // hence calling the buildTree function passing the return value of 
    // inorder function to rebalance the tree
    this.#root = this.#buildTree(this.inorder())
  }
}

// a function to pretty print the tree to the console
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

// a function for generating a random array 
const generateRandomArray = (size: number): number[] => {
  const newSet = new Set<number>();
  while(newSet.size < size) {
    newSet.add(Math.floor(Math.random() * 1000));
  }
  return Array.from(newSet);
}

// a driver function to create a tree, pretty print it, checking if it's balanced,
// printing it's content using various traversal methods, unbalancing it by adding
// another 100 items, and finally rebalancing it.
const driver = () => {
  const newTree = new Tree(generateRandomArray(100));
  prettyPrint(newTree.root);
  console.log("is the tree balanced?: ", newTree.isBalanced());
  console.log("levelOrder Traversal using Iteration : ", newTree.levelOrderIter());
  console.log("levelOrder Traversal using Recursion : ", newTree.levelOrderRec());
  console.log("is both iterative and recursive levelOrder traversal returning the same result?", 
    JSON.stringify(newTree.levelOrderIter) === JSON.stringify(newTree.levelOrderRec));
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
  console.log("levelOrder Traversal using Recursion : ", newTree.levelOrderRec());
  console.log("is both iterative and recursive levelOrder traversal returning the same result?", 
    JSON.stringify(newTree.levelOrderIter) === JSON.stringify(newTree.levelOrderRec));
  console.log("inOrder Traversal: ", newTree.inorder());
  console.log("preOrder Traversal: ", newTree.preorder());
  console.log("postOrder Traversal: ", newTree.postorder());
}

driver();
