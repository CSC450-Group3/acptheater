import React from 'react';
import { Modal, Button } from 'antd';
import Loader from '../util/Loader'
import MovieDetail from './MovieDetail';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";

const MovieDetailPurchaseModal = (
            { title, cast, release_date, rated, duration, genre, poster_url, plot, 
                detailRequest, activateModal, setActivateModal, setActivateForm, clearMovieToWatch,
                user, history, setActivateLoginModal
            }
) => {


    const isUserLoggedIn = user.user_id === "" ? false : true;

    const handleButtonClick = () =>{
        // go to purchase tickets if user is logged in
        if (isUserLoggedIn){
            history.push("PurchaseTickets")
        }
        else{
            //prompt user to login
            setActivateLoginModal(true)
            //close deatils modal
            setActivateModal(false)
        }
    }

    return (
        <Modal
            title='Details'
            centered
            visible={activateModal}
            onCancel={() => setActivateModal(false)}
            onOk={() => setActivateForm(true)}
            width={800}
            footer={[
                <Button 
                    key="purchase" 
                    type="primary" 
                    onClick={() =>{
                        setActivateForm(true)
                        handleButtonClick();
                    }
                }>
                    Purchase Tickets
                </Button>,
                <Button key="cancel" onClick={() => {
                    clearMovieToWatch(); //clear selected movie details
                    setActivateModal(false); // close the modal
                }
                }>Cancel</Button>,
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

export default withRouter(MovieDetailPurchaseModal);