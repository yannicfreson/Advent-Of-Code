let instructions = require("fs")
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
let locations = [];

function moveHead(direction, steps) {
  switch (direction) {
    case "U":
      for (let i = 0; i < steps; i++) {
        head.y++;
        if (
          (head.x !== tail.x || head.y !== tail.y) &&
          (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1)
        ) {
          tail.y++;
          if (head.x < tail.x) {
            tail.x--;
          } else if (head.x > tail.x) {
            tail.x++;
          }
        }
        let found = false;
        locations.forEach((location) => {
          if (location.x === tail.x && location.y === tail.y) {
            found = true;
          }
        });
        if (!found) {
          locations.push({ x: tail.x, y: tail.y });
        }
      }
      break;
    case "D":
      for (let i = 0; i < steps; i++) {
        head.y--;
        if (
          (head.x !== tail.x || head.y !== tail.y) &&
          (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1)
        ) {
          tail.y--;
          if (head.x < tail.x) {
            tail.x--;
          } else if (head.x > tail.x) {
            tail.x++;
          }
        }
        let found = false;
        locations.forEach((location) => {
          if (location.x === tail.x && location.y === tail.y) {
            found = true;
          }
        });
        if (!found) {
          locations.push({ x: tail.x, y: tail.y });
        }
      }
      break;
    case "L":
      for (let i = 0; i < steps; i++) {
        head.x--;
        if (
          (head.x !== tail.x || head.y !== tail.y) &&
          (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1)
        ) {
          tail.x--;
          if (head.y < tail.y) {
            tail.y--;
          } else if (head.y > tail.y) {
            tail.y++;
          }
        }
        let found = false;
        locations.forEach((location) => {
          if (location.x === tail.x && location.y === tail.y) {
            found = true;
          }
        });
        if (!found) {
          locations.push({ x: tail.x, y: tail.y });
        }
      }
      break;
    case "R":
      for (let i = 0; i < steps; i++) {
        head.x++;
        if (
          (head.x !== tail.x || head.y !== tail.y) &&
          (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1)
        ) {
          tail.x++;
          if (head.y < tail.y) {
            tail.y--;
          } else if (head.y > tail.y) {
            tail.y++;
          }
        }
        let found = false;
        locations.forEach((location) => {
          if (location.x === tail.x && location.y === tail.y) {
            found = true;
          }
        });
        if (!found) {
          locations.push({ x: tail.x, y: tail.y });
        }
      }
      break;
  }
}

instructions.forEach((instruction) => {
  console.log(head, tail);
  moveHead(instruction[0], Number(instruction[1]));
});

console.log(locations.length);
