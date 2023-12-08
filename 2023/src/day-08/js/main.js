// Puzzle: https://adventofcode.com/2023/day/8

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-08.txt", "utf8")
  .trim();

function main() {
  let now = performance.now();
  let part1 = partOne(INPUT);
  let duration = performance.now() - now;
  console.log(`Part 1: ${part1} (took: ${duration.toFixed(2)}ms)`);

  now = performance.now();
  let part2 = partTwo(INPUT);
  duration = performance.now() - now;
  console.log(`Part 2: ${part2} (took: ${duration.toFixed(2)}ms)`);
}

function partOne(input) {
  let instructions = input.split("\n")[0].split("");
  let lineParts = [];
  let nodes = input
    .split("\n\n")[1]
    .split("\n")
    .map((line) => {
      lineParts = line.split(" = ");
      let parts = lineParts[1]
        .substring(1, lineParts[1].length - 1)
        .split(", ");
      return {
        node: lineParts[0],
        directions: {
          left: parts[0],
          right: parts[1],
        },
      };
    });

  let steps = 0;
  let instructionsRepeatCount = 0;
  const instructionsLength = instructions.length;

  const nodeMap = nodes.reduce((acc, line) => {
    acc[line.node] = line;
    return acc;
  }, {});

  let currentNode = nodeMap["AAA"];

  while (true) {
    if (
      instructions[steps - instructionsLength * instructionsRepeatCount] === "L"
    ) {
      currentNode = nodeMap[currentNode.directions.left];
    } else {
      currentNode = nodeMap[currentNode.directions.right];
    }
    steps++;
    if (steps % instructionsLength === 0) {
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
      let parts = line
        .split(" = ")[1]
        .substring(1, line.split(" = ")[1].length - 1)
        .split(", ");
      return {
        node: line.split(" = ")[0],
        leaves: {
          left: parts[0],
          right: parts[1],
        },
      };
    });

  let steps = 0;
  let instructionsRepeatCount = 0;
  let instructionsLength = instructions.length;

  let nodeMap = {};
  nodes.forEach((line) => {
    nodeMap[line.node] = line;
  });

  let destinationNodes = new Set(
    nodes.filter((line) => line.node.endsWith("Z")).map((line) => line.node)
  );

  let stepsTaken = [];

  for (let path of nodes.filter((line) => line.node.endsWith("A"))) {
    while (true) {
      if (
        instructions[steps - instructionsLength * instructionsRepeatCount] ===
        "L"
      ) {
        path = nodeMap[path.leaves.left];
      } else {
        path = nodeMap[path.leaves.right];
      }
      steps++;
      if (steps % instructionsLength === 0) {
        instructionsRepeatCount++;
      }
      if (destinationNodes.has(path.node)) {
        stepsTaken.push(steps);
        steps = 0;
        break;
      }
    }
  }

  return stepsTaken.reduce(lcm);
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

main();
