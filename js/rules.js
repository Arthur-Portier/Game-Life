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

const MS_DAY = 86400000;

export function daysLeft(due, today){
    const ms = new Date(due) - new Date(today);
    return Math.round(ms / MS_DAY);
}

export function todayString(date){
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return `${date.getFullYear()}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function deadlineLabel(days){
    let res = `J-${days}`;
    if (days === -1){
        res = `${-days} day late`;
    }
    else if (days < -1){
        res = `${-days} days late`;
    }
    return res;
}
