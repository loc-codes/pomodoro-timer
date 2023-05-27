
const TimeControl = (props) => {

    const upClick = () => {
        props.incrementTime(props.type)
    }

    const downClick = () => {
        props.decrementTime(props.type)
    }

    return(
    <span className="session-control">
        <button onClick={upClick}>up</button><p className="control-text">{props.time}</p><button onClick={downClick}>down</button>
    </span>
    )
}

export default TimeControl