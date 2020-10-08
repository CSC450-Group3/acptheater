import React from 'react';

function Home() {
  return (
    <body>
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
        <h1>Current Movies</h1>
        <div class="row">

          <div class="column">
            <p>Movie Photo</p>
            <p>Movie Title</p>
            <p>Run Time</p>
            <p>Release Date</p>
          </div>

          <div class="column">
            <p>Movie Photo</p>
            <p>Movie Title</p>
            <p>Run Time</p>
            <p>Release Date</p>
          </div>

          <div class="column">
            <p>Movie Photo</p>
            <p>Movie Title</p>
            <p>Run Time</p>
            <p>Release Date</p>
          </div>

          <div class="column">
            <p>Movie Photo</p>
            <p>Movie Title</p>
            <p>Run Time</p>
            <p>Release Date</p>
          </div>
        </div>

      </div>

      <div className="beverages">
        <h1>
          Beverages
          </h1>
          <p>
            <img src={process.env.PUBLIC_URL + '/images/beer.jpeg'} alt="beer" width="75%"/>
          </p>
      </div>

      <div className="food">
        <h1>
          Food
          </h1>
          <div class="row">

          <div class="column">
            <p><img src={process.env.PUBLIC_URL + '/images/popcorn.jpeg'} alt="popcorn" margin="auto" width="75%"/></p>
            <p>Popcorn</p>
            <p>Description / Sizes</p>
            <p>Price(s)</p>
          </div>

          <div class="column">
          <p><img src={process.env.PUBLIC_URL + '/images/nachos.jpeg'} alt="nachos" margin="auto" width="75%"/></p>
            <p>Nachos</p>
            <p>Description</p>
            <p>Price</p>
          </div>

          <div class="column">
          <p><img src={process.env.PUBLIC_URL + '/images/candy.jpeg'} alt="candy" margin="auto" alight width="75%"/></p>
            <p>Candy</p>
            <p>Description</p>
            <p>Price</p>
          </div>
        </div>
      </div>

      <div className="seating">
        <h1>
          State of the Art Seating
          <img src={process.env.PUBLIC_URL + '/images/seats.jpeg'} alt="seats" width="75%"/>
          </h1>
      </div>
    </body>
  );
}

export default Home;
