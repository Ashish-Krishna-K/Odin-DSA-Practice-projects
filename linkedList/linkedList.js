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
var _LinkedList_size, _LinkedList_list;
class ListNode {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}
class LinkedList {
    constructor() {
        _LinkedList_size.set(this, 0);
        _LinkedList_list.set(this, null);
    }
    get size() {
        return __classPrivateFieldGet(this, _LinkedList_size, "f");
    }
    get head() {
        return __classPrivateFieldGet(this, _LinkedList_list, "f");
    }
    set head(newNode) {
        __classPrivateFieldSet(this, _LinkedList_list, newNode, "f");
    }
    get tail() {
        if (this.head !== null) {
            let pointer = this.head;
            while (pointer.nextNode !== null) {
                pointer = pointer.nextNode;
            }
            return pointer;
        }
        return this.head;
    }
    append(value) {
        const newNode = new ListNode(value);
        if (this.head === null) {
            this.head = newNode;
        }
        else {
            const currentTail = this.tail;
            if (currentTail) {
                currentTail.nextNode = newNode;
            }
            ;
        }
        __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") + 1, "f");
    }
    prepend(value) {
        const currentHead = this.head;
        const newNode = new ListNode(value);
        newNode.nextNode = currentHead;
        this.head = newNode;
        __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") + 1, "f");
    }
    at(index) {
        let counter = 0;
        let pointer = this.head;
        if (!pointer)
            return undefined;
        while (pointer.nextNode !== null) {
            if (counter === index)
                return pointer;
            pointer = pointer.nextNode;
            counter++;
        }
        return undefined;
    }
    pop() {
        const lastButOneNode = this.at(this.size - 2);
        if (lastButOneNode)
            lastButOneNode.nextNode = null;
        __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") - 1, "f");
    }
    contains(value) {
        let pointer = this.head;
        while (pointer) {
            if (pointer.value === value)
                return true;
            pointer = pointer.nextNode;
        }
        return false;
    }
    find(value) {
        let counter = 0;
        let pointer = this.head;
        while (pointer) {
            if (pointer.value === value)
                return counter;
            pointer = pointer.nextNode;
        }
        return null;
    }
    toString() {
        let pointer = this.head;
        let listString = '';
        while (pointer) {
            listString += `( ${pointer.value} ) -> `;
            pointer = pointer.nextNode;
        }
        listString += 'null';
        return listString;
    }
    insertAt(value, index) {
        const newNode = new ListNode(value);
        let pointer = this.at(index - 1);
        if (pointer) {
            newNode.nextNode = pointer.nextNode;
            pointer.nextNode = newNode;
            __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") + 1, "f");
        }
    }
    removeAt(index) {
        const parentOfNodeToBeRemoved = this.at(index - 1);
        const nodeToBeRemoved = this.at(index);
        if (parentOfNodeToBeRemoved && nodeToBeRemoved) {
            parentOfNodeToBeRemoved.nextNode = nodeToBeRemoved.nextNode;
            __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") - 1, "f");
        }
    }
    arrayFrom() {
        const arr = [];
        let pointer = this.head;
        while (pointer) {
            arr.push(pointer.value);
            pointer = pointer.nextNode;
        }
        return arr.filter(val => val);
    }
    reverse() {
        const newList = new LinkedList();
        let pointer = this.head;
        while (pointer) {
            newList.prepend(pointer.value);
            pointer = pointer.nextNode;
        }
        return newList;
    }
}
_LinkedList_size = new WeakMap(), _LinkedList_list = new WeakMap();
const newList = new LinkedList();
console.log("empty list: ", newList.size);
newList.append("hi");
console.log(newList.toString());
console.log("after adding one item: ", newList.size);
newList.append("hello");
console.log(newList.toString());
newList.append("how u doin?");
console.log(newList.toString());
newList.prepend("this was prepended");
console.log(newList.toString());
console.log("head element: ", newList.head);
console.log("element at index 2: ", newList.at(2));
newList.append("to be deleted");
console.log("tail element before pop: ", newList.tail);
newList.pop();
console.log("tail element after pop: ", newList.tail);
console.log("cotains returns true for existing value: ", newList.contains("how u doin?"));
console.log("cotains returns false for non-existing value: ", newList.contains("bye"));
console.log("find returns searched value's index: ", newList.find("this was prepended"));
console.log("find returns null when value doesn't exist: ", newList.find("bye"));
newList.insertAt("this is inserted at an index 2, i will remove this later", 2);
console.log(newList.toString());
newList.removeAt(2);
console.log(newList.toString());
console.log(newList.arrayFrom());
console.log(newList.reverse().toString());
console.log("final size: ", newList.size);
