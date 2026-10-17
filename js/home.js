import {load } from "../js/storage.js"
import { levelFromXp, totalXp } from "./rules.js";

const state = load();

function renderPlayer(){
    document.getElementById("name").textContent = state.name;
    document.getElementById("level").textContent = levelFromXp(totalXp(state)).level;
    document.getElementById("xp").textContent = levelFromXp(totalXp(state)).xp + '/' + levelFromXp(totalXp(state)).need;
}

renderPlayer();