//? Q. Can an array of integers sum up to be the target sum? Using a single integer multiple times is allowed.
//* m = targetSum ; n = arr.length
//* TimeComplexity : O(m*n) (without arr.filter of for loop)
//* SpaceComplexity : O(m) (without arr.filter of for loop)

//* TimeComplexity without memo : O(n^m) (without arr.filter of for loop)

const canSum = (sum = 0, arr = [], memo = {}) => {
  if (sum in memo) return memo[sum];
  if (sum === 0) return true;
  if (sum < 0) return false;

  for (let num of arr) {
    const remainder = sum - num;
    const newArr = arr.filter((n) => n <= num); //only numbers less than or equal to will be passed
    if (canSum(remainder, newArr, memo) === true) {
      memo[remainder] = true;
      return memo[remainder];
    }
  }
  memo[sum] = false;
  return false;
};

console.log(canSum(1001, [2, 4, 8, 32]));

//? Q. same as above but now return an array of combinations that will make the sum. Any one combination is enough
//* TimeComplexity : O(n*m * m) since we are making a copy of an array at each step
//* SpaceComplexity : O(m * m) m comes from memo which, in worst case, has m keys and values with m elements

//* TimeComplexity without memo : O(n^m * m) since we are making a copy of an array at each step
//* TimeComplexity without memo : O(m) we are making a copy of an array at each step but only returning one branch of arrays whose combined length in worst case is m

const howSum = (targetSum = 0, arr = [], memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of arr) {
    const remainder = targetSum - num;
    const newArr = arr.filter((n) => n <= num);
    const remainderResult = howSum(remainder, newArr, memo);
    if (remainderResult !== null) {
      memo[remainder] = [...remainderResult, num];
      return memo[remainder];
    }
  }

  memo[targetSum] = null;
  return memo[targetSum];
};

console.log(howSum(300, [14, 7]));

//? Q. Same as above but now return the shortest path

//* TimeComplexity : O(n*m * m) since we are making a copy of an array at each step
//* SpaceComplexity : O(m * m) m comes from memo which, in worst case, has m keys and values with m elements

//* TimeComplexity without memo : O(n^m * m) since we are making a copy of an array at each step
//* TimeComplexity without memo : O(m * m) we are storing, at worst, an m length shortestCombination

//? Why am I getting the wrong answer when I pass newArr with memo?
//= Maybe because we are not returning mid for loop?

const bestSum = (targetSum = 0, arr = [], memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestCombination = null;

  for (let num of arr) {
    const remainder = targetSum - num;
    //const newArr = arr.filter((n) => n <= num);
    const remainderCombination = bestSum(remainder, arr, memo);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];
      if (
        shortestCombination === null ||
        combination.length < shortestCombination.length
      ) {
        shortestCombination = combination;
      }
    }
  }

  memo[targetSum] = shortestCombination;
  return shortestCombination;
};

console.log(bestSum(100, [1, 2, 5, 25]));

//? Can an array of words be used to construct a target word?

//* Time Complexity without memo : O(n^m * m) m comes from the substring calculation since we will have to iterate over the target word
//* Space Complexity without memo : O(m * m) m comes from the substring calculation

//* Time Complexity : O(n*m * m)
//* Space Complexity : O(m * m)

const canConstruct = (targetWord = "", arr = [], memo = {}) => {
  if (targetWord in memo) return memo[targetWord];
  if (targetWord === "") return true;
  //if (targetWord.indexOf)
  for (let word of arr) {
    if (targetWord.indexOf(word) === 0) {
      //is word a prefix to the target word?
      const remainder = targetWord.substring(word.length);
      if (canConstruct(remainder, arr, memo) === true) {
        memo[remainder] = true;
        return true;
      }
    }
  }
  memo[targetWord] = false;
  return false;
};

//console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]))
console.log(
  canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeee",
    "eeeeee",
  ])
);

//? Same as above but give the count of ways to do it

//* Time Complexity without memo : O(n^m * m) m comes from the substring calculation since we will have to iterate over the target word
//* Space Complexity without memo : O(m * m) m comes from the substring calculation

//* Time Complexity : O(n*m * m)
//* Space Complexity : O(m * m)

const countConstruct = (targetWord = "", arr = [], memo = {}) => {
  if (targetWord in memo) return memo[targetWord];
  if (targetWord === "") return 1;
  let count = 0;
  for (let word of arr) {
    if (targetWord.indexOf(word) === 0) {
      const remainder = targetWord.slice(word.length);
      const numWaysForRest = countConstruct(remainder, arr, memo);
      count = count + numWaysForRest;
    }
  }
  memo[targetWord] = count;
  return count;
};

//console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]))
console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));

//? Same as above but return all the possible ways in a 2D array

//* Time Complexity : O(n^m)
//* Space Complexity : O(m)

const allConstruct = (targetWord = "", arr = [], memo = {}) => {
  if (targetWord in memo) return memo[targetWord];
  if (targetWord === "") return [[]];
  let result = [];

  for (let word of arr) {
    if (targetWord.indexOf(word) === 0) {
      const remainder = targetWord.slice(word.length);
      const waysForRemainder = allConstruct(remainder, arr, memo);
      const targetWays = waysForRemainder.map((way) => [word, ...way]);
      result.push(...targetWays);
    }
  }

  memo[targetWord] = result;
  return result;
};

console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));

//? fib(n) with tabulation

//* Time complexity : O(n)
//* Space complexity : O(n)

const fib = (n) => {
  const table = new Array(n + 1).fill(0);
  table[1] = 1;
  for (let i = 0; i < n + 1; i++) {
    table[i + 1] += table[i];
    table[i + 2] += table[i];
  }
  return table[n];
};

console.log(fib(50));

//? gridTraveler with tabulation

const gridTraveler = (m, n) => {
  //! const table = new Array(m + 1).fill(new Array(n + 1).fill(0)); wrong because if we table[0][0] = 'x' then x will be in all the arrays 0th index. We want unique reference for each array
  const table = new Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  table[1][1] = 1;

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      const current = table[i][j];
      if (i + 1 <= m) table[i + 1][j] += current;
      if (j + 1 <= n) table[i][j + 1] += current;
    }
  }
  return table[m][n];
};

console.log(gridTraveler(18, 18));

//? canSum with tabulation

//* Time Complexity : O(m*n)
//* Space Complexity : O(m)

const canSum2 = (targetSum = 0, arr = []) => {
  const table = new Array(targetSum + 1).fill(false);
  table[0] = true;
  for (let i = 0; i <= targetSum; i++) {
    if (table[i] === true) {
      arr.forEach((num) => {
        if (i + num < targetSum + 1) table[i + num] = true;
      });
    }
  }

  console.log(table);
  return table[targetSum];
};

console.log(canSum2(300, [7, 14]));

//? howSum with tabulation

//* Time Complexity : O(m*n * m) m comes from copying in worst case scenario 1, 1, 1 ...
//* Space Complexity : O(m * m) m comes from copying in worst case scenario 1, 1, 1 ...

const howSum2 = (targetSum = 0, arr = []) => {
  const table = new Array(targetSum + 1).fill(null);
  table[0] = [];

  for (let i = 0; i <= targetSum; i++) {
    if (table[i] !== null) {
      arr.forEach((num) => {
        if (i + num <= targetSum) table[i + num] = [...table[i], num];
      });
    }
  }
  console.log(table);
  return table[targetSum];
};

console.log(howSum2(7, [2, 3]));

//? bestSum with tabulation

//* Time Complexity : O(n*m * m)
//* Space Complexity : O(m * m)

const bestSum2 = (targetSum = 0, arr = []) => {
  const table = new Array(targetSum + 1).fill(null);
  table[0] = [];

  for (let i = 0; i <= targetSum; i++) {
    if (table[i] !== null) {
      arr.forEach((num) => {
        if (i + num <= targetSum) {
          if (
            table[i + num] === null ||
            table[i + num].length > table[i].length + 1
          ) {
            table[i + num] = [...table[i], num];
          }
        }
      });
    }
  }
  return table[targetSum];
};

console.log(bestSum2(8, [2, 3, 5]));
console.log(bestSum2(100, [1, 2, 5, 25]));

//? canConstruct with tabulation

//* Time Complexity : O(m*n * m)
//* Space Complexity : O(m)

const canConstruct2 = (target = "", arr = []) => {
  const table = new Array(target.length + 1).fill(false);
  table[0] = true;
  for (let i = 0; i <= target.length; i++) {
    if (table[i] === true) {
      arr.forEach((word) => {
        if (target.slice(i, i + word.length) === word) {
          table[i + word.length] = true;
        }
      });
    }
  }
  console.log(table);
  return table[target.length];
};

console.log(canConstruct2("abcdef", ["ab", "abc", "cd", "def", "abcd"]));

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
    let pairs = [];

    while (left < right) {
      let currSum = arr[left] + arr[right];
      if (currSum < target) {
        left++;
      } else if (currSum > target) {
        right--;
      } else {
        pairs.push([arr[left], arr[right]]);
        left++;
        right--;
      }
    }
    return pairs;
  };

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let curr = nums[i];
    let twoSumToFind = -curr;
    let twoSumResult = twoSum(nums.slice(i + 1), twoSumToFind);

    if (twoSumResult.length > 0) {
      // twoSumResult.push(nums[i]);
      // result.push(twoSumResult);
      for (let j = 0; j < twoSumResult.length; j++) {
        let triplet = [curr, ...twoSumResult[j]];
        result.push(triplet);
      }
    }
  }

  const filteredResult = Array.from(
    new Set(result.map((subArr) => JSON.stringify(subArr)))
  ).map(JSON.parse);

  return filteredResult;
};

//console.log(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]));

//? ThreeSumI

const threeSumI = (nums = []) => {
  nums.sort((a, b) => a - b);
  let result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      }
    }
  }

  return result;
};

//console.log(threeSumI([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]))

//? productExceptSelf2 without divide
//[1, 2, 3, 4]
const productExceptSelf2 = (nums = []) => {
  const n = nums.length;

  const dpL = new Array(n).fill(1);
  const dpR = new Array(n).fill(1);

  let left = 0;
  let right = n - 1;

  while (left < n - 1 && right > 0) {
    dpL[left + 1] = dpL[left] * nums[left];
    left++;
    dpR[right - 1] = dpR[right] * nums[right];
    right--;
  }

  for (let i = 0; i < n; i++) {
    nums[i] = dpL[i] * dpR[i];
  }

  console.log(dpL, dpR);
  return nums;
};

//console.log(productExceptSelf2([-1,1,0,-3,3]))

//? RandomizedSet

var RandomizedSet = function () {
  this.values = [];
  this.valuesToIndex = {};
};

RandomizedSet.prototype.insert = function (val) {
  if (this.valuesToIndex.hasOwnProperty(val)) return false;
  this.values.push(val);
  this.valuesToIndex[val] = this.values.length - 1;
  return true;
};

RandomizedSet.prototype.remove = function (val) {
  if (!this.valuesToIndex.hasOwnProperty(val)) return false;

  let indexOfVal = this.valuesToIndex[val];
  let indexOfLastElement = this.values.length - 1;

  //swap the last element and the val element from the array
  [this.values[indexOfVal], this.values[indexOfLastElement]] = [
    this.values[indexOfLastElement],
    this.values[indexOfVal],
  ];
  this.valuesToIndex[this.values[indexOfVal]] = indexOfVal;

  //pop with O(1)
  this.values.pop();
  delete this.valuesToIndex[val];

  return true;
};

RandomizedSet.prototype.getRandom = function () {
  const randomIndex = Math.floor(Math.random() * this.values.length);
  return this.values[randomIndex];
};

const mySet = new RandomizedSet();
mySet.insert(0);
mySet.insert(1);
mySet.remove(0);
mySet.insert(2);
mySet.remove(1);
console.log(mySet.getRandom());

console.log(mySet);
