type Helpers = {
  distance: null | number;
  predecessor: null | Coordinates;
}
type Coordinates = [number, number];
type GameBoard = Coordinates[][][];

// a factory for a gameboard array.
const generateBoard = () => {
  const board:GameBoard = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i].push([]);
    }
  }
  return board;
}

// generate all possible moves a knight can make
const generateAllPossibleKnightMoves = () => {
  const board = generateBoard();
  // visiting all tiles in the board calculate the next place to 
  // move to and if it's not out of bounds add it to the board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // travel 2 places to the right without going out of bounds
      if (i + 2 < 8) {
        // travel one place down without going out of bounds
        if (j - 1 > 0) {
          board[i][j].push([i+2, j-1]);
        }
        // travel one place up without going out of bounds
        if (j + 1 < 8) {
          board[i][j].push([i+2, j+1]);
        }
      }
      // travel 2 places to the left without going out of bounds
      if (i - 2 > 0) {
        // travel 1 place down without going out of bounds
        if (j - 1 > 0) {
          board[i][j].push([i-2, j-1]);
        }
        // travel 1 place to right without going out of bounds
        if (j + 1 < 8) {
          board[i][j].push([i-2, j+1]);
        }
      }
      // travel 2 places to the right without going out of bounds
      if (j + 2 < 8) {
        // travel one place up without going out of bounds
        if (i + 1 < 8) {
          board[i][j].push([i+1, j+2]);
        }
        // travel one place down without going out of bounds
        if (i - 1 > 0) {
          board[i][j].push([i-1, j+2]);
        }
      }
      // travel 2 places to left without going out of bounds
      if (j - 2 > 0) {
        // travel 1 place up without going out of bounds
        if (i + 1 < 8) {
          board[i][j].push([i+1, j-2]);
        }
        // travel 1 place down without going out of bounds
        if (i - 1 > 0) {
          board[i][j].push([i-1, j-2]);
        }
      }
    }
  } 
  return board;
}

// save all knight moves in an array
const allKnightMovesGraph = generateAllPossibleKnightMoves();

// create a helper graph to map the distance from source and 
// predecessor during traversal
const generateHelperGraph = () => {
  const board: Helpers[][] = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = {
        distance: null,
        predecessor: null,
      }
    }
  }
  return board
} 

// traverse the graph from the source marking the distance and predecessors
const traverseGraph = (graph: GameBoard, source:Coordinates) => {
  // create a new helper graph for traversal
  const helperGraph = generateHelperGraph();
  // destructuring the source argument for making array access more readable
  const [x, y] = source;
  // traversing through the graph while keeping track of neighbour nodes in a 
  // queue to be visited later
  const queue:Coordinates[]  = [];
  // setting the distance of source node to 0
  helperGraph[x][y].distance = 0;
  // marking the source as predecessor for each of the child nodes of source
  // before adding the child nodes to queue, because i couldn't figure out another
  // way to keep track of predecessor inside the while loop
  graph[x][y].forEach((item: Coordinates) => {
    const [helperX, helperY] = item;
    const helper = helperGraph[helperX][helperY];
    // if the child node's distance is not null that means we have already 
    // visited that node, so we will only mark the nodes which is not visited
    if (helper.distance === null) helper.predecessor = source;
    queue.push(item);
  })
  // process all items in queue untill queue length goes to 0
  while(queue.length > 0) {
    // array desturcturing for readability
    const [currentX, currentY] = queue.shift() || [];
    if (currentX && currentY) {
      const helperNode = helperGraph[currentX][currentY];
      // once again we won't process the node if it's already visited
      // which is indicated by distance being not null.
      if (helperNode.distance === null) {
        const [predecessorX, predecessorY] = helperNode.predecessor || [];
        if (predecessorX && predecessorY) {
          const predecessorHelper = helperGraph[predecessorX][predecessorY];
          if (predecessorHelper.distance !== null) {
            helperNode.distance = predecessorHelper.distance + 1;
          }
        }
        // marking the predecessor in each of child nodes and adding child nodes to
        // the queue.
        graph[currentX][currentY].forEach((item: Coordinates) => {
          const [helperX, helperY] = item
          const helper = helperGraph[helperX][helperY]
          if (helper.distance === null) helper.predecessor = [currentX, currentY];
          queue.push(item);
        })
      }
    }
  }
  return helperGraph;
}

// the function the user interacts with to calculate the number of steps 
// needed from provided start to provided end and the full path
const knightMoves = (start: Coordinates, end: Coordinates) => {
  // traverse the graph with the provided start node
  const traversedGraph = traverseGraph(allKnightMovesGraph, start);
  // keep track of the full path in an array so it can be reversed easily
  const fullPath = [];
  fullPath.push(end);
  // start traversing backwards from the destination
  let pointer = traversedGraph[end[0]][end[1]];
  // display the number of steps taken to the user
  console.log(`You made it in ${pointer.distance} moves! Here's your path: `);
  // traversing untill the pointer's distance reaches 0
  while (pointer.distance !== 0) {
    const predecessor = pointer.predecessor; 
    if (predecessor) {
      fullPath.push(predecessor);
      pointer = traversedGraph[predecessor[0]][predecessor[1]];
    }
  }
  // reverse the full path array to show the user the path starting from 
  // the provided start position
  fullPath.reverse().forEach(item => console.log(item));
}

knightMoves([3,3], [4,3]);
knightMoves([0,0], [7,7]);