import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Tag, Spin, Modal, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Meta } = Card;
const TextTitle = Typography.title;

const MovieCard = ({title, poster_url, movie_id, ShowDetails, DetailRequest, ActivateModal}) => {

    const clickHandler = async() => {

							
        DetailRequest(true);
        console.log("title: ", title)
        console.log("poster_url: ", poster_url)
        console.log("movie_id: ", movie_id)

        await axios.get('api/movie/' + movie_id )
        .then( res =>{
            const movie = res.data;
            console.log(movie);
                DetailRequest(false);
                ShowDetails(movie);
                ActivateModal(true);
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
                        {title}
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
    const [details, setShowDetails] = useState([]);
    const [detailRequest, setDetailRequest] = useState(false);
    const [activateForm, setActivateForm] = useState(false);

    useEffect(() =>{

        async function getActiveMovieShowings(){
			await axios.get('/api/movie/getAll')
			.then(function(res) {
				//screens found successfully
				setData(res.data)
			})
			.catch(function (err) {
				console.log(err)
			});
		}

        getActiveMovieShowings();   
        
    }, [data]);
    
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
                                    key={v4()} //gurantee key is unique in case someone creates mutliple movie records
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
                        { detailRequest === false && details.length !==0 ?
                            (<MovieDetail 
                                title={details.title} 
                                cast={details.cast}
                                release_date={details.release_date}
                                rated={details.rated} 
                                duration={details.duration}
                                genre={details.genre}
                                poster_url={details.poster_URL}
                                plot={details.plot}
                             />) :
                            (<Loader />) 
                        }
                    </Modal>
                </Content>
            </Layout>
        </div>
    );
}

export default Showtimes;