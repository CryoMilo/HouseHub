import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hook/useAuthStatus";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = () => {
	const { isLoggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return (
			<div className="loading">
				<LoadingSpinner />
			</div>
		);
	}

	return isLoggedIn ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoute;
