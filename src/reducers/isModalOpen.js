const isModalOpen = (state = false, action) => {
	switch (action.type) {
		case "MODAL_OPEN":
			return (state = true);
		case "MODAL_CLOSE":
			return (state = false);
		case "SWITCH_STATE_MODAL":
			return !state;
		default:
			return state;
	}
};

export default isModalOpen;
