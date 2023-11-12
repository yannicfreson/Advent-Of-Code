// Puzzle: https://adventofcode.com/2017/day/1

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2017/data/day-01.txt", "utf8")
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
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    let current = input[i];
    let next = input[i + 1] || input[0];

    if (current === next) {
      sum += parseInt(current, 10);
    }
  }

  return sum;
}

function partTwo(input) {
  let sum = 0;
  let half = input.length / 2;

  for (let i = 0; i < input.length; i++) {
    let current = input[i];
    let next = input[i + half] || input[i - half];

    if (current === next) {
      sum += parseInt(current, 10);
    }
  }

  return sum;
}

main();
