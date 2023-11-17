// Puzzle: https://adventofcode.com/2018/day/3

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2018/data/day-03.txt", "utf8")
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
  let claims = input.split("\n");
  let fabric = {};
  let overlapCount = 0;

  for (let i = 0; i < claims.length; i++) {
    let claim = claims[i];
    let [id, x, y, w, h] = claim.match(/\d+/g).map((num) => parseInt(num));

    for (let j = x; j < x + w; j++) {
      for (let k = y; k < y + h; k++) {
        let key = `${j},${k}`;
        fabric[key] = fabric[key] ? fabric[key] + 1 : 1;
      }
    }
  }

  for (let key in fabric) {
    if (fabric[key] > 1) {
      overlapCount++;
    }
  }

  return overlapCount;
}

function partTwo(input) {
  let claims = input.split("\n");
  let fabric = {};
  let claimIds = new Set();

  for (let i = 0; i < claims.length; i++) {
    let claim = claims[i];
    let [id, x, y, w, h] = claim.match(/\d+/g).map((num) => parseInt(num));
    claimIds.add(id);

    for (let j = x; j < x + w; j++) {
      for (let k = y; k < y + h; k++) {
        let key = `${j},${k}`;
        if (fabric[key]) {
          claimIds.delete(fabric[key]);
          claimIds.delete(id);
        }
        fabric[key] = id;
      }
    }
  }

  return claimIds.values().next().value;
}

main();
