import { classes } from './';

export const getColor = (rowIndex, colIndex) => {
  if ((rowIndex % 2 === 0 && colIndex % 2 === 0) || (rowIndex % 2 !== 0 && colIndex % 2 !== 0)) {
    return classes.black;
  } else {
    return classes.white;
  }
};
export const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}