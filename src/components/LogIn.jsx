import ModalItem from "./ModalItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { switchState } from "../actions/switchState";
import { useState } from "react";
import { signIn } from "../actions/auth";
import { useNavigate } from "react-router-dom";

function LogIn({ loginHandler }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const login = useSelector((state) => state.login);

	const loading = useSelector((state) => state.loading);

	const initialState = {
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialState);

	const logInHandler = (e) => {
		e.preventDefault();
		dispatch(signIn(formData, navigate));
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const clickHandler = () => {
		if (login) {
			dispatch(switchState("LOGIN"));
		}
	};

	return (
		<div className='flex items-center'>
			<div className='left h-[35rem] hidden md:flex w-[60%] bg-[url(./imgs/modal12.jpg)] bg-cover'></div>
			<form
				className='right w-full md:w-[70%] flex flex-col items-center justify-center py-4 h-[30rem]'
				onSubmit={logInHandler}>
				<ModalItem
					onChange={handleChange}
					title='Email'
					type='email'
					name='email'
				/>
				<ModalItem
					onChange={handleChange}
					title='Password'
					type='password'
					name='password'
				/>
				<button
					disabled={loading}
					type='submit'
					className='rounded-lg bg-white p-2 w-2/4 mt-5 disabled:opacity-50 '>
					Submit
				</button>
				<span className='text-sm text-off-white m-3'>
					Don't have an account?
					<span
						onClick={clickHandler}
						className='cursor-pointer text-blue-300 ml-2'>
						Sign Up
					</span>
				</span>
			</form>
		</div>
	);
}

export default LogIn;
