module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				bounce: {
					"0%,100%": { transform: "translateX(-25%)" },
					"50%": { transform: "translateX(0px)" },
				},
			},
		},
		fontSize: {
			xs: ".75rem",
			sm: ".875rem",
			tiny: ".875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1rem",
			"2xl": "1.05rem",
			"3xl": "1rem",
			"4xl": "1.5rem",
			"5xl": "3rem",
			"6xl": "4rem",
			"7xl": "5rem",
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#1f2937",

					secondary: "#f291e0",

					accent: "#c66d4f",

					neutral: "#272830",

					"base-100": "#e7e5e4",

					info: "#24A5EB",

					success: "#5EE8D1",

					warning: "#F0C32D",

					error: "#F4155F",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
