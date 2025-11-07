// GAME DATA
let gameRunning = true;
let characterClass = 0;
let selectedClass = 0;

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
    
    //let gameText = document.getElementsByClassName("game-text")[0];
    //gameText.innerHTML = gameData.locations[0].name;

    //document.getElementById("option-four").onclick = () => {
    //    gameText.innerHTML = gameData.locations[2].name;
    //}

}

// ========== PICK CHARACTER FUNCTION ==========
function pickCharacter (gameRunning, characterClass, gameData) {
        if(gameRunning != false && characterClass == 0) {

            let gameText = document.getElementsByClassName("game-text")[0];
            gameText.innerHTML = "Begin Game by Selecting Character Type";

            // Warrior
            let optionOne = document.getElementById("option-one");
            optionOne.innerHTML = "Warrior";
            document.getElementById("option-one").onclick = () => {
                gameText.innerHTML = "You selected Warrior!";
                return selectedClass = 1
            }

            // Mage
            let optionTwo = document.getElementById("option-two");
            optionTwo.innerHTML = "Mage";
            document.getElementById("option-two").onclick = () => {
                gameText.innerHTML = "You selected Mage!";
                return selectedClass = 2
            }

            // Thief
            let optionThree = document.getElementById("option-three");
            optionThree.innerHTML = "Thief";
            document.getElementById("option-three").onclick = () => {
                gameText.innerHTML = "You selected Thief!";
                return selectedClass = 3
            }

            // Archer
            let optionFour = document.getElementById("option-four");
            optionFour.innerHTML = "Archer";
            document.getElementById("option-four").onclick = () => {
                gameText.innerHTML = "You selected Archer!";
                return selectedClass = 4
            }
        }
    }
