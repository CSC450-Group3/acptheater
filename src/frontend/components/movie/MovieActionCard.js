import React, { useEffect } from 'react';
import { Col, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import MovieCard from './MovieCard';
import axios from 'axios';
import { withRouter } from "react-router-dom";

const { Meta } = Card;

/**
 * @param {*} title - Movie Title 
 * @param {*} poster_url - Movie Poster 
 * @param {*} ID - IMDB ID from OMDB or Movie_ID from DB
 * @param {*} selected_date - only required if using purchasing action
 * @param {*} setActivateDetailModal boolean value that opens the detail modal
 * @param {*} selectMovieToWatch - sets the user's movie details to watch
 * @param {*} setDetailRequest - sets a boolean value on if details are currently being fetched and used to display loading screen
 * @param {*} selectMovieToSchedule - sets the admin's movie to schedule
 * @param {*} setActivateLoginModal - activates the login modal if the user is not logged in
 * @param {*} user - logged in user from redux store
 * @param {*} history - browser histroy from props
 * @param {*} action - 'schedule' or 'purchase'
 */
const MovieActionCard = ({ 
        ID, title, poster_url, selected_date,
        setActivateDetailModal, selectMovieToWatch, setDetailRequest, selectMovieToSchedule, setActivateLoginModal, 
        user, history, action
    }) => {

    const isUserLoggedIn = user.user_id === "" ? false : true;

    const clickHandler = () => {
        setDetailRequest(true)
        setActivateDetailModal(true)

        //set the movie details for the movie the customer selected	
        if(action === 'purchase'){
            //get the movie info from the database
			getMovieDetails();
        }

        // set the movie details for the movie to schedule
        if(action === 'schedule'){

            //get the movie details from OMDB
            fetch(`https://www.omdbapi.com/?i=${ID}&apikey=cde43fc8`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                
                //stip of the 'min' off duration, so we can store an int
			    var duration = (response.Runtime).replace(/[^0-9]/g,''); 

                //store the movie details in the redux store movieToSchedule 
                selectMovieToSchedule(
                    response.Title,
                    response.Actors, 
                    response.Plot, 
                    duration,
                    response.Rated,
                    response.Poster,
                    response.Genre,
                    response.Released
                )
                setDetailRequest(false);
            })
        }

    }

    /**
     * handles the Purchase Ticket button being selected on a the purchase card
     */
    const handleButtonClick = () =>{
        // go to purchase tickets if user is logged in
        if (isUserLoggedIn){
            //load the movie details and go to the Purchase Ticket page
            getMovieDetails();
            history.push("/PurchaseTickets")
        }
        // prompt user to login
        else{
            setActivateLoginModal(true)
        }
    }

    /**
     * Loads the movie data from the database
     */
    async function getMovieDetails(){
          //create movie record
			await axios.get('api/movie/' + ID)
			.then(function(res){
                //store the movie details in the redux store selectedMovie 
                selectMovieToWatch(
                    res.data.movie_id, 
                    res.data.title, 
                    res.data.cast,
                    res.data.plot, 
                    res.data.duration, 
                    res.data.rated, 
                    res.data.poster_URL, 
                    res.data.genre, 
                    res.data.release_date, 
                    selected_date
                )
                setDetailRequest(false);
			})
			.catch(function (err) {
				console.log(err)
				setDetailRequest(false);
			})
    }

    const CardFooter = () =>{
        if(action ==='purchase'){
            return(
                <Button
                    shape="round"
                    type="primary"
                    size={'large'}
                    ghost
                    onClick={ (event) =>
                        {
                            handleButtonClick(); 
                            event.stopPropagation(); //stops the other onclick handler from triggering
                        }
                    }
                >
                    Purchase Tickets
                </Button>
            )
        }
        else if(action === 'schedule'){
            return(
                <Meta
                    title={title}
                />
            )
        }
    }

    return (
        <div className="movieCard">
            <Col style={{ margin: '15px' }} span={3}>
                <div style={{ textAlign: 'center' }}>
                    <Card
                        style={{ width: 300 }}
                        cover={
                        <MovieCard
                            title ={title}
                            poster_url={poster_url}
                        />
                        }
                        onClick={() => clickHandler()}
                        
                    >
                        <CardFooter/>
                    </Card>
                </div>
            </Col>
        </div>
    )
}

export default withRouter(MovieActionCard);