function PetItem({ type, name, placeholder, onChange, value, id, checked }) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			value={value}
			className='outline-none bg-gray-150 rounded-md shadow-sm m-1 p-2'
			id={id}
			checked={checked}
		/>
	);
}

export default PetItem;
