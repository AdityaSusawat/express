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
