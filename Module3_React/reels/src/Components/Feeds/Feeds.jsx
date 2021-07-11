import React, { useContext } from "react";
import { AuthContext } from "../../Context/Authprovider";

const Feeds = () => {
	const { signOut } = useContext(AuthContext);

	const handleLogOut = async (props) => {
		try {
			await signOut();
			props.history.push("/login");
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<h1>Feeds</h1>
			<button onClick={handleLogOut}>Logout</button>
		</div>
	);
};

export default Feeds;
