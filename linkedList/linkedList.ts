class ListNode<NodeType> {
  value: NodeType;
  nextNode: ListNode<NodeType> | null;

  constructor(value: NodeType) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList<NodeType> {
  #size: number = 0;
  #listHead: ListNode<NodeType> | null = null;

  get size() {
    return this.#size;
  }

  get head() {
    return this.#listHead;
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

  append(value: NodeType) {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.#listHead = newNode;
    } else {
      const currentTail = this.tail;
      if (currentTail) {
        currentTail.nextNode = newNode
      };
    }
    this.#size += 1;
  }

  prepend(value: NodeType) {
    const currentHead = this.head;
    const newNode = new ListNode(value);
    newNode.nextNode = currentHead;
    this.#listHead = newNode;
    this.#size += 1;
  }

  at(index: number) {
    let counter = 0;
    let pointer = this.head
    if (!pointer) return undefined;
    while (pointer.nextNode !== null) {
      if (counter === index) return pointer;
      pointer = pointer.nextNode;
      counter++
    }
    return undefined;
  }

  pop() {
    const lastButOneNode = this.at(this.size - 2);
    if (lastButOneNode) lastButOneNode.nextNode = null;
    this.#size -= 1
  }

  contains(value: NodeType) {
    let pointer = this.head;
    while (pointer) {
      if (pointer.value === value) return true;
      pointer = pointer.nextNode;
    }
    return false;
  }

  find(value: NodeType) {
    let counter = 0;
    let pointer = this.head;
    while(pointer) {
      if (pointer.value === value) return counter;
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

  insertAt(value: NodeType, index: number) {
    const newNode = new ListNode(value);
    let pointer = this.at(index - 1);
    if (pointer) {
      newNode.nextNode = pointer.nextNode;
      pointer.nextNode = newNode;
      this.#size += 1;
    }
  }

  removeAt(index: number) {
    const parentOfNodeToBeRemoved = this.at(index - 1);
    const nodeToBeRemoved = this.at(index);

    if (parentOfNodeToBeRemoved && nodeToBeRemoved) {
      parentOfNodeToBeRemoved.nextNode = nodeToBeRemoved.nextNode;
      this.#size -= 1;
    }
  }

  arrayFrom() {
    const arr = [];
    let pointer = this.head;
    while(pointer) {
      arr.push(pointer.value);
      pointer = pointer.nextNode;
    }
    return arr.filter(val => val);
  }

  reverse() {
    const newList = new LinkedList();
    let pointer = this.head;
    while(pointer) {
      newList.prepend(pointer.value);
      pointer = pointer.nextNode;
    }
    return newList;
  }
}

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