import React, { Component } from "react";
import { API_KEY, API_URL, IMAGE_URL } from "../../API/secrets.js";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Movie.css";

class Movie extends Component {
	state = { detailedMovieObj: {} };
	async componentDidMount() {
		let movieObj = this.props.movieObj;
		let response = await axios.get(
			`${API_URL}/movie/${movieObj.id}?api_key=${API_KEY}`
		);

		let detailedMovieObj = response.data;
		let posterPath = IMAGE_URL + detailedMovieObj.poster_path;
		this.setState({
			detailedMovieObj: { ...detailedMovieObj, poster_path: posterPath },
		});
	}

	render() {
		let movieObj = this.props.movieObj;
		let { poster_path, title, vote_average } = movieObj;
		let posterPath = IMAGE_URL + poster_path;
		let detailedMovieObj = this.state.detailedMovieObj;

		return (
			<div className="movie-item">
				<div className="movie-poster">
					<Link to={{ pathname: "/moviepage", state: detailedMovieObj }}>
						<img src={posterPath} alt="" />
					</Link>
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
