// class for create a Node in our list
class Node {
  value = null;
  nextNode = null;
  constructor(value) {
    this.value = value
  }
}

class LinkedList {
  node = new Node("Head");

  // private helper method to easily reach the end of the list.
  #findTail(node) {
    let currentNode = node;
    let next = node.nextNode;
    if (next === null) return currentNode;
    return this.#findTail(next);
  }

  // adds a new node at end of the list.
  append(value) {
    const newNode = new Node(value);
    const tail = this.#findTail(this.node);
    tail.nextNode = newNode;
  }

  // adds a new node at the beginning of the list.
  prepend(value) {
    const newNode = new Node(value);
    const currentFirstNode = this.node.nextNode;
    newNode.nextNode = currentFirstNode;
    this.node.nextNode = newNode;
  }

  // gives the total size/number of nodes in the list.
  size() {
    let currentNode = this.node.nextNode;
    let count = 1;
    while (currentNode.nextNode !== null) {
      count++;
      currentNode = currentNode.nextNode;
    };
    return count;
  }

  // returns the first node.
  head() {
    return this.node.nextNode;
  }

  // returns the last node.
  tail() {
    return this.#findTail(this.node);
  }

  // returns the node at a given index;
  at(index) {
    let currentNode = this.node.nextNode;
    let count = 0;
    while (count <= index) {
      if (count === index) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
      count++
    }
  }

  // removes the last node in the list.
  pop() {
    const lastButOneNode = this.at(this.size() - 2);
    lastButOneNode.nextNode = null;
  }

  // checks if a given value is present in the list.
  contains(value) {
    let currentNode = this.node.nextNode;
    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  // finds the index position having the given value.
  find(value) {
    let currentNode = this.node.nextNode;
    let index = 0;
    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++
    }
    return null;
  }

  // returns the values of the list in a string format.
  toString() {
    const addToString = (val) => `( ${val} ) -> `;
    let currentNode = this.node.nextNode;
    let string = addToString(currentNode.value);
    while (currentNode.nextNode != null) {
      currentNode = currentNode.nextNode;
      string += addToString(currentNode.value);
    }
    return string + 'null';
  }

  // adds a new node at a given index position.
  insertAt(value, index) {
    const newNode = new Node(value);
    const nodeAtIndex = this.at(index);
    const nodePrevsToNodeAtIndex = this.at(index - 1);
    newNode.nextNode = nodeAtIndex;
    nodePrevsToNodeAtIndex.nextNode = newNode;
  }

  // removes the node at the given index position.
  removeAt(index) {
    const nodeToBeRemoved = this.at(index);
    const nodePrevsToTheNodeToBeRemoved = this.at(index - 1);
    nodePrevsToTheNodeToBeRemoved.nextNode = nodeToBeRemoved.nextNode;
  }
}

