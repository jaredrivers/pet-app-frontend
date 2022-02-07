const petReducer = (state = { petData: null }, action) => {
	switch (action.type) {
		case "CREATE_PET":
			return { ...state, petData: action?.data };
		case "ALL_PETS":
			return { ...state, petData: action?.data };
		default:
			return state;
	}
};

export default petReducer;
