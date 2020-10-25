import React, { useEffect, useState } from 'react';
import { Layout, Input, Row, Col, Card, Tag, Spin, Modal, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'antd/dist/antd.css';

const { Content } = Layout;
const { /* something here */ } = Input;
const { Meta } = Card;
const TextTitle = Typography.title;

const MovieCard = ({title, imdbID, poster_url, ShowDetails, DetailRequest, ActivateModal}) => {

    const clickHandler = () => {

        ActivateModal(true);
        DetailRequest(true);

        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=cde43fc8`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            DetailRequest(false);
            ShowDetails(response);
        })

/*Something with our database call */
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

    const [data, setData] = useState(null);
    const [activateModal, setActivateModal] = useState(false);
    const [details, setShowDetails] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [activateForm, setActivateForm] = useState(false);

    useEffect(async () =>{
        setData(null);

        await axios.get('api/movie/' + '2' )
        .then( res =>{
            const movie = res.data;
            console.log(movie);
            setData(movie)
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
                            { data !== null && data.length > 0 && data.map((result, movie) => (
                                <MovieCard 
                                    ShowDetails={setShowDetails} 
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    ActivateForm={setActivateForm}
                                    key={movie} 
                                    {...result} 
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
                            <Button key="cancel" onClick={() => setActivateModal(false)}>
                                Cancel
                            </Button>,
                            <Button key="schedule" onClick={() =>setActivateForm(true)}><Link to='/PurchaseTickets'>Purchase Tickets</Link ></Button>
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