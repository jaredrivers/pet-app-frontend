import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const uploadFunction = async (file) => {
	const url = process.env.REACT_APP_CLOUDINARY_URL;
	const preset = process.env.REACT_APP_UPLOAD_PRESET;

	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", preset);

	try {
		const res = await axios.post(url, formData);
		return res.data.url;
	} catch (err) {
		console.log(err.response.data.error.message);
		toast.error(err.response.data.error.message, {
			pauseOnHover: false,
			autoClose: 3000,
			theme: "colored",
		});
	}
};

export default uploadFunction;
