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
  return calculateLoadOfMatrix(slideRocks(input));
}

function partTwo(input) {
  let temp = input;
  let rotations = 0;
  let cycles = 0;
  let seenConfigs = [];

  while (true) {
    temp = slideRocks(temp);

    temp = matrixToString(rotateMatrix(stringTomatrix(temp)));

    rotations++;

    if (rotations === 4) {
      rotations = 0;
      cycles++;

      if (seenConfigs.includes(temp)) {
        let cycleLength = seenConfigs.length - seenConfigs.indexOf(temp);

        let finalIdx =
          seenConfigs.indexOf(temp) + ((1000000000 - cycles) % cycleLength);

        return calculateLoadOfMatrix(seenConfigs[finalIdx]);
      } else {
        seenConfigs.push(temp);
      }
    }
  }
}

function slideRocks(input) {
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

  return shiftedColsRotated90Degrees.map((row) => row.join("")).join("\n");
}

function calculateLoadOfMatrix(input) {
  let totalLoad = 0;
  let inputAsMatrix = stringTomatrix(input);

  // i wrote my rotate function to rotate clockwise, so i need to rotate 3 times. this is easier than rewriting the function. sorrynotsorry
  inputAsMatrix = rotateMatrix(inputAsMatrix);
  inputAsMatrix = rotateMatrix(inputAsMatrix);
  inputAsMatrix = rotateMatrix(inputAsMatrix);

  inputAsMatrix.forEach((col, i) => {
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

function rotateMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = i + 1; j < cols; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for (let i = 0; i < rows; i++) {
    matrix[i].reverse();
  }

  return matrix;
}

function matrixToString(temp) {
  return temp.map((row) => row.join("")).join("\n");
}

function stringTomatrix(temp) {
  return temp.split("\n").map((row) => row.split(""));
}

main();
