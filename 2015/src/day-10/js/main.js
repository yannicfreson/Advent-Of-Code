// Puzzle: https://adventofcode.com/2015/day/10

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-10.txt", "utf8")
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
  let output = input;
  for (let i = 0; i < 40; i++) {
    output = lookAndSay(output);
  }
  return output.length;
}

function partTwo(input) {
  let output = input;
  for (let i = 0; i < 50; i++) {
    output = lookAndSay(output);
  }
  return output.length;
}

function lookAndSay(input) {
  let output = "";
  let currentChar = input[0];
  let currentCharCount = 1;
  for (let i = 1; i < input.length; i++) {
    if (input[i] === currentChar) {
      currentCharCount++;
    } else {
      output += `${currentCharCount}${currentChar}`;
      currentChar = input[i];
      currentCharCount = 1;
    }
  }
  output += `${currentCharCount}${currentChar}`;
  return output;
}

main();
