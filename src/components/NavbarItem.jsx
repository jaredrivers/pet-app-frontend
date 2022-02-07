function NavbarItem({ label, Icon, onClick }) {
	return (
		<div
			className='navbar-item flex cursor-pointer hover:text-gray-500 '
			onClick={onClick}>
			<Icon className='w-6' />
			<p className=''>{label}</p>
		</div>
	);
}

export default NavbarItem;
