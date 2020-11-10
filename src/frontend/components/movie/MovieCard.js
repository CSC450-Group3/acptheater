import React from 'react';
import { Col, Card, Button } from 'antd';
import 'antd/dist/antd.css';

const { Meta } = Card;

const MovieCard = ({ movie_id, title, cast, plot, duration, rated, poster_url, genre, release_date, setActivateModal, selectMovieToWatch, setDetailRequest }) => {

    const clickHandler = () => {
        setDetailRequest(true)
        setActivateModal(true)
        //set the movie details for the movie the customer selected		
        selectMovieToWatch(movie_id, title, cast, plot, duration, rated, poster_url, genre, release_date)
        setDetailRequest(false)
    }

    return (
        <div className="movieCard">
            <Col style={{ margin: '15px' }} span={3}>
                <div style={{ textAlign: 'center' }}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt={title}
                                src={poster_url === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : poster_url}
                            />
                        }
                        onClick={() => clickHandler()}
                    >

                        {poster_url === 'N/A' ? <Meta title={title} style={{ paddingBottom: 10 }} /> : null}

                        <Button
                            shape="round"
                            type="primary"
                            size={'large'}
                            ghost

                        >
                            Purchase Tickets
                        </Button>
                    </Card>
                </div>
            </Col>
        </div>
    )
}

export default MovieCard;