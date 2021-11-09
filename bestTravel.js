function chooseBestSum(t, k, ls) {
    let solution = 0;
    let earlyReturn = false;
    const solve = (rolling=0, count = 0, index = 0) => {
        if (count===k) {
            if (rolling==t) {earlyReturn = true};
            if (rolling<=t && rolling>=solution) {solution=rolling};
            return;
        }
        for (let i=index; i<ls.length; i++) {
            if (earlyReturn) {return};
            solve(rolling+ls[i], count+1, i+1)
        }
        return;
    }
    solve();
    return (solution===0)?(null):(solution);
}

console.log(chooseBestSum(230, 3, [91, 74, 73, 85, 73, 81, 87]))
// t = 163, k = 3, ls = [50, 55, 56, 57, 58]
// resulting in -> 163
// adding comment to test JIRA integration
// adding another comment - resolve issue STAR-4 from commit MSG: STAR-4 #done #comment [commit msg goes here]
