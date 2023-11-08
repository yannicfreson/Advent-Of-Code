// Puzzle: https://adventofcode.com/2015/day/8

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-08.txt", "utf8")
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
  let inputStrings = input.split("\n").join("");
  let inputStringsContent = input.split("\n").map((str) => str.slice(1, -1));
  let outputString = "";

  inputStringsContent.forEach((inputString) => {
    for (let i = 0; i < inputString.length; i++) {
      if (inputString[i] === "\\") {
        if (inputString[i + 1] === "x") {
          outputString += String.fromCharCode(
            parseInt(inputString.substr(i + 2, 2), 16)
          );
          i += 3;
        } else {
          outputString += inputString[i + 1];
          i++;
        }
      } else {
        outputString += inputString[i];
      }
    }
  });

  return inputStrings.length - outputString.length;
}

function partTwo(input) {
  let inputStrings = input.split("\n");
  let outputStrings = [];

  inputStrings.forEach((inputString) => {
    let outputString = "";
    inputString.split("").forEach((char) => {
      if (char === '"' || char === "\\") {
        outputString += `\\${char}`;
      } else {
        outputString += char;
      }
    });
    outputStrings.push(`"${outputString}"`);
  });

  return outputStrings.join("").length - inputStrings.join("").length;
}

main();
