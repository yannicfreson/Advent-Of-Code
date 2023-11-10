// Puzzle: https://adventofcode.com/2016/day/3

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-03.txt", "utf8")
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
    let sides = line.trim().split(/\s+/).map(Number);
    let [a, b, c] = sides.sort((a, b) => a - b);

    if (a + b > c) {
      valid++;
    }
  }

  return valid;
}

function partTwo(input) {
  let lines = input.split("\n");
  let valid = 0;

  let columns = [[], [], []];

  for (let line of lines) {
    let sides = line.trim().split(/\s+/).map(Number);
    columns[0].push(sides[0]);
    columns[1].push(sides[1]);
    columns[2].push(sides[2]);
  }

  let sides = columns.flat();

  for (let i = 0; i < sides.length; i += 3) {
    let [a, b, c] = sides.slice(i, i + 3).sort((a, b) => a - b);

    if (a + b > c) {
      valid++;
    }
  }

  return valid;
}

main();
