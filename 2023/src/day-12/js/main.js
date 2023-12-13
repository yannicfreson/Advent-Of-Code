// Puzzle: https://adventofcode.com/2023/day/12

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-10.txt", "utf8")
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
  return input
    .split("\n")
    .map((line) => {
      return [
        line.split(" ")[0].split(""),
        line
          .split(" ")[1]
          .split(",")
          .map((e) => parseInt(e)),
      ];
    })
    .reduce(
      (validCombinations, row) =>
        validCombinations + countValidCombinations({}, ...row, 0, 0, 0),
      0
    );
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

function countValidCombinations(
  cache,
  hotSprings,
  damagedHotSpringsGroups,
  hotSpringsIdx,
  damagedHotSpringsGroupsIdx,
  currentHotSpringsGroupCount
) {
  let validCombinations = 0;

  const key = [
    hotSpringsIdx,
    damagedHotSpringsGroupsIdx,
    currentHotSpringsGroupCount,
  ];
  const damagedHotSpringsGroupsLength = damagedHotSpringsGroups.length;
  const currentDamagedHotSpringsGroup =
    damagedHotSpringsGroups[damagedHotSpringsGroupsIdx];
  const currentHotSpring = hotSprings[hotSpringsIdx];
  const hotSpringsLength = hotSprings.length;
  const isQuestionMark = currentHotSpring === "?";
  const isDamagedHotSpring = currentHotSpring === "#";
  const isWorkingHotSpring = currentHotSpring === ".";

  if (key in cache) {
    return cache[key];
  }

  if (hotSpringsIdx === hotSpringsLength) {
    if (
      damagedHotSpringsGroupsIdx === damagedHotSpringsGroupsLength &&
      currentHotSpringsGroupCount === 0
    ) {
      return 1;
    }

    if (
      damagedHotSpringsGroupsIdx === damagedHotSpringsGroupsLength - 1 &&
      currentDamagedHotSpringsGroup === currentHotSpringsGroupCount
    ) {
      return 1;
    }

    return 0;
  }

  isDamagedHotSpring || isQuestionMark
    ? (validCombinations += countValidCombinations(
        cache,
        hotSprings,
        damagedHotSpringsGroups,
        hotSpringsIdx + 1,
        damagedHotSpringsGroupsIdx,
        currentHotSpringsGroupCount + 1
      ))
    : null;

  if (isWorkingHotSpring || isQuestionMark) {
    currentHotSpringsGroupCount === 0
      ? (validCombinations += countValidCombinations(
          cache,
          hotSprings,
          damagedHotSpringsGroups,
          hotSpringsIdx + 1,
          damagedHotSpringsGroupsIdx,
          0
        ))
      : null;
    currentHotSpringsGroupCount > 0 &&
    damagedHotSpringsGroupsIdx < damagedHotSpringsGroupsLength &&
    currentDamagedHotSpringsGroup === currentHotSpringsGroupCount
      ? (validCombinations += countValidCombinations(
          cache,
          hotSprings,
          damagedHotSpringsGroups,
          hotSpringsIdx + 1,
          damagedHotSpringsGroupsIdx + 1,
          0
        ))
      : null;
  }

  cache[key] = validCombinations;

  return validCombinations;
}

main();

/* --------------------------- */
/* And now, The Cursed Version */
/* --------------------------- */

/*
// Puzzle: https://adventofcode.com/2023/day/12

function m() {
  let n = Date.now();
  console.log(`Part 1: ${p1(require("fs").readFileSync("../../../../2023/data/day-12.txt", "utf8").trim())} (took: ${Date.now() - n}ms)`);

  n = Date.now();
  console.log(`Part 2: ${p2(require("fs").readFileSync("../../../../2023/data/day-12.txt", "utf8").trim())} (took: ${Date.now() - n}ms)`);
}

function p1(i) {return i.split("\n").map((l) => {return [l.split(" ")[0].split(""),l.split(" ")[1].split(",").map((e) => parseInt(e))]}).reduce((vc, r) => vc + cc({}, ...r, 0, 0, 0), 0)}

function p2(i) {return p1(i.split("\n").map((l) => [Array(5).fill(l.split(" ")[0]).join("?"), Array(5).fill(l.split(" ")[1]).join(",")].join(" ")).join("\n"))}

function cc(c, s, g, si, gi, gc) {
  let v = 0;
  if ([si, gi, gc] in c) return c[[si, gi, gc]];
  if (si === s.length) {
    if (gi === g.length && gc === 0) return 1;
    if (gi === g.length - 1 && g[gi] === gc) return 1;
    return 0;
  }
  (s[si] === "#" || s[si] === "?") ? v += cc(c, s, g, si + 1, gi, gc + 1) : null;
  if (s[si] === "." || s[si] === "?") {
    gc === 0 ? v += cc(c, s, g, si + 1, gi, 0) : null;
    (gc > 0 && gi < g.length && g[gi] === gc) ? v += cc(c, s, g, si + 1, gi + 1, 0) : null;
  }
  c[[si, gi, gc]] = v
  return (v);
}

m();
*/
