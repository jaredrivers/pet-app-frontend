import ModalItem from "./ModalItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { switchState } from "../actions/switchState";
import { useState } from "react";
import { signUp } from "../actions/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const login = useSelector((state) => state.login);

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

	const signUpHandler = (e) => {
		e.preventDefault();
		dispatch(signUp(formData, navigate));
	};

	const clickHandler = () => {
		if (!login) {
			dispatch(switchState("LOGIN"));
		}
	};

	return (
		<div className='flex'>
			<div className='left h-[38.5rem] hidden md:flex w-[60%] bg-[url(./imgs/signup.jpg)] bg-cover'></div>
			<form
				className='right w-full md:w-1/2 flex flex-col items-center justify-center py-4'
				onSubmit={signUpHandler}>
				<ModalItem
					title='First Name'
					type='text'
					name='firstName'
					onChange={handleChange}
				/>
				<ModalItem
					title='Last Name'
					type='text'
					name='lastName'
					onChange={handleChange}
				/>
				<ModalItem
					title='Email'
					type='email'
					name='email'
					onChange={handleChange}
				/>
				<ModalItem
					title='Phone Number'
					type='tel'
					name='phoneNumber'
					onChange={handleChange}
				/>
				<ModalItem
					title='Password'
					type='password'
					name='password'
					onChange={handleChange}
				/>
				<ModalItem
					title='Confirm Password'
					type='password'
					name='confirmPassword'
					onChange={handleChange}
				/>

				<button type='submit' className='rounded-lg bg-white p-2 w-2/4 mt-5'>
					Submit
				</button>
				<span className='text-sm text-off-white m-3'>
					Already have an account?
					<span
						onClick={clickHandler}
						className='cursor-pointer text-blue-300 ml-2'>
						Log In
					</span>
				</span>
			</form>
		</div>
	);
}

export default Signup;
