import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreateListings = () => {
	const navigate = useNavigate();
	const auth = getAuth();
	const [offerOn, setOfferOn] = useState(false);
	const [purchaseType, setPurchaseType] = useState("sell");

	const [formData, setFormData] = useState({
		type: "rent",
		name: "",
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: "fully-funished",
		location: "",
		geolocation: {
			lat: "",
			lng: "",
		},
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		imgURL: [],
		images: {},
	});

	const {
		// type,
		// name,
		// bedrooms,
		// bathrooms,
		// parking,
		// furnished,
		// location,
		// offer,
		// regularPrice,
		// discountedPrice,
		images,
		// geolocation,
	} = formData;

	const onMutate = (e) => {
		e.preventDefault();

		let boolean = null;

		if (e.target.value === "true") {
			boolean = true;
		}
		if (e.target.value === "false") {
			boolean = false;
		}

		// Files
		if (e.target.files) {
			setFormData((prev) => ({
				...prev,
				images: e.target.files,
			}));
		}

		// Text/Number/Boolean
		if (!e.target.files) {
			setFormData((prev) => ({
				...prev,
				[e.target.id]: boolean ?? e.target.value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormData({
			...formData,
			lat: faker.address.latitude(90, -90, 4),
			lng: faker.address.longitude(90, -90, 4),
		});

		// Store Images in firebase
		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const fileName = `${auth.currentUser.uid} - ${image.name}-${uuidv4()}`;
				const storageRef = ref(storage, "images/" + fileName);

				const uploadTask = uploadBytesResumable(storageRef, image);
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log("Upload is " + progress + "% done");
						// eslint-disable-next-line default-case
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
						toast.error("Upload Failed with error" + error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};

		const imgURL = await Promise.all(
			[...images].map((image) => storeImage(image))
		).catch(() => {
			toast.error("Images are not uploaded");
			return;
		});

		const formDataCopy = {
			...formData,
			imgURL: imgURL,
			timestamp: serverTimestamp(),
		};

		delete formDataCopy.images;

		const docRef = await addDoc(collection(db, "listings"), formDataCopy);
		toast.success("Listings saved");
		navigate(`/category/${formDataCopy.type}/`);
	};

	return (
		<main>
			<header>
				<h3 className="pageHeader">
					{purchaseType.toLocaleUpperCase()} Your Property
				</h3>
			</header>
			<div>{JSON.stringify(formData)}</div>
			<form className="m-2 w-2/5 mx-auto mb-10 pb-36" onSubmit={handleSubmit}>
				<div>
					<button
						type="button"
						className={`btn ${
							purchaseType === "sell" ? "btn-info" : "btn-ghost"
						} mx-2 my-4 px-8`}
						onClick={() => {
							setPurchaseType("sell");
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
							purchaseType === "rent" ? "btn-info" : "btn-ghost"
						} mx-2 my-4 px-8`}
						onChange={onMutate}
						onClick={() => {
							setPurchaseType("rent");
							setFormData({
								...formData,
								type: "rent",
							});
						}}>
						Rent
					</button>
				</div>
				<div className="flex flex-col gap-4">
					{/* Name */}
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[200px]">Name</span>
						<input
							type="text"
							name="name"
							id="name"
							onChange={onMutate}
							className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
						/>
					</label>
					{/* Address */}
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[200px]">
							Location
						</span>
						<input
							name="location"
							id="location"
							type="text"
							onChange={onMutate}
							className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
						/>
					</label>
					{/* Bedroom */}
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[200px]">Bedroom</span>
						<input
							type="number"
							name="bedrooms"
							id="bedrooms"
							onChange={onMutate}
							className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
						/>
					</label>
					{/* Bathroom */}
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[200px]">
							Bathroom
						</span>
						<input
							type="number"
							name="bathrooms"
							id="bathrooms"
							onChange={onMutate}
							className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white"
						/>
					</label>
					{/* Furnished */}
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[200px]">
							Furnished
						</span>
						<select
							name="furnished"
							id="furnished"
							onChange={onMutate}
							className="input input-bordered input-box-radius w-full border-x-8 border-black bg-white">
							<option value="Fully-Furnished">Fully-Furnished</option>
							<option value="Partially-Furnished">Partially-Furnished</option>
							<option value="Not-Furnished">Not-Furnished</option>
						</select>
					</label>
					{/* PARKING */}
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[150px]">Parking</span>
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
								onChange={onMutate}
								className="input input-bordered input-box-radius border-x-8 border-black bg-white"
							/>
							<span className="inline pl-2 bg-transparent">
								{purchaseType === "rent" ? "THB/month" : "THB"}
							</span>
						</div>
					</label>
					<label className="input-group input-group-lg">
						<span className="bg-secondary rounded-none w-[200px]">Image</span>
						<input
							type="file"
							name="image"
							id="image"
							onChange={onMutate}
							multiple
							className="w-full border-l-8 border-black rounded-md"
							accept=".jpeg,.png,.jpg"
						/>
					</label>
					{/* <div className="preview flex w-2/4">
						{imgUploaded &&
							formData.imageURL.map((perviewImg) => {
								<img className="w-[100px]" src={perviewImg} alt="previewImg" />;
							})}
					</div> */}
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
										onChange={onMutate}
										value={formData.discountedPrice}
										className="input input-bordered input-box-radius border-x-8 border-black bg-white"
									/>
									<span className="inline pl-2 bg-transparent">
										{purchaseType === "rent" ? "THB/month" : "THB"}
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
		</main>
	);
};

export default CreateListings;
