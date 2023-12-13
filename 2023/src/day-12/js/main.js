// Puzzle: https://adventofcode.com/2023/day/12

const INPUT = require("fs").readFileSync("../../../../2023/data/day-12.txt", "utf8").trim();

function main() {
  let now = Date.now();
  console.log(`Part 1: ${partOne(INPUT)} (took: ${Date.now() - now}ms)`);

  now = Date.now();
  console.log(`Part 2: ${partTwo(INPUT)} (took: ${Date.now() - now}ms)`);
}

function partOne(input) {return input.split("\n").map((line) => {return [line.split(" ")[0].split(""),line.split(" ")[1].split(",").map((e) => parseInt(e))]}).reduce((validCombinations, row) => validCombinations + countValidCombinations({}, ...row, 0, 0, 0), 0)}

function partTwo(input) {return partOne(input.split("\n").map((line) => [Array(5).fill(line.split(" ")[0]).join("?"), Array(5).fill(line.split(" ")[1]).join(",")].join(" ")).join("\n"))}

function countValidCombinations(cache, hotSprings, damagedHotSpringsGroups, hotSpringsIdx, damagedHotSpringsGroupsIdx, currentHotSpringsGroupCount) {
  let validCombinations = 0;

  const key = [hotSpringsIdx, damagedHotSpringsGroupsIdx, currentHotSpringsGroupCount];
  const damagedHotSpringsGroupsLength = damagedHotSpringsGroups.length;
  const currentDamagedHotSpringsGroup = damagedHotSpringsGroups[damagedHotSpringsGroupsIdx];
  const currentHotSpring = hotSprings[hotSpringsIdx];
  const hotSpringsLength = hotSprings.length;
  const isQuestionMark = currentHotSpring === "?";
  const isDamagedHotSpring = currentHotSpring === "#";
  const isWorkingHotSpring = currentHotSpring === ".";

  if (key in cache) {
    return cache[key];
  }

  if (hotSpringsIdx === hotSpringsLength) {
    if (damagedHotSpringsGroupsIdx === damagedHotSpringsGroupsLength && currentHotSpringsGroupCount === 0) {
      return 1;
    }

    if (damagedHotSpringsGroupsIdx === damagedHotSpringsGroupsLength - 1 && currentDamagedHotSpringsGroup === currentHotSpringsGroupCount) {
      return 1;
    }

    return 0;
  }

  (isDamagedHotSpring || isQuestionMark) ? validCombinations += countValidCombinations(cache, hotSprings, damagedHotSpringsGroups, hotSpringsIdx + 1, damagedHotSpringsGroupsIdx, currentHotSpringsGroupCount + 1) : null;
  
  if (isWorkingHotSpring || isQuestionMark) {
    currentHotSpringsGroupCount === 0 ? validCombinations += countValidCombinations(cache, hotSprings, damagedHotSpringsGroups, hotSpringsIdx + 1, damagedHotSpringsGroupsIdx, 0) : null;
    (currentHotSpringsGroupCount > 0 && damagedHotSpringsGroupsIdx < damagedHotSpringsGroupsLength && currentDamagedHotSpringsGroup === currentHotSpringsGroupCount) ? validCombinations += countValidCombinations(cache, hotSprings, damagedHotSpringsGroups, hotSpringsIdx + 1, damagedHotSpringsGroupsIdx + 1, 0) : null;
  }
  
  cache[key] = validCombinations

  return (validCombinations);
}

main();
