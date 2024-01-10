import * as api from "../api/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

//Action creators
export const signUp = (formData, navigate) => async (dispatch) => {
	dispatch({ type: "LOADING_TRUE" });

	try {
		const { data } = await api.signup(formData);

		dispatch({ type: "AUTH", data });

		dispatch({ type: "MODAL_CLOSE" });

		dispatch({ type: "LOADING_FALSE" });
		navigate("/");
		toast.success("Account sucessfully created!", {
			theme: "colored",
			autoClose: 3000,
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

export const signIn = (formData, navigate) => async (dispatch) => {
	dispatch({ type: "LOADING_TRUE" });
	try {
		const { data } = await api.signin(formData);
		dispatch({ type: "AUTH", data });

		dispatch({ type: "LOADING_FALSE" });
		dispatch({ type: "MODAL_CLOSE" });
		toast.success("Login success!", {
			theme: "colored",
			autoClose: 3000,
		});
		navigate("/");
	} catch (err) {
		toast.error(err.response.data.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
		dispatch({ type: "LOADING_FALSE" });
	}
};

export const setUser = () => async (dispatch) => {
	const user = JSON.parse(localStorage.getItem("profile")).user;
	try {
		dispatch({ type: "SET_USER", user });
	} catch (err) {
		toast.error(err.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	}
};

export const clearUser = () => async (dispatch) => {
	dispatch({ type: "CLEAR_USER" });
};

export const loadProfile = (userId) => async (dispatch) => {
	dispatch({ type: "LOADING_TRUE" });
	try {
		const { data } = await api.getUserById(userId);

		dispatch({ type: "SET_FAVORITES", favorites: data.user.favorites });
		dispatch({ type: "SET_MY_PETS", ownedPets: data.user.pets });
		dispatch({ type: "SET_FOSTERING", fostering: data.user.fostering });

		dispatch({ type: "PROFILE", data });
		dispatch({ type: "LOADING_FALSE" });
	} catch (err) {
		toast.error(err.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
		dispatch({ type: "LOADING_FALSE" });
	}
};

export const uploadPhotoHandler = (fileData) => async (dispatch) => {
	try {
		const { data } = await api.uploadPhoto(JSON.stringify(fileData));
		return data;
	} catch (err) {
		toast.error(err.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	}
};

// export const updateProfile = (formData, id) => async (dispatchj) => {
// 	try {
// 		const { data } = await api.updateProfile(formData, id);
// 		toast.success("Account sucessfully created!", {
// 			theme: "colored",
// 			autoClose: 3000,
// 		});
// 	} catch (err) {
// 		toast.error(err.message, {
// 			pauseOnHover: false,
// 			autoClose: 3000,
// 			theme: "colored",
// 		});
// 	}
// };
