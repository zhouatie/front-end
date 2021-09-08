function sum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  const length = fn.length;
  const arr = [];
  // console.log(length);
  return function a() {
    const args = Array.prototype.slice.call(arguments);
    arr.push(...args);
    return arr.length >= length ? fn(...arr) : a;
  };
}

const fn = curry(sum);

// fn(1, 2, 3);
console.log(fn(1)( 2,8));
