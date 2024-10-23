export default function Buttons({ isCounting, startStopTimer, reset }) {
    const countingClassName = isCounting ? 'counting' : '';
    
    const handleStartStopClick = (_event) => {
      startStopTimer();
    };
  
    return (
      <div id='buttons'>
        <button id='start_stop' className={countingClassName} onClick={handleStartStopClick}>Start/Stop</button>
        <button id='reset' onClick={reset}>Reset</button>
      </div>
    );
  }
