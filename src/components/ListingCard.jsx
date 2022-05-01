import React from "react";
import "../styles/index.css";

const ListingCard = ({ listingData }) => {
	return (
		<>
			<div class="card w-4/5 my-0 mx-auto mt-8 lg:card-side bg-base-100 shadow-md rounded-sm">
				<figure className="lg:w-[500px] h-[200px]">
					<img
						src={listingData.imgURL[0]}
						className="object-fill"
						alt="realEstate"
					/>
				</figure>
				<div class="card-body bg-slate-200 p-6">
					<div className="flex justify-between">
						<h2 class="card-title">{listingData.name}</h2>
						<div>
							<h3
								className={`text-4xl ${listingData.offer && "strikethrough"}`}>
								Price - THB {listingData.regularPrice}
							</h3>
							{listingData.offer ? (
								<h3 className="text-4xl">
									Price - THB {listingData.discountedPrice}
								</h3>
							) : null}
						</div>
					</div>
					<p className="text-left">Location - {listingData.location}</p>
					<div class="card-actions justify-between">
						<div className="flex gap-4">
							<h3 className="text-4xl">🛌🏽 {listingData.bedrooms}</h3>
							<h3 className="text-4xl">🚽 {listingData.bathrooms}</h3>
							<h3 className="text-4xl">
								{listingData.furnished ? "💒Furnished" : ""}
							</h3>
						</div>
						<button class="btn btn-primary">Learn More</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ListingCard;
