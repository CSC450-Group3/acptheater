import React from 'react';
import TicketInfo from './TicketInfo'
import { Card, Row, Col } from 'antd';
import { cstDateTime } from '../../helper/FormatDate';
import { v4 } from 'node-uuid'; // used to generate unique ID

const PaymentSummary = ({ title, total_price, selectedSeats, selectedTicket, showtime }) => {

    return (
        <Row type="flex" align="center">
            <Col >
                <Card style={{ maxWidth: 300, backgroundColor: "inherit", border: "none" }}> 
                    <h3>Purchase Summary</h3>
                    <div style={{ textAlign: "left" }}>
                        <p>Selected Movie: {title}</p>
                        <p>Screen: {selectedTicket.screen_name} </p>
                        <p>Showtime: {cstDateTime(showtime)}</p>
                        <TicketInfo
                            key={v4()}
                            selectedTicket={selectedTicket}
                            selectedSeats={selectedSeats}
                        />
                        <p>Total Price: ${total_price}</p>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default PaymentSummary;