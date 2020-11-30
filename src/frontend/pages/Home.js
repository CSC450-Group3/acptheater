//Alex Yahn, Caitlin Landrus, Patrick Garry

import React, { useState } from 'react';
import { v4 } from 'node-uuid'; // used to generate unique ID
import MovieActionCard from '../components/movie/MovieActionCard';
import MovieDetailActionModal from '../components/movie/MovieDetailActionModal';
import RequireLoginModal from '../components/user/RequireLoginModal';
import {isoDate} from '../helper/FormatDate';

function Home(props) {
  const [activateDetailModal, setActivateDetailModal] = useState(false);
  const [activateLoginModal, setActivateLoginModal] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [activateForm, setActivateForm] = useState(false);

  //props data from redux store
  const activeMovies = props.scheduledMovies;
  const customerMovie = props.customerMovie;
  const today = isoDate();

  return (
    <div>
      <div className="welcome">
        <h1>ACP Theaters Welcomes you!</h1>
        <p className="welcomeIntro">
          Brought to you by Alex Yahn, Caitlin Landrus, and
          Patrick Garry. Happy to bring you live streaming
          from the comforts of your own home as well as
          in-person premier seating!
          </p>
      </div>

      <div className="currentMovies">
        <h1>
          Current Movies
        </h1>

        <marquee behavior="scroll" direction="left">
          <div className="rowFood">
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
          </div>
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

      <div className="beverages">
        <h1>Beverages</h1>
        <p>
          <img src={process.env.PUBLIC_URL + '/images/beer.jpeg'} alt="beer" width="75%" />
        </p>
      </div>

      <div className="food">
        <h1>Food</h1>
        <marquee behavior="scroll" direction="left">
          <div className="rowFood">

            <div className="columnFood">
              <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%" /></p>
              <p>Popcorn</p>
              <p>Description / Sizes</p>
              <p>Price(s)</p>
            </div>

            <div className="columnFood">
              <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%" /></p>
              <p>Nachos</p>
              <p>Description</p>
              <p>Price</p>
            </div>

            <div className="columnFood">
              <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%" /></p>
              <p>Candy</p>
              <p>Description</p>
              <p>Price</p>
            </div>

            <div className="columnFood">
              <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%" /></p>
              <p>Popcorn</p>
              <p>Description / Sizes</p>
              <p>Price(s)</p>
            </div>

            <div className="columnFood">
              <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%" /></p>
              <p>Nachos</p>
              <p>Description</p>
              <p>Price</p>
            </div>

            <div className="columnFood">
              <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%" /></p>
              <p>Candy</p>
              <p>Description</p>
              <p>Price</p>
            </div>
          </div>
        </marquee>
      </div>
    </div>
  );
}

export default Home;
