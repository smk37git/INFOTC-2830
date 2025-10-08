/* PLAYER DATA */

/* GAME DATA */
let game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let empty = 0
let x = 1;
let o = 2;
let gameOver = false;
let currentPlayer = 0;

/* Player Data */
let playerNames = new Map();

const player1 = document.getElementById("player1"); /* Get Player 1's Name Submit */
player1.addEventListener("submit", function(event) {
    event.preventDefault();

    const textInput = document.getElementById("player1-input"); /* Store Player 1's Name in Map */
    playerNames.set("Player 1", textInput.value);
    displayNames(textInput)
});

const player2 = document.getElementById("player2"); /* Get Player 2's Name Submit */
player2.addEventListener("submit", function(event) {
    event.preventDefault();

    const textInput = document.getElementById("player2-input"); /* Store Player 2's Name in Map */
    playerNames.set("Player 2", textInput.value);
    displayNames(textInput)
});

/* Square Data */
const square = document.querySelectorAll(".game-item");
square.addEventListener("click", function() {

    
    
});

function makeMove() {
    currentPlayer ++;
}

function playerXTurn () {
    console.log("X Move");
}

function playerOTurn () {
    console.log("O Move");
}

function checkTurn() {
    if (currentPlayer % 2 === 0) {
        playerXTurn();
    } else if (currentPlayer % 2 !== 0) {
        playerOTurn();
    } else if(currentPlayer === 9) {
        gameOver = true;
    }
}

/* EVENT DATA */

/* Messages */
function displayNames(textInput) {
    let playerNameMessage = document.getElementById("message-text"); /* Get original message text */
    playerNameMessage.innerHTML = `<p>Welcome ${textInput.value}!</p>`; /* insert welcome message */
}