function cakes(recipe, available) {
    // check for totally missing ingredients
    for (const [key, value] of Object.entries(recipe)) {
        if(isNaN(available[key])) {
            //console.log("there is an ingredient completely missing in stock: " + key);
            return 0
        }
    }
    // calculate cakes --> return asap
    let more=true;
    for (let num = 0; more; num++) {
        for (const [key, value] of Object.entries(recipe)) {
            available[key] = available[key]-recipe[key];
            //console.log("new "+key+": "+available[key]);
            if (available[key]<0) {
                more = false;
                //console.log("ran out of ingredients, just got  " + num + " cakes!");
                return num;
            }
        }
    }
}

let recipe = {flour: 500, sugar: 200, eggs: 1};
let available = {flour: 1200, sugar: 1200, eggs: 5, milk: 200};
console.log(cakes(recipe, available)+" => 2 expected");

recipe = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
available = {sugar: 500, flour: 2000, milk: 2000, apples: 300, oil: 90000};
console.log(cakes(recipe, available)+" => 3 expected");

recipe = {a: 10, b: 2, c: 1};
available = {a: 1456, b: 852};
console.log(cakes(recipe, available)+" => 0 expected");