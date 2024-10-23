export default function Timer({ isSession, timerTime }) {

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