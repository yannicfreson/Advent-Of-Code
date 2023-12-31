// Puzzle: https://adventofcode.com/2015/day/12

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-12.txt", "utf8")
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
  let numbers = input.match(/(-?\d+)/g);
  numbers.forEach((number) => {
    result += parseInt(number);
  });
  return result;
}

function partTwo(input) {
  let result = 0;
  let inputAsJson = JSON.parse(input);

  function walk(obj) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        walk(item);
      });
    } else if (typeof obj === "object") {
      if (!Object.values(obj).some((value) => value === "red")) {
        Object.values(obj).forEach((value) => {
          walk(value);
        });
      }
    }

    if (typeof obj === "number") {
      result += obj;
    }
  }

  walk(inputAsJson);
  return result;
}

main();
