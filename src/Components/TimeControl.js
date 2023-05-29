import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const TimeControl = (props) => {
    

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

     

    const upClick = () => {
        props.incrementTime(props.type)
    }

    const downClick = () => {
        props.decrementTime(props.type)
    }

    return(
    <div className='time-control'>
    <h1 className="control-label" id={props.labelId}>{toTitleCase(props.type)} Length</h1>
    <span>
        <button onClick={upClick} id={props.upId}><h2><FontAwesomeIcon icon={faArrowUp} /></h2></button>
        <h2 className="control-text" id={props.lengthId}>{props.time}</h2>
        <button onClick={downClick} id={props.downId}><h2><FontAwesomeIcon icon={faArrowDown} /></h2></button>
    </span>
    </div>
    )
}

export default TimeControl