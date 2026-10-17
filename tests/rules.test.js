import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSteps, projectProgress, isProjectComplete, levelFromXp, totalXp } from "../js/rules.js";

test(`parseSteps(): Crée un tableau d'objets pour chaque étape dans un projet. `, () => {
    assert.deepEqual(parseSteps("Squat 100 kg \n \n Bench 80 kg "), 
    [{text: "Squat 100 kg", done: false}, {text: "Bench 80 kg", done: false}]);
})


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

const state1 = {
    player : "Arthurooo",
    nickname : "loser",
    projects : [project1, project2, project3],
};

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

test("totalXp(): Renvoie un entier de l'xp total gagné avec tous les projets, toutes les étapes dans les projets. ", () => {
    assert.deepEqual(totalXp(state1), 200);
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
