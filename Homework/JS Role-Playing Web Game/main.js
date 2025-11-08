// === GAME DATA ===
let gameRunning = true;
let characterClass = 0;

// === CHARACTER DATA ===
let health = 1;
let attackPower = 1;
let defense = 1;
let level = 1;

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

    // Start game by picking character
    pickCharacter(gameRunning, characterClass, gameData);

    // 5 Second Timer Before Quest Starts
    setTimeout(() => {
    }, 5000);

}

// ========== PICK CHARACTER FUNCTION ==========
function pickCharacter (gameRunning, characterClass, gameData) {
    if(gameRunning != false && characterClass == 0) {

        let PlayerCharacter = null;

        let gameText = document.getElementsByClassName("game-text")[0];
        gameText.innerHTML = "Begin Game by Selecting Character Type";

        // == Warrior ==
        let optionOne = document.getElementById("option-one");
        optionOne.innerHTML = gameData.playerClasses[0].type;
        document.getElementById("option-one").onclick = () => {
            gameText.innerHTML = "You selected " + gameData.playerClasses[0].type;

            // === Create new Warrior Character ===
            PlayerCharacter = new Mage(
                gameData.playerClasses[0].type,
                gameData.playerClasses[0].health,
                gameData.playerClasses[0].attackPower,
                gameData.playerClasses[0].defense,
                gameData.playerClasses[0].level
            );

            // === Change Picture ===
            document.getElementById("game-picture").src="RPGImages/Warrior.webp";

            // === Assign values to stats in HTML ===

            // = Class =
            let classText = document.getElementById("class-text");
            classText.innerHTML = "Class: " + PlayerCharacter.type;

            // = Attack Power =
            let attackpowerText = document.getElementById("attackpower-text");
            attackpowerText.innerHTML = "Attack Power: " + PlayerCharacter.attackPower;

            // = Defense =
            let defenseText = document.getElementById("defense-text");
            defenseText.innerHTML = "Defense: " + PlayerCharacter.defense;

            // = Level =
            let levelText = document.getElementById("level-text");
            levelText.innerHTML = "Level: " + PlayerCharacter.level;

            // = Health =
            let healthbarText = document.getElementById("health-bar-text");
            healthbarText.innerHTML = "Health: " + PlayerCharacter.health;
        }

        // == Mage ==
        let optionTwo = document.getElementById("option-two");
        optionTwo.innerHTML = gameData.playerClasses[1].type;
        document.getElementById("option-two").onclick = () => {
            gameText.innerHTML = "You selected " + gameData.playerClasses[1].type;

            // === Create new Mage Character ===
            PlayerCharacter = new Mage(
                gameData.playerClasses[1].type,
                gameData.playerClasses[1].health,
                gameData.playerClasses[1].attackPower,
                gameData.playerClasses[1].defense,
                gameData.playerClasses[1].level
            );

            // === Change Picture ===
            document.getElementById("game-picture").src="RPGImages/Mage.webp";

            // === Assign values to stats in HTML ===

            // = Class =
            let classText = document.getElementById("class-text");
            classText.innerHTML = "Class: " + PlayerCharacter.type;

            // = Attack Power =
            let attackpowerText = document.getElementById("attackpower-text");
            attackpowerText.innerHTML = "Attack Power: " + PlayerCharacter.attackPower;

            // = Defense =
            let defenseText = document.getElementById("defense-text");
            defenseText.innerHTML = "Defense: " + PlayerCharacter.defense;

            // = Level =
            let levelText = document.getElementById("level-text");
            levelText.innerHTML = "Level: " + PlayerCharacter.level;

            // = Health =
            let healthbarText = document.getElementById("health-bar-text");
            healthbarText.innerHTML = "Health: " + PlayerCharacter.health;
        }

        // == Thief ==
        let optionThree = document.getElementById("option-three");
        optionThree.innerHTML = gameData.playerClasses[2].type;
        document.getElementById("option-three").onclick = () => {
            gameText.innerHTML = "You selected " + gameData.playerClasses[2].type;

            // === Create new Thief Character ===
            PlayerCharacter = new Mage(
                gameData.playerClasses[2].type,
                gameData.playerClasses[2].health,
                gameData.playerClasses[2].attackPower,
                gameData.playerClasses[2].defense,
                gameData.playerClasses[2].level
            );

            // === Change Picture ===
            document.getElementById("game-picture").src="RPGImages/Thief.webp";

            // === Assign values to stats in HTML ===

            // = Class =
            let classText = document.getElementById("class-text");
            classText.innerHTML = "Class: " + PlayerCharacter.type;

            // = Attack Power =
            let attackpowerText = document.getElementById("attackpower-text");
            attackpowerText.innerHTML = "Attack Power: " + PlayerCharacter.attackPower;

            // = Defense =
            let defenseText = document.getElementById("defense-text");
            defenseText.innerHTML = "Defense: " + PlayerCharacter.defense;

            // = Level =
            let levelText = document.getElementById("level-text");
            levelText.innerHTML = "Level: " + PlayerCharacter.level;

            // = Health =
            let healthbarText = document.getElementById("health-bar-text");
            healthbarText.innerHTML = "Health: " + PlayerCharacter.health;
        }

        // == Archer ==
        let optionFour = document.getElementById("option-four");
        optionFour.innerHTML = gameData.playerClasses[3].type;
        document.getElementById("option-four").onclick = () => {
            gameText.innerHTML = "You selected " + gameData.playerClasses[3].type;
            
            // === Create new Archer Character ===
            PlayerCharacter = new Mage(
                gameData.playerClasses[3].type,
                gameData.playerClasses[3].health,
                gameData.playerClasses[3].attackPower,
                gameData.playerClasses[3].defense,
                gameData.playerClasses[3].level
            );

            // === Change Picture ===
            document.getElementById("game-picture").src="RPGImages/Archer.webp";

            // === Assign values to stats in HTML ===

            // = Class =
            let classText = document.getElementById("class-text");
            classText.innerHTML = "Class: " + PlayerCharacter.type;

            // = Attack Power =
            let attackpowerText = document.getElementById("attackpower-text");
            attackpowerText.innerHTML = "Attack Power: " + PlayerCharacter.attackPower;

            // = Defense =
            let defenseText = document.getElementById("defense-text");
            defenseText.innerHTML = "Defense: " + PlayerCharacter.defense;

            // = Level =
            let levelText = document.getElementById("level-text");
            levelText.innerHTML = "Level: " + PlayerCharacter.level;

            // = Health =
            let healthbarText = document.getElementById("health-bar-text");
            healthbarText.innerHTML = "Health: " + PlayerCharacter.health;
        }
    }
}

// ========== CHARACTER CONSTRUCTOR ==========
class BaseCharacter {
    constructor(type, health, attackPower, defense, level) {
        this.type = type;
        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
        this.level = level;
    }
}

class Warrior extends BaseCharacter {
    constructor(type, health, attackPower, defense, level){
        super(type, health, attackPower, defense, level);
    }
}

class Mage extends BaseCharacter {
    constructor(type, health, attackPower, defense, level){
        super(type, health, attackPower, defense, level);
    }
}

class Thief extends BaseCharacter {
    constructor(type, health, attackPower, defense, level){
        super(type, health, attackPower, defense, level);
    }
}

class Archer extends BaseCharacter {
    constructor(type, health, attackPower, defense, level){
        super(type, health, attackPower, defense, level);
    }
}

// ========== QUEST TRIGGERING ==========
function triggerQuest (PlayerCharacter) {
}