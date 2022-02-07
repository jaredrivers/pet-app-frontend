function ModalItem({ title, type, name, onChange }) {
	return (
		<div className='modal-item flex flex-col justify-center w-9/12 my-1'>
			<span className=''>{title}</span>
			<input
				required
				onChange={onChange}
				name={name}
				type={type}
				className='rounded-md p-2 border-2 border-black outline-none'
			/>
		</div>
	);
}

export default ModalItem;
