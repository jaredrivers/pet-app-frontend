import axios from "axios";

let API;

if (process.env.NODE_ENV !== "development") {
	API = axios.create({
		baseURL: process.env.SERVER_URL,
	});
} else {
	API = axios.create({
		baseURL: "http://localhost:8000",
	});
}

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export const signup = (formData) => API.post("/signup", formData);
export const signin = (formData) => API.post("/user/signin", formData);
export const createpet = (petData) => API.post("/pet", petData);
export const getallpets = () => API.get(`/pet/all`);
export const getAllUsers = () => API.get("/user/");
export const likePet = (id) => API.post(`/pet/${id}/save`);
export const getFavorites = (userId) => API.get(`/pet/user/${userId}`);
export const getMyProfile = (id) => API.get(`/user/profile/${id}`);
export const getPetById = (id) => API.get(`/pet/${id}`);
export const getUserById = (id) => API.get(`/user/${id}/full`);
export const adoptPet = (id) => API.post(`/pet/${id}/adopt`);
export const fosterPet = (id) => API.post(`/pet/${id}/foster`);
export const returnPet = (id) => API.post(`/pet/${id}/return`);
export const uploadPhoto = (fileData) => API.post(`/uploadphoto`, fileData);
export const updateProfile = (formData, id) => API.post(`user/${id}`, formData);
