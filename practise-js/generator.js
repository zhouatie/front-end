// function* g() {
//   var o = 1;
//   var a = yield o++;
//   console.log('a = ' + a);
//   var b = yield o++;
// }
// var gen = g();

// console.log(gen.next());
// console.log('------');
// console.log(gen.next(11));

function* foo() {
  var a = yield 'result1';
  console.log(a);
  yield 'result2';
  yield 'result3';
}

const gen = foo();
console.log(gen.next().value);
console.log(gen.next(222).value);
console.log(gen.next().value);

class Context {
  constructor(value) {
    this.next = 0;
    this.prev = 0;
    this.done = false;
    this._send = value;
  }
  top() {
    this.done = true;
  }
}

function gen$(context) {
  var xxx;
  switch ((context.prev = context.next)) {
    case 0:
      context.next = 2;
      return 'result1';

    case 2:
      xxx = context._send; // 新增代码
      context.next = 4;
      return 'result2';

    case 4:
      context.next = 6;
      return 'result3';

    case 6:
      context.stop();
      return undefined;
  }
}

let foo1 = function () {
  var context = new Context(222); //修改代码
  return {
    next: function () {
      value = gen$(context);
      done = context.done;
      return {
        value,
        done,
      };
    },
  };
};

const gen1 = foo1();
console.log(gen1.next().value);
console.log(gen1.next(222).value);
console.log(gen1.next().value);