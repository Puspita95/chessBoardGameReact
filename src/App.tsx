import React, { useEffect, useState } from 'react';
import './App.css';
import { UserInput, ChessBoard, Result, getRandomArbitrary } from './components';

const App: React.FC<{}> = () => {
  const chessBoardDataFromLocalStorage = JSON.parse(localStorage.getItem('chessBoardData') ?? '{}');
  const [row, setRow] = useState<number>(chessBoardDataFromLocalStorage.row ?? 5);
  const [avaialbleSteps, setAvaialbleSteps] = useState<number>(
    chessBoardDataFromLocalStorage.avaialbleSteps ?? 4,
  );
  const [step, setStep] = useState<number>(chessBoardDataFromLocalStorage.step ?? 1);

  const [stepsClicked, setStepsClicked] = useState<number>(
    chessBoardDataFromLocalStorage.stepsClicked ?? 0,
  );
  const [stepsTaken, setStepstaken] = useState<{ row: number; col: number }[]>(
    chessBoardDataFromLocalStorage.stepsTaken ?? [],
  );
  // const [activeCell, setActiveCell] = useState<{rowIndex: number; colIndex: number}>({
  //   rowIndex: getRandomArbitrary(1, row),
  //   colIndex: getRandomArbitrary(1, row),
  // });
  const [activeCell, setActiveCell] = useState<{ rowIndex: number; colIndex: number }>(
    chessBoardDataFromLocalStorage.activeCell ?? {
      rowIndex: getRandomArbitrary(1, row),
      colIndex: getRandomArbitrary(1, row),
    },
  );
  useEffect(() => {
    localStorage.setItem('chessBoardData',JSON.stringify({ row, avaialbleSteps, step, stepsClicked, stepsTaken, activeCell }),
    );
  }, [row, avaialbleSteps, step, stepsClicked, stepsTaken, activeCell]);

  function handleStartOverClicked() {
    setRow(0);
    setStep(1);
    setAvaialbleSteps(0);
    setStepstaken([]);
    setStepsClicked(0);
  }

  function handleRowChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;
    isNaN(parseInt(val)) ? setRow(0) : setRow(parseInt(val));
  }
  function handleStepChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(event.target.value);
    isNaN(val) ? setAvaialbleSteps(0) : setAvaialbleSteps(val);
  }
  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (row !== 0 && avaialbleSteps !== 0) {
      setStep(2);
    }
    // setStep(2);
  }

  return (
    <div>
      {step === 1 && (
        <UserInput
          row={row}
          avaialbleSteps={avaialbleSteps}
          onRowChange={handleRowChange}
          onStepChange={handleStepChange}
          onButtonClick={handleButtonClick}
        />
      )}
      {step === 2 && (
        <ChessBoard
          row={row}
          avaialbleSteps={avaialbleSteps}
          setStep={setStep}
          setStepsClicked={setStepsClicked}
          stepsClicked={stepsClicked}
          stepsTaken={stepsTaken}
          setStepstaken={setStepstaken}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
        />
      )}
      {step === 3 && <Result stepsTaken={stepsTaken} onStartClick={handleStartOverClicked} />}
    </div>
  );
};

export default App;
