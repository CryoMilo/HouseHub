/* eslint-disable default-case */
/* eslint-disable array-callback-return */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

// import { toast } from "react-toastify";

const CreateListing = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const storage = getStorage();
	const isMounted = useRef(true);

	const [type, setType] = useState("Sell");
	const [offerOn, setOfferOn] = useState(false);

	const [formData, setFormData] = useState({
		bathroom: 0,
		bedroom: 0,
		furnished: "",
		name: "",
		location: "",
		latitude: "",
		longitude: "",
		offer: false,
		parking: true,
		imageURL: [],
		regularPrice: 0,
		discountedPrice: 0,
		type: "Sell",
	});

	useEffect(() => {
		// Attach Current UserId to the form
		if (isMounted) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setFormData({ ...formData, userRef: user.uid });
				} else {
					navigate("/signIn");
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	const uploadImages = async (image) => {
		const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
		if (formData.imageURL.length === 0) return;
		const storageRef = ref(storage, `propertyImages/${fileName}`);

		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						toast.error("Please Login First");
						break;
					case "storage/canceled":
						toast.error("Upload Cancelled");
						break;
					case "storage/unknown":
						toast.error("Path Error");
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log(downloadURL);
				});
			}
		);
	};

	const handleChange = (e) => {
		if (e.target.name === "image") {
			setFormData((prevState) => ({
				...prevState,
				imageURL: e.target.files,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.imageURL.length > 6) {
			toast.error("Max 6 Images");
		}
		setFormData({
			...formData,
			latitude: faker.address.latitude(90, -90, 4),
			longitude: faker.address.longitude(90, -90, 4),
		});
		uploadImages(formData.imageURL);
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
							<span className="bg-secondary rounded-none w-[200px]">Name</span>
							<input
								type="text"
								name="name"
								id="name"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[200px]">
								Location
							</span>
							<input
								name="location"
								id="location"
								type="text"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[200px]">
								Bedroom
							</span>
							<input
								type="number"
								name="bedroom"
								id="bedroom"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[200px]">
								Bathroom
							</span>
							<input
								type="number"
								name="bathroom"
								id="bathroom"
								onChange={handleChange}
								className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
							/>
						</label>
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[200px]">
								Furnished
							</span>
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
						{/* PARKING */}
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[150px]">
								Parking
							</span>
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
						{/* PRICE */}
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[200px]">Price</span>
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
							<span className="bg-secondary rounded-none w-[200px]">Image</span>
							<input
								type="file"
								name="image"
								id="image"
								onChange={handleChange}
								multiple
								className="w-full border-l-8 border-black rounded-md"
								accept=".jpeg,.png,.jpg"
							/>
						</label>
						{/* OFFER */}
						<label className="input-group input-group-lg">
							<span className="bg-secondary rounded-none w-[150px]">Offer</span>
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
						{/* DISCOUNT */}
						{offerOn ? (
							<div>
								<label className="input-group input-group-lg">
									<span className="bg-secondary rounded-none w-[200px]">
										Discount
									</span>
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
								<label className="input-group input-group-lg mt-4">
									<span className="bg-secondary rounded-none w-[200px]">
										Discounted
									</span>
									<div className="w-full text-left">
										<input
											type="number"
											name="discountedPrice"
											id="discountedPrice"
											onChange={handleChange}
											value={formData.discountedPrice}
											className="input input-bordered input-box-radius border-x-8 border-black bg-white"
										/>
										<span className="inline pl-2 bg-transparent">
											{type === "Rent" ? "THB/month" : "THB"}
										</span>
									</div>
								</label>
							</div>
						) : null}
					</div>
					{/* BUTTONS */}
					<button type="submit" className="mt-8 text-4xl mr-4">
						POST
					</button>
					<button
						type="button"
						className="mt-8 text-4xl ml-4"
						onClick={() => {
							navigate("/profile");
						}}>
						CANCEL
					</button>
				</form>
			</div>
		</>
	);
};

export default CreateListing;
