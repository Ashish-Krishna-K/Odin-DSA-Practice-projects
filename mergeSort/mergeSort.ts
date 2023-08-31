import {
  smallUnsortedArray,
  hugeUnsortedArray
} from "./input"

// A merge function to merge the left and right halves
const merge = <ArrayElements>(leftArray: ArrayElements[], rightArray: ArrayElements[]): ArrayElements[] => {
  // we need to compare an element of left array with an element of right array and if either of them is
  // lesser than we need to move on to the next item of only that array hence we need two variables to 
  // keep track of current position in left and right arrays respectively
  let leftIndex = 0;
  let rightIndex = 0;
  
  const sortedArray: ArrayElements[] = [];
  // ideally I should be comparing both leftArray and rightArray however in the past i've had troubles with
  // infinite loops in while loops while having more than one conditions hence i'm comparing only leftArray
  while (leftIndex < leftArray.length) {
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      // if the element of left array is lesser we'll add it to sortedArray and increment only the left 
      // index 
      sortedArray.push(leftArray[leftIndex]);
      leftIndex++
    } else {
      sortedArray.push(rightArray[rightIndex]);
      rightIndex++
    }
    // if the rigntIndex has already reached the end of the rightArray that means all the elements of 
    // rightArray is compared so we'll need to add the remaining elements of leftArray to the sorted
    // array(as it's already sorted) and break out of the loop.
    if (rightIndex >= rightArray.length) {
      sortedArray.push(...leftArray.slice(leftIndex));
      break;
    };
  }
  // if we've broken out of the loop but the rightIndex is less than the rightArray length it means
  // the loop has only completed comparing the elements of leftArray so we'll have to add the 
  // remaining elements of rightArray to the sortedArray
  if (rightIndex < rightArray.length) {
    sortedArray.push(...rightArray.slice(rightIndex));
  }

  return sortedArray;
}

// Sort the input array recursively
const mergeSort = <ArrayElements>(inputArray: ArrayElements[]): ArrayElements[] => {
  // our base case is if the input has only element then it's already sorted, so we can 
  // return it as it is.
  if (inputArray.length < 2) return inputArray;

  // calculate the midpoint and split the input array into two halves at the midpoint.
  const midPoint = Math.floor(inputArray.length / 2);
  // recursively calling the mergeSort function on both halves
  const leftHalf = mergeSort(inputArray.slice(0, midPoint));
  const rightHalf = mergeSort(inputArray.slice(midPoint));
  
  return merge(leftHalf, rightHalf);
}

// helper function to check if the array is actually sorted
const isSorted = (arr: number[]): boolean => {
  let sorted = true;

  // for each element of array if it's greater than the next element
  // then it means the array is not sorted, change the sorted boolean to
  // false and break out of loop
  for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i+1]) {
          sorted = false;
          break;
      }
  }
  return sorted;
}

// Time the start of mergeSort call on a small array
const smallArraySortTimeStart = performance.now()
const smallArray = mergeSort(smallUnsortedArray);
// Time the end of mergeSort call on a small array
const smallArraySortTimeEnd = performance.now();

// Time the start of mergeSort call on a huge array
const hugeArraySortTimeStart = performance.now();
const hugeArray = mergeSort(hugeUnsortedArray);
// Time the end of mergeSort call on a huge array
const hugeArraySortTimeEnd = performance.now();

// Time the start of built in sort method call on a small array
const builtInSortSmallArrayStart = performance.now();
const builtInSortSmallArray = smallUnsortedArray.slice().sort();
// Time the end of built in sort method call on a small array
const builtInSortSmallArrayEnd = performance.now();

// Time the start of built in sort method call on a huge array
const builtInSortHugeArrayStart = performance.now();
const builtInSortHugeArray = hugeUnsortedArray.slice().sort();
// Time the end of built in sort method call on a huge array
const builtInSortHugeArrayEnd = performance.now();

// checking if the returned arrays is actually sorted
const isSmallArraySorted = isSorted(smallArray);
const isHugeArraySorted = isSorted(hugeArray);

// display the results of the timings.
if (isSmallArraySorted) {
  console.log(`smallArray is sorted and the mergeSort function took ${smallArraySortTimeEnd - smallArraySortTimeStart} milliseconds to sort the smaller unsorted Array.`);
} else {
  console.log(`smallArray is not sorted and the mergeSort function took ${smallArraySortTimeEnd - smallArraySortTimeStart} milliseconds to fail in sorting the Array.`)
}
console.log(`while the built in sort method took ${builtInSortSmallArrayEnd - builtInSortSmallArrayStart} milliseconds to sort the small array`);
if (isHugeArraySorted) {
  console.log(`hugeArray is sorted and the mergeSort function took ${hugeArraySortTimeEnd - hugeArraySortTimeStart} milliseconds to sort the smaller unsorted Array.`)
} else {
  console.log(`hugeArray is not sorted and the mergeSort function took ${hugeArraySortTimeEnd - hugeArraySortTimeStart} milliseconds to fail in sorting the Array.`)
}
console.log(`while the built in sort method took ${builtInSortHugeArrayEnd - builtInSortHugeArrayStart} milliseconds to sort the small array`);

export default mergeSort;