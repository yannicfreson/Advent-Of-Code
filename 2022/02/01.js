const ELF_ROCK_PLAY = "A";
const MY_ROCK_PLAY = "X";
const ROCK_VALUE = 1;

const ELF_PAPER_PLAY = "B";
const MY_PAPER_PLAY = "Y";
const PAPER_VALUE = 2;

const ELF_SCISSORS_PLAY = "C";
const MY_SCISSORS_PLAY = "Z";
const SCISSORS_VALUE = 3;

const LOSE_POINTS = 0;
const DRAW_POINTS = 3;
const WIN_POINTS = 6;

let score = 0;

require("fs").readFileSync("./input.txt", "utf8").split("\n").forEach((line) => {
  let elfPlay = line.split(" ")[0];
  let myPlay = line.split(" ")[1];

  let result = "";
  if (elfPlay === ELF_ROCK_PLAY) {
    if (myPlay === MY_ROCK_PLAY) {
      result = "DRAW";
    } else if (myPlay === MY_PAPER_PLAY) {
      result = "WIN";
    } else if (myPlay === MY_SCISSORS_PLAY) {
      result = "LOSE";
    }
  } else if (elfPlay === ELF_PAPER_PLAY) {
    if (myPlay === MY_ROCK_PLAY) {
      result = "LOSE";
    } else if (myPlay === MY_PAPER_PLAY) {
      result = "DRAW";
    } else if (myPlay === MY_SCISSORS_PLAY) {
      result = "WIN";
    }
  } else if (elfPlay === ELF_SCISSORS_PLAY) {
    if (myPlay === MY_ROCK_PLAY) {
      result = "WIN";
    } else if (myPlay === MY_PAPER_PLAY) {
      result = "LOSE";
    } else if (myPlay === MY_SCISSORS_PLAY) {
      result = "DRAW";
    }
  }

  if (result === "WIN") {
    score += WIN_POINTS;
    if (myPlay === MY_ROCK_PLAY) {
      score += ROCK_VALUE;
    } else if (myPlay === MY_PAPER_PLAY) {
      score += PAPER_VALUE;
    } else if (myPlay === MY_SCISSORS_PLAY) {
      score += SCISSORS_VALUE;
    }
  } else if (result === "DRAW") {
    score += DRAW_POINTS;
    if (myPlay === MY_ROCK_PLAY) {
      score += ROCK_VALUE;
    } else if (myPlay === MY_PAPER_PLAY) {
      score += PAPER_VALUE;
    } else if (myPlay === MY_SCISSORS_PLAY) {
      score += SCISSORS_VALUE;
    }
  } else if (result === "LOSE") {
    score += LOSE_POINTS;
    if (myPlay === MY_ROCK_PLAY) {
      score += ROCK_VALUE;
    } else if (myPlay === MY_PAPER_PLAY) {
      score += PAPER_VALUE;
    } else if (myPlay === MY_SCISSORS_PLAY) {
      score += SCISSORS_VALUE;
    }
  }
});

console.log(score);
