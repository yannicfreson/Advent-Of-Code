// Puzzle: https://adventofcode.com/2017/day/4

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2017/data/day-04.txt", "utf8")
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
  let lines = input.split("\n");
  let valid = 0;

  for (let line of lines) {
    let words = line.split(" ");
    let set = new Set(words);
    if (words.length === set.size) {
      valid++;
    }
  }

  return valid;
}

function partTwo(input) {
  let lines = input.split("\n");
  let valid = 0;

  for (let line of lines) {
    let words = line.split(" ");
    let set = new Set(words.map((word) => word.split("").sort().join("")));
    if (words.length === set.size) {
      valid++;
    }
  }

  return valid;
}

main();
