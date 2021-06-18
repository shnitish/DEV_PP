import React, { Component } from 'react';
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import axios from "axios";
import {API_KEY, API_URL} from "./API/secrets.js";

class App extends Component {
  state = 
  { 
    moviesData: [],
    currentMovie: "avengers"
  };

  async componentDidMount()
  {
    let query = this.state.currentMovie;
    let data = await axios.get(API_URL + "/search/movie", {params: {api_key: API_KEY, page: 1, query: query}});
    let moviesData = data.data.results.slice(0, 10);
    this.setState({moviesData:moviesData});
  }

  setMovies = async(newMovieName)=>
  {
    let data = await axios.get(API_URL + "/search/movie", {params: {api_key: API_KEY, page: 1, query: newMovieName}});
    let moviesData = data.data.results.slice(0, 10);
    this.setState({moviesData: moviesData, currentMovie: newMovieName});
  }
  
  render() { 
    let moviesData = this.state.moviesData;
    let setMovies = this.setMovies;
    return (<div className="App">
      <Header setMovies={setMovies}></Header>
      <Movies moviesData={moviesData}></Movies>
    </div>);
  }
}

export default App;
