"use strict";

/*
 *Сеть фастфудов предлагает несколько видов гамбургеров:
 ** - маленький (50 рублей, 20 калорий);**
 - большой (100 рублей, 40 калорий).
 Гамбургер может быть с одним из нескольких видов начинок (обязательно):
 ** - сыром (+ 10 рублей, + 20 калорий);**
 ** - салатом (+ 20 рублей, + 5 калорий);**
 - картофелем (+ 15 рублей, + 10 калорий).

 *Дополнительно гамбургер можно посыпать приправой (+ 15 рублей, 0 калорий)
 и полить майонезом (+ 20 рублей, + 5 калорий). *

 Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
 Используйте ООП-подход (подсказка: нужен класс Гамбургер, константы,
 методы для выбора опций и расчета нужных величин).
 */

let Hamburger = function() {

};

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
jeep.move();
//car1.move();