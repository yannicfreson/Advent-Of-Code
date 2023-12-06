// Puzzle: https://adventofcode.com/2023/day/6

const { time } = require("console");
const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-06.txt", "utf8")
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
  let races = [];
  // get the digits from the first line
  let times = input
    .split("\n")[0]
    .match(/\d+/g)
    .map((time) => parseInt(time));

  // get the digits from the second line
  let distances = input
    .split("\n")[1]
    .match(/\d+/g)
    .map((distance) => parseInt(distance));

  times.forEach((time, index) => {
    races.push({ time, recordDistance: distances[index], waysToBeat: 0 });
  });

  races.forEach((race) => {
    for (let i = 0; i < race.time; i++) {
      let speed = i;
      let distance = (race.time - i) * speed;
      if (distance > race.recordDistance) {
        race.waysToBeat++;
      }
    }
  });

  // multiply each race's waysToBeat together
  return races.reduce((acc, curr) => acc * curr.waysToBeat, 1);
}

function partTwo(input) {
  let time = parseInt(input.split("\n")[0].match(/\d+/g).join(""));
  let recordDistance = parseInt(input.split("\n")[1].match(/\d+/g).join(""));

  let waysToBeat = 0;
  for (let i = 0; i < time; i++) {
    let speed = i;
    let distance = (time - i) * speed;
    if (distance > recordDistance) {
      waysToBeat++;
    }
  }

  return waysToBeat;
}

main();
