const state = {
    player : "Arthurooo",
    nickname : "loser",
    level : 1,
    xp : 0,
    projects : [],
};

export function save(state){
    const text = JSON.stringify(state);
    localStorage.setItem("Current State", text);
}

export function load(){
    const saved = localStorage.getItem("Current State");
    if (saved){
        return JSON.parse(saved);
    }
    else{
        return state;
    }
}