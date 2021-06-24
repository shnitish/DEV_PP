import React, { Component } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { API_KEY, API_URL } from "../../API/secrets.js";
import "./Moviepage.css";

class Moviepage extends Component {
	state = {
		videoObject: {},
	};

	async componentDidMount() {
		let movieObj = this.props.location.state;
		let id = movieObj.id;
		let response = await axios.get(
			`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`
		);

		let videoObject = response.data.results.filter((videoObj) => {
			if (videoObj.type === "Trailer" && videoObj.site === "YouTube") {
				return true;
			}
			return false;
		});
		this.setState({ videoObject: videoObject[0] });
	}
	render() {
		const opts = {
			height: "100%",
			width: "100%",
			playerVars: {
				autoplay: 1,
			},
		};

		let { title, tagline, vote_average, poster_path, overview } =
			this.props.location.state;
			let key = this.state.videoObject.key;
			return (
				<div className="movie-page">
				<div className="movie-page-poster">
					<img src={poster_path} alt="" />
				</div>
				<div className="movie-page-details">
					<div className="movie-title-info">
						<h1>
							{title} <br></br> {vote_average} IMDB
						</h1>
						<span>{tagline}</span>
						<p>{overview}</p>
					</div>
					<div className="movie-trailer">
						<YouTube videoId={this.state.videoObject.key} opts={opts}></YouTube>
					</div>
				</div>
			</div>
		);
	}
}

export default Moviepage;
