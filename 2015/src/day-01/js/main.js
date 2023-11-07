// Puzzle: https://adventofcode.com/2015/day/1

const fs = require("fs");

const INPUT = fs.readFileSync("../../../../2015/data/day-01.txt", "utf8");

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
  return input
    .split("")
    .reduce((acc, char) => (char === "(" ? acc + 1 : acc - 1), 0);
}

function partTwo(input) {
  let floor = 0;
  let position = 0;
  let positionForBasement = 1;
  let positionForBasementFound = false;

  input.split("").forEach((char) => {
    position++;
    if (char === "(") {
      floor++;
    } else if (char === ")") {
      floor--;
    }
    if (floor === -1 && !positionForBasementFound) {
      positionForBasement = position;
      positionForBasementFound = true;
    }
  });

  return positionForBasement;
}

main();
