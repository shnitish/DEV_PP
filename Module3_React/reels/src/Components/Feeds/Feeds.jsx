import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/Authprovider";
import { Button, CircularProgress } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseDB, firebaseStorage } from "../../Config/firebase";
import { uuid } from "uuidv4";

const Feeds = () => {
	const { signOut } = useContext(AuthContext);
	const [videoFile, setVideoFile] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadClicked, setUploadClicked] = useState(false);
	const { currentUser } = useContext(AuthContext);

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
					<ShowProgress
						progress={uploadProgress}
						isUploading={uploadClicked}
					></ShowProgress>
				</label>
			</div>
		</div>
	);
};

const ShowProgress = ({ progress, isUploading }) => {
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
