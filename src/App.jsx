import { useRef, useState } from 'react'
import './App.css'

function Buttons({ isCounting, changeCountingMode }) {
  const countingClassName = isCounting ? 'counting' : '';
  
  const handleStartStopClick = (_event) => {
    changeCountingMode();
  };

  return (
    <div id='buttons'>
      <button className={countingClassName} onClick={handleStartStopClick}>Start/Stop</button>
      <button>Reset</button>
    </div>
  );
}

function Timer({ isSession, timerTime }) {

  return (
    <div id='timer' className='center'>
      <p id='timer-label'>{isSession == true ? 'Session' : 'Break'}</p>
      <div id='time-left'>{timerTime}</div>
    </div>
  );
}

function Controls({ breakTime, sessionTime, changeTime }) {
  const handleClick = (timeToChange, changeMode) => (_event) => {
    changeTime(timeToChange, changeMode);
  };


  return (
    <div id='controls' className='center'>
      <div>
        <p>Break Length</p>
        <button id='break-decrement' onClick={handleClick('break', '-')}>-</button>
        <span id='break-length'>{breakTime}</span>
        <button id='break-increment' onClick={handleClick('break', '+')}>+</button>
      </div>
      <div>
        <p>Session Length</p>
        <button id='session-decrement' onClick={handleClick('session', '-')}>-</button>
        <span id='session-length'>{sessionTime}</span>
        <button id='session-increment' onClick={handleClick('session', '+')}>+</button>
      </div>
    </div>
  );
}

function App() {
  const [sessionTime, setSessionTime] = useState(6000);
  const [breakTime, setBreakTime] = useState(2000);
  const [isSession, setIsSession] = useState(true);
  const [isCounting, setIsCounting] = useState(false);
  const [timerTime, setTimerTime] = useState(sessionTime);
  const isCountingRef = useRef(null);

  const startTimer = async () => {
    if (!isCounting) { return; }
    if (breakTime < 1000 || sessionTime < 1000) { return; }

    if (timerTime === 0) {
      if (isSession) {
        setTimerTime(breakTime);
      } else {
        setTimerTime(sessionTime);
      }
      setIsSession(isSession => !isSession);
      /* sound */
      return;
    }

    setTimeout(() => {
        if (!isCountingRef.current) return;
      setTimerTime((timerTime) => timerTime - 1000);
    }, 1000);
  };

  const changeCountingMode = () => {
    setIsCounting( (isCounting) => !isCounting );
    isCountingRef.current = !isCounting; //для таймера
  };

  const changeTime = (timeToChange, changeMode) => {
    if (isCounting) { return; }

    const setTime = timeToChange === 'session' ? setSessionTime : setBreakTime;
    if (changeMode === "+") {
      setTime((time) => time + 60_000);
    } else {
      setTime((time) => {
        if (time >= 60_000) {
          return time - 60_000;
        } else {
          return 0;
        }
      });
    }
  };

  startTimer();

  return (
    <div id="app">
      <h1>25-5 Clock</h1>
      <Controls breakTime={breakTime} sessionTime={sessionTime} changeTime={changeTime}/>
      <Timer isSession={isSession} timerTime={timerTime}/>
      <Buttons isCounting={isCounting} changeCountingMode={changeCountingMode}/>
    </div>
  )
}

export default App;