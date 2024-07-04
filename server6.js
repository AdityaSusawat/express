const person = {
  greet: function () {
    console.log(`Hi ${this.name}`);
  },
};

const student = Object.create(person);
student.name = "ABC";
console.log(student);
student.greet();
