"use strict";

// 1. процедурный подход
// let carName = 'audi';
// let carColor = 'red';
// let carSpeed = 200;
//
// let moveCar = function () {
//     console.log(`${carColor} ${carName} is moving with speed ${carSpeed}km/h`);
// };

// 2. Объект

// let car = {
//     name: 'audi',
//     color: 'red',
//     speed: 200,
//     move: function () {
//         // console.log (`car is moving`);
//         console.log(`${this.color} ${this.name} is moving with speed ${this.speed}km/h`);
//     }
// };


// 3. Использование функции

// let Car = function (name,color,speed) {
//     let car = {};
//
//     car.name = name;
//     car.color = color;
//     car.speed = speed;
//
//     car.move = function () {
//         // console.log (`car is moving`);
//         console.log(`${this.color} ${this.name} is moving with speed ${this.speed}km/h`);
//     };
//     return car;
// };


// 4. Использование функции конструктора + прототип


let Car = function (name, color, speed) {
    this.name = name;
    this.color = color;
    this.speed = speed;
    // this.move = carMove;

};

Car.prototype.move = function () {
    // console.log (`car is moving`);
    console.log(`${this.color} ${this.name} is moving with speed ${this.speed}km/h`);
};

let Jeep = function () {
    Car.call(this, 'jeep', 'black', 120);
};

Jeep.prototype = Object.create(Car.prototype);
Jeep.prototype.constructor = Jeep;


let car1 = new Car('audi', 'red', 180);
let car2 = new Car('bmw', 'black', 20);
let jeep = new Jeep();
console.log(car1, car2, jeep);

//car1.move();

