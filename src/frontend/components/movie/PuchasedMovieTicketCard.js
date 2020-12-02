import React, { useEffect } from 'react';
import { Col, Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import MovieCard from './MovieCard';
import { withRouter } from "react-router-dom";

const PuchasedMovieTicketCard = ({transaction_id, movie_id, title, cast, plot, duration, rated, poster_url, 
    genre, release_date, status, isVirtual, setActivateTransactionModal, setSelectedTransaction}) => {

    const clickHandler = () => {
        setSelectedTransaction({
            "transaction_id": transaction_id,
            "movie_id": movie_id,
            "title": title,
            "cast": cast,
            "plot": plot,
            "duration": duration,
            "rated": rated,
            "poster_url": poster_url,
            "genre": genre, 
            "release_date": release_date,
            "status": status,
            "isVirtual": isVirtual
        })
        setActivateTransactionModal(true)
    }

    const StatusTag = () => {
        if(status === 2){
            return(
                <Tag color="green">Active</Tag>
            )
        }
        if(status === 1){
            return(
                <Tag color="orange">Upcoming</Tag>
            )
        }
        if(status === 0){
            return(
                <Tag color="red">Past</Tag>
            )
        }
    }


    const TicketType = () => {
        if(isVirtual === 1){
            return(
                <Tag color="cyan">Virtual Ticket</Tag>
            )
        }
        if(isVirtual === 0){
            return(
                <Tag color="magenta">Theater Ticket</Tag>
            )
        }
    }


    return (
        <div className="movieCard">
            <Col style={{ margin: '15px' }} span={3}>
                <div style={{ textAlign: 'center' }}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                        <MovieCard
                            title ={title}
                            poster_url={poster_url}
                        />
                        }
                        onClick={() => clickHandler()}
                        
                    >
                    <StatusTag/>
                    <TicketType/>

                    </Card>
                </div>
            </Col>
        </div>
    )
}

export default withRouter(PuchasedMovieTicketCard);