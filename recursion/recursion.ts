// Return fibonacci numbers using iteration.
const fibs = (input: number): number[] => {
  // An array to hold the fibonnaci numbers.
  const fibNums: number[] = []
  // loop from 0 to provided number to calculate the fibonacci numbers
  for (let i = 0; i < input; i++) {
    // if i is less than 2 we'll directly add it to the fibNums array
    // as fibonnaci number is a sum of previous two numbers we need
    // two starting or "seed" numbers in array
    if (i < 2) {
      fibNums[i] = i;
    } else {
      // calculate the fibonacci number by adding the previous number and 
      // the number previous to previous number
      fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
    }
  }
  // return the calculated fibonacci numbers
  return fibNums
}
// time the start time of the iterative version
const iterationBegin = performance.now();
const iteration = fibs(8)
// time the end of the iterative version
const iterationEnd = performance.now();
// output the calculated fibonacci numbers
console.log(iteration);
// output the time taken by the iterative version
console.log(`iterative approach completed in: ${(iterationEnd - iterationBegin)} milliseconds`)

// Return fibonacci numbers using recursion.
const fibsRec = (input: number): number[] => {
  // as fibonacci is calculated using previous 2 elements we'll need 
  // a starter or "seed" array of first two elements return this 
  // "seed" is going to be our base case
  if (input < 3) return [0, 1];
  // recursively call itself with input reducing by 1 each time.
  const fibNums = fibsRec(input - 1);
  // return an array with the elements returned by the previous recursive call 
  // at the beginning(since we're descending in recursive calls) and then append
  // the current fibonacci number to the array. To calculate the current fibonacci 
  // number we're adding the last number and last but one number of the fibNums array
  return [...fibNums, fibNums[fibNums.length - 1] + fibNums[fibNums.length - 2]];
}

// time the start of the recursive version
const recursiveBegin = performance.now();
const recursion = fibsRec(8);
// time the end of the recursive version
const recursiveEnd = performance.now();
// output the calculated fibonacci numbers
console.log(recursion);
// output the time taken by the recursive version.
console.log(`recursive approach completed in: ${recursiveEnd - recursiveBegin} milliseconds`)
