import { React, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AuthContext } from "../../Context/Authprovider";
import { firebaseDB, firebaseStorage } from "../../Config/firebase";
import { uuid } from "uuidv4";

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	fabButton: {
		position: "absolute",
		zIndex: 1,
		top: 15,
		left: 0,
		right: 0,
		margin: "0 auto",
	},
}));

const Upload = () => {
	const [videoFile, setVideoFile] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadClicked, setUploadClicked] = useState(false);
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const classes = useStyles();

	const handleInputFile = (e) => {
		let file = e.target.files[0];
		setVideoFile(file);
	};

	const uploadFile = async () => {
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

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Choose File to upload</h2>
			<p id="simple-modal-description">
				<input type="file" onChange={handleInputFile} />
				<Button variant="contained" color="primary" onClick={uploadFile}>
					Upload
				</Button>
				<ShowUploadProgress
					progress={uploadProgress}
					isUploading={uploadClicked}
				></ShowUploadProgress>
			</p>
		</div>
	);

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleOpen}
				className={classes.fabButton}
			>
				<AddIcon />
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
};

const ShowUploadProgress = ({ progress, isUploading }) => {
	if (isUploading === true) {
		return (
			<LinearProgress variant="determinate" value={progress}></LinearProgress>
		);
	} else {
		return null;
	}
};

export default Upload;
