// Puzzle: https://adventofcode.com/2016/day/5

const fs = require("fs");
const crypto = require("crypto");

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

function partOne(input) {
  let password = "";
  let index = "0";
  let foundChars = 0;

  while (foundChars < 8) {
    let hash = md5(input + index);
    if (hash.startsWith("00000")) {
      password += hash[5];
      foundChars++;
    }
    index++;
  }
  return password;
}

function partTwo(input) {
  let password = Array(8).fill(null);
  let index = 0;
  let foundChars = 0;
  let found = false;

  while (!found) {
    let hash = md5(input + index);

    if (hash.startsWith("00000")) {
      let position = hash[5];
      if (position.match(/[0-7]/)) {
        position = Number(position);
        if (password[position] === null) {
          password[position] = hash[6];
          foundChars++;
          if (foundChars === 8) {
            found = true;
          }
        }
      }
    }

    index++;
  }
  return password.join("");
}

function md5(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

main();
