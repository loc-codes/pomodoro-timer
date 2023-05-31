import './App.css';
import TimeControl from './Components/TimeControl';
import { useState, useEffect, useRef } from 'react'
import beep from './alarm.m4a'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause,faRedo } from '@fortawesome/free-solid-svg-icons';


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
                    setSeconds(59)
                } else {
                    setIsSesson(!isSession);
                    alarm()
                }
            } else {
                setSeconds(prevSecs => prevSecs -1);
            }
        }, 1000);
    }
    return () => clearInterval(interval);
}, [isActive, seconds, minutes]);

  const incrementTime = (type) => {
    if (!isActive && lengths[type] < 60){
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
    setMinutes(25)
    audioRef.current.pause()
    audioRef.current.currentTime = 0

  }

  const audioRef = useRef()

  const alarm = () => {
    audioRef.current.play();
  }
  
  return (
    <div className="App">
      <div id="header">
        <h1 id="title">Pomodoro</h1>
        <h3>(n.) Italian word for 'tomato'.</h3>
        
      </div>
      <div id='time-controls'>
          <TimeControl type="session" labelId="session-label" upId="session-increment" lengthId="session-length" downId="session-decrement" time={lengths.session} incrementTime={incrementTime} decrementTime={decrementTime}/>
          <TimeControl type="break" labelId="break-label" upId="break-increment" lengthId="break-length" downId="break-decrement" time={lengths.break} incrementTime={incrementTime} decrementTime={decrementTime}/>
      </div>
      <div id='clock-container'>
        <h1 id="timer-label">{isSession ? 'Session' : 'Break'}</h1>
        <h2 id="time-left">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</h2>
        <div id='session-controls'>
        <button onClick={toggleActive} id="start_stop">{isActive ? <FontAwesomeIcon icon={faPause} />: <FontAwesomeIcon icon={faPlay} />}</button>
          <button onClick={reset} id="reset"><FontAwesomeIcon icon={faRedo} /></button>
        </div>
      </div>
      <div id="footer">
        <h5>Powered by React</h5>
        <h5>Built by Lachlan Young, 2023</h5>
      </div>
      <audio ref={audioRef} id="beep" src={beep}/>
    </div>
  );
}

export default App;
