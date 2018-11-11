"use strict";

/*Урок 6, задание 2:

 Реализовать модуль корзины. У каждого товара есть кнопка «Купить», при нажатии на которую
 происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать
 общую сумму заказа. Один товар можно добавить несколько раз.
 */

/*
 Ощущение, что в хинтах Вы теперь даете не направление решения, а само решение - остается только
 скопировать и запустить))
 */


/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 * @property {HTMLElement} basketElement Элемент корзины.
 */
const basket = {
    settings: {
        basketSelector: 'container',
        countSelector: 'basket-count',
        priceSelector: 'basket-price',
    },
    basketElement: null,
    goods: [],
    countEl: null,
    priceEl: null,

    /**
     * Инициализирует переменные для корзины и показывает эти значения.
     */
    init(settings = {}) {
        this.basketElement = document.getElementById(this.settings.basketSelector);
        this.countEl = 0;
        this.priceEl = 0;
        this.goods = [];
        // Инициализируем обработчики событий.
        this.initEventHandlers();
        this.render();
    },

    /**
     * Инициализация обработчиков событий.
     */
    initEventHandlers() {
        this.basketElement.addEventListener('click', event => this.buyBtnClickHandler(event));
    },

    /**
     * Обработчик нажатия кнопки купить, добавляет товар в массив корзины, запускает обновление итогов
     * @param event
     */
    buyBtnClickHandler (event){
        if (!this.isClickByBuyBtn(event)) {
            return;
        }
        this.add(event.target.dataset.name, event.target.dataset.price);
        this.getGoodsPrice();
        this.render();
    },

    /**
     * Проверка что клик был по кнопке.
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернет true, если клик был по ячейке, иначе false.
     */
    isClickByBuyBtn(event) {
        return event.target.classList.contains('buy-btn');
    },

    /**
     * Отображает количество всех товаров и их цену.
     */
    render() {
        document.getElementById(this.settings.countSelector).textContent = this.countEl.toString();
        document.getElementById(this.settings.priceSelector).textContent = this.priceEl.toString();
    },

    /**
     * Считает и возвращает цену всех купленных товаров из массива this.goods.
     * @returns {number} Цену всех купленных товаров.
     */
    getGoodsPrice() {
        this.countEl = 0;
        this.priceEl = 0;
        for (let val of this.goods) {
            this.countEl++;
            this.priceEl += +val.goodPrice;
        }
    },

    /**
     * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
     * @param goodName Название товара.
     * @param goodPrice Цена товара.
     */
    add(goodName, goodPrice) {
        this.goods.push({goodName: goodName, goodPrice: goodPrice});
    },
};

// Запускаем приложения.
window.onload = () => basket.init();
