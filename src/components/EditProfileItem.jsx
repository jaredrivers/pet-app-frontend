function EditProfileItem({ type, name, placeHolder, Icon, onChange }) {
	return (
		<div className='flex '>
			{Icon && <Icon className='w-6 mr-2' />}
			<input
				onChange={onChange}
				type={type}
				name={name}
				placeholder={placeHolder}
				className='rounded-md p-2 placeholder:p-2'></input>
		</div>
	);
}

export default EditProfileItem;
