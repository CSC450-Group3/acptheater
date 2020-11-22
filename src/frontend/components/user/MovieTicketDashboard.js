import React, { useEffect, useState } from 'react';
import PuchasedMovieTicketCard from '../movie/PuchasedMovieTicketCard'
import { Layout, Row } from 'antd';
import axios from 'axios';
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    MovieTicketDashboard: {
        minHeight: "90vh",
        height: "100%",
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

const MovieTicketDashboard = ({ user }) => {
    const classes = styles();
    const [purchasedMovieTickets, setPurchasedMovieTickets] = useState([]);
    const [activateTransactionModal, setActivateTransactionModal] = useState(false)

    useEffect(() => {
        // load current future dates with movies scheduled
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


    // If movies haven't been loaded for a user selected date, show whatever is playing today
    if (Object.keys(purchasedMovieTickets).length !== 0) {
        return (
            <div className={classes.MovieTicketDashboard}>
                <div className={classes.content}>
                    <Row justify="center">
                        {Object.keys(purchasedMovieTickets).map(key => (
                            <PuchasedMovieTicketCard
                                key={v4()}
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
                                
                            />
                        ))}
                    </Row>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.MovieTicketDashboard}>
                <p> No content to display</p>
            </div>
        )
    }

}

export default MovieTicketDashboard;