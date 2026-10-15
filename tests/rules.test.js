import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSteps, projectProgress, isProjectComplete } from "../js/rules.js";

test(`parseSteps : Squat 100 kg Bench 80 kg`, () => {
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


test(`projectProgress Compte les étapes réalisées.`, () => {
    assert.deepEqual(projectProgress(project1), {done: 3, total: 3});
    assert.deepEqual(projectProgress(project2), {done: 1, total: 3});
    assert.deepEqual(projectProgress(project3), {done: 0, total: 0});
})

test(`isProjectComplete: Regarde si toutes les étapes d'un projet ont été réalisées.`, () => {
    assert.deepEqual(isProjectComplete(project1), true);
    assert.deepEqual(isProjectComplete(project2), false);
    assert.deepEqual(isProjectComplete(project3), true);
})




