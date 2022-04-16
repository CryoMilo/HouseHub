import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import LeftArrow from "../assets/myIcons/LeftArrow";

const ForgotPW = () => {
	const [userEmail, setUserEmail] = useState("");
	const auth = getAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setUserEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await sendPasswordResetEmail(auth, userEmail);
			toast.success("Password Reset mail sent");
			navigate("/signIn");
		} catch (error) {
			toast.error("Could not sent message");
		}
	};

	return (
		<div>
			<h1 className="text-3xl mt-10 text-left">Forgot Password</h1>
			<p className="mt-10">
				Please insert email address to send password reset link
			</p>
			<form onSubmit={handleSubmit} className="m-10">
				<input
					className="input bg-slate-100 rounded-l-md rounded-r-none text-black"
					name="email"
					id="email"
					type="email"
					onChange={handleChange}
					value={userEmail}
				/>
				<button
					type="submit"
					className="btn btn-info rounded-r-md rounded-l-none">
					Send Reset Mail
				</button>
			</form>
			<Link to="/signIn" className="flex justify-center p-3">
				<LeftArrow />
				<h2 className="pl-3 animate-none">Go Back to Login</h2>
			</Link>
		</div>
	);
};

export default ForgotPW;
