// Puzzle: https://adventofcode.com/2016/day/6

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-06.txt", "utf8")
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
  let message = "";
  for (let i = 0; i < lines[0].length; i++) {
    let counts = {};
    for (let j = 0; j < lines.length; j++) {
      let char = lines[j][i];
      counts[char] = counts[char] ? counts[char] + 1 : 1;
    }
    let max = 0;
    let maxChar = "";
    for (let char in counts) {
      if (counts[char] > max) {
        max = counts[char];
        maxChar = char;
      }
    }
    message += maxChar;
  }
  return message;
}

function partTwo(input) {
  let lines = input.split("\n");
  let message = "";
  for (let i = 0; i < lines[0].length; i++) {
    let counts = {};
    for (let j = 0; j < lines.length; j++) {
      let char = lines[j][i];
      counts[char] = counts[char] ? counts[char] + 1 : 1;
    }
    let min = Number.MAX_SAFE_INTEGER;
    let minChar = "";
    for (let char in counts) {
      if (counts[char] < min) {
        min = counts[char];
        minChar = char;
      }
    }
    message += minChar;
  }
  return message;
}

main();
