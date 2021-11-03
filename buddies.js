//? https://www.codewars.com/kata/59ccf051dcc4050f7800008f

function buddy(start, limit) {
    console.time("duration:");
    if (start > limit) {
        return "";
    }

    class MemoList {
        constructor(int=[]) {
            this[1]=new IntegerInfo(1); // init basecases, simplicity
            this[2]=new IntegerInfo(2); // init basecases, simplicity
            try { // in case constructor is handed over an initial object from JSON or whatever
                for (let key in int) {this.addMemo(key)}
            } catch (error) {
                console.log(error);
            }
        }
        
        addMemo(int, baseDivsA=[1], multipleA=1, baseDivsB=[1], multipleB=1) {
            if (int in lookup) { // MEMO in lookup or basecase => rebounce
                return; //rebounce! => BASECASE or MEMO hit!
            }
            // in case addMemo for int was called with sufficient info about divisors down the tree => actually append new memo!
            if (multipleA>1 && multipleB>1) {
                this[int] = new IntegerInfo(int, baseDivsA, multipleA,baseDivsB, multipleB);
                return;
            }
            //assume prime generally, unless found a pair of divisors
            let prime=true;
            //loop through all possible divisors. so that => int%div = 0
            //could be sped up by breaking loop on first hit, but I will stick with it!
            for(let i=2; i<=(Math.sqrt(int)); i++) {
                if (int%i === 0) {
                    this.addMemo(int/i);
                    this.addMemo(i);
                    this.addMemo(int, this[i].divs, int/i, this[int/i].divs, i);
                    prime=false; // found divisors, toggle prime!
                }
            }
            // poor lonely prime numbers without buddies!
            if (prime) {
                this[int] = new IntegerInfo(int);                
            }
        }
    }
    
    // IntegerInfo object, holding divisors and buddy for each int!
    class IntegerInfo {
        constructor (int, baseDivsA=[1], multipleA=1, baseDivsB=[1], multipleB = 1) {
            if (multipleA===1) {
                this.divs=[1];
                this.myBelovedBuddy=0;
            } else {
                const uniqueify = (value, index, self) => (self.indexOf(value) === index);
                const sumValues = (obj) => (obj.reduce((a, b) => (a + b)));

                let array = [...baseDivsA, ...baseDivsB, ...baseDivsA.map(x=>x*multipleA), ...baseDivsB.map(x=>x*multipleB)];
                this.divs = new Float64Array(array.filter(uniqueify)).sort();
                this.myBelovedBuddy = sumValues(this.divs)-1;
            }
        }
    }
    
    function solve (from, upTo) {
        let chkBuddy;
        let buddysBuddy;

        // optional, not needed, but somehow it speeds things up a tiny bit
        // example - calling: buddy(28457, 859856) with timeLog wrapped around:
        //                     result: [ 62744, 75495 ]
        //   running preparation loop: duration: 764.293ms
        //  skipping preparation loop: duration: 904.422ms
        for (let i = 1; i<from; i++) {
            lookup.addMemo(i);
        }

        for (let i=from; i<=upTo; i++) {
            lookup.addMemo(i);
            chkBuddy = lookup[i].myBelovedBuddy;
            lookup.addMemo(chkBuddy);
            buddysBuddy = lookup[chkBuddy].myBelovedBuddy;
            if (buddysBuddy == i) {
                console.timeLog("duration:");
                return [i, chkBuddy];
            }

        }
        console.timeLog("duration:");
        return "Nothing";
    }

    //actually running
    let lookup = new MemoList;
    return solve(start,limit);
}
console.log(buddy(28457, 859856));