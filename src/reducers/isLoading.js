const isLoading = (state = false, action) => {
	switch (action.type) {
		case "LOADING_TRUE":
			return (state = true);

		case "LOADING_FALSE":
			return (state = false);
		default:
			return state;
	}
};

export default isLoading;
