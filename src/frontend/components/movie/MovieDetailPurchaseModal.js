import React from 'react';
import { Modal, Button } from 'antd';
import { Link } from "react-router-dom";
import Loader from '../util/Loader'
import MovieDetail from './MovieDetail';
import 'antd/dist/antd.css';

const MovieDetailPurchaseModal = (
            { title, cast, release_date, rated, duration, genre, poster_url, plot, 
                detailRequest, activateModal, setActivateModal, setActivateForm, clearMovieToWatch }
        ) => {
    return (
        <Modal
            title='Details'
            centered
            visible={activateModal}
            onCancel={() => setActivateModal(false)}
            onOk={() => setActivateForm(true)}
            width={800}
            footer={[
                <Button key="purchase" type="primary" onClick={() =>setActivateForm(true)}><Link to='/PurchaseTickets'>Purchase Tickets</Link ></Button>,
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

export default MovieDetailPurchaseModal;