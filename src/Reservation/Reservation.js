import "./Reservation.css"
import Card from "../Card/Card"

function Reservation({reservations, cancelRese}){

    const ReservationCards = reservations.map(reservation =>{
        return(
            <Card 
            id={reservation.id}
            name={reservation.name}
            date={reservation.date}
            time={reservation.time}
            number={reservation.number}
            key={reservation.id}
            cancelRese={cancelRese}
            />
        )
    })

    return (
        <div className="resy-container">
          {ReservationCards}
        </div>
    )
}

export default Reservation