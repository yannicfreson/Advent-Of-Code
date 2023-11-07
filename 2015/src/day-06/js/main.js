// Puzzle: https://adventofcode.com/2015/day/6

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-06.txt", "utf8")
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
  let grid = [];
  for (let i = 0; i < 1000; i++) {
    grid.push([]);
    for (let j = 0; j < 1000; j++) {
      grid[i].push(false);
    }
  }

  input.split("\n").forEach((line) => {
    const [_, command, x1, y1, x2, y2] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    );

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (command) {
          case "turn on":
            grid[x][y] = true;
            break;
          case "turn off":
            grid[x][y] = false;
            break;
          case "toggle":
            grid[x][y] = !grid[x][y];
            break;
        }
      }
    }
  });

  let count = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell) {
        count++;
      }
    });
  });

  return count;
}

function partTwo(input) {}

main();
