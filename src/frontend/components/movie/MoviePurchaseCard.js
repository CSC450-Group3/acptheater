import React from 'react';
import { Col, Card, Button } from 'antd';
import 'antd/dist/antd.css';
import MovieCard from './MovieCard';
import { withRouter } from "react-router-dom";

const MoviePurcahseCard = ({ 
        movie_id, title, cast, plot, duration, rated, poster_url, genre, release_date, 
        setActivateDetailModal, selectMovieToWatch, setDetailRequest, 
        user, history, setActivateLoginModal
    }) => {

    
    const isUserLoggedIn = user.user_id === "" ? false : true;

    const clickHandler = () => {
        setDetailRequest(true)
        setActivateDetailModal(true)
        //set the movie details for the movie the customer selected		
        selectMovieToWatch(movie_id, title, cast, plot, duration, rated, poster_url, genre, release_date)
        setDetailRequest(false)
    }

    const handleButtonClick = () =>{
        // go to purchase tickets if user is logged in
        console.log(isUserLoggedIn);
        if (isUserLoggedIn){
            history.push("\PurchaseTickets")
        }
        // prompt user to login
        else{
            setActivateLoginModal(true)
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
                    </Card>
                </div>
            </Col>
        </div>
    )
}

export default withRouter(MoviePurcahseCard);