import { readFileSync } from 'node:fs';

const input = readFileSync('day-07.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim()
  .split('\n');

// console.log(input);

const getHandType = (cards) => {
  const cardCounts = {};
  let strength = 1;

  for (const card of cards) {
    if (cardCounts[card]) {
      cardCounts[card]++;
    } else {
      cardCounts[card] = 1;
    }
  }

  const countValues = Object.values(cardCounts);

  if (countValues.includes(2)) {
    strength = countValues.includes(3) ? 5 : countValues.length === 3 ? 3 : 2;
  } else if (countValues.includes(3)) {
    strength = countValues.length === 3 ? 4 : 5;
  } else if (countValues.includes(4)) {
    strength = 6;
  } else if (countValues.includes(5)) {
    strength = 7;
  }

  return { hand: cards, count: { ...cardCounts }, strength };
};

// function sorteHands(arr) {
//   const cardOrder = 'J23456789TQKA';

//   return arr.sort((a, b) => {
//     if (a.strength !== b.strength) {
//       return a.strength - b.strength;
//     }

//     for (let i = 0; i < a.hand.length; i++) {
//       const cardA = a.hand[i];
//       const cardB = b.hand[i];

//       if (cardOrder.indexOf(cardA) !== cardOrder.indexOf(cardB)) {
//         return cardOrder.indexOf(cardA) - cardOrder.indexOf(cardB);
//       }
//     }

//     return a.bid - b.bid;
//   });
// }

function part1() {
  let handsPlayed = [];
  const hands = input.map((hand) => [
    hand.split(' ')[0],
    parseInt(hand.split(' ')[1]),
  ]);

  hands.forEach(([cards, bid], i) => {
    handsPlayed.push({ ...getHandType(cards), bid });
  });

  console.log(sorteHands(handsPlayed));

  const res = sorteHands(handsPlayed)
    .map((hand, i) => hand.bid * (i + 1))
    .reduce((acc, num) => acc + num, 0);

  console.log(res);
}

// part1();
/////////////////////////////////////////////////////////////////
const cardValues = {
  J: 0,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

function part2() {
  input.sort((a, b) => {
    const handA = a.split(' ')[0];
    const handB = b.split(' ')[0];
    return sorteHands(handB, handA);
  });

  const wins = input.reduce((acc, line, i) => {
    const bid = line.split(' ')[1];
    acc += bid * (i + 1);
    return acc;
  }, 0);

  console.log(wins);
}

const getAllPossibleValues = (hand) => {
  if (!/J/.test(hand)) {
    return [hand];
  }

  const handSet = getHandSet(hand);
  const possibilities = [];
  for (let key in handSet) {
    possibilities.push(hand.replace(/J/g, key));
  }

  return possibilities;
};

const sorteHands = (handA, handB) => {
  const possibilitiesA = getAllPossibleValues(handA);
  const possibilitiesB = getAllPossibleValues(handB);
  const handValueA = possibilitiesA
    .map((hand) => getRank(hand))
    .sort((a, b) => b - a)[0];
  const handValueB = possibilitiesB
    .map((hand) => getRank(hand))
    .sort((a, b) => b - a)[0];
  if (handValueA > handValueB) return -1; // A wins
  if (handValueA < handValueB) return 1; // B wins
  return tieBreaker(handA, handB);
};

const getRank = (hand) => {
  const handSet = getHandSet(hand);

  let hasPair = false;
  let hasThree = false;

  for (let key in handSet) {
    const val = handSet[key];
    if (val === 5) {
      return 7;
    }
    if (val === 4) {
      return 6;
    }
    if ((val === 3 && hasPair) || (val === 2 && hasThree)) {
      return 5;
    }
    if (val === 2 && hasPair) {
      return 3;
    }
    if (val === 3) {
      hasThree = true;
    }
    if (val === 2) {
      hasPair = true;
    }
  }

  if (hasThree) return 4;
  if (hasPair) return 2;
  return 1;
};

const getHandSet = (hand) => {
  const handSet = {};
  for (let i = 0; i < hand.length; i++) {
    handSet[hand[i]] = handSet[hand[i]] || 0;
    handSet[hand[i]] += 1;
  }
  return handSet;
};

const tieBreaker = (handA, handB) => {
  for (let i = 0; i < handA.length; i++) {
    const cardA = handA[i];
    const cardB = handB[i];
    const handAVal = isNaN(Number(cardA)) ? cardValues[cardA] : Number(cardA);
    const handBVal = isNaN(Number(cardB)) ? cardValues[cardB] : Number(cardB);

    if (handAVal > handBVal) return -1;
    if (handAVal < handBVal) return 1;
  }

  return 0;
};

part2();
