/* eslint-disable array-callback-return */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateListing = () => {
	const auth = getAuth();
	const navigate = useNavigate();

	const [type, setType] = useState("Sell");

	const [formData, setFormData] = useState({
		Name: "",
		Location: "",
		Bedroom: "",
		Bathroom: "",
		Parking: "",
		Furnished: "",
		Images: [],
		Price: "",
		Discount: "",
	});

	const fieldSets = [
		["Name", "text"],
		["Location", "text"],
		["Bedroom", "select", [1, 2, 3]],
		["Bathroom", "select", [1, 2, 3]],
		["Parking", "select", ["Yes", "No"]],
		[
			"Furnished",
			"select",
			["Fully-Furnished", "Partially-Furnished", "Not-Furnished"],
		],
		["Images", "file"],
		["Price", "text"],
		["Discount", "select", ["5%", "10%", "25%", "50%"]],
	];

	const formik = useFormik({
		initialValues: formData,
		// {
		// 	Name: "",
		// 	Location: "",
		// 	Bedroom: "",
		// 	Bathroom: "",
		// 	Parking: "",
		// 	Furnished: "",
		// 	Images: [],
		// 	Price: "",
		// 	Discount: "",
		// },
		onSubmit: (values) => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setFormData({ ...values, userRef: user.uid, type: type });
					alert(JSON.stringify(formData));
				} else {
					toast.error("Please Login first");
					navigate("/signIn");
				}
			});
		},
	});

	return (
		<>
			<div>
				<form
					className="m-4 w-2/5 mx-auto my-10 pb-36"
					onSubmit={formik.handleSubmit}>
					<div>
						<button
							type="button"
							className={`btn ${
								type === "Sell" ? "btn-info" : "btn-ghost"
							} m-4 px-8`}
							onClick={() => {
								setType("Sell");
							}}>
							Sell
						</button>
						<button
							type="button"
							className={`btn ${
								type === "Rent" ? "btn-info" : "btn-ghost"
							} m-4 px-8`}
							onClick={() => {
								setType("Rent");
							}}>
							Rent
						</button>
					</div>
					<div className="flex flex-col gap-4">
						{fieldSets.map((fieldSet, index) => {
							if (fieldSet[1] === "text") {
								return (
									<label key={index} className="input-group input-group-lg">
										<span className="bg-transparent rounded-none w-40">
											{fieldSet[0]}
										</span>
										<input
											name={fieldSet[0]}
											id={fieldSet[0]}
											type="text"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="input input-bordered w-full border-x-8"
										/>
									</label>
								);
							} else if (fieldSet[1] === "select") {
								return (
									<label key={index} className="input-group input-group-lg">
										<span className="bg-transparent rounded-none w-32">
											{fieldSet[0]}
										</span>
										<select
											name={fieldSet[0]}
											id={fieldSet[0]}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="select select-bordered border-x-8">
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
										<span className="bg-transparent rounded-none w-40">
											{fieldSet[0]}
										</span>
										<input type="file" multiple className="w-full rounded-md" />
									</label>
								);
							}
						})}
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
