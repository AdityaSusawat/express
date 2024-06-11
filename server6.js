class Person {
  static count = 3;
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  setName(name) {
    this.#name = name;
  }

  setAge(age) {
    this.#age = age;
  }

  greet() {
    console.log(`Hi ${this.name}, ${this.age}`);
  }

  static describe(x) {
    console.log(`This is a Person object with a count ${this.count + x}`);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  greet() {
    console.log(`Hi ${this.name}, ${this.age}. You got grade ${this.grade}`);
  }
}

const student = new Student("ABC", 12, "A");
student.greet();
Person.describe(7);
