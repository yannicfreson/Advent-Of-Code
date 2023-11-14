// Puzzle: https://adventofcode.com/2017/day/6

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2017/data/day-06.txt", "utf8")
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
  let banks = input.split("\t").map(Number);
  let seen = new Set();
  let cycles = 0;

  while (!seen.has(banks.join(""))) {
    seen.add(banks.join(""));

    let max = Math.max(...banks);
    let index = banks.indexOf(max);
    banks[index] = 0;

    while (max > 0) {
      index = (index + 1) % banks.length;
      banks[index]++;
      max--;
    }

    cycles++;
  }

  return cycles;
}

function partTwo(input) {
  let banks = input.split("\t").map(Number);
  let seen = new Map();
  let cycles = 0;

  while (!seen.has(banks.join(""))) {
    seen.set(banks.join(""), cycles);

    let max = Math.max(...banks);
    let index = banks.indexOf(max);
    banks[index] = 0;

    while (max > 0) {
      index = (index + 1) % banks.length;
      banks[index]++;
      max--;
    }

    cycles++;
  }

  return cycles - seen.get(banks.join(""));
}

main();
