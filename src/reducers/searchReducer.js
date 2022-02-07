const searchReducer = (state = { petData: null }, action) => {
	switch (action.type) {
		case "SEARCH_PETS":
			return { petData: action.uniqueResults };
		case "RESET_RESULTS":
			return { petData: action.results };
		default:
			return state;
	}
};

export default searchReducer;
