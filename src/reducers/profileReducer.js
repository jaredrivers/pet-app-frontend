const profileReducer = (state = { profileData: null }, action) => {
	switch (action.type) {
		case "PROFILE":
			return { ...state, profileData: action.data.user };
		default:
			return state;
	}
};

export default profileReducer;
