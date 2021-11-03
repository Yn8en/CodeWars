function generateRegex(charClasses, minLength) {
    console.log(minLength);
    console.log(charClasses);
    let accumulator="^.*";
    let allowed="(";
    // accumulate regex core for all charClasses
    for (let i=0; i<charClasses.length; i++) {
        // build part for each charClass
        // while at it, accumulate "allowed" string as well;
        accumulator+="(?=";
        for (let j=0; j<charClasses[i][1]; j++) {
            // console.log("appended nr. "+(j+1)+" of "+charClasses[i][1]+" total!");
            accumulator+=".*"+charClasses[i][0]
        }
        accumulator+=")";
        allowed+=charClasses[i][0]+"|";
    }
    allowed= allowed.slice(0, -1).concat("|[A-Za-z0-9])");
    
    //add length restriction and append allowed chars as "or"-group & close
    accumulator+="(?=.{"+minLength+",})"+allowed+"+$"
    let regex = new RegExp(accumulator)
    console.log(regex);
    return regex;
}

// example - functionality testing with https://www.regextester.com/
let charClass = [["[-_.!#@§$%&/()\"\\]",3],["[A-Z]",3],["[0-9]",3]];
let minLength = 12;

let password = "Bruder!Muss@Los#1876";
console.log(generateRegex(charClass, minLength).test(password));



function generateRegex2(charClasses, minLength) {
    let accumulator="^.*";
    let allowed="(";
    // accumulate regex core for all charClasses
    for (let i=0; i<charClasses.length; i++) {
        // build part for each charClass
        // while at it, accumulate "allowed" string as well;
        accumulator+="(?=";
        for (let j=0; j<charClasses[i][1]; j++) {
            // console.log("appended nr. "+(j+1)+" of "+charClasses[i][1]+" total!");
            accumulator+=".*"+charClasses[i][0]
        }
        accumulator+=")";
        allowed+=charClasses[i][0]+"|";
    }
    allowed= allowed.slice(0, -1).concat(")");
    
    //add length restriction and append allowed chars as "or"-group & close
    accumulator+="(?=.{"+minLength+",}).*$" // ".*$" => allowed+"+$", in case!
    let regex = new RegExp(accumulator)
    console.log(regex);
    return regex;
}