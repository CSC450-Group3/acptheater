import React from 'react';
import { Col, Card, Button } from 'antd';
import 'antd/dist/antd.css';

const { Meta } = Card;

const MovieCard = ({title,  poster_url}) => {
    if(poster_url !== 'N/A'){
        return (
            <div className="movieCard">
                <Col  span={3}>
                    <div style={{ textAlign: 'center' }}>
                        <Card
                            className = "card-no-content"
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt={title}
                                    src={poster_url === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : poster_url}
                                />
                            }
                        >                            
                        </Card>
                    </div>
                </Col>
            </div>
        )
    }
    else{
        return(
            <div className="movieCard">
                <Col  span={3}>
                    <div style={{ textAlign: 'center' }}>
                        <Card
                            className = "card-with-title"
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt={title}
                                    src={poster_url === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : poster_url}
                                />
                            }
                        >
                            

                            <Meta title={title} style={{ paddingBottom: 10 }} />
                            
                        </Card>
                    </div>
                </Col>
            </div>
        )
    }
}

export default MovieCard;