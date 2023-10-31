let treesGrid = require("fs")
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

function countVisibleTrees(grid) {
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      let height = grid[row][column];
      let visibleFromTop = true;
      let visibleFromBottom = true;
      let visibleFromLeft = true;
      let visibleFromRight = true;

      for (let i = 0; i < row; i++) {
        if (grid[i][column] >= height) {
          visibleFromTop = false;
          break;
        }
      }
      for (let i = grid.length - 1; i > row; i--) {
        if (grid[i][column] >= height) {
          visibleFromBottom = false;
          break;
        }
      }
      for (let i = 0; i < column; i++) {
        if (grid[row][i] >= height) {
          visibleFromLeft = false;
          break;
        }
      }
      for (let i = grid[row].length - 1; i > column; i--) {
        if (grid[row][i] >= height) {
          visibleFromRight = false;
          break;
        }
      }

      if (
        visibleFromTop ||
        visibleFromBottom ||
        visibleFromLeft ||
        visibleFromRight
      ) {
        count++;
      }
    }
  }

  return count;
}

console.log(countVisibleTrees(treesGrid));
