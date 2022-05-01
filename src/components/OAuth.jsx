import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import FBIcon from "../assets/myIcons/FBIcon";
import GoogleIcon from "../assets/myIcons/GoogleIcon";
import { toast } from "react-toastify";

const OAuth = () => {
	const navigate = useNavigate();
	const auth = getAuth();
	const location = useLocation();

	// Google Auth
	const onGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for user
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			// If User doesn't exists
			if (!docSnap.exists()) {
				await setDoc(doc(db, "users", user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
				toast.success("Login Successful");
				navigate("/");
				// If user exists
			} else {
				toast.info("User already exists");
				setTimeout(() => {
					navigate("/profile");
				}, 2000);
			}
		} catch (error) {
			toast.error("An error occured");
		}
	};

	// Facebook Auth
	const onFacebookLogin = async () => {
		try {
			const provider = new FacebookAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for user existance
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			// Check with docSnap
			// If User doesn't exists
			if (!docSnap.exists()) {
				await setDoc(doc(db, "users", user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
				toast.success("Login Successful");
				navigate("/");
				// If user exists
			} else {
				toast.info("User already exists");
				setTimeout(() => {
					navigate("/profile");
				}, 2000);
			}
		} catch (error) {
			toast.error("An error has occured");
		}
	};

	return (
		<div className="flex gap-3 justify-center items-center mt-14">
			<h3 className="text-left text-2xl text-primary my-5">
				<p>Sign {location.pathname === "/signIn" ? "in" : "up"} with</p>
			</h3>
			<button className="bg-white rounded-full" onClick={onGoogleLogin}>
				<GoogleIcon />
			</button>
			<button className="bg-white rounded-full" onClick={onFacebookLogin}>
				<FBIcon />
			</button>
		</div>
	);
};

export default OAuth;
