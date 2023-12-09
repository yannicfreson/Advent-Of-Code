// Puzzle: https://adventofcode.com/2023/day/9

const fs = require("fs");
const { get } = require("http");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-09.txt", "utf8")
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
  let histories = input
    .split("\n")
    .map((line) => line.split(" ").map((num) => parseInt(num)));

  histories.forEach((history) => {
    let sequences = [history];
    let counter = 0;

    while (!containsAllZeroes(getArrayOfDifferences(sequences[counter]))) {
      const differences = getArrayOfDifferences(sequences[counter]);
      sequences.push(differences);
      counter++;
    }

    for (let i = sequences.length - 1; i > 0; i--) {
      const lastValue = sequences[i][sequences[i].length - 1];
      sequences[i - 1].push(
        lastValue + sequences[i - 1][sequences[i - 1].length - 1]
      );
    }
  });

  return histories
    .map((history) => history[history.length - 1])
    .reduce((acc, curr) => acc + curr, 0);
}

function partTwo(input) {
  return partOne(
    input
      .split("\n")
      .map((line) =>
        line
          .split(" ")
          .map((num) => parseInt(num))
          .reverse()
          .join(" ")
      )
      .join("\n")
  );
}

function getArrayOfDifferences(input) {
  const differences = new Array(input.length - 1);
  for (let i = 0; i < input.length - 1; i++) {
    differences[i] = input[i + 1] - input[i];
  }
  return differences;
}

function containsAllZeroes(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== 0) {
      return false;
    }
  }
  return true;
}

main();
