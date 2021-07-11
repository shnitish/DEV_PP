import React, { useState, useEffect, useContext } from "react";
import { firebaseAuth } from "../Config/firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
	const [currentUser, setUser] = useState(null);

	const login = (email, password) => {
		firebaseAuth.signInWithEmailAndPassword(email, password);
	};

	const signOut = () => {
		firebaseAuth.signOut();
	};

	const signUp = (email, password) => {
		return;
	};

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			setUser(user);
		});
	}, []);

	let value = {
		currentUser: currentUser,
		signOut: signOut,
		login: login,
		signUp: signUp,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
