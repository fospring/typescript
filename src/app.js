const lodash = require("lodash");
console.log("Hello world!")

class Person {
    constructor() {
        this.name = "";
        this.age = 0;
        this.sex= "male";
    }
    showInfo() {
        return "name is: " + this.name + " age: " + this.age + " sex: " + this.sex;
    }
}

class Factory {
    constructor() {
        this.name = "";
        this.location = "";
        this.director= new Person();
    }

    show() {
        return "factory name: "+this.name + " location: " + this.location;
    }
}

class Record {
    constructor() {
        this.content = "";
    }
    show() {
        return "record: " + this.content;
    }
}

class Car {
    constructor() {
        this.name = "";
        this.speed = 0;
        this.factory = new Factory();
        this.record = {};
    }

    run() {
        return this.name + " run with speed: " + this.speed.toString()
    }
}

function decodeNested(instance, obj) {
    let key;
    for (key in obj) {
        // @ts-ignore
        let value = obj[key];
        console.log("decodeNested filed, key:  ", key, " value: ", value, "instance[", key, "]: ", instance[key]);
        if (typeof value == 'object') {
            console.log("object fields, object key: ", key, " value: ", value);
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

let car = new Car();
car.name = "Mercedes-Benz";
car.speed = 240;
car.factory.name = "Bremen factory";
car.factory.location = "Bremen German";
car.factory.director.name = "Thomas Müller";
car.factory.director.age = 40;
car.factory.director.sex = "male";
// let record1 = new Record();
// record1.content = "today is a good day";
// car.record['key1'] = record1;
console.log("car run: " + car.run());
const serializedCar = JSON.stringify(car);
const carObj = JSON.parse(serializedCar);
console.log("carObj: ", carObj);
const deserializedCar = decodeNested(new Car(), carObj);
console.log("deserializedCar run: " + deserializedCar.run(), "deserializedCar2 show factory: ", deserializedCar.factory.show(), "factor director info: ", deserializedCar.factory.director.showInfo());
