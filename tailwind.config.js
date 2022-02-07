module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			zIndex: {
				1000: "1000",
			},
			spacing: {
				fill: "-webkit-fill-available",
			},
			colors: {
				"off-white": "#E4DFD4",
				"theme-bd": "#646E79",
				"theme-bl": "#ACB4B8",
				"theme-dp": "#8B7C7E",
				"theme-lp": "#B2A3A2",
				"sea-foam": "#ABBAB3",
				"beige-light": "#E1C1A1",
				"beige-dark": "#D4A57C",
			},
			shadow: {
				custom1: "box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
			},
			screens: {
				xmd: { min: "950px", max: "1250px" },
			},
		},
	},
	plugins: [],
};
