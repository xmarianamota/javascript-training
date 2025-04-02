// This was given empty and I will use to follow along the lectures on Section 4

const ATTACK_VALUE = 10; // this is the max value of the attack, randomization of the value is treated on vendor.js
const MONSTER_ATTACK_VALUE = 14;
const chosenMaxlife = 100;


let currentMonsterHealth = chosenMaxlife;
let currentPlayerHealth = chosenMaxlife;

adjustHealthBars(chosenMaxlife);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
    
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;


    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!');
    }

}

attackBtn.addEventListener('click', attackHandler);