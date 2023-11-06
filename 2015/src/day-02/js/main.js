// Puzzle: https://adventofcode.com/2015/day/2

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-02.txt", "utf8")
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
  let totalSquareFeet = 0;

  input.split("\n").forEach((line) => {
    const [l, w, h] = line.split("x").map((x) => parseInt(x));
    const areas = [l * w, w * h, h * l];
    const smallestArea = Math.min(...areas);
    const area = 2 * areas.reduce((acc, area) => acc + area, 0) + smallestArea;
    totalSquareFeet += area;
    console.log(areas);
  });

  return totalSquareFeet;
}

function partTwo(input) {
  let totalFeetOfRibbon = 0;

  input.split("\n").forEach((line) => {
    const [l, w, h] = line.split("x").map((x) => parseInt(x));
    const smallestPerimeter = Math.min(2 * (l + w), 2 * (w + h), 2 * (h + l));
    const volume = l * w * h;
    totalFeetOfRibbon += smallestPerimeter + volume;
  });

  return totalFeetOfRibbon;
}

main();
