import React, { useState, useContext, useEffect } from "react";
import VideoPost from "../VideoPost/VideoPost";
import { uuid } from "uuidv4";
import { firebaseDB, firebaseStorage } from "../../Config/firebase";
import { AuthContext } from "../../Context/Authprovider";
import { Button, CircularProgress } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "./Feeds.css";

const Feeds = () => {
	const [posts, setPosts] = useState([]);
	const [videoFile, setVideoFile] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadClicked, setUploadClicked] = useState(false);

	const { signOut, currentUser } = useContext(AuthContext);

	const handle_Log_Out = async (props) => {
		try {
			await signOut();
			props.history.push("/login");
		} catch (err) {
			console.log(err);
		}
	};

	const handle_Input_File = (e) => {
		let file = e.target.files[0];
		setVideoFile(file);
	};

	const handle_Upload_File = async () => {
		try {
			let uid = currentUser.uid;
			if (videoFile == null) {
				console.log("No video selected !");
				return;
			}
			const uploadVideoObject = firebaseStorage
				.ref(`/profilePhotos/${uid}/${Date.now()}.mp4`)
				.put(videoFile);

			uploadVideoObject.on("state_changed", fun1, fun2, fun3);

			function fun1(snapshot) {
				setUploadClicked(true);
				let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUploadProgress(progress);
				console.log(progress);
			}

			function fun2(error) {
				console.log(error);
			}

			async function fun3() {
				setUploadClicked(false);
				let videoURL = await uploadVideoObject.snapshot.ref.getDownloadURL();
				let pid = uuid();
				await firebaseDB.collection("posts").doc(pid).set({
					pid: pid,
					uid: uid,
					comments: [],
					likes: [],
					videoLink: videoURL,
				});
				let doc = await firebaseDB.collection("users").doc(uid).get();
				let document = doc.data();
				document.postsCreated.push(pid);
				await firebaseDB.collection("users").doc(uid).set(document);
			}
		} catch (err) {
			console.log(err);
		}
	};

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
			<button onClick={handle_Log_Out}>Logout</button>
			<div className="uploadVideo">
				<input type="file" onChange={handle_Input_File} />
				<label>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<PhotoCamera></PhotoCamera>}
						onClick={handle_Upload_File}
					>
						Upload
					</Button>
					<ShowUploadProgress
						progress={uploadProgress}
						isUploading={uploadClicked}
					></ShowUploadProgress>
				</label>
			</div>
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

const ShowUploadProgress = ({ progress, isUploading }) => {
	if (isUploading === true) {
		return (
			<CircularProgress
				variant="determinate"
				value={progress}
			></CircularProgress>
		);
	} else {
		return null;
	}
};

export default Feeds;
