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
  let grid = Array(1000)
    .fill()
    .map(() => Array(1000).fill(false));

  input.split("\n").forEach((line) => {
    let [_, command, x1, y1, x2, y2] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    );

    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x2 = parseInt(x2);
    y2 = parseInt(y2);

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (command) {
          case "turn on":
            grid[x][y] = true;
            break;
          case "turn off":
            grid[x][y] = false;
            break;
          case "toggle":
            grid[x][y] = !grid[x][y];
            break;
        }
      }
    }
  });

  return grid.reduce((acc, row) => {
    return acc + row.filter((light) => light).length;
  }, 0);
}

function partTwo(input) {
  let grid = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));

  input.split("\n").forEach((line) => {
    let [_, command, x1, y1, x2, y2] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    );

    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x2 = parseInt(x2);
    y2 = parseInt(y2);

    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (command) {
          case "turn on":
            grid[x][y]++;
            break;
          case "turn off":
            if (grid[x][y] > 0) {
              grid[x][y]--;
            }
            break;
          case "toggle":
            grid[x][y] += 2;
            break;
        }
      }
    }
  });

  return grid.reduce((acc, row) => {
    return acc + row.reduce((acc, light) => acc + light, 0);
  }, 0);
}

function partTwoo(input) {
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
