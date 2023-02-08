"use strict";


let ticTakToe = {

    gameTableElement: document.getElementById('game'),
    status: 'playing',
    mapVelues: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],

    phase: 'X',

    init() {
        this.renderMap();
        this.initEventHAndlers();
    },

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

    initEventHAndlers() {
        this.gameTableElement.addEventListener('click', event => this.callClickHandler(event));
    },


    callClickHandler(event) {
        if (!this.inCorrectClick(event)) {
            return;
        }

        this.fillCell(event);

        if (this.hasWon()) {
            this.setStatusStop();
            this.sayWonPhrase();
        }

        this.toggelePhase();
    },

    inCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    isStatusPlaying() {
        return this.status === "playing";
    },

    isClickByCell(event) {
        return event.target.tagName === "TD";
    },

    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapVelues[row][col] === "";
    },

    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        this.mapVelues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

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

    isLineWon(a, b, c) {
        let value = this.mapVelues[a.y][a.x] + this.mapVelues[b.y][b.x] + this.mapVelues[c.y][c.x];

        return value === "XXX" || value === 'OOO';
    },

    setStatusStop() {
        this.status = "stopped";
    },


    sayWonPhrase() {
        let figure = this.phase === "X" ? "Крестик" : "Нолик";

        alert(`${figure} выиграли!`);
    },

    toggelePhase() {
        this.phase = this.phase === "X" ? "0" : "X";
    },

};

window.addEventListener('load', ticTakToe.init());