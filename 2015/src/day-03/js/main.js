// Puzzle: https://adventofcode.com/2015/day/3

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-03.txt", "utf8")
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
  let visitedHouses = new Set();
  let currentHouse = [0, 0];

  visitedHouses.add(currentHouse.join(","));

  input.split("").forEach((instruction) => {
    switch (instruction) {
      case "^":
        currentHouse[1]++;
        break;
      case "v":
        currentHouse[1]--;
        break;
      case ">":
        currentHouse[0]++;
        break;
      case "<":
        currentHouse[0]--;
        break;
    }

    visitedHouses.add(currentHouse.join(","));
  });

  return visitedHouses.size;
}

function partTwo(input) {
  let visitedHouses = new Set();
  let santaHouse = [0, 0];
  let robotHouse = [0, 0];

  visitedHouses.add(santaHouse.join(","));
  visitedHouses.add(robotHouse.join(","));

  input.split("").forEach((instruction, index) => {
    let currentHouse = index % 2 === 0 ? santaHouse : robotHouse;

    switch (instruction) {
      case "^":
        currentHouse[1]++;
        break;
      case "v":
        currentHouse[1]--;
        break;
      case ">":
        currentHouse[0]++;
        break;
      case "<":
        currentHouse[0]--;
        break;
    }

    visitedHouses.add(currentHouse.join(","));
  });

  return visitedHouses.size;
}

main();
