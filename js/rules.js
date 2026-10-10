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
}

export function formatLevel(lvl, current, target)
{
    let count = kgToGo(current, target);
    return (`Level ${lvl} : ${count}/100`);
}
