import { useRef, useState } from 'react';
import './App.css';
import Buttons from './components/Buttons.jsx';
import Controls from './components/Controls.jsx'
import Timer from './components/Timer.jsx';

function App() {
  const [sessionTime, setSessionTime] = useState(1_500_000);
  const [breakTime, setBreakTime] = useState(300_000);
  const [isSession, setIsSession] = useState(true);
  const [isCounting, setIsCounting] = useState(false);
  const [timerTime, setTimerTime] = useState(1_500_000);
  const isCountingRef = useRef(null);
  const audioRef = useRef();

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
      audioRef.current.play();
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
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  startTimer();

  return (
    <div id="app">
      <h1>25-5 Clock</h1>
      <Controls breakTime={breakTime} sessionTime={sessionTime} changeTime={changeTime}/>
      <Timer isSession={isSession} timerTime={timerTime}/>
      <Buttons isCounting={isCounting} changeCountingMode={changeCountingMode} reset={reset}/>
      <audio id='beep' src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav' ref={audioRef}></audio>
    </div>
  )
}

export default App;