const lodash = require("lodash");

class Person {
    static schema = {
        name: "string",
        age: "number",
        sex: "string",
    };
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
    static schema = {
        name: "string",
        location: "string",
        director: Person,
    };
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

class Wheel {
    constructor() {
        this.position = "";
    }
    show() {
        return "wheel position: " + this.position;
    }
}

function new_wheel(position) {
    let wheel = new Wheel();
    wheel.position = position;
    return wheel;
}

// mock UnorderedMap
class MockUnorderedMap {
    constructor(prefix) {
        this.prefix = prefix;
        this._keys = [];
        this.values = [];
    }
}

class Car {
    static schema = {
        name: "string",
        speed: "number",
        factory: Factory,
        records: {map: { key: 'string', value: Record }},
        wheels: {array: {value: Wheel}},
        mock_unorder_map: {unorder_map: {value: 'string'}}
    };
    constructor() {
        this.name = "";
        this.speed = 0;
        this.factory = new Factory();
        this.records = {};
        this.wheels = [];
        this.mock_unorder_map = new MockUnorderedMap('a');
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
        if (typeof value == 'object') {
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

function decodeNested2(instance, obj) {
    let key;
    for (key in obj) {
        // @ts-ignore
        let value = obj[key];
        console.log("decodeNested filed, key:  ", key, " value: ", value, "instance[", key, "]: ", instance[key]);
        if (typeof value == 'object') {
            console.log("object fields, object key: ", key, " value: ", value);
            // @ts-ignore
            let ty = instance.constructor.schema[key];
            if (ty !== undefined && ty.hasOwnProperty("map")) {
                console.log("map type");
                for (let mkey in value) {
                    instance[key][mkey] = decodeNested2(new ty["map"]["value"](), value[mkey]);
                }
            } else if (ty !== undefined && ty.hasOwnProperty("array")) {
                console.log("vector type");
                for (let k in value) {
                    instance[key].push(decodeNested2(new ty["array"]["value"](), value[k]));
                }
            } else if (ty !== undefined && ty.hasOwnProperty("unorder_map")) {
                instance[key].constructor.schema = ty;
                let subtype_value = ty["unorder_map"]["value"];
                instance[key].subtype = function () {
                    return subtype_value;
                }
                instance[key] = decodeNested2(instance[key], obj[key]);
            } else {
                // normal case
                instance[key].constructor.schema = instance.constructor.schema[key];
                instance[key] = decodeNested2(instance[key], obj[key]);
            }
            console.log("instance[key] value", instance[key]);
        }
    }
    let subtype = instance.subtype;
    const instance_tmp = lodash.cloneDeep(instance);
    instance = Object.assign(instance, obj);
    for (key in obj) {
        if (typeof instance[key] == 'object') {
            instance[key] = instance_tmp[key];
        }
    }
    if (subtype !== undefined) {
        instance.subtype = subtype;
    }
    console.log("current instance: ", instance);
    return instance;
}

let car = new Car();
console.log("car schema: ", Car.schema);
car.name = "Mercedes-Benz";
car.speed = 240;
car.factory.name = "Bremen factory";
car.factory.location = "Bremen German";
car.factory.director.name = "Thomas Müller";
car.factory.director.age = 40;
car.factory.director.sex = "male";

console.log("car run: " + car.run());
let serializedCar = JSON.stringify(car);
const carObj = JSON.parse(serializedCar);
console.log("carObj: ", carObj);
const deserializedCar = decodeNested(new Car(), carObj);
console.log("deserializedCar run: " + deserializedCar.run(), "deserializedCar2 show factory: ", deserializedCar.factory.show(), "factor director info: ", deserializedCar.factory.director.showInfo());

let record1 = new Record();
record1.content = "today is a good day";
car.records['key1'] = record1;
let record2 = new Record();
record2.content = "tomorrow will be a good day";
car.records['key2'] = record2;
car.wheels.push(new_wheel("left front wheel"), new_wheel("right front wheel"));
serializedCar = JSON.stringify(car);
console.log("serialized car with records: " + serializedCar);
console.log("car schema: ", car.constructor.schema);
const carObj2 = JSON.parse(serializedCar);
let deserializedCar2 = decodeNested2(new Car(), carObj2);
console.log("deserializedCar2: ", deserializedCar2);
console.log("mock_unorder_map's subtype: ", deserializedCar2.mock_unorder_map.subtype());
console.log("JSON.stringify(deserializedCar2): \n", JSON.stringify(deserializedCar2));