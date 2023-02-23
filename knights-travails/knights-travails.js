// We will use a queue to keep track of edges during 
// Breadth-first search later!
class Queue {
  #queue = [];
  view() {
    return JSON.stringify(this.#queue);
  }
  enqueue(value) {
    this.#queue.push(value);
  }
  dequeue() {
    return this.#queue.shift();
  }
  isEmpty() {
    return this.#queue.length === 0;
  }
}

// BFSHelper keeps track of the previous node and distance
// from source 

class BFSHelper {
  constructor() {
    this.queue = generateFreshHelperArray()
  }
  generateFreshHelperArray() {

  }
}

const generateBoard = () => {
  const board = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push([i, j]);
    }
  }
  return board;
}

// next 8 functions will simply calculate possible moves
// the knight can make given a starting point
// there maybe a better way to acheive this, unfortunately
// this is all I was able to come up with.
// Yeah not my brightest idea lol.

const moveXPlusOnePositiveY = (coordinate) => {
  // making sure to not mutate the original array!!!
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] + 1;
  newCoordinate[1] = coordinate[1] + 2;
  return newCoordinate;
};

const moveXPlusOneNegativeY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] + 1;
  newCoordinate[1] = coordinate[1] - 2;
  return newCoordinate;
};

const moveXPlusTwoPositiveY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] + 2;
  newCoordinate[1] = coordinate[1] + 1;
  return newCoordinate;
};

const moveXPlusTwoNegativeY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] + 2;
  newCoordinate[1] = coordinate[1] - 1;
  return newCoordinate;
};

const moveXMinusOnePositiveY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] - 1;
  newCoordinate[1] = coordinate[1] + 2;
  return newCoordinate;
};

const moveXMinusOneNegativeY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] - 1;
  newCoordinate[1] = coordinate[1] - 2;
  return newCoordinate;
};

const moveXMinusTwoPositiveY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] - 2;
  newCoordinate[1] = coordinate[1] + 1;
  return newCoordinate;
};

const moveXMinusTwoNegativeY = (coordinate) => {
  const newCoordinate = [];
  newCoordinate[0] = coordinate[0] - 2;
  newCoordinate[1] = coordinate[1] - 1;
  return newCoordinate;
};

// making use of the above helper functions to get an
// array of all possible moves a knight can make from
// a given starting point.
const generatePossibleMoves = (startingPoint) => {
  // Why am i usign a set here? Because it's the most 
  // easiest way to avoid duplicates in an array
  const movesMade = new Set();
  movesMade.add(moveXPlusOnePositiveY(startingPoint));
  movesMade.add(moveXPlusOneNegativeY(startingPoint));
  movesMade.add(moveXPlusTwoPositiveY(startingPoint));
  movesMade.add(moveXPlusTwoNegativeY(startingPoint));
  movesMade.add(moveXMinusOnePositiveY(startingPoint));
  movesMade.add(moveXMinusOneNegativeY(startingPoint));
  movesMade.add(moveXMinusTwoPositiveY(startingPoint));
  movesMade.add(moveXMinusTwoNegativeY(startingPoint));
  return Array.from(movesMade).filter(move => gameBoard.some(tile => JSON.stringify(move) === JSON.stringify(tile)));
}

// I'm calling it a tree but it's actually an adjacency list!
const allPossibleMovesTree = () => {
  const tree = [];
  gameBoard.forEach(tile => {
    tree.push(generatePossibleMoves(tile));
  });
  return tree;
}

// This was a helper function I wrote to help visualise
// the adjacency list during dev.
// It's totally useless in prod but decided to keep it 
// cause why not?
const prettyPrintTree = () => {
  for (let i = 0; i < 65; i++) {
    const str = `${JSON.stringify(gameBoard[i])} -> ${JSON.stringify(tree[i])}`;
    console.log(str);
  }
}

// We need to get the index of a given co-ordinate multiple
// times so decided to extract it into a simple helper function.
const getIndexOfTile = (tile) => {
  return gameBoard.findIndex(item => JSON.stringify(item) === JSON.stringify(tile));
};

// Easiest way to compare if two objects/arrays is equal!
const isEqual = (item1, item2) => {
  return JSON.stringify(item1) === JSON.stringify(item2)
}

// we need an array called bfshelper to keep track of distance
// from source and predecessor and this array needs a hard reset
// before every new call to knightMoves!
const generateBfsHelper = () => {
  const tempArray = [];
  for (let i = 0; i < gameBoard.length; i++) {
    tempArray[i] = { distance: null, previousNode: null }
  }
  return tempArray
};

const doBFS = (start) => {
  const queue = new Queue;
  const srcIndex = getIndexOfTile(start);
  const srcBfs = bfsHelper[srcIndex];
  srcBfs.distance = 0;
  tree[srcIndex].forEach(child => {
    // This is a little hack! I'm marking the predecessor even
    // before visiting a given child to make things easier.
    const childIndex = getIndexOfTile(child);
    const childBfs = bfsHelper[childIndex];
    if (childBfs.distance === null) {
      childBfs.previousNode = srcIndex;
    }
    queue.enqueue(child);
  });
  while (!queue.isEmpty()) {
    const next = queue.dequeue();
    const srcIndex = getIndexOfTile(next);
    const srcBfs = bfsHelper[srcIndex];
    if (srcBfs.distance === null) {
      const prevsNodeBfs = bfsHelper[srcBfs.previousNode];
      srcBfs.distance = prevsNodeBfs.distance + 1;
      tree[srcIndex].forEach(child => {
        const childIndex = getIndexOfTile(child);
        const childBfs = bfsHelper[childIndex];
        if (childBfs.distance === null) {
          childBfs.previousNode = srcIndex;
        }
        queue.enqueue(child);
      });
    }
  };
}

// I apologies for this ugly bit code here!
const knightMoves = (start, end) => {
  doBFS(start);
  const targetIndex = getIndexOfTile(end);
  const routeTaken = [];
  routeTaken.push(end);
  let targetBfs = bfsHelper[targetIndex];
  let previousNodeIndex = targetBfs.previousNode;
  while (previousNodeIndex) {
    let prevsNode = gameBoard[previousNodeIndex];
    routeTaken.push(prevsNode);
    let currentBfs = bfsHelper[previousNodeIndex]
    previousNodeIndex = currentBfs.previousNode;
  }
  let returnString = `Your knight moved from ${JSON.stringify(start)} to ${JSON.stringify(end)} in ${targetBfs.distance} moves! \n Here's your path: `;
  routeTaken.reverse().forEach(tile => {
    returnString += `\n ${JSON.stringify(tile)}`
  });
  console.log(returnString);
};

const generateRandomCoordinates = () => Math.floor(Math.random() * 7)

const gameBoard = generateBoard();
const tree = allPossibleMovesTree();

let bfsHelper = generateBfsHelper();

knightMoves([3, 3], [4, 3]);

bfsHelper = generateBfsHelper();

knightMoves(
  [generateRandomCoordinates(), generateRandomCoordinates()],
  [generateRandomCoordinates(), generateRandomCoordinates()],
);

bfsHelper = generateBfsHelper();

knightMoves(
  [generateRandomCoordinates(), generateRandomCoordinates()],
  [generateRandomCoordinates(), generateRandomCoordinates()],
);

bfsHelper = generateBfsHelper();

knightMoves(
  [generateRandomCoordinates(), generateRandomCoordinates()],
  [generateRandomCoordinates(), generateRandomCoordinates()],
);

