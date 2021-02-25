function newFunction(fn, ...arg) {
  const obj = {};
  Object.setPrototypeOf(obj, fn.prototype);
  const res = fn.apply(obj, arg);
  if (typeof res === 'object') return res;
  else return obj;
}

let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];

function flatten(arr) {
  // console.log(arr, 'come in');
  let newArr = [];
  for (var i of arr) {
    console.log(i, 'i')
    if (Array.isArray(i)) {
      newArr = newArr.concat(flatten(i));
    } else {
      newArr.push(i);
    }
  }
  // console.log(newArr, 'out');
  return newArr;
}

// console.log(flatten(arr).length);
var a = {
  i: 1,
  toString() {
    return this.i++
  }
}
if(a == 1 && a == 2 && a == 3){
 	console.log(1, '0000000000');
}

var a = 'AbC'

function check(str) {
  var b = ''
  for(var i=0;i<str.length;i++) {
    b+= str[i] === str[i].toUpperCase() ? str[i].toLowerCase() : str[i].toUpperCase()
  }
  return b
}

console.log(check(a))