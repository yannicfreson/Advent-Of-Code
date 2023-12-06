const fs = require("fs");
let input;
let lineCoords = [];
let xMax = 0;
let yMax = 0;
let matrix = [];

// same as part one, but now also consider diagonal lines
fs.readFile("input.txt", "utf8", function (err, data) {
  // Parse input
  input = data.split("\n");
  input.pop();
  input.forEach((e) => {
    let coords = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    coords.x1 = parseInt(e.split(" -> ")[0].split(",")[0]);
    coords.y1 = parseInt(e.split(" -> ")[0].split(",")[1]);
    coords.x2 = parseInt(e.split(" -> ")[1].split(",")[0]);
    coords.y2 = parseInt(e.split(" -> ")[1].split(",")[1]);
    lineCoords.push(coords);
  });

  // Determine size of matrix
  lineCoords.forEach((line) => {
    if (line.x1 > xMax) {
      xMax = line.x1;
    } else if (line.x2 > xMax) {
      xMax = line.x2;
    }

    if (line.y1 > yMax) {
      yMax = line.y1;
    } else if (line.y2 > yMax) {
      yMax = line.y2;
    }
  });

  // Create matrix
  for (let y = 0; y < yMax; y++) {
    matrix.push([]);
    for (let x = 0; x < xMax; x++) {
      matrix[y].push(0);
    }
  }

  // Draw lines
  lineCoords.forEach((line) => {
    // Is vertical?
    if (line.x1 === line.x2) {
      let start;
      let end;

      // Determine start and end of line
      if (line.y1 < line.y2) {
        start = line.y1;
        end = line.y2;
      } else if (line.y1 > line.y2) {
        start = line.y2;
        end = line.y1;
      }

      for (let row = 0; row < matrix.length; row++) {
        if (row >= start && row <= end) {
          matrix[row][line.x1]++;
        }
      }
    }

    // Is horizontal?
    if (line.y1 === line.y2) {
      let start;
      let end;

      // Determine start and end of line
      if (line.x1 < line.x2) {
        start = line.x1;
        end = line.x2;
      } else if (line.x1 > line.x2) {
        start = line.x2;
        end = line.x1;
      }

      for (let row = 0; row < matrix.length; row++) {
        if (row === line.y1) {
          for (let col = 0; col < matrix[row].length; col++) {
            if (col >= start && col <= end) {
              matrix[row][col]++;
            }
          }
        }
      }
    }

    // Is diagonal?
    if (line.x1 !== line.x2 && line.y1 !== line.y2) {
      let startX, startY, endX, endY;

      // Determine start and end of line
      if (line.x1 < line.x2) {
        startX = line.x1;
        startY = line.y1;
        endX = line.x2;
        endY = line.y2;
      } else {
        startX = line.x2;
        startY = line.y2;
        endX = line.x1;
        endY = line.y1;
      }

      for (let x = startX; x <= endX; x++) {
        const y = Math.round(
          (startY * (endX - x) + endY * (x - startX)) / (endX - startX)
        );
        matrix[y][x]++;
      }
    }
  });

  let overlaps = 0;
  matrix.flat(1).forEach((n) => {
    if (n > 1) {
      overlaps++;
    }
  });

  // draw matrix
  matrix.forEach((row) => {
    row = row.map((n) => {
      if (n === 0) {
        return " ";
      } else if (n === 1) {
        return "░";
      } else if (n > 1) {
        return "█";
      }
    });
    console.log(row.join(""));
  });

  console.log(overlaps);
});
