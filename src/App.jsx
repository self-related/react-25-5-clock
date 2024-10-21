import { useState } from 'react'
import './App.css'

function Buttons(props) {

  return (
    <div id='buttons'>
      <button>Start/Stop</button>
      <button>Reset</button>
    </div>
  );
}

function Timer({ breakTime, sessionTime, isSession, isCounting}) {

  return (
    <div id='timer' className='center'>
      <p id='timer-label'>{isSession == true ? 'Session' : 'Break'}</p>
      <div id='time-left'>00:00</div>
    </div>
  );
}

function Controls({ breakTime, sessionTime }) {

  return (
    <div id='controls' className='center'>
      <div>
        <p>Break Length</p>
        <button id='break-decrement'>-</button>
        <span id='break-length'>{breakTime}</span>
        <button id='break-decrement'>+</button>
      </div>
      <div>
        <p>Session Length</p>
        <button id='session-decrement'>-</button>
        <span id='session-length'>{sessionTime}</span>
        <button id='session-decrement'>+</button>
      </div>
    </div>
  );
}

function App() {
  const [breakTime, setBreakTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const [isCounting, setIsCounting] = useState(false);

  return (
    <div id="app">
      <h1>25-5 Clock</h1>
      <Controls breakTime={breakTime} sessionTime={sessionTime}/>
      <Timer breakTime={breakTime} sessionTime={sessionTime} isSession={isSession} isCounting={isCounting}/>
      <Buttons />
    </div>
  )
}

export default App;