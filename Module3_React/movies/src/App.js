import React, { Component } from 'react';
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import axios from "axios";
import {API_KEY, API_URL, IMAGE_URL} from "./API/secrets.js";

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
    let moviesData = data.data.results;
    this.setState({moviesData:moviesData});
  }
  render() { 
    let moviesData = this.state.moviesData;

    return (<div className="App">
      <Header></Header>
      <Movies moviesData={moviesData}></Movies>
    </div>);
  }
}

export default App;
