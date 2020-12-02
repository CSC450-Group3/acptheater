//Alex Yahn, Caitlin Landrus, Patrick Garry

import React, { useState } from 'react';
import { v4 } from 'node-uuid'; // used to generate unique ID
import MovieActionCard from '../components/movie/MovieActionCard';
import MovieDetailActionModal from '../components/movie/MovieDetailActionModal';
import RequireLoginModal from '../components/user/RequireLoginModal';
import { isoDate } from '../helper/FormatDate';
import { ReactPhotoCollage } from "react-photo-collage";
import { Layout, Row } from 'antd';

function Home(props) {
  const [activateDetailModal, setActivateDetailModal] = useState(false);
  const [activateLoginModal, setActivateLoginModal] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [activateForm, setActivateForm] = useState(false);

  //props data from redux store
  const activeMovies = props.scheduledMovies;
  const customerMovie = props.customerMovie;
  const today = isoDate();

  const collage1 = {
    width: '90%',
    height: ['200px', '100px'],
    layout: [8],
    photos: [
      { src: '/images/inTheater1.jpeg' },
      { src: '/images/inTheater2.jpeg' },
      { src: '/images/inTheater3.jpeg' },
      { src: '/images/inHome1.jpeg' },
      { src: '/images/popcorn.jpeg' },
      { src: '/images/inHome2.jpeg' },
      { src: '/images/beer.jpeg' },
      { src: '/images/homeCouch.jpeg' },
      { src: '/images/candy.jpeg' },
      { src: '/images/homeBedComp.jpeg' },
      { src: '/images/nachos.jpeg' },
    ],
    showNumOfRemainingPhotos: true
  }

  return (
    <div>
      <div className="currentMovies">
        <div className="welcomeToACP">Welcome to ACP Theatres</div>
        <h1 className="currentMoviesHeader">Now Showing<hr></hr></h1>

        <marquee behavior="scroll" direction="left">
          <Row justify="center">
            {Object.keys(activeMovies).map(key => (
              <div key={v4()} >
                <MovieActionCard
                  selectMovieToWatch={props.selectMovieToWatch}
                  setActivateDetailModal={setActivateDetailModal}
                  setActivateLoginModal={setActivateLoginModal}
                  setDetailRequest={setDetailRequest}
                  key={v4()}
                  ID={activeMovies[key].movie_id}
                  title={activeMovies[key].title}
                  poster_url={activeMovies[key].poster_URL}
                  selected_date={today}
                  user={props.user}
                  history={props.history}
                  action='purchase'
                />
              </div>
            ))}
          </Row>

        </marquee>

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
          setActivateForm={setActivateForm}
          clearMovieToWatch={props.clearMovieToWatch}
          setActivateLoginModal={setActivateLoginModal}
          user={props.user}
          history={props.history}
          action='purchase'
        />

        <RequireLoginModal
          activateLoginModal={activateLoginModal}
          setActivateLoginModal={setActivateLoginModal}
        />
      </div>

{/* MARQUEE WORK 

      <div id="maindiv">
        <div id="div1">
          &nbsp;Test-1 Test-2 Test-3 Test-4 Test-5 Test-6 Test-7 Test-8 Test-9 Test-10 Test-11
        </div>

        <div id="div2">
          &nbsp;Test-1 Test-2 Test-3 Test-4 Test-5 Test-6 Test-7 Test-8 Test-9 Test-10 Test-11
        </div>
      </div>

*/}      

      <div className="ourHome2Yours">From Our Home To Yours</div>
      <div className="homePageBottom">
        <p></p>
        <p></p>
        <ReactPhotoCollage {...collage1} />
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}

export default Home;
