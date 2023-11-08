// Puzzle: https://adventofcode.com/2015/day/9

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2015/data/day-09.txt", "utf8")
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
  let lines = input.split("\n");
  let distances = {};
  let cities = new Set();

  lines.forEach((line) => {
    let [from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/).slice(1);
    distances[`${from}-${to}`] = parseInt(distance);
    distances[`${to}-${from}`] = parseInt(distance);
    cities.add(from);
    cities.add(to);
  });

  let permutations = permute([...cities]);
  let shortest = Infinity;
  permutations.forEach((permutation) => {
    let distance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
      distance += distances[`${permutation[i]}-${permutation[i + 1]}`];
    }
    if (distance < shortest) {
      shortest = distance;
    }
  });
  return shortest;
}

function partTwo(input) {
  let lines = input.split("\n");
  let distances = {};
  let cities = new Set();

  lines.forEach((line) => {
    let [from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/).slice(1);
    distances[`${from}-${to}`] = parseInt(distance);
    distances[`${to}-${from}`] = parseInt(distance);
    cities.add(from);
    cities.add(to);
  });

  let permutations = permute([...cities]);
  let longest = 0;
  permutations.forEach((permutation) => {
    let distance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
      distance += distances[`${permutation[i]}-${permutation[i + 1]}`];
    }
    if (distance > longest) {
      longest = distance;
    }
  });
  return longest;
}

function permute(permutation) {
  let length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

main();
