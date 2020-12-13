import React from 'react';
import { v4 } from 'uuid';

const TicketInfo = ({ selectedTicket, selectedSeats }) => {
    const tickets = [];

    if (selectedTicket.ticket_type === "theater") {
        Object.keys(selectedSeats).map(key => (
            tickets.push(<p key={selectedSeats[key].row_name + selectedSeats[key].seat_number}>Seat Number: {selectedSeats[key].row_name}{selectedSeats[key].seat_number}  &nbsp; Price: ${selectedTicket.price}</p>)
        ))
    }
    else {
        tickets.push(<div key={v4()}><p>Virtual Tickets Viewers: {selectedTicket.number_of_viewers}</p><p> Movie Price: ${selectedTicket.price}</p></div>)
    }
    return (tickets);
}

export default TicketInfo;