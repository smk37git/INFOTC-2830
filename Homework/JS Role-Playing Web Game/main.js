// === GAME DATA ===
let gameRunning = true;
let PlayerCharacter = null;

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
    await pickCharacter(gameRunning, gameData);

    // 5 Second Delay before Triggering Quests
    setTimeout(triggerQuest, 5000, PlayerCharacter, gameData);

}

// ========== PICK CHARACTER FUNCTION ==========
function pickCharacter (gameRunning, gameData) {
    if(gameRunning != false && PlayerCharacter == null) {

        let gameText = document.getElementById("game-text");
        gameText.innerHTML = "Start by Selecting a Character!";

        return (new Promise((resolve) => {
            // == Warrior ==
            let optionOne = document.getElementById("option-one");
            optionOne.innerHTML = gameData.playerClasses[0].type;

            document.getElementById("option-one").onclick = () => {

            document.getElementById("game-text-title").innerHTML = "CHARACTER SELECTED";
            gameText.innerHTML = "You selected " + gameData.playerClasses[0].type;

                // === Create new Warrior Character ===
                PlayerCharacter = new Warrior(
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

                // === RETURN PLAYER CHARACTER ===
                resolve(PlayerCharacter)
            }

            // == Mage ==
            let optionTwo = document.getElementById("option-two");
            optionTwo.innerHTML = gameData.playerClasses[1].type;
            document.getElementById("option-two").onclick = () => {

                document.getElementById("game-text-title").innerHTML = "CHARACTER SELECTED";
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

                // === RETURN PLAYER CHARACTER ===
                resolve(PlayerCharacter)
            }

            // == Thief ==
            let optionThree = document.getElementById("option-three");
            optionThree.innerHTML = gameData.playerClasses[2].type;
            document.getElementById("option-three").onclick = () => {

                document.getElementById("game-text-title").innerHTML = "CHARACTER SELECTED";
                gameText.innerHTML = "You selected " + gameData.playerClasses[2].type;

                // === Create new Thief Character ===
                PlayerCharacter = new Thief(
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

                // === RETURN PLAYER CHARACTER ===
                resolve(PlayerCharacter)
            }

            // == Archer ==
            let optionFour = document.getElementById("option-four");
            optionFour.innerHTML = gameData.playerClasses[3].type;
            document.getElementById("option-four").onclick = () => {

                document.getElementById("game-text-title").innerHTML = "CHARACTER SELECTED";
                gameText.innerHTML = "You selected " + gameData.playerClasses[3].type;
                
                // === Create new Archer Character ===
                PlayerCharacter = new Archer(
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

                // === RETURN PLAYER CHARACTER ===
                resolve(PlayerCharacter)
            }
        }))
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
function triggerQuest (PlayerCharacter, gameData) {

    // Switch Case Statement for starting location, depending on class
    switch (PlayerCharacter.type) {
        case "Warrior":
            // ==== WARRIOR LOCATION: CASTLE RUINS ====

            // Show Location
            document.getElementById("game-picture").src="RPGImages/Castle1.webp";

            // State Location
            document.getElementById("game-text-title").innerHTML = gameData.locations[1].name;
            document.getElementById("game-text").innerHTML = gameData.locations[1].description;

            break;

        case "Mage":
            // ==== MAGE LOCATION: WIZARDS TOWER ====

            // Show Location
            document.getElementById("game-picture").src="RPGImages/Wizardtower.webp";

            // State Location
            document.getElementById("game-text-title").innerHTML = gameData.locations[3].name;
            document.getElementById("game-text").innerHTML = gameData.locations[3].description;

            break;
    
        case "Thief":
            // ==== THIEF LOCATION: VILLAGE MARKET ====

            // Show Location
            document.getElementById("game-picture").src="RPGImages/shop2.webp";

            // State Location
            document.getElementById("game-text-title").innerHTML = gameData.locations[4].name;
            document.getElementById("game-text").innerHTML = gameData.locations[4].description;

            break;

        case "Archer":
            // ==== ARCHER LOCATION: FOREST ====

            // Show Location
            document.getElementById("game-picture").src="RPGImages/SpookyForest.webp";

            // State Location
            document.getElementById("game-text-title").innerHTML = gameData.locations[0].name;
            document.getElementById("game-text").innerHTML = gameData.locations[0].description;

            break;

        default:
            break;
    }
}