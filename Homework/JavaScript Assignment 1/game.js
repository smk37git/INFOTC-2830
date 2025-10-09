/* PLAYER DATA */

/* GAME DATA */
let game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let x = 'x';
let o = 'o';
let gameOver = false;
let currentPlayer = 0;

/* Player Data */
let playerNames = new Map();

const player1 = document.getElementById("player1"); /* Get Player 1's Name Submit */
player1.addEventListener("submit", function(event) {
    event.preventDefault();

    const textInput = document.getElementById("player1-input"); /* Store Player 1's Name in Map */
    playerNames.set("Player 1", textInput.value);

    if (textInput.value.length > 0) {
        displayNames(textInput)
        let playerUsername = document.getElementById("player-one"); /* Get the username text */
        playerUsername.classList.add("fade-in");
        playerUsername.style.animationDuration = "1s";
        playerUsername.textContent = `${textInput.value}` /* Replace username */

        player1.style.opacity = 0; /* hide form */
    } else {
        errorNames(textInput);
    }
});

const player2 = document.getElementById("player2"); /* Get Player 2's Name Submit */
player2.addEventListener("submit", function(event) {
    event.preventDefault();

    const textInput = document.getElementById("player2-input"); /* Store Player 2's Name in Map */
    playerNames.set("Player 2", textInput.value);

    if (textInput.value.length > 0) {
        displayNames(textInput);
        let playerUsername = document.getElementById("player-two"); /* Get the username text */
        playerUsername.classList.add("fade-in");
        playerUsername.style.animationDuration = "1s";
        playerUsername.textContent = `${textInput.value}` /* Replace username */

        player2.style.opacity = 0; /* hide form */
    } else {
        errorNames(textInput);
    }
});

/* Square Data */
function playGame() {
    const squares = document.querySelectorAll(".game-item");
    squares.forEach(function (box, index) {
        box.addEventListener("click", function() {
            if (playerNames.size === 2 && gameOver != true) {
                if (game[index] === 0) {
                    checkTurn(box, index);
                    gameCheck(index);
                }
            } else if (playerNames !== 2 && gameOver != true) {
                missingNames();
                return;
            } 
        });
    });
}

/* EVENT DATA */
function playerXTurn (box, index) {
    game[index] = x;
    const span = document.createElement('span');
    span.textContent = "X";
    span.className = "fade-in";
    span.style.fontSize = "70px";
    span.style.color = "rgba(255, 73, 73, 0.863)";
    span.style.textShadow = "0px 0px 30px rgba(255, 73, 73, 0.505)";
    box.appendChild(span);
    currentPlayer ++;
}

function playerOTurn (box, index) {
    game[index] = o;
    const span = document.createElement('span');
    span.textContent = "O";
    span.className = "fade-in";
    span.style.fontSize = "70px";
    span.style.color = "rgba(73, 131, 255, 0.863)";
    span.style.textShadow = "0px 0px 30px rgba(73, 131, 255, 0.505)";
    box.appendChild(span);
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

    const squares = document.querySelectorAll(".game-item");

    let possibleCombinations = [
        /* Row Wins */
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        /* Column Wins */
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        /* Diagonal Wins */
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of possibleCombinations) {
        if(game[combination[0]] !== 0 &&
            game[combination[0]] == game[combination[1]] &&
            game[combination[1]] == game[combination[2]] && gameOver != true) {

                squares[combination[0]].style.background = "rgba(225, 225, 225, 1)";
                squares[combination[1]].style.background = "rgba(225, 225, 225, 1)";
                squares[combination[2]].style.background = "rgba(225, 225, 225, 1)";
            
                gameOver = true;

                if (game[combination[0]] === 'x') {
                    XwinnerMessage(playerNames.get("Player 1"));
                }else{
                    OwinnerMessage(playerNames.get("Player 2"));
                }
            }
    }

    if (filledGame && gameOver != true) {
        gameOver = true;
        tiedGame();
    }
}

/* Reset Game */
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', function() {
    const squares = document.querySelectorAll(".game-item");
    squares.forEach(function (box, index) {
        if (game[index] !== 0) { /* Reset each index to 0 */
            game[index] = 0;
            box.innerHTML = "";
        }
        box.style.background = "rgb(40, 40, 40)";
    });
    gameOver = false; /* Reset game variables */
    currentPlayer = 0;
    startGame();
});

/* Messages */
let messageTracker = 0;
function displayNames(textInput) {
    let playerNameMessage = document.getElementById("message-text"); /* Get original message text */
    playerNameMessage.classList.add("fade-in");
    playerNameMessage.innerHTML = `<p>Welcome ${textInput.value}!</p>`; /* insert welcome message */
    messageTracker ++;
    
    if (messageTracker == 2) {
        startGame();
    }
}

function errorNames(textInput) {
    let nameErrorMessage = document.getElementById("message-text");
    nameErrorMessage.classList.add("fade-in");
    nameErrorMessage.innerHTML = `<p>Error With Name, Please Try Again.</p>`
}

function missingNames() {
    let noNameMessage = document.getElementById("message-text");
    noNameMessage.classList.add("fade-in");
    noNameMessage.innerHTML = `<p>Please Enter Both Names Before Playing!</p>`;
}

function startGame() {
    let beginMessage = document.getElementById("message-text");
    setTimeout(function() {
        beginMessage.classList.add("fade-in");
        beginMessage.innerHTML = `<p>The Game Has Begun!</p>`;
        playGame();
    }, 3000); /* Start Game Message */

    /* Change Background */
    const winnerBackground = document.getElementById("background");
    winnerBackground.style.backgroundImage = "";
}

function tiedGame() {
    let tiedMessage = document.getElementById("message-text");
    tiedMessage.classList.add("fade-in");
    tiedMessage.innerHTML = `<p>Tied Game! No One Wins!</p>`;

    /* Change Background */
    const winnerBackground = document.getElementById("background");
    winnerBackground.style.backgroundImage = "radial-gradient(circle at center, rgba(137, 73, 255, 0.86), #0a0a0a)";
}

function XwinnerMessage(playerName) {
    let winnerMessage = document.getElementById("message-text");
    winnerMessage.classList.add("fade-in");
    winnerMessage.innerHTML = `<p>${playerName} WON THE GAME!</p>`;

    /* Change Background */
    const winnerBackground = document.getElementById("background");
    winnerBackground.style.backgroundImage = "radial-gradient(circle at center, rgba(255, 73, 73, 0.863), #0a0a0a)";
}

function OwinnerMessage(playerName) {
    let winnerMessage = document.getElementById("message-text");
    winnerMessage.classList.add("fade-in");
    winnerMessage.innerHTML = `<p>${playerName} WON THE GAME!</p>`;

    /* Change Background */
    const winnerBackground = document.getElementById("background");
    winnerBackground.style.backgroundImage = "radial-gradient(circle at center, rgba(73, 131, 255, 0.863), #0a0a0a)";
}