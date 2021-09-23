// 给你一个数组 [7, 8, 9, 2, 3, 6, 4, 5, 1]; 找出最大的三位数，要求三个数在数组中的先后顺序不变，本题答案965

// const nums = [7, 8, 9, 2, 3, 6, 4, 5, 1];
// const nums = [1, 2, 4, 5, 7];
// const nums = [3, 4, 5, 7, 9, 1];
// const nums = [1, 2, 4, 3];

// function getMaxAndIndex(nums, lastMaxIndex, last) {
//   const arr = nums.slice(lastMaxIndex, last);
//   const maxInArr = Math.max.apply(null, arr);
//   const maxIndex = arr.findIndex((o) => o === maxInArr);
//   return {
//     max: maxInArr,
//     index: maxIndex + lastMaxIndex,
//   };
// }

// const one = getMaxAndIndex(nums, 0, -2);
// const tow = getMaxAndIndex(nums, one.index + 1, -1);
// const three = getMaxAndIndex(nums, tow.index + 1, nums.length);
// console.log(`${one.max}${tow.max}${three.max}`, 'max');

// var fib = function (n) {
//   if (n === 2 || n === 1) return 1;
//   return fib(n - 1) + fib(n - 2);
// };

// console.log(fib(4));

// const fib = (n) => {
//   let dp = new Array(n + 1);
//   dp[0] = 0;
//   dp[1] = 1;
//   for (let i = 2; i < n + 1; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }
//   return dp[n];
// };

// 输入两个整数n和sum，从数列1，2，3.......n 中随意取几个数，使其和等于sum，要求将其中所有的可能组合列出来。
// 1,2,3,4,5  6
// let list = []
// function fn (n, m) {
//   // console.log(n,m,'---', list)
//   if (n >= 0 && m===0) {
//     print();
//     return;
//   }
//   if (n >=1 && m === 1) {
//     list.push(1)
//     print();
//     list.pop();
//     return
//   }
//   if (m > 1 && n === 1) {
//     return;
//   }
//   if (n <= m) {
//     list.push(n)
//     fn(n - 1, m - n);
//     list.pop();

//     fn(n - 1, m)
//   } else if (n > m) {
//     fn(m, m)
//   }
// }

// function print() {
//   console.log(list.toString())
// }

// fn(5, 6)

// var list = ' abcdefghijklmnopqrstuvwxyz';
// var arr = []
// var getSmallestString = function(n, k) {
//   if (n <= 0) return '';
//   const max = Math.max(1, k - (n - 1) * 26);
//   return list[max] + getSmallestString(n - 1, k - max)
// };



// console.log(getSmallestString(5, 73))

// const root =[3,9,20,null,null,15,7]
// var maxDepth = function(root) {
//   const length = root.length;
//   let n = 0;
//   while (2 ** (n) <= length) {
//       n++
//   }
//   return n;
// };
// console.log(maxDepth(root));


// var isValidSudoku = function(board) {
//     const rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
//     const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
//     const subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
//     for (let i = 0; i < 9; i++) {
//         for (let j = 0; j < 9; j++) {
//             const c = board[i][j];
//             if (c !== '.') {
//                 const index = c.charCodeAt() - '0'.charCodeAt() - 1;
//                 rows[i][index]++;
//                 columns[j][index]++;
//                 subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
//                 if (rows[i][index] > 1 || columns[j][index] > 1 || subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
//                     return false;
//                 }
//             }
//         }
//     }
//     return true;
// };

// add(1)(2)(3)

// function add() {
//   const args = Array.prototype.slice.call(arguments);
//   console.log('call')
//   if (args.length === 3) {
//     console.log('come')
//     return args.reduce((total, item) => total + item, 0)
//   } else {
//     console.log(args, 'args')
//     return function(num) {
//       console.log(num, 'end')
//       add.apply(null, [num, ...args])
//     }
//   }
// }

// function add() {
//   const args = Array.prototype.slice.call(arguments);
//   return args.length === 3 ? args.reduce((total, item) => total + item, 0) : (num) => add.apply(null, [num, ...args])
// }

// console.log(add(1)(2)(3))

// let a = "9007199254740991";
// let b = "1234567899999999999";

// const maxlength = Math.max(a.length, b.length)
// console.log(maxlength)

// a = a.padStart(maxlength, 0);
// b = b.padStart(maxlength, 0);

// console.log(a,b)

// let f = 0;
// let t = 0;
// let str = '';
// for (let i =maxlength - 1;i>=0;i--) {
//   t = +a[i] + +b[i] + f
//   f = t >= 10 ? 1 : 0;
//   t = f ? t - 10 : t;
//   str = t + str;
//   console.log(i, t,f,str, a[i],b[i],'i')
// }

// console.log(str === '1243575099254740990')


// const arr = [1,2,3,[4,5,[6,7], 8,[9]]]
// // console.log(arr.toString())
// const newArr = []
// function flat(arr) {
//   for (let i = 0;i<arr.length;i++) {
//     console.log(arr[i])
//     if (Array.isArray(arr[i])) {
//       flat(arr[i])
//     } else {
//       newArr.push(arr[i])
//     }
//   }

//   return arr;
// }
// flat(arr)
// console.log(newArr)

// 19,351,235.235767
const num = 19351235.235767;
const numStr = num.toString();
const right = numStr.split('.')[1]
const left = numStr.split('.')[0]
let str = '';
for (var i = left.length - 1; i >= 0; i--) {
  console.log(left.length - i, 'left')
  str = `${left[i]}${left.length - i - 1  && (left.length - i - 1) % 3 === 0 ? ',' : ''}${str}`
}
str += `.${right}`
console.log(str)