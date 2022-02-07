function PetCardButton({ label, onClick, name }) {
	return (
		<button
			name={name}
			onClick={onClick}
			type='button'
			className='p-2 bg-amber-400 text-black text-[1rem] leading-tight uppercase rounded shadow-md hover:bg-amber-300 hover:shadow-lg'>
			{label}
		</button>
	);
}

export default PetCardButton;
