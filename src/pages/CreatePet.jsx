import CreatePetForm from "../components/CreatePetForm";

function CreatePet() {
	return (
		<div className='flex flex-col h-full bg-blue-400'>
			<h1 className='title mx-auto my-2 text-[2rem]'>Add a new pet</h1>
			<CreatePetForm />
		</div>
	);
}

export default CreatePet;
