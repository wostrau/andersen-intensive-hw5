function isValidString(value) {
  return typeof value === 'string' && value !== null && value !== undefined;
}

function concatStrings(str, separator) {
  let finalString = isValidString(str) ? str : '';
  const separatorString = isValidString(separator) ? separator : '';

  function innerConcat(nextStr) {
    if (isValidString(nextStr)) {
      finalString += `${separatorString}${nextStr}`;

      return innerConcat;
    }

    return finalString;
  }

  return innerConcat;
}

// console.log(concatStrings('first')('second')('third')()); // 'firstsecondthird'
// console.log(concatStrings('first', null)('second')()); // 'firstsecond'
// console.log(concatStrings('first', '123')('second')('third')()); // 'first123second123third'
// console.log(concatStrings('some-value')('')('')(null)); // 'some-value'
// console.log(concatStrings('some-value')(2)); // 'some-value'
// console.log(concatStrings('some-value')('333')(123n)); // 'some-value333'

class Calculator {
  #x;
  #y;

  constructor(x, y) {
    this.setX(x);
    this.setY(y);
  }

  get x() {
    return this.#x;
  }

  set x(number) {
    if (!this.isValidNumber(number)) {
      throw new Error('Invalid number!');
    }

    this.#x = number;
  }

  get y() {
    return this.#y;
  }

  set y(number) {
    if (!this.isValidNumber(number)) {
      throw new Error('Invalid number!');
    }

    this.#y = number;
  }

  isValidNumber(number) {
    return (
      typeof number === 'number' &&
      typeof number !== 'bigint' &&
      isFinite(number) &&
      !isNaN(number)
    );
  }

  setX(number) {
    try {
      this.x = number;
    } catch (error) {
      console.error(error.message);
    }
  }

  setY(number) {
    try {
      this.y = number;
    } catch (error) {
      console.error(error.message);
    }
  }

  calculateSum() {
    return this.x + this.y;
  }

  calculateMul() {
    return this.x * this.y;
  }

  calculateSub() {
    return this.x - this.y;
  }

  calculateDiv() {
    if (this.y === 0) {
      throw new Error('Invalid number! Division by zero');
    }

    return this.x / this.y;
  }

  logSum = () => {
    console.log(this.calculateSum());
  };

  logMul = () => {
    console.log(this.calculateMul());
  };

  logSub = () => {
    console.log(this.calculateSub());
  };

  logDiv = () => {
    try {
      console.log(this.calculateDiv());
    } catch (error) {
      console.error(error.message);
    }
  };
}

// const invalidCalculator = new Calculator(12, 3n); // Invalid number!
// const calculator = new Calculator(12, 3);

// calculator.logSum(); // 15
// calculator.logDiv(); // 4

// calculator.setX(15);
// calculator.logDiv(); // 5

// const logCalculatorDiv = calculator.logDiv;

// logCalculatorDiv(); // 5

// calculator.setY(444n); // Invalid number!

// calculator.setY(0);
// calculator.logDiv(); // Invalid number! Division by zero
