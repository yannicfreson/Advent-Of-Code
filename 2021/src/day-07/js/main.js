// Puzzle: https://adventofcode.com/2021/day/7

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2021/data/day-07.txt", "utf8")
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
  let crabs = input.split(",").map(Number);

  let fuelSpent = 0;

  let median = crabs.sort((a, b) => a - b)[Math.floor(crabs.length / 2)];

  crabs.forEach((crab) => {
    fuelSpent += Math.abs(crab - median);
  });

  return fuelSpent;
}

function partTwo(input) {
  let crabs = input.split(",").map(Number);

  let minFuelSpent = Infinity;

  let lowestPosition = crabs.sort((a, b) => a - b)[0];
  let highestPosition = crabs.sort((a, b) => b - a)[0];

  for (let i = lowestPosition; i <= highestPosition; i++) {
    let fuelSpent = 0;
    let distanceFromPosition;
    crabs.forEach((crab) => {
      distanceFromPosition = Math.abs(crab - i);
      for (let j = 0; j < distanceFromPosition; j++) {
        fuelSpent += j + 1;
      }
    });

    if (fuelSpent < minFuelSpent) {
      minFuelSpent = fuelSpent;
    }
  }

  return minFuelSpent;
}

main();
