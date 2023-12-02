import { readFileSync } from 'node:fs';

const games = readFileSync('day-02.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(games);

function checkIfPossible(set) {
  // bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes
  let allPossible = true;

  set.forEach((game) => {
    if (game.red > 12 || game.green > 13 || game.blue > 14) {
      allPossible = false;
    }
  });

  if (allPossible) {
    return true;
  } else {
    return false;
  }
}

function convertArrayToObject(array) {
  const resultObject = {};

  array.forEach((element) => {
    const [number, color] = element.split(' ');
    const parsedNumber = parseInt(number, 10);

    if (!isNaN(parsedNumber) && color) {
      resultObject[color.toLowerCase()] = parsedNumber;
    }
  });

  return resultObject;
}

function part1() {
  const ids = [];
  const subSets = [];

  games.forEach((game, i) => {
    const [gameId, sets] = game.split(': ');

    subSets[i] = sets.split('; ');
    sets.split('; ').forEach((subSet, j) => {
      subSets[i][j] = convertArrayToObject(subSet.split(', '));
    });

    if (checkIfPossible(subSets[i])) {
      ids.push(+gameId.split(' ')[1]);
    }
  });

  // console.log(ids);
  // console.log(subSets);
  const res = ids.reduce((acc, num) => acc + num, 0);
  console.log(res);
}

// part1();
///////////////////////////////////////////////////////////////////
function getMinNumberOfCubes(games) {
  let minReds = 0;
  let minGreens = 0;
  let minBlues = 0;

  games.forEach((game) => {
    minReds = game.red > minReds ? game.red : minReds;
    minGreens = game.green > minGreens ? game.green : minGreens;
    minBlues = game.blue > minBlues ? game.blue : minBlues;
  });

  return minReds * minGreens * minBlues;
}

function part2() {
  const powers = [];
  const subSets = [];

  games.forEach((game, i) => {
    const [gameId, sets] = game.split(': ');

    subSets[i] = sets.split('; ');
    sets.split('; ').forEach((subSet, j) => {
      subSets[i][j] = convertArrayToObject(subSet.split(', '));
    });

    powers.push(getMinNumberOfCubes(subSets[i]));
  });

  // console.log(powers);
  // console.log(subSets);
  const res = powers.reduce((acc, num) => acc + num, 0);
  console.log(res);
}

part2();
