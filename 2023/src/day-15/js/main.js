// Puzzle: https://adventofcode.com/2023/day/15

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-15.txt", "utf8")
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
  return input
    .split(",")
    .reduce(
      (acc, string) =>
        acc + holidayAsciiStringHelperAlgorithmAppendix1A(string),
      0
    );
}

function partTwo(input) {
  return calculateFocusingPower(
    holidayAsciiStringHelperManualArrangementProcedure(input)
  );
}

function calculateFocusingPower(array) {
  return array.reduce(
    (sum, [key, box]) =>
      sum +
      box.reduce(
        (temp, [_, focalLength], i) => temp + parseInt(focalLength) * (i + 1),
        0
      ) *
        (parseInt(key) + 1),
    0
  );
}

function holidayAsciiStringHelperAlgorithmAppendix1A(s) {
  return s
    .split("")
    .reduce((curr, c) => ((curr + c.charCodeAt(0)) * 17) % 256, 0);
}

function holidayAsciiStringHelperManualArrangementProcedure(input) {
  let boxes = new Map();

  input.split(",").forEach((str) => {
    let label = str.match(/[a-z]+/)[0];
    let hash = holidayAsciiStringHelperAlgorithmAppendix1A(label);
    let operation = str.match(/[-=]/)[0];
    let focalLength = str.match(/\d+/) ? str.match(/\d+/)[0] : 0;

    boxes.has(hash) === false ? boxes.set(hash, []) : null;

    let box = boxes.get(hash);

    operation === "="
      ? box.findIndex((x) => x[0] === label) > -1
        ? (box[box.findIndex((x) => x[0] === label)][1] = focalLength)
        : box.push([label, focalLength])
      : box.findIndex((x) => x[0] === label) > -1 &&
        box.splice(
          box.findIndex((x) => x[0] === label),
          1
        );
  });

  return Array.from(boxes);
}

main();
