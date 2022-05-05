/* eslint-disable array-callback-return */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const CreateListing = () => {
	const auth = getAuth();
	const navigate = useNavigate();

	const [type, setType] = useState("Sell");
	const [offerOn, setOfferOn] = useState(false);

	const [formData, setFormData] = useState({
		bathrooms: 0,
		bedrooms: 0,
		furnished: "",
		name: "",
		location: "",
		offer: false,
		parking: true,
		price: 0,
		type: "",
	});

	const fieldSets = [
		["name", "text"],
		["location", "text"],
		["bedroom", "number"],
		["bathroom", "number"],
		["parking", "select", ["Yes", "No"]],
		[
			"furnished",
			"select",
			["Fully-Furnished", "Partially-Furnished", "Not-Furnished"],
		],
		["images", "file"],
		["price", "number"],
		// ["Discount", "select", ["5%", "10%", "25%", "50%"]],
	];

	return (
		<>
			<div>
				<header>
					<h3 className="pageHeader">{type} Your Property</h3>
				</header>
				<div>{JSON.stringify(formData)}</div>
				<form className="m-2 w-2/5 mx-auto mb-10 pb-36">
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
						{fieldSets.map((fieldSet, index) => {
							if (fieldSet[1] === "text") {
								return (
									<label key={index} className="input-group input-group-lg">
										<span className="bg-secondary rounded-none w-40">
											{fieldSet[0]}
										</span>
										<input
											name={fieldSet[0]}
											id={fieldSet[0]}
											type="text"
											value={formik.values.fieldSet}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="input input-bordered w-full border-x-8 border-black bg-white"
										/>
									</label>
								);
							} else if (fieldSet[1] === "select") {
								return (
									<label key={index} className="input-group input-group-lg">
										<span className="bg-secondary rounded-none w-32">
											{fieldSet[0]}
										</span>
										<select
											name={fieldSet[0]}
											id={fieldSet[0]}
											onChange={(e) => {
												console.log(e.target.value);
											}}
											className="select select-bordered border-x-8 border-black bg-white">
											{fieldSet[2].map((fieldSelectOption, index) => {
												return (
													<option key={index} value={fieldSelectOption}>
														{fieldSelectOption}
													</option>
												);
											})}
										</select>
									</label>
								);
							} else if (fieldSet[1] === "file") {
								return (
									<label key={index} className="input-group input-group-lg">
										<span className="bg-secondary rounded-none w-40">
											{fieldSet[0]}
										</span>
										<input
											type="file"
											multiple
											className="w-full border-l-8 border-black rounded-md"
											accept=".jpeg,.png,.jpg"
										/>
									</label>
								);
							} else if (fieldSet[1] === "number") {
								return (
									<label key={index} className="input-group input-group-lg">
										<span className="bg-secondary rounded-none w-40">
											{fieldSet[0]}
										</span>
										<input
											type="number"
											className="input w-full input-bordered border-x-8 border-black bg-white"
										/>
									</label>
								);
							}
						})}
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-32">Offer</span>
							<div className="flex gap-5">
								<div class=" border-l-8 border-black">
									<label class="inline-flex items-center ml-6">
										<input
											type="radio"
											class="form-radio radio-md"
											name="accountType"
											onChange={(e) => {
												console.log(e.target.value);
											}}
										/>
										<span className="bg-transparent">Yes</span>
									</label>
									<label class="inline-flex items-center ml-6">
										<input
											type="radio"
											class="form-radio radio-md"
											name="accountType"
											onChange={(e) => {
												console.log(e.target.value);
											}}
										/>
										<span className="bg-transparent">No</span>
									</label>
								</div>
							</div>
						</label>
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
