// Puzzle: https://adventofcode.com/2023/day/2

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-02.txt", "utf8")
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
  let games = input.split("\n");
  let sumOfValidIds = 0;

  let redCubes = 12;
  let greenCubes = 13;
  let blueCubes = 14;

  games.forEach((game) => {
    let id = parseInt(game.split("Game ")[1].split(":")[0]);
    let sets = game.split(":")[1].split(";");
    let gameIsValid = true;

    sets.forEach((set) => {
      let nrOfRedCubesInSet = 0;
      let nrOfGreenCubesInSet = 0;
      let nrOfBlueCubesInSet = 0;

      let cubes = set.split(", ");

      cubes.forEach((cube) => {
        let color = cube.trim().split(" ")[1];
        let amount = cube.trim().split(" ")[0];
        if (color === "red") {
          nrOfRedCubesInSet += amount;
        } else if (color === "green") {
          nrOfGreenCubesInSet += amount;
        } else if (color === "blue") {
          nrOfBlueCubesInSet += amount;
        }
      });

      if (
        nrOfRedCubesInSet > redCubes ||
        nrOfGreenCubesInSet > greenCubes ||
        nrOfBlueCubesInSet > blueCubes
      ) {
        gameIsValid = false;
      }
    });

    if (gameIsValid) {
      sumOfValidIds += id;
    }
  });

  return sumOfValidIds;
}

function partTwo(input) {
  let games = input.split("\n");
  let sumOfPowers = 0;

  games.forEach((game) => {
    let id = parseInt(game.split("Game ")[1].split(":")[0]);
    let sets = game.split(":")[1].split(";");
    let power = 0;

    let nrOfRedCubesNeeded = 0;
    let nrOfGreenCubesNeeded = 0;
    let nrOfBlueCubesNeeded = 0;

    sets.forEach((set) => {
      let cubes = set.split(", ");

      cubes.forEach((cube) => {
        let color = cube.trim().split(" ")[1];
        let amount = parseInt(cube.trim().split(" ")[0]);
        if (color === "red") {
          if (amount > nrOfRedCubesNeeded) {
            nrOfRedCubesNeeded = amount;
          }
        } else if (color === "green") {
          if (amount > nrOfGreenCubesNeeded) {
            nrOfGreenCubesNeeded = amount;
          }
        } else if (color === "blue") {
          if (amount > nrOfBlueCubesNeeded) {
            nrOfBlueCubesNeeded = amount;
          }
        }
      });
    });

    power = nrOfRedCubesNeeded * nrOfGreenCubesNeeded * nrOfBlueCubesNeeded;
    sumOfPowers += power;
  });

  return sumOfPowers;
}

main();
