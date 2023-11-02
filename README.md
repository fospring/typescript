# typescript project
[test how to auto re-construct of a nested structure](./src/index.ts)
## pre install dependencies
```shell
npm install
```
## build and run
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
```