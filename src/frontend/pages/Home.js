//Alex Yahn, Caitlin Landrus, Patrick Garry

import React, { useState } from 'react';
import { v4 } from 'node-uuid'; // used to generate unique ID
import MoviePurchaseCard from '../components/movie/MoviePurchaseCard';
import MovieDetailPurchaseModal from '../components/movie/MovieDetailPurchaseModal';
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
    ],
  }

  return (
    <body>

      <div class="rowHome">
        <div class="columnHome">
          <div className="welcome">
            <h1 className="headers">ACP Theaters Welcomes you!</h1>
            <div className="welcomeIntro">
              Brought to you by Alex Yahn, Caitlin Landrus, and
              Patrick Garry. Happy to bring you live streaming
              from the comforts of your own home as well as
              in-person premier seating!
            </div>
          </div>
        </div>
        <div class="columnHome">
          <div className="currentMovies">
            <h1 className="headers">Current Movies</h1>

            <marquee behavior="scroll" direction="left">
              <div className="rowFood">
                {Object.keys(activeMovies).map(key => (
                  <div className="column" key={v4()} >
                    <MoviePurchaseCard
                      selectMovieToWatch={props.selectMovieToWatch}
                      setActivateDetailModal={setActivateDetailModal}
                      setActivateLoginModal={setActivateLoginModal}
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
                      selected_date={today}
                      user={props.user}
                      history={props.history}
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
              activateModal={activateDetailModal}
              setActivateModal={setActivateDetailModal}
              setActivateForm={setActivateForm}
              clearMovieToWatch={props.clearMovieToWatch}
              setActivateLoginModal={setActivateLoginModal}
              user={props.user}
              history={props.history}
            />

            <RequireLoginModal
              activateLoginModal={activateLoginModal}
              setActivateLoginModal={setActivateLoginModal}
            />

          </div>
        </div>
      </div>

      <div className="ourHome2Yours">From Our Home To Yours</div>
      <div class="rowHome">

        <div class="columnHome">
          <div className="food">
            <h1 className="headers">Food & Drinks</h1>
            <marquee behavior="scroll" direction="right">
              <div className="rowFood">

                <div className="columnFood">
                  <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%" /></p>
                  <p>Popcorn<br></br>Description / Sizes<br></br>Price(s)</p>
                </div>

                <div className="columnFood">
                  <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%" /></p>
                  <p>Nachos<br></br>Description<br></br>Price</p>
                </div>

                <div className="columnFood">
                  <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%" /></p>
                  <p>Candy<br></br>Description<br></br>Price</p>
                </div>

                <div className="columnFood">
                  <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%" /></p>
                  <p>Popcorn<br></br>Description / Sizes<br></br>Price(s)</p>
                </div>

                <div className="columnFood">
                  <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%" /></p>
                  <p>Nachos<br></br>Description<br></br>Price</p>
                </div>

                <div className="columnFood">
                  <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%" /></p>
                  <p>Candy<br></br>Description<br></br>Price</p>
                </div>
              </div>
            </marquee>
          </div>
        </div>

        <div class="columnHome">
          <div className="beverages">
            <h1 className="headers">Premier Seating or the Comfort of Your Home</h1>
            <ReactPhotoCollage {...setting} />
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>

    </body>
  );
}

export default Home;