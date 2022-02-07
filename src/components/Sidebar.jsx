import {
	XIcon,
	HomeIcon,
	BookmarkIcon,
	ArchiveIcon,
	UserCircleIcon,
	AdjustmentsIcon,
	TemplateIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchState } from "../actions/switchState";
import SidebarItem from "./SidebarItem";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
	const user = useSelector((state) => state.user.currentUser);
	const isAdmin = useSelector((state) => state.admin);

	useEffect(() => {
		dispatch({ type: "SIDEBAR_CLOSE" });
	}, [location]);

	const closeHandler = () => {
		dispatch({ type: "SIDEBAR_CLOSE" });
	};

	const myPetsHandler = () => {
		dispatch({ type: "LOADING_TRUE" });
		navigate("/mypets");
	};
	return (
		<div
			className={
				isSidebarOpen
					? "z-20 sidebar duration-300 ease-in-out bg-sea-foam fixed p-4 inset-y-0 left-0 w-full sm:w-[19rem] lg:w-[30vw] space-y-7 shadow-lg"
					: "sidebar duration-300 ease-in-out bg-sea-foam fixed p-4 inset-y-0 -left-full "
			}>
			<XIcon className='h-6 cursor-pointer ml-auto' onClick={closeHandler} />
			<SidebarItem title='Home' Icon={HomeIcon} onClick={() => navigate("/")} />
			<SidebarItem
				title='Pet Gallery'
				Icon={TemplateIcon}
				onClick={() => navigate("/gallery")}
			/>
			{user ? (
				<div className='space-y-8'>
					<SidebarItem
						title='My Pets'
						Icon={ArchiveIcon}
						onClick={() => navigate("/mypets")}
					/>
					<SidebarItem
						title='Profile'
						Icon={UserCircleIcon}
						onClick={() => navigate("/profile")}
					/>
					{isAdmin && (
						<div className='space-y-8'>
							<SidebarItem
								title='Dashboard'
								Icon={AdjustmentsIcon}
								onClick={() => navigate("/adminpage")}
							/>
						</div>
					)}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default Sidebar;
