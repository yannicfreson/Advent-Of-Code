// Puzzle: https://adventofcode.com/2019/day/1

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2019/data/day-01.txt", "utf8")
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
  return input.split("\n").reduce((acc, curr) => {
    return acc + Math.floor(curr / 3) - 2;
  }, 0);
}

function partTwo(input) {
  return input.split("\n").reduce((acc, curr) => {
    let total = 0;
    let fuel = Math.floor(curr / 3) - 2;
    while (fuel > 0) {
      total += fuel;
      fuel = Math.floor(fuel / 3) - 2;
    }
    return acc + total;
  }, 0);
}

main();
