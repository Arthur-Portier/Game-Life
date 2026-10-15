export function kgToGo(current, target)
{
    let count = target - current;
    if (current >= target)
        count = 0;
    if (count > target)
        count = "Error";
    return (count);
}

export function percentDone(current, target)
{
    let percent = current / target * 100;
    return percent;
}

export function formatLevel(lvl, current, target)
{
    let count = kgToGo(current, target);
    return (`Level ${lvl} : ${count}/${target}`);
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
