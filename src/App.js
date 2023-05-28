import './App.css';
import TimeControl from './Components/TimeControl';
import { useState } from 'react'

function App() {

  const [lengths, setLengths] = useState({session: 25, break: 5})

  const incrementTime = (type) => {
    setLengths(prevLengths => ({...prevLengths, [type]: prevLengths[type] + 1}))
  }

  const decrementTime = (type) => {
    setLengths(prevLengths => ({...prevLengths, [type]: prevLengths[type] - 1}))
  }

  const countdown = () => {
    let minutes = lengths.session
    let seconds = 0
    setInterval(() => {
      if (seconds === 0){
        if (minutes === 0){
          console.log('beep beep beep')
        }
        else {
          minutes--
          seconds = 59
        }
      }
      else{
        seconds--
      }
      console.log(minutes, seconds)
    }, 1000)
  }

  //countdown()
  
  return (
    <div className="App">
      <div id='title'>25+5 Clock</div>
      <div id='session-controls'>
      <TimeControl type="session" time={lengths.session} incrementTime={incrementTime} decrementTime={decrementTime}/>
      <TimeControl type="break" time={lengths.break} incrementTime={incrementTime} decrementTime={decrementTime}/>
      </div>
      <div id='timer'>
        <p>Session</p>
      </div>
      <div id='runtime-controls'>

      </div>
    </div>
  );
}

export default App;
