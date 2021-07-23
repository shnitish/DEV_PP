import { React, useContext } from "react";
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import { AuthContext } from "../../Context/Authprovider";
import Upload from "../Upload/Upload";

const useStyles = makeStyles((theme) => ({
	text: {
		padding: theme.spacing(2, 2, 0),
	},
	paper: {
		paddingBottom: 50,
	},
	list: {
		marginBottom: theme.spacing(2),
	},
	subheader: {
		backgroundColor: theme.palette.background.paper,
	},
	appBar: {
		// top: "auto",
		// bottom: 1000,
	},
	grow: {
		flexGrow: 1,
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

const ShowLogout = ({ isLoggedIn, handleLogout }) => {
	if (isLoggedIn) {
		return (
			<Button onClick={handleLogout} color="secondary" variant="outlined">
				Logout
			</Button>
		);
	} else {
		return null;
	}
};

const Header = () => {
	let classes = useStyles();
	const { signOut, currentUser } = useContext(AuthContext);

	const handle_Logout = async (props) => {
		try {
			await signOut();
			props.history.push("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<AppBar
			id="header"
			position="sticky"
			color="white"
			className={classes.appBar}
		>
			<Toolbar>
				{currentUser != null ? (
					<div className="uploadVideo">
						<label>
							<Upload></Upload>
						</label>
					</div>
				) : null}
				<div className={classes.grow} />
				<ShowLogout
					isLoggedIn={currentUser}
					handleLogout={handle_Logout}
				></ShowLogout>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
