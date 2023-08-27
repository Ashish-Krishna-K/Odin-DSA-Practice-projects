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
var _Tree_instances, _Tree_root, _Tree_buildTree, _Tree_insertHelper, _Tree_removeHelper, _Tree_inorderHelper, _Tree_preorderHelper, _Tree_postorderHelper;
Object.defineProperty(exports, "__esModule", { value: true });
const mergeSort_1 = __importDefault(require("../mergeSort/mergeSort"));
class TreeNode {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor(inputArray) {
        _Tree_instances.add(this);
        _Tree_root.set(this, void 0);
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, (0, mergeSort_1.default)(Array.from(new Set(inputArray.slice())))), "f");
    }
    ;
    get root() {
        return __classPrivateFieldGet(this, _Tree_root, "f");
    }
    ;
    ;
    insert(value) {
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_insertHelper).call(this, this.root, value), "f");
    }
    ;
    remove(value) {
        __classPrivateFieldSet(this, _Tree_root, __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_removeHelper).call(this, this.root, value), "f");
    }
    find(value) {
        let pointer = this.root;
        while (pointer) {
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
    levelOrderIter(cb) {
        let pointer = this.root;
        const queue = [];
        const values = [];
        do {
            if (pointer !== null && pointer !== undefined) {
                queue.push(pointer.left);
                queue.push(pointer.right);
                values.push(pointer.data);
                if (cb !== undefined)
                    cb(pointer);
                if (queue.length === 1)
                    queue.push(null);
            }
            pointer = queue.shift();
        } while (queue.length > 0);
        return values;
    }
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
    if (array.length < 1)
        return null;
    const mid = Math.floor(array.length / 2);
    const newNode = new TreeNode(array[mid]);
    newNode.left = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, array.slice(0, mid));
    newNode.right = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_buildTree).call(this, array.slice(mid + 1));
    return newNode;
}, _Tree_insertHelper = function _Tree_insertHelper(node, value) {
    if (node === null)
        return new TreeNode(value);
    if (value < node.data)
        node.left = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_insertHelper).call(this, node.left, value);
    if (value > node.data)
        node.right = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_insertHelper).call(this, node.right, value);
    return node;
}, _Tree_removeHelper = function _Tree_removeHelper(node, value) {
    // console.log(1, node, value);
    if (node === null)
        return node;
    if (node.left && value < node.data) {
        // console.log(2, node);
        node.left = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_removeHelper).call(this, node.left, value);
        return node;
    }
    // console.log(3, node);
    if (node.right !== null && value > node.data) {
        // console.log(4, node);
        node.right = __classPrivateFieldGet(this, _Tree_instances, "m", _Tree_removeHelper).call(this, node.right, value);
        return node;
    }
    // console.log(5, node);
    if (node.data === value) {
        // console.log(6, node);
        if (node.left === null && node.right === null)
            return null;
        if (node.left === null)
            return node.right;
        if (node.right === null)
            return node.left;
        let pointer = node.right;
        while (pointer.left !== null) {
            pointer = pointer.left;
        }
        pointer.left = node.left;
        return pointer;
    }
    // console.log(7, node);
    return node;
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
};
driver();
