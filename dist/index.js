"use strict";
// hide data field: https://stackoverflow.com/questions/4910567/hide-certain-values-in-output-from-json-stringify
// https://code.tutsplus.com/the-best-way-to-deep-copy-an-object-in-javascript--cms-39655a
// https://juejin.cn/post/6844904048701751303
// https://stackoverflow.com/questions/41588068/object-assign-override-nested-property
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
class Factory {
    constructor() {
        this.name = "";
        this.location = "";
    }
    show() {
        return "factory name: " + this.name + " location: " + this.location;
    }
}
class Car {
    constructor() {
        this.name = "";
        this.speed = 0;
        this.factory = new Factory();
    }
    run() {
        return this.name + " run with speed: " + this.speed.toString();
    }
}
const student = new Student("Alice", 12, new Subject("math", 100));
console.log("student info ", student);
console.log("student sayHello: ", student.sayHello());
let value = JSON.stringify(student, replacer);
console.log("student stringify: ", value);
const studentBack = JSON.parse(value);
const a = Object.assign(new Student("", 0, Subject), studentBack);
console.log("studentBack info ", studentBack);
console.log("studentBack sayHello: ", a.sayHello());
const car = new Car();
car.name = "Mercedes-Benz";
car.speed = 240;
car.factory.name = "Bremen factory";
car.factory.location = "Bremen German";
console.log("car: ", car);
console.log("car run: ", car.run(), "show factory" + car.factory.show());
const serializedCar = JSON.stringify(car, replacer);
const carObj = JSON.parse(serializedCar);
const carObj2 = JSON.parse(serializedCar);
let deserializedCar = carObj;
deserializedCar.factory = Object.assign(new Factory(), deserializedCar.factory);
deserializedCar = Object.assign(new Car(), deserializedCar);
console.log("deserializedCar: ", deserializedCar);
console.log("deserializedCar run: ", deserializedCar.run(), "show factory" + deserializedCar.factory.show());
const deserializedCar2 = decodeNested(new Car(), carObj2);
console.log("deserializedCar2 run: " + deserializedCar2.run(), "deserializedCar2 show factory: ", deserializedCar2.factory.show());
function decodeNested(instance, obj) {
    let key;
    for (key in obj) {
        // @ts-ignore
        let value = obj[key];
        console.log("decodeNested filed, key:  ", key, " value: ", value, "instance[", key, "]: ", instance[key]);
        if (typeof value == 'object') {
            console.log("object key: ", key, " value: ", value);
            // @ts-ignore
            instance[key] = Object.assign(instance[key], obj[key]);
        }
    }
    instance = Object.assign(instance, deserializedCar);
    return instance;
}
//# sourceMappingURL=index.js.map