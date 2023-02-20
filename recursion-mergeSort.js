const mergeSort = (arr) => {
  // if input has only one element it's already sorted!
  if (arr.length < 2) return arr;

  // find the mid point to split input array into two halves.
  const mid = arr.length / 2;
  // using slice here means we're creating a copy so the original array is not modified!
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);

  //recursively calling mergeSort function on both halves!
  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  // below here is where we are doing the actual merging.
  const sortedArray = [];
  let i = 0;
  let j = 0;

  // using a while loop we will compare each element of each half and append the lower of the 
  // two elements to the sorted array
  while (i < sortedLeft.length && j < sortedRight.length) {
    if (sortedLeft[i] < sortedRight[j]) {
      sortedArray.push(sortedLeft[i]);
      i++;
    } else {
      sortedArray.push(sortedRight[j]);
      j++;
    }
  }

  // either of the two halves will be left over with some items which will then be appended to 
  // the sorted array(the leftover items are already sorted)
  if (i < sortedLeft.length) sortedArray.push(...sortedLeft.slice(i));
  if (j < sortedRight.length) sortedArray.push(...sortedRight.slice(j));

  return sortedArray;
}

console.log(mergeSort([7, 100, 73, 47, 26]))

