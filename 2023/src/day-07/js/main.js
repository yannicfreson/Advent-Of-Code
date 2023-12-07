// Puzzle: https://adventofcode.com/2023/day/7

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-07.txt", "utf8")
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

let types = [
  { name: "high-card", value: 1 },
  { name: "one-pair", value: 2 },
  { name: "two-pair", value: 3 },
  { name: "three-of-a-kind", value: 4 },
  { name: "full-house", value: 5 },
  { name: "four-of-a-kind", value: 6 },
  { name: "five-of-a-kind", value: 7 },
];

function partOne(input) {
  let hands = input.split("\n").map((hand) => {
    return {
      cards: hand.split(" ")[0].split(""),
      cardsAsNumbers: hand
        .split(" ")[0]
        .split("")
        .map((card) => {
          switch (card) {
            case "A":
              return 14;
            case "K":
              return 13;
            case "Q":
              return 12;
            case "J":
              return 11;
            case "T":
              return 10;
            default:
              return parseInt(card);
          }
        }),
      bid: parseInt(hand.split(" ")[1]),
      type: null,
      value: null,
      rank: null,
      winnings: null,
    };
  });

  hands.forEach((hand) => {
    let values = hand.cards;
    let uniqueValues = [...new Set(values)];

    // Check for five-of-a-kind
    // where all five cards have the same label: AAAAA
    if (uniqueValues.length === 1) {
      hand.type = "five-of-a-kind";
      hand.value = types.find((type) => type.name === "five-of-a-kind").value;
      return;
    }

    // Check for four-of-a-kind
    // where four cards have the same label: AAAAB
    if (uniqueValues.length === 2) {
      let fourSameFound = false;
      uniqueValues.forEach((value) => {
        if (values.filter((v) => v === value).length === 4) {
          fourSameFound = true;
        }
      });

      if (fourSameFound) {
        hand.type = "four-of-a-kind";
        hand.value = types.find((type) => type.name === "four-of-a-kind").value;
        return;
      }
    }

    // Check for full-house
    // where three cards have the same label and the remaining two cards have the same label: AAABB
    if (uniqueValues.length === 2) {
      let threeSameFound = false;
      let twoSameFound = false;
      uniqueValues.forEach((value) => {
        if (values.filter((v) => v === value).length === 3) {
          threeSameFound = true;
        } else if (values.filter((v) => v === value).length === 2) {
          twoSameFound = true;
        }
      });

      if (threeSameFound && twoSameFound) {
        hand.type = "full-house";
        hand.value = types.find((type) => type.name === "full-house").value;
        return;
      }
    }

    // Check for three-of-a-kind
    // where three cards have the same label: AAABC
    if (uniqueValues.length === 3) {
      let threeSameFound = false;
      uniqueValues.forEach((value) => {
        if (values.filter((v) => v === value).length === 3) {
          threeSameFound = true;
        }
      });

      if (threeSameFound) {
        hand.type = "three-of-a-kind";
        hand.value = types.find(
          (type) => type.name === "three-of-a-kind"
        ).value;
        return;
      }
    }

    // Check for two-pair
    // where two cards have the same label and two other cards have the same label: AABBC
    if (uniqueValues.length === 3) {
      let twoSameFound = false;
      let twoSameFoundAagain = false;
      uniqueValues.forEach((value) => {
        if (values.filter((v) => v === value).length === 2) {
          if (twoSameFound) {
            twoSameFoundAagain = true;
          } else {
            twoSameFound = true;
          }
        }
      });

      if (twoSameFound && twoSameFoundAagain) {
        hand.type = "two-pair";
        hand.value = types.find((type) => type.name === "two-pair").value;
        return;
      }
    }

    // Check for one-pair
    // where two cards have the same label: AABCD
    if (uniqueValues.length === 4) {
      let twoSameFound = false;
      uniqueValues.forEach((value) => {
        if (values.filter((v) => v === value).length === 2) {
          twoSameFound = true;
        }
      });

      if (twoSameFound) {
        hand.type = "one-pair";
        hand.value = types.find((type) => type.name === "one-pair").value;
        return;
      }
    }

    // Check for high-card
    // where all cards have different labels: ABCDE
    if (uniqueValues.length === 5) {
      hand.type = "high-card";
      hand.value = types.find((type) => type.name === "high-card").value;
      return;
    }
  });

  // Sort hands by value. If the value is the same, go over cardsAsNumbers and compare. sort ascending
  hands.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    } else {
      for (let i = 0; i < a.cardsAsNumbers.length; i++) {
        if (a.cardsAsNumbers[i] < b.cardsAsNumbers[i]) {
          return -1;
        } else if (a.cardsAsNumbers[i] > b.cardsAsNumbers[i]) {
          return 1;
        }
      }
    }
  });

  // assign ranks, winnings and return the sum of all winnings
  return (
    hands.forEach(
      (hand, index) => (
        (hand.rank = index + 1), (hand.winnings = hand.rank * hand.bid)
      )
    ),
    hands.reduce((acc, hand) => acc + hand.winnings, 0)
  );
}

function partTwo(input) {
  let hands = input.split("\n").map((hand) => {
    return {
      cards: hand
        .split(" ")[0]
        .split("")
        .map((card) => {
          switch (card) {
            case "A":
              return {
                label: card,
                value: 13,
              };
            case "K":
              return {
                label: card,
                value: 12,
              };
            case "Q":
              return {
                label: card,
                value: 11,
              };
            case "J":
              return {
                label: card,
                value: 1,
              };
            case "T":
              return {
                label: card,
                value: 10,
              };
            default:
              return {
                label: card,
                value: parseInt(card),
              };
          }
        }),
      bid: parseInt(hand.split(" ")[1]),
      type: null,
      value: null,
      rank: null,
      winnings: null,
    };
  });

  hands.forEach((hand) => {
    // change the card labels to the max card if the card label is a J
    let mostOccuringCardLabel = findMostOccuringCardLabel(hand.cards);
    hand.cards.forEach((card) => {
      if (card.label === "J") {
        handContainsJoker = true;
        card.label = mostOccuringCardLabel;
      }
    });

    let labels = hand.cards.map((card) => card.label);
    let uniqueLabels = [...new Set(labels)];

    // Check for five-of-a-kind
    // where all five cards have the same label: AAAAA
    if (uniqueLabels.length === 1) {
      hand.type = "five-of-a-kind";
      hand.value = types.find((type) => type.name === "five-of-a-kind").value;
      return;
    }

    // Check for four-of-a-kind
    // where four cards have the same label: AAAAB
    if (uniqueLabels.length === 2) {
      let fourSameFound = false;
      uniqueLabels.forEach((label) => {
        if (labels.filter((l) => l === label).length === 4) {
          fourSameFound = true;
        }
      });

      if (fourSameFound) {
        hand.type = "four-of-a-kind";
        hand.value = types.find((type) => type.name === "four-of-a-kind").value;
        return;
      }
    }

    // Check for full-house
    // where three cards have the same label and the remaining two cards have the same label: AAABB
    if (uniqueLabels.length === 2) {
      let threeSameFound = false;
      let twoSameFound = false;
      uniqueLabels.forEach((label) => {
        if (labels.filter((l) => l === label).length === 3) {
          threeSameFound = true;
        } else if (labels.filter((l) => l === label).length === 2) {
          twoSameFound = true;
        }
      });

      if (threeSameFound && twoSameFound) {
        hand.type = "full-house";
        hand.value = types.find((type) => type.name === "full-house").value;
        return;
      }
    }

    // Check for three-of-a-kind
    // where three cards have the same label: AAABC
    if (uniqueLabels.length === 3) {
      let threeSameFound = false;
      uniqueLabels.forEach((label) => {
        if (labels.filter((l) => l === label).length === 3) {
          threeSameFound = true;
        }
      });

      if (threeSameFound) {
        hand.type = "three-of-a-kind";
        hand.value = types.find(
          (type) => type.name === "three-of-a-kind"
        ).value;
        return;
      }
    }

    // Check for two-pair
    // where two cards have the same label and two other cards have the same label: AABBC
    if (uniqueLabels.length === 3) {
      let twoSameFound = false;
      let twoSameFoundAagain = false;
      uniqueLabels.forEach((label) => {
        if (labels.filter((l) => l === label).length === 2) {
          if (twoSameFound) {
            twoSameFoundAagain = true;
          } else {
            twoSameFound = true;
          }
        }
      });

      if (twoSameFound && twoSameFoundAagain) {
        hand.type = "two-pair";
        hand.value = types.find((type) => type.name === "two-pair").value;
        return;
      }
    }

    // Check for one-pair
    // where two cards have the same label: AABCD
    if (uniqueLabels.length === 4) {
      let twoSameFound = false;
      uniqueLabels.forEach((label) => {
        if (labels.filter((l) => l === label).length === 2) {
          twoSameFound = true;
        }
      });

      if (twoSameFound) {
        hand.type = "one-pair";
        hand.value = types.find((type) => type.name === "one-pair").value;
        return;
      }
    }

    // Check for high-card
    // where all cards have different labels: ABCDE
    if (uniqueLabels.length === 5) {
      hand.type = "high-card";
      hand.value = types.find((type) => type.name === "high-card").value;
      return;
    }
  });

  // sort hands by value. If the value is the same, go over cards.value and compare. sort ascending
  hands.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    } else {
      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i].value < b.cards[i].value) {
          return -1;
        } else if (a.cards[i].value > b.cards[i].value) {
          return 1;
        }
      }
    }
  });

  // assign ranks, winnings and return the sum of all winnings
  return (
    hands.forEach(
      (hand, index) => (
        (hand.rank = index + 1), (hand.winnings = hand.rank * hand.bid)
      )
    ),
    hands.reduce((acc, hand) => acc + hand.winnings, 0)
  );
}

function findMostOccuringCardLabel(cards) {
  let occurences = [];
  cards.forEach((card) => {
    if (occurences[card.label]) {
      occurences[card.label]++;
    } else {
      occurences[card.label] = 1;
    }
  });

  // sort the occurences object by value, descending
  let sortedOccurences = Object.keys(occurences).sort((a, b) => {
    return occurences[b] - occurences[a];
  });

  // return the first key of the sortedOccurences object, unless it is a J, then return the second key
  return sortedOccurences[0] === "J"
    ? sortedOccurences[1]
    : sortedOccurences[0];
}

main();
