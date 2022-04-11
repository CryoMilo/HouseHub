import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

const Navbar = () => {
	return (
		<>
			<nav className="bottom-nav">
				<Link to="/" className="btn btn-ghost normal-case text-xl w-28 h-16">
					<div className="flex flex-col items-center">
						<ExploreIcon fill="white" />
						Explore
					</div>
				</Link>
				<Link
					to="/offers"
					className="btn btn-ghost normal-case text-xl w-28 h-16">
					<div className="flex flex-col items-center">
						<OfferIcon fill="white" />
						Offer
					</div>
				</Link>
				<Link
					to="/profile"
					className="btn btn-ghost normal-case text-xl w-28 h-16">
					<div className="flex flex-col items-center">
						<PersonOutlineIcon fill="white" />
						Profile
					</div>
				</Link>
			</nav>
		</>
	);
};

export default Navbar;
