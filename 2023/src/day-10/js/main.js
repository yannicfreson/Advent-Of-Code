// Puzzle: https://adventofcode.com/2023/day/10

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-10.txt", "utf8")
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

let path = [];

const pipeConnections = {
  "|": { down: "down", up: "up" },
  "-": { left: "left", right: "right" },
  L: { down: "right", left: "up" },
  J: { down: "left", right: "up" },
  7: { up: "left", right: "down" },
  F: { up: "right", left: "down" },
};

function partOne(input) {
  let grid = input.split("\n").map((row) => row.split(""));

  let positionOfNextPipe = "left";
  let currentCoord;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "S") {
        currentCoord = { x, y };
      }
    }
  }

  while (true) {
    let nextCoord = getNextCoord(currentCoord, positionOfNextPipe);
    path.push(nextCoord);

    let nextPipe = grid[nextCoord.y][nextCoord.x];
    positionOfNextPipe = getNextPipePosition(nextPipe, positionOfNextPipe);

    if (nextPipe === "S") {
      break;
    }

    currentCoord = nextCoord;
  }

  return path.length / 2;
}

function partTwo(input) {
  let grid = input.split("\n").map((row) => row.split(""));

  // Replace the "S" in grid with "J". Yes I know this is a bit hacky but it's day 10 and I'm tired.
  grid.forEach((row, y) => {
    row.forEach((pipe, x) => {
      if (pipe === "S") {
        grid[y][x] = "J";
      }
    });
  });

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let isPartOfPath = path.some((coord) => coord.x === j && coord.y === i);
      if (!isPartOfPath) {
        grid[i][j] = " ";
      }
    }
  }

  let isInside = false;
  let countInside = 0;
  let lastPipe = "";

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const currentPipe = grid[i][j];

      if (currentPipe === " " && isInside) {
        countInside++;
      } else if (currentPipe === "|") {
        isInside = !isInside;
      } else if (currentPipe === "L" || currentPipe === "F") {
        lastPipe = currentPipe;
      } else if (
        (currentPipe === "7" && lastPipe === "L") ||
        (currentPipe === "J" && lastPipe === "F")
      ) {
        isInside = !isInside;
      }
    }
  }

  return countInside;
}

function getNextCoord(currentCoord, position) {
  const directions = {
    down: { x: 0, y: 1 },
    up: { x: 0, y: -1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  return {
    x: currentCoord.x + directions[position].x,
    y: currentCoord.y + directions[position].y,
  };
}

function getNextPipePosition(nextPipe, currentPosition) {
  const validPositions = pipeConnections[nextPipe];
  return validPositions ? validPositions[currentPosition] : currentPosition;
}

main();
