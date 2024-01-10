function ProfileItem({ name, title, content, Icon }) {
	return (
		<div
			className='mb-2 w-full p-2 flex content-center items-center hover:text-theme-bd'
			name={name}
		>
			<Icon className='h-5 mr-1' />
			<p>
				{title} {content}
			</p>
		</div>
	);
}

export default ProfileItem;
