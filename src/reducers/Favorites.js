const Favorites = (state = { favorites: null }, action) => {
	switch (action.type) {
		case "SET_FAVORITES":
			return { ...state, favorites: action.favorites };
		default:
			return state;
	}
};

export default Favorites;
