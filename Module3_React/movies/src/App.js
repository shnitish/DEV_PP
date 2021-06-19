import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Pagination from "./Components/Pagination/Pagination.jsx";
import Favourite from "./Components/Favourite/Favourite.jsx"
import Moviepage from "./Components/Moviepage/Moviepage.jsx"

import axios from "axios";
import {API_KEY, API_URL} from "./API/secrets.js";

class App extends Component
{
  state = {
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currentPage: 1,
  };

  async componentDidMount()
  {
    let query = this.state.currentMovie;
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: 1, query: query},
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages;
    console.log(pagesCount);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++)
    {
      pages.push(i);
    }

    this.setState({moviesData: moviesData, pages: pages});
  }

  setMovies = async (newMovieName) =>
  {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: 1, query: newMovieName},
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages;
    let pages = [];
    for (let i = 1; i <= pagesCount; i++)
    {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
    });
  };

  previousPage = async () =>
  {
    let currentMovie = this.state.currentMovie;
    let currentPage = this.state.currentPage;
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: currentPage - 1, query: currentMovie},
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({moviesData: moviesData, currentPage: currentPage - 1});
  };

  setPage = async (pageCount) =>
  {
    let currentMovie = this.state.currentMovie;
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: pageCount, query: currentMovie},
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({moviesData: moviesData, currentPage: pageCount});
  };

  nextPage = async () =>
  {
    let currentMovie = this.state.currentMovie;
    let currentPage = this.state.currentPage;
    let data = await axios.get(API_URL + "/search/movie", {
      params: {api_key: API_KEY, page: currentPage + 1, query: currentMovie},
    });
    let moviesData = data.data.results.slice(0, 10);
    this.setState({moviesData: moviesData, currentPage: currentPage + 1});
  };

  render()
  {
    let moviesData = this.state.moviesData;
    let setMovies = this.setMovies;
    let pages = this.state.pages;
    let currentPage = this.state.currentPage;
    let previousPage = this.previousPage;
    let setPage = this.setPage;
    let nextPage = this.nextPage;

    return (
      <Router>
        <div className="App">
          <Header setMovies={setMovies}></Header>

          <Switch>
            <Route path="/" exact>
              {moviesData.length === 0 ? (
                <h1>Oops No Movies Found !!</h1>
              ) : (
                <React.Fragment>
                  <Movies moviesData={moviesData}></Movies>
                  <Pagination
                    pages={pages}
                    currentPage={currentPage}
                    previousPage={previousPage}
                    setPage={setPage}
                    nextPage={nextPage}
                  ></Pagination>
                </React.Fragment>
              )}
            </Route>
            
            <Route path="/fav" exact>
              <Favourite></Favourite>
            </Route>
            
            <Route path="/moviepage" component={Moviepage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
