import { readFileSync } from 'node:fs';

const calibrationDoc = readFileSync('day-01.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(calibrationDoc);

function getFirstAndLastDigit(str) {
  const digits = str.match(/\d/g);

  if (!digits) {
    return null;
  }

  return [parseInt(digits[0], 10), parseInt(digits[digits.length - 1], 10)];
}

function part1() {
  const nums = [];
  const values = [];

  calibrationDoc.forEach((line) => values.push(getFirstAndLastDigit(line)));

  values.forEach((val) => {
    nums.push(parseInt(`${val[0]}${val[val.length - 1]}`));
  });

  return nums.reduce((acc, num) => acc + num);
}

// const answer = part1();
// console.log(answer);

////////////////////////////////////////////////////////////////////////
function isDigit(char) {
  return /^\d$/.test(char);
}

function part2() {
  let sum = 0;

  for (const line of calibrationDoc) {
    let digits = [];

    for (let i = 0; i < line.length; i++) {
      const c = line[i];

      if (isDigit(c)) {
        digits.push(c);
      }

      const textDigits = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ];

      const lineSubstring = line.substring(i);

      for (let d = 0; d < textDigits.length; d++) {
        const textDigit = textDigits[d];
        if (lineSubstring.startsWith(textDigit)) {
          digits.push(d + 1);
        }
      }
    }

    const lastIndex = digits.length - 1;
    const twoDigits = `${digits[0]}${digits[lastIndex]}`;

    sum += Number(twoDigits);
  }

  console.log(sum);
}

part2();
