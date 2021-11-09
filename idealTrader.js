const idealTraderReduce = (prices, runs) => {
    console.time("REDUCE ARRAY - ran "+runs+" times in")
    let profit = 1;
    let count = 0;
    for (let run=0; run<runs; run++) {
        count++;
        //core program - begin
        if (!prices.length) {
            return "invalid input"
        } else {
            profit = 1;//factor aka (profit+capital) / capital
            profit *= prices.reduce((acc,curr,idx,arr) => acc*((curr > arr[idx-1])?(curr/arr[idx-1]):(1)));
        }
        //core program - end
    }
    console.timeLog("REDUCE ARRAY - ran "+runs+" times in")        
    return profit+", looped x"+count
}

const idealTraderRaw = (prices, runs) => {
    console.time("RAW FOR LOOP - ran "+runs+" times in")
    let profit = 1;
    let count = 0;
    for (let run=0; run<runs; run++) {
        count++;
        //core program - begin
        if (!prices.length) {
            return "invalid input"
        } else {
            profit = 1;//factor aka (profit+capital) / capital
            for (let i=0; i<prices.length-1; i++) {
                profit*=(prices[i+1] > prices[i])?(prices[i+1]/prices[i]):(1);
            }
        }
        //core program - end
    }
    console.timeLog("RAW FOR LOOP - ran "+runs+" times in")        
    return profit+", looped x"+count
}

let runs = 1000000;
let prices = [1,2,3,4,5,6,3,2,1,5,2,7,12,4];
console.log(idealTraderReduce(prices, runs));
console.log(idealTraderRaw(prices, runs));