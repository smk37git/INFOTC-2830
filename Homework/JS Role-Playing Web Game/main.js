// === GAME DATA ===
let gameRunning = true;
let PlayerCharacter = null;
let playerGold = 0;

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
                    gameData.armor[1].value
                ))

                updateDefense(PlayerCharacter);

                // = Sword =
                gameData.playerInventory.push(new Sword (
                    gameData.weapons[0].name, 
                    gameData.weapons[0].damage, 
                    gameData.weapons[0].value
                ));

                // Add some chump change
                playerGold += 100;
                document.getElementById("gold-count").innerHTML = "Gold: " + playerGold;

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
                    gameData.armor[3].value
                ))

                updateDefense(PlayerCharacter);

                // = Staff =
                gameData.playerInventory.push(new Staff (
                    gameData.weapons[5].name, 
                    gameData.weapons[5].damage, 
                    gameData.weapons[5].value
                ));

                // Add some chump change
                playerGold += 75;
                document.getElementById("gold-count").innerHTML = "Gold: " + playerGold;

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
                    gameData.armor[4].value
                ))

                updateDefense(PlayerCharacter);

                // = Dagger =
                gameData.playerInventory.push(new Dagger (
                    gameData.weapons[4].name, 
                    gameData.weapons[4].damage, 
                    gameData.weapons[4].value
                ));

                // Add some chump change
                playerGold += 25;
                document.getElementById("gold-count").innerHTML = "Gold: " + playerGold;

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
                    gameData.armor[0].value
                ))

                updateDefense(PlayerCharacter);

                // = Bow =
                gameData.playerInventory.push(new Bow (
                    gameData.weapons[3].name, 
                    gameData.weapons[3].damage, 
                    gameData.weapons[3].value
                ));

                // Add some chump change
                playerGold += 50;
                document.getElementById("gold-count").innerHTML = "Gold: " + playerGold;

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
    constructor(name, damage, value) {
        this.name = name;
        this.damage = damage;
        this.value = value;
    }
}

class Sword extends BaseWeapon {
    constructor(name, damage, value){
        super(name, damage, value);
    }
}

class Club extends BaseWeapon {
    constructor(name, damage, value){
        super(name, damage, value);
    }
}

class Spear extends BaseWeapon {
    constructor(name, damage, value){
        super(name, damage, value);
    }
}

class Bow extends BaseWeapon {
    constructor(name, damage, value){
        super(name, damage, value);
    }
}

class Dagger extends BaseWeapon {
    constructor(name, damage, value){
        super(name, damage, value);
    }
}

class Staff extends BaseWeapon {
    constructor(name, damage, value){
        super(name, damage, value);
    }
}

// ========== ARMORS CONSTRUCTOR ==========
class BaseArmor {
    constructor(name, defense, value) {
        this.name = name;
        this.defense = defense;
        this.value = value;
    }
}

class LeatherArmor extends BaseArmor {
    constructor(name, defense, value){
        super(name, defense, value);
    }
}

class ChainmailArmor extends BaseArmor {
    constructor(name, defense, value){
        super(name, defense, value);
    }
}

class KnightArmor extends BaseArmor {
    constructor(name, defense, value){
        super(name, defense, value);
    }
}

class MageArmor extends BaseArmor {
    constructor(name, defense, value){
        super(name, defense, value);
    }
}

class ThiefArmor extends BaseArmor {
    constructor(name, defense, value){
        super(name, defense, value);
    }
}

// ========== RANDOM ITEMS CONSTRUCTOR ==========
class BaseItem {
    constructor(name, description, value) {
        this.name = name;
        this.description = description;
        this.value = value;
    }
}

class Meat extends BaseItem {
    constructor(name, description, value){
        super(name, description, value);
    }
}

class Treasure extends BaseItem {
    constructor(name, description, value) {
        super(name, description, value);
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
            document.getElementById("option-one").innerHTML = "Return to the Village";
            document.getElementById("option-two").innerHTML = "Enter Castle Ruins";
            document.getElementById("option-three").innerHTML = "";
            document.getElementById("option-four").innerHTML = "";

            // = Trigger Option 1 =
            document.getElementById("option-one").onclick = () => {
                // changeLocation();
            }
            
            // = Trigger Option 2 =
            document.getElementById("option-two").onclick = () => {
                // initiateFight();
            }

            break;

        case "Mage":
            // ==== MAGE LOCATION: WIZARDS TOWER ====

            // = Show Location =
            document.getElementById("game-picture").src="RPGImages/Wizardtower.webp";

            // = State Location = 
            document.getElementById("game-text-title").innerHTML = gameData.locations[3].name;
            document.getElementById("game-text").innerHTML = gameData.locations[3].description;

            // = Options =
            document.getElementById("option-one").innerHTML = "Return to the Village";
            document.getElementById("option-two").innerHTML = "Brew Potion";
            document.getElementById("option-three").innerHTML = "Walk through the Forest";
            document.getElementById("option-four").innerHTML = "";

            // = Trigger Option 1 =
            document.getElementById("option-one").onclick = () => {
                // changeLocation();
            }
            
            // = Trigger Option 2 =
            document.getElementById("option-two").onclick = () => {
                // createPotion();
            }

            // = Trigger Option 3 =
            document.getElementById("option-three").onclick = () => {
                // initiateFight();
            }

            break;
    
        case "Thief":
            // ==== THIEF LOCATION: VILLAGE MARKET ====

            // = Show Location =
            document.getElementById("game-picture").src="RPGImages/shop2.webp";

            // = State Location =
            document.getElementById("game-text-title").innerHTML = gameData.locations[4].name;
            document.getElementById("game-text").innerHTML = gameData.locations[4].description;

            // = Options =
            document.getElementById("option-one").innerHTML = "Enter Shop";
            document.getElementById("option-two").innerHTML = "Attempt to Steal";
            document.getElementById("option-three").innerHTML = "Leave the Village";
            document.getElementById("option-four").innerHTML = "";

            // = Trigger Option 1 =
            document.getElementById("option-one").onclick = () => {
                // changeLocation();
            }
     
            // = Trigger Option 2 =
            document.getElementById("option-two").onclick = () => {
                rollSteal(playerGold);
            }

            // = Trigger Option 3 =
            document.getElementById("option-three").onclick = () => {
                // changeLocation();
            }

            break;

        case "Archer":
            // ==== ARCHER LOCATION: FOREST ====

            // = Show Location =
            document.getElementById("game-picture").src="RPGImages/SpookyForest.webp";

            // = State Location =
            document.getElementById("game-text-title").innerHTML = gameData.locations[0].name;
            document.getElementById("game-text").innerHTML = gameData.locations[0].description;

            // = Options =
            document.getElementById("option-one").innerHTML = "Attempt to Hunt";
            document.getElementById("option-two").innerHTML = "Walk through the Forest";
            document.getElementById("option-three").innerHTML = "Return to the Village";
            document.getElementById("option-four").innerHTML = "";

            // = Trigger Option 1 =
            document.getElementById("option-one").onclick = () => {
                rollHunt();
            }
            
            // = Trigger Option 2 =
            document.getElementById("option-two").onclick = () => {
                // initiateFight();
            }

            // = Trigger Option 3 =
            document.getElementById("option-three").onclick = () => {
                // changeLocation();
            }

            break;

        default:
            break;
    }
}

// ========== PLAYER INVENTORY ==========
function updateInventory (gameData) {

    // Get INV list and clear it each update
    const inventoryList = document.getElementById('inventory-list');

    // Max Inv Size
    let maxSpace = 6;

    // Add each item
    if(gameData.playerInventory.length <= maxSpace) {
        document.getElementById('inventory-list').innerHTML = "";
        gameData.playerInventory.forEach(item => {
            const listItem = document.createElement('p');
            listItem.textContent = `${item.name}`;
            inventoryList.appendChild(listItem);
            console.log("Object added:", item);
        });
    } else {
        document.getElementById("game-text").innerHTML = "Inventory Full!";
    }
}

function updateDefense (PlayerCharacter) {
    PlayerCharacter.defense += gameData.playerInventory[0].defense;
}

// ========== COMBAT EVENTS ==========
function initiateFight() {
    return console.log("FIGHT");
}

// ========== FUN EVENTS ==========
function rollSteal() {

    // = Roll to Steal =
    let result = Math.random() < 0.5 ? true : false;

    if (result == true) {

        // Success -- Add Gold
        playerGold += 25
        document.getElementById("gold-count").innerHTML = "Gold: " + playerGold;
        document.getElementById("game-text").innerHTML = "Theft Successful! Gold: +25";

        // Rare Chance to steal 'Valuables'
        setTimeout(result = Math.random() < 0.1 ? true : false, 2000)
        if (result == true) {
            document.getElementById("game-text").innerHTML = "Bonus Item! Treasure Added!";
            gameData.playerInventory.push(new Treasure (
                gameData.randomItems[1].name,
                gameData.randomItems[1].description,
                gameData.randomItems[1].value
            )) 

            updateInventory(gameData);
        }
    } else {

        // Failed -- Start Fight
        initiateFight()
        document.getElementById("game-text").innerHTML = "You Got Caught! Prepare to Fight!";
    }

    return playerGold;
}

function rollHunt() {

    // = Roll to Hunt =
    let result = Math.random() < 0.5 ? true : false;

    if (result == true) {

        // Success -- Add Meat
        document.getElementById("game-text").innerHTML = "Hunt Successful! Meat Added!";
        gameData.playerInventory.push(new Meat (
            gameData.randomItems[0].name,
            gameData.randomItems[0].description,
            gameData.randomItems[0].value
        )) 

        updateInventory(gameData);

    } else {

        // Failed -- Try again
        document.getElementById("game-text").innerHTML = "Hunt Failed!"
    }

    console.log(result);
}