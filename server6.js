const mapWith = (foo) => {
  return (arg) => arg.map((e) => foo(e));
};

const double = (x) => x * 2;
const mapDouble = mapWith(double);

console.log(mapDouble([1, 2, 3])); // [2, 4
