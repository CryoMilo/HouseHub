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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import ListingCard from "../components/ListingCard";

const Category = () => {
	const param = useParams();
	const { categoryName } = param;

	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchListings = async () => {
		try {
			const q = query(
				collection(db, "listings"),
				where("type", "==", categoryName),
				orderBy("timestamp", "desc"),
				limit(10)
			);

			const tempListings = [];
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());
				return tempListings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(tempListings);
			setLoading(false);
		} catch (error) {
			toast.error("Error fetching data");
		}
	};

	useEffect(() => {
		fetchListings();
	}, [categoryName]);

	return (
		<div className="mb-32">
			<header>
				<h3>
					{categoryName === "rent" ? "Places for Rent" : "Places for Sale"}
				</h3>
			</header>
			{loading ? (
				<LoadingSpinner />
			) : listings && listings.length > 0 ? (
				<>
					<ul>
						{listings.map((listing) => {
							return <ListingCard listingData={listing.data} />;
						})}
					</ul>
				</>
			) : (
				<p>No Listings for {categoryName}</p>
			)}
		</div>
	);
};

export default Category;
