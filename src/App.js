import './App.css';
import TimeControl from './Components/TimeControl';
import { useState, useEffect } from 'react'

function App() {
  const [lengths, setLengths] = useState({session: 25, break: 5})
  const [isSession, setIsSesson] = useState(true)
  const [isActive, setisActive] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  //toggle session/break effect
  useEffect(() => {
    if (isSession) {
      setMinutes(lengths.session);
    } else {
      setMinutes(lengths.break);
    }
    setSeconds(0);
  }, [isSession, lengths.session, lengths.break]);
  
  //countdown effect
  useEffect(() => {
    let interval = null;
    if (isActive) {
        interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes > 0){
                    setMinutes(prevMins => prevMins -1);
                    setSeconds(59);
                } else {
                    setIsSesson(!isSession);
                }
            } else {
                setSeconds(prevSecs => prevSecs -1);
            }
        }, 1000);
    }
    return () => clearInterval(interval);
}, [isActive, seconds, minutes]);

  const incrementTime = (type) => {
    if (!isActive){
      setLengths(prevLengths => ({...prevLengths, [type]: prevLengths[type] + 1}))
    }
    }

  const decrementTime = (type) => {
    if (!isActive && lengths[type] > 1){
    setLengths(prevLengths => ({...prevLengths, [type]: prevLengths[type] - 1}))
    }
  }

  const toggleActive = () => {
    setisActive(!isActive)
  }

  const reset = () => {
    setisActive(false)
    setIsSesson(true)
    setSeconds(0)
    setLengths({session:25,break:5})
    
  }
  
  return (
    <div className="App">
      <div id='title'>25+5 Clock</div>
      <div id='time-controls'>
        <TimeControl type="session" time={lengths.session} incrementTime={incrementTime} decrementTime={decrementTime}/>
        <TimeControl type="break" time={lengths.break} incrementTime={incrementTime} decrementTime={decrementTime}/>
      </div>
      <div id='clock-container'>
        <h2>{isSession ? 'Session' : 'Break'}</h2>
        <h2>{minutes}m {seconds}s</h2>
        <div id='session-controls'>
          <button onClick={toggleActive}>{isActive ? 'Stop': 'Start'}</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;

//BUG: reset button drops minute by 1, not sure what cause is
//TO DO:
//1. Red text when session gets to 0 mins
//2.