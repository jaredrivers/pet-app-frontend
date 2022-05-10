import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Home() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState("");
	const [searchParams, setSearchParams] = useState();

	const clickHandler = () => {
		dispatch({ type: "LOADING_TRUE" });
		navigate("/gallery");
	};

	//Submit handler
	useEffect(() => {
		const listener = (e) => {
			if (
				(e.code === "Enter" && inputValue !== "") ||
				(e.code === "NumpadEnter" && inputValue !== "")
			) {
				navigate({
					pathname: `/gallery`,
					search: `q=${inputValue}`,
				});
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [inputValue]);

	const changeHandler = (e) => {
		setInputValue(e.currentTarget.value);
	};

	useEffect(() => {
		setSearchParams(inputValue);
	}, [inputValue]);

	return (
		<div className='flex w-full h-full'>
			<div className='flex bg-[url(./imgs/home1.jpg)] bg-cover w-full h-full content-center flex-col'>
				<div className='flex w-full justify-center pt-[5rem]'>
					<SearchBar onChange={changeHandler} changeHandler={changeHandler} />
				</div>
				<div className='mt-2 flex justify-center'>
					<div className='flex flex-col w-5/6' onClick={clickHandler}>
						<p className='text-[4rem] hover:text-sea-foam cursor-pointer'>
							FIND YOUR
						</p>
						<p className='text-[4rem] hover:text-sea-foam cursor-pointer'>
							BEST FRIEND.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
