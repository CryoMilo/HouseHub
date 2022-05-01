import { info } from "daisyui/src/colors";
import { error } from "daisyui/src/colors/colorNames";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

const Navbar = () => {
	return (
		<div className="fixed bottom-0">
			<nav className="bottom-nav">
				{/* <div className="flex justify-evenly"> */}
				<Link to="/" className="btn btn-ghost normal-case text-xl w-28 h-16">
					<div className="flex flex-col items-center">
						<ExploreIcon className="mb-2" />
						Explore
					</div>
				</Link>
				<Link
					to="/offers"
					className="btn btn-ghost normal-case text-xl w-28 h-16">
					<div className="flex flex-col items-center">
						<OfferIcon className="mb-2" />
						Offer
					</div>
				</Link>
				<Link
					to="/profile"
					className="btn btn-ghost normal-case text-xl w-28 h-16">
					<div className="flex flex-col items-center">
						<PersonOutlineIcon className="mb-2" />
						Profile
					</div>
				</Link>
				{/* </div> */}
			</nav>
		</div>
	);
};

export default Navbar;
