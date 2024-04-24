//? Two sum

const twoSum = (arr = [], target = 0) => {
  let left = 0;
  let right = arr.length - 1;

  arr.sort((a, b) => a - b);

  while (left != right) {
    let currentSum = arr[left] + arr[right];
    if (currentSum > target) {
      right--;
    } else if (currentSum < target) {
      left++;
    } else {
      return [left, right];
    }
  }

  return null;
};

//console.log(twoSum([2, 7, 8, 15], 10));

//? Array Product Except self

const productExceptSelf = (arr = []) => {
  let product = 1;
  let result = [];
  for (let num of arr) {
    product = product * num;
  }

  for (let num of arr) {
    result.push(product / num);
  }

  return result;
};

//console.log(productExceptSelf([1, 2, 3, 4]));

//? Median of two arrays

const median = (nums1 = [], nums2 = []) => {
  const sum1 = nums1.reduce((acc, num) => {
    acc += num;
    return acc;
  }, 0);
  const sum2 = nums2.reduce((acc, num) => {
    acc += num;
    return acc;
  }, 0);

  return (sum1 / nums1.length + sum2 / nums2.length) / 2;
};

//console.log(median([1, 3, 5], [2]));

//?
//7,1,5,3,6,4

var maxProfit = function (prices = []) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      maxProfit += prices[i] - minPrice;
      minPrice = prices[i];
    }
  }

  return maxProfit;
};

//console.log(maxProfit([1, 4, 7, 8, 6, 4]));

//? Pivot index
//1,7,3,6,5,6

var pivotIndex = function (nums = []) {
  if (nums.length === 1) return nums[0];

  let leftSum = 0;
  let rightSum = nums.reduce((a, b) => a + b);

  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];

    rightSum -= nums[i];

    if (rightSum === leftSum) {
      return current;
    }

    leftSum += nums[i];
  }

  return -1;
};

//console.log(pivotIndex([1, 7, 3, 6, 5, 6]));

//? Majority element
//[2,2,1,1,1,2,2]

var majorityElement = function (nums = []) {
  const memo = {};
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] in memo) {
      memo[nums[i]]++;
    } else {
      memo[nums[i]] = 1;
    }
  }

  let maxVal = -Infinity;
  let maxKey = null;

  for (const key in memo) {
    if (maxVal < memo[key]) {
      maxVal = memo[key];
      maxKey = key;
    }
  }

  return parseInt(maxKey);
};

var majorityElementAlt = function (nums = []) {
  let majorityElement = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === majorityElement) {
      count++;
    } else {
      count--;
    }

    if (count === 0) {
      majorityElement = nums[i];
      count++;
    }
  }

  return majorityElement;
};

//console.log(majorityElementAlt([2, 2, 1, 1, 1, 2]));

//? sortedSquares

var sortedSquares = function (nums = []) {
  const n = nums.length;
  let result = new Array(n);
  let start = 0;
  let end = n - 1;

  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[start]) >= Math.abs(nums[end])) {
      result[i] = nums[start] * nums[start];
      start++;
    } else {
      result[i] = nums[end] * nums[end];
      end--;
    }
  }

  return result;
};

//console.log(sortedSquares([-7, -3, 2, 3, 11]));

//? Pascal triangle

var generate = function (numRows = 0) {
  if (numRows === 1) return [[1]];
  if (numRows === 2) return [[1], [1, 1]];

  let prevRows = generate(numRows - 1);
  let nextRow = new Array(numRows).fill(1);

  for (let i = 1; i < numRows - 1; i++) {
    nextRow[i] = prevRows[numRows - 2][i - 1] + prevRows[numRows - 2][i];
  }

  prevRows.push(nextRow);
  return prevRows;
};

//console.log(generate(5));

//? Merge intervals

var merge = function (intervals = []) {
  intervals.sort((a, b) => a[0] - b[0]);
  console.log(intervals);

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] >= intervals[i + 1][0]) {
      intervals[i] = [
        Math.min(intervals[i][0], intervals[i + 1][0]),
        Math.max(intervals[i][1], intervals[i + 1][1]),
      ];
      intervals.splice(i + 1, 1);
      i--;
    }
    //console.log(intervals[i+1][0])
  }

  return intervals;
};

// console.log(
//   merge([
//     [1, 4],
//     [2, 3],
//   ])
// );

//? 3Sum
//[-1,0,1,2,-1,-4]

var threeSum = function (nums = []) {
  nums.sort((a, b) => a - b);
  let result = [];

  const twoSum = (arr = [], target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      let currSum = arr[left] + arr[right];
      if (currSum < target) {
        left++;
      } else if (currSum > target) {
        right--;
      } else {
        return [arr[left], arr[right]];
      }
    }
    return null;
  };

  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    let twoSumToFind = -curr;
    let newNums = nums.filter((num) => num !== nums[i]);
    let twoSumResult = twoSum(newNums, twoSumToFind);

    if (twoSumResult !== null) {
      twoSumResult.push(nums[i]);
      result.push(twoSumResult);
    }
  }

  const filteredResult = Array.from(
    new Set(result.map((subArr) => JSON.stringify(subArr.sort())))
  ).map(JSON.parse);

  return filteredResult;
};

console.log(threeSum([-2, 0, 1, 1, 2]));
