import React, { useEffect, useState } from 'react';
import PuchasedMovieTicketCard from '../movie/PuchasedMovieTicketCard'
import MovieTransactionDetailModal from '../movie/MovieTransactionDetailModal'
import { Layout, Row } from 'antd';
import axios from 'axios';
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
        minHeight: "90vh",
        height: "100%",
        paddingBottom: 20, 
        marginBottom: 20
    },
    header: {
        color: "white"
    },
    content: {
        minHeight: 300,
        height: "100%",
    },

}));

const { Content } = Layout;

const MovieTicketDashboard = ({ user, history }) => {
    const classes = styles();
    const [purchasedMovieTickets, setPurchasedMovieTickets] = useState([]);
    const [activateTransactionModal, setActivateTransactionModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState({})

    useEffect(() => {
        // load purchased movie tickets by user
        async function loadPurchasedTickets() {
            await axios.get('/api/transaction/user/' + user.user_id)
                .then(function (res) {
                    setPurchasedMovieTickets(res.data);
                })
                .catch(function (err) {
                    console.log(err)
                })
        }

        loadPurchasedTickets();
    }, [user])

    const displayTransactionModal = () => {
        //only load this component if there is data to pass to it
        if (Object.keys(selectedTransaction).length !== 0) {
            return (
                <MovieTransactionDetailModal
                    transaction_id={selectedTransaction.transaction_id}
                    title={selectedTransaction.title}
                    cast={selectedTransaction.cast}
                    release_date={selectedTransaction.release_date}
                    rated={selectedTransaction.rate}
                    duration={selectedTransaction.duration}
                    genre={selectedTransaction.genre}
                    poster_url={selectedTransaction.poster_url}
                    plot={selectedTransaction.plot}
                    status={selectedTransaction.status}
                    isVirtual={selectedTransaction.isVirtual}
                    activateTransactionModal={activateTransactionModal}
                    setActivateTransactionModal={setActivateTransactionModal}
                    user={user}
                    history={history}

                />
            )

        }

    }

    // If movies haven't been loaded for a user selected date, show whatever is playing today
    if (Object.keys(purchasedMovieTickets).length !== 0) {
        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <Row justify="center">
                        {Object.keys(purchasedMovieTickets).map(key => (
                            <PuchasedMovieTicketCard
                                key={v4()}

                                transaction_id={purchasedMovieTickets[key].transaction_id}
                                movie_id={purchasedMovieTickets[key].movie_id}
                                title={purchasedMovieTickets[key].title}
                                cast={purchasedMovieTickets[key].cast}
                                plot={purchasedMovieTickets[key].plot}
                                duration={purchasedMovieTickets[key].duration}
                                rated={purchasedMovieTickets[key].rated}
                                poster_url={purchasedMovieTickets[key].poster_URL}
                                genre={purchasedMovieTickets[key].genre}
                                release_date={purchasedMovieTickets[key].release_date}
                                status={purchasedMovieTickets[key].status}
                                isVirtual={purchasedMovieTickets[key].isVirtual}
                                setActivateTransactionModal={setActivateTransactionModal}
                                setSelectedTransaction={setSelectedTransaction}
                            />
                        ))}
                    </Row>
                </div>
                {displayTransactionModal()}
            </div>
        )
    }
    else {
        return (
            <div className={classes.root}>
                <p> No content to display</p>
            </div>
        )
    }

}

export default MovieTicketDashboard;