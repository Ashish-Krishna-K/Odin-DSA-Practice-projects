// helper function to console log the BST in a graphical manner
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

class Node {
  value = null;
  leftChild = null;
  rightChild = null;
  constructor(value) {
    this.value = value
  }
}

class Tree {
  root = null;
  constructor(array) {
    // since binary search only works on sorted arrays 
    // and also removing duplicates as having duplicate 
    // can complicate things.
    const sortedArray = array.sort((a, b) => a - b);
    const removedDupes = Array.from(new Set(sortedArray));
    this.root = this.#buildTree(removedDupes);
  }

  #buildTree(array) {
    if (array.length < 1) return null;

    // split array into midpoint, lefthalf and righthalf;
    const midIndex = Math.floor(array.length / 2);
    const midpoint = array[midIndex];
    const leftHalf = array.slice(0, midIndex - 1);
    const rightHalf = array.slice(midIndex + 1);

    // recursively calls buildTree on both left and right halves.
    const rootNode = new Node(midpoint);
    rootNode.leftChild = this.#buildTree(leftHalf);
    rootNode.rightChild = this.#buildTree(rightHalf);

    return rootNode;
  }

  insert(value) {
    // using a private method which can be called recursively
    this.root = this.#insertHelper(this.root, value);
  }

  #insertHelper(root, value) {
    // base case
    if (root === null) {
      root = new Node(value);
      return root;
    }
    // advantage of binary trees if value to be inserted is less
    // than current root value then we can simply eliminate half
    // of the list 
    if (value < root.value) {
      root.leftChild = this.#insertHelper(root.leftChild, value);
    } else if (value > root.value) {
      root.rightChild = this.#insertHelper(root.rightChild, value);
    }
    return root;
  }

  delete(value) {
    // using a private method which can be called recursively
    this.root = this.#deleteHelper(this.root, value);
  }

  #deleteHelper(root, value) {
    // base case
    if (root === null) return root;
    if (value < root.value) {
      root.leftChild = this.#deleteHelper(root.leftChild, value);
    } else if (value > root.value) {
      root.rightChild = this.#deleteHelper(root.rightChild, value);
    } else {
      // reached here means we are at the node to be deleted

      // below if statement will take care of deleting the node 
      // if there is no children or has only one child
      if (root.leftChild === null) {
        return root.rightChild;
      } else if (root.rightChild === null) {
        return root.leftChild;
      }
      // finding the least possible value of right sub-tree to be used
      // as successor
      root.value = ((root) => {
        let val = root.value;
        while (root.leftChild !== null) {
          val = root.leftChild.value;
          root = root.leftChild
        };
        return val;
      })(root.rightChild);
      root.rightChild = this.#deleteHelper(root.rightChild, root.value)
    };
    return root;
  }

  find(value) {
    // using a private method which can be called recursively
    return this.#findHelper(this.root, value);
  }

  #findHelper(root, value) {
    if (root === null || root.value === value) return root;
    if (value < root.value) return this.#findHelper(root.leftChild, value);
    if (value > root.value) return this.#findHelper(root.rightChild, value);
    return null;
  }

  levelOrder(func) {
    // in the case a function is not provided as the argument we can
    // simply return an array of values!
    const cb = func || [];
    // using an empty array as a 'queue stack' to keep track of child
    // nodes that needs to be visited in next run!
    return this.#levelOrderHelperRec(this.root, [], cb);
  }

  #levelOrderHelperRec(root, queue, values) {
    let currentnode;
    if (root !== null) {
      // since we don't know if function argument is passed or not
      // we are typing checking to decide next course of action.
      if (typeof values === 'function') {
        values(root)
      } else {
        values.push(root.value);
      }
      if (root.leftChild !== null) queue.push(root.leftChild);
      if (root.rightChild !== null) queue.push(root.rightChild);
    };
    // in case there's no current node but there is items left in queue stack
    if (queue.length > 0) {
      currentnode = queue.shift();
    };
    if (currentnode) return this.#levelOrderHelperRec(currentnode, queue, values);
    return values;
  }

  preOrder(func) {
    // in the case a function is not provided as the argument we can
    // simply return an array of values!
    const cb = func || [];
    return this.#preOrderHelperRec(this.root, cb)
  }

  #preOrderHelperRec(root, values) {
    if (root === null) return values;
    // since we don't know if function argument is passed or not
    // we are typing checking to decide next course of action.
    if (typeof values === 'function') {
      values(root)
    } else {
      values.push(root.value);
    };
    this.#preOrderHelperRec(root.leftChild, values);
    this.#preOrderHelperRec(root.rightChild, values);
    return values;
  }

  inOrder(func) {
    // in the case a function is not provided as the argument we can
    // simply return an array of values!    
    const cb = func || [];
    return this.#inOrderHelperRec(this.root, cb)
  }

  #inOrderHelperRec(root, values) {
    if (root === null) return values;
    this.#inOrderHelperRec(root.leftChild, values);
    // since we don't know if function argument is passed or not
    // we are typing checking to decide next course of action.    
    if (typeof values === 'function') {
      values(root)
    } else {
      values.push(root.value);
    };
    this.#inOrderHelperRec(root.rightChild, values);
    return values;
  }

  postOrder(func) {
    // in the case a function is not provided as the argument we can
    // simply return an array of values!     
    const cb = func || [];
    return this.#postOrderHelperRec(this.root, cb)
  }

  #postOrderHelperRec(root, values) {
    if (root === null) return values;
    this.#postOrderHelperRec(root.leftChild, values);
    this.#postOrderHelperRec(root.rightChild, values);
    // since we don't know if function argument is passed or not
    // we are typing checking to decide next course of action.    
    if (typeof values === 'function') {
      values(root)
    } else {
      values.push(root.value);
    };
    return values;
  }

  depth(value) {
    return this.#depthHelper(this.root, value, -1);
  }

  #depthHelper(root, value, count) {
    // if the root is null at first iteration it means the
    // tree is empty hence returning -1
    if (root === null) return -1;
    // a non null root means it's an edge
    count++
    if (root.value === value) return count;
    if (value < root.value) {
      return this.#depthHelper(root.leftChild, value, count);
    }
    if (value > root.value) {
      return this.#depthHelper(root.rightChild, value, count);
    }
    return count;
  }

  height(value) {
    const count = -1
    const nodeToFindHeight = this.find(value);
    // if the searched node doesn't then there's no height to calculate!
    if (nodeToFindHeight === null) return count;
    return this.#heightHelper(nodeToFindHeight, count);
  }

  #heightHelper(root, count) {
    if (root === null) return count;
    count++;
    const leftHeight = this.#heightHelper(root.leftChild, count);
    const rightHeight = this.#heightHelper(root.rightChild, count);
    return Math.max(leftHeight, rightHeight);
  }

  isBalanced() {
    // an helper array where will store the differences returned from the
    // callback it's required later!
    const diffArr = [];
    // defining a callback function which will be passed to the inOrder method
    const checkHeightDiff = (node) => {
      if (!node) return;
      let leftHeight = 0;
      let rightHeight = 0;
      if (node.leftChild !== null) leftHeight = this.height(node.leftChild.value);
      if (node.rightChild !== null) rightHeight = this.height(node.rightChild.value);
      const difference = leftHeight > rightHeight ? leftHeight - rightHeight : rightHeight - leftHeight;
      diffArr.push(difference);
    };
    this.inOrder(checkHeightDiff);
    // after getting all the differences if even one of the difference is greater
    // than 1 then the tree is unbalanced hence using 'some' method
    return !diffArr.some(item => item > 1);
  }

  rebalance() {
    const convertToArray = this.inOrder();
    this.root = this.#buildTree(convertToArray);
  }
}

// below function is required for the driver function
const generateRandNums = () => Math.floor(Math.random() * 1000);

// genereating a seed array of random numbers to construct our tree with!
const generateArrayOfRandomNumbers = (arraySize) => {
  const array = []
  for (let i = 0; i <= arraySize; i++) {
    array.push(generateRandNums());
  }
  return array;
}

// a simple driver script that demonstrates various features of our 
// binary search tree!
const driver = () => {
  const randomArray = generateArrayOfRandomNumbers(100);
  const newTree = new Tree(randomArray);

  console.log('STEP 1 = Newly created BST with random numbers: ');
  prettyPrint(newTree.root);
  console.log('STEP 2 = Checking if this tree is balanced: ', newTree.isBalanced());
  const levelOrder = newTree.levelOrder();
  const preOrder = newTree.preOrder();
  const inOrder = newTree.inOrder();
  const postOrder = newTree.postOrder();
  console.log('STEP 3 = ',
    'Items In Level order: ', levelOrder,
    'Items In Pre order: ', preOrder,
    'Items In In order: ', inOrder,
    'Items In Post order: ', postOrder,
  )
  for (let i = 0; i <= 1000; i++) {
    newTree.insert(generateRandNums());
  }
  console.log('STEP 4 = Tree after few more random values: ');
  prettyPrint(newTree.root);
  console.log('STEP 5 = Checking if this tree is balanced: ', newTree.isBalanced());
  if (newTree.isBalanced()) {
    console.log('OOPS! This tree is still balanced, adding more values to unbalnace the tree: ');
    for (let i = 0; i <= 100; i++) {
      newTree.insert(generateRandNums());
    }
    console.log('Tree after adding 100 more random values: ');
    prettyPrint(newTree.root);
  }
  console.log('STEP 6 = This tree is now unbalanced, rebalancing in next step: ');
  newTree.rebalance();
  console.log('STEP 7 = Tree after rebalancing: ');
  prettyPrint(newTree.root);
  const anotherlevelOrder = newTree.levelOrder();
  const anotherpreOrder = newTree.preOrder();
  const anotherinOrder = newTree.inOrder();
  const anotherpostOrder = newTree.postOrder();
  console.log('STEP 8 = ',
    'Items In Level order: ', anotherlevelOrder,
    'Items In Pre order: ', anotherpreOrder,
    'Items In In order: ', anotherinOrder,
    'Items In Post order: ', anotherpostOrder,
  )
};

driver();