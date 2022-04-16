import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPW from "./pages/ForgotPW";
import Navbar from "./pages/Navbar";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./styles/index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Explore />} />
				<Route path="/offers" element={<Offers />} />
				{/* <Route
					path="/profile"
					element={
						isLoggedIn === false ? (
							<SignIn setIsLoggedIn={setIsLoggedIn} />
						) : (
							<Profile setIsLoggedIn={setIsLoggedIn} />
						)
					}
				/> */}
				<Route path="/profile" element={<PrivateRoute />}>
					<Route
						path="/profile"
						element={<Profile setIsLoggedIn={setIsLoggedIn} />}
					/>
				</Route>
				<Route
					path="/signIn"
					element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/forgotPassword" element={<ForgotPW />} />
			</Routes>
			<Navbar />
			<ToastContainer
				position="top-center"
				autoClose={500}
				hideProgressBar={true}
				theme="dark"
			/>
		</div>
	);
}

export default App;
