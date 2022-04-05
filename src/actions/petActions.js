import * as api from "../api/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createPet = (petData) => async (dispatch) => {
	dispatch({ type: "LOADING_TRUE" });

	try {
		const { data } = await api.createpet(petData);

		dispatch({ type: "LOADING_FALSE" });

		toast.success(`${data.pet.name} successfully added.`, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	} catch (err) {
		toast.error(err.response.data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
		dispatch({ type: "LOADING_FALSE" });
	}
};

export const getallPets = () => async (dispatch) => {
	dispatch({ type: "LOADING_TRUE" });

	try {
		const res = await api.getallpets();

		let data = res.data.filter((pet) => pet.adoptionStatus !== "Adopted");

		dispatch({ type: "ALL_PETS", data });
		dispatch({ type: "LOADING_FALSE" });
	} catch (err) {
		toast.error(err.response.data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
		dispatch({ type: "LOADING_FALSE" });
	}
};

export const searchPets = (search, pets) => async (dispatch) => {
	let results = [];

	for (let [key, value] of Object.entries(search)) {
		for (let i = 0; i < pets.length; i++) {
			for (let [petKey, petValue] of Object.entries(pets[i])) {
				if (value != "" && petValue != "" && typeof petValue == "string") {
					if (value.toLowerCase() == petValue.toLowerCase()) {
						results.push(pets[i]);
					}
				}
			}
		}

		for (let i = 0; i < pets.length; i++) {
			if (pets[i][key] === value && value !== "") {
				results.push(pets[i]);
			}
		}
	}
	const uniqueResults = Array.from(new Set(results.map((a) => a._id))).map(
		(id) => {
			return results.find((a) => a._id === id);
		}
	);

	dispatch({ type: "SEARCH_PETS", uniqueResults });
};

export const getFavorites = (userId) => async (dispatch) => {
	const data = await api.getFavorites(userId);
	dispatch({ type: "SET_FAVORITES", favorites: data.data.favorites });
};

export const likePet = (petId) => async (dispatch) => {
	const data = await api.likePet(petId);
	dispatch({ type: "SET_FAVORITES", favorites: data.data });
};

export const fosterPet = (petId) => async (dispatch) => {
	try {
		const { data } = await api.fosterPet(petId);
		dispatch({ type: "SET_FOSTERING", fostering: data });
	} catch (err) {
		toast.error(err.response.data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	}
};

export const returnPet = (petId) => async (dispatch) => {
	try {
		const { data } = await api.returnPet(petId);
		console.log(data);
		dispatch({ type: "SET_FOSTERING", fostering: data.fostering });
		dispatch({ type: "SET_MY_PETS", ownedPets: data.ownedPets });
		toast.success(data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	} catch (err) {
		toast.error(err.response.data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	}
};

export const adoptPet = (petId) => async (dispatch) => {
	try {
		const { data } = await api.adoptPet(petId);
		dispatch({ type: "SET_MY_PETS", ownedPets: data });
		toast.success("Pet sucessfully adopted!", {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	} catch (err) {
		toast.error(err.response.data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	}
};
