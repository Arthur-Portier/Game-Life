const state = {
    name : "Arthurooo",
    nickname : "loser",
    projects : [],
    inventory : []
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
