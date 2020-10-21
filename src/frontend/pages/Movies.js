import React, { useEffect, useState } from 'react';
import { Layout, Input, Row, Col, Card, Tag, Spin, Modal, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';

const { Content } = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;


const SearchBox = ({searchHandler}) => {
    return (
        <Row>
            <Col span={12} offset={6}>
                <Search
                    placeholder="Search for movies to schedule!"
                    enterButton="Search"
                    size="large"
                    onSearch={value => searchHandler(value)}
                />
            </Col>
        </Row>
    )
}

const MovieCard = ({Title, imdbID, Poster, ShowDetails, DetailRequest, ActivateModal}) => {

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
    }

    return (
        <Col style={{margin: '50px'}} span={3}>
            <div>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        />
                    }
                    onClick={() => clickHandler()}
                >
                    <Meta
                        title={Title}
                    />
                </Card>
            </div>
        </Col>
    )
}

const MovieDetail = ({Title, Actors, Released, Rated, Runtime, Genre, Poster, Plot, }) => {
    return (
        <Row>
            <Col span={11}>
                <img 
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster} 
                    alt={Title} 
                />
            </Col>
            <Col span={13}>
                <Row >
                    <Col>
                        <TextTitle>{Title}</TextTitle>
                    </Col>
                </Row>
                <Row style={{marginBottom: '.7em'}}>
                    <Col>{Actors}</Col>
                </Row>
                <Row style={{marginBottom: '.7em'}}>
                    <Col>
                        <Tag>{Released}</Tag>
                        <Tag>{Rated}</Tag> 
                        <Tag>{Runtime}</Tag> 
                        <Tag>{Genre}</Tag>                        
                    </Col>
                </Row>
                <Row>
                    <Col>{Plot}</Col>
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

function Movies() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [activateModal, setActivateModal] = useState(false);
    const [details, setShowDetails] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [activateForm, setActivateForm] = useState(false);

    useEffect(() => {
        setError(null);
        setData(null);

        fetch(`http://www.omdbapi.com/?s=${query}&apikey=cde43fc8`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            if (response.Response === 'False') {
                setError(response.Error);
            }
            else {
                setData(response.Search);
            }
        })
        .catch(({message}) => {
            setError(message);
        })
    }, [query]);

    
    return (
        <div className="Movies">
            <Layout className="layout">
                <Content>
                    <div style={{ background: '#4a576e', padding: 60, minHeight: 300 }}>
                        <SearchBox searchHandler={setQuery} />
                        <br />
                        <Row justify="center">
                            { data !== null && data.length > 0 && data.map((result, index) => (
                                <MovieCard 
                                    ShowDetails={setShowDetails} 
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    ActivateForm={setActivateForm}
                                    key={index} 
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
                            <Button key="schedule" onClick={() =>setActivateForm(true)}><Link to='/ScheduleForm'>Schedule Movie</Link ></Button>
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

export default Movies;