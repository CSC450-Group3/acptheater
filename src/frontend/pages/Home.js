import React, { useState } from 'react';
import { v4 } from 'node-uuid'; // used to generate unique ID
import MovieCard from '../components/movie/MovieCard';
import MovieDetailPurchaseModal from '../components/movie/MovieDetailPurchaseModal'

function Home(props) {
  const [activateModal, setActivateModal] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [activateForm, setActivateForm] = useState(false);

  //props data from redux store
  const activeMovies = props.scheduledMovies;
  const customerMovie = props.customerMovie;

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
          <div className="row">
            {Object.keys(activeMovies).map(key => (
              <div className="column" key={v4()} >
                <MovieCard
                  selectMovieToWatch={props.selectMovieToWatch}
                  setActivateModal={setActivateModal}
                  setDetailRequest={setDetailRequest}
                  key={v4()}
                  movie_id={activeMovies[key].movie_id}
                  title={activeMovies[key].title}
                  cast={activeMovies[key].cast}
                  plot={activeMovies[key].plot}
                  duration={activeMovies[key].duration}
                  rated={activeMovies[key].rated}
                  poster_url={activeMovies[key].poster_URL}
                  genre={activeMovies[key].genre}
                  release_date={activeMovies[key].release_date}
                />
              </div>
            ))}
          </div>
        </marquee>

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
          <div className="row">

            <div className="column">
              <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%" /></p>
              <p>Popcorn</p>
              <p>Description / Sizes</p>
              <p>Price(s)</p>
            </div>

            <div className="column">
              <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%" /></p>
              <p>Nachos</p>
              <p>Description</p>
              <p>Price</p>
            </div>

            <div className="column">
              <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%" /></p>
              <p>Candy</p>
              <p>Description</p>
              <p>Price</p>
            </div>

            <div className="column">
              <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%" /></p>
              <p>Popcorn</p>
              <p>Description / Sizes</p>
              <p>Price(s)</p>
            </div>

            <div className="column">
              <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%" /></p>
              <p>Nachos</p>
              <p>Description</p>
              <p>Price</p>
            </div>

            <div className="column">
              <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%" /></p>
              <p>Candy</p>
              <p>Description</p>
              <p>Price</p>
            </div>
          </div>

        </marquee>
      </div>

      <div className="seating">
        <h1>
          State of the Art Seating
          <img src={process.env.PUBLIC_URL + '/images/seats.jpeg'} alt="seats" width="75%" />
        </h1>
      </div>
    </div>
  );
}

export default Home;
