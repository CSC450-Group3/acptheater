import React, {useState} from 'react';


const SeatButton = ({ seat_id, blocked, booked, row_name, seat_number, handleSeatClick, selected }) => {
    const [isSelected, setSelected]= useState(selected)
    const seat = row_name.concat(seat_number)


    if (blocked === 1 || booked === 1) {
        return (
            <div>
                <button className="seat-disabled" disabled value={seat_id}>
                        {seat}
                </button>
            </div>
        )
    }
    else if (isSelected) {
        return (
            <div>
                <button className="seat-primary" value={seat_id} onClick={(e) => 
                    {
                        setSelected(!isSelected);
                        handleSeatClick(e);
                    }
                }>
                    {seat}
                </button>
            </div>
        )
    }
    else {
        return (
            <div>
                <button className="seat" value={seat_id} onClick={(e) => 
                    {
                        setSelected(!isSelected);
                        handleSeatClick(e);
                    }
                }>
                    {seat}
                </button>
            </div>
        )
    }
}

export default SeatButton;