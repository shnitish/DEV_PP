import React, { useState, useEffect } from "react";
import VideoPost from "../VideoPost/VideoPost";
import { firebaseDB, } from "../../Config/firebase";
import "./Feeds.css";

const Feeds = () => {
	const [posts, setPosts] = useState([]);

	/*Intersection Observer config*/
	useEffect(() => {
		let conditionObject = {
			root: null,
			threshold: 0.8,
		};

		function callback(entries) {
			entries.forEach((entry) => {
				let child = entry.target.children[0];

				child.play().then(function () {
					if (entry.isIntersecting === false) {
						child.pause();
					}
				});
			});
		}

		let observerObject = new IntersectionObserver(callback, conditionObject);
		let elements = document.querySelectorAll(".video-container #video");

		elements.forEach((e1) => {
			observerObject.observe(e1);
		});
	}, [posts]);

	/*Load all posts object from firebase and set state*/
	useEffect(() => {
		firebaseDB
			.collection("posts")
			.get()
			.then((snapshot) => {
				let allPosts = snapshot.docs.map((doc) => {
					return doc.data();
				});
				setPosts(allPosts);
			});
	}, []);

	/*Refresh posts when firebase has new updates*/
	useEffect(() => {
		firebaseDB.collection("posts").onSnapshot((snapshot) => {
			let allPosts = snapshot.docs.map((doc) => {
				return doc.data();
			});
			setPosts(allPosts);
		});
	}, []);
	
	return (
		<div>
			<h1>Feeds</h1>
			<div className="feeds-video-list">
				{posts.map((postObj) => {
					return (
						<VideoPost
							key={postObj.pid}
							uid={postObj.uid}
							postObj={postObj}
						></VideoPost>
					);
				})}
			</div>
		</div>
	);
};

export default Feeds;
