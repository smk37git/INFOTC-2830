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
const squares = document.querySelectorAll(".game-item");
squares.forEach(function (box, index) {
    box.addEventListener("click", function() {
        if (game[index] === 0) {
            checkTurn(box, index);
        }

    });
});

function playerXTurn (box, index) {
    game[index] = x;
    box.textContent = "X";
    currentPlayer ++;
}

function playerOTurn (box, index) {
    game[index] = o;
    box.textContent = "O";
    currentPlayer ++;
}

function checkTurn(box, index) {
    if (currentPlayer % 2 === 0) {
        playerXTurn(box, index);
    } else if (currentPlayer % 2 !== 0) {
        playerOTurn(box, index);
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