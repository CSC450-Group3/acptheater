import React, { useEffect, useState } from 'react';
import { Layout, Input, Row, Col} from 'antd';
import MovieActionCard from '../components/movie/MovieActionCard';
import MovieDetailActionModal from '../components/movie/MovieDetailActionModal'
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';
import { makeStyles } from '@material-ui/core/styles';

const { Content } = Layout;
const { Search } = Input;

const scheduleMovieStyles = makeStyles(() => ({
    movies: {
        background: '#282c34', 
        minHeight: "90vh",
    },
    header:{
        color:"white",
    },
    content:{ background: '#282c34', 
        padding: 60,
        minHeight: 300 ,
    },
}));

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

function Movies(props) {
    const classes = scheduleMovieStyles();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [activateModal, setActivateModal] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);

    const {
        selectMovieToSchedule, 
        movieToSchedule,
        clearMovieToSchedule,
		user,
		history
    } = props

    useEffect(() => {
        setError(null);
        setData(null);

        fetch(`https://www.omdbapi.com/?s=${query}&apikey=cde43fc8`)
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
        <div className={classes.movies}>
            <h1 className={classes.header}>Schedule Movies</h1>
            <Layout className="layout">
                <Content>
                    <div className={classes.content}>
                        <SearchBox searchHandler={setQuery} />
                        <br />
                        <Row justify="center">
                            { data !== null && data.length > 0 && data.map((result, index) => (                               
                                <MovieActionCard
                                    selectMovieToSchedule={selectMovieToSchedule}
                                    setActivateDetailModal={setActivateModal}
                                    setDetailRequest={setDetailRequest}
                                    key={v4()}
                                    ID={result.imdbID}
                                    title={result.Title}
                                    poster_url={result.Poster}
                                    user={user}
                                    action="schedule"
                                />
                                
                            ))}
                        </Row>
                    </div>
                    
                    <MovieDetailActionModal
                        title={movieToSchedule.title}
                        cast={movieToSchedule.cast}
                        release_date={movieToSchedule.release_date}
                        rated={movieToSchedule.rated}
                        duration={movieToSchedule.duration}
                        genre={movieToSchedule.genre}
                        poster_url={movieToSchedule.poster_URL}
                        plot={movieToSchedule.plot}
                        detailRequest={detailRequest}
                        activateModal={activateModal}
                        setActivateModal={setActivateModal}
                        clearMovieToSchedule={clearMovieToSchedule}
                        action='schedule'
                        user={user}
                        history={history}
                    />
                </Content>
            </Layout>
        </div>
    );
}

export default Movies;