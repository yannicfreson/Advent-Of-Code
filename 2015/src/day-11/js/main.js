// Puzzle: https://adventofcode.com/2015/day/11

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-11.txt", "utf8")
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
  let password = input;
  let valid = false;

  while (!valid) {
    password = incrementPassword(password);
    valid = isValid(password);
  }

  return password;
}

function partTwo(input) {
  let password = partOne(input);
  password = incrementPassword(password);
  let valid = false;

  while (!valid) {
    password = incrementPassword(password);
    valid = isValid(password);
  }

  return password;
}

function incrementPassword(password) {
  let newPassword = password;
  let index = newPassword.length - 1;
  while (newPassword[index] === "z") {
    newPassword = replaceChar(newPassword, index, "a");
    index--;
  }
  newPassword = replaceChar(
    newPassword,
    index,
    String.fromCharCode(newPassword.charCodeAt(index) + 1)
  );
  return newPassword;
}

function replaceChar(str, index, char) {
  return str.substr(0, index) + char + str.substr(index + 1);
}

function isValid(password) {
  return (
    hasStraight(password) &&
    hasNoInvalidChars(password) &&
    hasTwoPairs(password)
  );
}

function hasStraight(password) {
  for (let i = 0; i < password.length - 2; i++) {
    if (
      password.charCodeAt(i) === password.charCodeAt(i + 1) - 1 &&
      password.charCodeAt(i) === password.charCodeAt(i + 2) - 2
    ) {
      return true;
    }
  }
  return false;
}

function hasNoInvalidChars(password) {
  return !/[iol]/.test(password);
}

function hasTwoPairs(password) {
  let pairs = 0;
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      pairs++;
      i++;
    }
  }
  return pairs >= 2;
}

main();
