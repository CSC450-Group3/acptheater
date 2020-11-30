import React from 'react';
import { Modal, Button } from 'antd';
import Loader from '../util/Loader'
import MovieDetail from './MovieDetail';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";

/**
 * @param {*} title - Movie Title 
 * @param {*} cast - Movie Actors
 * @param {*} release_date - Movie Release Date
 * @param {*} rated - Movie Rating
 * @param {*} duration - Movie Duration
 * @param {*} genre - Movie Genre
 * @param {*} poster_url - Movie Poster
 * @param {*} plot - Movie Plot
 * @param {*} action - Movie Action
 * @param {*} detailRequest - boolean to indicate if loading indicator needs to display when fetching details
 * @param {*} activateModal - boolean to indicate if this modal is activate or not
 * @param {*} setActivateModal - sets the activateModal boolean value 
 * @param {*} setActivateLoginModal - activates the login modal if the user is not logged in
 * @param {*} clearMovieToWatch - clears the user's selected movie
 * @param {*} clearMovieToSchedule - clears the admin's selected movie that is being scheduled
 * @param {*} user - the logged in user
 * @param {*} history - the browser history 
 *
 */
const MovieDetailActionModal = (
    { title, cast, release_date, rated, duration, genre, poster_url, plot, action,
        detailRequest, activateModal, setActivateModal, clearMovieToWatch, clearMovieToSchedule,
        user, history, setActivateLoginModal
    }
) => {

    

    const isUserLoggedIn = user.user_id === "" ? false : true;

    const handlePurchase = () => {
        // go to purchase tickets if user is logged in
        if (isUserLoggedIn) {
            history.push("PurchaseTickets")
        }
        else {
            //prompt user to login
            setActivateLoginModal(true)
            //close deatils modal
            setActivateModal(false)
        }
    }


    const handleSchedule = () => {
        //go to the schedule form
        history.push('/ScheduleForm')
    }

    const ActionBar = () => {
        // movie purchase modal action bar
        if (action === 'purchase') {
            return (
                <div>
                    <Button
                        key="purchase"
                        type="primary"
                        onClick={() => {
                            handlePurchase();
                        }
                        }>
                        Purchase Tickets
                    </Button>
                    <Button key="cancel" onClick={() => {
                        clearMovieToWatch(); //clear selected movie details
                        setActivateModal(false); // close the modal
                    }
                    }>
                        Cancel
                    </Button>
                </div>
            )
        }

        // movie schedule modal action bar
        if (action === 'schedule') {
            return (
                <div>
                    <Button
                        key="purchase"
                        type="primary"
                        onClick={() => {
                            handleSchedule();
                        }
                        }>
                        Schedule Movie
                    </Button>
                    <Button key="cancel" onClick={() => {
                        clearMovieToSchedule(); //clear selected movie details
                        setActivateModal(false); // close the modal
                    }
                    }>
                        Cancel
                    </Button>
                </div>
            )
        }
    }

    return (
        <Modal
            title= 'Details'
            centered
            visible={activateModal}
            onCancel={() => setActivateModal(false)}
            width={800}
            footer={[
                <ActionBar />,
            ]}
        >
            { detailRequest === false ?
                (<MovieDetail
                    title={title}
                    cast={cast}
                    release_date={release_date}
                    rated={rated}
                    duration={duration}
                    genre={genre}
                    poster_url={poster_url}
                    plot={plot}
                />) :
                (<Loader />)
            }
        </Modal>
    )
}

export default withRouter(MovieDetailActionModal);