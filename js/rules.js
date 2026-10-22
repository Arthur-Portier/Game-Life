export function percentDone(current, target)
{
    return (current / target) * 100;
}

export function parseSteps(text){
    return text
    .split("\n")
    .map(str => str.trim())
    .filter(str => str !== "")
    .map(str => ({text: str, done: false}));
}

export function projectProgress(project){
    const steps_progress = project.steps.filter(step => step.done);
    return { done: steps_progress.length, total: project.steps.length };
}

export function isProjectComplete(project){
    return projectProgress(project).done === projectProgress(project).total;
}

const STEP_XP = 50;

export function totalXp(state){
    const initialValue = 0;
    return state.projects.reduce((accumulator, currentValue) =>
        accumulator + (projectProgress(currentValue).done * STEP_XP), initialValue);
}

function xpToNextLevel(level){
    return (level * 100);
}

export function levelFromXp(total){
    let level = 1;
    while(total >= xpToNextLevel(level)){
        total -= xpToNextLevel(level);
        level++;
    }
    return {level, xp: total, need: xpToNextLevel(level)};
}
