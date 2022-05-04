import React, { useRef } from "react";

const CreateListing = () => {
	// const fieldSets = {
	// 	Name: "text",
	// 	Location: "text",
	// 	Bedroom: "select",
	// 	Bathroom: "select",
	// 	Parking: "select",
	// 	Furnished: "select",
	// 	Price: "number",
	// 	Discount: "select",
	// };

	const fieldSets = [
		["Name", "text"],
		["Location", "text"],
		["Bedroom", "select", [1, 2, 3]],
		["Bathroom", "select", [1, 2, 3]],
		["Parking", "select", ["Yes", "No"]],
		[
			"Furnished",
			"select",
			["Fully-Furnished", "Partially=Furnished", "Not-Furnished"],
		],
		["Price", "text"],
		["Discount", "select", ["5%", "10%", "25%", "50%"]],
	];

	// let fieldLabels = [];
	// let fieldTypes = [];
	// for (const [key, value] of Object.entries(fieldSets)) {
	// 	fieldLabels.push(key);
	// 	fieldTypes.push(value);
	// }

	return (
		<>
			<div>
				<form className="m-4 w-2/5 mx-auto my-10">
					{/* <div className="flex flex-col gap-4">
						{fieldSets.map((fieldSet) => {
							return <label>{fieldSet[0]}</label>;
						})}
					</div> */}
					<div className="flex flex-col gap-4">
						{fieldSets.map((fieldSet) => {
							if (fieldSet[1] === "text") {
								return (
									<label className="input-group input-group-lg">
										<span className="bg-transparent rounded-none w-40">
											{fieldSet[0]}
										</span>
										<input
											type="text"
											className="input input-bordered w-full"
										/>
									</label>
								);
							} else if (fieldSet[1] === "select") {
								return (
									<label className="input-group input-group-lg">
										<span className="bg-transparent rounded-none w-32">
											{fieldSet[0]}
										</span>
										<select name="" id="" className="select select-bordered">
											{fieldSet[2].map((fieldSelectOption) => {
												return (
													<option value={fieldSelectOption}>
														{fieldSelectOption}
													</option>
												);
											})}
										</select>
									</label>
								);
							}
						})}
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateListing;
