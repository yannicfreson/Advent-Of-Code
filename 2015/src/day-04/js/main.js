// Puzzle: https://adventofcode.com/2015/day/4

const fs = require("fs");
const md5 = require("js-md5");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-04.txt", "utf8")
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
  let result = 0;
  let hash = "";
  let hashFound = false;
  let i = 0;

  while (!hashFound) {
    hash = md5(input + i);
    if (hash.startsWith("00000")) {
      hashFound = true;
      result = i;
    }
    i++;
  }

  return result;
}

function partTwo(input) {
  let result = 0;
  let hash = "";
  let hashFound = false;
  let i = 0;

  while (!hashFound) {
    hash = md5(input + i);
    if (hash.startsWith("000000")) {
      hashFound = true;
      result = i;
    }
    i++;
  }

  return result;
}

main();
