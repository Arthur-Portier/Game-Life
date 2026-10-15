import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSteps } from "../js/rules.js";

test(`parseSteps : ${"Squat 100 kg \n \n Bench 80 kg "}`, () => {
    assert.deepEqual(parseSteps("Squat 100 kg \n \n Bench 80 kg "), 
    [{text: "Squat 100 kg", done: false}, {text: "Bench 80 kg", done: false}]);
})

const project1 = [];

const project2 = {title : "Gym", 
    steps : [{text: "Bench 100 kg", done: true}, {text: "Squat 120 kg", done: true}, {text: "Deadlift 150 kg"
    , done : true}],
    due: "2026-12-31"};
const project3 = {title : "Gym", 
    steps : [{text: "Bench 100 kg", done: true}, {text: "Squat 120 kg", done: false}, {text: "Deadlift 150 kg"
    , done : false}],
    due: "2026-12-31"};



