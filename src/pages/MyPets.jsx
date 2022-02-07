import { useState, useEffect } from "react";
import GalleryItem from "../components/GalleryItem";
import * as api from "../api/index";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import { XIcon } from "@heroicons/react/outline";
import { loadProfile } from "../actions/auth";

function MyPets() {
	const dispatch = useDispatch();

	const [adoptedPets, setAdoptedPets] = useState([]);
	const [favoritedPets, setFavoritedPets] = useState([]);
	const [fosteredPets, setFosteredPets] = useState([]);
	const [openPet, setOpenPet] = useState();

	const user = useSelector((state) => state.user);
	const loading = useSelector((state) => state.loading);
	const favorites = useSelector((state) => state.favorites);
	const fostering = useSelector((state) => state.fostering);
	const ownedPets = useSelector((state) => state.ownedPets);

	useEffect(() => {
		if (user && Object.keys(user).length !== 0) {
			dispatch(loadProfile(user.currentUser.id));
		}
	}, [user]);

	useEffect(() => {
		if (favorites && favorites.favorites !== null) {
			setFavoritedPets(favorites.favorites);
		}
	}, [favorites]);

	useEffect(() => {
		if (ownedPets && Object.keys(ownedPets).length !== 0) {
			setAdoptedPets(ownedPets.ownedPets);
		}
	}, [ownedPets]);
	useEffect(() => {
		if (fostering && Object.keys(fostering).length !== 0) {
			setFosteredPets(fostering.fostering);
		}
	}, [fostering]);

	const openHandler = async (e) => {
		const petId = e.target.innerText;
		const { data } = await api.getPetById(petId);
		setOpenPet(data[0]);
	};

	const closeHandler = () => setOpenPet();

	const returnHandler = () => {};

	const override = css`
		display: block;
		margin: 0 auto;
	`;

	return loading ? (
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
						/>
					</div>
				) : (
					<div className='dashboard-wrapper flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-center content-center rounded bg-theme-lp/80 w-[95%] h-5/6 p-3 shdaow-md sm:space-x-4'>
						<div className='flex content-center justify-center'>
							{favoritedPets && (
								<div className='favorites flex flex-col items-center justify-center'>
									{favoritedPets == null ? (
										<div className='text-[1.5rem]'>No favorites...</div>
									) : (
										<div className='flex flex-col justify-center items-center'>
											<h1 className='flex text-[1.2rem] content-center'>
												Favorites
											</h1>
											<ul className='space-y-2'>
												{favoritedPets.map((pet) => (
													<li
														key={pet}
														onClick={openHandler}
														className='cursor-pointer text-white hover:text-amber-400 bg-theme-bd rounded-md shadow-sm p-2'>
														{pet}
													</li>
												))}
											</ul>{" "}
										</div>
									)}
								</div>
							)}
						</div>
						<div className='flex content-center justify-center'>
							{adoptedPets && (
								<div className='favorites flex flex-col items-center justify-center'>
									{adoptedPets == null ? (
										<div className='text-[1.5rem]'>No adopted pets...</div>
									) : (
										<div className='flex flex-col justify-center items-center'>
											<h1 className='flex text-[1.2rem] justify-center'>
												Adopted:
											</h1>
											<ul className='space-y-2'>
												{adoptedPets.map((pet) => (
													<li
														key={pet}
														onClick={openHandler}
														className='cursor-pointer text-white hover:text-amber-400 bg-theme-bd rounded-md shadow-sm p-2'>
														{pet}
													</li>
												))}
											</ul>{" "}
										</div>
									)}
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
