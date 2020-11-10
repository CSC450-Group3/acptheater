import React from 'react';
import {  Row, Col, Tag, Typography} from 'antd';
import 'antd/dist/antd.css';

const TextTitle = Typography.Title;

const MovieDetail = ({title, cast, release_date, rated, duration, genre, poster_url, plot }) => {
    return (
        <div className="movieDetail">
            <Row>
                <Col span={11}>
                    <img 
                        src={poster_url === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : poster_url} 
                        alt={title} 
                    />
                </Col>
                <Col span={13}>
                    <Row >
                        <Col>
                            <TextTitle>{title}</TextTitle>
                        </Col>
                    </Row>
                    <Row style={{marginBottom: '.7em'}}>
                        <Col>{cast}</Col>
                    </Row>
                    <Row style={{marginBottom: '.7em'}}>
                        <Col>
                            <Tag>{release_date}</Tag>
                            <Tag>{rated}</Tag> 
                            <Tag>{duration + " Min"} </Tag> 
                            <Tag>{genre}</Tag>                        
                        </Col>
                    </Row>
                    <Row>
                        <Col>{plot}</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default MovieDetail;