let treesGrid = require("fs")
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

function getScenicScores(grid) {
  let scenicScores = [];

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      let height = grid[row][column];
      let treesVisibleOnTop = 0;
      let treesVisibleOnBottom = 0;
      let treesVisibleOnLeft = 0;
      let treesVisibleOnRight = 0;

      for (let i = row + 1; i < grid.length; i++) {
        if (grid[i][column] >= height) {
          treesVisibleOnBottom++;
          break;
        } else {
          treesVisibleOnBottom++;
        }
      }
      for (let i = row - 1; i >= 0; i--) {
        if (grid[i][column] >= height) {
          treesVisibleOnTop++;
          break;
        } else {
          treesVisibleOnTop++;
        }
      }
      for (let i = column + 1; i < grid[row].length; i++) {
        if (grid[row][i] >= height) {
          treesVisibleOnRight++;
          break;
        } else {
          treesVisibleOnRight++;
        }
      }
      for (let i = column - 1; i >= 0; i--) {
        if (grid[row][i] >= height) {
          treesVisibleOnLeft++;
          break;
        } else {
          treesVisibleOnLeft++;
        }
      }

      scenicScores.push(
        treesVisibleOnTop *
          treesVisibleOnBottom *
          treesVisibleOnLeft *
          treesVisibleOnRight
      );
    }
  }

  return Math.max(...scenicScores);
}

console.log(getScenicScores(treesGrid));
