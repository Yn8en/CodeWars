function sumIntervals(rng){
    let minPos = rng[0][0];
    let maxPos = rng[0][1];
    for (let i=0; i<rng.length; i++) {
        minPos = Math.min(minPos, rng[i][0]);
        maxPos = Math.max(maxPos, rng[i][1]);
    }
    let strt = new Array(maxPos-minPos+1).fill(0);
    let ends = new Array(maxPos-minPos+1).fill(0);
    for (let i=0; i<rng.length; i++) {
        strt[rng[i][0]-minPos]+=1;
        ends[rng[i][1]-minPos]+=1;
    }
    let stack=0;
    let total=0;
    for (let i=0; i<strt.length; i++) {
        stack+=(strt[i]-ends[i]);
        total+=+(stack>0);
    }
    return total;
}

function runTests(n) {
    console.log("start: running " + n + " tests!")
    console.time(`ran total of #${n} tests - duration`);
    for (let i=0; i<n; i++) {
        console.time(`test #${i+1} - duration`);
        console.log(i)
        let ranges = [];
        let rangeWidth = rangeMax-rangeMin;
        for (let n=0; n<rangeNumber; n++) {
            let min = rangeMin+Math.floor(rangeWidth*Math.random())
            let rangeRest = rangeMax-min;
            let max = min+Math.ceil(rangeRest*Math.random())
            ranges.push([min, max]);
        }
        console.time(`test #${i+1} - solverTime`);
        sumIntervals(ranges)
        console.timeLog(`test #${i+1} - solverTime`);
        console.timeLog(`test #${i+1} - duration`);
    }
    console.timeLog(`ran total of #${n} tests - duration`);
}

let rangeNumber = 10000;
let rangeMin = 55;
let rangeMax = 10000;
runTests(25);