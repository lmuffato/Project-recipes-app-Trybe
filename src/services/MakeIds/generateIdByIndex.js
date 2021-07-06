const THREE = 3;
const FOUR = 4;
const FIVE = 5;

export function generateIdFirstCard(i) {
  if (i === 0) {
    return 0;
  } if (i === 1) {
    return 2;
  }
  return FOUR;
}

function generateIdSecondCard(i) {
  if (i === 0) {
    return 1;
  }
  if (i === 1) {
    return THREE;
  }
  return FIVE;
}

export default generateIdSecondCard;
