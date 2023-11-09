// Puzzle: https://adventofcode.com/2016/day/1

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-01.txt", "utf8")
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
  let instructions = input.split(", ");
  let x = 0;
  let y = 0;
  let direction = 0;

  for (let instruction of instructions) {
    let turn = instruction[0];
    let distance = parseInt(instruction.slice(1));

    if (turn === "R") {
      direction = (direction + 1) % 4;
    } else {
      direction = (direction + 3) % 4;
    }

    switch (direction) {
      case 0:
        y += distance;
        break;
      case 1:
        x += distance;
        break;
      case 2:
        y -= distance;
        break;
      case 3:
        x -= distance;
        break;
    }
  }

  return Math.abs(x) + Math.abs(y);
}

function partTwo(input) {
  let instructions = input.split(", ");
  let x = 0;
  let y = 0;
  let direction = 0;
  let visited = new Set();
  visited.add("0,0");

  for (let instruction of instructions) {
    let turn = instruction[0];
    let distance = parseInt(instruction.slice(1));

    if (turn === "R") {
      direction = (direction + 1) % 4;
    } else {
      direction = (direction + 3) % 4;
    }

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 0:
          y++;
          break;
        case 1:
          x++;
          break;
        case 2:
          y--;
          break;
        case 3:
          x--;
          break;
      }

      let key = `${x},${y}`;
      if (visited.has(key)) {
        return Math.abs(x) + Math.abs(y);
      } else {
        visited.add(key);
      }
    }
  }
}

main();
