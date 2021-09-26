function instanceOf(obj, Con) {
  let left = obj.__proto__;
  let prototype = Con.prototype;
  while(true) {
    if (left === prototype) {
      return true;
    } else if (!left) {
      return false;
    }
    console.log(prototype, 'prototype')
    left = left.__proto__;
  }
}

const arr = []

console.log(instanceOf(arr, Object))