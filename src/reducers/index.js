import { combineReducers } from "redux";
import isModalOpen from "./isModalOpen";
import isSidebarOpen from "./isSidebarOpen";
import authReducer from "./authReducer";
import logInClick from "./logInClick";
import isLoading from "./isLoading";
import petReducer from "./petReducer";
import isAdmin from "./isAdmin";
import currentUser from "./currentUser";
import searchReducer from "./searchReducer";
import Favorites from "./Favorites";
import profileReducer from "./profileReducer";
import ownedPets from "./ownedPets";
import fostering from "./fostering";

const reducers = combineReducers({
	fostering,
	ownedPets,
	profileData: profileReducer,
	favorites: Favorites,
	search: searchReducer,
	login: logInClick,
	modal: isModalOpen,
	isSidebarOpen,
	auth: authReducer,
	loading: isLoading,
	pet: petReducer,
	admin: isAdmin,
	user: currentUser,
});

export default reducers;
