// Puzzle: https://adventofcode.com/2016/day/7

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2016/data/day-07.txt", "utf8")
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
  let ipAddresses = input.split("\n");
  let count = 0;
  for (let ipAddress of ipAddresses) {
    if (supportsTLS(ipAddress)) {
      count++;
    }
  }
  return count;
}

function partTwo(input) {
  let ipAddresses = input.split("\n");
  let count = 0;
  for (let ipAddress of ipAddresses) {
    if (supportsSSL(ipAddress)) {
      count++;
    }
  }
  return count;
}

function supportsTLS(ipAddress) {
  let hypernetSequences = ipAddress.match(/\[([a-z]+)\]/g);
  let hypernetSequenceContainsABBA = false;
  if (hypernetSequences) {
    for (let hypernetSequence of hypernetSequences) {
      if (containsABBA(hypernetSequence)) {
        hypernetSequenceContainsABBA = true;
        break;
      }
    }
  }
  if (hypernetSequenceContainsABBA) {
    return false;
  }
  let sequences = ipAddress.split(/\[[a-z]+\]/g);
  for (let sequence of sequences) {
    if (containsABBA(sequence)) {
      return true;
    }
  }
  return false;
}

function containsABBA(sequence) {
  let abbaRegex = /([a-z])([a-z])\2\1/g;
  let matches = sequence.match(abbaRegex);
  if (matches) {
    for (let match of matches) {
      if (match[0] !== match[1]) {
        return true;
      }
    }
  }
  return false;
}

function supportsSSL(ipAddress) {
  let hypernetSequences = ipAddress.match(/\[([a-z]+)\]/g);
  let abaSequences = [];
  if (hypernetSequences) {
    for (let hypernetSequence of hypernetSequences) {
      abaSequences = abaSequences.concat(findABASequences(hypernetSequence));
    }
  }
  let sequences = ipAddress.split(/\[[a-z]+\]/g);
  for (let sequence of sequences) {
    for (let abaSequence of abaSequences) {
      if (containsBAB(sequence, abaSequence)) {
        return true;
      }
    }
  }
  return false;
}

function findABASequences(sequence) {
  let abaSequences = [];
  for (let i = 0; i < sequence.length - 2; i++) {
    if (sequence[i] === sequence[i + 2] && sequence[i] !== sequence[i + 1]) {
      abaSequences.push(sequence.substring(i, i + 3));
    }
  }
  return abaSequences;
}

function containsBAB(sequence, abaSequence) {
  let babSequence = abaSequence[1] + abaSequence[0] + abaSequence[1];
  return sequence.includes(babSequence);
}

main();
