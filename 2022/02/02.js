const ELF_ROCK_PLAY = "A";
const ELF_PAPER_PLAY = "B";
const ELF_SCISSORS_PLAY = "C";

const LOSE = "X";
const DRAW = "Y";
const WIN = "Z";

const ROCK_VALUE = 1;
const PAPER_VALUE = 2;
const SCISSORS_VALUE = 3;

const LOSE_POINTS = 0;
const DRAW_POINTS = 3;
const WIN_POINTS = 6;

let score = 0;

require("fs").readFileSync("./input.txt", "utf8").split("\n").forEach((line) => {
  let elfPlay = line.split(" ")[0];
  let outcome = line.split(" ")[1];

  if (elfPlay === ELF_ROCK_PLAY) {
    if (outcome === LOSE) {
      score += LOSE_POINTS;
      score += SCISSORS_VALUE;
    } else if (outcome === DRAW) {
      score += DRAW_POINTS;
      score += ROCK_VALUE;
    } else if (outcome === WIN) {
      score += WIN_POINTS;
      score += PAPER_VALUE;
    }
  } else if (elfPlay === ELF_PAPER_PLAY) {
    if (outcome === LOSE) {
      score += LOSE_POINTS;
      score += ROCK_VALUE;
    } else if (outcome === DRAW) {
      score += DRAW_POINTS;
      score += PAPER_VALUE;
    } else if (outcome === WIN) {
      score += WIN_POINTS;
      score += SCISSORS_VALUE;
    }
  } else if (elfPlay === ELF_SCISSORS_PLAY) {
    if (outcome === LOSE) {
      score += LOSE_POINTS;
      score += PAPER_VALUE;
    } else if (outcome === DRAW) {
      score += DRAW_POINTS;
      score += SCISSORS_VALUE;
    } else if (outcome === WIN) {
      score += WIN_POINTS;
      score += ROCK_VALUE;
    }
  }
});

console.log(score);
