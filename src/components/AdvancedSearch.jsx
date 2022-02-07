import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { searchPets } from "../actions/petActions";
import { useSelector, useDispatch } from "react-redux";

function AdvancedSearch({ search }) {
	const dispatch = useDispatch();
	const [advancedSearch, setAdvancedSearch] = useState(false);
	const pets = useSelector((state) => state.pet.petData);
	const results = useSelector((state) => state.search.petData);
	const [alert, SetAlert] = useState();

	const initialState = {
		searchbar: "",
		type: "",
		adoptionStatus: "",
		hypoallergnic: "",
		breed: "",
		color: "",
	};

	const [petData, setPetData] = useState(initialState);

	useEffect(() => {
		if (search && pets) {
			console.log(search);
			// dispatch(searchPets(search, pets));
		}
	}, []);

	const handleChange = (e) => {
		if (alert) {
			SetAlert();
		}
		setPetData({ ...petData, [e.target.name]: e.target.value });
	};

	const clickHandler = (e) => {
		e.preventDefault();
		setAdvancedSearch((prevState) => !prevState);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		let emptyValues = 0;

		//check if search is empty
		for (const [key, value] of Object.entries(petData)) {
			if (value === "") {
				emptyValues++;
			}
		}
		if (emptyValues === 6) {
			SetAlert("Please enter search criteria.");
		} else {
			console.log(petData);
			dispatch(searchPets(petData, pets));
		}
	};

	useEffect(() => {
		let emptyValues = 0;
		for (let [key, value] of Object.entries(petData)) {
			if (value == "") {
				emptyValues++;
				if (emptyValues == 6) {
					dispatch({ type: "RESET_RESULTS" });
				}
			}
		}
	}, [petData]);

	useEffect(() => {
		if (results) {
			if (results.length == 0) {
				SetAlert("Nothing was found...");
			}
		}
	}, [results]);

	return (
		<div className='flex flex-col w-full sticky items-center'>
			<form
				onSubmit={submitHandler}
				className='w-full flex flex-col items-center'>
				<div className='flex w-5/6 ml-auto'>
					<SearchBar onChange={handleChange} name='searchbar' />{" "}
					<button
						type='submit'
						onSubmit={submitHandler}
						className='ml-2 p-1 px-2 rounded-md bg-gray-200 hover:bg-off-white'>
						Search
					</button>
				</div>
				{advancedSearch && (
					<div className='m-1 sm:mt-2 flex space-x-3 flex-col md:flex-row space-y-2 md:space-y-0 justify-center items-center'>
						<div className='mt-1 sm:mt-0 flex flex-col space-y-1 sm:space-y-0 sm:flex-row sm:space-x-3'>
							<input
								type='text'
								name='type'
								placeholder='Type:'
								className='rounded-md p-1.5'
								onChange={handleChange}
							/>
							<input
								type='text'
								name='breed'
								placeholder='Breed:'
								className='rounded-md p-1.5 '
								onChange={handleChange}
							/>
							<input
								type='text'
								name='color'
								placeholder='Color:'
								className='rounded-md p-1.5 '
								onChange={handleChange}
							/>
						</div>
						<div className='flex space-x-10 md:space-x-3 justify-center content-center'>
							<select
								name='hypoallergnic'
								id='hypoallergnic'
								className='rounded-md p-1.5'
								onChange={handleChange}>
								<option value=''>hypoallergenic:</option>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</select>
							<select
								name='adoptionStatus'
								id='stsus'
								className='rounded-md p-1.5'
								onChange={handleChange}>
								<option value=''>Status:</option>
								<option value='Fostered'>Fostered</option>
								<option value='Available'>Available</option>
							</select>
						</div>
					</div>
				)}
			</form>
			<button
				onClick={clickHandler}
				className='bg-gray-200 hover:bg-off-white rounded-md p-2 my-2'>
				Advanced Search
			</button>
			{alert && <div className='text-red-600 text-lg m-2'>{alert}</div>}
		</div>
	);
}

export default AdvancedSearch;
