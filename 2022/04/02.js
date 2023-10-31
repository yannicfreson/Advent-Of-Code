let total = 0;
require("fs").readFileSync("./input.txt", "utf8").trim().split("\n").forEach((line) => {([...Array(parseInt(line.split(",")[0].split("-")[1]) - parseInt(line.split(",")[0].split("-")[0]) + 1).keys()].map((x) => x + parseInt(line.split(",")[0].split("-")[0])).filter((num) => [...Array(parseInt(line.split(",")[1].split("-")[1]) - parseInt(line.split(",")[1].split("-")[0]) + 1).keys()].map((x) => x + parseInt(line.split(",")[1].split("-")[0])).includes(num)).length > 0) ? total++ : null});

console.log(total);
