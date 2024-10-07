export const wordForm = (number: number, one: string, two: string, five: string) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
      return `${number} ${five}`;
  }
  n %= 10;
  if (n === 1) {
      return `${number} ${one}`;
  }
  if (n >= 2 && n <= 4) {
      return `${number} ${two}`;
  }
  return `${number} ${five}`;
}