import { EValue } from '.';

export const calculateWinner = (
  squares: (number | null)[],
  size: number
): EValue | null => {
  const lines: number[][] = [];

  const diag: number[] = [];
  const reverseDiag: number[] = [];
  for (let i = 0; i < size; i++) {
    const horizontal: number[] = [];
    const vertical: number[] = [];
    for (let j = 0; j < size; j++) {
      horizontal.push(i * size + j);
      vertical.push(i + size * j);
    }
    lines.push(horizontal);
    lines.push(vertical);

    diag.push(i * (size + 1));
    reverseDiag.push((size - 1) * (i + 1));
  }
  lines.push(diag);
  lines.push(reverseDiag);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const firstSquare = squares[line[0]];
    let isEqual = true;
    if (!!firstSquare) {
      for (let j = 1; j < size; j++) {
        if (squares[line[j]] !== squares[line[0]]) {
          isEqual = false;
          break;
        }
      }
    } else isEqual = false;
    if (isEqual) {
      return firstSquare;
    }
  }
  return null;
};
