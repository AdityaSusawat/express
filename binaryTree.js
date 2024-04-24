//! BINARY TREE PROBLEMS

class Node {
  constructor(n) {
    this.val = n;
    this.left = null;
    this.right = null;
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

const n1 = new Node(5);
const n2 = new Node(11);
const n3 = new Node(3);
const n4 = new Node(4);
const n5 = new Node(2);
const n6 = new Node(1);

n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
n3.right = n6;

//? Depth first search
//* TC : O(n)
//* SC : O(n)

const recursiveDepthFirst = (root) => {
  if (root === null) return [];
  const leftValues = recursiveDepthFirst(root.left); //b d e
  const rightValues = recursiveDepthFirst(root.right); //c f
  return [root.val, ...leftValues, ...rightValues];
};

const iterativeDepthFirst = (root) => {
  if (root === null) return [];
  let result = [];
  let stack = [root];

  while (stack.length > 0) {
    let current = stack.pop();
    result.push(current.val);

    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }

  return result;
};

console.log(iterativeDepthFirst(a));
console.log(recursiveDepthFirst(a));

//? Breadth first search
//* TC : O(n)
//* SC : O(n)

const iterativeBreadthFirst = (root) => {
  if (root === null) return [];
  let queue = [root];
  let result = [];

  while (queue.length > 0) {
    let current = queue.shift();
    result.push(current.val);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return result;
};

console.log(iterativeBreadthFirst(a));

//? treeIncludes

const treeIncludesIterativeBFS = (target, root) => {
  if (root === null) return [];
  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.val === target) return true;
    result.push(current.val);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return result;
};

console.log(treeIncludesIterativeBFS("a", a));

const treeIncludesRecursiveBFS = (target, root) => {
  if (root === null) return false;
  if (root.val === target) return true;

  const leftSide = treeIncludesRecursiveBFS(target, root.left);
  const rightSide = treeIncludesRecursiveBFS(target, root.right);

  return leftSide || rightSide;
};

console.log(treeIncludesRecursiveBFS("g", a));

//? treeSum
//* TC : O(n)
//* SC : O(n)

const treeSumRec = (root) => {
  if (root === null) return 0;
  return root.val + treeSumRec(root.left) + treeSumRec(root.right);
};

console.log(treeSumRec(n1));

const treeSumIte = (root) => {
  if (root === null) return 0;
  const queue = [root];
  let sum = 0;

  while (queue.length > 0) {
    let current = queue.shift();
    sum = sum + current.val;

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return sum;
};

console.log(treeSumIte(n1));

//? treeMin
// TC : O(n)
// SC : O(n)

const treeMinIte = (root) => {
  if (root === null) return null;
  const queue = [root];
  let min = +Infinity;

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.val < min) min = current.val;

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return min;
};

console.log(treeMinIte(n1));

const treeMinRec = (root) => {
  if (root === null) return Infinity;
  return Math.min(treeMinRec(root.left), treeMinRec(root.right), root.val);
};

console.log(treeMinRec(n1));

//? maxPath

const maxPath = (root) => {
  if (root === null) return [];
  //if (!root.left && !root.right) return [root.val];
  let leftSum = 0;
  let rightSum = 0;

  if (root.left) {
    for (let sum of maxPath(root.left)) leftSum += sum;
  }

  if (root.right) {
    for (let sum of maxPath(root.right)) rightSum += sum;
  }

  if (leftSum > rightSum) {
    return [...maxPath(root.left), root.val];
  } else {
    return [...maxPath(root.right), root.val];
  }

  //return [Math.max(leftSum, rightSum), root.val]
};

console.log(maxPath(n1));

//? maxPathSum
//* TC : O(n)
//* SC : O(n)

const maxPathSum = (root) => {
  if (root === null) return 0;
  let leftSum = maxPathSum(root.left);
  let rightSum = maxPathSum(root.right);

  return Math.max(root.val + Math.max(leftSum, rightSum));
};

console.log(maxPathSum(n1));

//? increasingBST

var increasingBST = function (root) {
  const data = [];
  const bfsInOrder = (root) => {
    if (root === null) return;
    bfsInOrder(root.left);
    data.push(root.val);
    bfsInOrder(root.right);
  };
  bfsInOrder(root);
  const newTreeRoot = new Node(data[0]);
  let current = newTreeRoot;
  for (let i = 1; i < data.length; i++) {
    current.right = new Node(data[i]);
    current = current.right;
  }
  return newTreeRoot;
};
