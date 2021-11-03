function getPINs(observed) {
    // 1 - define func to get possible digits 
    let getOptions = (n) => {
         switch (n) {
            case "0": return ["0", "8"];
            case "1": return ["1", "2", "4"];
            case "2": return ["1", "2", "3", "5"];
            case "3": return ["2", "3", "6"];
            case "4": return ["1", "4", "5", "7"];
            case "5": return ["2", "4", "5", "6", "8"];
            case "6": return ["3", "5", "6", "9"];
            case "7": return ["4", "7", "8"];
            case "8": return ["0", "5", "7", "8", "9"];
            case "9": return ["6", "8", "9"];
        }
    }
    // 2 - loop to create options array
    let code = observed.split("")
    let variations = new Array(code.length);
    for (let i=0; i<code.length; i++) {
        variations[i]=getOptions(code[i]);
    }
    // 3 - define generator - input variations[arr][char] - output pins[str]
    let generator = (input) => {
        const strGenerator = (str, curr) => {
            for (let i=0; i<input[curr].length; i++) {
                (curr+1==input.length)
                ?(pins.push(str+input[curr][i]))
                :strGenerator(str+input[curr][i], curr+1);
            }
        }
        let pins = [];
        strGenerator("", 0);
        return pins;
    }
    return generator(variations).sort();
}


console.log(getPINs("584205"));