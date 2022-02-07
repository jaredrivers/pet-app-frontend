import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case "AUTH":
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
			return { ...state, authData: action?.data };
		case "LOGOUT":
			localStorage.clear();
			toast.info("Logged out.", {
				pauseOnHover: false,
				autoClose: 3000,
				theme: "dark",
			});
			return { ...state, authData: null };
		case "ERROR":
			return { error: action.data };
		default:
			return state;
	}
};

export default authReducer;
