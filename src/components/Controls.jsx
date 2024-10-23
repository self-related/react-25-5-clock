export default function Controls({ breakTime, sessionTime, adjustTime, updateTime }) {
    const handleClick = (timeToChange, changeMode) => (_event) => {
      adjustTime(timeToChange, changeMode);
    };

    const handleInputChange = (event) => {
      const timeToChange = event.target.id;
      const time = Number(event.target.value);
      console.log(time);
      updateTime(timeToChange, time);
    };
  
    //отображать только минуты в полях ввода
    let breakTimeMinutes = breakTime /  60_000;
    if (breakTimeMinutes < 1) {
      breakTimeMinutes = 0;
    }
    let sessionTimeMinutes = sessionTime /  60_000;
    if (sessionTimeMinutes < 1) {
      sessionTimeMinutes = 0;
    }
  
    return (
      <div id='controls' className='center'>
        <div>
          <p id='break-label'>Break Length</p>
          <button id='break-decrement' onClick={handleClick('break', '-')}>-</button>
          <input id='break-length' className="time-input" value={breakTimeMinutes} onChange={handleInputChange}/>
          <button id='break-increment' onClick={handleClick('break', '+')}>+</button>
        </div>
        <div>
          <p id='session-label'>Session Length</p>
          <button id='session-decrement' onClick={handleClick('session', '-')}>-</button>
          <input id='session-length' className="time-input" value={sessionTimeMinutes} onChange={handleInputChange} />
          <button id='session-increment' onClick={handleClick('session', '+')}>+</button>
        </div>
      </div>
    );
  }