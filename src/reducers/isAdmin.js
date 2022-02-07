const isAdmin = (state = false, action) => {
	switch (action.type) {
		case "ADMIN_TRUE":
			return (state = true);
		case "ADMIN_FALSE":
			return (state = false);
		default:
			return state;
	}
};

export default isAdmin;
