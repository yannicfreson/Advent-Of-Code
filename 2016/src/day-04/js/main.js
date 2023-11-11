// Puzzle: https://adventofcode.com/2016/day/4

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-04.txt", "utf8")
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
  let rooms = input.split("\n");
  let sum = 0;

  rooms.forEach((room) => {
    let [name, sector, checksum] = room.match(/(.*)-(\d+)\[(.*)\]/).slice(1);
    let letters = name.replace(/-/g, "").split("");
    let counts = {};

    letters.forEach((letter) => {
      counts[letter] = counts[letter] ? counts[letter] + 1 : 1;
    });

    let sortedLetters = Object.keys(counts).sort((a, b) => {
      if (counts[a] === counts[b]) {
        return a < b ? -1 : 1;
      }

      return counts[b] - counts[a];
    });

    let isValid = true;
    for (let i = 0; i < checksum.length; i++) {
      if (checksum[i] !== sortedLetters[i]) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      sum += parseInt(sector);
    }
  });

  return sum;
}

function partTwo(input) {
  let rooms = input.split("\n");
  let sectorIdNorthPole = 0;

  rooms.forEach((room) => {
    let [name, sector] = room.match(/(.*)-(\d+)\[(.*)\]/).slice(1);
    let decryptedName = "";

    for (let i = 0; i < name.length; i++) {
      let charCode = name.charCodeAt(i);

      if (charCode === 45) {
        decryptedName += " ";
        continue;
      }

      let newCharCode = charCode + (parseInt(sector) % 26);

      if (newCharCode > 122) {
        newCharCode -= 26;
      }

      decryptedName += String.fromCharCode(newCharCode);

      if (decryptedName.includes("northpole object storage")) {
        sectorIdNorthPole = sector;
      }
    }
  });

  return sectorIdNorthPole;
}

main();
