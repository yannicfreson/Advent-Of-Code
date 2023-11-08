// Puzzle: https://adventofcode.com/2015/day/7

const fs = require("fs");
const { parse } = require("path");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-07.txt", "utf8")
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
  let instructions = input.split("\n");
  let queue = instructions;
  let register = {};

  while (queue.length > 0) {
    let instruction = queue.shift();

    if (instruction.includes("AND")) {
      // x AND y -> z
      let [inputOne, , inputTwo, , outputWire] = instruction.split(" ");

      let valueOne = Number.isInteger(parseInt(inputOne))
        ? parseInt(inputOne)
        : register[inputOne];

      let valueTwo = Number.isInteger(parseInt(inputTwo))
        ? parseInt(inputTwo)
        : register[inputTwo];

      if (valueOne !== undefined && valueTwo !== undefined) {
        register[outputWire] = valueOne & valueTwo;
      } else {
        queue.push(instruction);
      }
    } else if (instruction.includes("OR")) {
      // x OR y -> z
      let [inputOne, , inputTwo, , outputWire] = instruction.split(" ");

      let valueOne = Number.isInteger(parseInt(inputOne))
        ? parseInt(inputOne)
        : register[inputOne];

      let valueTwo = Number.isInteger(parseInt(inputTwo))
        ? parseInt(inputTwo)
        : register[inputTwo];

      if (valueOne !== undefined && valueTwo !== undefined) {
        register[outputWire] = valueOne | valueTwo;
      } else {
        queue.push(instruction);
      }
    } else if (instruction.includes("LSHIFT")) {
      // x LSHIFT 2 -> z
      let [inputOne, , inputTwo, , outputWire] = instruction.split(" ");

      let valueOne = Number.isInteger(parseInt(inputOne))
        ? parseInt(inputOne)
        : register[inputOne];

      let valueTwo = Number.isInteger(parseInt(inputTwo))
        ? parseInt(inputTwo)
        : register[inputTwo];

      if (valueOne !== undefined && valueTwo !== undefined) {
        register[outputWire] = valueOne << valueTwo;
      } else {
        queue.push(instruction);
      }
    } else if (instruction.includes("RSHIFT")) {
      // x RSHIFT 2 -> z
      let [inputOne, , inputTwo, , outputWire] = instruction.split(" ");

      let valueOne = Number.isInteger(parseInt(inputOne))
        ? parseInt(inputOne)
        : register[inputOne];

      let valueTwo = Number.isInteger(parseInt(inputTwo))
        ? parseInt(inputTwo)
        : register[inputTwo];

      if (valueOne !== undefined && valueTwo !== undefined) {
        register[outputWire] = valueOne >> valueTwo;
      } else {
        queue.push(instruction);
      }
    } else if (instruction.includes("NOT")) {
      // NOT x -> y
      let [, input, , outputWire] = instruction.split(" ");

      let valueOne = Number.isInteger(parseInt(input))
        ? parseInt(input)
        : register[input];

      if (valueOne !== undefined) {
        register[outputWire] = 65535 - valueOne;
      } else {
        queue.push(instruction);
      }
    } else {
      // 123 -> x
      let [input, wire] = instruction.split(" -> ");
      let valueOne = Number.isInteger(parseInt(input))
        ? parseInt(input)
        : register[input];
      if (valueOne !== undefined) {
        register[wire] = valueOne;
      } else {
        queue.push(instruction);
      }
    }
  }
  return register.a;
}

function partTwo(input) {
  let a = partOne(input);
  let instructions = input.split("\n");

  for (let i = 0; i < instructions.length; i++) {
    if (
      !instructions[i].includes("NOT") &&
      !instructions[i].includes("AND") &&
      !instructions[i].includes("LSHIFT") &&
      !instructions[i].includes("OR") &&
      !instructions[i].includes("RSHIFT")
    ) {
      let [, wire] = instructions[i].split(" -> ");
      if (wire === "b") {
        instructions[i] = `${a} -> b`;
      }
    }
  }

  return partOne(instructions.join("\n"));
}

main();
