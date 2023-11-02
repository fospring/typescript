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

const student = new Student("Alice", 12, new Subject("math", 100));
console.log("student info ", student)
console.log("student sayHello: ", student.sayHello())
let value = JSON.stringify(student, replacer);
console.log("student stringify: ", value)
const studentBack: Student<Subject> = JSON.parse(value);
console.log("studentBack info ", studentBack)
// console.log("studentBack sayHello: ", studentBack.sayHello())

