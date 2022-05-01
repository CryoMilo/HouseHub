import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {
	return (
		<>
			<header className="pageHeader">Explore</header>
			<p className="pageSubHeader">Category</p>
			<div id="category" className=" flex justify-center gap-3 mx-7">
				<div id="rent">
					<Link to="/category/rent">
						<img
							className="object-cover h-[15rem] w-[30rem] rounded-xl drop-shadow-md hover:contrast-150"
							src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
							alt="rent"
						/>
					</Link>
					<p className="text-left text-xl pt-3">Places for Rent</p>
				</div>
				<div id="rent">
					<Link to="/category/buy">
						<img
							className="object-cover  h-[15rem] w-[30rem] rounded-xl drop-shadow-md hover:contrast-150"
							src="https://images.unsplash.com/photo-1628624747271-4df6ca1e1ba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
							alt="buy"
						/>
					</Link>
					<p className="text-left text-xl pt-3">Places to Buy</p>
				</div>
			</div>
		</>
	);
};

export default Explore;
