import {load } from "../js/storage.js"

const state = load();

function render(){
    document.getElementById("nickname").textContent = state.nickname;
    document.getElementById("level").textContent = `Level : ${state.level}`;
    document.getElementById("xp").textContent = `${state.xp} / ${state.xpNeed}`;
}

render();