// === GAME DATA ===
let gameRunning = true;
let PlayerCharacter = null;
let playerGold = 0;
let enemyKills = 0;

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

        document.getElementById("game-text-title").innerHTML = "WELCOME TO THE GAME";

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
                    gameData.playerClasses[0].level,
                    gameData.playerClasses[0].skill
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

                // = Skill =
                let skillText = document.getElementById("skill-text");
                skillText.innerHTML = "Skill: " + PlayerCharacter.skill;

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
                    gameData.playerClasses[1].level,
                    gameData.playerClasses[1].skill
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

                // = Skill =
                let skillText = document.getElementById("skill-text");
                skillText.innerHTML = "Skill: " + PlayerCharacter.skill;

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
                    gameData.playerClasses[2].level,
                    gameData.playerClasses[2].skill
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

                // = Skill =
                let skillText = document.getElementById("skill-text");
                skillText.innerHTML = "Skill: " + PlayerCharacter.skill;

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
                    gameData.playerClasses[3].level,
                    gameData.playerClasses[3].skill
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

                // = Skill =
                let skillText = document.getElementById("skill-text");
                skillText.innerHTML = "Skill: " + PlayerCharacter.skill;

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

// ========== QUEST TRIGGERING ==========
function triggerQuest (PlayerCharacter, gameData) {

    let location = null;

    // Switch Case Statement for starting location, depending on class
    switch (PlayerCharacter.type) {
        case "Warrior":
            // ==== WARRIOR LOCATION: CASTLE RUINS ====

            // = Show Location = 
            location = 2; // Castle Ruins
            changeLocation(gameData, location);

            break;

        case "Mage":
            // ==== MAGE LOCATION: WIZARDS TOWER ====

            // = Show Location =
            location = 4; // Wizards Tower
            changeLocation(gameData, location);

            break;
    
        case "Thief":
            // ==== THIEF LOCATION: VILLAGE MARKET ====

            // = Show Location =
            location = 5; // Village Market
            changeLocation(gameData, location);

            break;

        case "Archer":
            // ==== ARCHER LOCATION: FOREST ====

            // = Show Location =
            location = 1; // Forest
            changeLocation(gameData, location);

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

// ========== CHANGE LOCATION ==========
function changeLocation(gameData, location) {

    switch (location) {
        case 1: // FOREST

                // = Change to Forest Pic =
                document.getElementById("game-picture").src="RPGImages/SpookyForest.webp";

                // = State Location =
                document.getElementById("game-text-title").innerHTML = gameData.locations[0].name;
                document.getElementById("game-text").innerHTML = gameData.locations[0].description;

                // = Options =
                document.getElementById("option-one").innerHTML = "Attempt to Hunt";
                document.getElementById("option-two").innerHTML = "Search for Castle Ruins";
                document.getElementById("option-three").innerHTML = "Return to the Village";
                document.getElementById("option-four").innerHTML = "Search for Wizards Tower";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    rollHunt();
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    result = Math.random() < 0.5 ? true : false;
                    if (result == true) { // If True --> Forest
                        location = 2; // Castle Ruins
                        changeLocation(gameData, location);
                    } else { // If False -- Fight
                        attack(gameData, location, PlayerCharacter);
                    }
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    location = 5; // Village Market
                    changeLocation(gameData, location);
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    result = Math.random() < 0.5 ? true : false;
                    if (result == true) { // If True --> Forest
                        location = 4; // Wizards Tower
                        changeLocation(gameData, location);
                    } else { // If False -- Fight
                        attack(gameData, location, PlayerCharacter);
                    }
                }

            break;

        case 2: // CASTLE RUINS

                // = Change to Castle Pic =
                document.getElementById("game-picture").src="RPGImages/Castle1.webp";

                // = State Location = 
                document.getElementById("game-text-title").innerHTML = gameData.locations[1].name;
                document.getElementById("game-text").innerHTML = gameData.locations[1].description;

                // = Options =
                document.getElementById("option-one").innerHTML = "Return to the Forest";
                document.getElementById("option-two").innerHTML = "Enter Castle Ruins";
                document.getElementById("option-three").innerHTML = "Search for Valuables";
                document.getElementById("option-four").innerHTML = "Search for Mountain Caves";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 1; // Forest
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    attack(gameData, location, PlayerCharacter);;
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {

                    // Rare Chance to loot 'Valuables'
                    result = Math.random() < 0.1 ? true : false, 2000
                    if (result == true) {
                        document.getElementById("game-text").innerHTML = "Bonus Item! Treasure Added!";
                        gameData.playerInventory.push(new Treasure (
                            gameData.randomItems[1].name,
                            gameData.randomItems[1].description,
                            gameData.randomItems[1].value
                        )) 

                        updateInventory(gameData);
                    } else {
                        document.getElementById("game-text").innerHTML = "You Found Nothing!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    location = 3; // Mountain Cave
                    changeLocation(gameData, location);
                }

            break;

        case 3: // MOUNTAIN CAVE

                // = Change to Cave Pic =
                document.getElementById("game-picture").src="RPGImages/Mountains.webp";

                // = State Location =
                document.getElementById("game-text-title").innerHTML = gameData.locations[2].name;
                document.getElementById("game-text").innerHTML = gameData.locations[2].description;

                // = Options =
                document.getElementById("option-one").innerHTML = "Attempt to Mine";
                document.getElementById("option-two").innerHTML = "Search for Dragon Lair";
                document.getElementById("option-three").innerHTML = "Return to the Castle Ruins";
                document.getElementById("option-four").innerHTML = "";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    rollMine();
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    attack(gameData, location, PlayerCharacter);
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    location = 2; // Castle Ruins
                    changeLocation(gameData, location);
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                }
                
            break;

        case 4: // WIZARDS TOWER

                // = Change to Wizards Tower Pic =
                document.getElementById("game-picture").src="RPGImages/Wizardtower.webp";

                // = State Location = 
                document.getElementById("game-text-title").innerHTML = gameData.locations[3].name;
                document.getElementById("game-text").innerHTML = gameData.locations[3].description;

                // = Options =
                document.getElementById("option-one").innerHTML = "Return to the Village";
                document.getElementById("option-two").innerHTML = "Brew Potion";
                document.getElementById("option-three").innerHTML = "Forage for ingredients";
                document.getElementById("option-four").innerHTML = "Walk to through the Forest";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 5; // Village Market
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    createPotion();
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    attack(gameData, location, PlayerCharacter);
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {

                    result = Math.random() < 0.5 ? true : false;
                    if (result == true) { // If True --> Forest
                        location = 1; // Forest
                        changeLocation(gameData, location);
                    } else { // If False -- Fight
                        attack(gameData, location, PlayerCharacter);
                    }
                }
            
            break;

        case 5: // VILLAGE MARKET

                // = Change to Village Pic =
                document.getElementById("game-picture").src="RPGImages/shop2.webp";

                // = State Location =
                document.getElementById("game-text-title").innerHTML = gameData.locations[4].name;
                document.getElementById("game-text").innerHTML = gameData.locations[4].description;

                // = Options =
                document.getElementById("option-one").innerHTML = "Walk Around Village";
                document.getElementById("option-two").innerHTML = "Attempt to Steal";
                document.getElementById("option-three").innerHTML = "Leave the Village";
                document.getElementById("option-four").innerHTML = "Buy / Sell Goods";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    
                    // Roll for Event
                    result = Math.random() < 0.3 ? true : false;

                    if (result == true ) { // Bandit Robbery
                        attack(gameData, location, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You had a nice stroll.";
                    }
                }
        
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    rollSteal(playerGold, gameData, location, PlayerCharacter);
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    location = 1; // Forest
                    changeLocation(gameData, location);
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    // trade();
                }


        default:
            break;
    }
}


// ========== COMBAT EVENTS ==========
function attack(gameData, location, PlayerCharacter) {

    let Enemy = null;
    let result = null;
    let skillUsed = false;

    switch (location) {
        case 1: // FOREST

            // = Roll to Fight Enemy =
            result = Math.random() < 0.5 ? true : false;

            if (result == true) { // True -- Fight Goblin

                // === Create new Goblin Character ===
                Enemy = new Goblin(
                    gameData.enemyClasses[0].type,
                    gameData.enemyClasses[0].health,
                    gameData.enemyClasses[0].attackPower,
                    gameData.enemyClasses[0].defense,
                );

                // = Change to Goblin Pic =
                document.getElementById("game-picture").src="RPGImages/Goblin.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 1; // Forest
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }

            } else { // False -- Fight Troll

                // === Create new Troll Character ===
                Enemy = new Troll(
                    gameData.enemyClasses[1].type,
                    gameData.enemyClasses[1].health,
                    gameData.enemyClasses[1].attackPower,
                    gameData.enemyClasses[1].defense,
                );

                // = Change to Troll Pic =
                document.getElementById("game-picture").src="RPGImages/Troll.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 1; // Forest
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }
            }

            break;

        case 2: // CASTLE RUINS

            // = Roll to Fight Enemy =
            result = Math.random() < 0.5 ? true : false;

            if (result == true) { // True -- Fight Evil Soldier

                // === Create new Evil Soldier Character ===
                Enemy = new EvilSoldier(
                    gameData.enemyClasses[4].type,
                    gameData.enemyClasses[4].health,
                    gameData.enemyClasses[4].attackPower,
                    gameData.enemyClasses[4].defense,
                );

                // = Change to Evil Soldier Pic =
                document.getElementById("game-picture").src="RPGImages/evilSoldier.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 2; // Castle Ruins
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                   if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }

            } else { // False -- Fight Soldier

                // === Create new Soldier Character ===
                Enemy = new Soldier(
                    gameData.enemyClasses[3].type,
                    gameData.enemyClasses[3].health,
                    gameData.enemyClasses[3].attackPower,
                    gameData.enemyClasses[3].defense,
                );

                // = Change to Evil Soldier Pic =
                document.getElementById("game-picture").src="RPGImages/EvilSoldier2.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 2; // Castle Ruins
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }
            }

            break;
        case 3: // MOUNTAIN CAVE
            // === Create new Dragon Character ===
            Enemy = new Dragon(
                gameData.enemyClasses[2].type,
                gameData.enemyClasses[2].health,
                gameData.enemyClasses[2].attackPower,
                gameData.enemyClasses[2].defense,
            );

            // = Change to Goblin Pic =
            document.getElementById("game-picture").src="RPGImages/Dragon.webp";

            // = State Event = 
            document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                + Enemy.type 
                + " - [HP: " + Enemy.health + "] "
                + "[AP: " + Enemy.attackPower + "] "
                + "[D: " + Enemy.defense + "]";
            document.getElementById("game-text").innerHTML = "Fight or Flee!";

            // = Options =
            document.getElementById("option-one").innerHTML = "Flee";
            document.getElementById("option-two").innerHTML = "Attack";
            document.getElementById("option-three").innerHTML = "Use Skill";
            document.getElementById("option-four").innerHTML = "Heal";

            // = Trigger Option 1 =
            document.getElementById("option-one").onclick = () => {
                location = 2; // Castle Ruins
                changeLocation(gameData, location);
            }
            
            // = Trigger Option 2 =
            document.getElementById("option-two").onclick = () => {
                doDamage(PlayerCharacter, Enemy, gameData, location)
            }

            // = Trigger Option 3 =
            document.getElementById("option-three").onclick = () => {
                if (skillUsed == false) {
                    // Activate Skill
                    skillUsed = true;
                    skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                
                } else {
                    document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                }
            }

            // = Trigger Option 4 =
            document.getElementById("option-four").onclick = () => {
                if (gameData.playerInventory.find(item => item.name === "Potion")) {
                    heal(gameData, PlayerCharacter);
                } else {
                    document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                }
            }
            
            break;
        
        case 4: // Wizard Tower

            // = Roll to Fight Enemy =
            result = Math.random() < 0.5 ? true : false;

            if (result == true) { // True -- Fight Goblin

                // === Create new Goblin Character ===
                Enemy = new Goblin(
                    gameData.enemyClasses[0].type,
                    gameData.enemyClasses[0].health,
                    gameData.enemyClasses[0].attackPower,
                    gameData.enemyClasses[0].defense,
                );

                // = Change to Goblin Pic =
                document.getElementById("game-picture").src="RPGImages/Goblin.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 1; // Forest
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }

            } else { // False -- Fight Troll

                // === Create new Troll Character ===
                Enemy = new Troll(
                    gameData.enemyClasses[1].type,
                    gameData.enemyClasses[1].health,
                    gameData.enemyClasses[1].attackPower,
                    gameData.enemyClasses[1].defense,
                );

                // = Change to Troll Pic =
                document.getElementById("game-picture").src="RPGImages/Troll.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 1; // Forest
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }
            }

            break;
        
        case 5: // VILLAGE MARKET
            
            // = Roll to Fight Enemy =
            result = Math.random() < 0.5 ? true : false;

            if (result == true) { // True -- Fight Soldier

                // === Create new Soldier Character ===
                Enemy = new Soldier(
                    gameData.enemyClasses[0].type,
                    gameData.enemyClasses[0].health,
                    gameData.enemyClasses[0].attackPower,
                    gameData.enemyClasses[0].defense,
                );

                // = Change to Goblin Pic =
                document.getElementById("game-picture").src="RPGImages/soldier.webp";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 5; // Village Market
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }

            } else { // False -- Fight Bandit

                // === Create new Bandit Character ===
                Enemy = new Bandit(
                    gameData.enemyClasses[5].type,
                    gameData.enemyClasses[5].health,
                    gameData.enemyClasses[5].attackPower,
                    gameData.enemyClasses[5].defense,
                );

                // = Change to Troll Pic =
                document.getElementById("game-picture").src="RPGImages/bandit.png";

                // = State Event = 
                document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
                 + Enemy.type 
                 + " - [HP: " + Enemy.health + "] "
                 + "[AP: " + Enemy.attackPower + "] "
                 + "[D: " + Enemy.defense + "]";
                document.getElementById("game-text").innerHTML = "Fight or Flee!";

                // = Options =
                document.getElementById("option-one").innerHTML = "Flee";
                document.getElementById("option-two").innerHTML = "Attack";
                document.getElementById("option-three").innerHTML = "Use Skill";
                document.getElementById("option-four").innerHTML = "Heal";

                // = Trigger Option 1 =
                document.getElementById("option-one").onclick = () => {
                    location = 5; // Village Market
                    changeLocation(gameData, location);
                }
                
                // = Trigger Option 2 =
                document.getElementById("option-two").onclick = () => {
                    doDamage(PlayerCharacter, Enemy, gameData, location)
                }

                // = Trigger Option 3 =
                document.getElementById("option-three").onclick = () => {
                    if (skillUsed == false) {
                        // Activate Skill
                        skillUsed = true;
                        skill(PlayerCharacter, Enemy, gameData, location, skillUsed);
                    
                    } else {
                        document.getElementById("game-text").innerHTML = PlayerCharacter.skill + " was already used!";
                    }
                }

                // = Trigger Option 4 =
                document.getElementById("option-four").onclick = () => {
                    if (gameData.playerInventory.find(item => item.name === "Potion")) {
                        heal(gameData, PlayerCharacter);
                    } else {
                        document.getElementById("game-text").innerHTML = "You have no Healing Items!";
                    }
                }
            }

            break;

        default:
            break;
    }
}

function doDamage(PlayerCharacter, Enemy, gameData, location) {

    // Calculate Player Damage
    playerDamage = (PlayerCharacter.attackPower + gameData.playerInventory[1].damage);

    // Add Enemy's Defense to Player Damage
    playerDamage -= Enemy.defense;
    
    // Calculate Final Damage
    Enemy.health -= playerDamage;

    // Display Enemy Health
    document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
    + Enemy.type 
    + " - [HP: " + Enemy.health + "] "
    + "[AP: " + Enemy.attackPower + "] "
    + "[D: " + Enemy.defense + "]";

    document.getElementById("game-text").innerHTML = "Attacked for " + playerDamage + " damage!";

    // Enemy Attack
    takeDamage(PlayerCharacter, Enemy, gameData);

    // Check if Enemy Dead
    if (Enemy.health < 0) {
        // = State Result = 
        document.getElementById("game-text-title").innerHTML = "Enemy Vanquished!";
        document.getElementById("game-text").innerHTML = "You won the battle!";
        document.getElementById("health-bar-text").innerHTML = "Health: " + Math.floor(PlayerCharacter.health);

        // == Add to Total Kills ==
        enemyKills += 1;
        
        // == Every 3 kills, level up character ==
        if (enemyKills % 3 == 0) {
            levelUp(PlayerCharacter)
        }

        // === CLEAR BUTTONS ===
        clearButtons();

        // === RETURN PLAYER ===
        setTimeout(changeLocation, 3000, gameData, location);
    } else {
        // Return Enemy HP
        return Enemy.health;
    }
}

function takeDamage(PlayerCharacter, Enemy, gameData) {
    
    // Calculate Enemy Damage
    enemyDamage = (Enemy.attackPower);

    // Add Players's Defense to Enemy Damage
    enemyDamage *= (2 * (PlayerCharacter.defense/100));
    
    // Calculate Final Damage
    PlayerCharacter.health -= enemyDamage;

    // Return Player's HP and check if Dead
    if(Math.floor(PlayerCharacter.health) > 0){
        document.getElementById("health-bar-text").innerHTML = "Health: " + Math.floor(PlayerCharacter.health) + " [-" + Math.floor(enemyDamage) + " HP]";
    } else {

        // == Display Defeat Message ==
        document.getElementById("game-text-title").innerHTML = "You Died!";
        document.getElementById("game-text").innerHTML = "You lost the battle!";

        // = Update Player HP =
        document.getElementById("health-bar-text").innerHTML = "Health: 0";

        // = Clear Buttons =
        clearButtons();

        // == End Game ==
        gameRunning = false;
        
        setTimeout(endGame, 5000);
    }


    return Math.floor(PlayerCharacter.health);
}

function skill(PlayerCharacter, Enemy, gameData, location, skillUsed) {
    // Calculate Player Damage with Skill -- 2x Damage
    playerDamage = (PlayerCharacter.attackPower + (2 * gameData.playerInventory[1].damage));

    // Add Enemy's Defense to Player Damage
    playerDamage -= Enemy.defense;
    
    // Calculate Final Damage
    Enemy.health -= playerDamage;

    // Display Enemy Health
    document.getElementById("game-text-title").innerHTML = "Enemy Encountered - "
    + Enemy.type 
    + " - [HP: " + Enemy.health + "] "
    + "[AP: " + Enemy.attackPower + "] "
    + "[D: " + Enemy.defense + "]";

    // Enemy Attack
    document.getElementById("game-text").innerHTML = "Used " + PlayerCharacter.skill + " skill for " + playerDamage + " damage!";
    takeDamage(PlayerCharacter, Enemy, gameData);

    // Check if Enemy Dead
    if (Enemy.health < 0) {
        // = State Result = 
        document.getElementById("game-text-title").innerHTML = "Enemy Vanquished!";
        document.getElementById("game-text").innerHTML = "You won the battle!";
        document.getElementById("health-bar-text").innerHTML = "Health: " + Math.floor(PlayerCharacter.health);

        // == Add to Total Kills ==
        enemyKills += 1;
        
        // == Every 3 kills, level up character ==
        if (enemyKills % 3 == 0) {
            levelUp(PlayerCharacter)
        }

        // === CLEAR BUTTONS ===
        clearButtons();

        // === RETURN PLAYER ===
        setTimeout(changeLocation, 3000, gameData, location);
    } else {
        // Return Enemy HP and used skill
        return Enemy.health, skillUsed;
    }
}

function heal (gameData, PlayerCharacter) {

    // Let Healing Items be Potions
    let healingItem = gameData.randomItems[2].name;

    // If Used, remove it from inventory
    let removeItem = gameData.playerInventory.findIndex(item => item.name === healingItem);

    if (removeItem !== -1) {
      gameData.playerInventory.splice(removeItem, 1);
    }

    updateInventory(gameData);

    // Apply Healing to PlayerCharacter
    PlayerCharacter.health += 15;

    if (PlayerCharacter.health >= 100 ){
        PlayerCharacter.health = 100;
        document.getElementById("health-bar-text").innerHTML = "Health: 100";
    } else {
        document.getElementById("health-bar-text").innerHTML = "Health: " + Math.floor(PlayerCharacter.health);
    }

    return PlayerCharacter.health;
}

function levelUp(PlayerCharacter) {

    // == Upgrade Players level by 1 ==
    PlayerCharacter.level += 1;
    document.getElementById("level-text").innerHTML = "Level: " + PlayerCharacter.level;
}

// ========== FUN EVENTS ==========
function rollSteal(playerGold, gameData, location, PlayerCharacter) {

    // = Roll to Steal =
    let result = Math.random() < 0.4 ? true : false;

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
        document.getElementById("game-text").innerHTML = "You Got Caught! Prepare to Fight!";
        attack(gameData, location, PlayerCharacter);
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
}

function createPotion() {
    // = Roll to Brew =
    let result = Math.random() < 0.4 ? true : false;

    if (result == true) {

        // Success -- Add Potion
        document.getElementById("game-text").innerHTML = "Brew Successful! Potion Added!";
        gameData.playerInventory.push(new Potion (
            gameData.randomItems[2].name,
            gameData.randomItems[2].description,
            gameData.randomItems[2].value
        )) 

        updateInventory(gameData);

    } else {

        // Failed -- Try again
        document.getElementById("game-text").innerHTML = "Brew Failed!"
    }
}

function rollMine() {
    // = Roll to Mine =
    let result = Math.random() < 0.2 ? true : false;

    if (result == true) {

        // Success -- Add Ore
        document.getElementById("game-text").innerHTML = "Mining Successful! Ore Added!";
        gameData.playerInventory.push(new Ore (
            gameData.randomItems[3].name,
            gameData.randomItems[3].description,
            gameData.randomItems[3].value
        )) 

        updateInventory(gameData);

    } else {

        // Failed -- Try again
        document.getElementById("game-text").innerHTML = "Mining Failed!"
    }
}

// ========== CLEAR BUTTONS ==========
function clearButtons () {
    document.getElementById("option-one").innerHTML = "";
    document.getElementById("option-two").innerHTML = "";
    document.getElementById("option-three").innerHTML = "";
    document.getElementById("option-four").innerHTML = "";

    document.getElementById("option-one").onclick = null;
    document.getElementById("option-two").onclick = null;
    document.getElementById("option-three").onclick = null;
    document.getElementById("option-four").onclick = null;
}

// ========== END GAME ==========
function endGame() {

    // === Change Picture ===
    document.getElementById("game-picture").src="RPGImages/map4.webp";

    // == Display Defeat Message ==
    document.getElementById("game-text-title").innerHTML = "Game Over!";
    document.getElementById("game-text").innerHTML = "You bones are scraped clean by the desolate wind, your Village will now surely die as you have...";

    // == Restart Game Option ==
    document.getElementById("option-one").innerHTML = "Restart Game";
    document.getElementById("option-one").onclick = async () => {

        // = Wipe Player Data =
        PlayerCharacter = null;
        // = Class =
        let classText = document.getElementById("class-text");
        classText.innerHTML = "Class: ";

        // = Attack Power =
        let attackpowerText = document.getElementById("attackpower-text");
        attackpowerText.innerHTML = "Attack Power: ";

        // = Defense =
        let defenseText = document.getElementById("defense-text");
        defenseText.innerHTML = "Defense: ";

        // = Level =
        let levelText = document.getElementById("level-text");
        levelText.innerHTML = "Level: ";

        // = Skill =
        let skillText = document.getElementById("skill-text");
        skillText.innerHTML = "Skill: ";

        // = Health =
        let healthbarText = document.getElementById("health-bar-text");
        healthbarText.innerHTML = "Health: ";

        // = Wipe Inventory =
        playerGold = 0;
        document.getElementById("gold-count").innerHTML = "Gold: " + playerGold;
        gameData.playerInventory = [];
        updateInventory(gameData);

        // == Set Game State ==
        gameRunning = true;
    
        // === Pick character ===
        await pickCharacter(gameRunning, gameData);

        // 5 Second Delay before Triggering Quests
        setTimeout(triggerQuest, 5000, PlayerCharacter, gameData);
    }
}

// ========== CHARACTER CONSTRUCTOR ==========
class BaseCharacter {
    constructor(type, health, attackPower, defense, level, skill) {
        this.type = type;
        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
        this.level = level;
        this.skill = skill;
    }
}

class Warrior extends BaseCharacter {
    constructor(type, health, attackPower, defense, level, skill){
        super(type, health, attackPower, defense, level, skill);
    }
}

class Mage extends BaseCharacter {
    constructor(type, health, attackPower, defense, level, skill){
        super(type, health, attackPower, defense, level, skill);
    }
}

class Thief extends BaseCharacter {
    constructor(type, health, attackPower, defense, level, skill){
        super(type, health, attackPower, defense, level, skill);
    }
}

class Archer extends BaseCharacter {
    constructor(type, health, attackPower, defense, level, skill){
        super(type, health, attackPower, defense, level, skill);
    }
}

// ========== ENEMY CONSTRUCTOR ==========
class EvilSoldier extends BaseCharacter {
    constructor(type, health, attackPower, defense){
        super(type, health, attackPower, defense);
    }
}

class Soldier extends BaseCharacter {
    constructor(type, health, attackPower, defense){
        super(type, health, attackPower, defense);
    }
}

class Goblin extends BaseCharacter {
    constructor(type, health, attackPower, defense){
        super(type, health, attackPower, defense);
    }
}

class Troll extends BaseCharacter {
    constructor(type, health, attackPower, defense){
        super(type, health, attackPower, defense);
    }
}

class Dragon extends BaseCharacter {
    constructor(type, health, attackPower, defense){
        super(type, health, attackPower, defense);
    }
}

class Bandit extends BaseCharacter {
    constructor(type, health, attackPower, defense){
        super(type, health, attackPower, defense);
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

class Potion extends BaseItem {
    constructor(name, description, value) {
        super(name, description, value);
    }
}

class Ore extends BaseItem {
    constructor(name, description, value) {
        super(name, description, value);
    }
}