function triangle(row, colors=["R","G","B"]) {
    console.time("solving");
    // init helper-func to get resulting color
    const getColor = (a, b) => {
        if (a === b) return a;
        return colors.filter(col=> (col!==a && col!==b))+``;
    }
    
    // init helper-func to jump into logic shortcut property of riddle
    const mod = colors.length;
    const powerCheck = (int) => {
        if (int == mod || int == 1) {
            return true;
        } else if (int%mod !== 0) {
            return false;
        } else {
            return powerCheck(int/mod)
        }
    }

    // helper func to jump over returned int nr of rows! compare above comment
    const maxReducerRows = (currentLength, i=0) => {
        while (1+mod**i <= currentLength) {
            i++;
        }
        return mod**(i-1);
    }

    // actual solver/reducer
    const solve = (temp=[...row]) => {
        if (temp.length==1) {return temp[0]}
        while (!powerCheck(temp.length-1)) {
            let reduceDim = maxReducerRows(temp.length);
            let targetLength = temp.length-reduceDim;
            for (let i=0; i<temp.length-reduceDim; i++) {
                temp[i]=getColor(temp[i], temp[i+reduceDim]); 
            }
            temp.splice(targetLength);
        }
        return getColor(temp[0], temp[temp.length-1]);
    }
    let result = solve();
    console.timeLog("solving");
    return result;
}

let randomTest = (len, colors) => {
    console.time(`generating string, difficulty=${difficulty}, length="${len}`);
    let str="";
    for (let i=0; i<len; i++) {
        let index = Math.floor(3*Math.random());
        str+=colors[index]+"";
    }
    console.timeLog(`generating string, difficulty=${difficulty}, length="${len}`);
    return str;
}

let difficulty = 6; // set difficulty here, 2 to 10 recommended 
let length = Math.floor(10**difficulty+Math.random()*10**(difficulty+1));

console.log(triangle(randomTest(length, ["R", "G", "B"]),["R", "G", "B"]));