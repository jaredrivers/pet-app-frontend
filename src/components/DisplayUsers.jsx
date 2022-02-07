import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import * as api from "../api";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import GalleryItem from "./GalleryItem";
import { XIcon } from "@heroicons/react/outline";

function DisplayUsers() {
	const [userList, setUserList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [allPets, setAllPets] = useState([]);
	const [openPet, setOpenPet] = useState();

	const override = css`
		display: block;
		margin: 0 auto;
	`;

	useEffect(() => {
		setLoading(true);
		let getUsers = async () => {
			try {
				const res = await api.getAllUsers();
				setUserList(res.data);
			} catch (err) {
				console.log(err);
			}
			setLoading(false);
		};
		getUsers();
	}, []);

	useEffect(() => {
		setLoading(true);
		const load = async () => {
			const res = await api.getallpets();
			setAllPets(res.data);
			setLoading(false);
		};
		load();
	}, []);

	const openHandler = async (e) => {
		setOpenPet(allPets.find(({ _id }) => _id === e.currentTarget.id));
	};
	const closeHandler = () => {
		setOpenPet();
	};

	return loading ? (
		<div className=' flex w-full h-full justify-center items-center'>
			<HashLoader loading={loading} css={override} size={100} color='#5a7bb0' />
		</div>
	) : (
		<div className='display-user-page flex h-full sm:items-center px-7 overflow-x-scroll w-full justify-center sm:justify-start'>
			{openPet ? (
				<div
					id={openPet._id}
					className='w-full h-full justify-center items-center mt-[10rem]'>
					<GalleryItem
						name={openPet.name}
						type={openPet.type}
						bio={openPet.bio}
						color={openPet.color}
						tags={openPet.tags}
						breed={openPet.breed}
						hypoallergnic={openPet.hypoallergnic}
						adoptionStatus={openPet.adoptionStatus}
						id={openPet._id}
						height={openPet.height}
						weight={openPet.weight}
						picture={openPet.picture}
						Icon={XIcon}
						closeHandler={closeHandler}
					/>
				</div>
			) : (
				<ul className='flex flex-col sm:flex-row sm:space-x-7 items-center sm:justify-center mt-2'>
					{userList &&
						userList.map((user) => (
							<li id={user.id}>
								<UserCard
									firstName={user.firstName}
									lastName={user.lastName}
									id={user._id}
									phoneNumber={user.phoneNumber}
									pets={user.pets}
									favorites={user.favorites}
									email={user.email}
									openHandler={openHandler}
								/>
							</li>
						))}
				</ul>
			)}
		</div>
	);
}

export default DisplayUsers;
