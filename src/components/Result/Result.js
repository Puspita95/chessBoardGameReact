import classes from './Result.module.css';

export default function Result({stepsTaken,onStartClick}){
    return (
        <div className={classes.step3Flex}>
        <h2>Thank You.!Your steps:</h2>
        <div className={classes.flex} >
        {stepsTaken.map((item)=>
        <p className={classes.marR5} key={item.row}>{`{${item.row},${item.col}} `}</p>
        )}
        
        </div>
        <button onClick={onStartClick}>Start Over</button>
    </div> 
    );
}