// Puzzle: https://adventofcode.com/2016/day/5

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-05.txt", "utf8")
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

let hashesStartedWithFiveZeros = [];

function partOne(input) {
  let password = "";
  let index = "0";

  while (password.length < 8) {
    let hash = md5(input + index);
    if (hash.startsWith("00000")) {
      hashesStartedWithFiveZeros.push(hash);
      password += hash[5];
      console.log({ index }, password);
    }
    index++;
  }
  console.log(hashesStartedWithFiveZeros);
  return password;
}

function partTwo(input) {
  let password = Array(8).fill(null);
  let index = 0;
  let hashesStartedWithFiveZerosWorked = false;
  while (password.includes(null)) {
    hashesStartedWithFiveZeros.forEach((hash) => {
      let position = hash[5];
      if (position.match(/[0-7]/)) {
        position = Number(position);
        if (password[position] === null) {
          password[position] = hash[6];
          hashesStartedWithFiveZerosWorked = true;
          console.log(
            { index },
            hashesStartedWithFiveZerosWorked,
            password.join("")
          );
          hashesStartedWithFiveZerosWorked = false;
        }
      }
    });
    if (!hashesStartedWithFiveZerosWorked) {
      let hash = md5(input + index);
      if (hash.startsWith("00000")) {
        let position = hash[5];
        if (position.match(/[0-7]/)) {
          position = Number(position);
          if (password[position] === null) {
            password[position] = hash[6];
            console.log(
              { index },
              hashesStartedWithFiveZerosWorked,
              password.join("")
            );
            hashesStartedWithFiveZerosWorked = false;
          }
        }
      }
    }

    index++;
  }
  return password.join("");
}

function md5(input) {
  const crypto = require("crypto");
  return crypto.createHash("md5").update(input).digest("hex");
}

main();
