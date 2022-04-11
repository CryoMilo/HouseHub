import { Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPW from "./pages/ForgotPW";
import Navbar from "./pages/Navbar";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./styles/index.css";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Explore />} />
				<Route path="/offers" element={<Offers />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/forgotPassword" element={<ForgotPW />} />
			</Routes>
			<Navbar />
		</div>
	);
}

export default App;
