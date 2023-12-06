const fs = require("fs");
let input;
// this represents how many fish are in each state. the state is how many days are left until the fish produces a new fish. when a fish is produced, it is added to 8, which is the state of a new fish.
let lanternfishStateTracker = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

fs.readFile("input.txt", "utf8", function (err, data) {
  // Parse input
  input = data.trim().split(",");
  input.forEach((element) => {
    lanternfishStateTracker[element]++;
  });

  function lanternfishDay() {
    let fishToAdd = lanternfishStateTracker[0];
    for (let i = 0; i < 8; i++) {
      lanternfishStateTracker[i] = lanternfishStateTracker[i + 1];
    }
    lanternfishStateTracker[6] += fishToAdd;
    lanternfishStateTracker[8] = fishToAdd;
  }

  for (let days = 0; days < 256; days++) {
    lanternfishDay();
  }

  let sum = 0;
  for (let i = 0; i <= 8; i++) {
    sum += lanternfishStateTracker[i];
  }

  console.log(lanternfishStateTracker);
  console.log(sum);
});
