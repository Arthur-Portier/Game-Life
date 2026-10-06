function kgToGo(current, target)
{
    let count = target - current;
    if (current >= target)
        count = 0;
    if (count > target)
        count = "Error";
    return (count);
}

// console.log(kgToGo(65, 100), "expected 35");
// console.log(kgToGo(105, 100), "expected 0");
// console.log(kgToGo(-5, 100), "expected 0");

function percentDone(current, target)
{

}

function formatLevel(lvl, current, target)
{
    let count = kgToGo(current, target);
    return (`Level ${lvl} : ${count}/100`);
}

// console.log(formatLevel(1, 50, 100));
