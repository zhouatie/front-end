function DFSCopy(old) {
  if (typeof old !== 'object') return old;
  const isArray = Array.isArray(old);
  const newObj = isArray ? [] : {};
  if (isArray) {
    for (let i = 0; i < old.length; i++) {
      newObj[i] = deepCopy(old[i]);
    }
  } else {
    for (let i in old) {
      newObj[i] = deepCopy(old[i]);
    }
  }
  console.log(newObj);
  return newObj;
}

function BFScopy(a) {
  const queue = [];
  const b = new a.constructor();
  queue.push([a, b]);
  while (queue.length) {
    const [oldObj, newObj] = queue.shift();
    for (let i in oldObj) {
      if (typeof oldObj[i] === 'object') {
        newObj[i] = new oldObj[i].constructor();
        queue.push([oldObj[i], newObj[i]]);
      } else {
        newObj[i] = oldObj[i];
      }
    }
  }
  return b;
}

const arr = {
  a: [1, 2, { b: 2 }],
  c: { d: 'd' },
  e: 2,
  g: [{ f: 1 }, '2'],
};

console.log(arr, copy(arr) === arr, JSON.stringify(copy(arr)) === JSON.stringify(arr));
