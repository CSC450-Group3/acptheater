import React, { useState } from 'react';
import { Layout, Row } from 'antd';
import MovieCard from '../components/movie/MovieCard';
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';
import MovieDetailPurchaseModal from '../components/movie/MovieDetailPurchaseModal'

const { Content } = Layout;

function Showtimes(props) {
    //props data from redux store
    const activeMovies =  props.scheduledMovies;
    const customerMovie = props.customerMovie;

    const [activateModal, setActivateModal] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [activateForm, setActivateForm] = useState(false);
    
    return (
        <div className="Showtimes">
            <Layout className="layout">
                <Content>
                    <div style={{ background: '#282c34', padding: 60, minHeight: 300 }}>
                        <Row justify="center">
                        {Object.keys(activeMovies).map(key => (
                            <MovieCard 
                                selectMovieToWatch={props.selectMovieToWatch}
                                setActivateModal={setActivateModal}
                                setDetailRequest={setDetailRequest}
                                key={v4()} //gurantee key is unique in case someone creates mutliple movie records
                                movie_id = {activeMovies[key].movie_id}
                                title = {activeMovies[key].title}
                                cast = {activeMovies[key].cast}
                                plot = {activeMovies[key].plot}
                                duration = {activeMovies[key].duration}
                                rated = {activeMovies[key].rated}
                                poster_url = {activeMovies[key].poster_URL}
                                genre = {activeMovies[key].genre}
                                release_date = {activeMovies[key].release_date}
                            />
                          
                        ))} 
                            
                        </Row>
                    </div>
                    <MovieDetailPurchaseModal 
                        title={customerMovie.title}
                        cast={customerMovie.cast}
                        release_date={customerMovie.release_date}
                        rated={customerMovie.rated}
                        duration={customerMovie.duration}
                        genre={customerMovie.genre}
                        poster_url={customerMovie.poster_url}
                        plot={customerMovie.plot}
                        detailRequest={detailRequest}
                        activateModal={activateModal}
                        setActivateModal={setActivateModal}
                        setActivateForm={setActivateForm}
                        clearMovieToWatch={props.clearMovieToWatch}
                    />
                </Content>
            </Layout>
        </div>
    );
}

export default Showtimes;