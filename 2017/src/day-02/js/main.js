// Puzzle: https://adventofcode.com/2017/day/2

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2017/data/day-02.txt", "utf8")
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
  let checksum = 0;

  for (let line of lines) {
    let numbers = line.split("\t");
    let min = Math.min(...numbers);
    let max = Math.max(...numbers);
    checksum += max - min;
  }

  return checksum;
}

function partTwo(input) {
  let lines = input.split("\n");
  let result = 0;

  for (let line of lines) {
    let numbers = line.split("\t");

    for (let i = 0; i < numbers.length; i++) {
      let current = parseInt(numbers[i], 10);

      for (let j = 0; j < numbers.length; j++) {
        let next = parseInt(numbers[j], 10);

        if (current !== next && current % next === 0) {
          result += current / next;
        }
      }
    }
  }

  return result;
}

main();
