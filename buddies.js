//run func default for debug clg --> 
buddy(4,10);

function buddy(start,limit) {
    
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
            if (multipleA>1 && multipleB>1) {
                console.log("Appending new Info int: "+int+" + [" + baseDivsA + "] * "+multipleA+"  +  [" +baseDivsB+ "]* "+multipleB);
                this[int] = new IntegerInfo(int, baseDivsA, multipleA,baseDivsB, multipleB);
                console.log("Appended    "+int+" => "+this[int].divs+"   and Buddy: "+this[int].myBelovedBuddy);
                return;
            }
            let prime=true;
            for(let i=2; i<(Math.sqrt(int)); i++) {
                console.log(`${i} is <= ${Math.sqrt(int)} ... checking`);
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
                this.sumDivs=1;
                this.myBelovedBuddy=0;
            } else {
                const uniqueify = (value, index, self) => (self.indexOf(value) === index);
                const sumValues = (obj) => (obj.reduce((a, b) => (a + b)));
                let incA = int/multipleA;
                let incB = int/multipleB;
                this.divs = new Float64Array([incA, incB, ...baseDivsA, ...baseDivsB, ...baseDivsA.map(x=>x*multipleA), ...baseDivsB.map(x=>x*multipleB)].filter(uniqueify)).sort();
                console.log("pushed: " + int + " => divs: " + this.divs)
                this.sumDivs = sumValues(this.divs);
                this.myBelovedBuddy = this.sumDivs-1;
            }
        }
    }
    let lookup = new MemoList;    
    // initialize new MemoList as "lookup"
    function runRandomTest(n, min, max) {
        for (let i=1; i<n; i++) {
            let int = Math.floor(min+Math.random()*(max-min));
            console.log(int);
            lookup.addMemo(int); 
        }
        return lookup;
    }
    console.log(Object.keys(runRandomTest(50, 1, 1000)))
}

// Buddy pairs

// You know what divisors of a number are. The divisors of a positive integer n are said to be proper when you consider only the divisors other than n itself. In the following description, divisors will mean proper divisors. For example for 100 they are 1, 2, 4, 5, 10, 20, 25, and 50.

// Let s(n) be the sum of these proper divisors of n. Call buddy two positive integers such that the sum of the proper divisors of each number is one more than the other number:

// (n, m) are a pair of buddy if s(m) = n + 1 and s(n) = m + 1

// For example 48 & 75 is such a pair:

//     Divisors of 48 are: 1, 2, 3, 4, 6, 8, 12, 16, 24 --> sum: 76 = 75 + 1
//     Divisors of 75 are: 1, 3, 5, 15, 25 --> sum: 49 = 48 + 1

// Task

// Given two positive integers start and limit, the function buddy(start, limit) should return the first pair (n m) of buddy pairs such that n (positive integer) is between start (inclusive) and limit (inclusive); m can be greater than limit and has to be greater than n

// If there is no buddy pair satisfying the conditions, then return "Nothing" or (for Go lang) nil or (for Dart) null; (for Lua, Pascal, Perl) [-1, -1].
// Examples

// (depending on the languages)

// buddy(10, 50) returns [48, 75] 
// buddy(48, 50) returns [48, 75]
// or
// buddy(10, 50) returns "(48 75)"
// buddy(48, 50) returns "(48 75)"