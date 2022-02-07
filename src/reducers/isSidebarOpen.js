const isSidebarOpen = (state = false, action) => {
	switch (action.type) {
		case "SIDEBAR_OPEN":
			return (state = true);
		case "SIDEBAR_CLOSE":
			return (state = false);
		default:
			return state;
	}
};

export default isSidebarOpen;
