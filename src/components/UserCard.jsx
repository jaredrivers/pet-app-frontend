import { MailIcon, PhoneIcon, FingerPrintIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";

function UserCard({
	id,
	firstName,
	lastName,
	phoneNumber,
	email,
	imgURL,
	pets,
	favorites,
	openHandler,
}) {
	const idHandler = (e) => {
		navigator.clipboard.writeText(e.target.innerText);
		toast("Copied to clipboard.", {
			pauseOnHold: false,
			autoClose: 2000,
			theme: "colored",
			position: "bottom-right",
		});
	};
	return (
		<div
			id='id'
			className='flex flex-col bg-theme-bl sm:h-[60vh] p-2 rounded-md mb-2'>
			<div className='top flex h-[25%] items-center mb-2 justify-between overflow-hidden'>
				<div className='flex w-full justify-center'>
					<p>
						{firstName} {lastName}
					</p>
				</div>
				<img
					src={
						imgURL
							? imgURL
							: "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
					}
					alt='Profile'
					name='Profile photo'
					width='100'
					className='ml-1 rounded-md'
				/>
			</div>
			<div className='flex flex-col h-full'>
				<div className='center flex flex-col mb-2 space-y-2'>
					<p className='flex items-center'>
						<MailIcon className='w-5 inline mr-1' /> {email}
					</p>
					<p className='flex items-center'>
						<PhoneIcon className='w-5 inline mr-1' /> {phoneNumber}
					</p>
					<p
						className='flex items-center cursor-pointer text-blue-900'
						onClick={idHandler}>
						<FingerPrintIcon className='w-5 inline mr-1' />
						{id}
					</p>
				</div>
				<div className='bottom flex flex-col'>
					<div>
						<p>Pets:</p>
						<ul>
							{pets.map((pet) => (
								<li
									id={pet}
									className='cursor-pointer hover:bg-amber-200/30 rounded-md'
									onClick={openHandler}>
									{pet}
								</li>
							))}
						</ul>
					</div>
					<div>
						<p>Favorites:</p>
						<ul>
							{favorites.map((pet) => (
								<li
									id={pet}
									className='cursor-pointer hover:bg-amber-200/30 rounded-md'
									onClick={openHandler}>
									{pet}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserCard;
