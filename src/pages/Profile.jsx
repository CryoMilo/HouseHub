/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowRight from "../assets/myIcons/ArrowRight";

const Profile = ({ setIsLoggedIn }) => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [editing, setEditing] = useState(false);

	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const handleEditProfile = () => {
		setEditing(true);
	};

	const handleEditChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const saveChanges = async (e) => {
		e.preventDefault();
		try {
			if (
				auth.currentUser.displayName !== formData.name ||
				auth.currentUser.email !== formData.email
			) {
				// Update display name in firebase
				// Change display name for authentication
				await updateProfile(auth.currentUser, {
					displayName: formData.name,
				});

				// Update email in authentication
				await updateEmail(auth.currentUser, formData.email);

				// Update both in firebase for saving purpose
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					userName: formData.name,
					email: formData.email,
				});
				setEditing(false);
				toast.success("Saved Changes");
			} else {
				setEditing(false);
				toast.info("Nothing to save");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleLogOut = () => {
		try {
			auth.signOut();
			setIsLoggedIn(false);
			navigate("/signIn");
			toast.success("Logged out");
		} catch (error) {
			toast.error("An Error Occured!");
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center">
				<h3 className="pageHeader">User Profile</h3>
				<div className="dropdown dropdown-end m-8">
					<label
						tabIndex="0"
						className="btn btn-circle p-3 bg-amber-300 text-black hover:bg-amber-100">
						{auth.currentUser.displayName[0]}
					</label>
					<ul
						tabIndex="0"
						className="dropdown-content menu w-auto bg-slate-300 text-black rounded-l-md rounded-br-md">
						<li onClick={handleEditProfile} className="w-max">
							<a>Edit Profile</a>
						</li>
						<li onClick={handleLogOut}>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="m-3">
				<div className="avatar">
					<div className="w-48 mask mask-squircle">
						<img
							src="https://api.lorem.space/image/face?hash=470"
							alt="avatar"
						/>
					</div>
				</div>

				{/* Profile Form */}
				<form className="flex flex-col gap-6 mt-8" onSubmit={saveChanges}>
					<div className="flex text-left">
						<h2 className="text-3xl pr-11 pl-4">Username</h2>
						{editing ? (
							<input
								name="name"
								id="name"
								type="text"
								autoFocus
								className="bg-transparent caret-yellow-400 w-[8rem] text-2xl text-secondary outline-none"
								placeholder={formData.name}
								value={formData.name}
								onChange={handleEditChange}
							/>
						) : (
							<h2 className="text-3xl text-primary">{formData.name}</h2>
						)}
					</div>
					<div className="flex text-left">
						<h2 className="text-3xl pr-11 pl-4">Email</h2>
						{editing ? (
							<input
								name="email"
								id="email"
								type="email"
								className="bg-transparent caret-yellow-400 w-[23rem] text-2xl pl-[2.3rem] text-secondary outline-none"
								placeholder={formData.email}
								value={formData.email}
								onChange={handleEditChange}
							/>
						) : (
							<h2 className="text-3xl text-primary pl-[2.3rem]">
								{formData.email}
							</h2>
						)}
					</div>
					<Link
						to="/createListing"
						className="flex justify-start gap-2 items-center">
						<h2 className="pl-4">Sell your property</h2>
						<ArrowRight />
					</Link>
					{editing ? (
						<div className="flex justify-center gap-6 pt-10">
							<button type="submit" className="btn btn-success w-32">
								Save
							</button>
							<button
								onClick={() => {
									setEditing(false);
									setFormData({
										name: auth.currentUser.displayName,
										email: auth.currentUser.email,
									});
								}}
								className="btn btn-error w-32">
								Cancel
							</button>
						</div>
					) : null}
				</form>
			</div>
		</div>
	);
};

export default Profile;
