class Stack {
  #maxSize;
  #stack;
  #lastElementIndex;

  constructor(maxSize = 10) {
    if (!this.isValidNumber(maxSize)) {
      throw new Error('Invalid number!');
    }

    this.#maxSize = maxSize;
    this.#stack = [];
    this.#lastElementIndex = -1;
  }

  isValidNumber(num) {
    return typeof num === 'number' && !isNaN(num) && isFinite(num) && num > 0;
  }

  isEmpty() {
    return this.#lastElementIndex === -1;
  }

  push(element) {
    if (this.#lastElementIndex === this.#maxSize - 1) {
      throw new Error('Full stack!!');
    }

    this.#lastElementIndex++;
    this.#stack[this.#lastElementIndex] = element;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Empty stack!');
    }

    const lastElement = this.#stack[this.#lastElementIndex];

    delete this.#stack[this.#lastElementIndex];

    this.#lastElementIndex--;

    return lastElement;
  }

  peek() {
    return this.isEmpty() ? null : this.#stack[this.#lastElementIndex];
  }

  toArray() {
    return [...this.#stack];
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
/*
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
*/

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  append(element) {
    const newNode = new ListNode(element);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }

    this.#size++;
  }

  prepend(element) {
    const newNode = new ListNode(element);

    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head = newNode;
    }

    this.#size++;
  }

  find(element) {
    let current = this.#head;

    while (element) {
      if (current.value === element) {
        return current;
      }

      current = current.next;
    }

    return null;
  }

  toArray() {
    const result = [];

    let current = this.#head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  static fromIterable(iterable) {
    if (!Symbol.iterator in Object(iterable)) {
      throw new Error('Not iterable!');
    }

    const linkedList = new LinkedList();

    for (const item of iterable) {
      linkedList.append(item);
    }

    return linkedList;
  }
}

//!tests:
/*
const linkedList = new LinkedList();

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);

console.log(linkedList.toArray()); // [1, 2, 3]

linkedList.prepend(0);

console.log(linkedList.toArray()); // [0, 1, 2, 3]
console.log(linkedList.find(2)); // { value: 2, next: Node }
console.log(linkedList.find(4)); // null

const newLinkedList = LinkedList.fromIterable([4, 5, 6]);

console.log(newLinkedList.toArray()); // [4, 5, 6]
*/
