"use strict";

/*Урок 5, задание 1:

 Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
 Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны
 нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.

 */

/**
 * Объект с настройками игры
 * @property {int} rowsCount Количество строк на доске.
 * @property {int} colsCount Количество колонок на доске.
 * @property {string} blackCellColorStyle Стиль цвета черной ячейки
 * @property {string} whiteCellColorStyle Стиль цвета белой ячейки
 * @property {string} noborderCellStyle Стиль ячейки без рамки
 */
const settings = {
    rowsCount: 8,  //да, в шахматах нечасто меняется сама доска)), оставил для наглядности кода.
    colsCount: 8,
    blackCellColorStyle: 'bg-black',
    whiteCellColorStyle: 'bg-white',
    noborderCellStyle: 'border-clear',
};

/**
 * Объект игры, здесь будут все методы и свойства связанные с ней.
 * @property {settings} settings Настройки игры.
 * @property {Array} cellElements Массив ячеек нашей игры.
 * @property {HTMLElement} containerElement Контейнер, где будет размещаться игра.
 */
const chess = {
    settings,
    containerElement: null,
    cellElements: null,

    /**
     * Основной код приложения. Контроллер других методов.
     */
    run() {
        this.init();
        this.renderBoard();
    },

    /**
     * Инициализация приложения и подчиненных объектов.
     */
    init() {
        this.containerElement = document.getElementById('board');
        this.initBoard();
    },

    /**
     * Инициализация доски. Создание структуры HTML и двумерного массива ячеек.
     */
    initBoard() {
        this.cellElements = [];
        this.containerElement.innerHTML = '';
        for (let row = 0; row < this.settings.rowsCount + 2; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            this.cellElements [row] = [];
            for (let col = 0; col < this.settings.colsCount + 2; col++) {
                const cell = document.createElement('td');
                trElem.appendChild(cell);
                this.cellElements[row].push(cell);
            }
        }
    },

    /**
     * Разметка доски. Применение стилей.
     */
    renderBoard() {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const digits = [8, 7, 6, 5, 4, 3, 2, 1];
        // метод получилося немного длинным.
        // можно проверки и методами сделать, но они получились бы глобальными, а нужны только здесь
        // можно ли сделать встроенные методы/функции внутри этого метода? (записать функцию внутрь)
        // как бы Вы организовали данный метод?
        for (let row = 0; row < this.settings.rowsCount + 2; row++) {
            for (let col = 0; col < this.settings.colsCount + 2; col++) {
                const cell = this.cellElements[row][col];
                if ((row === 0) || (row === 9) || (col === 0) || (col === 9)) {
                    cell.classList.add(this.settings.noborderCellStyle);
                } else if ((row + col) % 2) {
                    cell.classList.add(this.settings.blackCellColorStyle);
                } else {
                    cell.classList.add(this.settings.whiteCellColorStyle);
                }
            }
        }
        for (let i = 1; i <= 8; i++) {
            this.cellElements[0][i].textContent = letters [i - 1];
            this.cellElements[9][i].textContent = letters [i - 1];
            this.cellElements[i][0].textContent = digits [i - 1];
            this.cellElements[i][9].textContent = digits [i - 1];
        }
    }
};

// Запускаем игру.
window.onload = () => chess.run();
