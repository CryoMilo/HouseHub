import "../styles/loadingSpinner.css";

import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="lds-roller text-red-500">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default LoadingSpinner;
