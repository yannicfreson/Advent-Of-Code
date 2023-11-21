// Puzzle: https://adventofcode.com/2019/day/2

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2019/data/day-02.txt", "utf8")
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
  let program = input.split(",").map(Number);
  let index = 0;
  let opcode = program[index];
  let inputPos = program[index + 1];
  let outputPos = program[index + 2];
  let resultPos = program[index + 3];

  program[1] = 12;
  program[2] = 2;

  while (opcode !== 99) {
    if (opcode === 1) {
      program[resultPos] = program[inputPos] + program[outputPos];
    } else if (opcode === 2) {
      program[resultPos] = program[inputPos] * program[outputPos];
    }
    index += 4;
    opcode = program[index];
    inputPos = program[index + 1];
    outputPos = program[index + 2];
    resultPos = program[index + 3];
  }

  return program[0];
}

function partTwo(input) {
  let program = input.split(",").map(Number);
  let index = 0;
  let opcode = program[index];
  let inputPos = program[index + 1];
  let outputPos = program[index + 2];
  let resultPos = program[index + 3];

  let noun = 0;
  let verb = 0;
  let result = 0;

  while (result !== 19690720) {
    program = input.split(",").map(Number);
    program[1] = noun;
    program[2] = verb;
    index = 0;
    opcode = program[index];
    inputPos = program[index + 1];
    outputPos = program[index + 2];
    resultPos = program[index + 3];

    while (opcode !== 99) {
      if (opcode === 1) {
        program[resultPos] = program[inputPos] + program[outputPos];
      } else if (opcode === 2) {
        program[resultPos] = program[inputPos] * program[outputPos];
      }
      index += 4;
      opcode = program[index];
      inputPos = program[index + 1];
      outputPos = program[index + 2];
      resultPos = program[index + 3];
    }

    result = program[0];

    if (result !== 19690720) {
      if (noun < 99) {
        noun++;
      } else {
        noun = 0;
        verb++;
      }
    }
  }

  return 100 * noun + verb;
}

main();
