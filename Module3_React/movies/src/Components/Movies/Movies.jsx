import React, { Component } from 'react';
import Movie from "../Movie/Movie.jsx"

class Movies extends Component {
  state = {  }
  render() { 
    let moviesData = this.props.moviesData;

    return (<div className="movies">
      {
        moviesData.map(function(movieObj)
        {
          let key = movieObj.id;
          return <Movie key={key} movieObj={movieObj}></Movie>
        })
      }
    </div>);
  }
}
 
export default Movies;