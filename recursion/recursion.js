"use strict";
const fibs = (input) => {
    const fibNums = [];
    for (let i = 0; i < input; i++) {
        if (i < 2) {
            fibNums[i] = i;
        }
        else {
            fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
        }
    }
    return fibNums;
};
const iterationBegin = performance.now();
const iteration = fibs(8);
const iterationEnd = performance.now();
console.log(iteration);
console.log(`iterative approach completed in: ${(iterationEnd - iterationBegin)} milliseconds`);
const fibsRec = (input) => {
    if (input < 3)
        return [0, 1];
    const fibNums = fibsRec(input - 1);
    return [...fibNums, fibNums[fibNums.length - 1] + fibNums[fibNums.length - 2]];
};
const recursiveBegin = performance.now();
const recursion = fibsRec(8);
const recursiveEnd = performance.now();
console.log(recursion);
console.log(`recursive approach completed in: ${recursiveEnd - recursiveBegin} milliseconds`);
