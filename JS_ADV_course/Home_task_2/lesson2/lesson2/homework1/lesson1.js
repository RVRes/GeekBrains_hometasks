// ES5

// let john = {
//     name: 'John',
//     yearOfBirth: 1980,
//     calcAge: function () {
//         console.log(new Date().getFullYear() - this.yearOfBirth)
//     }
// };
//
// function Person(name, yearOfBirth){
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
// }
//
// Person.prototype.calcAge = function () {
//     console.log(new Date().getFullYear() - this.yearOfBirth)
// };
// Person.prototype.lastName = 'Doe';
//
// function Teacher(name, yearOfBirth, subject){
//     Person.call(this ,name, yearOfBirth);
//     this.subject = subject;
// }
//
// Teacher.prototype = Object.create(Person.prototype);
// Teacher.prototype.constructor = Teacher;
//
// let ann = new Person('Ann', 1980);
// let tom = new Teacher('Tom', 1960, 'math');
// ann.calcAge();
// tom.calcAge();

// ES6

class Person {
    constructor(name, yearOfBirth){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }
    calcAge(){
        console.log(new Date().getFullYear() - this.yearOfBirth)
    }
    sayHi(){
        return `${this.name} says hi`
    }
    static triple(x){
        if (x === undefined) {
            x = 2;
        }
        return x * 3;
    }
}

class Teacher extends Person {
    constructor(name, yearOfBirth, subject){
        super(name, yearOfBirth); // Вызов конструктора родителя
        this.subject = subject;
    }
    sayHi(){
        console.log(`${super.sayHi()} as teacher`);
    }
    // static triple(x){
    //     if (x === undefined) {
    //         x = 2;
    //     }
    //     return x * 3;
    // }
}

let john = new Person('John', 1920);
let ann = new Teacher('Ann', 1999, 'chemistry');
john.calcAge();
ann.calcAge();
ann.sayHi();
john.sayHi();
console.log(Teacher.triple(4));