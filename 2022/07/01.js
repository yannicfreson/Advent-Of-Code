let inputLines = require("fs")
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n");

let directoryTree = { "/": [] };

let path = [];

/* 
{
  "/": [
    {
      path: "/a",
      children: [
        {
          path: "/a/e",
          children: [{ i: 584 }],
        },
        { f: 29116 },
        { g: 2557 },
        { "h.lst": 62596 },
      ],
    },
    { "b.txt": 14848514 },
    { "c.dat": 8504156 },
    {
      path: "/d",
      children: [
        { j: 4060174 },
        { "d.log": 8033020 },
        { "d.ext": 5626152 },
        { k: 7214296 },
      ],
    },
  ],
};
*/

inputLines.forEach((line) => {
  if (line.split(" ")[0] === "$") {
    let command = line.split(" ")[1];
    if (command === "cd") {
      let dirName = line.split(" ")[2];
      if (dirName === "/") {
        path = [];
      } else if (dirName === "..") {
        path.pop();
      } else {
        path.push(dirName);
      }
    }
  } else if (line.split(" ")[0] === "dir") {
    let dirName = line.split(" ")[1];
    let target = directoryTree["/"];
    path.forEach((e) => {
      let potentialNewTarget = target.find((item) => {
        return item.path === `/${e}`;
      });

      if (potentialNewTarget) {
        target = potentialNewTarget.children;
      }
    });
    target.push({ path: `/${dirName}`, children: [] });
  } else {
    let [size, name] = line.split(" ");
    let target = directoryTree["/"];
    path.forEach((e) => {
      target = target.find((item) => {
        return item.path === `/${e}`;
      }).children;
    });
    target.push({ name, size: parseInt(size) });
  }
});

let folderSizes = [];
function calculateSizeOfFolder(folder) {
  let total = 0;
  folder.forEach((child) => {
    if (!child.path) {
      total += child.size;
    } else {
      total += calculateSizeOfFolder(child.children);
    }
  });
  folderSizes.push(total);
  return total;
}

calculateSizeOfFolder(directoryTree["/"]);
console.log(
  folderSizes
    .filter((folderSize) => folderSize <= 100000)
    .reduce((acc, curr) => acc + curr)
);
