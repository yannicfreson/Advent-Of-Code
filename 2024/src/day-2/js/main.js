// Puzzle: https://adventofcode.com/2024/day/2

const fs = require('fs');

const INPUT = fs.readFileSync('../../../../2024/data/day-2.txt', 'utf8').trim();

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
  return input.split("\n").filter(line => {
    const levels = line.split(" ").map(Number);
    
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 0; i < levels.length - 1; i++) {
      const diff = Math.abs(levels[i] - levels[i + 1]);
      if (diff < 1 || diff > 3) return false;

      if (levels[i] < levels[i + 1]) isDecreasing = false;
      if (levels[i] > levels[i + 1]) isIncreasing = false;
    }

    return isIncreasing || isDecreasing;
  }).length;
}

function partTwo(input) {
  const isSafe = (levels) => {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 0; i < levels.length - 1; i++) {
      const diff = Math.abs(levels[i] - levels[i + 1]);
      if (diff < 1 || diff > 3) return false;

      if (levels[i] < levels[i + 1]) isDecreasing = false;
      if (levels[i] > levels[i + 1]) isIncreasing = false;
    }

    return isIncreasing || isDecreasing;
  };

  return input.split("\n").filter(line => {
    const levels = line.split(" ").map(Number);

    if (isSafe(levels)) return true;

    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafe(newLevels)) return true;
    }

    return false;
  }).length;
}

main();

