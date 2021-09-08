function *gener () {
  const a = yield 1;
  console.log(a)
  const b = yield 2;
  console.log(b)
  const c = yield 3;
  console.log(c)
}

const it = gener();
console.log('执行1')
console.log(it.next(2344));
console.log('执行2')
console.log(it.next(888));
console.log('执行3')