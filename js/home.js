import { kgToGo } from "./rules.js";

const state = {
    player : "Arthurooo",
    nickname : "loser",
    level : 1,
    xp : [0, 100],
    projects : ["Gym Monster", "Tennis God", "Crazy Dev"]
};

// document.getElementById("xp-button").addEventListener("click", () => {
//         state.xp[0] += 50;
//         render();
//     })


function render(){
    document.getElementById("nickname").textContent = state.nickname;
    document.getElementById("level").textContent = `Level : ${state.level}`;
    document.getElementById("xp").textContent = `${state.xp[0]} / ${state.xp[1]}`;
}

render();