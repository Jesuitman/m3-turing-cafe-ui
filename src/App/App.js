import { useState,useEffect } from "react";
import Reservation from "../Reservation/Reservation"
import "./App.css"
import Form from "../Form/Form";

function App() {

  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/reservations')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Server Error!');
        }
      })
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => {
        setError(error.message)
        console.error('Error fetching data:', error);
      });
  }, []);

  function addReservation(newReservation){
    setReservations([...reservations, newReservation])
  }
  
  function cancelRese(id){
    const filteredReservations = reservations.filter(reservation => reservation.id !== id)
    setReservations(filteredReservations)
}


  return (
    <div className="App">
      <h1 className='app-title'>Turing Cafe Reservations</h1>
      <div className='resy-form'>
        <Form addReservation={addReservation} />
      </div>
      <div className='resy-container'>
        <Reservation reservations={reservations} cancelRese={cancelRese}/>
      </div>
    </div>
  );
}

export default App; 