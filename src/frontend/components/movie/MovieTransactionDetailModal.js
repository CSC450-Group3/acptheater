import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import Loader from '../util/Loader'
import MovieCard from './MovieCard';
import axios from 'axios';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import PaymentSummary from '../payment/PaymentSummary';

const MovieTransactionDetailModal = ({ transaction_id, title, cast, release_date, rated, duration, history,
    genre, poster_url, plot, status, isVirtual, setActivateTransactionModal, activateTransactionModal
 }
) => {

    const [selectedSeats, setSelectedSeats] = useState({});
    const [selectedTicket, setSelectedTicket] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    console.log("seats", selectedSeats)
    console.log("tickets", selectedTicket)
    useEffect(() => {
        setIsLoading(true);
        async function loadTicket() {
            axios.get('api/ticket/transaction/' + transaction_id)
                .then(function (res) {
                    console.log(res.data)
                    setSelectedTicket(res.data)

                })
                .catch(function (err) {
                    console.log(err)
                });
        }

        async function loadSeats() {
            axios.get('api/seat/transaction/' + transaction_id)
                .then(function (res) {
                    console.log(res.data)
                    setSelectedSeats(res.data)
                    setIsLoading(false);

                })
                .catch(function (err) {
                    console.log(err)
                });
        }

        //only load if the transaction_id exists
        if (transaction_id !== undefined) {
            loadTicket()
            loadSeats();
        }
        else{
            setIsLoading(false);
        }
        


    }, [transaction_id])

    function handleVirtual() {
        //close the modal and reroute
        setActivateTransactionModal(false)
        history.push("/StreamVirtual")
    }

    function handleClose() {
        // close the modal
        setActivateTransactionModal(false)
    }

    const VirtualTicketButton = () => {
        // display active button if virtual movie is active
        if (isVirtual === 1 && status === 2) {
            return (
                <Button
                    key="vitual"
                    type="primary"
                    onClick={handleVirtual}
                >
                    Watch Virtual Movie
                </Button>
            )
        }
        //display disabled button if virtual movie is future/past
        else if (isVirtual === 1 && status !== 2) {
            return (
                <Button
                    key="vitual"
                    type="primary"
                    disabled
                    onClick={handleVirtual}
                >
                    Watch Virtual Movie
                </Button>
            )
        }
        else{
            return null
        }
    }

    const CloseButton = () => {
        return (
            <Button key="close" onClick={handleClose}>Close</Button>
        )

    }

    const PageDetails =() =>{
        return(
            <div>
                <Row type="flex" align="center">
                <Col span={12}>
                <MovieCard
                    title={title}  
                    poster_url={poster_url}
                />
                </Col>
                <Col span={12}>
                <PaymentSummary
                    title={title}
                    total_price={selectedTicket.total_price}
                    selectedSeats={selectedSeats}
                    selectedTicket={selectedTicket}
                    showtime={selectedTicket.start_date_time}
                    setActivateTransactionModal={setActivateTransactionModal}
                />
                </Col>
                </Row>
            </div>
        )
    }

    return (
        <Modal
            title='Ticket Summary'
            centered
            visible={activateTransactionModal}
            onOk={handleVirtual}
            onCancel={handleClose}
            width={800}
            footer={[
                <VirtualTicketButton />,
                <CloseButton />
            ]}
        >
            { isLoading === false ?
                (<PageDetails/>) :
                (<Loader />)
            }
        </Modal>
    )
}

export default withRouter(MovieTransactionDetailModal);