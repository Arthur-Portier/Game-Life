import {load } from "../js/storage.js"
import { renderPlayer } from "./render.js";
import { percentDone, totalXp, levelFromXp} from "./rules.js";

const state = load();

const stats = levelFromXp(totalXp(state));

document.getElementById("remplissage").style.width = `${percentDone(stats.xp, stats.need)}%`;

console.log(stats.xp);
console.log(stats.need);

renderPlayer(state);