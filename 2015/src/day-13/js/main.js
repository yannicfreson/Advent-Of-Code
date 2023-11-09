// Puzzle: https://adventofcode.com/2015/day/13

const fs = require('fs');

const INPUT = fs.readFileSync('../../../../2015/data/day-13.txt', 'utf8').trim();

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

};

function partTwo(input) {

};

main();

