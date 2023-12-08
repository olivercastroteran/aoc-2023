import { readFileSync } from 'node:fs';

const input = readFileSync('day-08.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(input);

function part1(curr) {
  let steps = 0;
  const map = {};
  let [instructions, , ...lines] = input;
  // let curr = 'AAA';

  lines.forEach((line) => {
    const [key, dest] = line.split(' = ');
    map[key] = dest.slice(1, 9).split(', ');
  });

  let i = 0;
  while (curr[2] !== 'Z') {
    let position = instructions[i % instructions.length] === 'L' ? 0 : 1;
    curr = map[curr][position];
    steps++;
    i++;
  }

  // console.log({ instructions, map });
  // console.log(steps);
  return steps;
}

// part1();
///////////////////////////////////////////////////////////////////////
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Function to find the least common multiple (LCM) of two numbers
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// Function to find the LCM of an array of numbers
function findLCM(numbers) {
  if (numbers.length < 2) {
    throw new Error('At least two numbers are required to find the LCM.');
  }

  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}

function part2() {
  let steps = 0;
  const map = {};
  let [instructions, , ...lines] = input;
  let currSteps = [];
  let allEndWithZ = false;

  lines.forEach((line) => {
    const [key, dest] = line.split(' = ');
    map[key] = dest.slice(1, 9).split(', ');
    if (key[2] === 'A') currSteps.push(key);
  });

  console.log(findLCM(currSteps.map((step) => part1(step))));
}

part2();
