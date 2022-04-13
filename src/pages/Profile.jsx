import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const Profile = () => {
	const [user, setUser] = useState(null);
	const auth = getAuth();
	useEffect(() => {
		setUser(auth.currentUser);
	}, []);

	return (
		<div>
			{user ? (
				<h1 className="text-6xl relative top-8 text-white">
					{user.displayName}
				</h1>
			) : (
				"User Not Found"
			)}
			<button className="relative top-12">Logout</button>
		</div>
	);
};

export default Profile;
