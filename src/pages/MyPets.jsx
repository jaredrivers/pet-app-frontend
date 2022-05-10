import { useState, useEffect } from "react";
import GalleryItem from "../components/GalleryItem";
import * as api from "../api/index";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { XIcon } from "@heroicons/react/outline";
import { loadProfile } from "../actions/auth";
import { getallPets, getFavorites } from "../actions/petActions";

function MyPets() {
	const dispatch = useDispatch();

	const [adoptedPets, setAdoptedPets] = useState([]);
	const [favoritedPets, setFavoritedPets] = useState([]);
	const [fosteredPets, setFosteredPets] = useState([]);
	const [openPet, setOpenPet] = useState();
	const [unlike, setUnlike] = useState(false);
	const loading = useSelector((state) => state.loading);

	const user = useSelector((state) => state.user);
	const favorites = useSelector((state) => state.favorites);
	const fostering = useSelector((state) => state.fostering);
	const ownedPets = useSelector((state) => state.ownedPets);
	const petData = useSelector((state) => state.pet);

	useEffect(() => {
		if (user && Object.keys(user).length !== 0) {
			dispatch(loadProfile(user.currentUser.id));
		}
		if (petData && petData.petData == null) {
			dispatch(getallPets());
		}
	}, [user]);

	const startFunction = () => {
		const list = [favorites, fostering, ownedPets];

		for (let i = 0; i < list.length; i++) {
			let listName = Object.keys(list[i])[0];
			if (list[i] && list[i][listName] !== null) {
				let items = list[i][listName];
				let pets = petData.petData;
				let petList = [];

				let petsToDisplay = () => {
					for (let item of items) {
						pets.map((pet) => pet._id == item && petList.push(pet));
					}
				};
				petsToDisplay();

				if (i === 0) {
					setFavoritedPets(petList);
				} else if (i === 1) {
					setFosteredPets(petList);
				} else if (i === 2) {
					setAdoptedPets(petList);
				}
			}
		}
	};

	useEffect(() => {
		petData && petData.petData !== null && startFunction();
	}, [petData]);

	const openHandler = async (e) => {
		const petId = e.currentTarget.id;
		const { data } = await api.getPetById(petId);
		setOpenPet(data[0]);
	};

	const closeHandler = () => {
		dispatch(getallPets());
		dispatch(loadProfile(user.currentUser.id));
		setOpenPet();
	};

	const override = css`
		display: block;
		margin: 0 auto;
	`;

	return loading == true ? (
		<div className=' flex w-full h-full justify-center items-center bg-[url(./imgs/home1.jpg)] bg-cover'>
			<HashLoader loading={loading} css={override} size={100} color='#5a7bb0' />
		</div>
	) : (
		<div className='bg-[url(./imgs/profile1.jpg)] bg-cover h-full w-full'>
			<div className='flex w-full h-full pt-[3rem] items-center justify-center '>
				{openPet ? (
					<div className='h-[80%] justify items-center'>
						<GalleryItem
							id={openPet._id}
							name={openPet.name}
							breed={openPet.breed}
							bio={openPet.bio}
							height={openPet.height}
							weight={openPet.weight}
							type={openPet.type}
							color={openPet.color}
							picture={openPet.picture}
							tags={openPet.tags}
							adoptionStatus={openPet.adoptionStatus}
							hypoallergenic={openPet.hypoallergenic}
							onClick={closeHandler}
							Icon={XIcon}
							setUnlike={setUnlike}
							url={openPet.url}
						/>
					</div>
				) : (
					<div className='dashboard-wrapper flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-center content-center rounded bg-theme-lp/80 w-[95%] h-5/6 p-3 shdaow-md sm:space-x-4'>
						<div className='flex content-center justify-center overflow-y-scroll'>
							{favoritedPets && (
								<div className='favorites flex flex-col items-center sm:pt-10 m-1'>
									<h1 className='flex text-[1.2rem] justify-center bg-slate-400 rounded-t-md w-full p-2'>
										Favorites:
									</h1>
									<div className='bg-beige-light w-full p-2 rounded-b-sm'>
										{favoritedPets.length == 0 ? (
											<p>No favorites</p>
										) : (
											<ul className='space-y-2'>
												{favoritedPets.map((pet) => (
													<li
														id={pet._id}
														key={pet._id}
														onClick={openHandler}
														className='cursor-pointer text-white hover:text-amber-400 bg-theme-bd rounded-md shadow-sm p-2 text-center'>
														{pet.name}
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							)}
						</div>
						<div className='flex content-center justify-center overflow-y-scroll'>
							{fosteredPets && (
								<div className='favorites flex flex-col items-center sm:pt-10 m-1'>
									<h1 className='flex text-[1.2rem] justify-center bg-slate-400 rounded-t-md w-full p-2'>
										Fostered Pets:
									</h1>
									<div className='bg-beige-light w-full p-2 rounded-b-sm'>
										{fosteredPets.length == 0 ? (
											<p>No fosters...</p>
										) : (
											<ul className='space-y-2'>
												{fosteredPets.map((pet) => (
													<li
														id={pet._id}
														key={pet._id}
														onClick={openHandler}
														className='cursor-pointer text-white hover:text-amber-400 bg-theme-bd rounded-md shadow-sm p-2 text-center'>
														{pet.name}
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							)}
						</div>
						<div className='flex content-center justify-center overflow-y-scroll'>
							{adoptedPets && (
								<div className='favorites flex flex-col items-center sm:pt-10 m-1'>
									<h1 className='flex text-[1.2rem] justify-center bg-slate-400 rounded-t-md w-full p-2'>
										Adopted:
									</h1>
									<div className='bg-beige-light w-full p-2 rounded-b-sm '>
										{adoptedPets.length == 0 ? (
											<p>No adopted pets...</p>
										) : (
											<ul className='space-y-2'>
												{adoptedPets.map((pet) => (
													<li
														id={pet._id}
														key={pet._id}
														onClick={openHandler}
														className='cursor-pointer text-white hover:text-amber-400 bg-theme-bd rounded-md shadow-sm p-2 text-center'>
														{pet.name}
													</li>
												))}
											</ul>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default MyPets;
