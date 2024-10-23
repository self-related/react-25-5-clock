export default function Controls({ breakTime, sessionTime, adjustTime }) {
    const handleClick = (timeToChange, changeMode) => (_event) => {
      adjustTime(timeToChange, changeMode);
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