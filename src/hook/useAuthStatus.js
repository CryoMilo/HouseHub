import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCheckingStatus(true);
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setCheckingStatus(false);
		});
	}, []);

	return { isLoggedIn, checkingStatus };
};

export default useAuthStatus;
