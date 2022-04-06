import { useState } from "react";
import PetItem from "./PetItem";
import { useDispatch, useSelector } from "react-redux";
import { createPet } from "../actions/petActions";
import { toast } from "react-toastify";
import UploadPhoto from "./UploadPhoto";
import uploadFunction from "../functions/uploadFunction";
import { useNavigate } from "react-router-dom";

function CreatePetForm({ setSelectForm }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [uploadedURL, setUploadedURL] = useState("");
	const [photoFile, setPhotoFile] = useState();

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
		url: "",
	};

	const [petData, setPetData] = useState(initialState);

	const handleChange = (e) => {
		setPetData({ ...petData, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (photoFile) {
				const url = await uploadFunction(photoFile);
				petData.url = url;
			}
			dispatch(createPet(petData));
			setLoading(false);
			setSelectForm();
		} catch (err) {
			toast.error(err.message, {
				pauseOnHover: false,
				autoClose: 3000,
				theme: "colored",
			});
			setLoading(false);
		}
	};

	const uploadHandler = async (e) => {
		const file = e.currentTarget.files[0];
		setPhotoFile(file);
		if (file.size > 10000000) {
			toast.error("File must be smaller than 10mb", {
				pauseOnHover: false,
				autoClose: 3000,
				theme: "colored",
			});
		} else {
			const tempUrl = URL.createObjectURL(file);
			setUploadedURL(tempUrl);
		}
	};
	const placeholder =
		"https://res.cloudinary.com/jaredriver/image/upload/v1641802995/201-2011850_pet-footprint-l-dog-paw-icon-png-transparent_yvu1qa.png";

	return (
		<form className='pet-form flex flex-col px-2 py-6 mx-auto mt-10 bg-theme-bl shadow-md rounded-md my-2 mb-2 relative z-0'>
			<div className='flex flex-col sm:flex-row justify-between sm:justify-evenly'>
				<div className='flex flex-col'>
					<PetItem
						type='text'
						name='name'
						placeholder='Name:'
						onChange={handleChange}
					/>
					<PetItem
						type='text'
						name='type'
						placeholder='Type: (cat, dog, etc...)'
						onChange={handleChange}
					/>
					<PetItem
						type='text'
						name='breed'
						placeholder='Breed:'
						onChange={handleChange}
					/>
					<PetItem
						type='text'
						name='color'
						placeholder='Color:'
						onChange={handleChange}
					/>
					<PetItem
						type='number'
						name='height'
						placeholder='Height:'
						onChange={handleChange}
					/>
					<PetItem
						type='number'
						name='weight'
						placeholder='Weight:'
						onChange={handleChange}
					/>
					<PetItem
						type='text'
						name='bio'
						placeholder='Bio:'
						onChange={handleChange}
					/>
					<PetItem
						type='text'
						name='dietery'
						placeholder='Dietary Restrictions:'
						onChange={handleChange}
					/>
				</div>
				<div className='flex flex-col h-full items-center space-y-4 self-center'>
					<img src={uploadedURL ? uploadedURL : placeholder} width='150px' />
					<UploadPhoto changeHandler={uploadHandler} />
					<input
						type='text'
						name='url'
						value={uploadedURL}
						className='hidden'
						onChange={handleChange}
					/>
					<div className='flex flex-col p-2 space-y-5 items-center m-2 border border-black rounded-lg'>
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
								onChange={handleChange}
							/>
							<label htmlFor='false'>False</label>
						</div>
						<div className='flex items-center w-full'>
							<PetItem
								type='radio'
								name='adoptionStatus'
								id='available'
								value='Available'
								onChange={handleChange}
							/>
							<label htmlFor='available'>Available</label>
							<PetItem
								type='radio'
								name='adoptionStatus'
								id='fostered'
								value='Fostered'
								onChange={handleChange}
							/>
							<label htmlFor='fostered'>Fostered</label>
							<PetItem
								type='radio'
								name='adoptionStatus'
								id='adopted'
								value='Adopted'
								onChange={handleChange}
							/>
							<label htmlFor='adopted'>Adopted</label>
						</div>
					</div>
					<button
						className='bg-gray-200 w-20 p-2 rounded-md m-auto hover:bg-gray-300 disabled:opacity-50'
						type='submit'
						onClick={submitHandler}
						disabled={loading}>
						Create
					</button>
				</div>
			</div>
		</form>
	);
}

export default CreatePetForm;
