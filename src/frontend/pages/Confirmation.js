import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MovieCard from '../components/movie/MovieCard';
import { Col, Row } from 'antd';
import PaymentSummary from '../components/payment/PaymentSummary';
import { calculateTotalPrice } from '../helper/PaymentCalculation';

function Confirmation(props) {
    const { customerMovie, selectedSeats, selectedTicket, clearMovieTicketSelections } = props
    const [total_price] = useState(calculateTotalPrice(selectedTicket, selectedSeats));

    useEffect(() => {
        return () => {
            // cleanup movie ticket data on unmount
            clearMovieTicketSelections();
        }
    }, [clearMovieTicketSelections])

    return (
        <div style={{ backgroundColor: '#282c34', paddingTop: 75 }}>
            <h1>Your order has been successfully processed and your seats are confirmed! < br /> Thank you for your purchase.</h1>
            < br />
            <Row type="flex" align="center">
                <Col >
                    <MovieCard title={customerMovie.title} poster_url={customerMovie.poster_url} />
                </Col>
            </Row>
            < br />
            <h2>You can now find your tickets within your user profile under the <Link to="/UserDashboard">Tickets</Link > tab. </h2>

        
            <PaymentSummary
                title={customerMovie.title}
                total_price={total_price}
                selectedSeats={selectedSeats}
                selectedTicket={selectedTicket}
                showtime={selectedTicket.date + " " + selectedTicket.time}
            />
            < br />
            <h4 style={{ paddingLeft: 300, paddingRight: 300, paddingBottom: 100 }}>We look forward to seeing you, and we hope you enjoy your experience here at ACP Theaters!
            Should you have any questions or concerns in regards to your purchased tickets,
            please navigate to either the message icon located in the navigation bar or
            within your user profile under the <Link to="/UserDashboard">Messaging</Link > tab.</h4>

        </div>
        //Addition of Movie card that the user has purchased should show up between the h1 and h2 tags. No clicking of the modal to brign up
        //information about the movie would be necessary. Just for visual purposes of the user's purchased tickets only
    );
}

export default Confirmation;