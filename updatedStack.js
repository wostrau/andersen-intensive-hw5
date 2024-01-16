class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  #maxSize;
  #lastElement;

  constructor(maxSize = 10) {
    if (!this.isValidNumber(maxSize)) {
      throw new Error('Invalid number!');
    }

    this.#maxSize = maxSize;
    this.#lastElement = null;
  }

  isValidNumber(num) {
    return typeof num === 'number' && !isNaN(num) && isFinite(num) && num > 0;
  }

  isEmpty() {
    return this.#lastElement === null;
  }

  push(element) {
    if (this.getSize() === this.#maxSize) {
      throw new Error('Full stack!!');
    }

    const newNode = new Node(element);
    newNode.next = this.#lastElement;
    this.#lastElement = newNode;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Empty stack!');
    }

    const lastElementData = this.#lastElement.data;
    this.#lastElement = this.#lastElement.next;

    return lastElementData;
  }

  peek() {
    return this.isEmpty() ? null : this.#lastElement.data;
  }

  toArray() {
    return this.toArrayHelper(this.#lastElement);
  }

  toArrayHelper(node) {
    if (node === null) {
      return [];
    }

    return [node.data, ...this.toArrayHelper(node.next)];
  }

  getSize() {
    return this.toArray().length;
  }

  static fromIterable(iterable) {
    if (!Symbol.iterator in Object(iterable)) {
      throw new Error('Not iterable!');
    }

    const stack = new Stack(iterable.length);

    for (const item of iterable) {
      stack.push(item);
    }

    return stack;
  }
}

//!tests:
const stack = new Stack(5);

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.toArray()); // [1, 2, 3]
console.log(stack.pop()); // 3
console.log(stack.peek()); // 2
console.log(stack.isEmpty()); // false

const newStack = Stack.fromIterable([4, 5, 6]);

console.log(newStack.toArray()); // [4, 5, 6]
