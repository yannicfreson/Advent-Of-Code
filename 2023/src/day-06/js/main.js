// Puzzle: https://adventofcode.com/2023/day/6

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-06.txt", "utf8")
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
  return input.split("\n")[0].match(/\d+/g).map((t, i) => Array.from( { length: t }, (_, j) => (t - j) * j > input.split("\n")[1].match(/\d+/g)[i] ).filter(Boolean).length).reduce((acc, curr) => acc * curr, 1);
}

function partTwo(input) {
  return Array.from({ length: parseInt(input.split('\n')[0].match(/\d+/g).join('')) }, (_, i) => (i * (parseInt(input.split('\n')[0].match(/\d+/g).join('')) - i)) > parseInt(input.split('\n')[1].match(/\d+/g).join(''))).filter(Boolean).length; 
}

main();
