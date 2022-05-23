import { React, useState, useEffect } from "react";
import {
	collection,
	query,
	where,
	getDocs,
	orderBy,
	limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import ListingCard from "../components/ListingCard";
import "../styles/index.css";

const Offers = () => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchListings = async () => {
		try {
			const q = query(
				collection(db, "listings"),
				where("offer", "==", true),
				orderBy("timestamp", "desc"),
				limit(10)
			);

			const tempListings = [];
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// console.log(doc.id, " => ", doc.data());
				return tempListings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(tempListings);
			setLoading(false);
		} catch (error) {
			toast.error("Error fetching data");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchListings();
	}, []);

	return (
		<div>
			<header>
				<h3 className="pageHeader">Current Offers</h3>
			</header>
			{loading ? (
				<div className="loading">
					<LoadingSpinner />
				</div>
			) : listings && listings.length > 0 ? (
				<>
					<ul>
						{listings.map((listing) => {
							return <ListingCard listingData={listing.data} />;
						})}
					</ul>
				</>
			) : (
				<p className="centerAtViewPort text-2xl">
					There are no current offers. Please comeback later😉
				</p>
			)}
		</div>
	);
};

export default Offers;
