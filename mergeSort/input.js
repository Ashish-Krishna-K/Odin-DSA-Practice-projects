"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hugeUnsortedArray = exports.smallUnsortedArray = void 0;
const smallUnsortedArray = [17, 9, 3, 12, 6, 20, 7, 11, 1, 16, 19, 8, 5, 18, 10, 14, 2, 15, 4, 13];
exports.smallUnsortedArray = smallUnsortedArray;
const generateRandomArray = () => {
    const set = new Set();
    while (set.size < 1000000) {
        set.add(Math.floor(Math.random() * 165156416513));
    }
    return Array.from(set);
};
const hugeUnsortedArray = generateRandomArray();
exports.hugeUnsortedArray = hugeUnsortedArray;
