import { React, useContext } from "react";
import { AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";
import { AuthContext } from "../../Context/Authprovider";
import Upload from "../../Components/Upload/Upload";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
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
		<AppBar id="header" position="sticky" color="white">
			<Toolbar>
				{currentUser != null ? (
					<div className="upload-Video">
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
