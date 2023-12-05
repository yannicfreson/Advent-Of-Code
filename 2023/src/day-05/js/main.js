// Puzzle: https://adventofcode.com/2023/day/5

const fs = require("fs");

const INPUT = fs
  .readFileSync("../../../../2023/data/day-05.txt", "utf8")
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
  let seeds = input
    .split("\n")[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => {
      return {
        seed: parseInt(seed),
        soil: null,
        fertilizer: null,
        water: null,
        light: null,
        temperature: null,
        humidity: null,
        location: null,
      };
    });

  let seedToSoilMap = input
    .split("\n\n")[1]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  let soilToFertilizerMap = input
    .split("\n\n")[2]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  let fertilizerToWaterMap = input
    .split("\n\n")[3]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  let waterToLightMap = input
    .split("\n\n")[4]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  let lightToTemperatureMap = input
    .split("\n\n")[5]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  let temperatureToHumidityMap = input
    .split("\n\n")[6]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  let humidityToLocationMap = input
    .split("\n\n")[7]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });

  seeds.forEach((seed) => {
    // for every range in the seedToSoilMap, check if the seed is in the range
    let soilHasBeenSet = false;
    seedToSoilMap.forEach((range) => {
      // if the seed is in the range, set its soil to the corresponding value in the destination range
      if (
        seed.seed >= range.sourceRangeStart &&
        seed.seed < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.soil =
          range.destinationRangeStart + seed.seed - range.sourceRangeStart;
        soilHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its soil to its seed value
    if (!soilHasBeenSet) {
      seed.soil = seed.seed;
    }

    // for every range in the soilToFertilizerMap, check if the seed is in the range
    let fertilizerHasBeenSet = false;
    soilToFertilizerMap.forEach((range) => {
      // if the seed is in the range, set its fertilizer to the corresponding value in the destination range
      if (
        seed.soil >= range.sourceRangeStart &&
        seed.soil < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.fertilizer =
          range.destinationRangeStart + seed.soil - range.sourceRangeStart;
        fertilizerHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its fertilizer to its soil value
    if (!fertilizerHasBeenSet) {
      seed.fertilizer = seed.soil;
    }

    // for every range in the fertilizerToWaterMap, check if the seed is in the range
    let waterHasBeenSet = false;
    fertilizerToWaterMap.forEach((range) => {
      // if the seed is in the range, set its water to the corresponding value in the destination range
      if (
        seed.fertilizer >= range.sourceRangeStart &&
        seed.fertilizer < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.water =
          range.destinationRangeStart +
          seed.fertilizer -
          range.sourceRangeStart;
        waterHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its water to its fertilizer value
    if (!waterHasBeenSet) {
      seed.water = seed.fertilizer;
    }

    // for every range in the waterToLightMap, check if the seed is in the range
    let lightHasBeenSet = false;
    waterToLightMap.forEach((range) => {
      // if the seed is in the range, set its light to the corresponding value in the destination range
      if (
        seed.water >= range.sourceRangeStart &&
        seed.water < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.light =
          range.destinationRangeStart + seed.water - range.sourceRangeStart;
        lightHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its light to its water value
    if (!lightHasBeenSet) {
      seed.light = seed.water;
    }

    // for every range in the lightToTemperatureMap, check if the seed is in the range
    let temperatureHasBeenSet = false;
    lightToTemperatureMap.forEach((range) => {
      // if the seed is in the range, set its temperature to the corresponding value in the destination range
      if (
        seed.light >= range.sourceRangeStart &&
        seed.light < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.temperature =
          range.destinationRangeStart + seed.light - range.sourceRangeStart;
        temperatureHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its temperature to its light value
    if (!temperatureHasBeenSet) {
      seed.temperature = seed.light;
    }

    // for every range in the temperatureToHumidityMap, check if the seed is in the range
    let humidityHasBeenSet = false;
    temperatureToHumidityMap.forEach((range) => {
      // if the seed is in the range, set its humidity to the corresponding value in the destination range
      if (
        seed.temperature >= range.sourceRangeStart &&
        seed.temperature < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.humidity =
          range.destinationRangeStart +
          seed.temperature -
          range.sourceRangeStart;
        humidityHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its humidity to its temperature value
    if (!humidityHasBeenSet) {
      seed.humidity = seed.temperature;
    }

    // for every range in the humidityToLocationMap, check if the seed is in the range
    let locationHasBeenSet = false;
    humidityToLocationMap.forEach((range) => {
      // if the seed is in the range, set its location to the corresponding value in the destination range
      if (
        seed.humidity >= range.sourceRangeStart &&
        seed.humidity < range.sourceRangeStart + range.rangeLength
      ) {
        // calculate the difference between the seed and the start of the source range
        seed.location =
          range.destinationRangeStart + seed.humidity - range.sourceRangeStart;
        locationHasBeenSet = true;
      }
    });
    // if the seed is not in any of the ranges, set its location to its humidity value
    if (!locationHasBeenSet) {
      seed.location = seed.humidity;
    }
  });

  // find the seed with the lowest location
  return seeds.sort((a, b) => a.location - b.location)[0].location;
}

function partTwo(input) {
  let seeds = input
    .split("\n")[0]
    .split(": ")[1]
    .split(" ")
    .map((seed) => {
      return parseInt(seed);
    });

  let seedToSoilMap = input
    .split("\n\n")[1]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ seedToSoilMap });

  let soilToFertilizerMap = input
    .split("\n\n")[2]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ soilToFertilizerMap });

  let fertilizerToWaterMap = input
    .split("\n\n")[3]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ fertilizerToWaterMap });

  let waterToLightMap = input
    .split("\n\n")[4]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ waterToLightMap });

  let lightToTemperatureMap = input
    .split("\n\n")[5]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ lightToTemperatureMap });

  let temperatureToHumidityMap = input
    .split("\n\n")[6]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ temperatureToHumidityMap });

  let humidityToLocationMap = input
    .split("\n\n")[7]
    .split("\n")
    .slice(1)
    .map((line) => {
      return {
        destinationRangeStart: parseInt(line.split(" ")[0]),
        sourceRangeStart: parseInt(line.split(" ")[1]),
        rangeLength: parseInt(line.split(" ")[2]),
      };
    });
  //console.log({ humidityToLocationMap });

  let smallestLocation = Infinity;

  // make pairs of the entries in the seeds array
  let pairs = [];
  for (let i = 0; i < seeds.length; i += 2) {
    pairs.push({
      startOfRange: seeds[i],
      lengthOfRange: seeds[i + 1],
    });
  }

  let seed = {
    seed: null,
    soil: null,
    fertilizer: null,
    water: null,
    light: null,
    temperature: null,
    humidity: null,
    location: null,
  };

  pairs.forEach((pair) => {
    // loop over the range of the pair, and check if the seed is in the range
    for (
      let i = pair.startOfRange;
      i < pair.startOfRange + pair.lengthOfRange;
      i++
    ) {
      // fill in the seed object, ready for another run
      seed.seed = i;
      seed.soil = null;
      seed.fertilizer = null;
      seed.water = null;
      seed.light = null;
      seed.temperature = null;
      seed.humidity = null;
      seed.location = null;

      // for every range in the seedToSoilMap, check if the seed is in the range
      let soilHasBeenSet = false;
      seedToSoilMap.forEach((range) => {
        // if the seed is in the range, set its soil to the corresponding value in the destination range
        if (
          seed.seed >= range.sourceRangeStart &&
          seed.seed < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.soil =
            range.destinationRangeStart + seed.seed - range.sourceRangeStart;
          soilHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its soil to its seed value
      if (!soilHasBeenSet) {
        seed.soil = seed.seed;
      }

      // for every range in the soilToFertilizerMap, check if the seed is in the range
      let fertilizerHasBeenSet = false;
      soilToFertilizerMap.forEach((range) => {
        // if the seed is in the range, set its fertilizer to the corresponding value in the destination range
        if (
          seed.soil >= range.sourceRangeStart &&
          seed.soil < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.fertilizer =
            range.destinationRangeStart + seed.soil - range.sourceRangeStart;
          fertilizerHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its fertilizer to its soil value
      if (!fertilizerHasBeenSet) {
        seed.fertilizer = seed.soil;
      }

      // for every range in the fertilizerToWaterMap, check if the seed is in the range
      let waterHasBeenSet = false;
      fertilizerToWaterMap.forEach((range) => {
        // if the seed is in the range, set its water to the corresponding value in the destination range
        if (
          seed.fertilizer >= range.sourceRangeStart &&
          seed.fertilizer < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.water =
            range.destinationRangeStart +
            seed.fertilizer -
            range.sourceRangeStart;
          waterHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its water to its fertilizer value
      if (!waterHasBeenSet) {
        seed.water = seed.fertilizer;
      }

      // for every range in the waterToLightMap, check if the seed is in the range
      let lightHasBeenSet = false;
      waterToLightMap.forEach((range) => {
        // if the seed is in the range, set its light to the corresponding value in the destination range
        if (
          seed.water >= range.sourceRangeStart &&
          seed.water < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.light =
            range.destinationRangeStart + seed.water - range.sourceRangeStart;
          lightHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its light to its water value
      if (!lightHasBeenSet) {
        seed.light = seed.water;
      }

      // for every range in the lightToTemperatureMap, check if the seed is in the range
      let temperatureHasBeenSet = false;
      lightToTemperatureMap.forEach((range) => {
        // if the seed is in the range, set its temperature to the corresponding value in the destination range
        if (
          seed.light >= range.sourceRangeStart &&
          seed.light < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.temperature =
            range.destinationRangeStart + seed.light - range.sourceRangeStart;
          temperatureHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its temperature to its light value
      if (!temperatureHasBeenSet) {
        seed.temperature = seed.light;
      }

      // for every range in the temperatureToHumidityMap, check if the seed is in the range
      let humidityHasBeenSet = false;
      temperatureToHumidityMap.forEach((range) => {
        // if the seed is in the range, set its humidity to the corresponding value in the destination range
        if (
          seed.temperature >= range.sourceRangeStart &&
          seed.temperature < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.humidity =
            range.destinationRangeStart +
            seed.temperature -
            range.sourceRangeStart;
          humidityHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its humidity to its temperature value
      if (!humidityHasBeenSet) {
        seed.humidity = seed.temperature;
      }

      // for every range in the humidityToLocationMap, check if the seed is in the range
      let locationHasBeenSet = false;
      humidityToLocationMap.forEach((range) => {
        // if the seed is in the range, set its location to the corresponding value in the destination range
        if (
          seed.humidity >= range.sourceRangeStart &&
          seed.humidity < range.sourceRangeStart + range.rangeLength
        ) {
          // calculate the difference between the seed and the start of the source range
          seed.location =
            range.destinationRangeStart +
            seed.humidity -
            range.sourceRangeStart;
          locationHasBeenSet = true;
        }
      });
      // if the seed is not in any of the ranges, set its location to its humidity value
      if (!locationHasBeenSet) {
        seed.location = seed.humidity;
      }

      // if the location of the seed is smaller than the smallest location, set the smallest location to the location of the seed
      if (seed.location < smallestLocation) {
        smallestLocation = seed.location;
      }
    }
  });

  return smallestLocation;
}

main();
