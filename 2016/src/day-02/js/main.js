// Puzzle: https://adventofcode.com/2016/day/2

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-02.txt", "utf8")
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
  let keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let instructions = input.split("\n");
  let code = "";
  let x = 1;
  let y = 1;

  for (let instruction of instructions) {
    for (let move of instruction) {
      switch (move) {
        case "U":
          y = Math.max(0, y - 1);
          break;
        case "D":
          y = Math.min(2, y + 1);
          break;
        case "L":
          x = Math.max(0, x - 1);
          break;
        case "R":
          x = Math.min(2, x + 1);
          break;
      }
    }
    code += keypad[y][x];
  }

  return code;
}

function partTwo(input) {
  let keypad = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, "A", "B", "C", null],
    [null, null, "D", null, null],
  ];

  let instructions = input.split("\n");
  let code = "";
  let x = 0;
  let y = 2;

  for (let instruction of instructions) {
    for (let move of instruction) {
      let newX = x;
      let newY = y;

      switch (move) {
        case "U":
          newY = Math.max(0, y - 1);
          break;
        case "D":
          newY = Math.min(4, y + 1);
          break;
        case "L":
          newX = Math.max(0, x - 1);
          break;
        case "R":
          newX = Math.min(4, x + 1);
          break;
      }

      if (keypad[newY][newX] !== null) {
        x = newX;
        y = newY;
      }
    }
    code += keypad[y][x];
  }

  return code;
}

main();
