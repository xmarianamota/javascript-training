// This was given empty and I will use to follow along the lectures on Section 4

const ATTACK_VALUE = 10; // this is the max value of the attack, randomization of the value is treated on vendor.js
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

// Global static constants
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER= 'GAME_OVER';



const enteredValue = prompt('Maximum life for you and the monster', '100');

let chosenMaxlife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxlife) || chosenMaxlife <= 0) {
    chosenMaxlife = 100;
}

let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxlife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        default:
            logEntry = {};
    }

    // if (ev === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = 'MONSTER'
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry.target = 'MONSTER'
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry.target = 'PLAYER'
    // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry.target = 'PLAYER'
    // };
    battleLog.push(logEntry); 
}

function reset() {
    currentMonsterHealth = chosenMaxlife;
    currentPlayerHealth = chosenMaxlife;
    resetGame(chosenMaxlife);    
}

function endRound() {
    const initialPlayerLife = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerLife;
        setPlayerHealth(initialPlayerLife);
        alert('Bonus life saved you!');
    }


    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );

    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0) {
        alert('It is a draw!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    // reseting the game if any of the health goes below 0
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK ?  LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    // Same logic below, using 'if' instead of ternary operator "?":
    //let logEvent;
    // let maxDamage;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxlife - HEAL_VALUE) {
        alert("You can't heal to more than your max initial health");
        healValue = chosenMaxlife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );

    endRound();
}


function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);