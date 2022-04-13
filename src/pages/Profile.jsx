import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
	const auth = getAuth();
	const navigate = useNavigate();

	const [editing, setEditing] = useState(false);

	const [formData, setFormData] = useState(null);
	useEffect(() => {
		if (isLoggedIn === false) {
			setFormData({
				name: auth.currentUser.displayName,
				email: auth.currentUser.email,
			});
		} else {
			setFormData(null);
		}
	}, []);

	const handleEditProfile = () => {
		console.log("Change Trigger");
		setEditing(true);
	};

	const saveChanges = () => {
		setEditing(false);
		toast.success("Saved Changes");
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
			{/* {formData ? (
				<h1 className="text-6xl relative top-8 text-white">{formData.name}</h1>
			) : (
				<h1>"User Not Logged In"</h1>
			)} */}
			<div className="flex justify-between items-center">
				<h3 className="text-left text-4xl p-8 text-white">User Profile</h3>
				<div className="dropdown dropdown-end m-8">
					<label
						tabIndex="0"
						className="btn btn-circle p-3 bg-amber-300 text-black hover:bg-amber-100">
						{auth.currentUser.displayName[0]}
					</label>
					<ul tabIndex="0" className="dropdown-content menu w-auto">
						<li onClick={handleEditProfile} className="w-28">
							<a>Edit Profile</a>
						</li>
						<li onClick={handleLogOut}>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="mx-28 my-8 ">
				<div class="avatar">
					<div class="w-48 mask mask-squircle">
						<img
							src="https://api.lorem.space/image/face?hash=47"
							alt="avatar"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-6 mt-8">
					<div className="flex text-left">
						<h2 className="text-3xl pr-11">Username</h2>
						<h2 className="text-3xl text-white">
							{auth.currentUser.displayName}
						</h2>
					</div>
					<div className="flex text-left">
						<h2 className="text-3xl pr-11">Email</h2>
						<h2 className="text-3xl text-white pl-[4rem]">
							{auth.currentUser.email}
						</h2>
					</div>
					{editing ? (
						<div className="flex justify-center gap-6 pt-10">
							<button onClick={saveChanges} className="btn btn-success w-32">
								Save
							</button>
							<button
								onClick={() => {
									setEditing(false);
								}}
								className="btn btn-error w-32">
								Cancel
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Profile;
