function triangle(row, colors=["R","G","B"]) {
    
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
        console.log("target result row and gap within row index+="+ mod**i);
        return mod**i;
    }

    // actual solver/reducer
    const solve = (temp=[...row]) => {
        if (temp.length==1) {return temp[0]}
        while (!powerCheck(temp.length-1)) {
            for (let i=0; i<temp.length-1; i++) {
                temp[i]=getColor(temp[i], temp[i+1]); 
            }
            temp.pop();
        }
        return getColor(temp[0], temp[temp.length-1]);
    }
    return solve()
}
triangle("RGBRGBRBBRGBBR");