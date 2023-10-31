let elvesInventories = [];
let currentTotal = 0;

require("fs").readFileSync("./input.txt", "utf8").split("\n").map((number) => parseInt(number)).forEach((number) => {
  if (number) {
    currentTotal += number;
  } else {
    elvesInventories.push(currentTotal);
    currentTotal = 0;
  }
});

console.log(Math.max(...elvesInventories));
