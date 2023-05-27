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

  return (
    <div className="App">
      <div id='title'>25+5 Clock</div>
      <div id='session-controls'>
      <TimeControl type="session" time={lengths.session} incrementTime={incrementTime} decrementTime={decrementTime}/>
      <TimeControl type="break" time={lengths.break} incrementTime={incrementTime} decrementTime={decrementTime}/>
      </div>
      <div id='timer'>

      </div>
      <div id='runtime-controls'>

      </div>
    </div>
  );
}

export default App;
