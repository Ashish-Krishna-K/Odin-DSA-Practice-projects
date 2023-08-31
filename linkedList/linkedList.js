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
var _LinkedList_size, _LinkedList_listHead;
// A Node class which holds a value and a reference to it's child
class ListNode {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}
// A linked list class
class LinkedList {
    constructor() {
        // keeping track of the list's size, which is private
        _LinkedList_size.set(this, 0);
        // the head Node of the list, also private
        _LinkedList_listHead.set(this, null);
    }
    // a getter for the size 
    get size() {
        return __classPrivateFieldGet(this, _LinkedList_size, "f");
    }
    // a getter for the head
    get head() {
        return __classPrivateFieldGet(this, _LinkedList_listHead, "f");
    }
    // a getter for the tail
    get tail() {
        // if head is null then return the head if not traverse
        // to the end of the list and return the final node
        if (this.head !== null) {
            let pointer = this.head;
            // if the nextNode is null that means current node is the 
            // last node
            while (pointer.nextNode !== null) {
                pointer = pointer.nextNode;
            }
            // return the current node
            return pointer;
        }
        return this.head;
    }
    // add a new node to the end of the list
    append(value) {
        // create a newNode
        const newNode = new ListNode(value);
        // if head is null add new node to the head
        // if add it to the tail's nextNode reference
        if (this.head === null) {
            __classPrivateFieldSet(this, _LinkedList_listHead, newNode, "f");
        }
        else {
            const currentTail = this.tail;
            // ensuring currentTail is not undefined to calm TypeScript
            if (currentTail) {
                currentTail.nextNode = newNode;
            }
            ;
        }
        // after adding a node we're incrementing the size parameter
        __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") + 1, "f");
    }
    // add a new node to the start of the list
    prepend(value) {
        const newNode = new ListNode(value);
        const currentHead = this.head;
        // whatever is the current head of the list add it to the 
        // next node of the newly created node and then add the newly
        // created node to the head and finally increment the size by 1
        newNode.nextNode = currentHead;
        __classPrivateFieldSet(this, _LinkedList_listHead, newNode, "f");
        __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") + 1, "f");
    }
    // return the node at a given index position
    at(index) {
        // keeping track of the current node index
        let counter = 0;
        let pointer = this.head;
        // if pointer is falsy that means the list is empty
        // return undefined
        if (!pointer)
            return undefined;
        // traverse through the list untill either the correct
        // index position is reached.
        while (pointer.nextNode !== null) {
            // if counter is equal to index we've reached the desired
            // node return the node
            if (counter === index)
                return pointer;
            pointer = pointer.nextNode;
            counter++;
        }
        // if for some reason we've reached the end of the list but the 
        // counter is still less than provided index that means the 
        // provided index is more than the number of items in the list
        // return undefined
        return undefined;
    }
    // remove the last element of the list
    pop() {
        // using the at function to head to the last but one'th node and setting it's 
        // next node value to null
        const lastButOneNode = this.at(this.size - 2);
        if (lastButOneNode)
            lastButOneNode.nextNode = null;
        // decrementin the size by one after removing an element
        __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") - 1, "f");
    }
    // check if the list contains provided value
    contains(value) {
        let pointer = this.head;
        // traverse down the list check each node's value to provided value,
        // if it's present return true if not false
        while (pointer) {
            if (pointer.value === value)
                return true;
            pointer = pointer.nextNode;
        }
        return false;
    }
    // find the index of the node containing the provided value
    find(value) {
        // keeping track of current Node's index
        let counter = 0;
        let pointer = this.head;
        // traverse through the list checking each node's value to provided value,
        // if it's same return the counter as the index if not return null
        while (pointer) {
            if (pointer.value === value)
                return counter;
            pointer = pointer.nextNode;
        }
        return null;
    }
    // return a string containing all the values stored in the list.
    toString() {
        let pointer = this.head;
        let listString = '';
        // traverse through list adding each node's value to the listString
        while (pointer) {
            // adding some paranthesis and arrow to make the string more readable
            listString += `( ${pointer.value} ) -> `;
            pointer = pointer.nextNode;
        }
        // signifying the end of the list by adding a null
        listString += 'null';
        return listString;
    }
    // insert a new node at given index postion
    insertAt(value, index) {
        const newNode = new ListNode(value);
        // grab the current node at the provided index position's parent, make 
        // it the next node of the newly created node and then append the newly
        // created node to the grabbed parent
        let pointer = this.at(index - 1);
        if (pointer) {
            newNode.nextNode = pointer.nextNode;
            pointer.nextNode = newNode;
            __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") + 1, "f");
        }
    }
    // remove a node from a given index position
    removeAt(index) {
        // grab both the node to be removed and it's parent and then set the parent's
        // next node to the node to be removed's child.
        const parentOfNodeToBeRemoved = this.at(index - 1);
        const nodeToBeRemoved = this.at(index);
        if (parentOfNodeToBeRemoved && nodeToBeRemoved) {
            parentOfNodeToBeRemoved.nextNode = nodeToBeRemoved.nextNode;
            __classPrivateFieldSet(this, _LinkedList_size, __classPrivateFieldGet(this, _LinkedList_size, "f") - 1, "f");
        }
    }
    // return an array containing all values of the list
    arrayFrom() {
        const arr = [];
        let pointer = this.head;
        // traverse through list adding each node's value to the array
        while (pointer) {
            arr.push(pointer.value);
            pointer = pointer.nextNode;
        }
        // remove null before returning the array
        return arr.filter(val => val);
    }
    // reverse the linked list(immutable)
    reverse() {
        // create a new list to avoid mutating existing list
        const newList = new LinkedList();
        let pointer = this.head;
        // traverse through the list while prepending each node's value
        // to the new list, since we're prepending it acts as reversing the 
        // list
        while (pointer) {
            newList.prepend(pointer.value);
            pointer = pointer.nextNode;
        }
        return newList;
    }
}
_LinkedList_size = new WeakMap(), _LinkedList_listHead = new WeakMap();
const newList = new LinkedList();
// testing out various methods.
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
