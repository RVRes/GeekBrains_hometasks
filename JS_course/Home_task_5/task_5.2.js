"use strict";

/*Урок 5, задание 2:

 Урок 5, задание 2:

 Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки, либо можно
 использовать символы (существуют символы шахматных фигур) причем все фигуры должны стоять
 на своих местах и быть соответственно черными и белыми.

 */

/*
В шпаргалке предложено использовать сокращенную шахматную нотацию для позиционирования фигур.
С объектом фигуры - так и поступим. А вот, глянул, как пишется логика, она пришется в основном под
ХУ-координаты. Пока не буду менять объект доски - сделаю метод конвертирования нотации в координаты.
Финальное решение по объектам буду принимать, когда будем писать логику (если будем).
 */

/**
 * Массив с объектами фигур - определяет их начальное расположение.
 * @type {*[]}
 */
const figuresDefaultPosition = [
    //white
    {
        name: 'Pawn',
        side: 'white',
        place: 'a2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'b2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'c2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'd2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'e2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'f2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'g2',
    },
    {
        name: 'Pawn',
        side: 'white',
        place: 'h2',
    },
    {
        name: 'Rock',
        side: 'white',
        place: 'a1',
    },
    {
        name: 'Rock',
        side: 'white',
        place: 'h1',
    },
    {
        name: 'Knight',
        side: 'white',
        place: 'b1',
    },
    {
        name: 'Knight',
        side: 'white',
        place: 'g1',
    },
    {
        name: 'Bishop',
        side: 'white',
        place: 'c1',
    },
    {
        name: 'Bishop',
        side: 'white',
        place: 'f1',
    },
    {
        name: 'Queen',
        side: 'white',
        place: 'd1',
    },
    {
        name: 'King',
        side: 'white',
        place: 'e1',
    },
    //black
    {
        name: 'Pawn',
        side: 'black',
        place: 'a7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'b7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'c7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'd7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'e7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'f7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'g7',
    },
    {
        name: 'Pawn',
        side: 'black',
        place: 'h7',
    },

    {
        name: 'Rock',
        side: 'black',
        place: 'a8',
    },
    {
        name: 'Rock',
        side: 'black',
        place: 'h8',
    },
    {
        name: 'Knight',
        side: 'black',
        place: 'b8',
    },
    {
        name: 'Knight',
        side: 'black',
        place: 'g8',
    },
    {
        name: 'Bishop',
        side: 'black',
        place: 'c8',
    },
    {
        name: 'Bishop',
        side: 'black',
        place: 'f8',
    },
    {
        name: 'Queen',
        side: 'black',
        place: 'd8',
    },
    {
        name: 'King',
        side: 'black',
        place: 'e8',
    },
];

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
    figuresDefaultPosition,
    containerElement: null,
    cellElements: null,
    figures: null,

    /**
     * Основной код приложения. Контроллер других методов.
     */
    run() {
        this.init();
        this.renderBoard();
        this.renderAllFigures();
    },

    /**
     * Инициализация приложения и подчиненных объектов.
     */
    init() {
        this.containerElement = document.getElementById('board');
        this.initBoard();
        this.figures = this.figuresDefaultPosition;
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
     * Расставляем фигуры на доске
     */
    renderAllFigures() {
        this.figures.forEach(this.renderFigure);
    },

    /**
     * Расставляем фигуры на доске
     */
    renderFigure(figure) {
        //Когда я прихожу сюда из цикла foreach - this для меня - текущий объект, а не приложение
        // и метод не работает. Заменил на chess, подскажите, так верно или лучше отказаться от foreach?
        let coords = chess.convertChessToXYnotation(figure.place);
        chess.cellElements[coords.col][coords.row].innerHTML = chess.getFigureSymbol(figure);
    },

    /**
     * Возвращает спецсимвол по имени и цвету шахматной фигуры
     * @param {object} figure - объект из массива шахматных фигур
     * @returns {string} строка спецсимвола HTML с кодом фигуры
     */
    getFigureSymbol(figure) {
        switch (figure.name + figure.side) {
            case 'Pawnwhite':
                return '&#9817;';
            case 'Pawnblack':
                return '&#9823;';
            case 'Rockwhite':
                return '&#9814;';
            case 'Rockblack':
                return '&#9820;';
            case 'Knightwhite':
                return '&#9816;';
            case 'Knightblack':
                return '&#9822;';
            case 'Bishopwhite':
                return '&#9815;';
            case 'Bishopblack':
                return '&#9821;';
            case 'Queenwhite':
                return '&#9813;';
            case 'Queenblack':
                return '&#9819;';
            case 'Kingwhite':
                return '&#9812;';
            case 'Kingblack':
                return '&#9818;';
        }
    },

    /**
     * Переводим шахматную нотацию в координаты на доске
     * @param {string} chessNotation стандартная шахматная нотация
     * @returns {{row: number, col: number}} возвращает строку и столбец, куда нужно поставить фигуру.
     */
    convertChessToXYnotation(chessNotation) {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const digits = [8, 7, 6, 5, 4, 3, 2, 1];
        let x = letters.indexOf(chessNotation[0].toUpperCase()) + 1;
        let y = digits.indexOf(+chessNotation[1]) + 1;
        return {row: x, col: y,}
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
