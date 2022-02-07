const logInClick = (state = false, action) => {
	switch (action.type) {
		case "SWITCH_STATE_LOGIN":
			return !state;
		default:
			return state;
	}
};

export default logInClick;
