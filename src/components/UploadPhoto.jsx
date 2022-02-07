function UploadPhoto({ changeHandler }) {
	return (
		<input
			type='file'
			name='picture'
			accept='.png, .jpg, .jpeg'
			placeholder='Upload Image'
			onChange={changeHandler}
			className='flex file:rounded-md file:border-none file:p-1 file:bg-gray-200 file:cursor-pointer file:ml-10'></input>
	);
}

export default UploadPhoto;
