// Puzzle: https://adventofcode.com/2017/day/3

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2017/data/day-03.txt", "utf8")
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

function partOne(input) {
  let nearestOddSquare = calculateNearestOddSquare(input);

  let distanceFromCenter = Math.abs(nearestOddSquare - input);
  let sideLength = Math.sqrt(nearestOddSquare);
  let side = Math.floor(sideLength / 2);

  let distanceFromSideCenter = distanceFromCenter % (sideLength - 1);
  let distance = Math.abs(distanceFromSideCenter - side);

  return side + distance;
}

function partTwo(input) {
  let x = 0;
  let y = 0;
  let matrix = {};
  matrix[`${x},${y}`] = 1;

  while (true) {
    let val = getValue(matrix, x, y);
    if (val >= input) {
      return val;
    }
    matrix[`${x},${y}`] = val;

    if ((x !== y || x >= 0) && Math.abs(x) <= Math.abs(y)) {
      x += y >= 0 ? 1 : -1;
    } else {
      y += x >= 0 ? -1 : 1;
    }
  }
}

function calculateNearestOddSquare(input) {
  let square = 0;
  let i = 1;
  while (square < input) {
    square = Math.pow(i, 2);
    i += 2;
  }
  return square;
}

function getValue(matrix, x, y) {
  let sum = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (matrix[`${i},${j}`]) {
        sum += matrix[`${i},${j}`];
      }
    }
  }
  return sum;
}

main();
