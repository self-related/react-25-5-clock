import { useRef, useState } from 'react'
import './App.css'

function Buttons({ isCounting, changeCountingMode, reset }) {
  const countingClassName = isCounting ? 'counting' : '';
  
  const handleStartStopClick = (_event) => {
    changeCountingMode();
  };

  return (
    <div id='buttons'>
      <button id='start_stop' className={countingClassName} onClick={handleStartStopClick}>Start/Stop</button>
      <button id='reset' onClick={reset}>Reset</button>
    </div>
  );
}

function Timer({ isSession, timerTime }) {

  const minutes = Math.floor(timerTime / 60_000);
  const minutesToShow = minutes < 10 ? `0${minutes}` : minutes; //всегда две цифры для минут

  const seconds = timerTime / 1_000 - minutes * 60;
  const secondsToShow = seconds < 10 ? `0${seconds}` : seconds; //всегда две цифры для минут

  

  return (
    <div id='timer' className='center'>
      <p id='timer-label'>{isSession == true ? 'Session' : 'Break'}</p>
      <div id='time-left'>{minutesToShow}:{secondsToShow}</div>
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
        <p id='break-label'>Break Length</p>
        <button id='break-decrement' onClick={handleClick('break', '-')}>-</button>
        <span id='break-length'>{breakTime / 60_000}</span>
        <button id='break-increment' onClick={handleClick('break', '+')}>+</button>
      </div>
      <div>
        <p id='session-label'>Session Length</p>
        <button id='session-decrement' onClick={handleClick('session', '-')}>-</button>
        <span id='session-length'>{sessionTime / 60_000}</span>
        <button id='session-increment' onClick={handleClick('session', '+')}>+</button>
      </div>
    </div>
  );
}
const beep = new Audio('https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav');
function App() {
  const [sessionTime, setSessionTime] = useState(1_500_000);
  const [breakTime, setBreakTime] = useState(300_000);
  const [isSession, setIsSession] = useState(true);
  const [isCounting, setIsCounting] = useState(false);
  const [timerTime, setTimerTime] = useState(1_500_000);
  const isCountingRef = useRef(null);

  const startTimer = async () => {
    if (!isCounting) { return; }
    if (breakTime < 1000 || sessionTime < 1000) { return; }

    if (timerTime < 0) {
      if (isSession) {
        setTimerTime(breakTime);
      } else {
        setTimerTime(sessionTime);
      }
      setIsSession(isSession => !isSession);
      /* sound */
      beep.play();
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

  const changeTimerTime = (timeToChange, newTime) => {
    if (timeToChange === "session" && isSession 
      || timeToChange === "break" && !isSession
    ) {
      setTimerTime(newTime);
    }
  };

  const changeTime = (timeToChange, changeMode) => {
    if (isCounting) { return; }

    const setTime = timeToChange === 'session' ? setSessionTime : setBreakTime;
    if (changeMode === "+") {
      setTime((time) => {
        if (time >= 3_600_000) 
          return 3_600_000;
        changeTimerTime(timeToChange, time + 60_000);
        return time + 60_000;
      });
    } else {
      setTime((time) => {
        if (time > 60_000) {
          changeTimerTime(timeToChange, time - 60_000);
          return time - 60_000;
        } else {
          changeTimerTime(timeToChange, 60_000);
          return 60_000;
        }
      });
    }
  };

  const reset = () => {
    setSessionTime(1_500_000);
    setBreakTime(300_000);
    setIsSession(true);
    setIsCounting(false);
    setTimerTime(1_500_000);
    isCountingRef.current = false;
  };

  startTimer();

  return (
    <div id="app">
      <h1>25-5 Clock</h1>
      <Controls breakTime={breakTime} sessionTime={sessionTime} changeTime={changeTime}/>
      <Timer isSession={isSession} timerTime={timerTime}/>
      <Buttons isCounting={isCounting} changeCountingMode={changeCountingMode} reset={reset}/>
    </div>
  )
}

export default App;