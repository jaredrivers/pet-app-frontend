import { useState, useEffect } from "react";
import PetItem from "./PetItem";
import { useDispatch, useSelector } from "react-redux";
import GalleryItem from "../components/GalleryItem";
import { uploadPhotoHandler } from "../actions/auth";
import UploadPhoto from "./UploadPhoto";
import * as api from "../api/index";
import { XIcon } from "@heroicons/react/outline";
import imageToBase64 from "image-to-base64/browser";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

function EditPetForm() {
	const isLoading = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [uploadedURL, setUploadedURL] = useState("");
	const [allPets, setAllPets] = useState([]);
	const [openPet, setOpenPet] = useState();

	const override = css`
		display: block;
		margin: 0 auto;
	`;

	const initialState = {
		type: "",
		name: "",
		adoptionStatus: "",
		height: "",
		weight: "",
		color: "",
		bio: "",
		hypoallergnic: "",
		dietery: "",
		breed: "",
		picture: "",
	};

	const [petData, setPetData] = useState(initialState);
	const [newPicData, setNewPicData] = useState();

	const handleChange = (e) => {
		setPetData({ ...petData, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		// let res = await uploadPhotoHandler(newPicData);
		// console.log(res);
		// dispatch(createPet(petData));
	};

	const uploadHandler = async (e) => {
		let image = await imageToBase64(e.target.files[0]);
		dispatch(uploadPhotoHandler(image));
		// setNewPicData(e.target.files[0]);
	};

	const openHandler = (e) => {
		setOpenPet(allPets.find(({ _id }) => _id === e.currentTarget.id));
	};
	const closeHandler = () => {
		setNewPicData();
		setOpenPet();
	};

	useEffect(() => {
		setLoading(true);
		const load = async () => {
			const res = await api.getallpets();
			setAllPets(res.data);
			setLoading(false);
		};
		load();
	}, []);

	const placeholder =
		"https://res.cloudinary.com/jaredriver/image/upload/v1641802995/201-2011850_pet-footprint-l-dog-paw-icon-png-transparent_yvu1qa.png";

	return openPet ? (
		<form
			encType='multipart/form-data'
			className='pet-form flex flex-col p-6 mx-auto mt-10 bg-theme-bl shadow-md rounded-md my-2 mb-2 z-0 relative'>
			<XIcon
				className='h-6 absolute top-1 left-1 cursor-pointer'
				onClick={closeHandler}
			/>
			<div className='flex flex-col sm:flex-row justify-between sm:justify-evenly'>
				<div className='flex flex-col'>
					<label htmlFor='name' className='text-sm pl-2'>
						Name:
					</label>
					<PetItem
						type='text'
						name='name'
						id='name'
						placeholder={openPet.name}
						onChange={handleChange}
					/>
					<label htmlFor='type' className='text-sm pl-2'>
						Type:
					</label>
					<PetItem
						type='text'
						name='type'
						id='type'
						placeholder={openPet.type}
						onChange={handleChange}
					/>
					<label htmlFor='breed' className='text-sm pl-2'>
						Breed:
					</label>
					<PetItem
						type='text'
						name='breed'
						placeholder={openPet.breed}
						onChange={handleChange}
						id='breed'
					/>
					<label htmlFor='color' className='text-sm pl-2'>
						color:
					</label>
					<PetItem
						type='text'
						name='color'
						placeholder={openPet.color}
						onChange={handleChange}
						id='color'
					/>
					<label htmlFor='height' className='text-sm pl-2'>
						Height:
					</label>
					<PetItem
						type='number'
						name='height'
						placeholder={openPet.height}
						onChange={handleChange}
						id='height'
					/>
					<label htmlFor='weight' className='text-sm pl-2'>
						Weight:
					</label>
					<PetItem
						type='number'
						name='weight'
						placeholder={openPet.weight}
						onChange={handleChange}
						id='weight'
					/>
					<label htmlFor='bio' className='text-sm pl-2'>
						Bio:
					</label>
					<PetItem
						type='text'
						name='bio'
						placeholder={openPet.bio}
						onChange={handleChange}
						id='bio'
					/>
					<label htmlFor='dietary' className='text-sm pl-2'>
						Dietary Restrictions:
					</label>
					<PetItem
						type='text'
						name='dietery'
						placeholder={openPet.dietery}
						onChange={handleChange}
						id='dietary'
					/>
				</div>
				<div className='flex flex-col items-center space-y-4 self-center'>
					<div className='flex flex-col items-center justify-center h-fill m-auto'>
						{newPicData ? (
							<img
								src={URL.createObjectURL(newPicData)}
								width='150px'
								className='pb-8'
							/>
						) : (
							<div>
								{openPet.picture ? (
									<img src={openPet.picture} width='150px' className='pb-8' />
								) : (
									<img src={placeholder} width='150px' className='pb-8' />
								)}
							</div>
						)}

						<UploadPhoto changeHandler={uploadHandler} />
						<input
							type='text'
							name='picture'
							value={uploadedURL}
							className='hidden'
							onChange={handleChange}
						/>
					</div>

					<div className='flex flex-col p-2 space-y-5 items-center m-2 border border-black rounded-lg'>
						{openPet.hypoallergnic ? (
							<div className='flex hypo items-center space-x-2'>
								<p>Hypoallergenic?</p>
								<PetItem
									type='radio'
									name='hypoallergnic'
									value='true'
									id='true'
									checked
									onChange={handleChange}
								/>
								<label htmlFor='true'>True</label>
								<PetItem
									type='radio'
									name='hypoallergnic'
									value='false'
									id='false'
									onChange={handleChange}
								/>
								<label htmlFor='false'>False</label>
							</div>
						) : (
							<div className='flex hypo items-center space-x-2'>
								<p>Hypoallergenic?</p>
								<PetItem
									type='radio'
									name='hypoallergnic'
									value='true'
									id='true'
									onChange={handleChange}
								/>
								<label htmlFor='true'>True</label>
								<PetItem
									type='radio'
									name='hypoallergnic'
									value='false'
									id='false'
									checked
									onChange={handleChange}
								/>
								<label htmlFor='false'>False</label>
							</div>
						)}

						<div className='flex items-center w-full'>
							{openPet.adoptionStatus === "Available" ? (
								<PetItem
									type='radio'
									name='adoptionStatus'
									id='available'
									value='Available'
									onChange={handleChange}
									checked
								/>
							) : (
								<PetItem
									type='radio'
									name='adoptionStatus'
									id='available'
									value='Available'
									onChange={handleChange}
								/>
							)}
							<label htmlFor='available'>Available</label>

							{openPet.adoptionStatus === "Fostered" ? (
								<PetItem
									type='radio'
									name='adoptionStatus'
									id='fostered'
									value='Fostered'
									checked
									onChange={handleChange}
								/>
							) : (
								<PetItem
									type='radio'
									name='adoptionStatus'
									id='fostered'
									value='Fostered'
									onChange={handleChange}
								/>
							)}
							<label htmlFor='fostered'>Fostered</label>
							{openPet.adoptionStatus === "Adopted" ? (
								<PetItem
									type='radio'
									name='adoptionStatus'
									id='adopted'
									value='Adopted'
									checked
									onChange={handleChange}
								/>
							) : (
								<PetItem
									type='radio'
									name='adoptionStatus'
									id='adopted'
									value='Adopted'
									onChange={handleChange}
								/>
							)}

							<label htmlFor='adopted'>Adopted</label>
						</div>
					</div>
					<button
						className='bg-gray-200 p-2 rounded-md m-auto hover:bg-gray-300 disabled:opacity-50'
						type='submit'
						onClick={submitHandler}
						disabled={isLoading}>
						Submit Changes
					</button>
				</div>
			</div>
		</form>
	) : (
		<div className='flex w-full h-full content-center justify-center pt-[3rem]'>
			<div className='flex w-9/12 h-[90%] content-center justify-center bg-theme-lp rounded-md shadow-md overflow-y-scroll p-3'>
				{loading ? (
					<div className=' flex w-full h-full justify-center items-center'>
						<HashLoader
							loading={loading}
							css={override}
							size={100}
							color='#5a7bb0'
						/>
					</div>
				) : (
					<ul className='flex flex-col content-center justify-start space-y-2'>
						{allPets &&
							allPets.map((pet) => (
								<li
									id={pet._id}
									onClick={openHandler}
									className='hover:bg-red-100 cursor-pointer'>
									<GalleryItem
										name={pet.name}
										type={pet.type}
										bio={pet.bio}
										color={pet.color}
										tags={pet.tags}
										breed={pet.breed}
										hypoallergnic={pet.hypoallergnic}
										adoptionStatus={pet.adoptionStatus}
										id={pet._id}
										height={pet.height}
										weight={pet.weight}
										picture={pet.picture}
									/>
								</li>
							))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default EditPetForm;
