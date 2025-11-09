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
    while(gameRunning != false && PlayerCharacter == null) {

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

                // === Assign Inventory Items ===

                // = Armor =
                gameData.playerInventory.push(new ChainmailArmor (
                    gameData.armor[1].name,
                    gameData.armor[1].defense,
                    gameData.armor[1].cost
                ))

                // = Sword =
                gameData.playerInventory.push(new Sword (
                    gameData.weapons[0].name, 
                    gameData.weapons[0].damage, 
                    gameData.weapons[0].cost
                ));

                updateInventory(gameData);

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

                // === CLEAR BUTTONS ===
                document.getElementById("option-one").onclick = null;
                document.getElementById("option-two").onclick = null;
                document.getElementById("option-three").onclick = null;
                document.getElementById("option-four").onclick = null;

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

                // === Assign Inventory Items ===

                // = Armor =
                gameData.playerInventory.push(new MageArmor (
                    gameData.armor[3].name,
                    gameData.armor[3].defense,
                    gameData.armor[3].cost
                ))

                // = Staff =
                gameData.playerInventory.push(new Staff (
                    gameData.weapons[5].name, 
                    gameData.weapons[5].damage, 
                    gameData.weapons[5].cost
                ));

                updateInventory(gameData);

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

                // === CLEAR BUTTONS ===
                document.getElementById("option-one").onclick = null;
                document.getElementById("option-two").onclick = null;
                document.getElementById("option-three").onclick = null;
                document.getElementById("option-four").onclick = null;

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

                // === Assign Inventory Items ===

                // = Armor =
                gameData.playerInventory.push(new ThiefArmor (
                    gameData.armor[4].name,
                    gameData.armor[4].defense,
                    gameData.armor[4].cost
                ))

                // = Dagger =
                gameData.playerInventory.push(new Dagger (
                    gameData.weapons[4].name, 
                    gameData.weapons[4].damage, 
                    gameData.weapons[4].cost
                ));

                updateInventory(gameData);

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

                // === CLEAR BUTTONS ===
                document.getElementById("option-one").onclick = null;
                document.getElementById("option-two").onclick = null;
                document.getElementById("option-three").onclick = null;
                document.getElementById("option-four").onclick = null;

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

                // === Assign Inventory Items ===

                // = Armor =
                gameData.playerInventory.push(new LeatherArmor (
                    gameData.armor[0].name,
                    gameData.armor[0].defense,
                    gameData.armor[0].cost
                ))

                // = Bow =
                gameData.playerInventory.push(new Bow (
                    gameData.weapons[3].name, 
                    gameData.weapons[3].damage, 
                    gameData.weapons[3].cost
                ));

                updateInventory(gameData);

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

                // === CLEAR BUTTONS ===
                document.getElementById("option-one").onclick = null;
                document.getElementById("option-two").onclick = null;
                document.getElementById("option-three").onclick = null;
                document.getElementById("option-four").onclick = null;

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

// ========== WEAPONS CONSTRUCTOR ==========
class BaseWeapon {
    constructor(name, damage, cost) {
        this.name = name;
        this.damage = damage;
        this.cost = cost;
    }
}

class Sword extends BaseWeapon {
    constructor(name, damage, cost){
        super(name, damage, cost);
    }
}

class Club extends BaseWeapon {
    constructor(name, damage, cost){
        super(name, damage, cost);
    }
}

class Spear extends BaseWeapon {
    constructor(name, damage, cost){
        super(name, damage, cost);
    }
}

class Bow extends BaseWeapon {
    constructor(name, damage, cost){
        super(name, damage, cost);
    }
}

class Dagger extends BaseWeapon {
    constructor(name, damage, cost){
        super(name, damage, cost);
    }
}

class Staff extends BaseWeapon {
    constructor(name, damage, cost){
        super(name, damage, cost);
    }
}

// ========== ARMORS CONSTRUCTOR ==========
class BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }
}

class LeatherArmor extends BaseArmor {
    constructor(name, defense, cost){
        super(name, defense, cost);
    }
}

class ChainmailArmor extends BaseArmor {
    constructor(name, defense, cost){
        super(name, defense, cost);
    }
}

class KnightArmor extends BaseArmor {
    constructor(name, defense, cost){
        super(name, defense, cost);
    }
}

class MageArmor extends BaseArmor {
    constructor(name, defense, cost){
        super(name, defense, cost);
    }
}

class ThiefArmor extends BaseArmor {
    constructor(name, defense, cost){
        super(name, defense, cost);
    }
}

// ========== QUEST TRIGGERING ==========
function triggerQuest (PlayerCharacter, gameData) {

    // Switch Case Statement for starting location, depending on class
    switch (PlayerCharacter.type) {
        case "Warrior":
            // ==== WARRIOR LOCATION: CASTLE RUINS ====

            // = Show Location = 
            document.getElementById("game-picture").src="RPGImages/Castle1.webp";

            // = State Location = 
            document.getElementById("game-text-title").innerHTML = gameData.locations[1].name;
            document.getElementById("game-text").innerHTML = gameData.locations[1].description;

            // = Options =
            document.getElementById("option-one").innerHTML = "Return to Village";
            document.getElementById("option-two").innerHTML = "Enter Castle Ruins";
            document.getElementById("option-three").innerHTML = "TBD";
            document.getElementById("option-four").innerHTML = "TBD";


            break;

        case "Mage":
            // ==== MAGE LOCATION: WIZARDS TOWER ====

            // = Show Location =
            document.getElementById("game-picture").src="RPGImages/Wizardtower.webp";

            // = State Location = 
            document.getElementById("game-text-title").innerHTML = gameData.locations[3].name;
            document.getElementById("game-text").innerHTML = gameData.locations[3].description;

            break;
    
        case "Thief":
            // ==== THIEF LOCATION: VILLAGE MARKET ====

            // = Show Location =
            document.getElementById("game-picture").src="RPGImages/shop2.webp";

            // = State Location =
            document.getElementById("game-text-title").innerHTML = gameData.locations[4].name;
            document.getElementById("game-text").innerHTML = gameData.locations[4].description;

            break;

        case "Archer":
            // ==== ARCHER LOCATION: FOREST ====

            // = Show Location =
            document.getElementById("game-picture").src="RPGImages/SpookyForest.webp";

            // = State Location =
            document.getElementById("game-text-title").innerHTML = gameData.locations[0].name;
            document.getElementById("game-text").innerHTML = gameData.locations[0].description;

            break;

        default:
            break;
    }
}

// ========== PLAYER INVENTORY ==========

function updateInventory (gameData) {

    const inventoryList = document.getElementById('inventory-list');

    gameData.playerInventory.forEach(item => {
        const listItem = document.createElement('p');
        listItem.textContent = `${item.name}`;
        inventoryList.appendChild(listItem);
    });
}