const currentUser = (state = {}, action) => {
	switch (action.type) {
		case "SET_USER":
			return { currentUser: action.user };
		case "CLEAR_USER":
			return { currentUser: null };
		default:
			return state;
	}
};

export default currentUser;
