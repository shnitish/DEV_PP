import React, { Component } from 'react';
import "./Header.css"

class Header extends Component {
  state = 
  {
    newMovieName: "",
  };

  handleKeyPress = (e)=>
  {
    let newMovieName = this.state.newMovieName;
    let setMovies = this.props.setMovies;
    if(e.key === "Enter")
    {
      setMovies(newMovieName);
    }
  }
  
  handleOnChange = (e)=>
  {
    let value = e.target.value;
    this.setState({newMovieName: value});
  }

  render() { 
    let newMovieName = this.state.newMovieName;
    let handleOnChange = this.handleOnChange;
    let handleKeyPress = this.handleKeyPress;

    return (
      <div className="header">
        <div className="logo">
          <img src="logo.svg" alt="" />
        </div>
        <div className="search-btn">
          <input 
          type="text"
          className="search-movies"
          value={newMovieName}
          placeholder="Search"
          onChange={handleOnChange}
          onKeyPress={handleKeyPress}/>
        </div>
      </div>
    );
  }
}
 
export default Header;