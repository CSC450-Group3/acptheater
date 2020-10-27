import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Tag, Spin, Modal, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Meta } = Card;
const TextTitle = Typography.title;

const MovieCard = ({title, poster_url, movie_id, ShowDetails, DetailRequest, ActivateModal}) => {

    const clickHandler = async() => {

        ActivateModal(true);
        DetailRequest(true);

        await axios.get('api/movie/' + movie_id[0] )
        .then( res =>{
            const movie = res.data;
            console.log(movie);
                DetailRequest(false);
                ShowDetails(movie);
        })
        .catch( err => {
            console.log(err);
        })

    }

    return (
        <Col style={{margin: '50px'}} span={3}>
            <div>
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
                    <Meta
                        title={title}
                    />
                </Card>
            </div>
        </Col>
    )
}

const MovieDetail = ({title, cast, release_date, rated, duration, genre, poster_url, plot }) => {
    return (
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
                        <Tag>{duration}</Tag> 
                        <Tag>{genre}</Tag>                        
                    </Col>
                </Row>
                <Row>
                    <Col>{plot}</Col>
                </Row>
            </Col>
        </Row>
    )
}

const Loader = () => (
    <div>
        <Spin />
    </div>
)

function Showtimes() {

    const [data, setData] = useState([]);
    const [activateModal, setActivateModal] = useState(false);
    const [details, setShowDetails] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [activateForm, setActivateForm] = useState(false);

    useEffect(async () =>{

        await axios.get('api/movie/getAll')
        .then( res =>{
            const movies = res.data;
            console.log(movies);
            setData(movies)
        })
        .catch( err => {
            console.log(err);
        })
    }, []);
    
    return (
        <div className="Showtimes">
            <Layout className="layout">
                <Content>
                    <div style={{ background: '#282c34', padding: 60, minHeight: 300 }}>
                        <Row justify="center">
                            {Object.keys(data).map((key) => (
                                    <MovieCard 
                                        ShowDetails={setShowDetails} 
                                        DetailRequest={setDetailRequest}
                                        ActivateModal={setActivateModal}
                                        ActivateForm={setActivateForm}
                                        key={data[key].movie_id}
                                        title = {data[key].title}
                                        movie_id = {data[key].movie_id}
                                        poster_url = {data[key].poster_URL}
                                    />
                            ))}
                            
                        </Row>
                    </div>
                    <Modal
                        title='Details'
                        centered
                        visible={activateModal}
                        onCancel={() => setActivateModal(false)}
                        onOk={() => setActivateForm(true)}
                        width={800}
                        footer={[
                            <Button key="cancel" onClick={() => setActivateModal(false)}><Link to='/Showtimes'>Cancel</Link > </Button>,
                            <Button key="schedule" onClick={() =>setActivateForm(true)}><Link to='/PurchaseTickets'>Purchase Tickets</Link > </Button>
                          ]}
                        >
                        { detailRequest === false ?
                            (<MovieDetail {...details} />) :
                            (<Loader />) 
                        }
                    </Modal>
                </Content>
            </Layout>
        </div>
    );
}

export default Showtimes;