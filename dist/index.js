"use strict";
function replacer(key, value) {
    if (key == "inner_data_type")
        return undefined;
    else
        return value;
}
class Student {
    constructor(name, age, inner_data_type) {
        this.name = name;
        this.age = age;
        this.inner_data_type = inner_data_type;
    }
    sayHello() {
        return "My name is: " + this.name;
    }
}
class Subject {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
    subjectInfo() {
        return "subject info is: " + this.name + "score: " + this.score;
    }
}
const student = new Student("Alice", 12, new Subject("math", 100));
console.log("student info ", student);
console.log("student sayHello: ", student.sayHello());
let value = JSON.stringify(student, replacer);
console.log("student stringify: ", value);
const studentBack = JSON.parse(value);
console.log("studentBack info ", studentBack);
// console.log("studentBack sayHello: ", studentBack.sayHello())
//# sourceMappingURL=index.js.map