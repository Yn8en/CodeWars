function solvePuzzle(clues, size = 7, dims = 2) {
    // ----------------- PHASE 01 ------------------------------
    // lay out all the array structure we need
    // generally: [row][col][valueArr]
    // resultGrid = 9x9 = core Result + border result visibility
    const resultGrid = Array(size+2).fill(0).map(x => Array(size+2).fill(0))
    // cluesGrid = 9x9 = core narrowedOptions + border clues input
    const cluesGrid = Array(size+2).fill(0).map(x => Array(size+2));
    // populate all stacks for narrowed options
    // true filled array aka each option inside there starts possible by default
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            cluesGrid[i+1][j+1] = new Array(size).fill(true);
        }
    }
    
    // ----------------- PHASE 02 ------------------------------
    // init all clue values in cluesGrid - rows 1,2,3,4 in that sequence
    // ... bit tricky, but this way we get consitent meaningful data grid set-up!
    for (let i = 0; i < size; i++) {
            cluesGrid[0][i+1] = clues[0+i];
            cluesGrid[i+1][size+1] = clues[1*size+i];
            cluesGrid[size+1][i+1] = clues[3*size-1-i];
            cluesGrid[i+1][0] = clues[4*size-1-i];
    }


    
    try {
        // ----------------- PHASE 03 ------------------------------
        // ----- init the trivial base cases --> get headstart -----
        // REFACTORING can highly improve this code readability later!
        let debug=true;
        // a - if clue = size (aka 7), populate result row/col and flag narrowed as done
        for (let i=0; i < size; i++) {
            // target each column here
            if (cluesGrid[0][i+1] == size) {
                for (let j=0; j < size; j++) {
                    if (cluesGrid[j+1][i+1] === true && resultGrid[j+1][i+1] !== j+1) {
                        return("clues are contradicting! Collision in Row ["+(j+1)+"] & Col["+(i+1)+"]");
                    }
                    cluesGrid[j+1][i+1] = true; // remove array stack with bool to mark done!
                    resultGrid[j+1][i+1] = j+1; // write appropriate solution into result
                } // ... as well as the same column in opposite direction
            } else if (cluesGrid[size+1][i+1] == size) {
                for (let j=0; j < size; j++) {
                    if (cluesGrid[size-j][i+1] === true && resultGrid[size-j][i+1] !== j+1) {
                        return("clues are contradicting! Collision in Row ["+(size-j)+"] & Col["+(i+1)+"]");
                    }
                    cluesGrid[size-j][i+1] = true; // remove array stack with bool to mark done!
                    resultGrid[size-j][i+1] = j+1; // write appropriate solution into result
                }
            } // target each row here
            if (cluesGrid[i+1][0] == size) {
                for (let j=0; j < size; j++) {
                    if (cluesGrid[i+1][j+1] === true && resultGrid[i+1][j+1] !== j+1) {
                        return("clues are contradicting! Collision in Row ["+(i+1)+"] & Col["+(j+1)+"]");
                    }
                    cluesGrid[i+1][j+1] = true; // remove array stack with bool to mark done!
                    resultGrid[i+1][j+1] = j+1; // write appropriate solution into result
                }   // ... as well as the same row in opposite direction
            } else if (cluesGrid[i+1][size+1] == size) {
                for (let j=0; j < size; j++) {
                    if (cluesGrid[i+1][size-j] === true && resultGrid[i+1][size-j] !== j+1) {
                        return("clues are contradicting! Collision in Row ["+(i+1)+"] & Col["+(size-j)+"]");
                    }
                    cluesGrid[i+1][size-j] = true; // remove array stack with bool to mark done!
                    resultGrid[i+1][size-j] = j+1; // write appropriate solution into result
                }
            }
        }

        let debug=true;
        // b - if clue = 1, write facing result-value=size,flag narrowed as done & update narrowed
        for (let i=0; i < size; i++) {
            // target each column from top here ...
            if (cluesGrid[0][i+1] == 1) {
                if (cluesGrid[1][i+1] === true && resultGrid[1][i+1] !== size) {
                    return("clues are contradicting! Collision in Row [1] & Col["+(i+1)+"]");
                }
                cluesGrid[1][i+1] = true; // remove array stack with bool to mark done!
                resultGrid[1][i+1] = size; // write appropriate solution into result
                for (let j=2; j < size; j++) { // traverse rest of col and update narrow
                    if (cluesGrid[j][i+1] !== true) {
                        console.log(cluesGrid[j][i+1]);
                        cluesGrid[j][i+1][size-1] = false;
                    } else if (resultGrid[j][i+1] == size) {
                        return("clues are contradicting! Collision in Row [1] & Col["+(i+1)+"]");
                    }
                }
                // ... as well as same column from bottom here
            } else if (cluesGrid[size+1][i+1] == 1) {
                if (cluesGrid[size][i+1] === true && resultGrid[size][i+1] !== size) {
                    return("clues are contradicting! Collision in Row ["+size+"] & Col["+(i+1)+"]");
                }
                cluesGrid[size][i+1] = true; // remove array stack with bool to mark done!
                resultGrid[size][i+1] = size; // write appropriate solution into result
                for (let j=2; j < size; j++) { // traverse rest of col and update narrow
                    if (cluesGrid[size-j+1][i+1] !== true) {
                        cluesGrid[size-j+1][i+1][size-1] = false;
                    } else if (resultGrid[size-j+1][i+1] == size) {
                        return("clues are contradicting! Collision in Row ["+size+"] & Col["+(i+1)+"]");
                    }
                }
            }   // target each row here
            if (cluesGrid[i+1][0] == 1) {
                if (cluesGrid[i+1][1] === true && resultGrid[i+1][1] !== size) {
                    return("clues are contradicting! Collision in Row ["+(i+1)+"] & Col[1]");
                }
                cluesGrid[i+1][1] = true; // remove array stack with bool to mark done!
                resultGrid[i+1][1] = size; // write appropriate solution into result
                for (let j=2; j < size; j++) { // traverse rest of row and update narrow
                    if (cluesGrid[i+1][j] !== true) {
                        cluesGrid[i+1][j][size-1] = false;
                    } else if (resultGrid[i+1][j] == size) {
                        return("clues are contradicting! Collision in Row ["+(i+1)+"] & Col[1]");
                    }
                }
                // ... as well as the same row in opposite direction
            } else if (cluesGrid[i+1][size+1] == 1) {
                if (cluesGrid[i+1][size] === true && resultGrid[i+1][size] !== size) {
                    return("clues are contradicting! Collision in Row ["+(i+1)+"] & Col["+size+"]");
                }
                cluesGrid[i+1][size] = true; // remove array stack with bool to mark done!
                resultGrid[i+1][size] = size; // write appropriate solution into result
                for (let j=2; j < size; j++) { // traverse rest of row and update narrow
                    if (cluesGrid[i+1][size-j+1] !== true) {
                        cluesGrid[i+1][size-j+1][size-1] = false;
                    } else if (resultGrid[i+1][size-j+1] == size) {
                        return("clues are contradicting! Collision in Row ["+(i+1)+"] & Col["+size+"]");
                    }
                }
            }       
        }

        let debug=true;
        // c - based on clue number, remove the trivial facing stair pattern
        // TODO basically copy/pasted from b
        // done: initial if check for values 2..size-1
        // TODO second nested ifs initially to catch contradictions (1,2,3,4)
        // TODO cluesGrid and Result update (1,2,3,4)
        // TODO for loop to traverse col to get stairs (1,2,3,4)
        for (let i=0; i < size; i++) {
            // target each column from top here ...
            if ((cluesGrid[0][i+1] > 1) && (cluesGrid[0][i+1] < size)) {
                for (let j=1; j<=cluesGrid[0][i+1]-1; j++) { // traverse clue-1 fields into col and step narrow
                    for (let stack=0; stack < j; stack++) { // TODO first iteration --> clues-1 fields
                        cluesGrid[1] = 3;// TODO actual field
                    }
                }
                // ... as well as same column from bottom here
            } else if ((cluesGrid[size+1][i+1] > 1) && (cluesGrid[size+1][i+1] < size)) {
                for (let j=1; j<=cluesGrid[size+1][i+1]-1; j++) { // traverse clue-1 fields into col and step narrow

                }
            }   // target each row here
            if ((cluesGrid[i+1][0] > 1) && (cluesGrid[i+1][0] < size)) {
                for (let j=1; j<=cluesGrid[i+1][0]-1; j++) { // traverse clue-1 fields into row and step narrow

                }
                // ... as well as the same row in opposite direction
            } else if ((cluesGrid[i+1][size+1] > 1) && (cluesGrid[i+1][size+1] < size)) {
                for (let j=1; j<=cluesGrid[i+1][size+1]-1; j++) { // traverse clue-1 fields into row and step narrow

                }
            }       
        }
        let debug=true; 
    } catch (error) {
        console.log("error occured: " + error)
    }
    
    return cluesGrid;
}

console.log(solvePuzzle([7,0,0,1,2,2,3, 0,0,3,0,0,0,1, 3,0,3,0,0,5,0, 0,0,0,0,5,0,4]));