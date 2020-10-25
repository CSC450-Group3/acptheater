import React, { useState } from 'react';
import { Layout, Input, Row, Col, Card, Tag, Spin, Modal, Typography, Button } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';

const { Content } = Layout;
const { /* something here */ } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;

const MovieCard = ({/* GetTitle, imdbID, Poster, ShowDetails, DetailRequest, ActivateModal from info in database for Scheduled movies */}) => {

    const clickHandler = () => {
        /* Get Movie cards from info in database for Scheduled movies */
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
                        title={/* Get Title from info in database for Scheduled movies */}
                    />
                </Card>
            </div>
        </Col>
    )
}

const MovieDetail = (/* Get Title, Actors, Released, Rated, Runtime, Genre, Poster, Plot, } from info in database for Scheduled movies */) => {
    return (
        <Row>
            <Col span={11}>
                <img 
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster} 
                    alt={/* Get poster from info in database for Scheduled movies */} 
                />
            </Col>
            <Col span={13}>
                <Row >
                    <Col>
                        <TextTitle>{/* Get title from info in database for Scheduled movies */}</TextTitle>
                    </Col>
                </Row>
                <Row style={{marginBottom: '.7em'}}>
                    <Col>{/* Get actors from info in database for Scheduled movies */}</Col>
                </Row>
                <Row style={{marginBottom: '.7em'}}>
                    <Col>
                        <Tag>{/* Get released from info in database for Scheduled movies */}</Tag>
                        <Tag>{/* Get rated from info in database for Scheduled movies */}</Tag> 
                        <Tag>{/* Get runtime from info in database for Scheduled movies */}</Tag> 
                        <Tag>{/* Get genre from info in database for Scheduled movies */}</Tag>                        
                    </Col>
                </Row>
                <Row>
                    <Col>{/* Get plot from info in database for Scheduled movies */}</Col>
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

function HomeMovies() {

    const [activateModal, setActivateModal] = useState(false);
    const [details, setShowDetails] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [activateForm, setActivateForm] = useState(false);
    
    return (
        <div className="HomeMovies">
            <Layout className="layout">
                <Content>
                    <div style={{ background: '#282c34', padding: 60, minHeight: 300 }}>
                        <Row justify="center">
                            { /* Get Movie cards from info in database for Scheduled movies */ (
                                <MovieCard 
                                    ShowDetails={setShowDetails} 
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    ActivateForm={setActivateForm}
                                    key={index} 
                                    {...result} 
                                />
                            )}
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

export default HomeMovies;