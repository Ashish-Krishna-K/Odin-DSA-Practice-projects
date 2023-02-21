//Using Iteration 
const fibs = (num) => {
  const fibsArr = [0, 1];
  for (let i = 0; i < num - 2; i++) {
    const arrLength = fibsArr.length;
    fibsArr.push(fibsArr[arrLength - 1] + fibsArr[arrLength - 2]);
  }
  return fibsArr;
};

console.log(fibs(8));

//Using Recursion
const fibsRec = (num) => {
  return num < 0 ? num : [...fibsRec(num - 1)];
};

console.log(fibs(8));