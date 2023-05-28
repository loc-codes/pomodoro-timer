import { useEffect, useState } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(1)
    const [isActive, setisActive] = useState(false)

    const toggle = () => {
        setisActive(!isActive);
    }

    function reset() {
        setSeconds(1)
        setSeconds(0);
        setisActive(false)
    }

    //think of this as an alarm clock. when we hit the clear interval in the else block,
    //the alarm clock is still in the webpage, but we have disabled the alarm
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes > 0){
                        setMinutes(prevMins => prevMins -1);
                        setSeconds(59);
                    } else {
                        console.log('countdown complete');
                        setisActive(false);
                    }
                } else {
                    setSeconds(prevSecs => prevSecs -1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, minutes]);
    
    

    return (
        <div className="timer">
            <div className="time">
                <p>Session</p>
                <p>{minutes}m {seconds}s</p>
            </div>
            <div className="row">
                <button className="button-primary" onClick={toggle}>
                    {isActive ? 'Pause': 'Start'}
                </button>
                <button className="button-secondary" onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
        
    )
}

export default Timer