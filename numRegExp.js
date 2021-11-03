function generateRegex(charClasses, minLength) {
    let accumulator="^.*";
    for (let i=0; i<charClasses.length; i++) {
        accumulator+="(?=";
        for (let j=0; j<charClasses[i][1]; j++) {
            accumulator+=".*"+charClasses[i][0];
        }
        accumulator+=")";
    }
    accumulator+="(?=.{"+minLength+",}).*$"
    let regex = new RegExp(accumulator)
    console.log(regex);
    return regex;
}

// example - functionality testing with https://www.regextester.com/
let charClass = [["[-_.!#@§$%&/()\"\\]",3],["[A-Z]",3],["[0-9]",3]];
let minLength = 12;
let password = "Bruder!Muss@Los#1876";
console.log(generateRegex(charClass, minLength).test(password));