import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Eye from "../assets/myIcons/Eye";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const SignUp = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		userName: "",
		email: "",
		password: "",
	});

	const { userName, email, password } = formData;

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			updateProfile(auth.currentUser, {
				displayName: userName,
			});

			// Save in Firestore db
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, "users", user.uid), formDataCopy);
			toast.success("User Successfully Created");

			navigate("/signIn");
		} catch (error) {
			toast.error("Something went wrong! Try again");
			console.log(error);
		}
	};

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="py-14 px-auto">
			<header className="text-4xl center-350 p-7 text-white font-bold">
				Sign Up in a few steps!
			</header>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-5 my-7 center350 items-center">
				<input
					id="userName"
					type="text"
					name="userName"
					aria-label="userName"
					placeholder="Username"
					className="input w-full bg-gray-100 text-black"
					value={userName}
					onChange={handleChange}
				/>
				<input
					id="email"
					type="email"
					name="email"
					aria-label="email"
					className="input w-full bg-gray-100 text-black"
					placeholder="Email"
					value={email}
					onChange={handleChange}
				/>
				<div className="w-full relative flex items-center">
					<div
						className="h-6 w-6 absolute right-3 cursor-pointer hover:fill-black"
						onClick={() => setShowPassword(!showPassword)}>
						<Eye />
					</div>
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						name="password"
						className="input w-full bg-gray-100 text-black"
						placeholder="Password"
						value={password}
						onChange={handleChange}
					/>
				</div>
				<div className="center350 items-center">
					<button type="submit" className="btn btn-info w-full">
						Sign Up
					</button>
				</div>
			</form>
			<Link to="/signIn">
				<p className="text-center text-white center350">Sign In instead?</p>
			</Link>
		</div>
	);
};

export default SignUp;
