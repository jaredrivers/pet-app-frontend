const ownedPets = (state = { ownedPets: null }, action) => {
	switch (action.type) {
		case "SET_MY_PETS":
			return { ...state, ownedPets: action.ownedPets };
		default:
			return state;
	}
};

export default ownedPets;
