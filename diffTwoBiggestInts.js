const diffBig2 = (arr, memo=0) => {
    console.log("+1 call!");
    let lol = !arr.length;
    if(arr.length<=1) {return (!!arr.length)?(arr[arr.length-1]-memo):(0)}
    memo = arr[+(arr[0]>arr[1])];
    return diffBig2(arr.filter(x => x>memo),memo);
}
console.time("lol");
console.log(diffBig2([1,2,3,4,5,6,7,8,9]));
console.time("!");