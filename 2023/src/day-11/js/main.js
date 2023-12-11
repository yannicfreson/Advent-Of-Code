// Puzzle: https://adventofcode.com/2023/day/11

const exp = require("constants");
const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-11.txt", "utf8")
  .trim();

function main() {
  let now = Date.now();
  let part1 = partOne(INPUT);
  let duration = Date.now() - now;
  console.log(`Part 1: ${part1} (took: ${duration}ms)`);

  now = Date.now();
  let part2 = partTwo(INPUT);
  duration = Date.now() - now;
  console.log(`Part 2: ${part2} (took: ${duration}ms)`);
}

function partOne(input, amount = 100) {
  const grid = input.split("\n").map((row) => row.split(""));
  const coords = [];
  const emptyRows = [];
  const emptyCols = [];

  // Find the coords of all the galaxies
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "#") {
        coords.push({ row, col });
      }
    }
  }

  // Find the empty rows and columns
  for (let row = 0; row < grid.length; row++) {
    if (rowIsEmpty(grid[row])) {
      emptyRows.push(row);
    }
  }

  for (let col = 0; col < grid[0].length; col++) {
    if (colIsEmpty(grid, col)) {
      emptyCols.push(col);
    }
  }

  // Calculate the new coords of the galaxies
  coords.forEach((coord) => {
    coord.rowsBigger = emptyRows.filter(
      (emptyRow) => coord.row > emptyRow
    ).length;
    coord.row += amount * coord.rowsBigger;

    coord.colsBigger = emptyCols.filter(
      (emptyCol) => coord.col > emptyCol
    ).length;
    coord.col += amount * coord.colsBigger;
  });

  // Calculate the distances between all the galaxies
  const distances = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const coord = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const otherCoord = coords[j];
      distances.push(
        manhattanDistance(coord.row, coord.col, otherCoord.row, otherCoord.col)
      );
    }
  }

  // Return the sum of all the distances
  return distances.reduce((sum, distance) => sum + distance, 0);
}

function partTwo(input) {
  return partOne(input, 999999);
}

function rowIsEmpty(row) {
  return row.every((cell) => cell === ".");
}

function colIsEmpty(grid, col) {
  return grid.every((row) => row[col] === ".");
}

function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

main();
