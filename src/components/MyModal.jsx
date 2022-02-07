import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import LogIn from "./LogIn";
import Modal from "react-modal";
import { switchState } from "../actions/switchState";

Modal.setAppElement("#root");

function MyModal() {
	const dispatch = useDispatch();
	const isModalOpen = useSelector((state) => state.modal);
	const login = useSelector((state) => state.login);

	const closeHandler = () => {
		if (login === true) {
			dispatch(switchState("LOGIN"));
		}
		dispatch({ type: "MODAL_CLOSE" });
	};

	return (
		<Modal
			isOpen={isModalOpen}
			className='absolute bg-theme-dp top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 outline-none w-8/12 xl:w-[55rem]'
			overlayClassName='fixed inset-0 bg-black/50'
			shouldCloseOnOverlayClick={true}
			onRequestClose={closeHandler}>
			<XIcon
				onClick={closeHandler}
				className='w-8 cursor-pointer absolute left-4 top-4'
			/>
			{login ? <LogIn /> : <Signup />}
		</Modal>
	);
}

export default MyModal;
