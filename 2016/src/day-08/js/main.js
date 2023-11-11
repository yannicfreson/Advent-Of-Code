// Puzzle: https://adventofcode.com/2016/day/8

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-08.txt", "utf8")
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

let screen = Array.from({ length: 6 }, () =>
  Array.from({ length: 50 }, () => "░")
);

function partOne(input) {
  let instructions = input.split("\n");

  instructions.forEach((instruction) => {
    let [command, ...args] = instruction.split(" ");

    if (command === "rect") {
      let [width, height] = args[0].split("x");
      width = parseInt(width);
      height = parseInt(height);
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          screen[i][j] = "█";
        }
      }
    }

    if (command === "rotate") {
      let direction = args[0];
      let index = args[1];
      let amount = args[3];

      amount = parseInt(amount);
      index = parseInt(index.split("=")[1]);

      if (direction === "row") {
        let row = screen[index];
        let newRow = [];
        for (let i = 0; i < row.length; i++) {
          let newIndex = i + amount;
          if (newIndex >= row.length) {
            newIndex = newIndex - row.length;
          }
          newRow[newIndex] = row[i];
        }
        screen[index] = newRow;
      }

      if (direction === "column") {
        let column = screen.map((row) => row[index]);
        let newColumn = [];
        for (let i = 0; i < column.length; i++) {
          let newIndex = i + amount;
          if (newIndex >= column.length) {
            newIndex = newIndex - column.length;
          }
          newColumn[newIndex] = column[i];
        }
        screen.forEach((row, i) => (row[index] = newColumn[i]));
      }
    }
  });

  return screen.reduce(
    (acc, row) => acc + row.filter((pixel) => pixel === "█").length,
    0
  );
}

function partTwo(input) {
  return `\n${screen.map((row) => row.join("")).join("\n")}\n`;
}

main();
