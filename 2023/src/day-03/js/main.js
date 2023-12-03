// Puzzle: https://adventofcode.com/2023/day/3

const fs = require("fs");
const { parse } = require("path");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-03.txt", "utf8")
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

let partNumbers = [];

function partOne(input) {
  let engineSchematic = input.split("\n");
  let engineSchematicGrid = engineSchematic.map((row) => row.split(""));

  let currentX = 0;
  let currentY = 0;

  // find all the symbols in the grid. symbols are every character that is not a digit or a .
  let symbols = new Set();
  for (let row of engineSchematicGrid) {
    for (let char of row) {
      if (!/\d|\./.test(char)) {
        symbols.add(char);
      }
    }
  }

  // find all the part numbers and keep track of their start coord and end coord

  for (let row = 0; row < engineSchematicGrid.length; row++) {
    for (let col = 0; col < engineSchematicGrid[row].length; col++) {
      let char = engineSchematicGrid[row][col];
      if (/\d/.test(char)) {
        let partNumber = char;
        let startCoord = [row, col];
        let endCoord = [row, col];

        for (let i = col + 1; i < engineSchematicGrid[row].length; i++) {
          let nextChar = engineSchematicGrid[row][i];
          if (/\d/.test(nextChar)) {
            partNumber += nextChar;
            endCoord = [row, i];
          } else {
            break;
          }
        }

        partNumbers.push({
          partNumber,
          startCoord,
          endCoord,
        });

        col = endCoord[1];
      }
    }
  }

  let validPartNumbers = [];
  partNumbers.forEach((partNumber) => {
    let part = partNumber.partNumber;
    let startCoord = partNumber.startCoord;
    let endCoord = partNumber.endCoord;

    // calculate the coords between startCoord and endCoord
    let coords = [];
    for (let row = startCoord[0]; row <= endCoord[0]; row++) {
      for (let col = startCoord[1]; col <= endCoord[1]; col++) {
        coords.push([row, col]);
      }
    }

    // check if any of the adjacent cells of the coords are a symbol. diagonal also counts as adjacent
    let partIsValid = false;
    for (let coord of coords) {
      let row = coord[0];
      let col = coord[1];

      let cellsToCheck = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
        [row - 1, col - 1],
        [row - 1, col + 1],
        [row + 1, col - 1],
        [row + 1, col + 1],
      ];

      symbols.forEach((symbol) => {
        if (!partIsValid) {
          cellsToCheck.forEach((cell) => {
            try {
              if (engineSchematicGrid[cell[0]][cell[1]] === symbol) {
                partIsValid = true;
              }
            } catch {}
          });
        }
      });
    }

    if (partIsValid) {
      validPartNumbers.push(parseInt(part));
    }
  });
  // return the sum of the validPartNumbers
  return validPartNumbers.reduce((a, b) => a + b);
}

function partTwo(input) {
  let engineSchematic = input.split("\n");
  let engineSchematicGrid = engineSchematic.map((row) => row.split(""));

  let gearsCoords = [];

  // find all the gears coords
  for (let row = 0; row < engineSchematicGrid.length; row++) {
    for (let col = 0; col < engineSchematicGrid[row].length; col++) {
      let char = engineSchematicGrid[row][col];
      if (char === "*") {
        gearsCoords.push([row, col]);
      }
    }
  }

  let cellsToCheck = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  // calculate the coords between startCoord and endCoord of each part number
  let completePartNumbersWithCoords = partNumbers.map((partNumber) => {
    let part = partNumber.partNumber;
    let startCoord = partNumber.startCoord;
    let endCoord = partNumber.endCoord;

    let coords = [];
    for (let row = startCoord[0]; row <= endCoord[0]; row++) {
      for (let col = startCoord[1]; col <= endCoord[1]; col++) {
        coords.push([row, col]);
      }
    }

    return {
      partNumber: part,
      coords,
    };
  });

  // add an id property to each completePartNumbersWithCoords entry
  completePartNumbersWithCoords = completePartNumbersWithCoords.map(
    (partNumber, index) => {
      return {
        ...partNumber,
        id: index,
      };
    }
  );

  // for every actualGearCoord, check if any of the coords of the part numbers are adjacent to it
  let gearRatioes = [];
  gearsCoords.forEach((gearCoord) => {
    let adjacentPartNumbers = [];
    completePartNumbersWithCoords.forEach((partNumber) => {
      partNumber.coords.forEach((partNumberCoord) => {
        cellsToCheck.forEach((cell) => {
          // check if the cell is the partNumberCoord
          if (
            gearCoord[0] + cell[0] === partNumberCoord[0] &&
            gearCoord[1] + cell[1] === partNumberCoord[1]
          ) {
            adjacentPartNumbers.push({
              id: partNumber.id,
              partNumber: partNumber.partNumber,
            });
          }
        });
      });
    });

    // remove duplicates from adjacentPartNumbers
    adjacentPartNumbers = adjacentPartNumbers.filter(
      (partNumber, index, self) =>
        index === self.findIndex((t) => t.id === partNumber.id)
    );
    // parse the part numbers to integers
    adjacentPartNumbers = adjacentPartNumbers.map((partNumber) => {
      return parseInt(partNumber.partNumber);
    });
    // remove the entries that don't have a length of 2
    if (adjacentPartNumbers.length === 2) {
      gearRatioes.push({
        partNumbers: adjacentPartNumbers,
        gearRatio: adjacentPartNumbers[0] * adjacentPartNumbers[1],
      });
    }
  });

  // calculate the sum of each gearRatio's gearRatio property
  let gearRatioSum = gearRatioes.reduce((a, b) => a + b.gearRatio, 0);

  return gearRatioSum;
}

main();
