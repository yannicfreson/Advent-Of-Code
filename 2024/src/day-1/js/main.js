// Puzzle: https://adventofcode.com/2024/day/1

const fs = require("fs")

const INPUT = fs.readFileSync("../../../../2024/data/day-1.txt", "utf8").trim()

function main() {
  let now = Date.now()
  let part1 = partOne(INPUT)
  let duration = Date.now() - now
  console.log(`Part 1: ${part1} (took: ${duration}ms)`)

  now = Date.now()
  let part2 = partTwo(INPUT)
  duration = Date.now() - now
  console.log(`Part 2: ${part2} (took: ${duration}ms)`)
}

function partOne(input) {
  const leftList = []
  const rightList = []

  input.split("\n").forEach((line) => {[leftList[leftList.length], rightList[rightList.length]] = line.split(/\s+/).map(Number)})

  leftList.sort((a, b) => a - b)
  rightList.sort((a, b) => a - b)

  let total = 0
  leftList.forEach((left, i) => total += Math.abs(left - rightList[i]));

  return total
}

function partTwo(input) {
  const leftList = []
  const rightList = []

  input.split("\n").forEach((line) => {[leftList[leftList.length], rightList[rightList.length]] = line.split(/\s+/).map(Number)})

  const rightCount = {}
  for (const num of rightList) {
    if (rightCount[num] === undefined) {
      rightCount[num] = 1
    } else {
      rightCount[num]++
    }
  }

  let similarityScore = 0
  for (const num of leftList) {
    const count = rightCount[num] !== undefined ? rightCount[num] : 0
    similarityScore += num * count
  }

  return similarityScore
}

main()
