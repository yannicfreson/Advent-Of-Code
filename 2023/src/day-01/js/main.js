// Puzzle: https://adventofcode.com/2023/day/1

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-01.txt", "utf8")
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

  let sum = 0;

  lines.forEach((line) => {
    sum += parseInt(`${line.match(/\d/)}${line.match(/\d(?=\D*$)/)}`);
  });

  return sum;
}

function partTwo(input) {
  let lines = input.split("\n");

  let numberStrings = [
    { name: "zero", value: "z0o" },
    { name: "one", value: "o1e" },
    { name: "two", value: "t2o" },
    { name: "three", value: "t3e" },
    { name: "four", value: "f4r" },
    { name: "five", value: "f5e" },
    { name: "six", value: "s6x" },
    { name: "seven", value: "s7n" },
    { name: "eight", value: "e8t" },
    { name: "nine", value: "n9e" },
  ];

  let sum = 0;

  lines.forEach((line) => {
    // replace all occurernces of the number strings with the value
    let replacedLine = line;
    numberStrings.forEach((numberString) => {
      replacedLine = replacedLine.replace(
        new RegExp(numberString.name, "g"),
        numberString.value
      );
    });

    sum += parseInt(
      `${replacedLine.match(/\d/)}${replacedLine.match(/\d(?=\D*$)/)}`
    );
  });

  return sum;
}

main();
