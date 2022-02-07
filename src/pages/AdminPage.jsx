import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useState } from "react";
import CreatePetForm from "../components/CreatePetForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DisplayUsers from "../components/DisplayUsers";
import EditPetForm from "../components/EditPetForm";

function AdminPage() {
	const [selectForm, setSelectForm] = useState();
	const sidebar = useSelector((state) => state.isSidebarOpen);
	const navigate = useNavigate();

	const clickHandler = (e) => {
		if (e.target.name === "add") {
			setSelectForm(<CreatePetForm />);
		} else if (e.target.name === "edit") {
			setSelectForm(<EditPetForm />);
		} else if (e.target.name === "users") {
			setSelectForm(<DisplayUsers />);
		}
	};

	return (
		<div className='flex admin-page pt-[3rem] bg-[url(./imgs/home1.jpg)] bg-cover w-full h-full content-center items-start overflow-y-auto'>
			{selectForm && (
				<div>
					{!sidebar && (
						<button
							onClick={() => setSelectForm()}
							className='flex items-center absolute left-3 sm:left-10 top-20 rounded-lg bg-indigo-200 p-2 hover:bg-amber-500'>
							<ChevronLeftIcon className='w-8' />
						</button>
					)}
				</div>
			)}
			{selectForm ? (
				selectForm
			) : (
				<div className='w-full flex items-center justify-center space-x-7 m-auto'>
					<button
						className='p-3 hover:bg-theme-bl rounded-lg text-[2rem] h-[6rem] bg-theme-lp cursor-pointer'
						onClick={clickHandler}
						name='add'>
						Add Pet
					</button>
					<button
						className='p-3 hover:bg-theme-bl rounded-lg text-[2rem] h-[6rem] bg-theme-lp cursor-pointer'
						onClick={clickHandler}
						name='edit'>
						Edit Pet
					</button>
					<button
						className='p-3 hover:bg-theme-bl rounded-lg text-[2rem] h-[6rem] bg-theme-lp cursor-pointer'
						onClick={clickHandler}
						name='users'>
						Show Users
					</button>
				</div>
			)}
		</div>
	);
}

export default AdminPage;
