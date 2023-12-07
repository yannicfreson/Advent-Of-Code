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
  let minFuelSpentPosition = 0;

  let smallestPosition = crabs.indexOf(Math.min(...crabs));
  let largestPosition = crabs.indexOf(Math.max(...crabs));

  for (let i = smallestPosition; i < largestPosition; i++) {
    let fuelSpent = 0;
    crabs.forEach((crab) => {
      // calculate the distance between the crab and i, and add it to the fuelSpent. keep in mind that every move consumes 1 more fuel than the previous one. so if the crab moves 1 step, it consumes 1 fuel. if it moves 2 steps, it consumes 3 fuel. if it moves 3 steps, it consumes 6 fuel. and so on.
      fuelSpent += Math.abs(crab - i);
    });

    // if the fuelSpent is less than the minFuelSpent, set the minFuelSpent to the fuelSpent
    if (fuelSpent < minFuelSpent) {
      minFuelSpent = fuelSpent;
      minFuelSpentPosition = i;
    }
  }

  return minFuelSpent;
}

main();
