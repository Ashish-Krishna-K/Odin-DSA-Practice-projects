# Odin-DSA-Practice-projects

A repository containing excercises to practice a few DSA concepts as part of [The Odin Project's](https://www.theodinproject.com/) JavaScript course.

_This project was initially completed during my first run of [The Odin Project](https://www.theodinproject.com/) as seen in [this](https://github.com/Ashish-Krishna-K/Odin-DSA-Practice-projects/tree/old) old branch. During my second run i'm revisiting few projects and have decided to use TypeScript as a practice with using it._

## Recursion

_Recursion is a programming technique where a function solves a problem by breaking it down into smaller instances of the same problem. In this approach, the function calls itself with modified input parameters, gradually working towards a base case where the solution is trivial. Recursion is widely used for solving problems that can be divided into smaller, similar subproblems._

The recursion module has a fibonacci function that returns fibonacci numbers uptill the number provided starting from 0. The module has an iterative solution and recursive solution and both is timed showing the difference in time taken by both approaches.

## MergeSort

_Mergesort is a sorting algorithm that follows the divide-and-conquer strategy. It recursively divides an array into smaller subarrays until they contain only one element each. Then, it merges these subarrays back together, comparing and combining elements to form a sorted output array. Mergesort is known for its stable performance and consistent time complexity._

Technically this module is also part of recursion module as mergeSort utilizes recursion to sort the given array. The module also compares the time taken by the in built Array.sort method provided by JavaScript and the mergeSort function on a small dataset and also a huge dataset. The results indicate that while the in-built sort method is faster on a small dataset, mergeSort is significantly faster in when the dataset is huge.

## Linked List

_A linked list is a linear data structure where elements, called nodes, are connected through pointers. Each node contains an element and a reference to the next node in the sequence. Unlike arrays, linked lists can dynamically grow and shrink, and elements can be efficiently inserted or removed from any position._

This module creates a LinkedList class which can be used in other places easily. The module has a few console.log statements showing a small demo of all the methods of the LinkedList class.

## Binary Search Tree

_A binary search tree (BST) is a binary tree data structure where each node has at most two children. The nodes are organized such that for every node, all elements in its left subtree are less than the node's element, while all elements in its right subtree are greater. BSTs enable efficient searching, insertion, and deletion operations._

This module too creates a Tree class that represents the binary search tree. Interesting point to be noted here is since for construction of a balanced binary search tree the input argument expected is a sorted array, I have decided to use the mergeSort function written in the mergeSort module to sort the input array.

The bst class also has a few methods for each of different traversal methods of a binary search tree, addtionally the levelOrder traversal method also has an iterative and a recursive versions each.

At the end the module includes a small driver function to display various methods of the class.

## Knights Travails

_In programming, graphs are data structures used to represent a collection of interconnected elements called nodes or vertices. These nodes are connected by edges, which represent relationships or connections between nodes. Graphs are versatile structures used to model various scenarios, such as social networks, computer networks, and more._

_Adjacency lists are a common way to represent graphs. In this representation, each vertex in the graph is associated with a list of its neighboring vertices. These lists of neighbors provide information about the edges and connections of the graph. Adjacency lists are memory-efficient for sparse graphs and support quick traversal of neighboring vertices._

_Breadth First Traversal is a graph traversal algorithm that explores a graph level by level. Starting from a chosen vertex, it visits all of its neighbors before moving on to their neighbors, and so on. This traversal strategy ensures that all nodes at a particular distance from the starting vertex are visited before moving farther away, making it useful for tasks like shortest path finding._

This is an interesting and challenging excercise. A knight in chess can move to any square on the standard 8x8 chess board from any other square on the board, given enough turns and the goal of this assignment was to write a script showing the shortest path a knight can travel from a given start position to a given end position.

This module makes use of a graph structure, or more specifically an adjacency list and breadth first search of the adjacency list to find the shortest path between two given nodes. In future i'm aiming to turn this interesting script into a command line tool.

**All definitions(in _italics_) are obtained from ChatGPT.**
