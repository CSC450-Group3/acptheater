import React, { useState, useEffect } from 'react';
import { Layout, Row } from 'antd';
import MovieActionCard from '../components/movie/MovieActionCard';
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';
import MovieDetailActionModal from '../components/movie/MovieDetailActionModal'
import RequireLoginModal from '../components/user/RequireLoginModal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {isoDate} from '../helper/FormatDate';


const { Content } = Layout;
const today = isoDate();

const showtimeStyles = makeStyles((theme) => ({
    showtimes: {
        background: '#282c34', 
        minHeight: "90vh",
    },
    header:{
        color:"white"
    },
    content:{ 
        background: '#282c34', 
        padding: 60,
        minHeight: 300 ,
    },
    dateSelect:{
        margin: theme.spacing(1),
        minWidth: 140,
        backgroundColor: 'white',
        color: 'black',
        height: '3em',
    },
    label:{
        color: 'white',
        fontSize: 18,
    }
}));


function Showtimes(props) {
    const classes = showtimeStyles();

    //props data from redux store
    const activeMoviesToday =  props.scheduledMovies; 
    const customerMovie = props.customerMovie;

    const [activateDetailModal, setActivateDetailModal] = useState(false);
    const [activateLoginModal, setActivateLoginModal] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [moviesToDispaly, setMoviesToDisplay] = useState({});
    
    useEffect(() =>{
        // Update the document title using the browser API
        document.title = `ACP | Showtimes`;
    });

    useEffect(()=>{
        // load current future dates with movies scheduled
        async function loadMovieDates(){
            await axios.get('/api/showing/dateList/date/' + today)
            .then(function(res){
                setDates(res.data);
            })
            .catch(function(err){
                console.log(err)
            })
        }

        loadMovieDates();
    }, [])

    

    async function loadMoviesByDate(date){
        await axios.get('/api/movie/date/' + isoDate(date))
            .then(function(res) {
               //update movies to display
               setMoviesToDisplay(res.data)
            })
            .catch(function(err){
                console.log("Failed to load schedules. ", err)
            });
    }

    const handleSelectChange = async(e) =>{
        setSelectedDate(e.target.value)
        loadMoviesByDate(e.target.value)
    }

    function dateMenu(){
        return(
            <div>
            <label htmlFor="date" className={classes.label}>Movie showing on date: </label>,
            <select
                value = {selectedDate} 
                name = "date"
                required
                onChange =  {(event) =>	handleSelectChange(event)}
                className={classes.dateSelect}  
            >
                {Object.keys(dates).map((key) => (
                    <option 
                        key={dates[key].showing_date}
                        value = {dates[key].showing_date}
                        name = {dates[key].showing_date}
                    >
                        {dates[key].showing_date}
                    </option >
                    
                ))}
            </select>
            </div>

        )
    }

    function cardContent(){
        // If movies haven't been loaded for a user selected date, show whatever is playing today
        if(Object.keys(moviesToDispaly).length === 0){
            return(
                <div className={classes.content}>
                    <Row justify="center">
                        {Object.keys(activeMoviesToday).map(key => (
                            <MovieActionCard
                                selectMovieToWatch={props.selectMovieToWatch}
                                setActivateDetailModal={setActivateDetailModal}
                                setActivateLoginModal={setActivateLoginModal}
                                setDetailRequest={setDetailRequest}
                                key={v4()}
                                ID={activeMoviesToday[key].movie_id}
                                title={activeMoviesToday[key].title}
                                poster_url={activeMoviesToday[key].poster_URL}
                                selected_date={selectedDate}
                                user={props.user}
                                history={props.history}
                                action='purchase'
                            />
                        ))} 
                    </Row>
                </div>
            )
        }
        //otherwise, show the movies for the date selected by the user
        else{
            return(
                <div className={classes.content}>
                    <Row justify="center">
                        {Object.keys(moviesToDispaly).map(key => (
                            <MovieActionCard
                                selectMovieToWatch={props.selectMovieToWatch}
                                setActivateDetailModal={setActivateDetailModal}
                                setActivateLoginModal={setActivateLoginModal}
                                setDetailRequest={setDetailRequest}
                                key={v4()}
                                ID={moviesToDispaly[key].movie_id}
                                title={moviesToDispaly[key].title}
                                poster_url={moviesToDispaly[key].poster_URL}
                                selected_date={selectedDate}
                                user={props.user}
                                history={props.history}
                                action='purchase'
                            />                            
                        ))} 
                    </Row>
                </div>
            )
        }
    }
    
    return (
        <div className={classes.showtimes}>
            <h1 className={classes.header}>Movies Showing</h1>
            {dateMenu()}
            <Layout className="layout">
                <Content>
                    {cardContent()}
                    <MovieDetailActionModal
                        title={customerMovie.title}
                        cast={customerMovie.cast}
                        release_date={customerMovie.release_date}
                        rated={customerMovie.rated}
                        duration={customerMovie.duration}
                        genre={customerMovie.genre}
                        poster_url={customerMovie.poster_url}
                        plot={customerMovie.plot}
                        detailRequest={detailRequest}
                        activateModal={activateDetailModal}
                        setActivateModal={setActivateDetailModal}
                        clearMovieToWatch={props.clearMovieToWatch}
                        setActivateLoginModal={setActivateLoginModal}
                        action='purchase'
                        user={props.user}
                        history={props.history}
                    />
                </Content>

                <RequireLoginModal
                    activateLoginModal={activateLoginModal} 
                    setActivateLoginModal={setActivateLoginModal}
                />
            </Layout>
        </div>
    );
}

export default Showtimes;