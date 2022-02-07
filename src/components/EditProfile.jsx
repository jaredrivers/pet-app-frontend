import EditProfileItem from "./EditProfileItem";
import {
	MailIcon,
	XIcon,
	PhoneIcon,
	LockClosedIcon,
} from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as api from "../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function EditProfile({ closeHandler, setOpenEditor }) {
	const profileData = useSelector((state) => state.profileData);
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const initialState = {
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
	};
	const [formData, setFormData] = useState(initialState);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (!profileData.length == 0) {
			console.log(profileData.profileData);
		}
	}, [profileData]);

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		try {
			const { data } = await api.updateProfile(formData, user.currentUser.id);
			dispatch({ type: "AUTH", data });
			setLoading(false);
			setOpenEditor(false);
			navigate("/profile");
		} catch (err) {
			setLoading(false);
			toast.error(err.message, {
				pauseOnHover: false,
				autoClose: 3000,
				theme: "colored",
			});
		}
	};

	return (
		<form
			onSubmit={submitHandler}
			className='flex flex-col  w-[60%] rounded-md shadow-md bg-theme-lp justify-center items-center relative p-10 '>
			<XIcon
				onClick={closeHandler}
				className='absolute top-2 right-4 w-7 cursor-pointer'
			/>
			<div className='flex flex-col justify-center items-end space-y-3'>
				<EditProfileItem
					name='email'
					type='email'
					Icon={MailIcon}
					placeHolder={profileData.profileData.email}
					onChange={handleChange}
				/>
				<EditProfileItem
					name='firstName'
					type='text'
					placeHolder={profileData.profileData.firstName}
					onChange={handleChange}
				/>
				<EditProfileItem
					name='lastName'
					type='text'
					placeHolder={profileData.profileData.lastName}
					onChange={handleChange}
				/>
				<EditProfileItem
					name='phoneNumber'
					type='tel'
					Icon={PhoneIcon}
					placeHolder={profileData.profileData.phoneNumber}
					onChange={handleChange}
				/>
				<EditProfileItem
					name='password'
					type='password'
					Icon={LockClosedIcon}
					placeHolder='New Password'
					onChange={handleChange}
				/>
				<EditProfileItem
					name='confirmPassword'
					type='password'
					Icon={LockClosedIcon}
					placeHolder='Confirm Password'
					onChange={handleChange}
				/>
			</div>
			<button
				disabled={loading}
				type='submit'
				className='text-white w-20 p-2 bg-theme-bl cursor-pointer hover:bg-gray-400 rounded-md mt-5 disabled:opacity-50'>
				Submit
			</button>
		</form>
	);
}

export default EditProfile;
