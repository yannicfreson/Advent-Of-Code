// Puzzle: https://adventofcode.com/2023/day/4

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-04.txt", "utf8")
  .trim();

function main() {
  let now = Date.now();
  let part1 = partOne(INPUT);
  let duration = Date.now() - now;
  console.log(`Part 1: ${part1} (took: ${duration}ms)`);

  now = Date.now();
  let part2 = partTwo(INPUT);
  duration = Date.now() - now;
  console.log(`Part 2: ${part2} (took: ${duration}ms)`);
}

function partOne(input) {
  let cards = input.split("\n");
  let points = 0;

  cards.forEach((card) => {
    let winningNumbers = card
      .split(":")[1]
      .trim()
      .split("|")[0]
      .split(/\s+/)
      .filter((n) => n)
      .map((n) => parseInt(n));

    let myNumbers = card
      .split(":")[1]
      .trim()
      .split("|")[1]
      .split(/\s+/)
      .filter((n) => n)
      .map((n) => parseInt(n));

    let matches = 0;
    myNumbers.forEach((n) => {
      if (winningNumbers.includes(n)) {
        matches++;
      }
    });

    let cardValue = 0;
    if (matches > 0) {
      cardValue = 1;
    }
    for (let i = 1; i < matches; i++) {
      cardValue *= 2;
    }

    points += cardValue;
  });

  return points;
}

function partTwo(input) {
  let cards = input.split("\n");
  let cardsInputSimplified = [];
  let resultCards = [];

  cards.forEach((card) => {
    simplifyCard(card);
  });

  function simplifyCard(card) {
    let cardId = parseInt(card.split(":")[0].split("Card")[1].trim());
    let winningNumbers = card
      .split(":")[1]
      .trim()
      .split("|")[0]
      .split(/\s+/)
      .filter((n) => n)
      .map((n) => parseInt(n));

    let myNumbers = card
      .split(":")[1]
      .trim()
      .split("|")[1]
      .split(/\s+/)
      .filter((n) => n)
      .map((n) => parseInt(n));

    let matches = 0;
    myNumbers.forEach((n) => {
      if (winningNumbers.includes(n)) {
        matches++;
      }
    });

    cardsInputSimplified.push({
      id: cardId,
      matches: matches,
    });
  }

  cardsInputSimplified.forEach((card) => {
    resultCards.push({
      id: card.id,
      amount: 1,
    });
  });

  cardsInputSimplified.forEach((card) => {
    for (let i = 0; i < card.matches; i++) {
      resultCards.find((c) => c.id === card.id + i + 1).amount +=
        resultCards.find((c) => c.id === card.id).amount;
    }
  });

  let result = 0;
  resultCards.forEach((card) => {
    result += card.amount;
  });

  return result;
}

main();
