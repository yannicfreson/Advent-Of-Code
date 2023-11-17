// Puzzle: https://adventofcode.com/2018/day/1

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2018/data/day-01.txt", "utf8")
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
  return input.split("\n").reduce((acc, curr) => acc + parseInt(curr), 0);
}

function partTwo(input) {
  let frequencies = new Set();
  let frequency = 0;
  let i = 0;
  let inputArray = input.split("\n");

  while (true) {
    frequency += parseInt(inputArray[i]);
    if (frequencies.has(frequency)) {
      return frequency;
    }
    frequencies.add(frequency);
    i = (i + 1) % inputArray.length;
  }
}

main();
