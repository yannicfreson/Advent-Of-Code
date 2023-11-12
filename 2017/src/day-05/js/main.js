// Puzzle: https://adventofcode.com/2017/day/5

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2017/data/day-05.txt", "utf8")
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
  let instructions = input.split("\n").map(Number);
  let steps = 0;
  let index = 0;

  while (index < instructions.length) {
    let jump = instructions[index];
    instructions[index]++;
    index += jump;
    steps++;
  }

  return steps;
}

function partTwo(input) {
  let instructions = input.split("\n").map(Number);
  let steps = 0;
  let index = 0;

  while (index < instructions.length) {
    let jump = instructions[index];
    if (jump >= 3) {
      instructions[index]--;
    } else {
      instructions[index]++;
    }
    index += jump;
    steps++;
  }

  return steps;
}

main();
