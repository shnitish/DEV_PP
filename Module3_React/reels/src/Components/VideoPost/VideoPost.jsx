import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { firebaseDB } from "../../Config/firebase";
import "./VideoPost.css";

const VideoPost = ({ pid, uid, postObj }) => {
	const [userObject, setUserObject] = useState({});

	firebaseDB
		.collection("users")
		.doc(uid)
		.get()
		.then((doc) => {
			return doc.data();
		})
		.then((userObj) => {
			setUserObject(userObj);
		});
	return (
		<div className="video-container">
			<Video
				url={userObject.profileImageUrl}
				name={userObject.username}
				src={postObj.videoLink}
			></Video>
		</div>
	);
};

const Video = ({ url, name, src }) => {
	let styles = {
		height: "80vh",
		// margin: "5rem",
		border: "1px solid black",
	};
	return (
		<div className="video-post">
			<Link to="/" className="link">
				<div className="header">
					<div className="avatar">
						<Avatar src={url}></Avatar>
					</div>
					<div className="name">
						<p>{name}</p>
					</div>
				</div>
			</Link>
			<div id="video">
				<video style={styles} muted={true} loop={true} controls>
					<source src={src} type="video/mp4" />
				</video>
			</div>
		</div>
	);
};
export default VideoPost;