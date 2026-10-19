import { levelFromXp, totalXp } from "./rules.js";

export function renderPlayer(state){
    const stats = levelFromXp(totalXp(state));
    document.getElementById("name").textContent = state.name;
    document.getElementById("level").textContent = stats.level;
    document.getElementById("xp").textContent = stats.xp + '/' + stats.need;
}