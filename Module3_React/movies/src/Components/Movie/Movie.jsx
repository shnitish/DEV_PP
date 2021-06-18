import React, { Component } from 'react';
import {IMAGE_URL} from "../../API/secrets.js"
import "./Movie.css"

class Movie extends Component {
  state = {  }
  render() { 
    
    let movieObj = this.props.movieObj;
    let {poster_path, title, vote_average} = movieObj;
    let posterPath = IMAGE_URL + poster_path;

    return (<div className="movie-item">
      <div className="movie-poster">
        <img src={posterPath} alt="" />
      </div>
      <div className="movie-info">
        <div className="movie-title">{title}</div>
        <div className="movie-rating">{vote_average} IMDB</div>
      </div>
    </div>
    );
  }
}
 
export default Movie;