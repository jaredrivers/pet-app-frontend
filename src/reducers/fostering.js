const fostering = (state = { fostering: null }, action) => {
	switch (action.type) {
		case "SET_FOSTERING":
			return { ...state, fostering: action.fostering };
		default:
			return state;
	}
};

export default fostering;
