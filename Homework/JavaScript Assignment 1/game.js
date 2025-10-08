/* PLAYER DATA */

/* GAME DATA */
let game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let x;
let o;
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
        if (playerNames.size === 2) {
            if (game[index] === 0) {
                checkTurn(box, index);
                gameCheck(index);
            }
        }else{
            missingNames();
            return;
        }
    });
});

/* EVENT DATA */
function playerXTurn (box, index) {
    game[index] = x;
    box.textContent = "X";
    box.style.fontSize = "70px";
    box.style.color = "rgba(255, 73, 73, 0.863)";
    box.style.textShadow = "0px 0px 30px rgba(255, 73, 73, 0.505)";
    currentPlayer ++;
}

function playerOTurn (box, index) {
    game[index] = o;
    box.textContent = "O";
    box.style.fontSize = "70px";
    box.style.color = "rgba(73, 131, 255, 0.863)";
    box.style.textShadow = "0px 0px 30px rgba(73, 131, 255, 0.505)";
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

function gameCheck(index) {
    const filledGame = game.every(function(square) {
        return square != 0;
    });

    if (filledGame) {
        tiedGame();
    }
}


/* Messages */
let messageTracker = 0;
function displayNames(textInput) {
    let playerNameMessage = document.getElementById("message-text"); /* Get original message text */
    playerNameMessage.innerHTML = `<p>Welcome ${textInput.value}!</p>`; /* insert welcome message */
    messageTracker ++;
    
    if (messageTracker == 2) {
        startGame();
    }
}

function missingNames() {
    let noNameMessage = document.getElementById("message-text");
    noNameMessage.innerHTML = `<p>Please Enter Both Names Before Playing!</p>`;
}

function startGame() {
    let beginMessage = document.getElementById("message-text");
    setTimeout(function() {
        beginMessage.innerHTML = `<p>The Game Has Begun!</p>`;}, 3000); /* Start Game Message */
}

function tiedGame() {
    let tiedMessage = document.getElementById("message-text");
    tiedMessage.innerHTML = `<p>Tied Game! No One Wins!</p>`;
}