// Puzzle: https://adventofcode.com/2018/day/2

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2018/data/day-02.txt", "utf8")
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
  let boxIds = input.split("\n");
  let twoLetterCount = 0;
  let threeLetterCount = 0;

  for (let i = 0; i < boxIds.length; i++) {
    let boxId = boxIds[i];
    let letterCounts = {};

    for (let j = 0; j < boxId.length; j++) {
      let letter = boxId[j];
      letterCounts[letter] = letterCounts[letter]
        ? letterCounts[letter] + 1
        : 1;
    }

    let letterCountValues = Object.values(letterCounts);
    if (letterCountValues.includes(2)) {
      twoLetterCount++;
    }
    if (letterCountValues.includes(3)) {
      threeLetterCount++;
    }
  }

  return twoLetterCount * threeLetterCount;
}

function partTwo(input) {
  let boxIds = input.split("\n");

  for (let i = 0; i < boxIds.length; i++) {
    let boxId1 = boxIds[i];

    for (let j = i + 1; j < boxIds.length; j++) {
      let boxId2 = boxIds[j];
      let commonLetters = "";

      for (let k = 0; k < boxId1.length; k++) {
        if (boxId1[k] === boxId2[k]) {
          commonLetters += boxId1[k];
        }
      }

      if (commonLetters.length === boxId1.length - 1) {
        return commonLetters;
      }
    }
  }
}

main();
