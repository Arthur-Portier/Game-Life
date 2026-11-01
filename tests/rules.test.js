import { test } from "node:test";
import assert from "node:assert/strict";
import { currencyBalance, currencyEarned, currencySpent, canPull, parseSteps, projectProgress, isProjectComplete, levelFromXp, totalXp, daysLeft, todayString, deadlineLabel, rollRarity, pickWeapon } from "../js/rules.js";
import { weapons } from "../js/weapons.js";

const project1 = {title : "Gym", 
    steps : [{text: "Bench 100 kg", done: true}, {text: "Squat 120 kg", done: true}, {text: "Deadlift 150 kg"
    , done : true}],
    due: "2026-12-31"};

const project2 = {title : "Gym", 
    steps : [{text: "Bench 100 kg", done: true}, {text: "Squat 120 kg", done: false}, {text: "Deadlift 150 kg"
    , done : false}],
    due: "2026-12-31"};

const project3 = {title : "Gym", 
    steps : [],
    due: "2026-12-31"};

const project4 = {title : "Gym", 
    steps : [{text: "Bench 100 kg", done: true}, {text: "Squat 120 kg", done: false}, {text: "Deadlift 150 kg"
    , done : true}],
    due: "2026-12-31"};

const state1 = {
    player : "Arthurooo",
    nickname : "loser",
    projects : [project1],
    inventory: [],
};
const state2 = {
    player : "Arthurooo",
    nickname : "loser",
    projects : [project1],
    inventory: ["1"],
};
const state3 = {
    player : "Arthurooo",
    nickname : "loser",
    projects : [project1, project2, project3],
    inventory: ["1", "1", "3"],
};
const state4 = {
    player : "Arthurooo",
    nickname : "loser",
    projects : [project1, project2, project3, project4],
    inventory: ["1", "1", "3"],
};

//#region project 
test(`parseSteps(): Crée un tableau d'objets pour chaque étape dans un projet. `, () => {
    assert.deepEqual(parseSteps("Squat 100 kg \n \n Bench 80 kg "), 
    [{text: "Squat 100 kg", done: false}, {text: "Bench 80 kg", done: false}]);
})

test(`projectProgress(): Compte les étapes réalisées.`, () => {
    assert.deepEqual(projectProgress(project1), {done: 3, total: 3});
    assert.deepEqual(projectProgress(project2), {done: 1, total: 3});
    assert.deepEqual(projectProgress(project3), {done: 0, total: 0});
})

test(`isProjectComplete(): Regarde si toutes les étapes d'un projet ont été réalisées.`, () => {
    assert.deepEqual(isProjectComplete(project1), true);
    assert.deepEqual(isProjectComplete(project2), false);
    assert.deepEqual(isProjectComplete(project3), true);
})
//#endregion

//#region level
test("totalXp(): Renvoie un entier de l'xp total gagné avec tous les projets, toutes les étapes dans les projets. ", () => {
    assert.deepEqual(totalXp(state1), 150);
})

test("levelFromXp(): renvoie un objet avec le niveau, l'xp et l'xpNeed actuels", () => {
    assert.deepEqual(levelFromXp(0), {level: 1, xp: 0, need: 100});
    assert.deepEqual(levelFromXp(99), {level: 1, xp: 99, need: 100});
    assert.deepEqual(levelFromXp(100), {level: 2, xp: 0, need: 200});
    assert.deepEqual(levelFromXp(300), {level: 3, xp: 0, need: 300});
    assert.deepEqual(levelFromXp(1000), {level: 5, xp: 0, need: 500});
    assert.deepEqual(levelFromXp(350), {level: 3, xp: 50, need: 300});
    assert.deepEqual(levelFromXp(850), {level: 4, xp: 250, need: 400});
})
//#endregion

//#region date
test("daysLeft(): renvoie en entier le nombre de jours restants avant la deadline. ", () => {
    assert.deepEqual(daysLeft("2026-10-30", "2026-10-22"), 8);
    assert.deepEqual(daysLeft("2026-10-22", "2026-10-22"), 0);
    assert.deepEqual(daysLeft("2026-10-20", "2026-10-22"), -2);
    assert.deepEqual(daysLeft("2026-11-02", "2026-10-28"), 5);
    assert.deepEqual(daysLeft("2026-10-26", "2026-10-24"), 2);
    assert.deepEqual(daysLeft("2027-01-01", "2026-12-31"), 1);
});

test("todayString(): Convertis une date locale au format string ISO. ", () => {
    assert.deepEqual(todayString(new Date(2026, 9, 22, 0, 30)), "2026-10-22");
    assert.deepEqual(todayString(new Date(2026, 0, 5)), "2026-01-05");
});

test("deadlineLabel(days): Permet d'obtenir le string relatif à un retard dans la deadline ou dans combien de temps est cette deadline. ", () => {
    assert.deepEqual(deadlineLabel(5), "J-5");
    assert.deepEqual(deadlineLabel(-2), "2 days late");
    assert.deepEqual(deadlineLabel(-1), "1 day late");
});
//#endregion

//#region inventory functions 
test("currencyEarned(level): Calcule le nombre de monnaies que l'on possède en fonction du niveau actuel.", () => {
    assert.equal(currencyEarned(1), 10);
    assert.equal(currencyEarned(3), 30);
    assert.equal(currencyEarned(10), 100);
})

test("currencySpent(inventory): Calcule le nombre de monnaies que l'on a dépensées avec l'inventaire actuel.", () => {
    assert.equal(currencySpent([]), 0);
    assert.equal(currencySpent(["1"]), 10);
    assert.equal(currencySpent(["1", "1", "3"]), 30);
})

test("currencyBalance(state): Calcule la monnaie réelle que le joueur possède en fonction de ce qu'il a dépensé et ce qu'il a gagné.", () => {
    assert.equal(currencyBalance(state1), 20);
    assert.equal(currencyBalance(state2), 10);
    assert.equal(currencyBalance(state3), -10);
    assert.equal(currencyBalance(state4), 0);
})

test("canPull(state): vérifie si le joueur a assez de monnaie pour invoquer.", () => {
    assert.equal(canPull(state1), true);
    assert.equal(canPull(state2), true);
    assert.equal(canPull(state3), false);
    assert.equal(canPull(state4), false);
})

test("rollRarity(zero_to_one_nb): Retourne un nombre au hasard entre 0 et 1.", () => {
    assert.equal(rollRarity(.59), 3);
    assert.equal(rollRarity(.6), 3);
    assert.equal(rollRarity(.61), 4);
    assert.equal(rollRarity(.89), 4);
    assert.equal(rollRarity(.9), 4);
    assert.equal(rollRarity(.91), 5);
    assert.equal(rollRarity(1), 5);
})

test("pickWeapon(catalog, rarity, zero_to_one_nb): choisis au hasard une arme de la rareté dans le catalogue.", () => {
    assert.deepEqual(pickWeapon(weapons, 5, .5), weapons[0]);
    assert.deepEqual(pickWeapon(weapons, 5, .6), weapons[1]);
    assert.deepEqual(pickWeapon(weapons, 4, .6), null);
})
//#endregion
