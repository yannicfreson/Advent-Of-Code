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

  let x = 0;
  let y = 0;
  for (let i = 0; i < 1000000; i++) {
    grid.push({ id: i, x: x, y: y, value: false });
    x++;
    if (x > 999) {
      x = 0;
      y++;
    }
  }

  input.split("\n").forEach((line) => {
    const [_, command, x1, y1, x2, y2] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    );

    let lights = grid.filter((light) => {
      return light.x >= x1 && light.x <= x2 && light.y >= y1 && light.y <= y2;
    });

    lights.forEach((light) => {
      switch (command) {
        case "turn on":
          light.value = true;
          break;
        case "turn off":
          light.value = false;
          break;
        case "toggle":
          light.value = !light.value;
          break;
      }
    });

    // put lights back in grid

    lights.forEach((light) => {
      grid[light.id] = light;
    });
  });

  let count = 0;
  grid.forEach((light) => {
    if (light.value) {
      count++;
    }
  });

  return count;
}

function partTwo(input) {
  let grid = [];

  let x = 0;
  let y = 0;
  for (let i = 0; i < 1000000; i++) {
    grid.push({ id: i, x: x, y: y, value: 0 });
    x++;
    if (x > 999) {
      x = 0;
      y++;
    }
  }

  input.split("\n").forEach((line) => {
    const [_, command, x1, y1, x2, y2] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    );

    let lights = grid.filter((light) => {
      return light.x >= x1 && light.x <= x2 && light.y >= y1 && light.y <= y2;
    });

    lights.forEach((light) => {
      switch (command) {
        case "turn on":
          light.value++;
          break;
        case "turn off":
          if (light.value > 0) {
            light.value--;
          }
          break;
        case "toggle":
          light.value += 2;
          break;
      }
    });

    // put lights back in grid

    lights.forEach((light) => {
      grid[light.id] = light;
    });
  });

  let count = 0;
  grid.forEach((light) => {
    count += light.value;
  });

  return count;
}

main();
