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