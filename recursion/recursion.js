var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fibs = function (input) {
    var fibNums = [];
    for (var i = 0; i < input; i++) {
        if (i < 2) {
            fibNums[i] = i;
        }
        else {
            fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
        }
    }
    return fibNums;
};
var iterationBegin = performance.now();
var iteration = fibs(8);
var iterationEnd = performance.now();
console.log(iteration);
console.log("iterative approach completed in: ".concat((iterationEnd - iterationBegin), " milliseconds"));
var fibsRec = function (input) {
    if (input < 3)
        return [0, 1];
    var fibNums = fibsRec(input - 1);
    return __spreadArray(__spreadArray([], fibNums, true), [fibNums[fibNums.length - 1] + fibNums[fibNums.length - 2]], false);
};
var recursiveBegin = performance.now();
var recursion = fibsRec(8);
var recursiveEnd = performance.now();
console.log(recursion);
console.log("recursive approach completed in: ".concat(recursiveEnd - recursiveBegin, " milliseconds"));
