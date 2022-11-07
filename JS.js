'use strict';

let ticTakToe = {
    gameTableElement: document.getElementById('game'),
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    phase: 'X',

    /**
     * инициализация игры
     */
    init() {
        // выводм все ячейки
        this.renderMap();
        // инициализируем обработчик событий
        this.initEventHandlers();
    },
    /**
     * вывод ячеек в HTML
     */

    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    /** 
     * инициализация обработчиков событий
     */
    initEventHandlers() {
        // ставим обработчик при клике на табл. вызываетс функция this.cellClickHandler
        this.gameTableElement.addEventListener
            ('click', event => this.cellClickHandler(event));
    },

    cellClickHandler(event) {
        // Если клин не нужно обрабатывать, уходим из функции.
        if (!this.isCorrectClick(event)) {
            return;
        }

        //заполняем ячейку
        this.fillCell(event);
        //если кто-то выиграл, заходим в if.
        if (this.hasWon()) {
            // ставим статус "остановлено"
            this.setStatusStoped();
            // Cообщаем о победе пользователя.
            this.sayWonPhrase();
        }
        // меняем фигуру (ерстик нолик)
        this.togglePhase();
    },
    /**
     * проверка на корректность клика 
     * @param {event} event 
     * @returns {boolean} вернет true в случае если статус игры "играем", клик что описан в объекте event был по ячейки и ячейка куда был произведен клик была пустой
     */
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCsell(event) && this.isCellEmpty(event);
    },

    /**
     * проверка что мы "играем", что игра не закончена
     * @returns {boolean} вернет true если статус игры "играем", иначе вернет false.
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },

    /**
     * проверка что клик был по ячейке.
     * @param {event} event 

     * @returns {boolean} вернет true если клик быд по ячейке,иначе вернет false.
     */
    isClickByCsell(event) {
        return event.target.tagName === 'TD';
    },
    
    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    },

    /**
     * заполняет ячейку в которую кликнул пользователь
     * @param {event} event 
     * @param {HTMLElement} event.target
     */
    fillCell(event) {
        // получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;   
        
        // заполянем ячейку и ставим значение в массиве, в свойство mapvalues. 
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    /**
     * проверка есть ли выигрышная ситуация на карте
     * @returns {boolean} вернет true если игра выиграна,иначе вернет false
     */
    hasWon() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
            this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||
        
            this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
            this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
            this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||
        
            this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    },

    /**
     * проверка есть ли выигрышная линия
     * @param {{x: int, y: int}} a 1-ая ячейка
     * @param {{x: int, y: int}} b 2-ая ячейка
     * @param {{x: int, y: int}} c 3-ая ячейка
     * @returns {boolean} вернет true если линия выиграна,иначе вернет false
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    },
    /**
     * ставит статус игры остановлена
     */
    setStatusStoped() {
        this.status = 'stoped';
    },
    /**
     * сообщает о победе
     */
    sayWonPhrase() {
        let figure = this.phase === 'X' ? 'Крестики ' : 'Нолики';
        alert(`${figure} выиграли!`);
    },

    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    },
};

ticTakToe.init();
