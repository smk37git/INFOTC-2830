// === GAME DATA ===
let gameRunning = true;
let characterClass = 0;

// === CHARACTER DATA ===
let selectedClass = 0;
let health = 1;
let attackPower = 1;
let defense = 1;

window.onload = async () => {
    gameData = await fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data);
        return data
    })
    .catch(error => {
        console.error('Failed to fetch data:', error);
    });

    pickCharacter(gameRunning, characterClass, gameData);

}

// ========== PICK CHARACTER FUNCTION ==========
function pickCharacter (gameRunning, characterClass, gameData) {
        if(gameRunning != false && characterClass == 0) {

            let gameText = document.getElementsByClassName("game-text")[0];
            gameText.innerHTML = "Begin Game by Selecting Character Type";

            // Warrior
            let optionOne = document.getElementById("option-one");
            optionOne.innerHTML = gameData.playerClasses[0].class;
            document.getElementById("option-one").onclick = () => {
                gameText.innerHTML = "You selected " + gameData.playerClasses[0].class;

                // Assign character valuess
                health = gameData.playerClasses[0].health;
                attackPower = gameData.playerClasses[0].attackPower;
                defense = gameData.playerClasses[0].defense;
                level = gameData.playerClasses[0].level;
            }

            // Mage
            let optionTwo = document.getElementById("option-two");
            optionTwo.innerHTML = gameData.playerClasses[1].class;
            document.getElementById("option-two").onclick = () => {
                gameText.innerHTML = "You selected " + gameData.playerClasses[1].class;
                
                health = gameData.playerClasses[1].health;
                attackPower = gameData.playerClasses[1].attackPower;
                defense = gameData.playerClasses[1].defense;
                level = gameData.playerClasses[1].level;
            }

            // Thief
            let optionThree = document.getElementById("option-three");
            optionThree.innerHTML = gameData.playerClasses[2].class;
            document.getElementById("option-three").onclick = () => {
                gameText.innerHTML = "You selected " + gameData.playerClasses[2].class;

                health = gameData.playerClasses[2].health;
                attackPower = gameData.playerClasses[2].attackPower;
                defense = gameData.playerClasses[2].defense;
                level = gameData.playerClasses[2].level;
            }

            // Archer
            let optionFour = document.getElementById("option-four");
            optionFour.innerHTML = gameData.playerClasses[3].class;
            document.getElementById("option-four").onclick = () => {
                gameText.innerHTML = "You selected " + gameData.playerClasses[3].class;
                
                health = gameData.playerClasses[3].health;
                attackPower = gameData.playerClasses[3].attackPower;
                defense = gameData.playerClasses[3].defense;
                level = gameData.playerClasses[3].level;
            }
        }
    }
