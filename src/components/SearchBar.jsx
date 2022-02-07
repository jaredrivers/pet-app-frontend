import { SearchIcon } from "@heroicons/react/outline";

function SearchBar({ onChange, name, submitHandler }) {
	return (
		<div className='flex rounded-xl bg-gray-200 w-5/6 p-2'>
			<SearchIcon className='w-6 ml-2' />
			<input
				type='text'
				className='pl-3 w-full bg-gray-200 rounded-lg outline-none'
				onChange={onChange}
				name={name}
				onSubmit={submitHandler}
			/>
		</div>
	);
}

export default SearchBar;
