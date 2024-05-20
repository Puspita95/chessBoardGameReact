import classes from './UserInput.module.css';
import React from 'react'
type UserInputProps={
  row:number;
  avaialbleSteps:number;
   onRowChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
    onStepChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
     onButtonClick:(event:React.MouseEvent<HTMLButtonElement>)=>void;
}

const UserInput :React.FC<UserInputProps>= ({ row, avaialbleSteps, onRowChange, onStepChange, onButtonClick }) => {
 
  return (
    <div className={classes.txtAlign}>
      <p>
        <label>ChessBoard Size: </label>
        <input type='text' id='size' value={row} onChange={onRowChange} required />
      </p>
      <p>
        <label>No of Avaialble steps: </label>
        <input type='text' id='step' value={avaialbleSteps} onChange={onStepChange} required />
      </p>
      <button className={classes.width100} onClick={onButtonClick}>
        OK
      </button>
    </div>
  );
};

export default UserInput;
