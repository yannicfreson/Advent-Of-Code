function main() {
  let now = Date.now();
  console.log(`Part 1: ${require("fs").readFileSync("../../../../2023/data/day-13.txt", "utf8").trim().split("\n\n").map((p) => fs(p.split("\n").map((r) => r.split("")), Math.ceil(p.split("\n").map((r) => r.split(""))[0].length / 2), p.split("\n").map((r) => r.split(""))[0].length % 2, 0) || fs(Array.from({ length: p.split("\n")[0].length }, (_, i) => Array.from(p.split("\n"), (r) => r.charAt(i))), Math.ceil(Array.from({ length: p.split("\n")[0].length }, (_, i) => Array.from(p.split("\n"), (r) => r.charAt(i)))[0].length / 2), Array.from({ length: p.split("\n")[0].length }, (_, i) => Array.from(p.split("\n"), (r) => r.charAt(i)))[0].length % 2, 0) * 100).reduce((a, v) => a + v, 0)} (took: ${Date.now() - now}ms)`);

  now = Date.now();
  console.log(`Part 2: ${require("fs").readFileSync("../../../../2023/data/day-13.txt", "utf8").trim().split("\n\n").map((p) => fs(p.split("\n").map((r) => r.split("")), Math.ceil(p.split("\n").map((r) => r.split(""))[0].length / 2), p.split("\n").map((r) => r.split(""))[0].length % 2, 1) || fs(Array.from({ length: p.split("\n")[0].length }, (_, i) => Array.from(p.split("\n"), (r) => r.charAt(i))), Math.ceil(Array.from({ length: p.split("\n")[0].length }, (_, i) => Array.from(p.split("\n"), (r) => r.charAt(i)))[0].length / 2), Array.from({ length: p.split("\n")[0].length }, (_, i) => Array.from(p.split("\n"), (r) => r.charAt(i)))[0].length % 2, 1) * 100).reduce((a, v) => a + v, 0)} (took: ${Date.now() - now}ms)`);
}

function fs(r, mc, o, s) {
  for (let i = 0; i < mc - 1; i++) {
    if (r.reduce((td, r) => td + Array.from({ length: Math.min(r.slice(0, mc + i).length, r.slice(mc + i).length) }, (_, j) => r.slice(mc + i)[j] == r.slice(0, mc + i).at(-j - 1) ? 0 : 1).reduce((a, v) => a + v, 0), 0) == s) return mc + i;

    if (r.reduce((td, r) => td + Array.from({ length: Math.min(r.slice(0, mc - i).length, r.slice(mc - i).length) }, (_, j) => r.slice(mc - i)[j] == r.slice(0, mc - i).at(-j - 1) ? 0 : 1).reduce((a, v) => a + v, 0), 0) == s) return mc - i;
  }

  if (o && r.reduce((td, r) => td + Array.from({ length: Math.min(r.slice(0, 1).length, r.slice(1).length) }, (_, j) => (r.slice(1)[j] == r.slice(0, 1).at(-j - 1) ? 0 : 1)).reduce((a, v) => a + v, 0), 0) == s) return 1;
}

main();

