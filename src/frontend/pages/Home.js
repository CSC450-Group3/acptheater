//Alex Yahn, Caitlin Landrus, Patrick Garry

import React, { useState } from 'react';
import { v4 } from 'node-uuid'; // used to generate unique ID
import MovieActionCard from '../components/movie/MovieActionCard';
import MovieDetailActionModal from '../components/movie/MovieDetailActionModal';
import RequireLoginModal from '../components/user/RequireLoginModal';
import { isoDate } from '../helper/FormatDate';
import { ReactPhotoCollage } from "react-photo-collage";

function Home(props) {
  const [activateDetailModal, setActivateDetailModal] = useState(false);
  const [activateLoginModal, setActivateLoginModal] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [activateForm, setActivateForm] = useState(false);

  //props data from redux store
  const activeMovies = props.scheduledMovies;
  const customerMovie = props.customerMovie;
  const today = isoDate();

  const setting = {
    width: '600px',
    height: ['200px', '100px'],
    layout: [2, 3],
    photos: [

      { src: '/images/inTheater1.jpeg' },
      { src: '/images/inHome1.jpeg' },
      { src: '/images/inTheater2.jpeg' },
      { src: '/images/inHome2.jpeg' },
      { src: '/images/inTheater3.jpeg' },
      { src: '/images/inTheater1.jpeg' },
      { src: '/images/inHome1.jpeg' },
      { src: '/images/inTheater2.jpeg' },
      { src: '/images/inHome2.jpeg' },
      { src: '/images/inTheater3.jpeg' },
    ],
    showNumOfRemainingPhotos: true
  }

  return (
    <div>
      <div className="ourHome2Yours">Welcome to ACP Theatres!</div>
      <div className="currentMovies">
        <h1 className="headers">Current Movies</h1>

        <marquee behavior="scroll" direction="left">
          {Object.keys(activeMovies).map(key => (
            <div className="column" key={v4()} >
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

      <div className="ourHome2Yours">From Our Home To Yours</div>
      <div className="homePageBottom">
        <p></p>
        <p></p>
        <ReactPhotoCollage {...setting} />
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}

export default Home;
