import UploadPhoto from "../components/UploadPhoto";
import upload from "../functions/UploadFunction";
import ProfileItem from "../components/ProfileItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProfile, uploadPhoto } from "../actions/auth";
import {
	DotsHorizontalIcon,
	MailIcon,
	PhoneIcon,
	UserIcon,
} from "@heroicons/react/outline";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import * as api from "../api/index";
import EditProfile from "../components/EditProfile";

function Profile() {
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.loading);
	const user = useSelector((state) => state.user);
	const profileData = useSelector((state) => state.profileData.profileData);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [openEditor, setOpenEditor] = useState(false);

	useEffect(() => {
		if (user.currentUser !== null && Object.keys(user).length !== 0) {
			dispatch(loadProfile(user.currentUser.id));
		}
	}, [user]);

	// const uploadHandler = async (e) => {
	// 	// setLoading(true);
	// 	console.log(e.target.files[0]);
	// 	// setLoading(false);
	// };

	const override = css`
		display: block;
		margin: 0 auto;
	`;

	const placeholder =
		"https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

	const menuHandler = () => {
		setIsMenuOpen((prevState) => !prevState);
	};
	const openEditHandler = () => {
		setIsMenuOpen(false);
		setOpenEditor(true);
	};

	return loading ? (
		<div className=' flex w-full h-full justify-center items-center bg-[url(./imgs/home1.jpg)] bg-cover'>
			<HashLoader loading={loading} css={override} size={100} color='#5a7bb0' />
		</div>
	) : (
		profileData && (
			<div className='profile-page flex bg-[url(./imgs/profile3.jpg)] bg-cover w-full h-full flex-col pt-[5rem] items-center'>
				{openEditor ? (
					<EditProfile
						closeHandler={() => setOpenEditor(false)}
						setOpenEditor={setOpenEditor}
					/>
				) : (
					<div className='flex flex-col bg-theme-lp/95 w-5/6 h-5/6 items-center rounded-md shadow-md p-5 justify-center relative'>
						<DotsHorizontalIcon
							onClick={menuHandler}
							className='w-8 absolute top-3 right-8 cursor-pointer hover:text-gray-600'
						/>
						{isMenuOpen && (
							<div
								onClick={openEditHandler}
								className='w-30 cursor-pointer bg-theme-bl hover:bg-gray-400 rounded-md p-2 absolute top-8 right-8'>
								<p>Edit Profile</p>
							</div>
						)}
						<div className='top flex flex-col sm:flex-row content-center items-center'>
							<div className='flex flex-col top-left pl-8'>
								<ProfileItem
									name='name'
									content={`${profileData.firstName} ${profileData.lastName}`}
									Icon={UserIcon}
								/>
								<ProfileItem
									name='email'
									content={profileData.email}
									Icon={MailIcon}
								/>
								<ProfileItem
									name='phoneNumber'
									content={profileData.phoneNumber}
									Icon={PhoneIcon}
								/>
							</div>
							<div className='top-right flex flex-col content-center items-center'>
								<img
									src={profileData.url ? profileData.url : placeholder}
									alt='Profile'
									className='w-40 mb-5'
								/>
								<UploadPhoto />
							</div>
						</div>
						<div className='bottom flex'></div>
					</div>
				)}
			</div>
		)
	);
}

export default Profile;
