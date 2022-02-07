function SidebarItem({ Icon, title, onClick }) {
	return (
		<div className='flex pl-4 items-center group' onClick={onClick}>
			<Icon className='w-8 mr-3 group-hover:stroke-gray-200 cursor-pointer ' />
			<p className='text-[1.7rem] tracking-widest mt-0.5 group-hover:text-gray-200 cursor-pointer '>
				{title}
			</p>
		</div>
	);
}

export default SidebarItem;
