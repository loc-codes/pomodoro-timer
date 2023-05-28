
const TimeControl = (props) => {

    const upClick = () => {
        props.incrementTime(props.type)
    }

    const downClick = () => {
        props.decrementTime(props.type)
    }

    return(
    <div className='time-control'>
    <h2 className="control-label">{props.type} length</h2>
    <span >
        <button onClick={upClick}>up</button><p className="control-text">{props.time}</p><button onClick={downClick}>down</button>
    </span>
    </div>
    )
}

export default TimeControl