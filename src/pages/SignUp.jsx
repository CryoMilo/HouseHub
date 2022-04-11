// import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Eye from "../assets/myIcons/Eye";

const SignIn = () => {
	const navigate = useNavigate();
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
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
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
				Sign Up in few steps!
			</header>
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
				<div className="center350 items-center">
					{/* <button
						onClick={() => {
							navigate("/signIn");
						}}
						className="btn btn-info">
						Log in
					</button> */}
					<button
						onClick={() => {
							navigate("/signIn");
						}}
						className="btn btn-info w-full">
						Sign Up
					</button>
				</div>
			</form>
			{/* <Link to="/forgotPassword">
				<p className="text-right text-white center350">Forgot Password?</p>
			</Link> */}
		</div>
	);
};

export default SignIn;
