function buddy(start, limit) {
    // MemoList Object, containing all calculated integer objects
    // ...may come handy to add some methods lateron
    class MemoList {
        constructor(int =[]) {
            this[1]=new IntegerInfo(1);
            this[2]=new IntegerInfo(2);
            try {
                for (let key in int) {this.addMemo(key)}
            } catch (error) {
                console.log(error);
            }
        }
        
        addMemo(int, baseDivsA=[1], multipleA=1, baseDivsB=[1], multipleB=1) {
            if (int in lookup) {
                console.log("MEMO FOUND: "+ int);
                return; //rebounce! => BASECASE or MEMO hit!
            }
            console.log("CALLING addMemo with int: "+int+" __________________________")
            if (multipleA>1 && multipleB>1) {
                console.log("Appending new Info int: "+int+" + [" + baseDivsA + "] * "+multipleA+"  +  [" +baseDivsB+ "]* "+multipleB);
                this[int] = new IntegerInfo(int, baseDivsA, multipleA,baseDivsB, multipleB);
                console.log("Appended    "+int+" => "+this[int].divs+"   and Buddy: "+this[int].myBelovedBuddy);
                return;
            }
            let prime=true;
            for(let i=2; i<(Math.sqrt(int)); i++) {
                if (int%i === 0) {
                    this.addMemo(int/i);
                    this.addMemo(i);
                    //int, and 2x pairs [divs & factor down] taken from both above init memos!
                    this.addMemo(int, this[i].divs, int/i, this[int/i].divs, i);
                    prime=false;
                }
            }
            if (prime) {
                console.log("Appending new Info for PRIME: "+int+" => divs [1] + multiple=1");
                this[int] = new IntegerInfo(int);                
            }
        }
    }
    
    // IntegerInfo object, holding the memoized info info for a given Integer
    // myBelovedBuddy >> divSum ... much better suited to check buddies later!!
    class IntegerInfo {
        constructor (int, baseDivsA=[1], multipleA=1, baseDivsB=[1], multipleB = 1) {
            if (multipleA===1) {
                this.divs=[1];
                this.myBelovedBuddy=0;
            } else {
                const uniqueify = (value, index, self) => (self.indexOf(value) === index);
                const sumValues = (obj) => (obj.reduce((a, b) => (a + b)));
                let incA = int/multipleA;
                let incB = int/multipleB;
                this.divs = new Float64Array([incA, incB, ...baseDivsA, ...baseDivsB, ...baseDivsA.map(x=>x*multipleA), ...baseDivsB.map(x=>x*multipleB)].filter(uniqueify)).sort();
                console.log("pushed: " + int + " => divs: " + this.divs)
                this.myBelovedBuddy = sumValues(this.divs)-1;
            }
        }
    }
    // initialize new MemoList as "lookup"
    let lookup = new MemoList;    
    
    // start,limit
    function solve (from, upTo) {
        let chkBuddy;
        let buddysBuddy;
        for (let i=from; i<=upTo; i++) {
            lookup.addMemo(i);  // check 100
            // addMemo-> 100, [1,2,4,5,10,20,50], 92, 91
            chkBuddy = lookup[i].myBelovedBuddy; // = 91
            lookup.addMemo(chkBuddy); // check 91
            // addMemo-> 91, [1, 7, 13], 21, 20
            buddysBuddy = lookup[chkBuddy].myBelovedBuddy; // = 20
            if (buddysBuddy == i) { // check if 100 = 20
                return [i, chkBuddy];
            }
        }
        return "Nothing";
    }
    
    let result = solve(start,limit);
    console.log(lookup);
    return result;

    function runRandomTest(n, min, max) {
        for (let i=1; i<n; i++) {
            let int = Math.floor(min+Math.random()*(max-min));
            console.log(int);
            lookup.addMemo(int); 
        }
        return lookup;
    }
    // console.log(Object.keys(runRandomTest(50, 1, 1000)))
}
console.log(buddy(4,100));

// Task

// Given two positive integers start and limit, the function buddy(start, limit) should return the first pair (n m) of buddy pairs such that n (positive integer) is between start (inclusive) and limit (inclusive); m can be greater than limit and has to be greater than n

// If there is no buddy pair satisfying the conditions, then return "Nothing" or (for Go lang) nil or (for Dart) null; (for Lua, Pascal, Perl) [-1, -1].