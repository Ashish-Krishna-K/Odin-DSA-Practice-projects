"use strict";
/*
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i + 2 < 8) {
        if (j - 1 > 0) {
          board[i][j].push([i+2, j-1]);
        }
        if (j + 1 < 8) {
          board[i][j].push([i+2, j+1]);
        }
      }
      if (i - 2 > 0) {
        if (j - 1 > 0) {
          board[i][j].push([i-2, j-1]);
        }
        if (j + 1 < 8) {
          board[i][j].push([i-2, j+1]);
        }
      }
      if (j + 2 < 8) {
        if (i + 1 < 8) {
          board[i][j].push([i+1, j+2]);
        }
        if (i - 1 > 0) {
          board[i][j].push([i-1, j+2]);
        }
      }
      if (j - 2 > 0) {
        if (i + 1 < 8) {
          board[i][j].push([i+1, j-2]);
        }
        if (i - 1 > 0) {
          board[i][j].push([i-1, j-2]);
        }
      }
    }
  }
*/
const generateBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 0; j < 8; j++) {
            board[i].push([]);
        }
    }
    return board;
};
const generateAllPossibleKnightMoves = () => {
    const board = generateBoard();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i + 2 < 8) {
                if (j - 1 > 0) {
                    board[i][j].push([i + 2, j - 1]);
                }
                if (j + 1 < 8) {
                    board[i][j].push([i + 2, j + 1]);
                }
            }
            if (i - 2 > 0) {
                if (j - 1 > 0) {
                    board[i][j].push([i - 2, j - 1]);
                }
                if (j + 1 < 8) {
                    board[i][j].push([i - 2, j + 1]);
                }
            }
            if (j + 2 < 8) {
                if (i + 1 < 8) {
                    board[i][j].push([i + 1, j + 2]);
                }
                if (i - 1 > 0) {
                    board[i][j].push([i - 1, j + 2]);
                }
            }
            if (j - 2 > 0) {
                if (i + 1 < 8) {
                    board[i][j].push([i + 1, j - 2]);
                }
                if (i - 1 > 0) {
                    board[i][j].push([i - 1, j - 2]);
                }
            }
        }
    }
    return board;
};
const allKnightMovesGraph = generateAllPossibleKnightMoves();
const traverseGraph = (graph, source) => {
    const [x, y] = source;
    const traversalHelperGraph = generateBoard();
    for (let i = 0; i < traversalHelperGraph.length; i++) {
        for (let j = 0; j < traversalHelperGraph.length; j++) {
            traversalHelperGraph[i][j] = {
                distance: null,
                predecessor: null,
            };
        }
    }
    const queue = [];
    traversalHelperGraph[x][y].distance = 0;
    graph[x][y].forEach((item) => {
        const helper = traversalHelperGraph[item[0]][item[1]];
        if (helper.distance === null)
            helper.predecessor = source;
        queue.push(item);
    });
    while (queue.length > 0) {
        const [currentX, currentY] = queue.shift();
        const helperNode = traversalHelperGraph[currentX][currentY];
        if (helperNode.distance === null) {
            const [predecessorX, predecessorY] = helperNode.predecessor;
            helperNode.distance = traversalHelperGraph[predecessorX][predecessorY].distance + 1;
            graph[currentX][currentY].forEach((item) => {
                const helper = traversalHelperGraph[item[0]][item[1]];
                if (helper.distance === null)
                    helper.predecessor = [currentX, currentY];
                queue.push(item);
            });
        }
    }
    return traversalHelperGraph;
};
const knightMoves = (start, end) => {
    const traversedGraph = traverseGraph(allKnightMovesGraph, start);
    const fullPath = [];
    fullPath.push(end);
    let pointer = traversedGraph[end[0]][end[1]];
    console.log(`You made it in ${pointer.distance} moves! Here's your path: `);
    while (pointer.distance !== 0) {
        const predecessor = pointer.predecessor;
        fullPath.push(predecessor);
        pointer = traversedGraph[predecessor[0]][predecessor[1]];
    }
    fullPath.reverse().forEach(item => console.log(item));
};
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);
