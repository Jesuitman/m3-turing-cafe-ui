import "./Card.css"

function Card({name,date,time,number, id, cancelRese}){
    return(
        <div className="card">
            <h3>{name}</h3>
            <p>{date}</p>
            <p>{time} pm</p>
            <p>Number of Guests:{number}</p>
            <button onClick={() => cancelRese(id)}>Cancel</button>
        </div>
    )
}

export default Card