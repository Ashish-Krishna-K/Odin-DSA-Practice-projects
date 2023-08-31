"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Tree_instances, _Tree_root, _Tree_buildTree, _Tree_insertHelper, _Tree_removeHelper, _Tree_levelOrderRecHelper, _Tree_inorderHelper, _Tree_preorderHelper, _Tree_postorderHelper;
Object.defineProperty(exports, "__esModule", { value: true });
const mergeSort_1 = __importDefault(require("../mergeSort/mergeSort"));
// A Node class for the tree
class TreeNode {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}
// the Tree class containing the binary search tree
class Tree {
    // a constructor, so the class needs an initializing array
    constructor(inputArray) {
        _Tree_instances.add(this);
        // private property root holding the root of the tree
        _Tree_root.set(this, void 0);
        // removing duplicates and then sorting the provided array using the mergeSort function
        // before passing it to the build tree function, the rootNode returned from buildTree will
        // added to the class's root property. Removing duplicates as duplicate values complicates
        // balancing and sorting as Binary search only works on sorted datasets
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, (0, mergeSort_1.default)(Array.from(new Set(inputArray.slice())))), "f");
    }
    ;
    // a getter for the root node
    get root() {
        return __classPrivateFieldGet(this, _Tree_root, "f");
    }
    ;
    ;
    // add a new node to the tree.
    insert(value) {
        // retcursively call the helper function to add the node
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_insertHelper).call(this, this.root, value), "f");
    }
    ;
    // remove a node from the tree
    remove(value) {
        // recursively call the helper function to remove the node
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_removeHelper).call(this, this.root, value), "f");
    }
    // find the node containing a given value
    find(value) {
        let pointer = this.root;
        while (pointer) {
            // if provided value is less than current node's data
            // traverse down the left sub-tree, if it's greater than
            // current node's data traverse down the right sub-tree
            // if it's same return the current node
            if (value < pointer.data) {
                pointer = pointer.left;
            }
            else if (value > pointer.data) {
                pointer = pointer.right;
            }
            else {
                return pointer;
            }
        }
        return undefined;
    }
    // an iterative version of levelOrder traversal function
    levelOrderIter(cb) {
        let pointer = this.root;
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
                if (cb !== undefined)
                    cb(pointer);
                // what happens at the end of the queue, the queue get's emptied and the 
                // while loop ends but that leaves the last item in the queue unprocessed,
                // to avoid this we add a null to the queue when it's length is reduced to 1
                // to ensure the last item is not left over
                if (queue.length === 1)
                    queue.push(null);
            }
            // set the pointer to the first item in the queue to be processed in next
            // iteration
            pointer = queue.shift();
        } while (queue.length > 0);
        return values;
    }
    // a recursive version of levelOrder traversal function
    levelOrderRec(cb) {
        const values = [];
        const queue = [];
        queue.push(this.root);
        __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_levelOrderRecHelper).call(this, queue, values, cb);
        return values;
    }
    // function for inorder traversal of the tree
    inorder(cb) {
        const values = [];
        __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_inorderHelper).call(this, this.root, values, cb);
        return values;
    }
    preorder(cb) {
        const values = [];
        __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_preorderHelper).call(this, this.root, values, cb);
        return values;
    }
    postorder(cb) {
        const values = [];
        __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_postorderHelper).call(this, this.root, values, cb);
        return values;
    }
    height(node) {
        let leftSteps = 1;
        let rightSteps = 1;
        let pointer = node.left;
        while (pointer) {
            leftSteps += 1;
            pointer = pointer.left;
        }
        pointer = node.right;
        while (pointer) {
            rightSteps += 1;
            pointer = pointer.right;
        }
        return leftSteps >= rightSteps ? leftSteps : rightSteps;
    }
    depth(node, currentNode = this.root) {
        if (currentNode === null)
            return -1;
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
        const callback = (node) => {
            let leftHeight = 0;
            let rightHeight = 0;
            if (node.left)
                leftHeight = this.height(node.left);
            if (node.right)
                rightHeight = this.height(node.right);
            const diff = Math.abs(leftHeight - rightHeight);
            if (balancedStatus) {
                balancedStatus = diff > 1 ? false : true;
            }
        };
        this.levelOrderIter(callback);
        return balancedStatus;
    }
    rebalance() {
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, this.inorder()), "f");
    }
}
_Tree_root = new WeakMap(), _Tree_instances = new WeakSet(), _Tree_buildTree = function _Tree_buildTree(array) {
    // out base case returning null if array is empty
    if (array.length < 1)
        return null;
    // calculate the midpoint to split the array into two
    // halves
    const mid = Math.floor(array.length / 2);
    // create a new node and set it as the current root
    const newNode = new TreeNode(array[mid]);
    // recursively call the function to set the left and right
    // branches of the root
    newNode.left = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, array.slice(0, mid));
    newNode.right = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, array.slice(mid + 1));
    return newNode;
}, _Tree_insertHelper = function _Tree_insertHelper(node, value) {
    // the base case, if the passed in node is null we'll return the newly created node
    if (node === null)
        return new TreeNode(value);
    // if new node is less than current node's root, then traverse down the left branch of the tree
    // if it's greater than the root then traverse down the right branch
    if (value < node.data)
        node.left = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_insertHelper).call(this, node.left, value);
    if (value > node.data)
        node.right = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_insertHelper).call(this, node.right, value);
    return node;
}, _Tree_removeHelper = function _Tree_removeHelper(node, value) {
    // base case if provided node is null, we'll simply return it
    if (node === null)
        return node;
    // provided value is less than current node's root then we'll recursively traverse down the left branch,
    // if it's greater then we'll traverse down the right branch
    if (node.left && value < node.data) {
        node.left = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_removeHelper).call(this, node.left, value);
        return node;
    }
    if (node.right !== null && value > node.data) {
        node.right = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_removeHelper).call(this, node.right, value);
        return node;
    }
    // when deleting a node we'll have to consider three cases, the node to be deleted is 
    // leaf node then we can simply remove it, if it has only child then we need to set it's child
    // as it's parent child, if it has both child then we'll have to find the left leaf node of it's
    // right child and make it as successor
    if (node.data === value) {
        // if both left and right branch is null it's a leaf node return null
        if (node.left === null && node.right === null)
            return null;
        // if left child is null return right branch, if right child is null
        // return left branch
        if (node.left === null)
            return node.right;
        if (node.right === null)
            return node.left;
        // both branches exist so find the left side leaf node of it's right child
        let pointer = node.right;
        // keep traversing down the left branch untill a node's left child is null
        while (pointer.left !== null) {
            pointer = pointer.left;
        }
        // copy the contents of successor to the current node and if it's same as 
        // right / left child node's data then set the right / left child to null
        node.data = pointer.data;
        if (node.data === node.right.data)
            node.right = null;
        if (node.data === node.left.data)
            node.left = null;
    }
    return node;
}, _Tree_levelOrderRecHelper = function _Tree_levelOrderRecHelper(queue, values, cb) {
    if (queue.length < 1)
        return;
    const pointer = queue.shift();
    if (pointer !== null && pointer !== undefined) {
        queue.push(pointer.left);
        queue.push(pointer.right);
        values.push(pointer.data);
        if (cb !== undefined)
            cb(pointer);
    }
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_levelOrderRecHelper).call(this, queue, values, cb);
}, _Tree_inorderHelper = function _Tree_inorderHelper(node, values, cb) {
    if (node === null)
        return;
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_inorderHelper).call(this, node.left, values, cb);
    values.push(node.data);
    if (cb !== undefined)
        cb(node);
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_inorderHelper).call(this, node.right, values, cb);
}, _Tree_preorderHelper = function _Tree_preorderHelper(node, values, cb) {
    if (node === null)
        return;
    values.push(node.data);
    if (cb !== undefined)
        cb(node);
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_preorderHelper).call(this, node.left, values, cb);
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_preorderHelper).call(this, node.right, values, cb);
}, _Tree_postorderHelper = function _Tree_postorderHelper(node, values, cb) {
    if (node === null)
        return;
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_postorderHelper).call(this, node.left, values, cb);
    __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_postorderHelper).call(this, node.right, values, cb);
    values.push(node.data);
    if (cb !== undefined)
        cb(node);
};
const prettyPrint = (node, prefix = "", isLeft = true) => {
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
const generateRandomArray = (size) => {
    const newSet = new Set();
    while (newSet.size < size) {
        newSet.add(Math.floor(Math.random() * 1000));
    }
    return Array.from(newSet);
};
const driver = () => {
    const newTree = new Tree(generateRandomArray(100));
    prettyPrint(newTree.root);
    console.log("is the tree balanced?: ", newTree.isBalanced());
    console.log("levelOrder Traversal using Iteration : ", newTree.levelOrderIter());
    console.log("levelOrder Traversal using Recursion : ", newTree.levelOrderRec());
    console.log("is both iterative and recursive levelOrder traversal returning the same result?", JSON.stringify(newTree.levelOrderIter) === JSON.stringify(newTree.levelOrderRec));
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
    console.log("is both iterative and recursive levelOrder traversal returning the same result?", JSON.stringify(newTree.levelOrderIter) === JSON.stringify(newTree.levelOrderRec));
    console.log("inOrder Traversal: ", newTree.inorder());
    console.log("preOrder Traversal: ", newTree.preorder());
    console.log("postOrder Traversal: ", newTree.postorder());
};
driver();
