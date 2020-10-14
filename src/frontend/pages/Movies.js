import React, { Component } from 'react';

class Movies extends Component() {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch('http://www.omdbapi.com/?i=tt3896198&apikey=cde43fc8')
            .then(result => result.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            });
    }


    render() {
        var { isLoaded, items } = this.state;
   
        if(!isLoaded) {
            return <div>Loading Movies...</div>
        }

        else {
            return (
                <div className="movies">
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                Title : {item.Title} | Rated: {item.Rated} | Released: {item.Released} | Runtime: {item.Runtime}
                                | Genre: {item.Genre} | Director: {item.Director} | Actors: {item.Actors} | Plot: {item.plot}
                                | Poster: {item.Poster}
                            </li>
                        ))};
                    </ul>
                </div>      
            )  
        }
    }
}

export default Movies;