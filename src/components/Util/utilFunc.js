export const roundDecimal = (num) =>
  (Math.round(num * 100) / 100).toFixed(2);
