//? https://www.codewars.com/kata/59ccf051dcc4050f7800008f

function buddy(start, limit) {
    console.time("duration:");
    if (start > limit) {
        return "";
    }

    class MemoList {
        addMemo(int) {
            if (int in lookup) { // MEMO in lookup or basecase => rebounce
                return;
            }

            for(let i=2; i<=(Math.sqrt(int)); i++) {
                if (int%i === 0) {
                    this.addMemo(int/i);
                    this.addMemo(i);
                    this[int] = new IntegerInfo(int, [this[i].divs, int/i], [this[int/i].divs, i]);
                    return;
                }
            }
            this[int] = new IntegerInfo(int);                
        }
    }
    
    // IntegerInfo object, holding divisors and buddy for each int!
    class IntegerInfo {
        constructor (int, [baseDivsA, multipleA]=[[1],1], [baseDivsB, multipleB]=[[1],1]) {
            if (multipleA===1) {
                this.divs=[1];
                this.myBelovedBuddy=0;
            } else {
                const uniqueify = (value, index, self) => (self.indexOf(value) === index);
                const sumValues = (obj) => (obj.reduce((a, b) => (a + b)));
                let divArray = [...baseDivsA, ...baseDivsB, ...baseDivsA.map(x=>x*multipleA), ...baseDivsB.map(x=>x*multipleB)];
                this.divs = new Float64Array(divArray.filter(uniqueify)).sort();
                this.myBelovedBuddy = sumValues(this.divs)-1;
            }
        }
    }
    
    function solve (from, upTo) {
        // optional, not needed, but somehow it speeds things up a tiny bit
        // example - calling: buddy(28457, 859856) ... timeLog wrapped:
        //                     result: [ 62744, 75495 ]
        //   running preparation loop: duration: 764.293ms
        //  skipping preparation loop: duration: 904.422ms
        for (let i = 1; i<from; i++) {
            lookup.addMemo(i);
        }

        let chkBuddy;
        // core solver loop!
        for (let i=from; i<=upTo; i++) {
            lookup.addMemo(i);
            chkBuddy = lookup[i].myBelovedBuddy;
            if (chkBuddy!=0) {
                lookup.addMemo(chkBuddy);
                if (lookup[chkBuddy].myBelovedBuddy == i) {
                    console.timeLog("duration:");
                    console.log(lookup);
                    return [i, chkBuddy];
                }
            }
        }
        console.timeLog("duration:");
        return "Nothing";
    }

    //actually running
    let lookup = new MemoList;
    return solve(start,limit);
}
console.log(buddy(1, 50));