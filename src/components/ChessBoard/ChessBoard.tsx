import React, { useEffect } from 'react';
import { classes, getColor, getRandomArbitrary } from '.';
type ChessBoardProps = {
  row: number;
  avaialbleSteps: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setStepsClicked: React.Dispatch<React.SetStateAction<number>>;
  stepsClicked: number;
  stepsTaken: {
    row: number;
    col: number;
  }[];
  setStepstaken: React.Dispatch<
    React.SetStateAction<
      {
        row: number;
        col: number;
      }[]
    >
  >;
  activeCell: {
    rowIndex: number;
    colIndex: number;
  };
  setActiveCell: React.Dispatch<
    React.SetStateAction<{
      rowIndex: number;
      colIndex: number;
    }>
  >;
};
const ChessBoard: React.FC<ChessBoardProps> = ({
  row,
  avaialbleSteps,
  setStep,
  setStepsClicked,
  stepsClicked,
  setStepstaken,
  activeCell,
  setActiveCell,
}) => {
  const chessBoardDataFromLocalStorage = JSON.parse(localStorage.getItem('chessBoardData') ?? '{}');

  useEffect(() => {
    setActiveCell(chessBoardDataFromLocalStorage.activeCell?? { rowIndex: getRandomArbitrary(1, row), colIndex: getRandomArbitrary(1, row) });
  }, [row]);

  const isCurrentActiveCell = (rowIndex: number, colIndex: number) => {
    if (rowIndex === activeCell.rowIndex && colIndex === activeCell.colIndex) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    //@ts-ignore
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      //@ts-ignore
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeCell]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    let newRow = activeCell.rowIndex;
    let newCol = activeCell.colIndex;

    if (event.key === 'ArrowLeft') {
      newCol = Math.max(0, activeCell.colIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      newCol = Math.min(row - 1, activeCell.colIndex + 1);
    }
    if (event.key === 'ArrowUp') {
      newRow = Math.max(0, activeCell.rowIndex - 1);
    }
    if (event.key === 'ArrowDown') {
      newRow = Math.max(0, activeCell.rowIndex + 1);
    }
    setActiveCell({ rowIndex: newRow, colIndex: newCol });

    if (newRow === activeCell.rowIndex && newCol === activeCell.colIndex) {
      return;
    } else {
      setStepsClicked(stepsClicked + 1);

      setStepstaken((prevSteps) => {
        const steps = [{ row: newRow, col: newCol }, ...prevSteps];
        return steps.reverse();
      });
    }
  };

  if (stepsClicked === avaialbleSteps) {
    setStep(3);
  }
  return (
    <>
      {new Array(row).fill(null).map((item, rowIndex) => {
        return (
          <div className={classes.container} key={rowIndex}>
            {new Array(row).fill(null).map((item, colIndex) => {
              return (
                <div key={colIndex}
                  className={`${classes.box} ${getColor(rowIndex, colIndex)} ${
                    isCurrentActiveCell(rowIndex, colIndex) ? classes.isActive : ''
                  }`}
                ></div>
              );
            })}
          </div>
        );
      })}
      <div className={classes.flex}>
        <p>Steps left:</p>
        <p>{`${stepsClicked} / ${avaialbleSteps}`}</p>
      </div>
    </>
  );
};
export default ChessBoard;
