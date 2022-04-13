// import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Eye from "../assets/myIcons/Eye";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = ({ setIsLoggedIn }) => {
	// const SignIn = () => {
	const navigate = useNavigate();
	const auth = getAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;
	// const formik = useFormik({
	// 	intitialValues: {
	// 		email: "",
	// 		password: "",
	// 	},
	// 	onSubmit: (values) => {
	// 		console.log(values);
	// 	},
	// });
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredential.user) {
				toast.success("Login Successful");
				setIsLoggedIn(true);
				navigate("/profile");
			}
		} catch (error) {
			toast.error("Invalid Credentials");
			console.log(error.message);
		}
	};

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="pt-32 px-auto">
			<header className="text-4xl text-white font-bold">Welcome Back!</header>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-5 my-7 center350 items-center">
				<input
					id="email"
					type="email"
					name="email"
					aria-label="email"
					className="input w-full bg-gray-100 text-black"
					value={email}
					onChange={handleChange}
					// onChange={(e) => {
					// 	setFormData({
					// 		...formData,
					// 		email: e.target.value,
					// 	});
					// }}
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
						value={password}
						onChange={handleChange}
						// onChange={(e) => {
						// 	setFormData({
						// 		...formData,
						// 		password: e.target.value,
						// 	});
						// }}
					/>
				</div>
				<div className="center350 items-center grid grid-cols-2 gap-2">
					<button type="submit" className="btn btn-info">
						Log in
					</button>
					<button
						onClick={() => {
							navigate("/signUp");
						}}
						className="btn btn-info">
						Sign Up
					</button>
				</div>
			</form>
			<Link to="/forgotPassword">
				<p className="text-right text-white center350">Forgot Password?</p>
			</Link>
		</div>
	);
};

export default SignIn;
