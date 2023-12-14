// Puzzle: https://adventofcode.com/2023/day/14

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-14.txt", "utf8")
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
  let lines = input.split("\n");
  let cols = [];
  let shiftedCols = [];

  lines.forEach((line) => {
    line.split("").forEach((char, i) => {
      if (!cols[i]) {
        cols[i] = [];
      }
      cols[i].push(char);
    });
  });

  // for each col, get the index of all the #s and 0s
  cols.forEach((col, i) => {
    let temp = {
      roundRocksIdxs: [],
      cubeRocksIdxs: [],
      colLength: col.length,
    };
    col.forEach((char, j) => {
      if (char === "O") {
        temp.roundRocksIdxs.push(j);
      } else if (char === "#") {
        temp.cubeRocksIdxs.push(j);
      }
    });
    cols[i] = temp;
  });

  cols.forEach((col, i) => {
    let currentCubeRockSpot = col.cubeRocksIdxs[0];
    let currentRoundRockSpot = col.roundRocksIdxs[0];

    if (currentCubeRockSpot === undefined) {
      currentCubeRockSpot = Infinity;
    }

    shiftedCols.push([]);

    for (let j = 0; j < col.colLength; j++) {
      if (j === currentCubeRockSpot) {
        shiftedCols[i].push("#");
        col.cubeRocksIdxs.shift();
        if (col.cubeRocksIdxs[0] !== undefined) {
          currentCubeRockSpot = col.cubeRocksIdxs[0];
        } else {
          currentCubeRockSpot = Infinity;
        }
      } else if (currentRoundRockSpot < currentCubeRockSpot) {
        shiftedCols[i].push("O");
        col.roundRocksIdxs.shift();
        if (col.roundRocksIdxs[0] !== undefined) {
          currentRoundRockSpot = col.roundRocksIdxs[0];
        } else {
          currentRoundRockSpot = Infinity;
        }
      } else {
        shiftedCols[i].push(".");
      }
    }
  });

  shiftedColsRotated90Degrees = shiftedCols[0].map((_, colIndex) =>
    shiftedCols.map((row) => row[colIndex])
  );

  let totalLoad = 0;
  shiftedCols.forEach((col, i) => {
    let roundRocksIdxs = [];
    col.forEach((char, j) => {
      if (char === "O") {
        roundRocksIdxs.push(j);
      }
    });

    roundRocksIdxs.forEach((rockIdx) => {
      let distanceToEnd = col.length - rockIdx;
      totalLoad += distanceToEnd;
    });
  });

  return totalLoad;
}

function partTwo(input) {}

main();
