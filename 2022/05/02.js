const input = require("fs").readFileSync("./input.txt", "utf8").trim();

const instructions = input
  .split("\n\n")[1]
  .split("\n")
  .map((i) => i.split(" "))
  .map((i) => [parseInt(i[1]), parseInt(i[3]), parseInt(i[5])]);

let stacks = rotateArray(
  input
    .split("\n\n")[0]
    .split("\n")
    .map((stack) => stack.replace(/(.{3})./g, "$1"))
    .map((stack) => stack.replace(/(\s{3})/g, "[ ]"))
    .map((stack) => stack.split(/(.{3})/g))
    .map((stack) => stack.filter((box) => box !== ""))
)
  .map((stack) => stack.slice(1))
  .map((stack) => stack.filter((box) => box !== "[ ]"));

function rotateArray(arr) {
  return arr[0].map((_, i) => arr.map((row) => row[i]).reverse());
}

instructions.forEach((instruction) => {
  const amount = instruction[0];
  // minus one because the stacks in the input are 1-indexed
  const from = instruction[1] - 1;
  const to = instruction[2] - 1;

  let boxes = [];
  for (let i = 0; i < amount; i++) {
    boxes.push(stacks[from].pop());
  }
  for (let i = 0; i < amount; i++) {
    stacks[to].push(boxes.pop());
  }
});

console.log(
  stacks
    .map((stack) => stack[stack.length - 1])
    .map((box) => box.slice(1, 2))
    .join("")
);
