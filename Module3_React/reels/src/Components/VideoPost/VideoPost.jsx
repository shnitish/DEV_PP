import { React, useState } from "react";
import { Avatar } from "@material-ui/core";
import { firebaseDB } from "../../Config/firebase";
import "./VideoPost.css";

const VideoPost = ({ pid, uid, postObj }) => {
	const [userImageURL, setUserUrl] = useState("");
	firebaseDB
		.collection("users")
		.doc(uid)
		.get()
		.then((doc) => {
			return doc.data().profileImageUrl;
		})
		.then((userProfileURL) => {
			setUserUrl(userProfileURL);
		});
	return (
		<div className="video-container">
			<Video url={userImageURL} src={postObj.videoLink}></Video>
		</div>
	);
};

const Video = ({ url, src }) => {
	let styles = {
		height: "80vh",
		// margin: "5rem",
		border: "1px solid black",
	};
	return (
		<div className="video-post">
			<div className="avatar">
				<Avatar src={url}></Avatar>
			</div>
			<div id="video">
				<video style={styles} muted={true} loop={true} controls>
					<source src={src} type="video/mp4" />
				</video>
			</div>
		</div>
	);
};
export default VideoPost;
