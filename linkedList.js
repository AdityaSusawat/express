class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  find(value) {
    if (!this.head) {
      return "Empty list";
    }
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  remove(value) {
    if (!this.head) {
      return "Empty list";
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  print() {
    let result = "";
    if (!this.head) {
      result = "Empty list";
      return result;
    }
    let current = this.head;
    while (current.next) {
      result = result + current.value + " -> ";
      current = current.next;
    }
    result = result + current.value + " -> null";
    return result;
  }
}

class Node2 {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class LinkedList2 {
  constructor() {
    this.head = null;
  }
  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result = result + current.value + " -> ";
      current = current.next;
    }
    result = result + "null";
    console.log(result);
  }
}

const myList = new LinkedList2();
const node1 = new Node2(1);
const node2 = new Node2(2);
const node3 = new Node2(3);

myList.head = node1;
node1.next = node2;
node2.next = node3;
node3.next = null;

myList.print();

function reverseList(myList) {
  let current = myList.head;
  if (!current) return current;
  let nextNode = current.next;
  let prevNode = null;

  while (current) {
    nextNode = current.next;
    current.next = prevNode;
    prevNode = current;
    current = nextNode;
  }

  myList.head = prevNode;
}

reverseList(myList);
myList.print();
