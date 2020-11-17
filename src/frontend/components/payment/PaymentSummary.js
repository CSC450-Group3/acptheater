import React from 'react';
import TicketInfo from './TicketInfo'
import { Card, Row, Col } from 'antd';

const PaymentSummary = ({title, total_price, selectedSeats, selectedTicket }) => {

    return (
        <Row type="flex" align="center">
        <Col >
        <Card style={{ maxWidth: 300, backgroundColor: "inherit", border: "none"}}>             
            <h3>Purchase Summary</h3>
            <div style={{textAlign: "left"}}>
            <p>Selected Movie: {title}</p>
            <TicketInfo
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