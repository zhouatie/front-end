// 给你一个数组 [7, 8, 9, 2, 3, 6, 4, 5, 1]; 找出最大的三位数，要求三个数在数组中的先后顺序不变，本题答案965

// const nums = [7, 8, 9, 2, 3, 6, 4, 5, 1];
// const nums = [1, 2, 4, 5, 7];
// const nums = [3, 4, 5, 7, 9, 1];
const nums = [1, 2, 4, 3];

function getMaxAndIndex(nums, lastMaxIndex, last) {
  const arr = nums.slice(lastMaxIndex, last);
  const maxInArr = Math.max.apply(null, arr);
  const maxIndex = arr.findIndex((o) => o === maxInArr);
  return {
    max: maxInArr,
    index: maxIndex + lastMaxIndex,
  };
}

const one = getMaxAndIndex(nums, 0, -2);
const tow = getMaxAndIndex(nums, one.index + 1, -1);
const three = getMaxAndIndex(nums, tow.index + 1, nums.length);
console.log(`${one.max}${tow.max}${three.max}`, 'max');
