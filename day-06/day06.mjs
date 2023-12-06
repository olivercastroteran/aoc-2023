import { readFileSync } from 'node:fs';

const input = readFileSync('day-06.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(input);

function part1() {
  const possibilities = [];
  let hold = 0;
  let speed = 0;
  let distance = 0;
  const times = input[0].split(':')[1].trim().split(/\s+/).map(Number);
  const distances = input[1].split(':')[1].trim().split(/\s+/).map(Number);

  times.forEach((time, index) => {
    let count = 0;

    for (let i = 0; i <= time; i++) {
      hold = i;
      speed = i;
      distance = speed * (time - hold);

      // console.log(`Distance ${i + 1}: ${distance}`);
      if (distance > distances[index]) {
        count++;
      }
    }

    possibilities.push(count);
  });

  // console.log(possibilities);
  const res = possibilities.reduce((acc, num) => acc * num, 1);
  // console.log(res);
}

part1();
////////////////////////////////////////////////////////////////
function combineNumbers(inputString) {
  const numbersArray = inputString.split(/\s+/).map(Number);
  const combinedNumber = parseInt(numbersArray.join(''), 10);
  return combinedNumber;
}

function part2() {
  const time = combineNumbers(input[0].split(':')[1].trim());
  const distance = combineNumbers(input[1].split(':')[1].trim());
  let hold = 0;
  let speed = 0;
  let dist = 0;
  let count = 0;

  for (let i = 0; i <= time; i++) {
    hold = i;
    speed = i;
    dist = speed * (time - hold);

    if (dist > distance) {
      count++;
    }
  }

  console.log(count);
}

part2();
