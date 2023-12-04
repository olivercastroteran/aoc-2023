import { readFileSync } from 'node:fs';

const engine = readFileSync('day-03.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(engine);

function hasSymbol(str) {
  if (str?.length && str.split('').find((x) => isNaN(x) && x !== '.')) {
    return true;
  }
  return false;
}

function part1() {
  const rows = engine.length;
  const cols = engine[0].length;

  const foundNums = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const n = '' + engine[i][j];
      if (isNaN(n)) continue;

      let num = n;

      while (++j < cols) {
        if (Number.isInteger(parseInt(engine[i][j]))) {
          num += engine[i][j];
        } else {
          break;
        }
      }

      const top =
        i === 0 ? '' : engine[i - 1].substring(j - num.length - 1, j + 1);
      const btm =
        i === rows - 1
          ? ''
          : engine[i + 1].substring(j - num.length - 1, j + 1);
      const lft = engine[i][j - num.length - 1] || '';
      const rgt = engine[i][j] || '';

      if (
        hasSymbol(top) ||
        hasSymbol(btm) ||
        hasSymbol(lft) ||
        hasSymbol(rgt)
      ) {
        foundNums.push(Number(num));
        console.log(num);
      }
    }
  }

  const sum = foundNums.reduce((acc, num) => acc + num, 0);
  console.log(sum);
}

// part1();
//////////////////////////////////////////////////////////////////
const gearsDic = {};

function findGears(str, num, i, j) {
  j = j === -1 ? 0 : j;

  for (let k = 0; k < str.length; k++) {
    const ch = str.charAt(k);
    if (ch === '*') {
      const ind = `${i}-${j + k}`;
      gearsDic[ind] = gearsDic[ind]
        ? [...gearsDic[ind], parseInt(num)]
        : [parseInt(num)];
    }
  }
}

function part2() {
  const rows = engine.length;
  const cols = engine[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const n = '' + engine[i][j];
      if (isNaN(n)) continue;

      let num = n;

      while (++j < cols) {
        if (Number.isInteger(parseInt(engine[i][j]))) {
          num += engine[i][j];
        } else {
          break;
        }
      }

      const top =
        i === 0 ? '' : engine[i - 1].substring(j - num.length - 1, j + 1);
      const btm =
        i === rows - 1
          ? ''
          : engine[i + 1].substring(j - num.length - 1, j + 1);
      const lft = engine[i][j - num.length - 1] || '';
      const rgt = engine[i][j] || '';

      findGears(top, num, i - 1, j - num.length - 1);
      findGears(btm, num, i + 1, j - num.length - 1);
      findGears(lft, num, i, j - num.length - 1);
      findGears(rgt, num, i, j);
    }
  }

  // console.log(gearsDic);
  const res = Object.values(gearsDic)
    .filter((x) => x.length === 2)
    .map((x) => x[0] * x[1])
    .reduce((acc, num) => acc + num, 0);

  console.log(res);
}

part2();
