import { MenuIcon, PlusCircleIcon, UserIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { switchState } from "../actions/switchState";
import NavbarItem from "./NavbarItem";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser, clearUser } from "../actions/auth";
import { useEffect } from "react";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const location = useLocation();
	const login = useSelector((state) => state.login);

	useEffect(() => {
		if (localStorage.getItem("profile")) {
			dispatch(setUser());
		} else {
			dispatch(clearUser());
		}
	}, [location]);

	//checks if user is admin and changes state to admin
	useEffect(() => {
		if (currentUser) {
			if (currentUser.role == "admin") {
				dispatch({ type: "ADMIN_TRUE" });
			}
		} else {
			dispatch({ type: "ADMIN_FALSE" });
		}
	}, [currentUser]);

	const sidebarHandler = () => {
		dispatch({ type: "SIDEBAR_OPEN" });
	};

	const modalHandler = (e) => {
		if (e.target.id === "login" && login !== true) {
			dispatch(switchState("LOGIN"));
		} else if (e.target.id === "signup" && login !== false) {
			dispatch(switchState("LOGIN"));
		}
		dispatch(switchState("MODAL"));
	};

	const signOutHandler = () => {
		if (login == true) {
			dispatch(switchState("LOGIN"));
		}
		dispatch({ type: "LOGOUT" });
		dispatch(clearUser());
		navigate("/");
	};

	return (
		<div
			name='navbar'
			className='flex absolute top-0 shadow-md h-[3rem] bg-none w-screen px-5 items-center space-x-6 z-10'>
			<NavbarItem Icon={MenuIcon} onClick={sidebarHandler} />

			{currentUser ? (
				<div className='loggedInDiv flex items-center grow'>
					<p className='text-lg'>{`Hello, ${currentUser.firstName}`}</p>
					<div
						onClick={signOutHandler}
						id='signout'
						className='signout text-lg cursor-pointer hover:text-theme-bd ml-auto'>
						Sign Out
					</div>
				</div>
			) : (
				<div className='flex space-x-7'>
					<span
						onClick={modalHandler}
						id='login'
						className='login ml-auto text-lg cursor-pointer hover:text-theme-bd'>
						Login
					</span>
					<span
						onClick={modalHandler}
						id='signup'
						className='signup ml-auto text-lg cursor-pointer hover:text-theme-bd'>
						Sign Up
					</span>
				</div>
			)}
		</div>
	);
}

export default Navbar;
