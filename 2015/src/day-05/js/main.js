// Puzzle: https://adventofcode.com/2015/day/5

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-05.txt", "utf8")
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
  let vowels = ["a", "e", "i", "o", "u"];
  let badStrings = ["ab", "cd", "pq", "xy"];

  let goodStrings = input.split("\n").filter((line) => {
    let vowelCount = 0;
    let doubleLetter = false;
    let badString = false;

    for (let i = 0; i < line.length; i++) {
      if (vowels.includes(line[i])) {
        vowelCount++;
      }

      if (line[i] === line[i + 1]) {
        doubleLetter = true;
      }

      if (badStrings.includes(line[i] + line[i + 1])) {
        badString = true;
      }
    }

    return vowelCount >= 3 && doubleLetter && !badString;
  });

  return goodStrings.length;
}

function partTwo(input) {
  let goodStrings = input.split("\n").filter((line) => {
    let doubleLetter = false;
    let repeatWithOneLetterBetween = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === line[i + 2]) {
        repeatWithOneLetterBetween = true;
      }

      if (line.slice(i + 2).includes(line.slice(i, i + 2))) {
        doubleLetter = true;
      }
    }

    return doubleLetter && repeatWithOneLetterBetween;
  });

  return goodStrings.length;
}

main();
