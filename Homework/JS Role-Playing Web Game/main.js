// ========= CHARACTER CLASSES =========

// ====== PLAYER CHARACTERS ======

// BASE CHARACTER
class BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
        this.level = level;
    }

    toString() {
        console.log(`Base Character Stats: ${this.name}, ${this.health}, ${this.attackPower}, ${this.defense}, ${this.level}.`)
    }
}

const newCharacter = new BaseCharacter("Unknown", 1, 1, 1, 1);

// WARRIOR CHARACTER
class WarriorCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newWarrior = new WarriorCharacter("To Be Named", 100, 90, 60, 1);

// MAGE CHARACTER
class MageCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newMage = new MageCharacter("To Be Named", 60, 85, 30, 1);

// THIEF CHARACTER
class ThiefCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newThief = new ThiefCharacter("To Be Named", 40, 95, 50, 1);

// ARCHER CHARACTER
class ArcherCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newArcher = new ArcherCharacter("To Be Named", 75, 80, 30, 1);

// ====== ENEMY CHARACTERS ======

// GOBLIN CHARACTER
class GoblinCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newGoblin = new GoblinCharacter("Goblin", 60, 35, 40, 1);

// TROLL CHARACTER
class TrollCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newTroll = new TrollCharacter("Troll", 100, 40, 25, 1);

// DRAGON CHARACTER
class DragonCharacter extends BaseCharacter {
    constructor(name, health, attackPower, defense, level) {
        super(name, level)

        this.health = health;
        this.attackPower = attackPower;
        this.defense = defense;
    }
}

const newDragon = new DragonCharacter("Dragon", 100, 80, 50, 1);


// ========= WEAPON CLASSES =========
class BaseWeapon {
    constructor(name, type, damage, cost) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.cost = cost;
    }

    toString() {
        console.log(`Base Weapon Stats: ${this.name}, ${this.type}, ${this.damage}, ${this.cost}, ${this.level}.`)
    }
}

const newWeapon = new BaseWeapon("Unknown", "Type", 100, 0);

// SWORD WEAPON
class SwordWeapon extends BaseWeapon {
    constructor(name, type, damage, cost) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.cost = cost;
    }
}

const newSword = new SwordWeapon("Name", "Sword", 80, 100);

// CLUB WEAPON
class ClubWeapon extends BaseWeapon {
    constructor(name, type, damage, cost) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.cost = cost;
    }
}

const newClub = new SwordWeapon("Name", "Club", 50, 75);

// SPEAR WEAPON
class SpearWeapon extends BaseWeapon {
    constructor(name, type, damage, cost) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.cost = cost;
    }
}

const newSpear = new SpearWeapon("Name", "Spear", 60, 90);

// BOW WEAPON
class BowWeapon extends BaseWeapon {
    constructor(name, type, damage, cost) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.cost = cost;
    }
}

const newBow = new BowWeapon("Name", "Bow", 90, 30);

// DAGGER WEAPON
class DaggerWeapon extends BaseWeapon {
    constructor(name, type, damage, cost) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.cost = cost;
    }
}

const newDagger = new DaggerWeapon("Name", "Dagger", 15, 10);

// ========= ARMOR CLASSES =========
class BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }

    toString() {
        console.log(`Base Armor Stats: ${this.name}, ${this.defense}, ${this.cost}.`)
    }
}

const newArmor = new BaseWeapon("Unknown", "Type", 100, 0, 1);

// LEATHER ARMOR
class LeatherArmor extends BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }
}

const newLeatherArmor = new BowWeapon("Leather Armor", 5, 100);

// CHAINMAIL ARMOR
class ChainmailArmor extends BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }
}

const newChainmailArmor = new ChainmailArmor("Chainmail Armor", 10, 200);

// KNIGHT ARMOR
class KnightArmor extends BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }
}

const newKnightArmor = new KnightArmor("Knight Armor", 20, 500);

// MAGE ARMOR
class MageArmor extends BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }
}

const newMageArmor = new MageArmor("Mage Armor", 10, 100);

// THIEF ARMOR
class ThiefArmor extends BaseArmor {
    constructor(name, defense, cost) {
        this.name = name;
        this.defense = defense;
        this.cost = cost;
    }
}

const newThiefArmor = new ThiefArmor("Thief Armor", 15, 150);