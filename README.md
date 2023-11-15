# typescript project
[test how to auto re-construct of a nested structure](./src/index.ts)
## pre install dependencies
```shell
npm install
```
## build and run
ts:
```shell
./run.sh
```
output
```text
student info  Student {
  name: 'Alice',
  age: 12,
  inner_data_type: Subject { name: 'math', score: 100 }
}
student sayHello:  My name is: Alice
student stringify:  {"name":"Alice","age":12}
studentBack info  { name: 'Alice', age: 12 }
studentBack sayHello:  My name is: Alice
car:  Car {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: Factory {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
  }
}
car run:  Mercedes-Benz run with speed: 240 show factoryfactory name: Bremen factory location: Bremen German
deserializedCar:  Car {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: Factory {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: { name: 'Thomas Müller', age: 40, sex: 'male' }
  }
}
deserializedCar run:  Mercedes-Benz run with speed: 240 show factoryfactory name: Bremen factory location: Bremen German
decodeNested filed, key:   name  value:  Mercedes-Benz instance[ name ]:  
decodeNested filed, key:   speed  value:  240 instance[ speed ]:  0
decodeNested filed, key:   factory  value:  {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: { name: 'Thomas Müller', age: 40, sex: 'male' }
} instance[ factory ]:  Factory {
  name: '',
  location: '',
  director: Person { name: '', age: 0, sex: 'male' }
}
object fields, object key:  factory  value:  {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: { name: 'Thomas Müller', age: 40, sex: 'male' }
}
decodeNested filed, key:   name  value:  Bremen factory instance[ name ]:  
decodeNested filed, key:   location  value:  Bremen German instance[ location ]:  
decodeNested filed, key:   director  value:  { name: 'Thomas Müller', age: 40, sex: 'male' } instance[ director ]:  Person { name: '', age: 0, sex: 'male' }
object fields, object key:  director  value:  { name: 'Thomas Müller', age: 40, sex: 'male' }
decodeNested filed, key:   name  value:  Thomas Müller instance[ name ]:  
decodeNested filed, key:   age  value:  40 instance[ age ]:  0
decodeNested filed, key:   sex  value:  male instance[ sex ]:  male
current instance:  Person { name: 'Thomas Müller', age: 40, sex: 'male' }
instance[key] value Person { name: 'Thomas Müller', age: 40, sex: 'male' }
current instance:  Factory {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
}
instance[key] value Factory {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
}
current instance:  Car {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: Factory {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
  }
}
deserializedCar2 run: Mercedes-Benz run with speed: 240 deserializedCar2 show factory:  factory name: Bremen factory location: Bremen German factor director info:  name is: Thomas Müller age: 40 sex: male
```
js:
```shell
node src/app.js
```
response:
```text
Hello world!
car schema:  {
  name: 'string',
  speed: 'number',
  factory: [class Factory] {
    schema: { name: 'string', location: 'string', director: [Function] }
  },
  records: { map: { key: 'string', value: [class Record] } }
}
car run: Mercedes-Benz run with speed: 240
carObj:  {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: { name: 'Thomas Müller', age: 40, sex: 'male' }
  },
  records: {}
}
decodeNested filed, key:   name  value:  Mercedes-Benz instance[ name ]:  
decodeNested filed, key:   speed  value:  240 instance[ speed ]:  0
decodeNested filed, key:   factory  value:  {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: { name: 'Thomas Müller', age: 40, sex: 'male' }
} instance[ factory ]:  Factory {
  name: '',
  location: '',
  director: Person { name: '', age: 0, sex: 'male' }
}
object fields, object key:  factory  value:  {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: { name: 'Thomas Müller', age: 40, sex: 'male' }
}
decodeNested filed, key:   name  value:  Bremen factory instance[ name ]:  
decodeNested filed, key:   location  value:  Bremen German instance[ location ]:  
decodeNested filed, key:   director  value:  { name: 'Thomas Müller', age: 40, sex: 'male' } instance[ director ]:  Person { name: '', age: 0, sex: 'male' }
object fields, object key:  director  value:  { name: 'Thomas Müller', age: 40, sex: 'male' }
decodeNested filed, key:   name  value:  Thomas Müller instance[ name ]:  
decodeNested filed, key:   age  value:  40 instance[ age ]:  0
decodeNested filed, key:   sex  value:  male instance[ sex ]:  male
current instance:  Person { name: 'Thomas Müller', age: 40, sex: 'male' }
instance[key] value Person { name: 'Thomas Müller', age: 40, sex: 'male' }
current instance:  Factory {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
}
instance[key] value Factory {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
}
decodeNested filed, key:   records  value:  {} instance[ records ]:  {}
object fields, object key:  records  value:  {}
current instance:  {}
instance[key] value {}
current instance:  Car {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: Factory {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
  },
  records: {}
}
deserializedCar run: Mercedes-Benz run with speed: 240 deserializedCar2 show factory:  factory name: Bremen factory location: Bremen German factor director info:  name is: Thomas Müller age: 40 sex: male
serialized car with records: {"name":"Mercedes-Benz","speed":240,"factory":{"name":"Bremen factory","location":"Bremen German","director":{"name":"Thomas Müller","age":40,"sex":"male"}},"records":{"key1":{"content":"today is a good day"}}}
car schema:  {
  name: 'string',
  speed: 'number',
  factory: [class Factory] {
    schema: { name: 'string', location: 'string', director: [Function] }
  },
  records: { map: { key: 'string', value: [class Record] } }
}
decodeNested filed, key:   name  value:  Mercedes-Benz instance[ name ]:  
decodeNested filed, key:   speed  value:  240 instance[ speed ]:  0
decodeNested filed, key:   factory  value:  {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: { name: 'Thomas Müller', age: 40, sex: 'male' }
} instance[ factory ]:  Factory {
  name: '',
  location: '',
  director: Person { name: '', age: 0, sex: 'male' }
}
object fields, object key:  factory  value:  {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: { name: 'Thomas Müller', age: 40, sex: 'male' }
}
decodeNested filed, key:   name  value:  Bremen factory instance[ name ]:  
decodeNested filed, key:   location  value:  Bremen German instance[ location ]:  
decodeNested filed, key:   director  value:  { name: 'Thomas Müller', age: 40, sex: 'male' } instance[ director ]:  Person { name: '', age: 0, sex: 'male' }
object fields, object key:  director  value:  { name: 'Thomas Müller', age: 40, sex: 'male' }
decodeNested filed, key:   name  value:  Thomas Müller instance[ name ]:  
decodeNested filed, key:   age  value:  40 instance[ age ]:  0
decodeNested filed, key:   sex  value:  male instance[ sex ]:  male
current instance:  Person { name: 'Thomas Müller', age: 40, sex: 'male' }
instance[key] value Person { name: 'Thomas Müller', age: 40, sex: 'male' }
current instance:  Factory {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
}
instance[key] value Factory {
  name: 'Bremen factory',
  location: 'Bremen German',
  director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
}
decodeNested filed, key:   records  value:  { key1: { content: 'today is a good day' } } instance[ records ]:  {}
object fields, object key:  records  value:  { key1: { content: 'today is a good day' } }
map type
decodeNested filed, key:   content  value:  today is a good day instance[ content ]:  
current instance:  Record { content: 'today is a good day' }
instance[key] value { key1: Record { content: 'today is a good day' } }
current instance:  Car {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: Factory {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
  },
  records: { key1: Record { content: 'today is a good day' } }
}
deserializedCar2:  Car {
  name: 'Mercedes-Benz',
  speed: 240,
  factory: Factory {
    name: 'Bremen factory',
    location: 'Bremen German',
    director: Person { name: 'Thomas Müller', age: 40, sex: 'male' }
  },
  records: { key1: Record { content: 'today is a good day' } }
}

```