const array = [1, 2, 3, [4, 5], 6, 7];
const result = [];

for (let i = 0; i < array.length; i++) {
  if (typeof array[i] === "number") {
    result.push(array[i]);
  } else {
    array[i].forEach((e) => result.push(e));
  }
}

console.log(result);
