// Puzzle: https://adventofcode.com/2023/day/12

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-12.txt", "utf8")
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
  const rows = input.split("\n").map((line) => line.split(" "));

  let totalCombinations = 0;

  rows.forEach((spring, i) => {
    const hotSprings = spring[0].split("");
    const damagedHotSpringsGroups = rows[i][1]
      .split(",")
      .map((val) => parseInt(val));

    const combinations = countCombinations(
      hotSprings,
      damagedHotSpringsGroups,
      0
    );
    totalCombinations += combinations;
  });

  return totalCombinations;
}

function partTwo(input) {
  return partOne(
    input
      .split("\n")
      .map((line) =>
        [
          Array(5).fill(line.split(" ")[0]).join("?"),
          Array(5).fill(line.split(" ")[1]).join(","),
        ].join(" ")
      )
      .join("\n")
  );
}

function countDamagedHotSpringsGroups(hotSprings) {
  let counter = 0;
  const damagedHotSpringsGroups = [];

  for (const hotSpring of hotSprings) {
    if (hotSpring === "#") {
      counter++;
    } else if (hotSpring === ".") {
      counter > 0 && damagedHotSpringsGroups.push(counter);
      counter = 0;
    }
  }

  counter > 0 && damagedHotSpringsGroups.push(counter);
  return damagedHotSpringsGroups;
}

function countCombinations(hotSprings, damagedHotSpringsGroups, index) {
  if (index === hotSprings.length) {
    return countDamagedHotSpringsGroups(hotSprings).toString() ===
      damagedHotSpringsGroups.toString()
      ? 1
      : 0;
  }

  let combinations = 0;

  if (hotSprings[index] === "?") {
    hotSprings[index] = ".";
    combinations += countCombinations(
      [...hotSprings],
      damagedHotSpringsGroups,
      index + 1
    );

    hotSprings[index] = "#";
    combinations += countCombinations(
      [...hotSprings],
      damagedHotSpringsGroups,
      index + 1
    );

    hotSprings[index] = "?";
  } else {
    combinations += countCombinations(
      hotSprings,
      damagedHotSpringsGroups,
      index + 1
    );
  }

  return combinations;
}

main();
