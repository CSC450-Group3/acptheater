import React, { useState, useEffect } from 'react';
import { Layout, Row, Empty } from 'antd';
import MovieActionCard from '../components/movie/MovieActionCard';
import { v4 } from 'node-uuid'; // used to generate unique ID
import 'antd/dist/antd.css';
import MovieDetailActionModal from '../components/movie/MovieDetailActionModal'
import RequireLoginModal from '../components/user/RequireLoginModal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {isoDate, cstDate} from '../helper/FormatDate';
import { Select } from 'antd';
import NoMovies from '../components/movie/NoMovies';


const { Option } = Select;
const { Content } = Layout;
const today = isoDate();

const styles = makeStyles((theme) => ({
    root: {
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
    text:{
        color: 'white',
        fontSize: '18px'
    },
    empty:{
        backgroundColor:'#282c34',
    }
}));


function Showtimes(props) {
    const classes = styles();

    //props data from redux store
    const activeMoviesToday =  props.scheduledMovies; 
    const customerMovie = props.customerMovie;

    const [activateDetailModal, setActivateDetailModal] = useState(false);
    const [activateLoginModal, setActivateLoginModal] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(cstDate());
    const [moviesToDispaly, setMoviesToDisplay] = useState({});
    
    useEffect(() =>{
        // Update the document title using the browser API
        document.title = `ACP | Showtimes`;
    });

    useEffect(()=>{
        // load movie dates that have movies schedule on or after today
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

        return () => {
            // cleanup on unmount
           
        }
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

    const handleSelectChange = async(value) =>{
        setSelectedDate(value)
        loadMoviesByDate(value)
    }

    function dateMenu(){
        if(dates.length > 0){
            return(
                <div>
                <label htmlFor="date" className={classes.text}>Movie showing on date: </label>

                {/* Display the list of dates that have movies from the database if today is a day with scheduled movies
                    Otherwise, hardcode today in as an option, then display all future dates from the database*/}
                {
                    dates[0].showing_date === cstDate() ? 
                    <Select defaultValue={selectedDate}  onChange={handleSelectChange}>
                        {Object.keys(dates).map((key) => (
                            <Option 
                                key={dates[key].showing_date}
                                value = {dates[key].showing_date}
                                name = {dates[key].showing_date}
                            >
                                {dates[key].showing_date}
                            </Option >
                        
                        ))}
                   
                    </Select> 
                    :
                    <Select defaultValue={selectedDate}  onChange={handleSelectChange}>
                        {/* this is to display today's date as an option if today has no movies scheduled
                            this will set today's date in iso format, but display today's date as mm/dd/yyyy format  */ }
                        <Option value={today}>{cstDate()}</Option> 
                        {Object.keys(dates).map((key) => (
                            <Option 
                                key={dates[key].showing_date}
                                value = {dates[key].showing_date}
                                name = {dates[key].showing_date}
                            >
                                {dates[key].showing_date}
                            </Option >
                        
                        ))}
               
                </Select> 

                }

                </div>
            )
        }
    }

    function cardContent(){
        // If movies haven't been loaded for a user selected date, show whatever is playing today if there are movies today
        if(Object.keys(moviesToDispaly).length === 0 &&  Object.keys(activeMoviesToday).length !== 0){
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
        else if(Object.keys(moviesToDispaly).length === 0 &&  Object.keys(activeMoviesToday).length === 0 ){
            return(
               <NoMovies className={classes.empty}>There are no movies playing on the selected date.</NoMovies>         
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
        <div className={classes.root}>
            <h1 className={classes.header}>Showtimes</h1>
            <hr width ="95%"></hr>
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