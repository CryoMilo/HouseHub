// import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Eye from "../assets/myIcons/Eye";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";

const SignIn = () => {
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
			navigate("/signIn");
		} catch (error) {
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
			<header className="text-4xl text-white font-bold">
				Sign Up in a few steps!
			</header>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-5 my-7 center350 items-center">
				<input
					id="userName"
					type="email"
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
					<button
						onClick={() => {
							navigate("/signIn");
						}}
						className="btn btn-info w-full">
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

export default SignIn;
