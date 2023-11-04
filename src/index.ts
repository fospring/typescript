// hide data field: https://stackoverflow.com/questions/4910567/hide-certain-values-in-output-from-json-stringify
// https://code.tutsplus.com/the-best-way-to-deep-copy-an-object-in-javascript--cms-39655a
// https://juejin.cn/post/6844904048701751303
// https://stackoverflow.com/questions/41588068/object-assign-override-nested-property
import * as lodash from 'lodash';
function replacer(key: string,value: any)
{
    if (key=="inner_data_type") return undefined;
    else return value;
}

class Student<DataType> {
    name: string;
    age: number;
    inner_data_type: DataType

    constructor(name: string, age: number, inner_data_type: DataType) {
        this.name = name;
        this.age = age;
        this.inner_data_type = inner_data_type;
    }
    sayHello(): string {
        return "My name is: " + this.name;
    }
}

class Subject {
    name: string;
    score: number;
    constructor(name: string, score: number) {
        this.name = name;
        this.score = score;
    }

    subjectInfo(): string {
        return "subject info is: " + this.name + "score: " + this.score;
    }
}

class Factory {
    name: string = "";
    location: string = "";
    director: Person = new Person();

    show(): string {
        return "factory name: "+this.name + " location: " + this.location;
    }
}

class Person {
    name: string = "";
    age: number = 0;
    sex: string = "male";
    showInfo(): string {
        return "name is: " + this.name + " age: " + this.age + " sex: " + this.sex;
    }
}

class Car {
    name: string = "";
    speed: number = 0;
    factory: Factory = new Factory();

    run(): string {
        return this.name + " run with speed: " + this.speed.toString()
    }
}

const student = new Student("Alice", 12, new Subject("math", 100));
console.log("student info ", student)
console.log("student sayHello: ", student.sayHello())
let value = JSON.stringify(student, replacer);
console.log("student stringify: ", value)
const studentBack: Student<Subject> = JSON.parse(value);
const a = Object.assign(new Student("", 0, Subject), studentBack);
console.log("studentBack info ", studentBack)
console.log("studentBack sayHello: ", a.sayHello())

const car = new Car();
car.name = "Mercedes-Benz";
car.speed = 240;
car.factory.name = "Bremen factory";
car.factory.location = "Bremen German";
car.factory.director.name = "Thomas Müller";
car.factory.director.age = 40;
car.factory.director.sex = "male";
console.log("car: ", car)
console.log("car run: ", car.run(), "show factory" + car.factory.show())
const serializedCar = JSON.stringify(car, replacer);
const carObj = JSON.parse(serializedCar);
const carObj2 = JSON.parse(serializedCar);
let deserializedCar = carObj;
deserializedCar.factory = Object.assign(new Factory(), deserializedCar.factory);
deserializedCar = Object.assign(new Car(), deserializedCar);

console.log("deserializedCar: ", deserializedCar);
console.log("deserializedCar run: ", deserializedCar.run(), "show factory" + deserializedCar.factory.show())
const deserializedCar2 = decodeNested(new Car(), carObj2);
console.log("deserializedCar2 run: " + deserializedCar2.run(), "deserializedCar2 show factory: ", deserializedCar2.factory.show(), "factor director info: ", deserializedCar2.factory.director.showInfo());

function decodeNested(instance: any, obj: object): any {
    let key: keyof typeof instance;
    for (key in obj) {
        // @ts-ignore
        let value = obj[key];
        console.log("decodeNested filed, key:  ", key, " value: ", value, "instance[",key,"]: ", instance[key]);
        if (typeof value == 'object') {
            console.log("object fields, object key: ", key ," value: ", value);
            // @ts-ignore
            instance[key] = decodeNested(instance[key], obj[key]);
            console.log("instance[key] value", instance[key]);
        }
    }
    const instance_tmp = lodash.cloneDeep(instance);
    instance = Object.assign(instance, obj);
    for (key in obj) {
        if (typeof instance[key] == 'object') {
            instance[key] = instance_tmp[key];
        }
    }
    console.log("current instance: ", instance);
    return instance;
}
