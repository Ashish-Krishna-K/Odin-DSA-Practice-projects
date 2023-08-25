const smallUnsortedArray: number[] = [17, 9, 3, 12, 6, 20, 7, 11, 1, 16, 19, 8, 5, 18, 10, 14, 2, 15, 4, 13];

const generateRandomArray = (): number[] => {
  const set = new Set<number>();
  while (set.size < 1000000) {
    set.add(Math.floor(Math.random() * 165156416513));
  }
  return Array.from(set);
}

const hugeUnsortedArray: number[] = generateRandomArray();

export {
  smallUnsortedArray,
  hugeUnsortedArray
}