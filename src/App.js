import { useSelector } from "react-redux";
import Modal from "./components/MyModal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreatePet from "./pages/CreatePet";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import AdminPage from "./pages/AdminPage";
import MyPets from "./pages/MyPets";

function App() {
	// const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
	const isModalOpen = useSelector((state) => state.modal);

	return (
		<>
			<Router>
				<Modal open={isModalOpen} />
				<Navbar />
				<Sidebar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/createpet' element={<CreatePet />} />
					<Route path='/gallery' element={<Gallery />} />
					<Route path='/adminpage' element={<AdminPage />} />
					<Route path='/mypets' element={<MyPets />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
