import { useState } from "react";
import './Form.css'

function Form({ addReservation }) {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [number, setNumber] = useState("");

    function submitReservation(event) {
        event.preventDefault();
    
        if (!name || !date || !time || !number) {
            alert('Please fill in all fields');
            return;
        }
    
        const newReservation = {
            name,
            date,
            time,
            number: parseInt(number)
        };
    
        fetch('http://localhost:3001/api/v1/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to add reservation');
            }
        })
        .then(data => {
            addReservation(data);
            clearInput();
        })
        .catch(error => {
            console.error('Error adding reservation:', error);
        });
    }

    function clearInput() {
        setName("");
        setDate("");
        setTime("");
        setNumber("");
    }

    return (
        <form>
            <input
                type='text'
                placeholder='Name'
                name='Name'
                value={name}
                onChange={event => setName(event.target.value)}
            />

            <input
                type='text'
                placeholder='Date(mm/dd)'
                name='Date'
                value={date}
                onChange={event => setDate(event.target.value)}
            />

            <input
                type='text'
                placeholder='Time'
                name='Time'
                value={time}
                onChange={event => setTime(event.target.value)}
            />

            <input
                type='number'
                placeholder='Number of guests'
                name='Number of guests'
                value={number}
                onChange={event => setNumber(event.target.value)}
            />

            <button onClick={event => submitReservation(event)}>Make Reservation</button>
        </form>
    );
}

export default Form;