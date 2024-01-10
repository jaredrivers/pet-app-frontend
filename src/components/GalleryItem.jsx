import { BookmarkIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getallPets, likePet } from "../actions/petActions.js";
import PetCardButton from "./PetCardButton.jsx";
import { fosterPet, adoptPet, returnPet } from "../actions/petActions.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GalleryItem({
	name,
	type,
	bio,
	color,
	tags,
	breed,
	hypoallergnic,
	adoptionStatus,
	id,
	height,
	weight,
	url,
	onClick,
	Icon,
	closeHandler,
}) {
	const placeholder =
		"https://res.cloudinary.com/jaredriver/image/upload/v1641802995/201-2011850_pet-footprint-l-dog-paw-icon-png-transparent_yvu1qa.png";
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);
	const fostering = useSelector((state) => state.fostering.fostering);
	const ownedPets = useSelector((state) => state.ownedPets.ownedPets);
	const user = useSelector((state) => state.user);

	const likeHandler = () => {
		if (!user.currentUser) {
			toast.error("Please log in to like a pet!", {
				pauseOnHover: false,
				autoClose: 3000,
				theme: "colored",
			});
		} else {
			dispatch(likePet(id));
		}
	};

	const petHandler = (e) => {
		if (e.target.name == "foster") {
			dispatch(fosterPet(id));
		}
		if (e.target.name == "return") {
			dispatch(returnPet(id));
		}
		if (e.target.name == "adopt") {
			dispatch(adoptPet(id));
		}
	};

	return (
		<div
			id={id}
			name={name}
			className='flex justify-center outer h-[28rem] mx-2 my-2'
		>
			<div className='flex flex-col rounded-lg shadow-lg bg-gray-200 p-4 w-[20rem]'>
				{Icon && (
					<div onClick={closeHandler}>
						<Icon onClick={onClick} className='w-6 cursor-pointer' />
					</div>
				)}

				<div className='upper flex justify-center items-center relative'>
					<h3 className='text-gray-900 text-[2rem] font-medium mb-2'>{name}</h3>
					{user.currentUser !== null && favorites.includes(id) ? (
						<BookmarkIcon
							className='h-6 absolute top-1 right-2 cursor-pointer fill-red-400 text-red-500'
							onClick={likeHandler}
						/>
					) : (
						<BookmarkIcon
							className='h-6 absolute top-1 right-2 cursor-pointer'
							onClick={likeHandler}
						/>
					)}
				</div>
				<div className='center1 flex flex-col items-center m-1'>
					<img
						onError={(e) => {
							e.currentTarget.src = placeholder;
						}}
						src={url ? url : placeholder}
						alt='pet'
						width='150'
						className='rounded-md max-h-40 object-cover'
					/>
					<p className='mt-2 text-[1.1rem]'>Status: {adoptionStatus}</p>
				</div>
				<div className='center2 flex flex-col h-[30%] justify-center'>
					<div className='flex space-x-2 flex-wrap justify-center'>
						<p className='rounded-md bg-gray-300 p-1 my-1 text-xs '>
							Type: {type}
						</p>
						<p className='rounded-md bg-gray-300 p-1 my-1 text-xs '>
							Breed: {breed}
						</p>
						<p className='rounded-md bg-gray-300 p-1 my-1 text-xs '>
							Color: {color}
						</p>
						{hypoallergnic && (
							<p className='rounded-lg bg-amber-100 p-1 my-1  text-xs '>
								Hypoallergenic
							</p>
						)}
						<p className='rounded-md bg-gray-300 p-1 my-1 text-xs '>
							Height: {height}in
						</p>
						<p className='rounded-md bg-gray-300 p-1 my-1 text-xs '>
							Weight: {weight}lbs
						</p>
					</div>
				</div>
				{user.currentUser !== null && ownedPets.includes(id) ? (
					<PetCardButton label='Return' onClick={petHandler} name='return' />
				) : (
					<div className='end flex justify-around w-full justify-self-center m-auto mb-1'>
						{fostering && fostering.includes(id) ? (
							<div className='flex justify-around w-full'>
								<PetCardButton
									label='Return'
									onClick={petHandler}
									name='return'
								/>
								<PetCardButton
									label='Adopt'
									onClick={petHandler}
									name='adopt'
								/>
							</div>
						) : (
							<div className='flex justify-around w-full '>
								{adoptionStatus === "Fostered" ? (
									<PetCardButton
										label='Adopt'
										onClick={petHandler}
										name='adopt'
									/>
								) : (
									<div className='flex justify-around w-full '>
										<PetCardButton
											label='Foster'
											onClick={petHandler}
											name='foster'
										/>
										<PetCardButton
											label='Adopt'
											onClick={petHandler}
											name='adopt'
										/>
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default GalleryItem;
