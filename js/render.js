import { levelFromXp, totalXp, percentDone } from "./rules.js";

export function renderPlayer(state){
    const stats = levelFromXp(totalXp(state));
    document.getElementById("name").textContent = state.name;
    document.getElementById("level").textContent = `Level: ${stats.level}`;
    document.getElementById("remplissage").style.width = `${percentDone(stats.xp, stats.need)}%`;
    document.getElementById("xp").textContent = stats.xp + '/' + stats.need;
}