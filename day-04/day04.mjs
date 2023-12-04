import { readFileSync } from 'node:fs';

const input = readFileSync('day-04.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(input);

function part1() {
  const points = [];
  const cards = input.map((card) => card.split(':')[1].trim());
  const cardsSplited = cards.map((card) => card.split(' | '));

  cardsSplited.forEach((card, i) => {
    card[0].split(' ').forEach((num) => {
      card[1].split(' ').forEach((myNum) => {
        if (num && myNum && Number(num) === Number(myNum)) {
          // console.log(`Card ${i + 1}: ${parseInt(num)} - ${parseInt(myNum)}`);
          points[i] = points[i] ? points[i] * 2 : 1;
        }
      });
    });
  });

  const res = points.reduce((acc, num) => acc + num, 0);
  console.log(res);
}

// part1();
////////////////////////////////////////////////////////////////////////
function part2() {
  const cards = input.map((card) => card.replace(/  /g, ' 0'));
  const cardCount = new Array(cards.length).fill(1);

  cards.forEach((row, index) => {
    const [, cards] = row.split(': ');
    const [winners, myCards] = cards.split(' | ');

    const point = myCards
      .split(' ')
      .filter((card) => winners.includes(card)).length;

    if (point) {
      for (let i = index + 1; i < index + 1 + point; i++) {
        if (cardCount[i]) {
          cardCount[i] += cardCount[index] || 0;
        }
      }
    }
  });
  // console.log(cardCount);
  console.log(cardCount.reduce((acc, val) => acc + val, 0));
}

part2();
