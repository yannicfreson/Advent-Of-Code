// Puzzle: https://adventofcode.com/2023/day/8

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-08.txt", "utf8")
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
  let instructions = input.split("\n")[0].split("");

  let nodes = input
    .split("\n\n")[1]
    .split("\n")
    .map((line) => {
      return {
        node: line.split(" = ")[0],
        directions: {
          left: line.split(" = ")[1].slice(1, -1).split(", ")[0],
          right: line.split(" = ")[1].slice(1, -1).split(", ")[1],
        },
      };
    });

  let steps = 0;

  let currentNode = nodes.find((line) => line.node === "AAA");

  let instructionsRepeatCount = 0;
  while (currentNode.node !== "ZZZ") {
    if (
      instructions[steps - instructions.length * instructionsRepeatCount] ===
      "L"
    ) {
      currentNode = nodes.find(
        (line) => line.node === currentNode.directions.left
      );
    } else {
      currentNode = nodes.find(
        (line) => line.node === currentNode.directions.right
      );
    }
    steps++;
    if (steps % instructions.length === 0) {
      instructionsRepeatCount++;
    }
    if (currentNode.node === "ZZZ") {
      break;
    }
  }

  return steps;
}

function partTwo(input) {
  let instructions = input.split("\n")[0].split("");

  let nodes = input
    .split("\n\n")[1]
    .split("\n")
    .map((line) => {
      return {
        node: line.split(" = ")[0],
        leaves: {
          left: line.split(" = ")[1].slice(1, -1).split(", ")[0],
          right: line.split(" = ")[1].slice(1, -1).split(", ")[1],
        },
      };
    });

  let steps = 0;

  // all nodes that end with A
  let paths = nodes.filter((line) => line.node.endsWith("A"));
  let stepsTaken = [];

  paths.forEach((path) => {
    // calculate how many steps it takes to get to a node that ends with Z
    let instructionsRepeatCount = 0;
    while (!path.node.endsWith("Z")) {
      if (
        instructions[steps - instructions.length * instructionsRepeatCount] ===
        "L"
      ) {
        path = nodes.find((line) => line.node === path.leaves.left);
      } else {
        path = nodes.find((line) => line.node === path.leaves.right);
      }
      steps++;
      if (steps % instructions.length === 0) {
        instructionsRepeatCount++;
      }
      if (path.node.endsWith("Z")) {
        stepsTaken.push(steps);
        steps = 0;
      }
    }
  });

  return lcm(stepsTaken);
}

// helper function to calculate least common multiple
function lcm(arr) {
  let lcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    let GCD = gcd(lcm, arr[i]);
    lcm = (lcm * arr[i]) / GCD;
  }
  return lcm;
}

// helper function to calculate greatest common divisor
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

main();
