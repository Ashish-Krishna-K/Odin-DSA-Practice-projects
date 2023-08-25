import {
  smallUnsortedArray,
  hugeUnsortedArray
} from "./input"

const merge = (leftArray: number[], rightArray: number[]): number[] => {
  let leftIndex = 0;
  let rightIndex = 0;
  const sortedArray: number[] = [];
  while (leftIndex < leftArray.length) {
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      sortedArray.push(leftArray[leftIndex]);
      leftIndex++
    } else {
      sortedArray.push(rightArray[rightIndex]);
      rightIndex++
    }
    if (rightIndex >= rightArray.length) {
      sortedArray.push(...leftArray.slice(leftIndex));
      break;
    };
  }
  if (rightIndex < rightArray.length) {
    sortedArray.push(...rightArray.slice(rightIndex));
  }
  return sortedArray;
}

const mergeSort = (inputArray: number[]): number[] => {
  if (inputArray.length < 2) return inputArray;

  const midPoint = Math.floor(inputArray.length / 2);
  const leftHalf = mergeSort(inputArray.slice(0, midPoint));
  const rightHalf = mergeSort(inputArray.slice(midPoint));
  return merge(leftHalf, rightHalf);
}

const isSorted = (arr: number[]): boolean => {
  let sorted = true;

  for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i+1]) {
          sorted = false;
          break;
      }
  }
  return sorted;
}

const smallArraySortTimeStart = performance.now()
const smallArray = mergeSort(smallUnsortedArray);
const smallArraySortTimeEnd = performance.now();

const hugeArraySortTimeStart = performance.now();
const hugeArray = mergeSort(hugeUnsortedArray);
const hugeArraySortTimeEnd = performance.now();

const builtInSortSmallArrayStart = performance.now();
const builtInSortSmallArray = smallUnsortedArray.slice().sort();
const builtInSortSmallArrayEnd = performance.now();

const builtInSortHugeArrayStart = performance.now();
const builtInSortHugeArray = hugeUnsortedArray.slice().sort();
const builtInSortHugeArrayEnd = performance.now();

const isSmallArraySorted = isSorted(smallArray);
const isHugeArraySorted = isSorted(hugeArray);

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