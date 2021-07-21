import React, { useState } from 'react';
import { VStack, Grid, Text, Button } from '@chakra-ui/react';

import Square from './Square';
import { calculateWinner } from './helpers';

const SIZE = 3; // 3 * 3 size

export enum EValue {
  Circle = 1,
  Cross = 2,
}

export const VALUE_MATCH = {
  [EValue.Circle]: 'o',
  [EValue.Cross]: 'x',
};

const INITIAL_SQUARES: (EValue | null)[] = Array(SIZE * SIZE).fill(null);
const GAME_START_PLAYER = EValue.Circle;

let totalSquareFilled = 0;

const Board: React.FC = () => {
  const [squares, setSquares] = useState<(EValue | null)[]>(INITIAL_SQUARES);
  const [whoIsNext, setWhoIsNext] = useState<EValue>(GAME_START_PLAYER);

  const handleSquareClick = (idx: number) => {
    if (!squares[idx]) {
      setSquares((prev) => {
        const _prev = [...prev];
        _prev[idx] = whoIsNext;
        return _prev;
      });
      setWhoIsNext((prev) =>
        prev === EValue.Circle ? EValue.Cross : EValue.Circle
      );
      totalSquareFilled++;
    }
  };

  const handleRestartClick = () => {
    setSquares(INITIAL_SQUARES);
    setWhoIsNext(GAME_START_PLAYER);
    totalSquareFilled = 0;
  };

  let status: string = '';
  let isGameEnded: boolean = false;
  const winner = calculateWinner(squares, SIZE);
  if (winner) {
    status = `Winner: ${VALUE_MATCH[winner]}`;
    isGameEnded = true;
  } else {
    if (totalSquareFilled === SIZE * SIZE) {
      status = 'Draw';
      isGameEnded = true;
    } else status = `Next player: ${VALUE_MATCH[whoIsNext]}`;
  }

  return (
    <VStack justifyContent="center" alignItems="center">
      <Text>{status}</Text>
      <Grid
        gridTemplateColumns={`repeat(${SIZE}, 50px)`}
        gridTemplateRows={`repeat(${SIZE}, 50px)`}
        pointerEvents={isGameEnded ? 'none' : 'all'} // if game is ended, then disable the mouse clicks in board
      >
        {squares.map((square, idx) => {
          return (
            <Square
              key={`${square}-${idx}`}
              value={square}
              index={idx}
              onClick={handleSquareClick}
            />
          );
        })}
      </Grid>
      {isGameEnded && <Button onClick={handleRestartClick}>Restart</Button>}
    </VStack>
  );
};

export default Board;
