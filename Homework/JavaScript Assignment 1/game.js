/* PLAYER DATA */

/* GAME DATA */
let game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let empty = 0
let x = 1;
let o = 2;
let gameOver = false;

/* Player Data */
let playerNames = new Map();

const player1 = document.getElementById("player1-input");
player1.addEventListener("submit", function(event) {
    event.preventDefault();

    const textInput = document.getElementById("player1-input");
    console.log(textInput.value);
});

const player2 = document.getElementById("player2-input");
player2.addEventListener("submit", function(event) {
    event.preventDefault();

    const textInput = document.getElementById("player2-input");
    console.log(textInput.value);
});

currentPlayer = 0;
function makeMove() {
    currentPlayer ++;
}

function playerXTurn () {

}

function playerOTurn () {

}

function checkTurn() {
    if (currentPlayer % 2 === 0) {
        /*function playerXTurn();*/
    } else if (currentPlayer % 2 !== 0) {
        /*function playerOTurn();*/
    } else if(currentPlayer === 9) {
        gameOver = true;
    }
}

/* EVENT DATA */