
/**
 * Calculates the total price for either a virual movie ticket or a 
 * in person theater ticket 
 * 
 * @param {*} selectedTicket 
 * @param {*} selectedSeats 
 */
export function calculateTotalPrice(selectedTicket, selectedSeats ) {
    var total = 0;
    if (selectedTicket.ticket_type === "theater") {
        //increment the total price by the ticket price for the total number of seats
        Object.keys(selectedSeats).forEach(seat => (
            total += selectedTicket.price
        ))
    }
    else {
        //otherwise multiply the total viewers by the price
        total = selectedTicket.number_of_viewers * selectedTicket.price
    }
    
    return total;
}