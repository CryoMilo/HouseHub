/* eslint-disable array-callback-return */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const CreateListing = () => {
	const auth = getAuth();
	const navigate = useNavigate();

	const [type, setType] = useState("Sell");
	const [offerOn, setOfferOn] = useState(false);

	const [formData, setFormData] = useState({
		bathroom: 0,
		bedroom: 0,
		furnished: "",
		name: "",
		location: "",
		offer: false,
		parking: true,
		regularPrice: 0,
		discountedPrice: 0,
		type: "Sell",
	});

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<>
			<div>
				<header>
					<h3 className="pageHeader">{type} Your Property</h3>
				</header>
				<div>{JSON.stringify(formData)}</div>
				<form className="m-2 w-2/5 mx-auto mb-10 pb-36" onSubmit={handleSubmit}>
					<div>
						<button
							type="button"
							className={`btn ${
								type === "Sell" ? "btn-info" : "btn-ghost"
							} mx-2 my-4 px-8`}
							onClick={() => {
								setType("Sell");
								setFormData({
									...formData,
									type: "sell",
								});
							}}>
							Sell
						</button>
						<button
							type="button"
							className={`btn ${
								type === "Rent" ? "btn-info" : "btn-ghost"
							} mx-2 my-4 px-8`}
							onClick={() => {
								setType("Rent");
								setFormData({
									...formData,
									type: "rent",
								});
							}}>
							Rent
						</button>
					</div>
					<div className="flex flex-col gap-4">
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-40">Name</span>
							<input
								type="text"
								name="name"
								id="name"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-40">Location</span>
							<input
								name="location"
								id="location"
								type="text"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-40">Bedroom</span>
							<input
								type="number"
								name="bedroom"
								id="bedroom"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-40">Bathroom</span>
							<input
								type="number"
								name="bathroom"
								id="bathroom"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-40">Furnished</span>
							<select
								name="furnished"
								id="furnished"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white">
								<option value="Fully-Furnished">Fully-Furnished</option>
								<option value="Partially-Furnished">Partially-Furnished</option>
								<option value="Not-Furnished">Not-Furnished</option>
							</select>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-32">Parking</span>
							<div className="flex gap-5">
								<div className=" border-l-8 border-black">
									<label className="inline-flex items-center ml-6">
										<input
											type="radio"
											className="form-radio radio-md"
											name="parking"
											id="parking"
											onChange={() => {
												setFormData({
													...formData,
													parking: true,
												});
											}}
										/>
										<span className="bg-transparent">Yes</span>
									</label>
									<label className="inline-flex items-center ml-6">
										<input
											type="radio"
											className="form-radio radio-md"
											name="parking"
											id="parking"
											onChange={() => {
												setFormData({
													...formData,
													parking: false,
												});
											}}
										/>
										<span className="bg-transparent">No</span>
									</label>
								</div>
							</div>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-40">Price</span>
							<div className="w-full text-left">
								<input
									type="number"
									name="regularPrice"
									id="regularPrice"
									onChange={handleChange}
									className="input input-bordered input-box-radius border-x-8 border-black bg-white"
								/>
								<span className="inline pl-2 bg-transparent">
									{type === "Rent" ? "THB/month" : "THB"}
								</span>
							</div>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-32">Offer</span>
							<div className="flex gap-5">
								<div className=" border-l-8 border-black">
									<label className="inline-flex items-center ml-6">
										<input
											type="radio"
											className="form-radio radio-md"
											name="offer"
											onChange={() => {
												setOfferOn(true);
												setFormData({
													...formData,
													offer: true,
												});
											}}
										/>
										<span className="bg-transparent">Yes</span>
									</label>
									<label className="inline-flex items-center ml-6">
										<input
											type="radio"
											className="form-radio radio-md"
											name="offer"
											onChange={() => {
												setOfferOn(false);
												setFormData({
													...formData,
													offer: false,
												});
											}}
										/>
										<span className="bg-transparent">No</span>
									</label>
								</div>
							</div>
						</label>
						{offerOn ? (
							<label className="input-group input-group-lg">
								<span className="bg-secondary rounded-none w-40">Discount</span>
								<div className="w-full text-left">
									<input
										type="number"
										name="discount"
										id="discount"
										onChange={(e) => {
											setFormData({
												...formData,
												discountedPrice:
													formData.regularPrice -
													formData.regularPrice * (e.target.value / 100),
											});
										}}
										className="input input-bordered input-box-radius border-x-8 border-black bg-white"
									/>
									<span className="inline pl-2 bg-transparent">%</span>
								</div>
							</label>
						) : null}
					</div>
					<button type="submit" className="mt-8 text-4xl">
						Post
					</button>
				</form>
			</div>
		</>
	);
};

export default CreateListing;
